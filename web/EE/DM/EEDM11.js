/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM11","query");
}

button_export_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ed","EEDM11","export");
	efbutton.setButtonStatus("export", true);
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM11","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM11","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM11","update",true );
}