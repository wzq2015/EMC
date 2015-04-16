efform_onload = function ()
{
	efregion.show("ef_region_audit");
	efregion.show("ef_region_operate");
} 



function submit_onclick(processName,taskId ){

		 // window.alert(window.location.href);
		      var inInfo = new EiInfo();
			  inInfo.setByNode("ewdf00_body");
			  inInfo.set("ProcessDef",processName);
			  inInfo.set("workItemId",taskId);
			  
			  alert("aaa");
			 debugger;
				
				EiCommunicator.send("EWDF00","submit",inInfo,null );	
			   var end= window.location.href.lastIndexOf("efFormEname");
			   //window.alert(window.location.href);
			   //window.alert("want"+window.location.href.substring(0,end)+"efFormEname=EWWI00");
	           window.location.href=  window.location.href.substring(0,end)+"efFormEname=EWWI00";
               //window.alert(window.location.href);
}

 function returns_onclick(processName,taskId ){

		 // window.alert(window.location.href);
		      var inInfo = new EiInfo();
			  inInfo.setByNode("ewdf00_body");
			  inInfo.set("ProcessDef",processName)
			  inInfo.set("workItemId",taskId);
			  
				
				EiCommunicator.send("EWDF00","returns",inInfo,null );	
			   var end= window.location.href.lastIndexOf("efFormEname");
			   //window.alert(window.location.href);
			   //window.alert("want"+window.location.href.substring(0,end)+"efFormEname=EWWI00");
	           window.location.href=  window.location.href.substring(0,end)+"efFormEname=EWWI00";
               //window.alert(window.location.href);
}