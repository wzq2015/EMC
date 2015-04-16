//查询
button_query_onclick = function() 
{
	efgrid.submitInqu( "ef_grid_result", "ec","ECPM01","query");
}
//设置安全级别
button_update_onclick = function() 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var rows=grid.getCheckedRows();
	if(rows.length==0){
	     alert("请选择需要设置安全级别的用户！");
	     return;
     }else{
     	efwindow.show(null,"forUpdate","center");
     }
    
}

//确定（修改安全级别）
button_comfirm_onclick = function() {
	efgrid.submitForm( "ef_grid_result", "ec","ECPM01","setSecurityLevel",true);
    efwindow.hide();
}

//取消（关闭设置安全级别小窗口）
button_cancel_onclick = function() {
	efwindow.hide();
}