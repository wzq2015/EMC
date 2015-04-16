var tableTreeModel =  new eiTreeModel('EVCM0507');
var treeNode;
efform_onload = function ()
{	

   var info=_getEi();
   var nodevalue = info.get("useNode");
 
   var iframe=parent.document.getElementById('mainFrame');
  
   if(nodevalue!=null && nodevalue =="false" ){
   alert("该模式下不能进行此操作!");
		 window.close();
	
	if(parent.document.location.href !=  document.location.href){
		 iframe.src="";
		 }
   }  

  setAllButtonTrue();
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter"); 
  
}	
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}
function treeNodeInitializer(node){
	 if ( node.top() ){ 
		   	node.active(true);
		   	node.textClicked = function(){ treeTopNodeClicked( node ); };	
		   	return;
	 };  
	  node.textClicked = function(){ treeNodeClicked( node ); };
}
function treeTopNodeClicked(topNode){
	treeNode=topNode;
	ef.get("inqu_status-0-parentNodeId").value="ROOT";
	setAllButtonTrue();
	checkAuth();
}
function treeNodeClicked(node){
   treeNode=node;
   var label=node._label;
   //判断权限
   ef.get("inqu_status-0-parentNodeId").value=label;  
   checkAuth();
}

function checkAuth(){
   ef.get("inqu_status-0-authType").value="maintain";  
   var info = new EiInfo();
   info.setByNode("ef_region_inqu"); 
   EiCommunicator.send( "EVCM0508", "checkAuth" , info, null ); 
   if(ajaxEi!=null){
		    var infoMsg=ajaxEi.getMsg();
		    if(infoMsg!="true"){
			   alert(infoMsg);
			   setAllButtonFalse();
		       return  false;
		    }else{
		        setAllButtonTrue();
		    	efgrid.submitInqu( "ef_grid_result", "ev","EVCM05","query");
		    }
		}
}

/*
所有按钮置为false
*/
function setAllButtonFalse(){
	efbutton.setButtonStatus("query",false);
	efbutton.setButtonStatus("insert",false);
	efbutton.setButtonStatus("update",false);
	efbutton.setButtonStatus("delete",false);
	efbutton.setButtonStatus("updatenow",false);
}

/*
所有按钮置为true
*/
function setAllButtonTrue(){
	var parentNodeId=ef.get("inqu_status-0-parentNodeId").value;
    if(parentNodeId==''){
 	   efbutton.setButtonStatus("insert",false);
 	   efbutton.setButtonStatus("updatenow",false);
    }
    if(parentNodeId=='ROOT'){
 	   efbutton.setButtonStatus("updatenow",false);
 	   efbutton.setButtonStatus("insert",true);
    }
    if(parentNodeId!=''&&parentNodeId!='ROOT'){
 	   efbutton.setButtonStatus("updatenow",true);
 	   efbutton.setButtonStatus("insert",true);
    }
	efbutton.setButtonStatus("query",true);
	efbutton.setButtonStatus("update",true);
	efbutton.setButtonStatus("delete",true);
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () {
   efgrid.submitInqu( "ef_grid_result", "ev","EVCM05","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
	if(validateSel()){
		if(window.confirm("确定要删除么？")){
		  	efgrid.submitForm( "ef_grid_result", "ev","EVCM05","delete", true,false,true );
		  	if(ajaxEi!=null){
		  	  if(ajaxEi.get("ERROR_CODE")=="true"){
		  	 	 alert("该节点下有子节点，不允许删除该节点！");
		  	  }else{
					if(treeNode!=undefined){
					  	treeNode.reload();
					}
				}
		  	}
  		}
	}else{
		alert('请先选择数据');
	}
}

//-------------------------------------------添加文门户节点数据验证 start--------------------------------------------

//判断只能是字母 数字
function isLegal(str){
    //匹配只能是字母 数字[a-zA-Z_0-9]
	var unvalid = /^\w+$/ig;
	var include = unvalid.test(str);
	if(include == false){
		window.alert("节点标识数据【 " + str + " 】只能输入英文字母、数字");
		return false;
	} 
	//过滤特殊字符
	var reg2 = /[\\\'\"\,\，\、\<\>\+\.\。\_\-\*\%\^\=\\\!\&\|\/\(\)\【\】\[\]\{\}\：\；\‘\’\”\“\:\;\~\`\#\$\?\？]+/g;
	var include2 = reg2.test(str);
	if(include2){
		window.alert("节点标识数据【 " + str + " 】只能输入英文字母、数字");
		return false;
	}
	 
}

//获得新输入的节点标识值 
function vlidateAddNodeId(grid,rows){
        var validateGlobalFlag = true;	
    	var gVFlag = true;
  		for(var i=0;i<rows.length;i++){
  			 var nodeValue = grid.getCellValue(rows[i] , 0, TYPE_DATA);
  			 var validateFlag = isLegal(nodeValue);
  			 if(validateFlag == false){
  			    validateGlobalFlag = false;
  			    break;
  			 }
  	    }
  	    return validateGlobalFlag;
} 


/*
  点击【新增】按钮后调用后台的service
*/
button_insert_onclick = function () 
{  
	if(validateSel()){
	      	var grid = efgrid.getGridObject("ef_grid_result");
  			var rows = grid.getCheckedRows();
 			var vFlag = vlidateAddNodeId(grid,rows);
		    if(!vFlag){
		    	return;
		    }
		efgrid.submitForm( "ef_grid_result", "ev","EVCM05","insert",true );
		if(treeNode!=undefined){
		  	treeNode.reload();
		}
	}else{
		alert('请先选择数据');
	}
}

/*
  点击【修改】按钮后调用后台的service
*/
button_update_onclick = function () 
{
	if(validateSel()){
	      	var grid = efgrid.getGridObject("ef_grid_result");
  			var rows = grid.getCheckedRows();
 			var vFlag = vlidateAddNodeId(grid,rows);
		    if(!vFlag){
		    	return;
		    }
		efgrid.submitForm( "ef_grid_result", "ev","EVCM05","update",true );
		if(treeNode!=undefined){
		  	treeNode.reload();
		}
	}else{
		alert('请先选择数据');
	}
}

//-------------------------------------------添加文门户节点数据验证 end--------------------------------------------


/*
  点击【修改当前按钮】后调用后台的service
*/
button_updatenow_onclick = function () 
{
     //得到当前节点的值     
      var parentId=ef.get("inqu_status-0-parentNodeId").value;
      if(parentId=='ROOT'||parentId==''){
   		alert("请先在节点树上选择节点！");
   		return;
   	  }
     if(parentId!= null) {
      var childWindow = efform.openNewForm('EVCM0506', "serviceName=EVCM0506&methodName=query&result-0-nodeId=" + parentId,false);
      childWindow.focus();
    }
}

//验证是否新增加了行
function validateSel(){
	var grid = efgrid.getGridObject("ef_grid_result");
  	var rows = grid.getCheckedRows();
  	if(rows == ''){
  		return false;
  	}
  	return true;
}


efform_onPopupReturn = function(winId, returnValue)
{
  if(returnValue=="0"){
  	efbutton.setButtonStatus("updatenow",false);
 	 efgrid.submitInqu( "ef_grid_result", "ev","EVCM05","query");
  	 nTree.reload(nTree._model);
  }
}