var orgTreeModel =  new eiTreeModel('ESUTTR21');
var menuTreeModel =  new eiTreeModel('EDPI12');

efform_onload = function () {
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
	efsplitter("leftTree_btn", "leftTreeDiv_btn", "middleSplitter_btn");
}

button_f2_onclick = function () {
  efgrid.submitInqu( "ef_grid_r", "es","ES46","query");
}

button_role_onclick = function() {
  efgrid.submitForm( "ef_grid_role", "es","ES38","query", true );	
}

button_type_onclick = function() {
  efgrid.submitForm( "ef_grid_type", "es","ES39","query", true );	
}

button_button_onclick = function() {
  efgrid.submitForm( "ef_grid_button", "es","ES47","query", true );	
}

function treeNodeInitializer_btn(node){
  if ( node.top() ){ node.open(true); return; };  
  node.textClicked = function(){ treeNodeClicked_btn( node ); };
}

function configTree(tree){
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function configTree_btn(Btntree){
  Btntree.topNodeActive = false;
  Btntree.nodeInitializer = treeNodeInitializer_btn;
}


function treeNodeInitializer(node){
  if ( node.top() ){ node.open(true); return; };  
  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
   document.getElementById("inqu_status-parent").value=node.label();  
   efgrid.submitInqu( "ef_grid_r", "es","ES46","query");
}


function treeNodeClicked_btn(node){
   document.getElementById("inqu_status-parent").value=node.label();  
   efgrid.submitInqu( "ef_grid_button", "es","ES47","query");
}

function configMenuTree(tree){
	  tree.nodeInitializer = menuTreeNodeInitializer;
}

function menuTreeNodeInitializer(node) {
	if (node.top()) {
		node.open(true);
		return;
	}
	
	node.textClicked = function() {
		menuTreeNodeClicked(node);
	};
	if (node.leaf()) {
		node.show(false);
	}
}

function menuTreeNodeClicked(node) {
	var grid = efgrid.getGridObject("ef_grid_r");
	grid.serviceName = "ES46";
	document.getElementById("inqu_status-0-pnode").value = node.label();
	efgrid.submitInqu("ef_grid_r", "es", "ES46", "queryPagesNotGrantedByMenuNode");
}

