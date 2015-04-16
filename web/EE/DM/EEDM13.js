/*
efform_onload = function(){
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}*/

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM13","query");
}

button_export_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ed","EEDM13","export");
	efbutton.setButtonStatus("export", true);
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM13","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM13","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM13","update",true );
}