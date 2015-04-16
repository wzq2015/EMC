
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM06","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM06","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM06","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM06","update",true );
}

/**
	grid单元格显示时，显示按钮信息。
*/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
	  var grid = efgrid.getGridObject( "ef_grid_result" );

	  var fileId = grid.getCellValue(row_index,1,TYPE_FIX);
	  var fileUrl = grid.getCellValue(row_index,0,TYPE_DATA,true);
	  var haveObj = grid.getCellValue(row_index,3,TYPE_DATA);
	  if( col_index == 1 ){
	    if("" != fileId)
	    	return "\<input value='上传到服务器' class='buttonClass' type='button' onclick='showUpdateWindow(\""+fileId+"\",\""+row_index+"\",\""+"server"+"\")'>" ;
	    else
	    	return "";
	  }else if(col_index == 2){
	    if("" !=fileUrl)
	    	return "<div align=center ><a href='./EE/DM/EEDM0604.jsp?id="+fileId+"'>从服务器下载</a></div>" ;
	    else
	    	return "" ;
	  }else if(col_index == 4){
	    if("" != fileId)
	    	return "<div align=center ><input value='上传到数据库' class='buttonClass' type='button' onclick='showUpdateWindow(\""+fileId+"\",\""+row_index+"\",\""+"DB"+"\")'></div>" ;
	    else
	    	return "";
	  }else if(col_index == 5){
	    if("" != haveObj)
	    	return "<div align=center ><a href='./EE/DM/EEDM0603.jsp?id="+fileId+"'>从数据库下载</a></div>" ;
	    else
	    	return "";
	  }
}

/**
	弹出文件选择框
*/
showUpdateWindow = function(id,row,type){
	left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;

	window.open("./EE/DM/EEDM0601.jsp?id="+id+"&rowIndex="+row+"&type="+type,"","left="+left1+",top="+top1+",width=400,height=200,resizable=yes,depend=yes");

}

/**
	选择当前行时，显示数据库对应的图片文件
*/
efgrid_onRowClicked = function (id ,row_index){
	var grid = efgrid.getGridObject(id);
	var haveObj = grid.getCellValue(row_index,3,TYPE_DATA);
	if("" == haveObj){
		document.getElementById("image").src="./EE/uploadjsp/showimage1.jsp?id=5";
	}else
		showimage(grid.getCellValue(row_index,1,TYPE_FIX));
}

/**
	上传成功后，刷新grid
*/
uploadSuc = function (value,row,type){
	var grid = efgrid.getGridObject("ef_grid_result");
	type=="server"?col=0:col=3;
	grid.setCellValue(row,col,value,TYPE_DATA);
	grid.refreshCell(row,col,TYPE_DATA);
	grid.refreshCell(row,col+2,TYPE_DATA);
}
/**
	显示图片文件
*/
function showimage(id){
	document.getElementById("image").src="./EE/DM/EEDM0603.jsp?id="+id;
}


