var divFckArrAff = new Array("FCKeditorDisplay");
var textAreatArrAff = new Array("FCKeditorTextarea");
var submitDataArrAff = new Array("infoContent");
var eiInfo;
efform_onload = function ()
{
  efform.hideFormHead();
  loadInfo();
	eiInfo=_getEi();
	for(var i=0;i<divFckArrAff.length;i++){
		showDialog("","",divFckArrAff[i],textAreatArrAff[i],submitDataArrAff[i]);
	}
}

/**
 * 封装 表单信息
 * */
function packEiInfo(id,parentId){
	var eiinfo = new EiInfo();
	eiinfo.set("id",id.trim());
	eiinfo.set("parentId",parentId.trim());
	eiinfo.set("title",ef.get("inqu-0-title").value.trim());
	eiinfo.set("key",ef.get("inqu-0-key").value.trim());
	eiinfo.set("docNo",ef.get("inqu-0-docNo").value.trim());
	eiinfo.set("author",ef.get("inqu-0-author").value.trim());
	eiinfo.set("pageNo",ef.get("inqu-0-pageNo").value.trim());
	eiinfo.set("infoContent",ef.get("inqu-0-infoContent").value.trim());
	return eiinfo;
}

/**
 * 加载信息 for update
 * */
function loadInfo(){
	loadParam();
	var eiinfo = new EiInfo();
	if(method == "update"){
		eiinfo.set("nodeId",nodeVal);
		EiCommunicator.send("EUAF13","query",eiinfo,loadInfo_callback);
	}else if(method == "delete"){
		eiinfo.set("nodeVal",nodeVal);
		eiinfo.set("parentVal",parentVal);
		EiCommunicator.send("EUAF13","delete",eiinfo,loadInfo_callback);
	}
}
var loadInfo_callback =  {
	onSuccess :
	 	function (eiInfo)
		{
			var node_block = eiInfo.getBlock("node_block");
    		loadParam();
			if(method == "delete"){
 				 window.parent.document.getElementById("rightFrame").src = "DispatchAction.do?efFormEname=EUAF14&method=delete&nodeVal=";
 				 window.parent.reloadCurrentNode();
 				//  window.parent.document.getElementById("_eiMsg").value = ef.get("_eiMsg").value.trim();
 				 return ;
			}
			ef.get("inqu-0-id").value = node_block.getCell(0, "id");
			ef.get("inqu-0-parentId").value = node_block.getCell(0, "parentId");
			ef.get("inqu-0-title").value = node_block.getCell(0, "title");
			ef.get("inqu-0-key").value = node_block.getCell(0, "key");
			ef.get("inqu-0-author").value = node_block.getCell(0, "author");
			ef.get("inqu-0-docNo").value = node_block.getCell(0, "docNo");
			ef.get("inqu-0-pageNo").value = node_block.getCell(0, "pageNo");
			ef.get("inqu-0-infoContent").value = node_block.getCell(0, "infoContent");
		},
	onFail:
		function(eMsg)
		{
			alert("服务调用失败: "+eMsg );
		}
}

/**
 * 表单验证
 * */
function checkForm(){
	var title = ef.get("inqu-0-title");
	var key = ef.get("inqu-0-key");
	var docNo = ef.get("inqu-0-docNo");
	var pageNo = ef.get("inqu-0-pageNo");
	var infoContent = ef.get("inqu-0-infoContent");
	if(title.value.trim() == ""){
		alert("标题不允许为空！");
		title.focus();
		return false;
	}
	if(key.value.trim() == ""){
		alert("关键字不允许为空！");
		key.focus();
		return false;
	}
	if(docNo.value.trim() == ""){
		alert("文档编号不允许为空！");
		docNo.focus();
		return false;
	}
	if(pageNo.value.trim() == ""){
		alert("页面编号不允许为空！");
		pageNo.focus();
		return false;
	}
	return true;
}
var method = "",nodeVal = "",parentVal = "";
function loadParam(){
	method = ef.get("method").value.trim();
	nodeVal = ef.get("nodeVal").value.trim();
	parentVal = ef.get("parentVal").value.trim()
}
button_inqu_save_onclick = function (){
	for(var i=0;i<divFckArrAff.length;i++){ //保存FCK中的数据
        editorToContent(textAreatArrAff[i],submitDataArrAff[i]);
    }
	loadParam();
	if(nodeVal == ""){
		alert("请选择节点进行操作！");
		return ;
	}else if(method == ""){
		alert("请选择操作类型！");
		return ;
	}
	if(!checkForm()){
		return ;
	}
	var eiinfo = null;
	if(method == "insert"){
		eiinfo = packEiInfo("",nodeVal);
	}else if(method == "update"){
		eiinfo = packEiInfo(ef.get("inqu-0-id").value,parentVal);
	}else if(method == "delete"){
		if(nodeVal == "-1"){
			alert("根节点，不能删除！");
			return ;
		}
		eiinfo = packEiInfo(nodeVal,parentVal);
	}
	EiCommunicator.send("EUAF13",method,eiinfo,save_callback);
}
var save_callback =  {
	onSuccess :
		 	function (eiInfo){
				if(eiInfo.getStatus()=="-1"){
					alert("操作失败！");
					return ;
				}else{
					alert("操作成功！");
				}
				window.parent.reloadCurrentNode();
				efform.clearDiv('ef_region_inqu');
				nodeVal = eiInfo.get("beanId")+"";
				window.parent.document.getElementById("rightFrame").src = "DispatchAction.do?efFormEname=EUAF14&method="+method+"&nodeVal="+nodeVal;
   			},
 			onFail:
   			function(eMsg)
			{
   				alert("服务调用失败: "+eMsg );
			}
}
button_inqu_back_onclick = function (){
  loadParam();
  window.parent.document.getElementById("rightFrame").src = "DispatchAction.do?efFormEname=EUAF14&method=search&nodeVal="+nodeVal;
}

/****************Fckeditor**************************/
//显示FCK控件
  /*
   *  divfck 包含fck编辑框的div
   *  tarea 多行输入域
   *  subdata 提交数据到服务器端的参数标志名称
   */
function showDialog(flag,blockId,divfck,tarea,subdata){
    var oEditor ;
	if( typeof( FCKeditorAPI ) != 'undefined' ){
		 oEditor = FCKeditorAPI.GetInstance(tarea) ;//DataFCKeditor
	}
	var articleContent= ef.get("inqu"+ blockId +"-0-" +  subdata ).value;//articleContent
	var eFCKeditorDiv = document.getElementById(divfck) ;	//FCKeditor
	if (!oEditor){
	    //创建FCK控件
	   CreateEditor(tarea,articleContent)
	}else{
		oEditor.SetData(articleContent) ;
	}
	eFCKeditorDiv.style.display = '' ;
	if ( oEditor && !document.all ){
		if ( oEditor.EditMode == FCK_EDITMODE_WYSIWYG )
			oEditor.MakeEditable() ;
	}
}

function CreateEditor(textAreaId,articleContent){
	document.getElementById(textAreaId).value=articleContent;
    var oFCKeditor = new FCKeditor(textAreaId) ;
	oFCKeditor.BasePath = './EF/Fckeditor/' ;
	oFCKeditor.ToolbarSet='MyToolbar';
	oFCKeditor.Width = '100%' ;
	oFCKeditor.Height = '420' ;
	oFCKeditor.ReplaceTextarea();
}
//将FCK控件的内容保存到隐藏的内容框中
function editorToContent(tarea,subdata){
   var oEditor;
   if(typeof(FCKeditorAPI ) != 'undefined' ) {
	  oEditor = FCKeditorAPI.GetInstance( tarea) ;//DataFCKeditor
   }
   if(oEditor) 	ef.get("inqu"+"-0-" + subdata ).value = oEditor.GetXHTML() ;//'inqu-0-articleContent'
}
function FCKeditor_OnComplete( editorInstance ){
}
