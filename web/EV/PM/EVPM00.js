var tableTreeModel =  new eiTreeModel('EVCM0509');
efform_onload = function ()
{
  efregion.show("ef_region_result");

}

function settingNodeId(){
	ef.get("inqu_status-0-parentNodeId").value="ROOT";
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node)
{
 node.type( new radioItemType(false) );
 node.textClicked = function(){ treeNodeClicked( node ); };
  if ( node.leaf() ){ 
    node.icon("EF/Images/eftree_file.png");
    node.openIcon("EF/Images/eftree_file.png");
    return;
  }else{
      node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }   
}

function treeNodeClicked(node){
	
}

//点击设置按钮
button_set_onclick=function(){
	if(nTree.getOption()==null){
		alert("根节点不能用于指定来源");
		return false;
	}
	if(nTree.getOption()==""){
		alert("请选择节点!");
		return;
	}
	var selfAble = (nTree.getOption()).split("@")[3];
	  if(selfAble=="false"){
	     alert("没有权限，不允许访问!");
	     return ;
	  }
	
		ef.get("inqu_status-0-nodeId").value=(nTree.getOption()).split("@")[1];
		ef.get("inqu_status-0-nodeName").value=nTree.option._text;
		var info = new EiInfo();
		info.setByNode("ef_region_inqu"); 
		EiCommunicator.send( "EVPM00", "update" , info, null );
		if(ajaxEi!=null){
		    var infoStatus=ajaxEi.getStatus();
		    if(infoStatus!=0){
			   alert("设置默认门户节点出错！");
		       return  false;
		    }else{
		    	alert("设置默认门户节点成功！");
		    	ef.get("result-0-nodeId").value=nTree.getOption();
				ef.get("result-0-nodeName").value=nTree.option._text;
		    }
		}
}

