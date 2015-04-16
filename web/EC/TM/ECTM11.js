var tableTreeModel =  new eiTreeModel('ECAM00');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
 node.type( new radioItemType(false) );
 node.textClicked = function(){ treeNodeClicked( node ); };
 if(node.depth() == 1) {
    node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }else if(node.depth()>1){
     node.icon("EF/Images/eftree_file.png");
    node.openIcon("EF/Images/eftree_file.png");
  }  
}

function treeNodeClicked(node){

}


//点击取消按钮
button_cancel_onclick=function(){
   window.close();
}
//点击确定按钮
button_confirm_onclick=function(){
	if(nTree.getOption()==""){
	alert("请选择站点栏目!");
	return;
	}
	if(nTree.getOption()==null){
		alert("根节点不能用于指定来源");
		return false;
	}else{
		if(document.getElementById("type").value=='1'){
		   opener.document.getElementById("result2-0-columnLinkSpecColumn").value=nTree.getOption();
		   opener.document.getElementById("result2-0-columnLinkSpecColumnName").value=nTree.option._text;
		}else if(document.getElementById("type").value=='2'){
		   opener.document.getElementById("result3-0-titleLinkSpecColumn").value=nTree.getOption();
		   opener.document.getElementById("result3-0-titleLinkSpecColumnName").value=nTree.option._text;
		}else if(document.getElementById("type").value=='7'){
		   opener.document.getElementById("result7-0-titleLinkSpecColumn").value=nTree.getOption();
		   opener.document.getElementById("result7-0-titleLinkSpecColumnName").value=nTree.option._text;
 	}
		window.close();
	}
}