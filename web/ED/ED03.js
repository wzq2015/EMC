/**
  *模块查询
  */
button_query_onclick = function () 
{   
	efgrid.submitInqu( "ef_grid_result", "ed","ED03","query");
	
}


/**
  *模块新增
  */
button_insert_onclick = function () 
{       
     efgrid.submitForm( "ef_grid_result", "ed","ED03","insert",true);
}


/**
  *模块删除
  */
button_delete_onclick = function () 
{	
  	efgrid.submitForm( "ef_grid_result", "ed","ED03","delete", true );
}


/**
  *模块更新
  */
button_update_onclick = function () 
{  
    efgrid.submitForm( "ef_grid_result", "ed","ED03","update",true);   
}
