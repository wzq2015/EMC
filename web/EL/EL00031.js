button_query_onclick = function () {
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitForm("ef_grid_result", "el", "EL00031", "query",true);
	}
}

button_dquery_onclick = function () {
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitForm("ef_grid_result", "el", "EL00031", "defaultQuery",true);
	}
}

button_filter_onclick = function () {
	var grid = efgrid.getGridObject("ef_grid_result");
	for(var i = 0 ; i< grid.getRowCount(); i++)
	{
		if(!grid.isRowChecked(i))
		{
			grid.removeRow(i--);
		}
		
	}
	
	grid.refresh();
}

function treeNodeInitializer(node){
	node.textClicked = function()
					{
						document.getElementById("inqu_status-0-reqType").value=node.label() ;
						efwindow.hide();
					};
	node._jTreeNodeDIV.title = node.label()+" "+node.text();//鼠标悬浮到节点上的提示信息。
	
	//值第二层的树节点背景色为粉红色。
	if(node.depth()==2)
		node._jNodeTextDiv.style.background="pink";
}


function myConfigTree(tree){
	  tree.nodeInitializer = treeNodeInitializer;
	  tree.initialExpandDepth = 1;//树默认展开到第三层。  将深度设置的深一点，就可以全部展开。
}

button_chart_onclick = function () {
	
	efgrid.submitForm("ef_grid_result", "el", "EL00031", "store",true);
 	
}

efcalendar_1_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-startDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
	}

efcalendar_2_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-endDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
	}  
function efgrid_onAjaxSubmitSuccess(gridId, service_name,
		method_name, eiInfo)
{
	var grid = efgrid.getGridObject(gridId);
	grid.refresh(eiInfo);
	if("ef_grid_result" == gridId 
			&& "EL00031" == service_name
	  )
	{
		
		for(var i = 0 ; i< grid.getRowCount(); i++)
		{
			grid.setRowChecked(i,true);
			grid.refreshRow(i);
		}
		if("store" == method_name)
		{
			ef.get("chart").style.display="block";
			ef.get("chart").src="DispatchAction.do?efFormEname=EL000301";
		}
	}	
}