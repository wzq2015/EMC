//function click() {
//
//	if (event.button==2) {
//		show_divwindow();	
//	 }
//}
//
//test_callback = {
//      onSuccess : function(eiInfo){ 
//      
//	var divwindow = document.getElementById("test_divwindow");
//	  efwindow.hide();
//   	  var style_config = new Object();
//	  style_config["operationBar"] = "true";
//	  var grid = new efgrid("result",divwindow.id+"subNode");
//	  var custom_cols = {"index":{},"metas":[]};
//	  grid.setEnable( false );
//	  grid.setReadonly( true );
//	  grid.setAjax( true );
//	  grid.setAutoDraw( true );
//	  grid.setServiceName( "EDFA00" );
//	  grid.setQueryMethod( "query" );
//	  grid.setCustomColumns( custom_cols );
//	  grid.setData( eiInfo );
//	  
//	  grid.setStyle( style_config );
//	  for(i=grid.dataColumns.length;i>=1;i--){
//	  	column = grid.getColumn( i-1, TYPE_DATA );
//	  	column.set( "width", 390/grid.dataColumns.length);
//	  } 
//	  grid.paint();	
//	  
//	  efwindow.show(document.getElementById("testbutton"),divwindow.id,"fixed");      				;
//                  },
//      onFail    : function(eMsg){
//                     alert("failure");
//                  }
//    }
//
//function show_divwindow(){
//      var info = new EiInfo(); 
//
//      var divWindow = efcascadeselect.createDivWindow("test_divwindow","efwindow");      
//      efwindow.show(ef.get("testbutton"),"test_divwindow_ajax_loading");	
//
//      EiCommunicator.send( "EDFA00", "query", info, test_callback ,false,true );   
//
//}


efgrid_onRowDblClicked = function( gridId, row_index ){
	grid_id = efcascadeselect.getDivWindowSubNodeId("_efselect_divwindow")
	var grid = efgrid.getGridObject( grid_id );
	var type = TYPE_DATA;
	var cellValue = grid.getCellValue(row_index,0, type);	
	efwindow.setValue( cellValue );
	
}
