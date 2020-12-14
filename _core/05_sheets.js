//////////////////////////////////////////////////////////////////////
// SPREADSHEET
//////////////////////////////////////////////////////////////////////
function getActiveSpreadsheet( ) {
	return SPREADSHEET.getActive( );
}

function getActiveSheet( ) {
	return SPREADSHEET.getActiveSheet( );
}
///////////
// SHEET //
///////////
function hideColumns( columns ) {
	var originals = getConsecutiveArray(columns);
	var copys = originals.slice(0);
	var limit = [];
	var temp = [];
	var msg = '';
	for (var i = 0; i < copys.length; i++) {
		temp[i] = copys[i];
		limit[i] = (temp[i].length - 1);
		log(temp[i] + " : " + limit[i]);
		if (limit[i] === 0) {
			getActiveSheet().hideColumns(temp[i][0]);
		} else {
			getActiveSheet( ).hideColumns( temp[i][0], limit[i] );
		}
	}

	msg = 'Rows: ';
	msg += copys;
	msg += ' have been hidden.';
	toast(msg);
}

function showColumns() {
	var startColumn = 1;
	var endColumn = getLastColumn();
	getActiveSheet().showColumns(startColumn, endColumn);
}

function showRows() {
	var startColumn = 1;
	var endColumn = getLastRow();
	getActiveSheet().showRows(startColumn, endColumn);
}

function setFrozenRow(row) {
	getActiveSheet().setFrozenRows(row)
}

function getFrozenRows() {
	return getActiveSheet().getFrozenRows();
}

function setFrozenColumn(column) {
	getActiveSheet().setFrozenColumns(column)
}

function getFrozenColumns() {
	return getActiveSheet().getFrozenColumns();
}

function hideRows( range ){
	// consider merging with hideColumns
	// argument considerations - should be able to take both a range or array object;
	var originals = range.getValues();
	var copys = originals.slice(0);
	var groups = [];
	var closed = false;
	var a = 0;
	var offset = 1;
	getActiveSheet().hideRows(5,17)
	getActiveSheet().hideRows(23,3)
	getActiveSheet().hideRows(27,3)
	// for ( var i = offset; i < copys.length; i++){
	// 	if (parseInt(copys[i][0])) {
	// 		if (groups.length >= 2) {
	// 			getActiveSheet().hideRows((groups[a-1]+4),3)
	// 		}
	// 		groups.push(i);
	// 		a++;
	// 		log(groups);
	// 	}
	// }
}

function setHiddenColumns( array ) {
	var obj = {};
	obj[ 'id' ] = "";
	obj[ 'visiblity' ] = false;
	obj[ 'timestamp' ] = new Date( );
	obj[ 'columns' ] = array;
	hiddenColumns = obj;
}

function getHiddenColumns( ) {
	return hiddenColumns;
}

function clearHidden( ) {
	var hidden = getHiddenColumns( );
	for ( var i = 0; i < hidden.columns.length; i++ ) {
		getActiveSpreadsheet( ).unhideColumn( hidden.columns[ i ] );
	}
}

function getSheetByName( name ) {
	return getActiveSpreadsheet( ).getSheetByName( name );
}

function getActiveSheet( ) {
	return getActiveSpreadsheet( ).getActiveSheet( );
}

function getActiveCell( ) {
	return getActiveSheet( ).getActiveCell( );
}

function getActiveCellRange( e ) {
	var x = [ ];
	x[ 0 ] = e.range.getRowIndex( ) || getActiveCell( ).getRowIndex( );
	x[ 1 ] = e.range.getColumn( ) || getActiveCell( ).getColumn( );
	return getActiveSheet( ).getRange( x[ 0 ], x[ 1 ] );
}

function setActiveCellRange( range, fn ) {
	SPREADSHEET.setActiveRange( range );
	if ( fn ) {
		// clear cell if inserting data
		fn( );
	}
}

function getActiveSheetValues( range ) {
	return getActiveSheet( ).getRange( range ).getValues( );
}
//////////////////
// NAMED RANGES //
//////////////////
function getNamedRanges( ) {
	var namedRanges = getActiveSpreadsheet( ).getNamedRanges( );
	var namedRangeObj = {};
	var namedRangeArray = [ ]; // do something with data; attach to object
	for ( var key in namedRanges ) {
		namedRangeArray[ key ] = namedRanges[ key ].getName( );
		namedRangeObj[ namedRangeArray[ key ] ] = namedRanges[ key ].getRange( );
	}
	return namedRangeObj;
}

function getNamedRangeByName( name ) {
	return getNamedRanges( )[ name ];
}
// expose object onOpen & onChange for global usage
function hideColumnsByNamedRangeIndex( range, array ) {
	var namedRangeValues = getRangeValues( range );
	for ( var i = 0; i < array.length; i++ ) {
		log( array[ i ] );
	}
}
////////////
// RANGE  //
////////////
function getRangeFromActiveSheet( x, y ) {
	return getActiveSheet( ).getRange( x, y );
}

function getColumnSheetHeader( ) {
	return getActiveSheet( ).getRange( 1, 1, 1, getLastColumn( ) );
}

function getActiveCellRange( e ) {
	var activeCell = getActiveCell( );
	var range = e.range;
	var x, y;
	// 
	x = range.getRow( ) || activeCell.getRow( );
	y = range.getColumn( ) || activeCell.getColumn( );
	// 
	return getRangeFromActiveSheet( x, y );
}

function getLastColumn( ) {
	return getActiveSheet( ).getLastColumn( );
}
////////////
// VALUES //
////////////
function setActiveCellValue( msg ) {
	getActiveCell( ).setValue( msg );
}

function getRangeValues( range ) {
	return range.getValues( )[ 0 ];
}

function getActiveCellValue( ) {
	return getActiveCell( ).getValue( );
}

function setActiveCellRange( range ) {
	SPREADSHEET.setActiveRange( range );
}
////////////
// CUSTOM //
////////////
function addRows( e ) {
	var columnLimit = getLastColumn( );
	if ( e.header === true ) {
		getActiveSheet( ).insertRowsBefore( 2, e.numRows )
	} // copyRowBeforeLastRow
	return {
		copyRowBefore: function ( ) {
			var x = ( 2 + e.numRows );
			getActiveSheet( ).getRange( x + ":" + x );
			getActiveSheet( ).getRange( x + ":" + x ).copyTo( getActiveSheet( ).getRange( 2 + ":" + ( e.numRows + 1 ) ), {
				contentsOnly: true,
				formatOnly: true
			} );
		},
	}
}

function getColumnWidths( e ) {
	return getActiveSheet( ).getColumnWidth( e );
}

function getActiveSelection( ) {
	return getActiveSheet( ).getActiveSelection( );
}

function getActiveRangeValues( e ) {
	var a = getActiveSheet( ).getActiveRange( ).getValues( ),
		b;
	if ( e === true ) {
		b = getActiveRangeHeader( ).getValues( )[ 0 ];
		a.unshift( b );
	}
	return a;
}

function getSelectionA1Notation( ) {
	return getActiveSpreadsheet( ).getActiveSelection( ).getSelectionA1Notation( );
}
// option to keep styling 
function getActiveRangeHeader( ) {
	var f = getActiveSelection( ).getColumn( ),
		l = getActiveRangeNumCol( );
	return getActiveSheet( ).getRange( 1, f, 1, l );
}

function getActiveRangeNumCol( ) {
	return getActiveSheet( ).getActiveRange( ).getNumColumns( );
}

function getActiveSheetId( ) {
	return getActiveSpreadsheet( ).getId( );
}

function getSheetByName( e ) {
	return getActiveSpreadsheet( ).getSheetByName( name );
}

function openFilesByName( e ) {
	return SPREADSHEET.open( getFilesByName( 'Manager' ) );
}

function getSheetById( e ) {
	return SPREADSHEET.getSheetById( e );
}

function getSheet( e ) {
	if ( typeof e === "string" ) {
		try {
			getSheetByName( e );
		} catch ( err ) {
			getSheetById( e );
		}
	}
}

function clearNotes( ) { getActiveSpreadsheet( ).getActiveCell( ).clearNote( ); }

function setNotes( e ) {
	var t = getActiveSpreadsheet( ).getActiveCell( );
	if ( t.getValue( ) ) t.setComment( e )
	else clearNotes( );
}

function getActiveRange( ) {
	return Spreadsheet.getActiveRange( );
}

function setFormula( str ) {
	getActiveRange( ).setFormula( formula );
}
// Sort
function autoComplete( e, t ) {
	var n, a, r, o;
	switch ( n = t[ 2 ].getColumn( ) ) {
		case 1: // if column editing is on 1
			r = parseInt( t[ 0 ] ); //  cell value: ex 1
			a = r + 2; // 1 + 2 = 3 = a
			addRows( { header: true, numRows: r } ).copyRowBefore( );
		default:
			console.log( "no action" )
	}
}
/**
 * Process information to Docs
 * @param  {str} a executable operation
 * @return {[type]}   [description]
 */
function sheetsToDocs( a ) {
	// display information
	// provide user with gui interface to select executable scripts
	showSidebar( );
	return {
		export: function ( ) {
			console.log( a );
		},
	}
}

function copyLastRow( a, r ) {
	var o, t;
	t = getActiveSheet( ).getRange( a + ":" + a ).copyTo( getActiveSheet.getRange( "2:4" ), {
		contentsOnly: true,
		formatOnly: true
	} );
}
// Exporters
/**
 * [exportSheetToDrive Time-driven function]
 * @return {sheet} 
 */
function exportSheetToDrive( s ) {
	// Time-driven function
	// if selection greater than 1 cell? 
	// get settings information
	// if active sheet is open 
	// user selection of destination folder
	// option to silence operation
}
/**
 * [saveAsCSV description]
 * @param  {str} a output file extension
 * @return {[type]}   [description]
 */
function saveAsCSV( a ) {
	if ( a === !0 && void 0 ) a = "CSV"; // set default to CSV
	var fileName = Browser.inputBox( "Set Default Filename:" );
	if ( fileName.length !== 0 ) {
		fileName = fileName + ".CSV";
		var csvFile = convertRangeToCsvFile_( fileName );
		DriveApp.createFile( fileName, csvFile, MimeType.CSV );
	} else {
		// Browser.msgBox("Error: Please enter a valid filename.");
	}
}
/**
 * Convert to TSV
 * @param  {str} file user selected filename
 */
function convertRangeToCsvFile( file ) {
	var ws = getActiveSelection( );
	var data = ws.getValues( );
	var header = getActiveRangeHeader( ).getValues( );
	console.log( data );
	console.log( header );
	/*try {
		var csvFile = undefined;
		if (data.length > 1) {
			var csv = "";
			for (var row = 0; row < data.length; row++) {
				for (var col = 0; col < data[row].length; col++) {
					if (data[row][col].toString().indexOf(",") != -1) {
						data[row][col] = "\"" + data[row][col] + "\"";
					}
				}
				if (row < data.length - 1) {
					csv += data[row].join(",") + "\r\n";
				} else {
					csv += data[row];
				}
			}
			csvFile = csv;
		}
		return csvFile;
	} catch (err) {
		Logger.log(err);
		// Browser.msgBox(err);
	}*/
}
