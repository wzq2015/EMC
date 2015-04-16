button_update_onclick = function ()
{
   var userId=ef.get("inqu_status-0-userId").value.trim();
   var expireDate=ef.get("inqu_status-0-expireDate").value.trim();
   var info=new EiInfo();
   info.set("userId",userId);
   info.set("expireDate",expireDate);
   if(userId!=''&&expireDate!=''){
     EiCommunicator.send( "ES78", "update", info, null);
   }else if(userId==''){
       alert(getI18nMessages("label.ESPleaseUserId","请输入用户标识!"));
       return;
   }else{
      alert(getI18nMessages("label.ESPleaseInputExpireDate","请输入有效期!"));
   }
   
}
button_updateall_onclick = function ()
{
   var expireDate=ef.get("inqu_status-0-expireDate").value.trim();
   var info=new EiInfo();
   info.set("expireDate",expireDate);
   if(expireDate!=''){
     EiCommunicator.send( "ES78", "updateAll", info, null);
   }else{
      alert(getI18nMessages("label.ESPleaseInputExpireDate","请输入有效期!"));
   }
   
}
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyy-mm-dd', true);
}
efform_onload = function ()
{
	var title = "ES78/" + getI18nMessages("label.ESModifyExpireDate","修改用户有效期");
	efform.setPageTitle(title);
	efregion.show("ef_region_inqu");
	var ef_region_inqu_buttonbar = new efbuttonbar();
	ef_region_inqu_buttonbar.buttonCount = 2;
	ef_region_inqu_buttonbar.buttonData = [["UPDATE",getI18nMessages("label.ESModify","修改")],["UPDATEALL",getI18nMessages("label.ESModifyAll","修改全部")]];
	ef_region_inqu_buttonbar.paint("ef_region_inqu");
}