
button_f2_onclick = function () 
{

    if (efvalidateForm(ef.get("EDFA02"))) {
    
		efgrid.submitInqu( "ef_grid_fresult", "ed", "EDFA02","query");
        //debugger;
		var ef_grid = efform.getGrid( "ef_grid_bresult" );	 
		ef_grid.refresh( ajaxEi );
		//设置button_inqu_status-0-form_ename的默认值
		var buttonValue ;
		try{
		buttonValue = ajaxEi.getBlock("fresult").getCell(0,"form_ename");
		}catch(ex) {
		buttonValue = "";
		}
		ef.get("button_inqu_status-0-form_ename").value = buttonValue;
      
    }
}

button_fupdate_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_fresult", "ed", "EDFA02", "updateForm", true );
}

button_finsert_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_fresult", "ed", "EDFA02", "insertForm", true );
}

button_fdelete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_fresult", "ed", "EDFA02", "deleteForm", true );
}

button_bupdate_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_bresult", "ed", "EDFA02", "updateButton", true );
}

button_binsert_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_bresult", "ed", "EDFA02", "insertButton", true );
}

button_bdelete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_bresult", "ed","EDFA02", "deleteButton", true );
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	//debugger;
	if( grid_id == "ef_grid_fresult" )
	{
      ef.get("button_inqu_status-0-form_ename").value = value;
      efgrid.submitInqu( "ef_grid_bresult", "ed", "EDFA02","queryButton");
	}
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
