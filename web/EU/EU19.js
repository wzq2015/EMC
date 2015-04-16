
button_query_onclick = function () 
{
   efgrid.submitInqu( "ef_grid_result", "eu","EU19","query");
}

button_insert_onclick = function()
{
	efgrid.submitInqu( "ef_grid_result", "eu","EU19","insert",true );
}

button_update_onclick = function()
{
	efgrid.submitForm( "ef_grid_result", "eu","EU19","update",true );
}

button_delete_onclick = function()
{
	efgrid.submitForm( "ef_grid_result", "eu","EU19","delete",true );
}

button_back_onclick = function()
{	
	var grid = efgrid.getGridObject("ef_grid_result");	
 	if (!window.opener.closed)
 	{
    var cb = window.opener["SelectCommandCallBack"];    
    cb.call(this,grid.getSelectRowsData());	
  	}
  	window.close();
};