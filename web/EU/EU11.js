efform_onload = function ()
{
  efbutton.setButtonStatus("insert", false);
}

button_query_onclick = function () 
{
	if(efvalidateDiv("ef_div_inqu")){
		efgrid.submitForm( "ef_grid_result", "eu","EU11","query",true );
	}
}
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "eu","EU11","insert",true );
}

button_update_onclick = function () 
{

	efgrid.submitForm( "ef_grid_result", "eu","EU11","update",true );
}

button_del_onclick = function () 
{

	efgrid.submitForm( "ef_grid_result", "eu","EU11","delete",true );
}

button_sql_onclick = function () 
{

	efgrid.submitForm( "ef_grid_result", "eu","EU11","exportDataSql",true );
	efbutton.setButtonStatus("sql", true);
    efform.setStatus(0, "结束执行sql生成!");
      //使第二次以及以后的导出 正确
    if(!!ef.get("ef_grid_result_submit"))
      ef.get("ef_grid_result_submit").parentNode.removeChild(ef.get("ef_grid_result_submit"));    
	
}
efgrid_onAddNewRow = function( grid_id )
{
	efbutton.setButtonStatus("insert", true);
    efbutton.setButtonStatus("update", false);
    return true;  
}
