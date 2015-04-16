efform_onload = function ()
{
	var templateId = ef.get("result-0-templateDefId").value;
	if(templateId==null || templateId==""){
		efbutton.setButtonStatus("update", false);
	}else{
  		efbutton.setButtonStatus("insert", false);
  	}
}


/*
  点击保存按钮后调用后台的service
*/
button_update_onclick = function() {
	var info=new EiInfo();
	info.set("templateDefId",document.getElementById("result-0-templateDefId").value);
	info.set("templateContent",document.getElementById("result-0-templateContent").value);
	EiCommunicator.send("ECTM0105", "updateTemplate", info, null);
};
button_insert_onclick= function(){
	var info=new EiInfo();
	var templateTypeId = document.getElementById("result-0-templateTypeId").value;
	var nodeId = " ";
	var nodeType = " ";
	info.set("defName",document.getElementById("result-0-defName").value);
	info.set("templateTypeId",templateTypeId);
	info.set("templateContent",document.getElementById("result-0-templateContent").value);
	info.set("nodeId",nodeId);
	info.set("nodeType",nodeType);
	
	EiCommunicator.send("ECTM0105", "InsertTemplate", info, null);
};
