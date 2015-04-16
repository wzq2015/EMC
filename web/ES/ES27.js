efform_onload = function () {

}

button_f2_onclick = function() {
 var limit = document.getElementById( "inqu_status-0-size" );
 var grid = efform.getGrid( "ef_grid_p" );	 
 grid.setOffset(0);
 grid.setLimit ( eval(limit.options[limit.selectedIndex].value) );
 
 var from = document.getElementById( "inqu_status-0-from" );
 from.value = 0;
 
 efpage.submitMetadata( grid );	
}

button_f3_onclick = function() {
  efpage.goNext("ef_grid_p");
}


  


