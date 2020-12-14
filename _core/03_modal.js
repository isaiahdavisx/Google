function ModalSidebar( html ) {
	SpreadsheetApp.getUi( ).showSidebar( html );
}

function ModalDialog( html, title ) {
	SpreadsheetApp.getUi( ).showModalDialog( html, title );
}

function HTMLOutputFromFile( filename, title ) {
	var html = HtmlService.createHtmlOutputFromFile( filename ).setWidth( 1020 ).setHeight( 600 ).setSandboxMode( HtmlService.SandboxMode.IFRAME );
	ModalDialog( html, title );
}

function include( filename ) {
	return HtmlService.createHtmlOutputFromFile( filename ).getContent( );
}

function toast( data, title, time ) {
	SpreadsheetApp.getActiveSpreadsheet( ).toast( data );
}

function alert( msg ) {
	SpreadsheetApp.getUi( ).alert( msg );
}

function showAlert( str, fn ) {
	var ui = SpreadsheetApp.getUi( );
	var result = ui.alert( 'Please confirm', 'Are you sure you want to continue?', ui.ButtonSet.YES_NO );
	if ( result == ui.Button.YES ) {
		ui.alert( 'Confirmation received.' );
		doGet( 'helper' );
		if ( fn ) {
			fn( );
		}
	} else {
		ui.alert( 'Permission denied.' );
	}
}

function showPrompt( str ) {
	var ui = SpreadsheetApp.getUi( );
	var result = ui.prompt( 'Let\'s get to know each other!', 'Please enter your name:', ui.ButtonSet.OK_CANCEL );
	var button = result.getSelectedButton( );
	var text = result.getResponseText( );
	if ( button == ui.Button.OK ) {
		ui.alert( 'Your name is ' + text + '.' );
	} else if ( button == ui.Button.CANCEL ) {
		ui.alert( 'I didn\'t get your name.' );
	} else if ( button == ui.Button.CLOSE ) {
		ui.alert( 'You closed the dialog.' );
	}
}
