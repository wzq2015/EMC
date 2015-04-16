//该函数变量用来保存已经保存平台的_getEi函数
__getEi = null;

//页面加载时的初始化函数
efform_onload = function ()
{
  efbutton.setButtonStatus("F6", false);
  //efregion.show("ef_region_inqu");
  //efregion.toggleShow("ef_region_inqu");
  
  if (ef.get("efFormPopup").value == "1") {
    efform.setStatus(1, "点击查询出的报表ID，即可将点选的纪录返回！");   
  } 

}
//查询按钮触发事件
button_f2_onclick = function () 
{
    var node = ef.getNodeById("efFormTime");
    var dd = new Date();
    node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("ER00"))) {
      efgrid.submitInqu( "ef_grid_result", "er","ER00","query");
    }
	
}
//修改按钮 触发事件    
button_f3_onclick = function () 
{
	
	//debugger;
	efgrid.submitForm( "ef_grid_result", "er","ER00","update",true );
}
//删除按钮 触发事件
button_f4_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "er","ER00","delete", true );
}
//插入按钮 触发事件
button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "er","ER00","insert",true );
}
//锁定按钮触发事件
button_lock_onclick = function () 
{
	ef.get("type").value="lock";
	efgrid.submitForm( "ef_grid_result", "er","ER00","setReportStatus",true );
}

//报表模板的解锁按钮触发事件
button_unlock_onclick = function () 
{
	ef.get("type").value="unLock";
	efgrid.submitForm( "ef_grid_result", "er","ER00","setReportStatus",true );
}

//新增加报表模板记录时的回调函数
efgrid_onAddNewRow = function( grid_id )
{
  efbutton.setButtonStatus("F6", true);
  efbutton.setButtonStatus("F3", false);
  return true;  
}
//固定列点击时的触发函数 用与弹出窗口选择
efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{

  if (grid_id != "ef_grid_result") return;
  if( col_index <= 0 ) return;

  if (ef.get("efFormPopup").value == "1") {
    if (!window.opener.closed) {
      var grid = efgrid.getGridObject( "ef_grid_result" );
      var rowData = grid.getRowData(row_index);
      
      var returnValue = "referReportId=" + rowData.reportId + "," + 
        "referReportBelongTo=" + rowData.reportBelongTo + "," +
        "referReportVersion=" + rowData.reportVersion ;
      
      window.opener.efform_onPopupReturn("ER00", returnValue);	
    }
    window.close();
  }
}

// 上传弹出窗口
function showUpdateWindow(param){
	var updateWindow = efcascadeselect.createDivWindow("updateWindow","efwindow","请选择上传文件","500px","150px",false,"关闭");
	var node = ef.get("updateWindowsubNode");
	node.innerHTML = 
	 "<iframe name='iframeUpload' width=\"500\" frameBorder=\"0\"height=\"50\" scrolling=\"no\"></iframe>"
	 +"<FORM METHOD=\"POST\" action=\"ER/upload.jsp?"+param+"\" target=\"iframeUpload\" enctype=\"multipart/form-data\" >"
	 +"<table><tr><td>"
     +"<input style='width:450px' type=\"file\" id=\"oFile\" name=\"myfile\" size='50' class='inputField' onKeyDown=\"oFile.blur()\" /></td></tr><tr><td>"
     +"<input type=\"submit\" value=\"上传\" class='buttonRegular'/></td></tr><tr><td>&nbsp;</td></tr></table>";
	 +"</FORM> ";

	efwindow.show("",updateWindow.id,"center");
}




//grid单元格渲染回调函数
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){

  if (grid_id != "ef_grid_result") return;
  
  var grid = efgrid.getGridObject( "ef_grid_result" );
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
  var rowData = grid.getRowData(row_index);
 
  switch (columnEname) {
    case "upload":
	   var fileModule = rowData.reportName;
	   var fileType;
	   
	   if (rowData.reportType == 1) fileType = "srt";
	   if (rowData.reportType == 2) fileType = "xml";

	    if("" != rowData.reportId && rowData.reportType != 3) {
		  var path= "reportId=" + rowData.reportId + "&reportBelongTo=" 
				+ rowData.reportBelongTo +"&reportVersion=" + rowData.reportVersion
			    +"&type=" + fileType; 
	    	return "<div align='center' efval=''><input value='上传' class='buttonClass' type='button' onclick='showUpdateWindow(\""+path+"\")'></div>" ;
	    } else {
	      return "";
	    }
	    break;
	case "download":
	  if(rowData.reportId != "" ){
	  	var fileType;
	   	if (rowData.reportType == 1) fileType = "srt";
	   	if (rowData.reportType == 2) fileType = "xml";
	   	
		 reportFilePath = "model" + "/" + rowData.reportId + "/" 
		   + rowData.reportId + "_" + rowData.reportBelongTo + "_" + rowData.reportVersion +"."+fileType;	  
		 if(col_index == 5 && rowData.reportType != 3){
		    	return "<div align='center' efval=''><a  id='download_a' href='#' onclick=\"javascript:download_reportFile('"
		    	+reportFilePath+"','"
		    	+rowData.reportId+"','"+rowData.reportBelongTo+"','"+rowData.reportVersion + "')\">下载</a></div>" ;
		    	
		  }
	  }
	  
	case "edit":
      if (rowData.reportType == 2) {
	    	param = "reportId=" + rowData.reportId 
	    	  + "&reportBelongTo=" + rowData.reportBelongTo 
	    	  + "&reportVersion=" + rowData.reportVersion + "";
	    	 if(rowData.reportStatus == 0 || rowData.reportStatus =="")
		    	return "<div align='center' efval=''><a href=\"javascript:void(0)\"  onclick=\"open_edit_form('"+ param + "','"
		    			+rowData.reportId+"','"+rowData.reportBelongTo+"','"+rowData.reportVersion+"')\">编辑</a></div>" ;	 
		     else
		    	return "<div align='center' efval=''><a href=\"javascript:void(0)\" disabled onclick=\"alert('该模板被锁定')\">编辑</a></div>" ;			     				 
	  } else {
	    return "" ;  
	  }
	  break;
    case "generate":
      if (rowData.reportType == 2 || rowData.reportType == 3) {
	   	param = "reportId=" + rowData.reportId 
	    	  + "&reportBelongTo=" + rowData.reportBelongTo 
	    	  + "&reportVersion=" + rowData.reportVersion + "";
	    	if(rowData.reportType == 2)  
	    		return "<div align='center' efval=''><a href=\"javascript:void(0)\" onclick=\"efform.openNewForm('ER22','"+ param + "')\">生成</a></div>" ;
	    	else if(rowData.reportType == 3){

				return "<div align='center' efval=''><a href=\"javascript:void(0)\" onclick=\"view_maxReport('"+ rowData.reportName + "')\">生成</a></div>" ;
			}
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
}



//报表锁定函数
lockReport = function (param,type){


	var er00_ajax_callback = {
		  onSuccess :
			function(eiInfo){
			  button_f2_onclick();
			if(type == "0")	
				 efform.setStatus(1, "报表锁定成功！");
			else 
				 efform.setStatus(1, "报表解锁成功！");			  
			},
		  onFail    : 
		    function(eMsg) {
			  ajaxOutInfo = null;
		      alert("Ajax调用失败!");
		    }	
		};
	params = param.split(',');	
	var inInfo = new EiInfo();
	inInfo.set("reportId",params[0]);
	inInfo.set("reportBelongTo",params[1]);
	inInfo.set("reportVersion",params[2]);	
	inInfo.set("isLocked",type);
	EiCommunicator.send("ER00","lockReport", inInfo, er00_ajax_callback, true );	
		
}
//div的方式弹出报表归属选择框
openReportBelongToSubGrid = function ()
{
  var inInfo = new EiInfo();
  //设置查询条件
  inInfo.setByNode("ef_div_inqu");
  
  inInfo.set("funcId", "ER_GET_REPORT_BELONG_TO");
  ef.get("funcId").value = "ER_GET_REPORT_BELONG_TO";
  
  var bindingInputId = "inqu_status-0-reportBelongTo";
  var serviceName = "EPFunc";
  var queryMethod = "call";
  
  EiCommunicator.send(serviceName, queryMethod, inInfo);
  if (ajaxEi == null) return;
  
  
  var subGridColumn = new efSubgridColumn();
  var eiColumn = new EiColumn(bindingInputId);
  
  //指定数据返回块
  eiColumn.blockName = "result";
  
  subGridColumn.setEiMeta({}, eiColumn);
  subGridColumn.set("serviceName", serviceName);
  subGridColumn.set("queryMethod", queryMethod); 
  
  //预选定的列名称
  subGridColumn.set("valueProperty", "reportBelongTo");
     
  var div = efform.getSubGridDiv();
  div.efDisplayCol = subGridColumn;
  efform.showSubGridWindow(bindingInputId, ajaxEi);
}

openReportVersionSubGrid = function ()
{
  var inInfo = new EiInfo();
  //设置查询条件
  inInfo.setByNode("ef_div_inqu");
  
  inInfo.set("funcId", "ER_GET_REPORT_VERSION");
  ef.get("funcId").value = "ER_GET_REPORT_VERSION";
  
  var bindingInputId = "inqu_status-0-reportVersion";
  var serviceName = "EPFunc";
  var queryMethod = "call";
  
  EiCommunicator.send(serviceName, queryMethod, inInfo);
  if (ajaxEi == null) return;
  
  var subGridColumn = new efSubgridColumn();
  var eiColumn = new EiColumn(bindingInputId);
  
  //指定数据返回块
  eiColumn.blockName = "result";
  
  subGridColumn.setEiMeta({}, eiColumn);
  subGridColumn.set("serviceName", serviceName);
  subGridColumn.set("queryMethod", queryMethod); 
  
  //预选定的列名称
  subGridColumn.set("valueProperty", "reportVersion");
     
  var div = efform.getSubGridDiv();
  div.efDisplayCol = subGridColumn;
  efform.showSubGridWindow(bindingInputId, ajaxEi);
}
//报表归属和报表版本编辑时的回调函数
function efgrid_onBeforeCellEditNodeDisplay(grid_id, row_index, col_index, data_type ){

	if(grid_id == "ef_grid_result"){
		if(2 == col_index){
			ef.get("funcId").value = "ER_GET_REPORT_BELONG_TO";
			EiCommunicator.sendFuncCall("ER_GET_REPORT_BELONG_TO",new EiInfo());
			if(ajaxEi !=null){
				__getEi = _getEi;
				_getEi = function(){return ajaxEi;};
			}
			else
				return;
			}
		else if(3 == col_index){
			ef.get("funcId").value = "ER_GET_REPORT_VERSION";	
			EiCommunicator.sendFuncCall("ER_GET_REPORT_VERSION",new EiInfo());
			if(ajaxEi !=null){
				__getEi = _getEi;
				_getEi = function(){return ajaxEi;};
			}
			else
				return;			
			}
	}
}
//日历框触发函数
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyy/mm/dd', true);
}

open_edit_form = function(param,reportId,reportBelongTo,reportVersion){

	  
	param +="&&selectEditReports="+getReports_attrs(reportId,reportBelongTo,reportVersion);
	efform.openNewForm('ER20',param , true);
	
}

getReports_attrs = function(reportId,reportBelongTo,reportVersion){
	  var grid = efgrid.getGridObject( "ef_grid_result" );
 	  selectData = grid.getSelectRowsData();
	  var str = "";
	  for(v=0;v<selectData.length;v++){
	  	if((selectData[v].reportId != reportId)
	  		||(selectData[v].reportBelongTo != reportBelongTo)
	  		||(selectData[v].reportVersion != reportVersion))
  			str +=selectData[v].reportId+","+selectData[v].reportBelongTo+","+selectData[v].reportVersion+";";
	  }	
	  str += reportId+","+reportBelongTo+","+reportVersion;
	  return str;
}

download_reportFile = function(reportFilePath,reportId,reportBelongTo,reportVersion){
	var inInfo = new EiInfo();
	inInfo.set("reportFilePath",reportFilePath);
	EiCommunicator.send("ER00","isFileExist", inInfo);
	if(null == ajaxEi)
		return ;
	
	var str = getReports_attrs(reportId,reportBelongTo,reportVersion);
	
	if(ajaxEi.get("fileExist")=="true"){
		ef.get("download").href="ER/downloadExcel.jsp?path="+reportFilePath+"&&reports="+str;
		ef.get("download").click();
	}else{
		alert("该文件不存在！");
	}	

	
}

view_maxReport = function(reportName){
	var inInfo = new EiInfo();
	inInfo.set("projectName","maxReport");
	inInfo.set("reportName",reportName);
	EiCommunicator.send("ER00","getReportRunId", inInfo, null, false);
												
	if (ajaxEi != null) {
		runID = ajaxEi.get("runID");
	}
	    	    
	param = "projectName=maxReport"
	    + "&reportName="+reportName+"&runID="+runID;

	//window.open("ER/maxReport/rp_reports_view.jsp?"+param);
	efform.openNewForm("ERM0",param);
}

efgrid_onCellEditNodeDisplayReady = function(grid_id, row_index, col_index, cell_value, data_type, div_node) {
		if (grid_id == "ef_grid_result") {
			var textInput = div_node.firstChild;	 
			var grid = efgrid.getGridObject(grid_id);
			var column = grid.getColumn(col_index,data_type);
			if (column.getEname() == "reportStartTime")			 
				textInput.readOnly = true;				 
 			if (column.getEname() == "reportStopTime")			 
				textInput.readOnly = true;		
	}

}


