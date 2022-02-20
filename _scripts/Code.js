// GLOBALS
var destSheetURL = "https://docs.google.com/spreadsheets/d/1J4XDBE7P5heX_yfwj8S5C3UA2wTLpYhH5KiT9kB9B9k/edit#gid=0";
var destWorksheetName = "Files";
var srcFolderId = "0B52bqtgAdxV8dWRBRnkzWTNSaWM";
var srcProjectId = "12ffva409KlkLHucIpjRRL8Z9PpI8rl6I1vIjD7LrmX2PZIob-Aoo3JbH";
var baseUrl = "https://script.googleapis.com/v1/projects";
var accessToken = "";
// CONSTANTS - DO NOT EDIT
var HEADERS = {
  "Sheet Name":  0,
  "Sheet ID":  1,
  "Script ID":  2,
  "Last Update":  3,
  "Error":  4
}
// SUPPORT
function extend(){
  for(var i=1; i<arguments.length; i++)
      for(var key in arguments[i])
          if(arguments[i].hasOwnProperty(key))
              arguments[0][key] = arguments[i][key];
  return arguments[0];
}
function getAccessToken() {
  accessToken === "" ? ScriptApp.getOAuthToken(): accessToken;
  return accessToken;
}
function getscriptID() {
  var scriptID = ScriptApp.getScriptId();
  Logger.log({ "scriptID": scriptID });
  return scriptID;
}
function getSheetByName(url, name) {
  return SpreadsheetApp.openByUrl(url).getSheetByName(name);
}
function getRange(sheet, arr){
  /* https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns */
  return sheet.getRange(...arr);
}
function setValues(vals) {
  getSheetByName().getRange(1, 1, vals.length, vals[0].length).setValues(vals);
}
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
function getLastUpdate(datetime) {
  if (datetime === "" || !isValidDate(datetime)) {
    datetime = new Date("Jan 1, 1970");
  }
  return datetime;
}

function getDataRangeValues(sheet) {
  return sheet.getDataRange().getValues();
}

function fetch ( url, params ){
  return UrlFetchApp.fetch(url, params);
}

// CORE
function getFilesByFolderId(id, mimetype) {
  
  var folder = DriveApp.getFolderById(id);
  var folderList = [];
  // 
  folderList.push(Object.keys(HEADERS));
  var files = folder.getFiles();
  var i = 0;
  if (!files.hasNext()) { return; }
  while (files.hasNext()) {
    var file = files.next();
    var row = [];
    row[0] = file.getName();
    row[1] = file.getId();
    row[2] = "";
    row[3] = "";
    row[4] = "";
    folderList[i] = row;
    i++;
  }
  return folderList;
}

function copySourceToDestination(srcProjectId, destFileId) {
 
}

function updateDestinationWithSource(srcProjectId, destProjectId) {

}

function createOrUpdateScripts(source, dest) {
  
}

function init() {
  var fileList = getFilesByFolderId(srcFolderId, MimeType.GOOGLE_SHEETS);
  return fileList
}
