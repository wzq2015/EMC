var aModel = new absTreeModel();
aModel.addChild("", {label:"PLAT", parent:"", text:getI18nMessages("label.ELPlatLog","平台日志"), leaf:"0" } );
aModel.addChild("", {label:"BFMS", parent:"", text:getI18nMessages("label.ELBfmsLog","财务一体化"), leaf:"0" } );
aModel.addChild("", {label:"SIM", parent:"", text:getI18nMessages("label.ELSimLog","销售一体化"), leaf:"0" } );
aModel.addChild("", {label:"SLMS", parent:"", text:getI18nMessages("label.ELSlmsLog","销售物流日志"), leaf:"0" } );

efform_onload = function () {
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
	efbutton.setButtonStatus("F2", false);
	
	efregion.show("ef_region_result");	
	var ef_region_buttonbar = new efbuttonbar();
	ef_region_buttonbar.paint("ef_region_result");
}

button_f2_onclick = function () {
	efgrid.submitInqu( "ef_grid_result", "el","EL10","query");
}

efgrid_onRowClicked = function (id ,row_index){
	var grid = efgrid.getGridObject(id);	
	var selectData = grid.getRowData(row_index);
	document.getElementById("msg").value = selectData["fmsg"];
}	
    
efcalendar_1_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-startDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efcalendar_2_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-endDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}   
    
function configTree(tree){
  tree.nodeInitializer = treeNodeInitializer;  
}

function treeNodeInitializer(node){
  if ( node.depth() < 1 ){ node.open(true); }
  node.textClicked = function() { treeNodeClicked(node); };  
}

function treeNodeClicked(node){
    efbutton.setButtonStatus("F2", true);
    document.getElementById("inqu_status-0-category").value=node.label();  
    efgrid.submitInqu( "ef_grid_result", "el","EL10","query");
}



