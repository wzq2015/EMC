/**
*	页面加载时的回调函数
*/
efform_onload = function ()
{
//  efbutton.setButtonStatus("F6", false,true);
  	efregion.show("ef_region_result");
  	button_f2_onclick();
}
//查询按钮的回调函数  
button_f2_onclick = function () 
{

    var node = ef.getNodeById("efFormTime");
    var dd = new Date();
    node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("ER03"))) {
      efgrid.submitInqu( "ef_grid_result", "er","ER00","query");
    }
	
}
//grid显示完毕时的回调函数，选中当前第一行
efgrid_onGridDisplayReady = function (paintDivElement){

		if("ef_grid_result" == paintDivElement.id){
			grid = efgrid.getGridObject("ef_grid_result");
			if(grid.getRowCount() > 0){
				grid.setCurrentRowIndex(0);
			}	
		}
}   

//grid某行被选中时的回调函数
function efgrid_onRowClicked( grid_id, row_index )
{

  if (grid_id == "ef_grid_result") {

  	var grid = efgrid.getGridObject("ef_grid_result");
  	var rowData = grid.getRowData(row_index);
  	ef.get("reportId").value=rowData.reportId;
  	ef.get("reportBelongTo").value=rowData.reportBelongTo;
  	ef.get("reportVersion").value=rowData.reportVersion;
  	try{
    	efgrid.submitInqu( "ef_grid_result2", "er","ER03","queryReport");
    }catch(ex){
    }
  }
}
//日历弹出框
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
//grid单元格渲染函数
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){

  if (grid_id == "ef_grid_result"){
	  
	  var grid = efgrid.getGridObject( "ef_grid_result" );
	  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
	  var rowData = grid.getRowData(row_index);
	 
	  switch (columnEname) {
	    case "upload":
		   var fileModule = rowData.reportName;
		   var fileType;
		   
		   if (rowData.reportType == 1) fileType = "srt";
		   if (rowData.reportType == 2) fileType = "xml";
	
		    if("" != rowData.reportId) {
			  var path= "reportId=" + rowData.reportId + "&reportBelongTo=" 
					+ rowData.reportBelongTo +"&reportVersion=" + rowData.reportVersion
				    +"&type=" + fileType; 
		    	return "\<input value='上传' class='buttonclass' type='button' onclick='showUpdateWindow(\""+path+"\")'>" ;
		    } else {
		      return "";
		    }
		    break;
		case "download":
		  if(rowData.reportId != "")
			 reportFilePath = "model" + "/" + rowData.reportId + "/" 
			   + rowData.reportId + "_" + rowData.reportBelongTo + "_" + rowData.reportVersion +".xml";	  
		  if(col_index == 7){
		    	return "\<a href='ER/download.jsp?path="+reportFilePath+"'>下载</a>" ;
		  }
		  
		case "edit":
	      if (rowData.reportType == 2) {
		    	param = "reportId=" + rowData.reportId 
		    	  + "&reportBelongTo=" + rowData.reportBelongTo 
		    	  + "&reportVersion=" + rowData.reportVersion + "";
		    	  
		    	return "<a href=\"javascript:void(0)\" onclick=\"open_edit_form('"+ param + "','"
		    			+rowData.reportId+"','"+rowData.reportBelongTo+"','"+rowData.reportVersion+"')\">编辑</a>" ;
		  } else {
		    return "" ;  
		  }
		  break;
	    case "generate":
	      if (rowData.reportType == 2) {
		   	param = "reportId=" + rowData.reportId 
		    	  + "&reportBelongTo=" + rowData.reportBelongTo 
		    	  + "&reportVersion=" + rowData.reportVersion + "";
		    	return "<a href=\"javascript:void(0)\" onclick=\"efform.openNewForm('ER22','"+ param + "')\">生成</a>" ;
		  } else {
		    return "" ;  
		  }
		  break;
		case "reportStatus":
	      if (rowData.reportType == 2) {
		   	param = rowData.reportId 
		    	  + "," + rowData.reportBelongTo 
		    	  + "," + rowData.reportVersion + "";
			if(display_value =="1")	  
		    	return "<div align=center ><font color=red>锁定</font></div>" ;
			else
				return "<div align=center >未锁</div>" ;
		  } else {
		    	return "" ;  
		  }
		  break;		  
	  }
	}else if (grid_id == "ef_grid_result2"){
	  var grid = efgrid.getGridObject( "ef_grid_result2" );
	  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
	  var rowData = grid.getRowData(row_index);
	  
	  switch (columnEname) {	  
		case "view":
		  param = "reportFileName=" + rowData.reportFileName 
		    + "&reportId=" + rowData.reportId 
		    + "&reportBelongTo=" + rowData.reportBelongTo 
		    + "&reportVersion=" + rowData.reportVersion + "";
		  return "<a href=\"javascript:void(0)\" onclick=\"efform.openNewForm('ER23','"+ param + "', true)\">查看</a>" ;
		  break;	  
		case "uploadReport":
	/*	    if("" != rowData.reportFileName) {
			  var path= "reportId="+ef.get("inqu_status-0-reportId").value
			  	+"&"+; 
		    	return "\<input value='上传' class='buttonclass' type='button' onclick='showUpdateWindow(\""+path+"\")'>" ;
		    } else {
		      return "";
		    }		*/
		 break;
	  }	
	
	}
}
//报表文件删除js函数
button_f44_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result2", "er","ER03","delete", true );
}
//新添加记录时的触发函数
efgrid_onAddNewRow = function ( grid_id ){

	if(grid_id == "ef_grid_result2"){
		var grid = efgrid.getGridObject(grid_id);
		var selcount = grid.getCheckedRowCount();
		var returnValue = window.showModalDialog("DispatchAction.do?efFormEname=ER25",
			window,"dialogWidth:600px;dialogHeight:300px;resizable:yes;help:yes;");
		return false;
	}else{
	  	efbutton.setButtonStatus("F6", true);
  		efbutton.setButtonStatus("F3", false);
		return true;
	}
}


