/*
  点击查询按钮后调用后台的service
*/

efform_onload = function ()
{
	
}	


button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM10","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM10","delete", true );
}
button_insert_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM10","insert", true );
}
button_update_onclick = function () 
{
	//alert(getI18nMessages("ef.NotNull"),"数据不能为空!");
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM01","update", true );
}