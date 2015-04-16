//渲染grid
efform_onload = function ()
{
    efregion.show("ef_region_result");
}

button_statistic_onclick=function(){
	/*分页参数offset置0*/
	var grid = efgrid.getGridObject( "ef_grid_result" );
	grid.setOffset(0);
	/*提交参数,执行统计*/
	efgrid.submitForm( "ef_grid_result", "EVPM07","EVPM07","portletUseStatistic"); 	
}