efform_onload = function(){
	//efregion.show("ef_region_codeDemo"); //设定一个无按钮注册的域  进行渲染显示
	//efregion.toggleShow("ef_region_codeDemo"); // 展开指定域
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM56","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM56","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM56","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM56","update",true );
}