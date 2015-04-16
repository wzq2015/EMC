

/*
	tab页之间切换的回调函数
	@param currentIndex 表示当前tab所在的序号
	@param index 表示要切换跳转的tab页所在序号
	返回true则发生tab页之间的切换跳转
	返回false则表示tab页不发生切换跳转
	不返回的时候则发生tab页之间的切换跳转
*/
fundiv = function (currentIndex,index){
	if(currentIndex==0 && index==1){
		button_query2_onclick();
	}



}
/*
	国家信息的查询
*/
button_query_onclick = function (){
	efgrid.submitInqu( "ef_grid_result", "EE","EEDM05","query");
}

/*
	公司信息的查询
*/
button_query2_onclick = function (){
	efgrid.submitInqu( "ef_grid_result_2", "EE","EEDM05","queryCompany");
}

/*
	国家信息的删除
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "EE","EEDM05","delete", true );
}
/*
	公司信息的删除
*/
button_delete2_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result_2", "EE","EEDM05","deleteCompany", true );
}

/*
	国家信息的插入
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "EE","EEDM05","insert",true );
}
/*
	公司信息的插入
*/
button_insert2_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result_2", "EE","EEDM05","insertCompany",true );
}
/*
	国家信息的修改
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "EE","EEDM05","update",true );
}
/*
	公司信息的修改
*/
button_update2_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result_2", "EE","EEDM05","updateCompany",true );
}

/*
	grid单元格显示的回调，显示查看按钮，用户点击该查看按钮，跳转到公司信息tab页，并且显示该国家的公司信息
*/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ,gridId){
  	  if("ef_grid_result" == gridId){
	  	  var grid = efgrid.getGridObject( gridId );
		  var id = grid.getCellValue(row_index,0,TYPE_DATA);
		  if( col_index == 3 ){
		    if("" != id) {
		    	return "<div align=center ><input value='查看' class='buttonclass' type='button' onclick='showView(\""+id+"\")'></div>" ;
		    }
		    else
		    	return "";
		  }
	  }
}
/*
	显示该国家的公司信息
*/
showView = function(id){
	efform.clearDiv("ef_region_inqu_2");
	ef.get("inqu_status-0-companyCountryCode").value=id;
	efRoundDivTabChange_option("ef_tab_y",1,fundiv);

}
