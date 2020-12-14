//////////////
// Services //
//////////////
function getOAuthToken( ) {
	return ScriptApp.getOAuthToken( );
}

function getFetch( url ) {
	return UrlFetchApp.fetch( url );
}
//////////////////////
// Helper Functions //
//////////////////////
function numberTOArray( e ) {
	return e.match( /(\d{3,})/g );
}

function alphaToNumeric( e ) {
	var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		i, j, result = 0;
	for ( i = 0, j = e.length - 1; i < e.length; i += 1, j -= 1 ) {
		result += Math.pow( base.length, j ) * ( base.indexOf( e[ i ] ) + 1 );
	}
	return result;
};

function columnToLetter( e ) {
	var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		i, j, result = 0;
	for ( i = 0, j = e.length - 1; i < e.length; i += 1, j -= 1 ) {
		result += Math.pow( base.length, j ) * ( base.indexOf( e[ i ] ) + 1 );
	}
	return result;
}

function appendFormulaData( e, t, n, a ) { setFormula( '=HYPERLINK("' + n + '", "' + a + '")' ) }

function subroutine( name ) {
	this[ name ]( );
}
Array.prototype.myMap = function ( callback ) {
	arr = [ ];
	for ( var i = 0; i < this.length; i++ ) arr.push( callback( this[ i ], i, this ) );
	return arr;
};

// https://stackoverflow.com/questions/22627125/grouping-consecutive-elements-together-using-javascript
// *convert all strings to intergers
function getConsecutiveArray( array ) {
	var result = [ ],
		temp = [ ],
		difference;
	for ( var i = 0; i < array.length; i += 1 ) {
		if ( difference !== ( array[ i ] - i ) ) {
			if ( difference !== undefined ) {
				result.push( temp );
				temp = [ ];
			}
			difference = array[ i ] - i;
		}
		temp.push( array[ i ] );
	}
	if ( temp.length ) {
		result.push( temp );
	}
	return result;
}
