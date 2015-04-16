efform_onload = function ()
{
  //efbutton.setButtonStatus("F6", false);
  efregion.show("ef_region_result");
  //efregion.toggleShow("ef_region_inqu");
}

button_f2_onclick = function () 
{
    //debugger;
    //var node = ef.getNodeById("efFormTime");
    //var dd = new Date();
    //node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("EDFA00"))) {
      efgrid.submitInqu( "ef_grid_result", "ep","EP06","query");
    }
	
}

//通过实现独立的方法来提供下载的数据，并且在方法中指定render跳向下载页面
//便于下载逻辑的定制，但需要实现额外的方法
button_export_onclick = function () 
{
	//win = efform.openNewForm("EU00","serviceName=EDFA00&methodName=query");
	//location.href="DispatchAction.do?efFormEname=EU00&serviceName=EDFA00&methodName=query";
      efgrid.submitInqu( "ef_grid_result", "ep","EP06","export");
      efbutton.setButtonStatus("export", true);
}

