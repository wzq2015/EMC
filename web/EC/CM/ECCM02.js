var tableTreeModel =  new eiTreeModel('ECCM04');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
 if(node!=nTree._rootNode)
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

//点击取消按钮
button_cancel_onclick=function(){
   window.close();
}
//点击确定按钮
button_confirm_onclick=function(){
	   var info = new EiInfo();
	   var value= ef.get("columnId").value;
	   info.set("columnId",value);
	   var selectedItem = nTree.getOption();
	   if(selectedItem.length < 1){
	     alert("选择需要转移栏目的目标栏目或目标站点");
	     return;
	   }
	   info.set("selectedItem",selectedItem);
	   EiCommunicator.send( "ECCM01", "transfer" , info, null );
	   if(ajaxEi!=null){
	   		if(ajaxEi.status!=-1){
	   			var infoMsg=ajaxEi.get("infoMsg");
	     		if(infoMsg==null){
			     if (!window.opener.closed) {
			             window.opener.efform_onPopupReturn("ECCM02", "0");	
		             }
		             window.close();
             	}
             	else if(infoMsg=='1')
               	alert("不能向本栏目及其下级栏目转移！");
             	else if(infoMsg=='0'){
               alert("不能转移到相同节点下！");
             }
	   		}else{
	   			alert(ajaxEi.msg);
	   		}
	     
            }
}