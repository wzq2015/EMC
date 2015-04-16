
efform_onload = function() {
  ef.get("p_username").focus();
  ef.get("p_username").select();
  
  if (self.parent.document.loginType == "popup")
  {
	  ef.get("p_password").focus();
	  ef.get("p_password").select();
  }
  
  if (self != parent){
	if (self.parent.document.loginType != "popup")
	{
		self.parent.document.location=document.location;
        var topWnd = getTopWnd();
    	if (isAvailable(topWnd) && isAvailable(topWnd.lastActivity))
    	{
	    	topWnd.lastActivity = new Date().getTime();
    	}
	}
  }
  else
  {
      var topWnd = getTopWnd();
	  	if (isAvailable(topWnd) && isAvailable(topWnd.lastActivity))
	  	{
		    	topWnd.lastActivity = new Date().getTime();
	  	}
   }
}

passwordOnFocus = function() {
  ef.get("p_password").select();
}

usernameOnFocus = function() {
  ef.get("p_username").select();
}

captchaOnFocus = function() {
	ef.get("p_captcha").select();
}

resetClick = function() {
  ef.get("p_username").value="";
  ef.get("p_password").value="";
//  document.forms[0].reset();
}

loginClick = function() {
	  if (self.parent.document.loginType != "popup")
	  {
	  	if($("#p_username").val().indexOf("\"")>=0){
	  		alert("用户名不能含有非法字符\"！");
	  		return false;
	  	}
		document.forms[0].submit();
	  }
	  else
	  {
		 var jsonEi = "{}";
	     $.ajax(
	             {
	                type:     "POST",
	                async:    false,
	                url:      CONTEXT_PATH + "/EiService",
	                //data:     "service=" + sService + "&method=" + sMethod + "&eiinfo=" + jsonEi,
	                data: { service: "EP50", method: "initLoad",eiinfo: jsonEi,$$LOGIN$$:"true", p_username: ef.get("p_username").value,p_password:ef.get("p_password").value },
	                dataType: "json",
	                success:  function (msg)
	                {
	                	ajaxEi = Json2EiInfo.prototype.parseJsonObject( msg );
	                	
	                	if (ajaxEi.status == "-1")
	                	{
	                		if (isAvailable(msg.msg))
	                		{
	                			$("#loginTip").css("color","red").text("*"+msg.msg); 
	                		}
	                		else
	                		{
	                			$("#loginTip").css("color","red").text("*"+"登录失败，用户名不能为空"); 
	                		}
	                		
	                	}
	                	else
	                	{
	                		parent.$.fn.colorbox.close();
	                	    var topWnd = getTopWnd();
	                		if (isAvailable(topWnd) && isAvailable(topWnd.lastActivity))
	                		{
	                			topWnd.lastActivity = new Date().getTime();
	                		}
	                		
	                		
//				   			self.parent.window.lastActivity = new Date().getTime();
	                	}
	                },
	                error:    function (xmlR, status, e)
	                {
	                   //20080806增加 当Ajax调用失败是 将ajaxEi置空(hubing)
	                   ajaxEi = null;
	                   $("#loginTip").css("color","red").text("*"+"AJAX请求异常，登录失败！"); 
	   	          }
	            });
	  } //else
}

keyPressLogin = function(e) {
  var event= e || window.event;

  if(event.keyCode==13) {
	  loginClick();
  }
}

function load_qncc03 ()
{

	  var cb = { 
		      onSuccess: function(ei){
		        
		        var st = ei.getStatus();
		      	if ( st == -1 ){
		      	  alert(ei.getMsg());
		      	  return;
		      	}
		      },
		      onFailure: function(msg){
		        alert('failure');
		      }
		   }; 
		 
		   var ei_info = new EiInfo();	
		   ei_info.setByNameValue( "inqu_data-0-name", "admin" );   	
		   EiCommunicator.send( "ES01", "queryPost", ei_info, cb, false );  
}

