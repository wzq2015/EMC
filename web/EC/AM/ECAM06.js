	
//渲染按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      var grid = efgrid.getGridObject( "ef_grid_result" );
      var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
       var value=grid.getCellValue(row_index,2,TYPE_DATA);
      if(columnEname=="preview"){   
    return "\<input value='预览' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
      }
      }
}
//点击预览按钮的相关操作
efgrid_onDataCellClick=function(grid_id,row_index,col_index,cell_value)
{
   
  if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var columnId=grid.getCellValue(row_index,0,TYPE_DATA,true);
     var value=grid.getCellValue(row_index,1,TYPE_DATA,true); 
     var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname(); 
     if(columnEname=="preview"){
      
		var objId = columnId;
		var nodeType="a";
		var artId = value;
		var info = new EiInfo();
  		info.set("artId",artId);
  		EiCommunicator.send( "ECTM10", "getUrl" , info, null );
  		url=ajaxEi.get("url");
		efform.openNewForm('ECTM40',"key="+url);
	  //efform.openNewForm('ECTM40',"nodeId="+artId+"&nodeType="+nodeType+"&templateType=3");
	 }
      }
}
//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
//点击查询按钮
button_query_onclick = function () {
	var recCreateTimeStart=ef.get("inqu_status-0-recCreateTimeStart").value;
	var recCreateTimeEnd=ef.get("inqu_status-0-recCreateTimeEnd").value;
    if (recCreateTimeStart!=""&&recCreateTimeEnd!=""){
    if (recCreateTimeStart > recCreateTimeEnd){
    alert("开始日期,截止日期录入有误，请重新输入！");
    ef.get("inqu_status-0-recCreateTimeStart").value="";
    ef.get("inqu_status-0-recCreateTimeEnd").value="";
    return ;
   }
   }
   var nodeId = ef.get("nodeId").value;
   if(nodeId!=null && !nodeId=="")
   {
   		ef.get("inqu_status-0-columnId").value=nodeId;
   }
   var nodeType = parent.document.getElementById("nodeType").value;
   ef.get("inqu_status-0-nodeType").value = nodeType;
   
   efgrid.submitInqu( "ef_grid_result", "ec","ECAM06","query");
}


//点击审核按钮
button_auditing_onclick=function(){
 var grid = efgrid.getGridObject( "ef_grid_result" );
 var rowCount=grid.getCheckedRowCount();
 if(rowCount>0)
   efwindow.show(null,"checkContent","center");
  else
  alert("请选择文章进行审核");
  
}
//点击审核弹出框中的取消按钮
button_cancel_onclick=function(){
  efwindow.hide();
}
//点击审核弹出框中的确定按钮
button_confirm_onclick=function(){
  efgrid.submitForm( "ef_grid_result", "ec","ECAM06","audit",true);
  efwindow.hide();
}
