/**
 * @author zhou huaqi
 * @since 2010-06-01
 */


button_query_onclick = function() 
{
    efgrid.submitInqu( "ef_grid_result", "","EQRB02","query");	
}

button_export_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ir","EQRB02","export");
	efbutton.setButtonStatus("export", true);
}



efgrid_onAjaxSubmitSuccess = function(gridId, service_name, method_name, eiInfo)
{
	if(method_name=="query"){
		var ef_grid = efform.getGrid( gridId );	
  		ef_grid.refresh( eiInfo );
	}else{
	   	if ( eiInfo.getMsg() != null ){
		  	alert(eiInfo.getMsg());		  	
		  	}
		  if(eiInfo.getStatus()!=-1){
			button_query_onclick();
			}
		 
		}
		
}