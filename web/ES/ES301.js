var orgTreeModel =  new eiTreeModel('ESUTTR10');

function configTree(tree){
	  tree.emptyNodeAsLeaf = false;
	  tree.activeEmptyJudger = false;
	  tree.topNodeActive = false;
	  tree.nodeInitializer = treeNodeInitializer;
	  tree.initialExpandDepth = 3;	  
	}


function treeNodeInitializer(node){  
  if ( node.top() ){ 
    node.active(true);
    node.textClicked = function(){ treeNodeClicked( node ); };
    return;
  };
  if ( node.data().type == "2"  ) {
    node.icon(efico.get("efgrid.addRow"));
    node.openIcon(efico.get("efgrid.addRow"));
  } else if( node.data().type == "3" ){
    node.icon(efico.get("eftree.cu"));
  }  
  node.textClicked = function(){ treeNodeClicked( node ); };
}
var callbackFunc = "efform_onPopupReturn";

function treeNodeClicked(node){
//   var org = "";
//   if ( !node.top() ){ org = node.label() }

   
   if (!window.opener.closed) {
     var cb = window.opener[callbackFunc];    
     cb.call(this, "ES301", node);	
   }
   window.close();  
//   efgrid.submitInqu( "ef_grid_r", "es","ES30","query");
}