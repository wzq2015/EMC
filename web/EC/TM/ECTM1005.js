var eiInfo;
efform_onload = function ()
{
	eiInfo=_getEi();
	if(ef.get("result5-0-articleDisplayRows").value=='')
		ef.get("result5-0-articleDisplayRows").value = 10;
	if(ef.get("result5-0-articleDisplayWords").value=='')
		ef.get("result5-0-articleDisplayWords").value = 20;
		
	//是否启用相关文章
	if(ef.get("result5-0-articleLikeStatus").value=='1'){
		ef.get("result5-0-articleLikeStatusCheck").checked=true;
	}
	enableArticleLike();
	setStyle();
	hiddenElementById("ef_form_head");
}

/*文章正文保存按钮*/
button_update5_onclick = function () 
{	
	if(!styleJudge("5")){
		return;
	}
	
	var articleDisplayRows = ef.get("result5-0-articleDisplayRows").value; 
	var artilceDisplayWords = ef.get("result5-0-articleDisplayWords").value;
	
	if(articleDisplayRows == null || String(articleDisplayRows).replace(/^[\s]+$/,'') == ""){
	   		alert("显示行数不能为空！");
		    ef.get("result5-0-articleDisplayRows").focus();
		    return ;
	} 
	 
	if(artilceDisplayWords == null || String(artilceDisplayWords).replace(/^[\s]+$/,'') == ""){
	    alert("显示字数不能为空！");
		ef.get("result5-0-articleDisplayWords").focus();
		return ;
	}
	 
	 
	var numberReg = /^[0-9]*$/;
	if(!numberReg.test(articleDisplayRows)){
		alert("显示行数必须是正整数！");
		ef.get("result5-0-articleDisplayRows").focus();
		return ;
	}
	
	if(articleDisplayRows == 0 || articleDisplayRows == "0"){
	     alert("显示行数必须是正整数！");
	     ef.get("result5-0-articleDisplayRows").focus();
		 return ;
	}
	
	
	if(!numberReg.test(artilceDisplayWords)){
		alert("显示字数必须是正整数！");
		ef.get("result5-0-articleDisplayWords").focus();
		return ;
	}
	 
	if(artilceDisplayWords == 0 || artilceDisplayWords == "0"){
	    alert("显示字数必须是正整数！");
		ef.get("result5-0-articleDisplayWords").focus();
		return ;
	} 
	
    eiInfo.set("unitStyleId",ef.get("result5-0-unitStyleId").value);
   	eiInfo.set("result5",0,"articleDisplayWords",ef.get("result5-0-articleDisplayWords").value);
	eiInfo.set("result5",0,"articleDisplayRows",ef.get("result5-0-articleDisplayRows").value);
	eiInfo.set("result5",0,"articleLikeStyleId",ef.get("result5-0-articleLikeStyleId").value);
	eiInfo.set("result5",0,"articleLikeStatus",ef.get("result5-0-articleLikeStatus").value);	
    EiCommunicator.send( "ECTM1005", "updateArticleContent" , eiInfo, null );
    parent.opener.location.href = parent.opener.location.href;
	parent.window.close();
	
}

//相关文章属性
function enableArticleLike(){
	var articleProsDiv=document.getElementById('articlePros');
	if(ef.get("result5-0-articleLikeStatusCheck").checked){
		ef.get("result5-0-articleLikeStatus").value='1';
		articleProsDiv.style.display = "";
	}else{
		ef.get("result5-0-articleLikeStatus").value='0';
		articleProsDiv.style.display = "none";
	}
}