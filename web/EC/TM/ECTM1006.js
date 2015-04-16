document.write("<script language=javascript src='EU/ueditor/editor_all.js'></script>");
var editor1;

var divFckArrAff = new Array("FCKeditorAfficheMoreDispStyle");
var textAreatArrAff = new Array("DataFCKeditorAfficheMoreDispStyle");
var submitDataArrAff = new Array("titleLinkMoreString");
var eiInfo;
efform_onload = function ()
{
	eiInfo=_getEi();
	//公告
	if(ef.get("result6-0-titleLinkDisplayRows").value=='' || ef.get("result6-0-titleLinkDisplayRows").value==0)
		ef.get("result6-0-titleLinkDisplayRows").value = 20;
	if(ef.get("result6-0-titleLinkDisplayWords").value=='' || ef.get("result6-0-titleLinkDisplayWords").value==0)
		ef.get("result6-0-titleLinkDisplayWords").value = 20;
		
   /*---------------------公告FCK
	for(var i=0;i<divFckArrAff.length;i++){
		showDialog("insert",6,divFckArrAff[i],textAreatArrAff[i],submitDataArrAff[i]);
	}*/
	//创建UEDITOR编辑器
 	editor1 = new baidu.editor.ui.Editor(); 
 	editor1.render("myEditor1"); 
 	//取编辑器源值
 	var value1=eiInfo.getBlock('result6').getCell('0',"titleLinkMoreString");
 	//隐藏域赋值 
 	value1 = value1==null?"":value1;//避免NULL值导致UEDITOR赋值异常
    ef.get('result6-0-titleLinkMoreString').value=value1;
    //UEDITOR编辑器赋值
    editor1.setContent(value1);
    
	setStyle();
	hiddenElementById("ef_form_head");
}

button_update6_onclick = function () 
{	
	if(efvalidateDiv("ef_region_result6")){
		if(!styleJudge("6")){
			return;
		}
		/*----------------------保存FCK中的数据
		for(var i=0;i<divFckArrAff.length;i++){
	        editorToContent(6,textAreatArrAff[i],submitDataArrAff[i]);
	    }*/
		ef.get('result6-0-titleLinkMoreString').value=editor1.getContent();
		
	    eiInfo.set("unitStyleId",ef.get("result6-0-unitStyleId").value);
	    eiInfo.set("result6",0,"titleLinkDisplayRows",ef.get("result6-0-titleLinkDisplayRows").value);
		eiInfo.set("result6",0,"titleLinkDisplayWords",ef.get("result6-0-titleLinkDisplayWords").value);
		eiInfo.set("result6",0,"titleLinkMoreString",ef.get("result6-0-titleLinkMoreString").value);
	    EiCommunicator.send( "ECTM1006", "updateBulletinLink" , eiInfo, null );
	    parent.opener.location.href = parent.opener.location.href;
	    parent.window.close();
	}
	
}