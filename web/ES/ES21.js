button_f1_onclick = function()  //修改
{
				if(efvalidateDiv("ef_region_result")){
		  	      	ef.get("methodName").value="update";
		  			document.forms[0].submit();		
				}  
}

button_f2_onclick = function(){ //查询
	  	      	ef.get("methodName").value="query";
	  			document.forms[0].submit();	
} 

button_f3_onclick = function(){ //新增
	
	var inInfo = new EiInfo();
	var userId = ef.get("inqu_status-0-userId").value;
	inInfo.set("userId",userId);
	EiCommunicator.send("ES26","query", inInfo, null, false,false);
	if (ajaxEi != null) {
			if(ajaxEi.get("user_status")=="user_exist_iplat"){
				alert(getI18nMessages("label.ESUserAlreadyExist","该用户在系统中已经存在")+"【"+userId+"】");
				ajaxEi = null;
				ef.get("inqu_status-0-userId").select();
				return;
			}
					
	}	
	
				if(efvalidateDiv("ef_region_result")){
		  	      	ef.get("methodName").value="insert";
		  			document.forms[0].submit();	
				}
} 

button_f4_onclick = function (){
	ef.get("methodName").value = "resetPassword";
	document.forms[0].submit();
}
efform_onload = function () {

}

