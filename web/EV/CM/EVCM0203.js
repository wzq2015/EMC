var tableTreeModel =  new eiTreeModel('ECSM05');
efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter"); 
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}
var treeNode;
function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
   window.returnValue = node.label();
  window.close();
}