//SUPPORT
function getSheetByName (name) {
    return SpreadsheetApp.getActiveSpreadsheet( ).getSheetByName(name);
}

function getMessageThreads( threadId ) {
	return GmailApp.getMessageById( threadId );
}

function Output( msg ) {
	SpreadsheetApp.getActiveSheet( ).getActiveCell( ).setValue( msg );
}

function getFilter( params ) {
    /*
      * Record last date update
      * Get Yesterdays completed thread conversation
    */
	// GLOBAL
	var collection = [ ];
	// FORM
	var EMAIL = params[ 'email' ];
    var BEFORE = "before:" + params[ 'limit' ][1];
    var AFTER = "after:" + params[ 'limit' ][0];
    var FROM = params[ 'selector' ] + ":(" + EMAIL + ")";
    var QUERY = FROM + " " + AFTER + " " + BEFORE;

	// GMAILAPP : SEARCH
	var FILTER = GmailApp.search( QUERY )[0];
    var MESSAGES = FILTER.getMessages()
//    // LOOP : TABLE TR
	for ( var a = 0; a < MESSAGES.length; a++ ) {
        var item = {};
        // LOOP : TABLE TD
        item[ 'subject' ] = MESSAGES[a].getSubject();
		item[ 'id' ] = MESSAGES[a].getId( );
		item[ 'link' ] = FILTER.getPermalink();
		item[ 'html' ] = MESSAGES[a].getBody();
		collection[ a ] = item;
	}
	return collection;
}
// boolean copy obj - default true;
function getHeaderNData( obj, bool ) {
	// CONDITIONAL : CLONE OBJ
	if ( bool === undefined ) {}
	// GLOBAL
	var CLONE = obj.slice( 0 );
	var HEADER = CLONE.splice( 0, 1 );
	var DATA = CLONE;
	var PKG = [ HEADER, CLONE ];
	//    
	return PKG;
}
// Creates an object for ease association with 
function getEmployeesRange(){
    // GLOBAL
    var OBJ = {};
    // SPREADSHEETAPP
    var SSEMPLOYEES = getSheetByName( 'Employees' );
    var SSLASTCOLUMN = SSEMPLOYEEJOBS.getLastColumn( );
    var SSROWLAST = SSEMPLOYEEJOBS.getLastRow( );
    //
}

function getEmployeeRowNumber (arr) {
    var RESULT = {};
    var OFFSET = 3;
    for(i = 0; i < arr.length; i++){
        RESULT[arr[i][0]] = i;
    }
    return RESULT;
}

function setEmployeesToJobs( DATACOLLECTION ) {
	// GLOBAL
	var newValues = [ ];
	var index = 0;
	var OFFSET = 3;
	var COLUMN = 0;
	var ROW = 0;
    var MARKETCOLOR = [];
    var STATUS = [];
    // MARKET COLORS
    MARKETCOLOR[0] = null; // Error
    MARKETCOLOR[1] = "#000000"; // Industrial
    MARKETCOLOR[2] = "#000000"; // Commercial
    MARKETCOLOR[3] = "#000000"; // Medical
    MARKETCOLOR[4] = "#000000"; // Adaptive ReUse
    MARKETCOLOR[5] = "#000000"; // Interiors
    // STATUS
    STATUS[0] = "";
	// SPREADSHEETAPP
	var SSEMPLOYEEJOBS = getSheetByName( 'EmployeesJobs' );
	var SSLASTCOLUMN = SSEMPLOYEEJOBS.getLastColumn( );
	var SSROWLAST = SSEMPLOYEEJOBS.getLastRow( );
	// RANGE
	var SHEETRANGE = SSEMPLOYEEJOBS.getRange( 1, 1, SSROWLAST, SSLASTCOLUMN );
	var SHEETVALUES = SHEETRANGE.getValues( );
    // EMPLOYEES
    var EMPLOYEENAMERANGE = SSEMPLOYEEJOBS.getRange(1, 2, SSROWLAST);
    var EMPLOYEENAMES = EMPLOYEENAMERANGE.getValues().slice(0);
    var EMPLOYEEROW = getEmployeeRowNumber(EMPLOYEENAMES);
	var RESULT;
    // TEST
    // var DATACOLLECTION = [{users: "Danielle Stafford", job:"xxxx"}];
    // REVISED LOOP
    if (DATACOLLECTION){
      // TABLE TR
        for (var a = 0; a < DATACOLLECTION.length; a++){
          //
          if (EMPLOYEEROW[DATACOLLECTION[a]['users']]){
              var SELECTRANGE = {};
              var ACTIVEROW;
              SELECTRANGE[ 'row' ] = EMPLOYEEROW[DATACOLLECTION[a].users];
              ACTIVEROW = SHEETVALUES[SELECTRANGE[ 'row']];
              for(b = 0; b < ACTIVEROW.length;b++){
                  if (!ACTIVEROW[b] && ACTIVEROW.indexOf(DATACOLLECTION[a].job) === -1){
                    var NOTE = "";
                    SELECTRANGE[ 'column' ] = b;
                    NOTE += DATACOLLECTION[a].name + "\r\n";
                    NOTE += new Date();
                    // CONDITIONAL : ** MARKET && STATUS COLOR INDICATORS **
                    SSEMPLOYEEJOBS.getRange(SELECTRANGE.row + 1, SELECTRANGE.column + 1).setValue( DATACOLLECTION[ a ].job ).setBackground( '#3c78d8' ).setFontColor( '#ffffff' ).setNote( NOTE );
                    ACTIVEROW[b] = DATACOLLECTION[ a ].job
                    break;
                  }
              }
            }
        }
    }
    Logger.log(SHEETVALUES)
}