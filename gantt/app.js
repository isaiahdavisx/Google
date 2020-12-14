var GanttActions = {};
var FilterViews;
var FilterProjects;
// PROPERTIES
GanttActions[ 'views' ] = {};
GanttActions[ 'projects' ] = {};
// Create Event Handler; Dynamically get view filters and attach event
// COMPACTx, DURATIONx, PERCENTx, PROJECTSx, COMPACT - DETAILSx, SHOW ALLx, PREDESSORSx, HIDE ALLx
FilterViews = GanttActions.views;
FilterViews[ "compact" ] 			= function ( e ) { hideColumns([ 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]); } //works
FilterViews[ "compact-details" ] 	= function ( e ) { hideColumns([ 5, 8, 9, 10, 11, 12, 13, 14 ]); }
FilterViews[ "duration" ] 			= function ( e ) { hideColumns([ 2, 5, 8, 9, 10, 11, 12, 13, 14 ]); }
FilterViews[ "percent" ] 			= function ( e ) { hideColumns([ 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]); }
FilterViews[ "predessors" ] 		= function ( e ) { hideColumns([ 5, 8, 9, 10, 11, 12, 13, 14 ]); }
FilterViews[ "projects" ] 			= function ( e ) { hideColumns([ 5, 8, 9, 10, 11, 12, 13, 14 ]); }
FilterViews[ "hide all" ] 			= function ( e ) { hideColumns([ 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]); }
FilterViews[ "show all" ] 			= function ( e ) { showColumns();}
//
FilterProjects = GanttActions.projects;
FilterProjects[ "estimating" ]			= function ( e ) { hideRows(getNamedRangeByName('WBSTasks')); }
FilterProjects[ "marketing" ]			= function ( e ) { hideRows(getNamedRangeByName('WBSTasks')); }
FilterProjects[ "hide all" ]			= function ( e ) { hideRows(getNamedRangeByName('WBSTasks') ); }
FilterProjects[ "show all" ]			= function ( e ) { showRows(); }