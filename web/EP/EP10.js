//efform_onload = function() {
//	efform.setPageTitle("EP10/设置密码");
//	efregion.show("ef_region_password");
//	var ef_region_password_buttonbar = new efbuttonbar();
//	ef_region_password_buttonbar.buttonCount = 1;
//	ef_region_password_buttonbar.buttonData = [ [ "F2", "确定修改" ] ];
//	ef_region_password_buttonbar.paint("ef_region_password");
//};

button_f2_onclick = function() {
	
	var eiInfo = new EiInfo();
	eiInfo.set("p_password", $("#inqu_status-0-p_password").val());
	eiInfo.set("p_authen", $("#inqu_status-0-p_authen").val());
	eiInfo.set("p_username", $("#inqu_status-0-p_username").val());
	eiInfo.set("password", $("#inqu_status-0-password").val());
	eiInfo.set("repassword", $("#inqu_status-0-repassword").val());

	EiCommunicator.send("EP10", "resetPassword", eiInfo, null);
};