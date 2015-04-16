efform_onload = function ()
{
  setFalseAllButton();
}
/*
  把所有按钮置为false
  */
function setFalseAllButton(){
  efbutton.setButtonStatus("add1", false);
  efbutton.setButtonStatus("select1", false);
  efbutton.setButtonStatus("undo1", false);
  efbutton.setButtonStatus("set1", false);
  efbutton.setButtonStatus("add2", false);
  efbutton.setButtonStatus("select2", false);
  efbutton.setButtonStatus("undo2", false);
  efbutton.setButtonStatus("set2", false);
  //默认点击第一个节点树
  var node=tree._rootNode.getChildNodes()[0];  
  node.textClicked();
}
function setTrueAllButton(){
  efbutton.setButtonStatus("add1", true);
  efbutton.setButtonStatus("select1", true);
  efbutton.setButtonStatus("undo1", true);
  efbutton.setButtonStatus("set1", true);
  efbutton.setButtonStatus("add2", true);
  efbutton.setButtonStatus("select2", true);
  efbutton.setButtonStatus("undo2", true);
  efbutton.setButtonStatus("set2", true);
}

/*
  左边树
*/
var tableTreeModel =  new eiTreeModel('ECTM00');

var treeNode;
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();

}

function treeNodeInitializer(node){
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
	var selfAble = (node._label).split("@")[3];
	  if(selfAble=="false"){
	     alert("没有权限，不允许访问!");
	     return ;
	  }
	var label=node._label;
    
    setTrueAllButton();
    
	var type=[];
	var Type;
	var Id;
	type=label.split('@');

	if(type.length>=2){
	  Id=type[1];
	  Type=type[0];
	}
  
	if(Type=='site'){
	  Type='0';
	}
	else if(Type=='column'){
	  Type='1';
	}
	

	var info = new EiInfo();
	info.set("objId",Id);
	info.set("objType",Type);
	
	ef.get("inqu_status-0-objId").value=Id;
	ef.get("inqu_status-0-objType").value=Type;
	
	EiCommunicator.send( "ECTM05", "getIns" , info, null );
	if(Type=='0'){
		document.getElementById("ef_region_result1").style.display='';
	    if(ajaxEi!=null){
	      ef.get("result1-0-templateInsId").value=check(ajaxEi.get("templateInsId1"),"0");
	      ef.get("result2-0-templateInsId").value=check(ajaxEi.get("templateInsId2"),"1");
	      
	      ef.get("result1-0-templateInsName").value=check(ajaxEi.get("templateInsName1"),"0");
	      ef.get("result2-0-templateInsName").value=check(ajaxEi.get("templateInsName2"),"1");
	    }
	}
}
/*
  对没有模板实例的文本框格式化输出
*/
function check(a,id){
	
	if(id=="0"){
		id="1";
	}else if(id=="1"){
		id="2";
	}else if(id=="2"){
		id="3";
	}else if(id=="3"){
		id="4";
	}

	if(a==undefined){
		efbutton.setButtonStatus("undo"+id, false);
		efbutton.setButtonStatus("set"+id, false);
		return '暂无';
	}
	else{
		efbutton.setButtonStatus("undo"+id, true);
		efbutton.setButtonStatus("set"+id, true);
		return a;
	}
}

/*
  清空html文件
*/
button_delete_onclick = function () 
{	
    if(confirm("确定要清空首页html文件吗？")){
    	var info = new EiInfo();
    	EiCommunicator.send( "ECUtils", "deleteLoginHtml" , info, "11" );
    	var infoMsg=ajaxEi.get("msg");
    	alert(infoMsg);
	}
}

/*********************************开始：模板实例的新增***************************************/
/*
  新增未登录首页模板实例
*/
button_add1_onclick = function () 
{	
    if(confirm("若新增实例值，有可能导致进不了系统,确定新增实例吗？")){
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "0";
	
	var childWindow = efform.openNewForm('ECTM0104', "serviceName=ECTM0104&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
	}
}
/*
  新增搜索模板实例
*/
button_add2_onclick = function () 
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "1";
	
	var childWindow = efform.openNewForm('ECTM0104', "serviceName=ECTM0104&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
	
}
/*********************************结束：模板实例的新增***************************************/



/*********************************开始：模板实例的选择***************************************/
/*
  选择未登录首页模板实例
*/
button_select1_onclick = function () 
{	
    if(confirm("若选择实例值，有可能导致进不了系统,确定选择实例吗？")){
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "0";
	
	var childWindow = efform.openNewForm('ECTM03', "serviceName=ECTM03&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
    }
}
/*
  选择搜索模板实例
*/
button_select2_onclick = function () 
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "1";
	
	var childWindow = efform.openNewForm('ECTM03', "serviceName=ECTM03&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
}
/*********************************结束：模板实例的选择***************************************/



/*********************************开始：模板实例的撤销***************************************/
/*
  撤销未登录首页模板实例
*/
button_undo1_onclick = function () 
{	
	
	if(ef.get("result1-0-templateInsName").value=="暂无"){
		alert("没有可供撤销的模板实例！");
		return false;
	}
	if(confirm("若撤销实例值，有可能导致进不了系统，是否确认撤销？")){
		var info = new EiInfo();
		
		//节点编号
		info.set("objId",ef.get("inqu_status-0-objId").value);
		//节点类型
		info.set("objType",ef.get("inqu_status-0-objType").value);
		//模板类型标识
		info.set("templateTypeId","0");
		
		EiCommunicator.send( "ECTM05", "undoIns" , info, null );
	
		if(ajaxEi!=null){
			ef.get("result1-0-templateInsId").value=check(ajaxEi.get("templateInsId1"),"0");
		      
		    ef.get("result1-0-templateInsName").value=check(ajaxEi.get("templateInsId1"),"0");
		}
	}
}
/*
  撤销搜索模板实例
*/
button_undo2_onclick = function () 
{	
	
	if(ef.get("result2-0-templateInsName").value=="暂无"){
		alert("没有可供撤销的模板实例！");
		return false;
	}
	if(confirm("是否确认撤销？")){
		var info = new EiInfo();
		
		//节点编号
		info.set("objId",ef.get("inqu_status-0-objId").value);
		//节点类型
		info.set("objType",ef.get("inqu_status-0-objType").value);
		//模板类型标识
		info.set("templateTypeId","1");
		
		EiCommunicator.send( "ECTM05", "undoIns" , info, null );
	
		if(ajaxEi!=null){
			ef.get("result2-0-templateInsId").value=check(ajaxEi.get("templateInsId2"),"1");
		      
		    ef.get("result2-0-templateInsName").value=check(ajaxEi.get("templateInsId2"),"1");
		}
	}
}
/*********************************结束：模板实例的撤销***************************************/

/*********************************开始：模板实例的设置***************************************/
/*
  设置未登录首页模板实例
*/
button_set1_onclick = function () 
{	
	window.open("content/homeSite/index.html?mode=edit_1_plus_1");
}

/*
  设置栏目首页模板实例
*/
button_set2_onclick = function ()
{	
	window.open("content/homeSite/search/index.html?mode=edit_1_plus_1&isSearchResult=true&area=5");
}
/*********************************结束：模板实例的设置***************************************/

