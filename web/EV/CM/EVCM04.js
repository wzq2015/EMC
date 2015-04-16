button_query_onclick = function () 
{  
	efgrid.submitInqu( "ef_grid_result", "EVCM","EVCM04","query");
}

button_insert_onclick = function () 
{
  	efform.openNewForm("EVCM0401", "");
  //efgrid.openForm( "ef_grid_result", "EVCM","EVCM04","insert", true );	
}
//点击修改按钮时回调函数
button_update_onclick = function () 
{
   grid = efgrid.getGridObject( "ef_grid_result" );
    if(grid.getCheckedRowCount()>1){
      alert("一次只能修改一条记录");
      return false;
    }else if(grid.getCheckedRowCount()<1){
      alert("请选择一条记录");
      return false;
    }else {
      selectedId=grid.getCellValue(grid.getCheckedRows()[0], 0, TYPE_DATA );
      //efgrid.submitForm( "ef_grid_result", "EVCM","EVCM0604","save", true );	
      //efform.openNewForm("EVCM0402", "inqu_status-0-templateId="+selectedId); 
      efform.openNewForm('EVCM0402',jQuery.param({"inqu_status-0-templateId":selectedId}));
    }
}

//点击删除按钮时回调函数
button_delete_onclick = function () 
{
    efgrid.submitForm( "ef_grid_result", "EVCM","EVCM04","delete", true );
}


efgrid_onDataCellClick = function( grid_id, row_index, col_index, value ) {
    left1=(screen.availWidth-400)/2 ;
	top1=100;//(screen.availHeight-200)/2 ;
   	var obj=window.showModalDialog(value,"效果图","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:500px;dialogHeight:250px;");
}

efform_onPopupReturn = function(winId, returnValue){
	efgrid.submitInqu( "ef_grid_result", "EV","EVCM04","query");
}

