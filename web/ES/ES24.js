
form_init = function(service,method){
	ef.get("methodName").value= method;
	ef.get("serviceName").value = service;	
}

button_f2_onclick = function(){ //查询
	ef.get("inqu_status-0-loginName").value = ef.get("inqu_status-0-queryUserId"); 
	form_init("ES24","query");
	
	document.forms[0].submit();	
} 

button_pole_onclick = function(){ //查询角色
  ef.get("inqu_status-0-loginName").value = ef.get("inqu_status-0-queryUserId"); 
  efgrid.submitInqu( "ef_grid_pole", "es", "ES24","queryPole");
} 

button_auth_onclick = function(){ //查询权限
  ef.get("inqu_status-0-loginName").value = ef.get("inqu_status-0-queryUserId"); 
  efgrid.submitInqu( "ef_grid_auth", "es", "ES24","queryAuth");
} 


efform_onload = function () {
  efregion.show("ef_region_auth");
  efregion.show("ef_region_pole");
  ef.get("inqu_status-0-source").value='0';
}
button_reset_onclick=function(){
  var info = new EiInfo();
  var userId=ef.get("inqu_status-0-userId").value;
//  var userCname=ef.get("inqu_status-0-userCname").value;
   info.setByNameValue("inqu_status-0-userId",userId);	
   info.setByNameValue("inqu_status-0-queryUserId",userId);
   	EiCommunicator.send( "ES21", "resetPassword" , info, null );
}

