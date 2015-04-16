efform_onload = function ()
{
	efregion.show("ef_region_app");
//	getInfo();
}	

function getInfo () 
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{	
				node = ef.get("masterAddress");
				value = eiInfo.get("masterAddress");
				node.innerText = value;
    		},
  		onFail: 
    		function(eMsg) 
			{
     			alert(eMsg);
    			
			}
	}; 	
	var eiInfo = new EiInfo();	
	EiCommunicator.send("EEDM91", "getInfo", eiInfo, ajax_callback, false);	
}

button_insert_onclick = function() {
	var inInfo = new EiInfo();

	inInfo.setByNode("ef_region_imap");
	var serviceName = "EEDM91";
	var queryMethod = "insert";


	EiCommunicator.send(serviceName, queryMethod, inInfo);
	
}

button_show_onclick = function() {
	efregion.show("ef_region_app");
	var inInfo = new EiInfo();

	var serviceName = "EEDM91";
	var queryMethod = "show";

	EiCommunicator.send(serviceName, queryMethod, inInfo);
	if (ajaxEi == null)
		return;

	document.getElementById("show").value = ajaxEi.get("show");
}

