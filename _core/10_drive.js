// 10 Drive
function file_exists( a ) {
	if ( parseInt( a ) ) DriveApp.getFileById( a )
	else DriveApp.getFileByName( a );
}

function folder_exists( a ) {
	if ( parseInt( a ) ) DriveApp.getFolderById( a )
	else DriveApp.getFolderByName( a );
}

function getFoldersByName( name ) {
	return DriveApp.getFoldersByName( name );
}

function getFileData( ) {
	var e = {},
		r, a = "sample";
	if ( typeof a === "string" ) r = DriveApp.getFilesByName( a ).next( );
	return {
		getBlob: r.getBlob( ),
		getDateCreated: r.getDateCreated( ),
		getDescription: r.getDescription( ),
		getDownloadUrl: r.getDownloadUrl( ),
		getEditors: r.getEditors( ),
		getId: r.getId( ),
		getLastUpdated: r.getLastUpdated( ),
		getMimeType: r.getMimeType( ),
		getName: r.getName( ),
		getOwner: r.getOwner( ),
		getParents: r.getParents( ),
		getSharingAccess: r.getSharingAccess( ),
		getSharingPermission: r.getSharingPermission( ),
		getSize: r.getSize( ),
		getThumbnail: r.getThumbnail( ),
		getUrl: r.getUrl( ),
		getViewers: r.getViewers( ),
		getAll: function ( ) {}
	}
}

function getFilesByName( e ) {
	return DriveApp.getFilesByName( e ).next( );
}

function createFile( e ) {
	return DriveApp.createFile( e );
}

function processForm( formObject ) {
	var formBlob = formObject.myFile;
	var driveFile = DriveApp.createFile( formBlob );
	return driveFile.getUrl( );
}

function GoogleDrive( ) {
	HTMLOutputFromFile( 'GoogleDrive.html', "Select a file" );
}

function getDrive( ) {
	for ( var key in object ) {}
}

function idkyet( obj ) {
	var file = DriveApp.getFileById( obj.fileId );
	GmailApp.sendEmail( obj.recipient, obj.subject, obj.message, {
		attachments: [ file.getAs( MimeType.PDF ) ],
		name: obj.filename
	} );
}

function getFoldersUnderRoot( ) {
	var root = DriveApp.getRootFolder( );
	var folders = root.getFolders( );
	var folderSet = {};
	while ( folders.hasNext( ) ) {
		var folder = folders.next( );
		folderSet[ folder.getId( ) ] = folder.getName( );
	}
	return folderSet;
}

function getDrive( ) {
	for ( var key in object ) {}
}
