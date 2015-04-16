var HROGTreeModel =  new eiTreeModel('ESUTTR57');

efform_onload = function () {
  efregion.show("ef_region_tree");
  efregion.show("ef_region_org");
  //efbutton.setButtonStatus("F5", false);
   nTree._rootNode.textClicked=function(){
    efbutton.setButtonStatus("F5", true);
    
	ef.get("inqu_status-0-parentOrgCodeT").value="root";
  	efgrid.submitInqu( "ef_grid_p", "es","ESHR01","query" );
  	efgrid.submitInqu( "ef_grid_e", "es","ESHR01","queryEmp" );
   }; 
}

button_f2_onclick = function() {  
  efgrid.submitInqu( "ef_grid_p", "es","ESHR01","query" );  
}

button_f3_onclick = function() {
  efgrid.submitInqu( "ef_grid_e", "es","ESHR01","queryEmp" );
}

button_f5_onclick = function() {
  var grid = efgrid.getGridObject("ef_grid_e");
  if(grid.getCheckedRowCount()>=1)	
    efgrid.submitForm( "ef_grid_e", "es","ESHR01","importUser", true );
  else
    alert("请选择一个或者多个用户进行导入!");	
}


/* Tree Related Stuffs */

function configHROGTree(tree){
  tree._rootNode.active(true);
  tree.nodeInitializer = HROGTreeNodeInitializer;
}

function HROGTreeNodeInitializer(node){  
  if ( node.top() ){
    node.icon(efico.get("eftree.cu"));
    node.openIcon(efico.get("eftree.cu")); 
    return;
  };
  
  var parentAdm = '0';
  var parentNode = node.parent();
  
  if ( !node.parent().top() )
    parentAdm = node.parent().data().admin;
  
  if ( parentAdm == '1' ){
    node.data().admin = '1';
  }

  var adm = node.data().admin;  
  if ( adm == '0' ){
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));
  }
  node.textClicked = function(){ HROGTreeNodeClicked( node ); }; 

}

function HROGTreeNodeClicked(node){
    var enabled =  ( node.data().admin == '1' );
    efbutton.setButtonStatus("F5", enabled);
    
	ef.get("inqu_status-0-parentOrgCodeT").value=node.data().label;
  	efgrid.submitInqu( "ef_grid_p", "es","ESHR01","query" );
  	efgrid.submitInqu( "ef_grid_e", "es","ESHR01","queryEmp" );
}





