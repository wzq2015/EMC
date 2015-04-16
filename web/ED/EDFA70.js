
/**
 * 初始状态下新增模板按钮不可用
 */
efform_onload = function (){
	efbutton.setButtonStatus("insert1",false);
};



//---------------模板服务的查询、新增、删除、修改---------------

/**
 * 查询模板服务
 */
button_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_result", "ed","EDFA70","query");
};

/**
 * 新增模板服务
 */
button_insert_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ed","EDFA70","insert",true );
};

/**
 * 删除模板服务
 */
button_delete_onclick = function () {
  	efgrid.submitForm( "ef_grid_result", "ed","EDFA70","delete", true );
  	
  	// ajax方式下更新可能得不到体现，需进一步改进
  	//暂时删除，与新增、修改同步
  	//efgrid.submitInqu( "ef_grid_file", "ed","EDFA70","queryFile");  
};

/**
 * 修改模板服务
 */
button_update_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ed","EDFA70","update",true );
};



//---------------模板文件的查询、删除、新增、下载---------------

/**
 * grid某行被选中时的回调函数
 * 选中主表中某行时，依据gridId查询从表
 */
efgrid_onRowClicked = function ( grid_id, row_index ){

  if (grid_id == "ef_grid_result") {

  	var grid = efgrid.getGridObject(grid_id);
  	var rowData = grid.getRowData(row_index);
  	
  	var gridId = rowData.gridId;
  	
  	if(gridId){
	  	ef.get("gridId").value=gridId;
	  	
	  	efbutton.setButtonStatus("insert1",true);
	
	  	try{
	    	efgrid.submitInqu( "ef_grid_file", "ed","EDFA70","queryFile");
	    }catch(ex){
	    }
  	}
  }
};

/**
 * 从上传页面放回时，重新查询该gridId对应的模板文件，体现出新增一条记录
 */   
edfa70_onDialogReturn = function(){
  	efgrid.submitInqu( "ef_grid_file", "ed","EDFA70","queryFile");
};
  

/**
 * 删除模板文件
 */
button_delete1_onclick = function () {
  	efgrid.submitForm( "ef_grid_file", "ed","EDFA70","deleteFile", true );
};

/**
 * 点击新增模板按钮后弹出上传模板对话框
 */
button_insert1_onclick = function () {		
	window.showModalDialog("DispatchAction.do?efFormEname=EDFA7001",
			window,"dialogWidth:500px;dialogHeight:300px;resizable:yes;help:no;");
};

  
/**
 * grid单元格渲染回调函数
 * 在每条模板文件记录的最后添加下载链接
 */
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
	
  if (grid_id != "ef_grid_file") return;
  
  var grid = efgrid.getGridObject( "ef_grid_file" );
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
  var rowData = grid.getRowData(row_index);
 
  switch (columnEname) {
	case "download":
		 templateFilepath = rowData.templateFilepath;	  
		 if(undefined != templateFilepath && null != templateFilepath && "" != templateFilepath)
//			 return "\<a  href='ED/EDFA70Download.jsp?templateFilepath="+templateFilepath+"'>下载</a>" ;
		    	return "<div align='center' efval=''><a  id='download_a' href='#' onclick=\"javascript:edfa70_download_templateFile('"
		    	+ templateFilepath + "')\">下载</a></div>" ;
	 
  }
};

/**
 * 点击下载链接的处理函数
 */
edfa70_download_templateFile = function(templateFilepath){

	var inInfo = new EiInfo();
	inInfo.set("templateFilepath",templateFilepath);
	EiCommunicator.send("EDFA70","isFileExist", inInfo);
	if(null == ajaxEi)
		return ;
	
	if(ajaxEi.get("fileExist")=="true"){
		ef.get("download").href="ED/EDFA70Download.jsp?templateFilepath="+templateFilepath;
		ef.get("download").click();
	}else{
		alert("该模板文件不存在！");
	}	
};

  