window.onload = function()
{
	button_query_onclick();
}


//button_test_onclick = function()
//{
//	efgrid.submitForm( "ef_grid_result", "EU","EU20","InsertRecord",true );
//}

button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "","EU20","query");
}

button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "EU","EU20","insert",true );
}

button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "EU","EU20","update",true );
}

button_delete_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "EU","EU20","delete",true);
}

ajax_callback = {
		onSuccess : function(eiInfo) {	
			efform.fillDiv("ef_region_inqu",eiInfo);
			ef.get("result-0-output").scrollTop = ef.get("result-0-output").scrollHeight;					
		},
		onFail : function(eMsg) {
			alert("failure");
		}
	}


efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  var grid = efgrid.getGridObject( "ef_grid_result" );  
  switch( col_index ){
    case 4:
         return "\<input value='"+getI18nMessages("label.EDDefineArchiveJob","配置归档任务")+"' class='buttonclass' type='button' onclick='defineJob("+ row_index  +" )'>" ;
  }  
}

defineJob = function( row_index ){
  var grid = efgrid.getGridObject( "ef_grid_result" );
  if(grid.isNewLine(row_index)==1){
  	alert(getI18nMessages("label.EJPleaseDefineArchiveTask","请保存归档计划后再进行配置操作！"));
  	return;
  }
  var jobName = grid.getCellValue( row_index, 3,TYPE_DATA );    
  efform.openNewForm("EJ10", "serviceName=iplat4j_JobService&methodName=jobList&qjob-0-jobName="+ jobName, true) ;
 // ="DispatchAction.do?efFormEname=EJ10&serviceName=iplat4j_JobService&methodName=jobList&qjob-0-jobName="+ jobName ;
}


openSubGrid = function() {
	var inInfo = new EiInfo();
	// 设置查询条件
	inInfo.setByNode("ef_div_inqu");

	var bindingInputId = "inqu_status-0-sourcetablename";
	var serviceName = "EP15";
	var queryMethod = "queryNode";

	EiCommunicator.send(serviceName, queryMethod, inInfo);
	if (ajaxEi == null)
		return;

	var subGridColumn = new efSubgridColumn();
	var eiColumn = new EiColumn(bindingInputId);

	// 指定数据返回块
	eiColumn.blockName = "node_result";

	subGridColumn.setEiMeta({}, eiColumn);
	subGridColumn.set("serviceName", serviceName);
	subGridColumn.set("queryMethod", queryMethod);

	// 预选定的列名称
	subGridColumn.set("valueProperty", "ip");

	var div = efform.getSubGridDiv();
	div.efDisplayCol = subGridColumn;
	efform.showSubGridWindow(bindingInputId, ajaxEi);
}

