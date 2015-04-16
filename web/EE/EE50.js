efform_onload = function()
{
	efregion.show("ef_region_result");
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
	  var grid = efgrid.getGridObject( "ef_grid_result" );

	  var cellValue = grid.getCellValue(row_index,0,TYPE_DATA);
	  var id = grid.getCellValue(row_index,1,TYPE_FIX);


	  if( col_index == 1 ){

	    if("" != id)
	    	return "\<input value='上传' class='buttonClass' type='button' onclick='showUpdateWindow(\""+id+"\",\""+row_index+"\")'>" ;
	    else
	    	return "";
	  }
	  if(col_index == 2){
	    if("" !=cellValue)
	    	return "\<a href='./EE/uploadjsp/downfromdbtoclient.jsp?id="+id+"'>下载</a>" ;
	    else
	    	return "" ;
	  }
}

showUpdateWindow = function(id,row){
	left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
	window.open("./EE/uploadjsp/filechoose.jsp?id="+id+"&rowIndex="+row,"","left="+left1+",top="+top1+",width=400,height=200,resizable=yes,depend=yes");

}

efgrid_onRowClicked = function (id ,row_index){
	var grid = efgrid.getGridObject(id);
	showimage(grid.getCellValue(row_index,1,TYPE_FIX));

}

uploadSuc = function (id,row){
	var grid = efgrid.getGridObject("ef_grid_result");

	grid.setCellValue(row,0,id,TYPE_DATA);

	grid.refreshCell(row,0,TYPE_DATA);

}