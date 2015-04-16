efform_onload = function(){
	
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM07","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM07","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM07","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM07","update",true );
}

/*
 点击主表里的主键字段触发的回调
*/
efgrid_onFixCellClick = function( grid_id, row_index, col_index, value )
{
	if( grid_id == "ef_grid_result" )
	{
       ef.get("company_inqu_status-0-countryCode").value = value;
       efgrid.submitInqu( "ef_grid_company", "ee", "EEDM07","queryCompany");
	}
}

/*
  点击删除按钮后调用后台的service
*/
button_delete1_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_company", "ee","EEDM07","deleteCompany", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert1_onclick = function ()
{
	efgrid.submitForm( "ef_grid_company", "ee","EEDM07","insertCompany",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update1_onclick = function ()
{
	efgrid.submitForm( "ef_grid_company", "ee","EEDM07","updateCompany",true );
}