efform_onload = function ()
{
  //efbutton.setButtonStatus("F6", false);
  //efregion.show("ef_region_inqu");
  //efregion.toggleShow("ef_region_inqu");

if(document.getElementById("methodName").value=="initLoad" || document.getElementById("methodName").value=="getBean"){
		if(document.getElementById("methodName").value=="initLoad")
			button_getbean_onclick();
		else
			button_transtele_onclick();	
		}
}

button_getbean_onclick = function () 
{
    if(efvalidateObj(document.getElementById("beanName"))) {
      document.getElementById("methodName").value="getBean";
	  document.forms[0].submit();
	}
	
}

    
button_gettele_onclick = function () 
{
    if((!efvalidateObj(document.getElementById("fieldCount")))||(efvalidateObj(document.getElementById("fieldCount"))&&document.getElementById("fieldCount").value == 0)) {
      alert("请获取正确的bean信息！");
      return;
    }
    if(efvalidateDiv("result")) {
      document.getElementById("methodName").value="getTeleStr";
	  document.forms[0].submit();
	}
	
}

button_transtele_onclick = function () 
{
    if(efvalidateObj(document.getElementById("beanTele"))) {

      document.getElementById("methodName").value="transTeleStr";
   	  document.forms[0].submit();
	}
}

button_send_onclick = function (){
	if(efvalidateObj(document.getElementById("beanTele")) && efvalidateObj(document.getElementById("indexNumb"))) {
		document.getElementById("methodName").value="sendTeleStr";
		document.forms[0].submit();
	}	

}
getBeanMsg = function (){
	var indexNumb = ef.get("indexNumb");
	if(isAvailable(indexNumb)){ //ajax调用
		var info = new EiInfo();
		info.setById("indexNumb");
		EiCommunicator.send("ET10","getBeanMsg",info,
			{
				onSuccess :
					function(eiInfo){
						ef.get("beanName").value=eiInfo.get("beanName");
						ef.get("outIndexColName").value=eiInfo.get("outIndexColName");
						if(eiInfo.get("beanPoint") == "1")
							ef.get("beanPoint").checked = true;
						else
							ef.get("beanPoint").checked = false;		
					},
			  onFail    : 
			    function(eMsg) {
			      alert("failure");
			    }		
			});
	}
} 

efcascadeselect_ensure_onclick= function (id){
	getBeanMsg();
}
    