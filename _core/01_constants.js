var SPREADSHEET = SpreadsheetApp;
var DOCUMENT = DocumentApp;
var CALENDAR = CalendarApp;
var CONTACTS = ContactsApp;
var DRIVE = DriveApp;
var GMAIL = GmailApp;
var GROUPS = GroupsApp;
var LANGUAGE = LanguageApp;
var MAPS = Maps;
var SITES = SitesApp;
var SLIDES = SlidesApp;
var FORM = FormApp;
var PROPERTIESSERVICE = PropertiesService;
// 
// var scriptproperties = PROPERTIESSERVICE.getScriptProperties( );
// var userproperties = PROPERTIESSERVICE.getUserProperties( );
// var documentproperties = PROPERTIESSERVICE.getDocumentProperties( );
var hiddenCoumns,
	hiddenRows;
// Set a property in each of the three property stores.
// Helper
function log( msg ) {
	Logger.log( msg );
	console.log( msg );
}

function clear( ) {
	Logger.clear( );
}