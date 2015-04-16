//点击取消按钮
button_cancel_onclick=function(){
   window.close();
}
ajax_callback = {
      onSuccess : function(eiInfo){ 
             if (!window.opener.closed) {
	             window.opener.efform_onPopupReturn("ECCM05", "0");	
             }
                   window.close();
               },
      onFail   : function(eMsg){
                     alert("failure");
                  }
    }
//点击合并弹出框中的确定按钮
button_confirm_onclick=function(){
   if(efvalidateDiv("ef_region_result")){
    var info = new EiInfo();
    info.setByNode("ef_region_result");  
    EiCommunicator.send( "ECCM05", "update" , info, ajax_callback );
    }  
}
