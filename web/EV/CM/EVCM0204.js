var tableTreeModel =  new eiTreeModel('ECSM04');
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
   if (node._label.split("@")[3] != "true")
       alert("该节点为非匿名站点或栏目，请选择匿名站点或栏目。");
   else {
       window.returnValue = node._label;
       window.close();
   }
}