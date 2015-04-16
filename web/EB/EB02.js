button_query_onclick = function () 
{  
   if(document.getElementById("inqu_status-0-start_time").value!="" && document.getElementById("inqu_status-0-end_time").value!="")
   {
   		if(document.getElementById("inqu_status-0-start_time").value>document.getElementById("inqu_status-0-end_time").value)	
    	{
       		alert("结束时间一定要大于开始时间！");
       		return;
        }
      
    }
     
	efgrid.submitInqu( "ef_grid_result", "eb","EB02","query");
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyy-mm-dd', true);
}
