/*
  点击查询按钮后调用后台的service
*/

efform_onload = function(){
//ShowRightMenu();
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.addMenuItem("", {label:"refresh", parent:"", text:"<font color=red>刷新</font>", leaf:"1" } );
	grid.addMenuItem("", {label:"pgttl", parent:"", text:"小计总计", leaf:"0" } );
	grid.addMenuItem("pgttl", {label:"page", parent:"pgttl", text:"小计", leaf:"1" ,imgSrc:EF_IMAGES_PATH+"efgrid_sum_page.png"} );
	grid.addMenuItem("pgttl", {label:"total", parent:"pgttl", text:"总计", leaf:"1" ,imgSrc:EF_IMAGES_PATH+"efgrid_sum_total.png"} );
	grid.addMenuItem("", {label:"test", parent:"", text:"测试", leaf:"1" } );
	grid.addMenuItem("", {label:"maxValue", parent:"", text:"该列最大值", leaf:"1" } );
	grid.addMenuItem("", {label:"minValue", parent:"", text:"该列最小值", leaf:"1" } );
	efregion.show("ef_region_result");
	//efregion.show("ef_region_codeDemo");
	//efregion.toggleShow("ef_region_codeDemo");
}


button_query_onclick = function ()
{
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setSumType("none");
	efgrid.submitForm( "ef_grid_result", "ee","EEDM20","query", true );
	grid.paint();
}

button_total_onclick = function ()
{
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setSumType("total");
	efgrid.submitForm( "ef_grid_result", "ee","EEDM20","query", true );
	grid.paint();
}


button_page_onclick = function ()
{
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setSumType("page");
	efgrid.submitForm( "ef_grid_result", "ee","EEDM20","query", true );
	grid.paint();
}

gridmenu_pgttl_onclick = function(gridId,label,row_index,col_index,data_type){
	button_pgttl_onclick();
}

gridmenu_page_onclick = function(gridId,label,row_index,col_index,data_type){
	button_page_onclick();
}

gridmenu_total_onclick = function(gridId,label,row_index,col_index,data_type){
	button_total_onclick();
}
button_pgttl_onclick = function ()
{
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setSumType("all");
	efgrid.submitForm( "ef_grid_result", "ee","EEDM20","query", true );
	grid.paint();
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM20","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM20","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM20","update",true );
}

efgrid_onSumCellDisplayReady = function( div_html, row_index,
								col_index, sumValue,displaySumValue, gridId ,renderType){
		var grid = efgrid.getGridObject(gridId);

		var type = efgrid.divSum.getColRenderType(grid,TYPE_DATA,col_index);
		if((type=="page" || type=="all") && row_index != 1){
			var column = grid.getColumn(col_index, TYPE_DATA);

			var div_node = document.createElement( "div" );
			div_node.innerHTML = div_html;

			div_node.firstChild.style.color = "red";

			//$(div_node).find("b").get(0).innerText += "￥(元)";
			var node = $("<span >【"+column.getCname()+"】小计：</span>").get(0);
			node.style.color = "blue";
			$(div_node).find("div").get(0).insertBefore(node,$(div_node).find("b").get(0));

			return div_node.innerHTML;
		}else
			return div_html;
}

/**
	<EF:EFColumn ename="double1" cname="数据一" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double2" cname="数据二" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double3" cname="数据三" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double4" cname="数据四" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double5" cname="数据五" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double6" cname="数据六" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double7" cname="数据七" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double8" cname="数据八" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double9" cname="数据九" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double10" cname="数据十" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double11" cname="数据十一" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double12" cname="数据十二" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double13" cname="数据十三" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double14" cname="数据十四" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double15" cname="数据十五" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double16" cname="数据十六" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double17" cname="数据十七" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double18" cname="数据十八" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double19" cname="数据十九" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double20" cname="数据二十" sort="true" formatString="#,###,##0.000" />


**/

function efgrid_onRowDblClicked(gridId,row_index){

	if(gridId == "ef_grid_result"){
		alert("双击事件：efgrid_onRowDblClicked gridId ["+gridId + "] row_index ["+row_index + "]");
	}
}

gridmenu_refresh_onclick = function(gridId,label,row_index,col_index,data_type){
	var grid = efgrid.getGridObject(gridId);
	grid.refresh();
}
gridmenu_test_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}
gridmenu_test2_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}

gridmenu_maxValue_onclick = function(gridId,label,row_index,col_index,data_type){
	var grid = efgrid.getGridObject(gridId);
	var column = grid.getColumn(col_index,data_type);
	alert(efutils.maxInGrid(gridId,column.getEname()));
}
gridmenu_minValue_onclick = function(gridId,label,row_index,col_index,data_type){
	var grid = efgrid.getGridObject(gridId);
	var column = grid.getColumn(col_index,data_type);
	alert(efutils.minInGrid(gridId,column.getEname()));
}