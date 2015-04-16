check_passwd_valid = function (oldpwd,newpwd,renewpwd)
{
	if( !isAvailable(oldpwd)  )
	{
		alert(getI18nMessages("label.ESPleaseInputOldPassword","请输入旧口令!"));
		return false;
	}
	if( !isAvailable(newpwd)  )
	{
		alert(getI18nMessages("label.ESPleaseInputNewPassword","请输入新口令!"));
		return false;
	}
	if( !isAvailable(renewpwd)  )
	{
		alert(getI18nMessages("label.ESPleaseInputNewPasswordAgain","请再次确认新口令"));
		return false;
	}
	if( newpwd != renewpwd )
	{
		alert(getI18nMessages("label.ESPasswordNotEqualBetweenNewInput","两次输入的新口令不一致,请重新输入!"));
		return false;
	}
	return true;
}

button_f2_onclick = function () 
{
	 var oldPasswd  = document.getElementById("inqu_status-0-oldPasswd").value;
	 var newPasswd  = document.getElementById("inqu_status-0-newPasswd").value;
	 var renewPasswd  = document.getElementById("inqu_status-0-renewPasswd").value;
   if( check_passwd_valid(oldPasswd,newPasswd,renewPasswd) )  
   {
  		if(confirm(getI18nMessages("label.ESConfirmModifyPassword","确定要修改用户密码吗？"))){
  		  ef.get("methodName").value="changePWD";
  		  document.actionForm.submit();					
  		}
 	 }	
}

var ajax_action_callback = {
  onSuccess : 
    function(eiInfo){  
    	var ret = eiInfo.getStatus();
    	if( ret == 0)
			 alert(getI18nMessages("label.ESModifyPasswordSuccess","修改用户密码成功!"));
			if( ret == -1)
			 alert(getI18nMessages("label.ESOldPasswordErrorAndInputAgain","旧密码错误!请重新输入!"));
			if( ret == -2)
			 alert(getI18nMessages("label.ESModifyPasswordFail","修改用户密码失败!"));
    },
  onFail    : 
    function(eMsg) {
      alert(getI18nMessages("label.ESModifyPasswordFail","修改用户密码失败!"));
    }
}

efform_onload = function ()
{
	var title = "ES23/" + getI18nMessages("label.ESModifyPassword","修改密码");
	efform.setPageTitle(title);
	efregion.show("ef_region_password");
	var ef_region_password_buttonbar = new efbuttonbar();
	ef_region_password_buttonbar.buttonCount = 1;
	ef_region_password_buttonbar.buttonData = [["F2",getI18nMessages("label.ESConfirmToModify","确定修改")]];
	ef_region_password_buttonbar.paint("ef_region_password");
}	

