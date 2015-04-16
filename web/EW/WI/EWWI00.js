efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value,grid_id ){
  	var grid=efgrid.getGridObject("ef_grid_workItem");
   
  	if( col_index == '4' ){
		taskId=grid.getCellValue(row_index,0,TYPE_DATA).trim();
		return "<a style='cursor:pointer' onclick=\"doSubmit('"+taskId+"');\">&nbsp;<font color=purple>执行</font>&nbsp;</a>" ; 
	}
}

function doSubmit(taskId){
	var contextpath=ef.get('contextpath').value;
	var efFormEname;
	
	var info=new EiInfo();	
	info.set("taskId",taskId);
	EiCommunicator.send('EWWI00','returnEFFORMNAME',info,null);

	if(null != ajaxEi){
		efFormEname = ajaxEi.get("efFormEname");
	}
	if(efFormEname!=null){		
		window.location.href=contextpath+"?efFormEname="+efFormEname+"&taskId="+taskId;		
	} else{
		alert("efFormEname is null!");
	}
}