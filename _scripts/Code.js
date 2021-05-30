// GLOBALS
var data = {
  "dest_sht_url": "https://docs.google.com/spreadsheets/d/1J4XDBE7P5heX_yfwj8S5C3UA2wTLpYhH5KiT9kB9B9k/edit#gid=0",
  "dest_wks_nme": "Files",
  "src_fldr_id": "0B52bqtgAdxV8dWRBRnkzWTNSaWM",
  "src_prjct_id": "12ffva409KlkLHucIpjRRL8Z9PpI8rl6I1vIjD7LrmX2PZIob-Aoo3JbH"
}

// CONSTANTS - DO NOT EDIT
var HEADERS = {
  "Sheet Name":  0,
  "Sheet ID":  1,
  "Script ID":  2,
  "Last Update":  3,
  "Error":  4
}
// SUPPORT
function getAccessToken() {
  var accessToken = ScriptApp.getOAuthToken();
  Logger.log({ "accessToken": accessToken });
  return accessToken;
}
function getscriptID() {
  var scriptID = ScriptApp.getScriptId();
  Logger.log({ "scriptID": scriptID });
  return scriptID;
}
function getSheetByName() {
  return SpreadsheetApp.openByUrl(data.dest_sht_url).getSheetByName(data.dest_wks_nme);
}
function getRange(sheet, arr){
  /* https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns */
  return sheet.getRange(...arr);
}
function setValues(vals) {
  getSheetByName().getRange(1, 1, vals.length, vals[0].length).setValues(vals);
}
function getFilesByFolder() {
  // support
  var folder = DriveApp.getFolderById(data.src_fldr_id);
  // core
  var list = [];
  list.push(Object.keys(HEADERS));
  // var files = folder.getFiles();
  var files = folder.getFilesByType(MimeType.GOOGLE_SHEETS);
  if (!files.hasNext()) { return; }
  Logger.log(files);
  while (files.hasNext()) {
    // Check for "Products" prefix in filename; indicates that this is a manifest for the client project
    file = files.next();
    var row = [];
    row.push(file.getName(), file.getId(), "", "", "");
    list.push(row);
  }
  Logger.log(list);
  return list;
}
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
function getLastUpdate(datetime) {
  // Get the last update
  //   If empty or invalid, set to an arbitrary historical date
  if (datetime === "" || !isValidDate(datetime)) {
    datetime = new Date("Jan 1, 1970");
  }
  return datetime;
}

function createOrUpdateScripts() {
  var start = new Date(); // When the function started processing
  var sh = SpreadsheetApp.openByUrl(data.dest_sht_url).getSheetByName(data.dest_wks_nme);
  var values = sh.getDataRange().getValues();

  // Create date one week ago
  var one_week = new Date();
  one_week.setDate(one_week.getDate() - 7);

  for (var i = 1; i < values.length; i++) { // 0-based array, start at 1 to skip headers
    Logger.log(values[i])
    // Check if the Sheet ID field is empty and skip row if true
    var empty_file_id = values[i][HEADERS["Sheet ID"]] == "" ? true : false;
    if (empty_file_id) {
      Logger.log("Skipped row: " + i);
      continue;
    }

    var last_update = getLastUpdate(values[i][HEADERS["Last Update"]]);

    // Was there an error?
    var error_on_last = values[i][HEADERS["Error"]] ?
      values[i][HEADERS["Error"]].toString().toLowerCase().indexOf("error") : -1;


    // Update once a week or less and retry errors
    if (last_update.getTime() < one_week.getTime() || error_on_last != -1) {

      // Are we about to run out of time?
      // if (isTimeUp_(start)) {
      //   Logger.log("Time up");
      //   break;
      // }

      var timestamp = new Date();
      try {
        // Create the script project
        var dst_prjct_id = values[i][HEADERS["Script ID"]];
        if (dst_prjct_id === "") {
          var dst_script_id = copySourceToDestination(data.src_prjct_id, dst_prjct_id);

          // Set script ID, timestamp of last update and clear errors 
          var lastRun = [dst_script_id, timestamp, ""];
          
          sh.getRange(i + 1, 2, 1, 3).setValues([lastRun]);
        }
        else {
          // Update the Script Project
          var upd_script_id = values[i][HEADERS["Script ID"]];
          var dst_script_id = updateDestinationWithSource(data.src_prjct_id, upd_script_id);

          // Set script ID, timestamp of last update and clear errors
          var lastRun = [dst_script_id, timestamp, ""];
          sh.getRange(i + 1, 2, 1, 3).setValues([lastRun]);
        }
      }
      catch (err) {
        sh.getRange(i + 1, HEADERS["Error"] + 1).setValue("ERROR: " + err); // values are 0-based, but sheet is 1-based
      }
    }
  }
}

function copySourceToDestination(srcProjectId, destFileId) {

  var baseUrl = "https://script.googleapis.com/v1/projects";
  var accessToken = ScriptApp.getOAuthToken();

  // Retrieve filename of bound-script project.
  var srcName = JSON.parse(UrlFetchApp.fetch(baseUrl + "/" + srcProjectId, {
    method: "get",
    headers: { "Authorization": "Bearer " + accessToken }
  }).getContentText()).title;

  // Retrieve bound-script project.
  var obj = UrlFetchApp.fetch(baseUrl + "/" + srcProjectId + "/content", {
    method: "get",
    headers: { "Authorization": "Bearer " + accessToken }
  }).getContentText();

  // Create new bound script and retrieve project ID.
  var dstId = JSON.parse(UrlFetchApp.fetch(baseUrl, {
    method: "post",
    contentType: 'application/json',
    headers: { "Authorization": "Bearer " + accessToken },
    payload: JSON.stringify({ "title": srcName, "parentId": destFileId })
  }).getContentText()).scriptId;

  // Upload a project to bound-script project.
  var res = JSON.parse(UrlFetchApp.fetch(baseUrl + "/" + dstId + "/content", {
    method: "put",
    contentType: 'application/json',
    headers: { "Authorization": "Bearer " + accessToken },
    payload: obj
  }).getContentText());

  Logger.log(dstId);
  return dstId;
}

function updateDestinationWithSource(srcProjectId, destProjectId) {

  var baseUrl = "https://script.googleapis.com/v1/projects";
  var accessToken = ScriptApp.getOAuthToken();

  // Retrieve bound-script project.
  var obj = UrlFetchApp.fetch(baseUrl + "/" + srcProjectId + "/content", {
    method: "get",
    headers: { "Authorization": "Bearer " + accessToken },
    options: { muteHttpExceptions: true }
  }).getContentText();

  // Upload a project to bound-script project.
  var res = JSON.parse(UrlFetchApp.fetch(baseUrl + "/" + destProjectId + "/content", {
    method: "put",
    contentType: 'application/json',
    headers: { "Authorization": "Bearer " + accessToken },
    payload: obj
  }).getContentText());

  Logger.log(destProjectId);
  return destProjectId;
}

function init() {
  var fileList = getFilesByFolder();
  setValues(fileList);
  createOrUpdateScripts();
}