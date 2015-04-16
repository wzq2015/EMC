button_f2_onclick = function () {
 var ajaxCallBack = { 
    onSuccess: function(ei){
    	
      
      var access = ei.get("access");
      var alertInfo = getI18nMessages("label.ESCanAccess","可以访问");
      efform.setStatus(1, ei.getMsg(), ei.getMsgKey());
      if( access == "false" ){
        var cause = ei.get("error");
        alertInfo = getI18nMessages("label.ESCannotAccess","不能访问") + ":"+cause;
      }
      alert(alertInfo);
	},
    onFail: function(xmlR, status, e){ alert("ERROR"); }
  }; 

  var eiinfo = new EiInfo();
  var user = ef.get("inqu_status-0-user").value;
  var perm = ef.get("inqu_status-0-permission").value;
  eiinfo.setByNameValue("inqu_status-0-user", user);
  eiinfo.setByNameValue("inqu_status-0-permission", perm);
  EiCommunicator.send( "ES59", "query", eiinfo, ajaxCallBack, false );
}