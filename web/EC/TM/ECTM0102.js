efform_onload = function ()
{
}	


button_upload_onclick = function () 
{
	var model_file = document.getElementById('model_file').value;
	var zip_file = document.getElementById('zip_file').value;
	
	var exp1 = model_file.substring(model_file.length-3,model_file.length);
	var exp2 = zip_file.substring(zip_file.length-3,zip_file.length);
	
	
	if(exp1.toLowerCase()!='jsp'){
		alert('请上传jsp文件！');
		return false;
	}else if(exp2.toLowerCase()!='zip'){
		alert('请上传zip文件！');
		return false;
	}else{
		ef.get("ECTM0102").action = "./EC/TM/ECTM0103.jsp"+"?fileclassid="+ef.get("classid").value+"&templateDefId="+ef.get("templateDefId").value;
		document.form1.submit();
	}
}
