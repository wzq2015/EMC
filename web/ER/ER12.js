/*
  点击查询按钮后调用后台的service
*/
button_search_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "er","ER12","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "er","ER12","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_add_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "er","ER12","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "er","ER12","update",true );
}
