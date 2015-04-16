
var callbackFunc = "efform_onPopupReturn";

efform_onload = function () {

	efbutton.setButtonStatus("rnbtn", true);
}

button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDMD54","delete", true );
} 

button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDMD54","insert",true );
}

button_rnbtn_onclick = function()
{
  if (!window.opener.closed) {
    var cb = window.opener[callbackFunc];    
    cb.call(this, "EDMD54", "");	
  }
  window.close();
}

