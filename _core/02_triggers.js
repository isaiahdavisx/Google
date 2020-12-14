function doGet( request ) {
	return HtmlService.createTemplateFromFile( 'Page' ).evaluate( );
}

function doPost( e ) {}

function onInstall( e ) {}

function onOpen( ) {
	// Explore dynamically attaching extensions
	SpreadsheetApp.getUi( )
		.createMenu( 'Custom Scripts' )
			.addItem( '(#m) PMTracker', 'PMTracker' )
			.addItem( '(#k) Compose Email', 'GoogleMail' )
			.addItem( '(#f) Attach File', 'GoogleDrive' )
			.addItem( '(#c) View Emails', 'GoogleContacts' )
		.addToUi( );
}

function onEdit( e ) {
	keyshortcodes = {
		"m" : function () {console.log('hello, world')},
		"k" : function () {console.log('hello, world')}
	}

	var target = e,
		targetRange = target.range,
		targetA1Notation = targetRange.getA1Notation( );
	var targetValue = target.value,
		targetOldValue = target.OldValue;
	var operator = e.value.match( /(#)(.)/ );
	if ( getActiveSheet( ).getName( ) === 'Gantt' ) {
		// Get Preset Column View Filter
		if (targetValue !== targetOldValue) {
			var tmp = targetValue.toLowerCase( );
			if ( targetA1Notation === "D1" ) { FilterViews[ tmp ]( ); }
			if ( targetA1Notation === "D2" ) { FilterProjects[ tmp ]( ); }
		}
	}
}
// onChange Handler
function onChange( e ) {
	log( e.source.getSheets( )[ 0 ].getActiveRange( ).getA1Notation( ) );
}
// App Specific
function PMTracker( ) {
	var html = HtmlService.createHtmlOutputFromFile( 'PMTracker.html' ).setTitle( 'My add-on' );
	SpreadsheetApp.getUi( ).showSidebar( html );
}

function GoogleMail( ) {
	var html = HtmlService.createHtmlOutputFromFile( 'GoogleMail.html' ).setTitle( 'My add-on' );
	SpreadsheetApp.getUi( ).showSidebar( html );
}

function GoogleDrive( ) {
	HTMLOutputFromFile( 'GoogleDrive.html', "Select a file" );
}

function GoogleContacts( ) {
	var html = HtmlService.createHtmlOutputFromFile( 'GoogleContacts.html' ).setTitle( 'My add-on' );
	ModalSidebar( html );
}