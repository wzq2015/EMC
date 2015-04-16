/**
 *	
 *  对应用例ID：108287
 */


/**
 * 查询按钮对应事件
 */
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ee","EE11","query");
}

/**
 * 该方法grid重新绘制时的回调
 */
efgrid_onGridDisplayReady = function( div_node )
{
	show_custom_column_img();
}
/**
 * 该方法用来弹出页面
 */
efgrid_customColumn = function(gridId){
		var paramList = "inqu_status-0-formEname="+ef.get("efFormEname").value
						+"&&inqu_status-0-funcId="+"RESULT"
						+"&&inqu_status-0-gridId="+gridId;
		var returnValue = efform.openNewForm("EDFA50",paramList,false);
}



//展示grid 自定义列添加图标

show_custom_column_img = function(){

   var length = $("#ef_grid_result__func_table").find("td").length;
 
   $("#ef_grid_result__func_table").find("td").get(length-1).innerHTML += 
   "<IMG src=./EF/Images/efgrid_blue_divider.gif>"
   + "<IMG id=ef_grid_result_custom_column  "
   + "onmouseover=\"this.style.cursor='pointer';\" title='客户化显示' "
   + "onclick='efgrid_customColumn(\"ef_grid_result\")' src=./EF/Images/efgrid_custom_column.gif>";
}