var inlayoutid = "0000000000006407";
var outlayoutid;

//点击切换按钮
button_change_onclick = function () {
	if(!outlayoutid){
		alert("选择布局");
	}
	alert(outlayoutid);
}

//点击radio按钮时候
button_check_onclick = function (layoutId) {
	outlayoutid = layoutId;
}

//渲染单选按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
	if(grid_id=="ef_grid_result"){
      	var grid = efgrid.getGridObject("ef_grid_result");
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
       	var rowData = grid.getRowData(row_index);
       	var value = rowData.layoutId;
      	if(columnEname=="radio"){ 
      		if(inlayoutid==value){
      			outlayoutid = value;
      			return "<div align='center' efval=''><input name='change' checked type='radio' align='center' onclick='button_check_onclick(\""+value+"\")'></div>";
      		}else{
      			return "<div align='center' efval=''><input name='change' type='radio' align='center' onclick='button_check_onclick(\""+value+"\")'></div>";
      		} 		
      	}
    }
}