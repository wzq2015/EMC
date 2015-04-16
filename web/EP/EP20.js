function efgrid_onRowClicked(grid_id, row_index )
{
	var ajax_callback=
	{
		onSuccess:
			function(eiInfo){
				ef.get("detail-0-histo").value=eiInfo.get("detail-0-histo");
		},
  		onFail: 
    		function(eMsg) {
      			alert("failure："+eMsg);
   	 		}	
	}
	
	if("ef_grid_result" == grid_id)
	{
		   grid = efgrid.getGridObject("ef_grid_result");
		   var id = grid.getCellValue(row_index,1,TYPE_FIX);
	       var eiinfo = new EiInfo();	
	       eiinfo.setByNameValue("id", id);
	       EiCommunicator.send( "EP20", "queryHisto" , eiinfo, ajax_callback );
	}
	

}
