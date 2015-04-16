button_cancel_onclick=function(){
   window.close();
}
ajax_callback = {
      onSuccess : function(eiInfo){ 
             if (!window.opener.closed) {
	             window.opener.efform_onPopupReturn("EVCM0506", "0");	
             }
                   window.close();
               },
      onFail   : function(eMsg){
                     alert("failure");
                  }
    }
button_confirm_onclick=function(){
   if(efvalidateDiv("ef_region_result")){
    var info = new EiInfo();
    info.setByNode("ef_region_result");  
    EiCommunicator.send("EVCM05", "update" , info, ajax_callback );
    }  
}
