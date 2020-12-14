// https://developers.google.com/apps-script/reference/gmail/
function sendEmails( e ) {
	showSidebar( 'email', 'Send Email' );
}

function getThread( a, e ) {
	var threads = GmailApp.getInboxThreads( a, e );
	for ( var i = 0; i < threads.length; i++ ) {
		Logger.log( threads[ i ].getFirstMessageSubject( ) );
	}
}

function getUnreadEmails( ) {
	return GmailApp.getInboxUnreadCount( );
}

function sendToSelected( e, t ) {
	var a = getActiveRangeValues( t );
	var width;
	var initalWidth = getActiveSelection( ).getColumn( ); // do the same for row
	var message = "";
	var open = "<body>";
	var table = "<table cellspacing='0' cellpadding='0' dir='ltr' border='1' style='table-layout:fixed;font-size:10px;font-family:verdana,sans,sans-serif;border-collapse:collapse;border:none'>";
	var colgroup = "<colgroup>";
	var tbody = "<tbody>";
	var content = "";
	for ( var i = 0; i < a.length; i++ ) {
		if ( i === 0 && t === true ) {
			content += "<tr style='background-color: rgb(60,120,216);font-weight: bold;color: rgb(255,255,255);white-space: nowrap;vertical-align: middle;text-align: left;height:25px;'>";
		} else {
			content += "<tr style='height: 25px;font-weight: bold;'>";
		}
		for ( var k = 0; k < a[ i ].length; k++ ) {
			width = getColumnWidths( initalWidth + k );
			colgroup += "<col width='" + width + "'></col>";
			if ( i === 0 && t === true ) {
				content += "<td style='padding: 2px 3px;border: 1px solid #5eaefe;'>" + a[ i ][ k ] + "</td>";
			} else {
				content += "<td style='padding: 2px 3px;color: rgb(102,102,102);border: 1px solid grey;'>" + a[ i ][ k ] + "</td>";
			}
		}
		content += "</tr>";
	}
	colgroup += '</colgroup>'
	close = "</tbody></table></body>";
	message = open + table + colgroup + tbody + content + close;
	console.log( width );
	for ( var i = 0; i < e.length; i++ ) {
		GmailApp.sendEmail( e[ i ], 'Attachment example', 'Please see the attached file.', { htmlBody: message } );
	}
}

function getFilter( params, limit ) {
	var query = params.selector + ":(" + params.email + ")";
	var limit = params.limit;
	var thread = GmailApp.search( query, 0, limit );
	var collection = [ ];
	for ( var a = 0; a < limit; a++ ) {
		var item = {};
		item[ 'subject' ] = thread[ a ].getFirstMessageSubject( );
		item[ 'id' ] = thread[ a ].getId( );
		item[ 'link' ] = thread[ a ].getPermalink( );
		// collection[a] = message[a].getFirstMessageSubject();
		collection[ a ] = item;
	}
	return collection;
}

function getFilterLabels( ev ) {
	return GmailApp.GmailLabel.getUserLabels( )
}

function getMessageThreads( threadId ) {
	return GmailApp.getMessageById( threadId )
}

function message( e ) {
	if ( !e.to ) { return false; }
	var files = [];
	var msg = "";
	var table = "<Copy&PasteJobOrder>";
	Logger.log(e)
	if (e.attach && e.attach.length > 0){
		e.attach.forEach(function(el, i){
		files[i] = DriveApp.getFileById(el);
		})
	} else {
		files = null;
	}
	// Message
	msg += "Hello\s" + e.to + ",\r\r";
	msg += "PREMIER Design + Build Group, LLC would like to place an order for the following:\r\r";
	msg += table + "\r\r";
	msg += "Please provide the proof before production of order.\r\r";
	msg += "Thank You,\rIsaiah Davis\r\rAttached is the artwork.";
	// Processing
	GmailApp.sendEmail( 
		e.to, 
		e.subject, 
		msg,
		{
			attachments: files,
			name: e.subject,
			htmlBody: e.message
		} 
	);
	// Append Order to Sheet

	// Create a watch shipping status trigger?
	return GmailApp.getInboxThreads( )[ 0 ].getFirstMessageSubject( );
}