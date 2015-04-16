button_f2_onclick = function () 
{
     var eiinfo = new EiInfo();
	 eiinfo.setById("userID");
	 eiinfo.setById("mobileNum");
	 eiinfo.setById("content");
  	 if(confirm(getI18nMessages("label.EMConfirmSendMessage","确定要发送短信吗？"))){
 // 		  ef.get("methodName").value="sendMobileSMS";
 // 		  document.actionForm.submit();		        
  		  EiCommunicator.send( "EM01", "sendMobileSMS", eiinfo, ajax_action_callback, false );			
  	}
	
}

var ajax_action_callback = {
  onSuccess : 
    function(eiInfo){  
    	var ret = eiInfo.getStatus();
    	if( ret == 0)
			 alert(getI18nMessages("label.EMSendMessageSuccess","发送短信成功!"));
			if( ret == -1)
			 alert(getI18nMessages("label.EMSendMessageFail","发送短信失败!"));
    },
  onFail    : 
    function(eMsg) {
      alert(getI18nMessages("label.EMSendMessageFail","发送短信失败!"));
    }
}

efform_onload = function ()
{
	efform.setPageTitle("EM01/"+getI18nMessages("label.EMSendMessage","发送短信"));
	efregion.show("ef_region_sendsms");
	var ef_region_sendsms_buttonbar = new efbuttonbar();
	ef_region_sendsms_buttonbar.buttonCount = 1;
	ef_region_sendsms_buttonbar.buttonData = [["F2",getI18nMessages("label.EMSendMessage","发送短信")]];
	ef_region_sendsms_buttonbar.paint("ef_region_sendsms");
}	

