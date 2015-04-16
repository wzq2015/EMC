var eiInfo;
efform_onload = function ()
{
	eiInfo=_getEi();
	setStyle();
	hiddenElementById("ef_form_head");
}

/*当前位置保存按钮*/
button_update4_onclick = function () 
{	
	if(!styleJudge("4")){
		return;
	}
    eiInfo.set("unitStyleId",ef.get("result4-0-unitStyleId").value);
    EiCommunicator.send( "ECTM1004", "updatePositionNavi" , eiInfo, null );
	parent.opener.location.href = parent.opener.location.href;
	parent.window.close();
}