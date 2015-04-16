efform_onload = function() {
	efform.setPageTitle("EP09/重新设置密码申请");
	efregion.show("ef_region_password");
	var ef_region_password_buttonbar = new efbuttonbar();
	ef_region_password_buttonbar.buttonCount = 1;
	ef_region_password_buttonbar.buttonData = [ [ "F2", "发送邮件" ] ];
	ef_region_password_buttonbar.paint("ef_region_password");
};

button_f2_onclick = function() {
	var eiInfo = new EiInfo();
	
	//eiInfo.set("workNumber", $("#inqu_status-0-username").val());
	//eiInfo.set("email", $("#inqu_status-0-email").val());

	//ef.getNodeById("inqu_status-0-username").value = "EU00";
    //ef.getNodeById("#inqu_status-0-email").value = "EDFA00";

	
	$("#workNumber").attr( "value", $("#inqu_status-0-username").val() );
	$("#email").attr( "value",$("#inqu_status-0-email").val());

	ef.get("methodName").value="recoverPassword";
	ef.get("serviceName").value="EP09";
	document.forms[0].submit();	


	//EiCommunicator.send("EP09", "recoverPassword", eiInfo, null);
	//efform.submit(document.forms[0]);
	//efgrid.submitInqu( "ef_grid_result", "ep", "EP09", "recoverPassword");
};