efform_onload = function ()
{
	
}

button_f1_onclick=function()
{
	if (efvalidateDiv("ef_region_inqu")) 
 	{
	 efgrid.submitInqu( "ef_grid_result", "el","EL011","query");
 	}
}

function efgrid_onRowClicked( grid_id, row_index ) {
	if(grid_id == "_ef_grid_subgrid")
	{
		ef.get("inqu_status-0-nodeType").value=efgrid.getGridObject(grid_id).getRowData(row_index)["type"];
	}
}

openSubGrid = function ()
{
  var inInfo = new EiInfo();
  //设置查询条件
  inInfo.setByNode("ef_div_inqu");
  
//  var bindingInputId = "inqu_status-0-nodeIp";
//  var serviceName = "EL01";
//  var queryMethod = "queryLogNode";
  
  var bindingInputId = "inqu_status-0-nodeURL";
  var serviceName = "EP14";
  var queryMethod = "queryNode";
  
  EiCommunicator.send(serviceName, queryMethod, inInfo);
  if (ajaxEi == null) return;
  
  var subGridColumn = new efSubgridColumn();
  var eiColumn = new EiColumn(bindingInputId);
  
  //指定数据返回块
  eiColumn.blockName = "node_result";
  
  subGridColumn.setEiMeta({}, eiColumn);
  subGridColumn.set("serviceName", serviceName);
  subGridColumn.set("queryMethod", queryMethod); 
  
  //预选定的列名称
  subGridColumn.set("valueProperty", "ip");
     
  var div = efform.getSubGridDiv();
  div.efDisplayCol = subGridColumn;
  efform.showSubGridWindow(bindingInputId, ajaxEi);
}

efcalendar_1_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-startDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
	}

efcalendar_2_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-endDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
} 

function treeNodeInitializer(node){
	node.textClicked = function()
					{
						document.getElementById("inqu_status-0-logId").value=node.label() ;
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
