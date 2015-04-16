efform_onload = function (){
   setDefaultValue();
}

function setDefaultValue()
{
	$("#inqu_status-0-selectdate").val($("#currentdate").val());
}

button_query_onclick = function () 
{
	 if (efvalidateDiv("ef_region_inqu")) 
 	{
      	efgrid.submitInqu("ef_grid_result","el","EL0008","query");		
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
	