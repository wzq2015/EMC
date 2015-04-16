var tableTreeModel =  new eiTreeModel('ECCM04');

// 定义树组件
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

//	初始化树组件
function treeNodeInitializer(node) {
	 if(node!=nTree._rootNode)
	 node.type( new radioItemType(false) );
	// node.textClicked = function(){ treeNodeClicked( node ); };
	 if(node.depth() == 1) {
	    node.icon("EF/Images/eftree_foldericon.png");
	    node.openIcon("EF/Images/eftree_openfoldericon.png");
	  }else if(node.depth()>1){
	     node.icon("EF/Images/eftree_file.png");
	    node.openIcon("EF/Images/eftree_file.png");
	  }  
}


//点击取消按钮
button_cancel_onclick=function(){
   window.close();
}
//点击确定按钮
button_confirm_onclick=function(){ 
	   var info = new EiInfo();
	   var option = nTree.getOption();
	   if (option == "") {
		alert("请选择栏目!");
		return;
	   }  
	   var selectedItem = option.split("@");
	   if(selectedItem[0] == "site"){
	      alert("不能选择站点，请选择栏目进行转移！");
	      return;
	   }
	   else{
	   var articleStr = ef.get("articleStr").value;   
	   info.set("articleStr",articleStr);	   
	   info.set("selectedItem",selectedItem[1]);
	   EiCommunicator.send( "ECAM07", "transfer" , info, null );	   
	   if(ajaxEi!=null){
	    if(ajaxEi.getStatus()!=-1){
		   if (!window.opener.closed) {
			   window.opener.efform_onPopupReturn("ECAM07", "0");	
		       }
		       window.close();
         }
	    }
      }
}