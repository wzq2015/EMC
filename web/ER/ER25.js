efform_onload = function ()
{
	var data = dialogArguments;
	ef.get("reportId").value = data.ef.get("reportId").value;
	ef.get("reportBelongTo").value = data.ef.get("reportBelongTo").value;
	ef.get("reportVersion").value = data.ef.get("reportVersion").value;
	
	
    efregion.show("ef_region_report");
    efregion.show("ef_region_para");
    
	user_define_para_load();
	
}

user_define_para_load = function () 
{
	  var inInfo = new EiInfo();
	  erTools.setFixParam(inInfo);
	  
	  EiCommunicator.send("ERUtils","getPara", inInfo);
	  
	  if (ajaxEi != null) {
	    erTools.autodrawPara(ajaxEi, "para", "ef_para_list");
	  }
}	

button_close_onclick = function(){
	window.close();
}

button_upload_onclick = function(){
	if(!efvalidateDiv("ef_para_list", false)){
		alert("请输入报表运行时参数！");
		return;
	}	
	if(efutils.trimString(ef.get("reportFile").value)=="" ){
		alert("请选择要上传的报表文件！");	
		return ;
	}
	
	var reportId = ef.get("reportId").value;	
	var reportBelongTo = ef.get("reportBelongTo").value;	
	var reportVersion = ef.get("reportVersion").value;	
	  var funcCommonPara = encodeURI(getParaDescStr("ef_para_list"));
	  
	document.actionForm.action = "ER/uploadReportFile.jsp?reportId="+reportId+"&&reportBelongTo="+reportBelongTo
									+"&&reportVersion="+reportVersion+"&&funcCommonPara="+funcCommonPara; 
	try{
		document.actionForm.submit();
	}catch(e){
		efform.setStatus(-1,"导入文件失败！请上传xml格式的Excel文件!");
	}
	
}



getParaDescStr = function (divId, splitStr) { 

  var paras = ef.get(divId).getElementsByTagName("input");
  var paraStr = "";
  
  if (splitStr == null) splitStr = ",";
  	
  for ( var i = 0; i < paras.length; i++ )   
  {
    var paraValue = efutils.trimString(paras[i].value);
    
    if (paraValue == "") continue;
    
    var paraDesc = ef.get("_" + paras[i].name).innerText;

    if (i > 0) paraStr += splitStr;
      paraStr += paras[i].name + "=" + paraDesc + "=" + paraValue;
  }
    
  return paraStr;
}

