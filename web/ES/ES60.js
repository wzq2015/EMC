efform_onload = function () {
  renderTypeGrid();
  efbutton.setButtonStatus("F8", false);
  efbutton.setButtonStatus("F9", false);
}

renderTypeGrid = function (){
  var __grid_result = new efgrid( "result","ef_grid_t" );
  var local_ei = new EiInfo();
  var block = new EiBlock("result");
  local_ei.addBlock(block);  
  __grid_result.setEnable(true);
  __grid_result.setReadonly(false);
  __grid_result.setAjax(true);  
  __grid_result.setAutoDraw(true);
  __grid_result.setServiceName("ES61");
  __grid_result.setQueryMethod("query");
  __grid_result.setStyle({"navigationBar":"false"});   
  __grid_result.setData(local_ei); 
  __grid_result.paint();
  
  efgrid.submitInquWithMeta( "ef_grid_t", "es","ES61","query" );   
}

efgrid_onRowClicked = function( grid_id, row_idx ){
  if ( grid_id == "ef_grid_r" ){
    var grid = efgrid.getGridObject( grid_id );
    var row= grid.getRowData(row_idx); 
    document.getElementById("inqu_status-parent").value=row['label'];  
    efgrid.submitInqu( "ef_grid_t", "es","ES61","query" );
    efbutton.setButtonStatus("F8", true);
    efbutton.setButtonStatus("F9", true);
  }
};

button_f5_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES60","insert",true );
}

button_f6_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES60","delete", true );
}

button_f8_onclick = function() 
{
	efgrid.submitForm( "ef_grid_t", "es","ES61","insert",true );	
}

button_f9_onclick = function() 
{
	efgrid.submitForm( "ef_grid_t", "es","ES61","delete", true );
}

