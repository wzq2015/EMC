button_query_onclick = function () 
{
      //efgrid.submitInqu( "ef_grid_result", "ed","EE60Z","query");
      var value = document.getElementById("count_i").value;
      alert(value);
      var tt = "验证";
      var fcname = document.getElementById("efFormCname").value;
      alert(fcname);
      location.href="DispatchAction.do?efFormEname=EE60Z&serviceName=EE60ZZ&methodName=query&chartest=我们&count_i=" 
      + value + "&tt=" + tt + "&ff=" + fcname;
}

button_ajax_onclick = function () 
{	
	  var info = new EiInfo(); 
	  //info.setById("inqu_status-0-form_ename");
	  info.setByNode("ef_region_inqu");
      EiCommunicator.send( "EDFA00", "query", info, button_ajax_onclick_callback  );   	
}

var button_ajax_onclick_callback = {
  onSuccess : 
    function(eiInfo){  
	  var ef_grid = efgrid.getGridObject("ef_grid_result");
	  ef_grid.setData(eiInfo);
	  ef_grid.paint();
    },
  onFail    : 
    function(eMsg) {
      alert("failure");
    }
}
    
button_update_onclick = function () 
{
	//efgrid.submitForm( "ef_grid_result", "ed","EE60Z","update",true );
      var value = document.getElementById("count_i").value;
      alert(value);
	 location.href="DispatchAction.do?efFormEname=AEAER10&itemNum=测试" + "&myNumber=" + value ;
	
}

button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","EE60Z","testName", true );
}

button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EE60ZZ","insert",true );
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}


efgrid_cellclick = function( grid_id, row_index, col_index, value ) 
{
}

efgrid_onCellDisplayReady = function( div_node, row_index, col_index, col_value_c, display_value )
{
}

efgrid_onGridDisplayReady = function( div_node )
{
}

efgrid_onAddNewRow = function( grid_id )
{
  efbutton.setButtonStatus("insert", true);
  efbutton.setButtonStatus("update", false);
  return true;  
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( col_index >0 )
	{
		  debugger;
        var node = ef.getNodeById("efFormPopup");
		if (node.value == "1") {
		  alert("I am popup");
		  
		  //var ttt = window.opener.document.getElementById("inqu_status-0-node_ename");
		  //ttt.value = value;
		  
		  window.opener.setValue(value);
		  
		  window.close();
		}
	}
}

efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node ) 
{ 
//debugger;
//alert(div_node.firstChild.checked);
alert("checkbox click");
var grid = efgrid.getGridObject( grid_id );
alert(grid.getCheckedRowCount());
alert(grid.isRowChecked( row_index )); 
if( !grid.isRowChecked( row_index ) && grid.getCheckedRowCount()>=2 ) 
{ 
alert( "不能选择超过2行！"); 
div_node.firstChild.checked = false; 
} 
}

efgrid_onRowClicked = function( grid_id, row_index ){
alert("row clicked")
var grid = efgrid.getGridObject( grid_id );
alert(grid.getCheckedRowCount()); 
alert(grid.isRowChecked( row_index )); 
};

