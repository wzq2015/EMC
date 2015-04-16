have_check = function(gridId){
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	if(rows.length>0){
 		return true;
 	}else{
 		return false;
 	}
}

check_newLine = function(gridId) {
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	for ( var i = 0; i < rows.length; i++ ) {
	 	if(grid.isNewLine(rows[i])==1){
	  		return true;
	  	}
	}
	return false;
}

check_allNewLine = function(gridId) {
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	for ( var i = 0; i < rows.length; i++ ) {
	 	if(grid.isNewLine(rows[i])!=1){
	  		return false;
	  	}
	}
	return true;
}