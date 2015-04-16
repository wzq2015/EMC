/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ej","EJPD02","query");
}


/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ej","EJPD02","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	//if(!isTableSelected()) {
    //  return;
    //}
//    var jobEname = ef.get("inqu_status-0-jobEname").value;
//    if(jobEname == undefined || jobEname == "") 
//    {
//    	alert("请输入需要调整的列队名称！");
//    	return;
//    }
//    else
//    {
//    	ef.get("jobEname").value = jobEname;
//    }
    
   // alert(ef.get("queueName").value);
    
	efgrid.submitForm( "ef_grid_result", "ej","EJPD02","update",true );
}


/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{

    if(confirm(getI18nMessages("label.EJPDConfirmDeleteJobDefine","此次操作将删除该作业定义，要继续吗？"))){
  	   efgrid.submitForm( "ef_grid_result", "ej","EJPD02","delete", true );
  	}
}


/*
  点击移动按钮后
*/
button_move_onclick = function () 
{
  if(!efvalidateDiv("moveStep",false)) {
    alert("请输入正确的移动位置，必需为正整数");
    return;
  }
    
  var step = ef.get("step").value;
  var grid = efgrid.getGridObject("ef_grid_result");
  var count = grid.getRowCount();
  if(step > count+1)
    step = count+1;
  
  if(step <= 0)
    step = 1;  
  
  var rowLength = grid.getCheckedRows().length;
  if(rowLength <= 0) {
    alert("请选择需要移动的记录！");
    return;
  }
  
  var checkedRows = grid.getSelectRowsData();//保存被选中需要移动的记录
  var newRows = new Array();
  
  for(i=0;i<step-1;i++){
    if(!grid.isRowChecked(i))
      newRows.push(grid.getRowData(i));
  }
  newRows = newRows.concat(checkedRows);
  for(i=step-1;i<count;i++) {
    if(!grid.isRowChecked(i))
      newRows.push(grid.getRowData(i));
  }
  
  for(i=count-1;i>=0;i--){
    grid.removeRow(i);
  }
  
  grid.addRowData( newRows );

  grid.refresh();	
  efform.setStatus(0,"移动"+rowLength+"条记录成功!");
	
}


/**
	grid单元格显示时，显示按钮信息。

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
         var grid = efgrid.getGridObject( "ef_grid_result" );
         var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
         var jobCode=grid.getCellValue(row_index,1,TYPE_FIX);
         //var jobParams = grid.getCellValue(row_index,3,TYPE_FIX);
         //alert(jobCode);
         //alert(jobParams); 
         if(columnEname=="asyOperate"){ 
              return "<div align='center' efval=''><input value='"+getI18nMessages("label.EJPDAsyOperate","自助运行")+"' class='buttonclass' type='button' align='center' onclick='showWindowOfEJAC02(\""+jobCode+"\")'></div>" ;
          }
       }
}
*/


