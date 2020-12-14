// 07 Tasks
// https://developers.google.com/google-apps/tasks/v1/reference/tasklists
// patch
// get
// insert
// update
// toString
// list
// remove
function getTaskList( ) {
	var taskLists = Tasks.Tasklists.list( );
	if ( taskLists.items ) {
		for ( var i = 0; i < taskLists.items.length; i++ ) {
			var taskList = taskLists.items[ i ];
			Logger.log( 'Task list with title "%s" and ID "%s" was found.', taskList.title, taskList.id );
		}
	} else {
		Logger.log( 'No task lists found.' );
	}
}

function getTaskListMethods( ) {
	var taskLists = Tasks.Tasklists.patch( );
	for ( var key in taskLists ) {
		console.log( taskLists[ key ] );
	}
}

function getTask( ) {
	var list = getTaskLists( );
}
