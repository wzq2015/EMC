button_f1_onclick = function()  //修改
{
				if(efvalidateDiv("ef_region_result")){
		  	      	ef.get("methodName").value="update";
		  			document.forms[0].submit();		
				}  
}

efform_onload = function () {

}

