/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM1001","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM1001","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM1001","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM1001","update",true );
}

efform_onload = function()
{
	//var start_time = ef_form_init_time.getTime();
	var start_time = window.opener.start_time;
	var end_time = new Date().getTime();
	//alert(start_time.getTime());
	alert("EEDM1001 took " + (end_time-start_time) + "ms to load");
}