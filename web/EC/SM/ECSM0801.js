efform_onload = function ()
{	
	var opstatus = ef.get("opstatus").value;
	
	if(opstatus=="insert") 
		document.getElementById("templateTypeId").disabled  = false;
}	


button_upload_onclick = function() 
{
	var model_file = document.getElementById('model_file').value;
	var zip_file = document.getElementById('zip_file').value;
	
	var exp1 = model_file.substring(model_file.length-3,model_file.length);
	var exp2 = zip_file.substring(zip_file.length-3,zip_file.length);
	
	var nodeId = ef.get("nodeId").value;
	var nodeType = ef.get("nodeType").value;
	
	if(nodeId==null || nodeId == "" ){
		alert("节点ID获取失败！");
		return false;
	}
	if(nodeType==null || nodeType == "" ){
		alert("节点类型获取失败！");
		return false;
	}
	
	
	if(exp1.toLowerCase()!='jsp'){
		alert('请上传jsp文件！');
		return false;
	}else if(exp2.toLowerCase()!='zip'){
		alert('请上传zip文件！');
		return false;
	}else{
		var templateDefId = ef.get("templateDefId").value;
		var templateDefName =ef.get("templateDefName").value;
		var templateFileName =ef.get("templateFileName").value ;
		var templateTypeId = ef.get("templateTypeId").value;
		var suffix = ef.get("suffix").value;
		
		var actionUrl= "./EC/SM/ECSM0802.jsp"+"?templateTypeId="+templateTypeId+"&templateDefId="+templateDefId;
		
		actionUrl += "&templateDefName=" + templateDefName;
		actionUrl += "&templateFileName=" + templateFileName;
		actionUrl += "&suffix=" + suffix;
		actionUrl += "&nodeId=" + nodeId;
		actionUrl += "&nodeType=" + nodeType;
		
		ef.get("ECSM0801").action = actionUrl;
		document.form1.submit();
	}
}