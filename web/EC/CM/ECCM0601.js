var tableTreeModel =  new eiTreeModel('ECTree');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
// if(node!=nTree._rootNode)
// node.type( new checkItemType(false) );
 node.textClicked = function(){ treeNodeClicked( node ); };
 if(node.depth() == 1) {
    node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }else if(node.depth()>1){
  	node.type( new checkItemType(false) );
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
   	var columnId = document.getElementById("columnId").value;
   	var synType = document.getElementById("synType").value;
   	var synMode = document.getElementById("synMode").value;
   	
   	var selectedItem = nTree.getCheckedNods();
   	
   	//alert(selectedItem);
	if(selectedItem.length < 1){
	   alert("请选择分发汇总的栏目！");
	   return;
	}
	var selectColumnId = null;
   	var selectNodeType = null;
	var columnType = null;
	for(var i=0;i<selectedItem.length;i++){
		selectColumnId = selectedItem[i].label().split("@")[1];
		selectNodeType = selectedItem[i].label().split("@")[0];
		
		if(selectedItem[i].label().split("@").length >= 4){
			columnType = selectedItem[i].label().split("@")[4];
		}
		if(selectNodeType =="site"){
			alert("不能选择站点！");
			return;
		}
		if(columnId == selectColumnId){
			alert("不能选择当前所在的栏目！");
			return;
		}
		if(synType == "0"){
			if(columnType=="01"){
				alert("不能选择虚拟栏目分发！");
				return;
			}
			if((columnType=="02" || columnType=="04")&& synMode == "10"){
				alert("图片栏目与头条栏目不能以复制模式进行分发！");
				return;
			}
		}
		
		if(synType == "1"){
			if(columnType!="00" && columnType!="null"){
				alert("只能选择普通栏目汇总！");
				return;
			}
		}
	}
	returnSelectVal();
	//window.opener.document.getElementById("selectColumnId").value = selectColumnId;
	window.close();
	//info.set("selectedItem",selectedItem);
	/*
	EiCommunicator.send( "ECCM0601", "query" , info, null );
	if(ajaxEi!=null){
	  if(ajaxEi.status!=-1){
	   var infoMsg=ajaxEi.get("infoMsg");
	    if(infoMsg==null){
			if (!window.opener.closed) {
			   window.opener.efform_onPopupReturn("ECCM01", "0");	
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
	     
   }*/
   
   function returnSelectVal(){
   		var td = window.opener.document.getElementById("relation");
   		var rowcount = 0;
   		var selectedItem = nTree.getCheckedNods();
   		var str = "";
   		var selectColumnId = "";
   		var selectColumnName="";
   		
   		
   		var validinfo = new Array();

   		for(var i=0;i<selectedItem.length;i++){
   			selectColumnId = selectedItem[i].label().split("@")[1];
   			selectColumnName = selectedItem[i].label().split("@")[5];
   			columnType = selectedItem[i].label().split("@")[4];
   			
   			if(i!=0 && i%3==0) {
   				str += "<br/>";
   			}
   			if(i!=0 && i%3!=0) str += ",";
   			str +=selectColumnName +"<input type = 'hidden' id='relation-"+ i +"-columnId' name='relation-"+ i +"-columnId' value='"+ selectColumnId +"'/>";
   			var oValid=new Object(); 
   			oValid.colName=selectColumnName; 
   	   		oValid.colType=columnType; 
   	   		validinfo.push(oValid);
   		}
   		
   		//alert(str);
   		td.innerHTML = "";
   		td.innerHTML = str;
   		window.opener.setValidinfo(validinfo);
   		window.opener.document.getElementById("relationTitle").style.display="block";
   }
}