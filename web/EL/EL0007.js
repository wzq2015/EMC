efform_onload = function ()
{
  $("#inqu_status-0-startdate").val($("#currentdate").val());
  $("#inqu_status-0-enddate").val($("#currentdate").val());
}


button_query_onclick = function () 
{
	 if (efvalidateDiv("ef_region_inqu")) 
 	{
      	efgrid.submitInqu("ef_grid_result","el","EL0007","query");		
 	}     
}

ajax_callback = {
		onSuccess : function(eiInfo) {			
			alert(efform.getMsg());
		},
		onFail : function(eMsg) {
			alert(efform.getMsg());
		}
	}
	