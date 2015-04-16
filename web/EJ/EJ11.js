button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_rtrigger", "","iplat4j_JobService","triggerList");
}

button_f3_onclick = function () 
{
	if(have_check("ef_grid_rtrigger")){
	  if(confirm(getI18nMessages("label.EJConfirmCreateRecord","确实要创建记录?"))){
		efgrid.submitForm( "ef_grid_rtrigger", "","iplat4j_JobService","triggerCreate",true,true );
	  }
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

button_f4_onclick = function () 
{
  var isNewLine = check_newLine("ef_grid_rtrigger");
 	if(isNewLine){
	  alert(getI18nMessages("label.EJPleaseEditAfterSaveTrigger","请保存该触发器后再进行编辑操作！"));
	  return;
	}
	if(have_check("ef_grid_rtrigger")){
	 	if(confirm(getI18nMessages("label.EJConfirmEditRecord","确实要编辑记录?"))){
		  efgrid.submitForm( "ef_grid_rtrigger", "","iplat4j_JobService","triggerUpdate", true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

button_f5_onclick = function () 
{
  var isNewLine = check_newLine("ef_grid_rtrigger");
 	if(isNewLine){
	  alert(getI18nMessages("label.EJPleaseDeleteAfterSaveTrigger","请保存该触发器后再进行删除操作！"));
	  return;
	}
	if(have_check("ef_grid_rtrigger")){
		if(confirm(getI18nMessages("label.EJConfirmEditRecord","确实要编辑记录?"))){
		  efgrid.submitForm( "ef_grid_rtrigger", "","iplat4j_JobService","triggerDelete", true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

efgrid_onAjaxSubmitSuccess = function(gridId, service_name, method_name, eiInfo)
{
	if(method_name=="triggerList"){
		var ef_grid = efform.getGrid( gridId );	 
  	ef_grid.refresh( eiInfo );
	}else{
	  if ( eiInfo.getMsg() != null )
		  alert(eiInfo.getMsg());
	  button_f2_onclick();
	}
}	

efform_onload = function ()
{
	efform.setPageTitle("EJ11/"+getI18nMessages("label.EJTriggerManagerPage","任务触发器定义页面"));
	efregion.show("ef_region_qtrigger");
	var ef_region_qtrigger_buttonbar = new efbuttonbar();
	ef_region_qtrigger_buttonbar.buttonCount = 1;
	ef_region_qtrigger_buttonbar.buttonData = [["f2",getI18nMessages("label.query","查询")]];
	ef_region_qtrigger_buttonbar.paint("ef_region_qtrigger");
	efregion.show("ef_region_rtrigger");
	var ef_region_rtrigger_buttonbar = new efbuttonbar();
	ef_region_rtrigger_buttonbar.buttonCount = 3;
	ef_region_rtrigger_buttonbar.buttonData = [["f3",getI18nMessages("label.add","新增")],["f4",getI18nMessages("label.edit","编辑")],["f5",getI18nMessages("label.delete","删除")]];
	ef_region_rtrigger_buttonbar.paint("ef_region_rtrigger");
	show_link_button();
}	