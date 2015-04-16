var HROGTreeModel =  new eiTreeModel('ESUTTR30');

efform_onload = function () {
  efregion.show("ef_region_mtree");
  efregion.show("ef_region_ntree");
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

button_f4_onclick = function() {
  efgrid.submitInqu( "ef_grid_e", "es","ESHR01","queryEmpChange" );
}

button_f5_onclick = function() {

}


/* Tree Related Stuffs */

function configOriginalTree(tree){
  tree.nodeInitializer = originalTreeNodeInitializer;
}

function originalTreeNodeInitializer(node){  
  if ( node.top() ){
    node.icon(efico.get("eftree.cu"));
    node.openIcon(efico.get("eftree.cu"));  
    node.active(true);
  };
  node.textClicked = function(){ originalTreeNodeClicked( node ); };
}

function originalTreeNodeClicked(node){
    var label = "";
    if ( !node.top() ){ label = node.data().label }

    ef.get("inqu_status-0-parentOrgCodeT").value=label;
	ef.get("inqu_status-0-oldOrgCodeT").value=label;
  	efgrid.submitInqu( "ef_grid_e", "es","ESHR01","queryEmpChange" );
}

function configCurrentTree(tree){
  tree.nodeInitializer = currentTreeNodeInitializer;
}

function currentTreeNodeInitializer(node){  
  if ( node.top() ){
    node.icon(efico.get("eftree.cu"));
    node.openIcon(efico.get("eftree.cu")); 
    node.active(true); 
  };
  node.textClicked = function(){ currentTreeNodeClicked( node ); };
}

function currentTreeNodeClicked(node){
    var label = "";
    if ( !node.top() ){ label = node.data().label }
    
    ef.get("inqu_status-0-parentOrgCodeT").value = label;
	ef.get("inqu_status-0-newOrgCodeT").value = label;
  	efgrid.submitInqu( "ef_grid_e", "es","ESHR01","queryEmpChange" );
}




