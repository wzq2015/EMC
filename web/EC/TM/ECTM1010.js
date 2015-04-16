var eiInfo;
efform_onload = function ()
{
	eiInfo=_getEi();
	if(ef.get("result10-0-portalNum").value=='')
		ef.get("result10-0-portalNum").value = 'EV0102';	
	hiddenElementById("ef_form_head");
}


button_update10_onclick = function () {	
	var info = new EiInfo();
	eiInfo.set("result10",0,"portalRegion",ef.get("result10-0-portalRegion").value);
    eiInfo.set("result10",0,"portalNum",ef.get("result10-0-portalNum").value);
    EiCommunicator.send( "ECTM1010", "updatePortal" , eiInfo, null );
    parent.opener.location.href = parent.opener.location.href;
	parent.window.close();
}

//门户
function onselect_portal(value){
	var rtn;
	if(value=='table'){
		rtn = 'EV0102';
	}else if(value=='config'){
		rtn = 'EV0103';
	}else if(value=='menu'){
		rtn = 'EV0104';
	}else if(value=='portal'){
		rtn = 'EV0105';
	}
	ef.get('result10-0-portalNum').value=rtn;
}