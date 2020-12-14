// 09 Docs
function createDoc( ) {
	var doc = DocumentApp.openById( '1o5U5h1xNpTe3K7xS4Pb0ej4zPipDwLtcoWPBfxqSJWE' );
	var body = doc.getBody( );
	var rowsData = [
		[ 'Hours', 'Task Description', 'Rate', 'Line Total', '+' ],
		[ '1', 'Web Design', '$75', '75', '+' ]
	];
	body.insertParagraph( 0, doc.getName( ) ).setHeading( DocumentApp.ParagraphHeading.HEADING1 );
	table = body.appendTable( rowsData );
	table.getRow( 0 ).editAsText( ).setBold( true );
}
