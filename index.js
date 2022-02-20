function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

function getFormItemsByType (form, type){
  return form.getItems(type);
}

function getFormItemChoices(form){
  return form.asListItem().getChoices()[0];
}

function setFormItemChoices(form, items){
  form.asListItem().setChoiceValues(items);
}

function getSpreadsheetHeader (sheet){
  return sheet;
}

function getSpreadsheetById(id){
  return SpreadsheetApp.openById(id);
}

function getDataRange(sheet){
  return sheet.getDataRange();
}

function getValues (range){
  var values = range.getValues();
  var obj = {};
  
  obj["header"] = values[0];
  return values;
}

function removeArrayEmptyStrings(array){
  var filtered = array.filter(function (el, i) {
    if (i > 0){
      return el !== "";
    }
  });
  return filtered;
}

function spreadsheetToForm (sheet, form){
  // Constants
  var sheetId = ""; // scope is set to spreadsheet
  var sourceSheetName = "";
  var formId = ""; //
  // Sheets
  var SS = getSpreadsheetById(sheetId);
  var wsRequired = SS.getSheetByName(sourceSheetName);
  // Forms
  var form = FormApp.openById(formId);
  //   
  var formLists = getFormItemsByType(form, FormApp.ItemType.LIST);
  //
  for (var i = 0; i < formLists.length; i++){
    var formListItem = formLists[i];
    var formItemTitle = formListItem.getTitle();
    var index = wsRequired.getDataRange().getValues()[0].indexOf(formItemTitle) + 1;
    var indexToLetter = columnToLetter(index);
    var requiredChoices = wsRequired.getRange(`${indexToLetter}:${indexToLetter}`).getValues().flat();
    setFormItemChoices(formListItem, removeArrayEmptyStrings( requiredChoices ))
  }
  
}

function init() {  spreadsheetToForm(); }