var eiInfo;
efform_onload = function ()
{
	eiInfo=_getEi();
	if(ef.get("result7-0-titleLinkDisplayWords").value=='' || ef.get("result7-0-titleLinkDisplayWords").value==0)
		ef.get("result7-0-titleLinkDisplayWords").value = 20;
	if(ef.get("result7-0-imgWidth").value=='' || ef.get("result7-0-imgWidth").value==0)
	    ef.get("result7-0-imgWidth").value = 260;
	if(ef.get("result7-0-imgHeight").value=='' || ef.get("result7-0-imgHeight").value==0)
	    ef.get("result7-0-imgHeight").value = 170;
	//处理图片新闻个数无法显示的特殊问题
	var block=eiInfo.getBlock("result7");
	if(block!=null){
		var titleLinkDisplayRows=block.getCell(0,"titleLinkDisplayRows");
		ef.get("result7-0-titleLinkDisplayRows").value=titleLinkDisplayRows;
	}
	if(ef.get("result7-0-titleLinkDisplayRows").value=='' || ef.get("result7-0-titleLinkDisplayRows").value==0)
	    ef.get("result7-0-titleLinkDisplayRows").value = 1;
	//判断是否显示图片新闻指定栏目属性项
	onselect_source(3,ef.get("result7-0-titleLinkContentSourceMode").value);
	hiddenElementById("ef_form_head");
}

button_update7_onclick = function () 
{	
	var re = /^[1-9]\d*$/;
   	if(ef.get("result7-0-titleLinkContentSourceMode").value<=1 && ef.get("result7-0-titleLinkSpecColumn").value==''){
		alert("请指定栏目来源！");
		return false;
	}		
	else if(!re.test(ef.get("result7-0-imgWidth").value) || ef.get("result7-0-imgWidth").value<1 || ef.get("result7-0-imgWidth").value>800){
		alert("高度和宽度属性输入框中只能输入1-800之间的正整数!");
		return false;
	}
	else if(!re.test(ef.get("result7-0-imgHeight").value) || ef.get("result7-0-imgHeight").value<1 || ef.get("result7-0-imgHeight").value>800){
		alert("高度和宽度属性输入框中只能输入1-800之间的正整数!");
		return false;
	}
	if(efvalidateDiv("ef_region_result7")){
	    eiInfo.set("result7",0,"titleLinkContentSourceMode",ef.get("result7-0-titleLinkContentSourceMode").value);
		eiInfo.set("result7",0,"titleLinkSpecColumn",ef.get("result7-0-titleLinkSpecColumn").value);
		eiInfo.set("result7",0,"titleLinkDisplayWords",ef.get("result7-0-titleLinkDisplayWords").value);
	    eiInfo.set("result7",0,"titleLinkDisplayRows",ef.get("result7-0-titleLinkDisplayRows").value);
		eiInfo.set("result7",0,"imgHeight",ef.get("result7-0-imgHeight").value);
		eiInfo.set("result7",0,"imgWidth",ef.get("result7-0-imgWidth").value);
		
	    EiCommunicator.send( "ECTM1007", "updateImgLink" , eiInfo, null );
	    parent.opener.location.href = parent.opener.location.href;
	    parent.window.close();
}	}