/*
  点击查询按钮后调用后台的service
*/
button_search_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ee","EDBL12","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ee","EDBL12","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_add_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EDBL12","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EDBL12","update",true );
}

/**
	grid单元格显示时的回调，是否生产用checkbox显示
*/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ,grid_id)
{
  if("ef_grid_result" == grid_id){
	  switch( col_index ){
	     case 1:

	          var html = "";
	          if(display_value =='1'){
	          	html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setMust("+row_index+",this.checked);'/></div>";
	          }else {
	           	html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setMust("+row_index+",this.checked)'/></div>";
	          }
	          return html;
	    default:    
	  }  
  }

}

/*
	是否必须参数checkbox点击时的触发函数
*/
setMust = function(row_index,flage){
	var grid = efgrid.getGridObject("ef_grid_result");
	if(flage){
		grid.setCellValue(row_index, 1, '1',TYPE_DATA);
	}else{
		grid.setCellValue(row_index, 1, '0',TYPE_DATA);	
	}
}
