
button_query_onclick = function () 
{
   efgrid.submitInqu( "ef_grid_result", "eu","EU18","query");
}

button_insert_onclick = function()
{
	efgrid.submitInqu( "ef_grid_result", "eu","EU18","insert",true );
}

button_update_onclick = function()
{
	efgrid.submitForm( "ef_grid_result", "eu","EU18","update",true );
}

button_delete_onclick = function()
{
	efgrid.submitForm( "ef_grid_result", "eu","EU18","delete",true );
}

button_back_onclick = function()
{	
	var grid = efgrid.getGridObject("ef_grid_result");	
 	if (!window.opener.closed)
 	{
    var cb = window.opener["SelectCallBack"];    
    cb.call(this,grid.getSelectRowsData());	
  	}
  	window.close();
};