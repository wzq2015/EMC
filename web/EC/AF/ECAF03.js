efform_onload = function ()
{
 //初始化得时候，将新建，引用，回收站等按钮置为false
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  //ef.get("inqu_status-0-columnId").value="site";
    //var grid=efgrid.getGridObject("ef_grid_result");
    //var columnId=ef.get("inqu_status-0-columnId").value;
   // if(columnId=="site")
     //setFalseButton();
     //else
     //setTrueButton();
  treeNodeClicked(nTree.getChildNodes()[0]);
}	


var tableTreeModel =  new eiTreeModel('ECAF00');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
   
    node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
   
}

function treeNodeClicked(node){
  var column = node.key;
  //alert(column);
  ef.get("inqu_status-0-columnId").value=column;
  var url = document.getElementById("url").value + "&inqu_status-0-columnId=" + column+"&nodeId="+column +"&nodeType=c"
  
  document.mainFrame.location=url;
}


