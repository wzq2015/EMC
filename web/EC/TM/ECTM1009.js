document.write("<script language=javascript src='EU/ueditor/editor_all.js'></script>");
var editor1;
var eiInfo;

efform_onload = function ()
{
	eiInfo=_getEi();
	if(ef.get("result9-0-showLines").value=='' || ef.get("result9-0-showLines").value==0)
		ef.get("result9-0-showLines").value = 10;
	var type=ef.get("result9-0-columnLinkStyleId").value
	searchType_change(type);
	hiddenElementById("ef_form_head");
}


/*搜索单元接口保存按钮*/
button_update9_onclick = function () 
{	
	var type=ef.get("result9-0-columnLinkStyleId").value;
	var isSearchResult = ef.get("isSearchResult").value;
	if(isSearchResult=="true"){
		if(ef.get("result9-0-unitStyleId").value==0){
			alert("搜索样式不能为空，请新增并选择样式!");
			return ;
		}
		if(ef.get("result9-0-pageCurStyleId").value==0){
			alert("翻页当前页不能为空，请新增并选择样式!");
			return ;
		}
		if(ef.get("result9-0-pageNCurStyleId").value==0){
			alert("翻页非当前页不能为空，请新增并选择样式!");
			return ;
		}
		if(ef.get("result9-0-totalStyleId").value==0){
			alert("搜索布局样式不能为空，请新增并选择样式!");
			return ;
		}
		if(ef.get("result9-0-showLines").value.length==0){
			alert("请输入搜索结果每页显示行数！");
			return;
		}
	}
	
	
	if(type=="1" && isSearchResult!="true"){
		alert("‘搜索区域’应为‘搜索入口’！只有‘未登录主页’的‘内容搜索’模板才允许设置搜索结果！");
		return;
	}
    //editorToContent(9,"DataFCKeditor","staticUnitHtmlContent");
	ef.get('result9-0-staticUnitHtmlContent').value=editor1.getContent();
	
    if(ef.get('result9-0-staticUnitHtmlContent').value.trim()==""){
    	if(confirm("搜索入口样式不能为空，保存为默认样式?")){
    		
    	}else{
    		return;
    	}
    }
	
	var area= ef.get("area").value;
    eiInfo.set("area",area);
    eiInfo.set("unitStyleId",ef.get("result9-0-unitStyleId").value);
    eiInfo.set("pageCurStyleId",ef.get("result9-0-pageCurStyleId").value);
    eiInfo.set("pageNCurStyleId",ef.get("result9-0-pageNCurStyleId").value);
    eiInfo.set("totalStyleId",ef.get("result9-0-totalStyleId").value);
    eiInfo.set("showLines",ef.get("result9-0-showLines").value);
    eiInfo.set("result9",0,"staticUnitHtmlContent",ef.get("result9-0-staticUnitHtmlContent").value);
    eiInfo.set("result9",0,"columnLinkStyleId",ef.get("result9-0-columnLinkStyleId").value);
    EiCommunicator.send( "ECTM1009", "updateSearchUnitInterface" , eiInfo, null );
    parent.opener.location.href = parent.opener.location.href;
	parent.window.close();
}

function searchType_change(type)
{
	if(type=='0'){
		document.getElementById('searchEntry').style.display='';
		document.getElementById('searchResult').style.display='none';
	}else if(type=='1'){
		document.getElementById('searchEntry').style.display='none';
		document.getElementById('searchResult').style.display='';
	}
}

function showFCKeditor(){
 	
	/*var oEditor;
 	if ( typeof( FCKeditorAPI ) != 'undefined' )
		oEditor = FCKeditorAPI.GetInstance( 'DataFCKeditor' ) ;
	if(!oEditor)
		showDialog("",9,"FCKeditor","DataFCKeditor","staticUnitHtmlContent");
	
	 else
	   document.getElementById("FCKeditor").style.display="";
	
	*/
	//创建UEDITOR编辑器
	if(!editor1){
 		editor1 = new baidu.editor.ui.Editor(); 
 		editor1.render("myEditor1"); 
 		var value1 = ef.get('result9-0-staticUnitHtmlContent').value;
 		value1 = value1==null?"":value1;
 		editor1.setContent(value1);
	}
}
