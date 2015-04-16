var eiInfo;
var editor1;
document.write("<script language=javascript src='EU/ueditor/editor_all.js'></script>");
efform_onload = function ()
{
	eiInfo=_getEi();
	var articleContent= eiInfo.getBlock('result1').getCell('0','staticUnitHtmlContent');
	ef.get("result1-0-staticUnitHtmlContent").value=articleContent;
	//showDialog("",1,"FCKeditor","DataFCKeditor","staticUnitHtmlContent");
	//创建UEDITOR编辑器
	editor1 = new baidu.editor.ui.Editor(); 
	editor1.render("myEditor1"); 
	//编辑器赋值
	articleContent = articleContent==null?"":articleContent;
	editor1.setContent(articleContent);
	
	hiddenElementById("ef_form_head");
}

/*静态单元保存按钮*/
button_update1_onclick = function () 
{	
	//editorToContent(1,editor1,"staticUnitHtmlContent");
	ef.get("result1-0-staticUnitHtmlContent").value = editor1.getContent();
	var value = ef.get("result1-0-staticUnitHtmlContent").value;
	var desLength=efutils.getTotalBytes(value);
	//fileDes.replace(/[^\x00-\xff]/g,'**').length
	if(desLength>4000){
    	alert("字数长度过长");
    	return false;
    }else{
		//var info = new EiInfo();
	    //info.setByNode("ef_region_result1"); 
	    eiInfo.set("result1",0,"staticUnitHtmlContent",ef.get("result1-0-staticUnitHtmlContent").value)
	    EiCommunicator.send( "ECTM1001", "updateStaticHtml" , eiInfo, null );
	    parent.opener.location.href = parent.opener.location.href;
	    //window.close();
	    parent.window.close();
	}
}