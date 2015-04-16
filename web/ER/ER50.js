efform_onload = function ()
{
  var spreadSheet = ef.get("mySpreadsheet");
  load_XML();
}

button_open_onclick = function () 
{
   var spreadSheet = ef.get("mySpreadsheet");
   var ssConstants = spreadSheet.Constants;
   spreadSheet.Export();
}

button_reload_onclick = function () 
{
	load_XML();
}

load_XML = function (){
  var spreadSheet = ef.get("mySpreadsheet");
  var reportFileName = ef.get("reportFileName").value;
  var reportPath = ef.get("reportPath").value;
  if (reportFileName != "") {
    var url = baseUrl + "/" + reportPath + "/" + reportFileName;
    spreadSheet.XMLURL = url;
  }	
}

button_load_onclick = function(){
	var callback = {
			onSuccess :	function(eiInfo) {	
			    var spreadSheet = ef.get("mySpreadsheet");
				var ei2excel = new Ei2Excel(spreadSheet);
				ei2excel.parse(eiInfo);
			},
			onFail : function(eMsg) {
				alert(eMsg);
			}   
	}	 
   var info = new EiInfo();
   info.set("project_prefix",ef.get("inqu_status-0-project_prefix").value);
   EiCommunicator.send( "ER50", "analyzeEDFA00" , info, callback );

}




