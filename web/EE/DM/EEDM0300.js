/*
	查询按钮
*/
button_query_onclick = function (){
//	  select = ef.get("inqu_status-0-productCode");
//	  if(select.value == ""){
//	  	efform.clearDiv("ef_region_result");
//	  	efform.setStatus(1,"未查得任何记录");
//	  }
//	  else{
	  	document.getElementById("methodName").value="query";
	  	document.forms[0].submit();
//	  }
}

/**
	修改按钮
*/

button_update_onclick = function (){
	if(ef.get("result-0-productCode").value == ""){
		efform.setStatus(-1,"请选择产品代号!");
	}else{
	  	document.getElementById("methodName").value="update";
	  	document.forms[0].submit();
  	}
}

/**
	重置按钮功能
*/
button_reset_onclick = function (){
	if(ef.get("result-0-productCode").value == "" || undefined == ef.get("result-0-productCode").value){
		efform.setStatus(-1,"请选择产品代号!");
	}else{
  		document.forms[0].reset();
  	}
}
