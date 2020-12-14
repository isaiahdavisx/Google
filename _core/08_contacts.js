// 08	Contacts
function getContacts( e ) {
	/*	var s;
		var e = ContactsApp.getContacts(),
			a = [];
		for (var o in e) {
			var b = [];
			b.push(e[o].getFullName());
			b.push(e[o].getId());
			a.push(b);
		}*/
	s = [
		[ 'isaiah', 'isaiah.davisx@gmail.com' ],
		[ 'mike', 'isaiah.davisx@gmail.com' ],
		[ 'sallie', 'isaiah.davisx@gmail.com' ],
		[ 'rafdez', 'isaiah.davisx@gmail.com' ],
		[ 'dan', 'isaiah.davisx@gmail.com' ],
		[ 'miranda', 'isaiah.davisx@gmail.com' ]
	];
	// return a;
	return s;
}
/**
 * GoogleContacts integrates google contacts and spreadsheets
 */
function GoogleContacts( ) {
	var html = HtmlService.createHtmlOutputFromFile( 'GoogleContacts.html' ).setTitle( 'My add-on' );
	ModalSidebar( html );
}

function getContacts( ) {
	// single, multiple or all data
	// get multi layer object similar to JSON
	// build entire contacts json object
	var GContact = [ ],
		GContactNames = [ ],
		GContactDrive = [ ],
		GContacts = ContactsApp.getContactGroup( "Employee" ).getContacts( );
	for ( var x in GContacts ) {
		try {
			GContact[ x ] = {};
			// Name & Title Information
			GContact[ x ][ "names" ] = {};
			GContact[ x ][ "names" ][ "prefix" ] = GContacts[ x ].getPrefix( );
			GContact[ x ][ "names" ][ "fname" ] = GContacts[ x ].getGivenName( );
			GContact[ x ][ "names" ][ "mname" ] = GContacts[ x ].getMiddleName( );
			GContact[ x ][ "names" ][ "lname" ] = GContacts[ x ].getFamilyName( );
			GContact[ x ][ "names" ][ "suffix" ] = GContacts[ x ].getSuffix( );
			GContact[ x ][ "names" ][ "fullname" ] = GContacts[ x ].getFullName( );
			GContact[ x ][ "title" ] = GContacts[ x ].getCompanies( )[ 0 ].getJobTitle( );
			// Contact Information
			GContact[ x ][ "email" ] = GContacts[ x ].getEmails( ContactsApp.Field.WORK_EMAIL )[ 0 ].getAddress( );
			GContact[ x ][ "work" ] = GContacts[ x ].getPhones( ContactsApp.Field.WORK_PHONE )[ 0 ].getPhoneNumber( );
			GContact[ x ][ "mobile" ] = numberTOArray( GContacts[ x ].getPhones( ContactsApp.Field.MOBILE_PHONE )[ 0 ].getPhoneNumber( ) );
			// Drive Information
			if ( DriveApp.getFoldersByName( GContact[ x ][ "names" ][ "fullname" ] ) ) {
				GContactDrive[ x ] = DriveApp.getFoldersByName( GContact[ x ][ "names" ][ "fullname" ] ).next( );
			}
			GContact[ x ][ "drive" ] = {};
			GContact[ x ][ "drive" ][ "url" ] = GContactDrive[ x ].getUrl( );
			// Calendar
		} catch ( err ) {
			Logger.log( GContacts[ x ].getFullName( ) + " | " + err );
			continue;
		}
	}
	Logger.log( GContact );
	return GContact;
}
