efform_onload = function ()
{
  button_loadxml_onclick();
}

button_gener_onclick = function () 
{
	var callback = {
			onSuccess :	function(eiInfo) {	
				efform.setStatus(0,eiInfo.getMsg());
			},
			onFail : function(eMsg) {
				alert(eMsg);
			}
	}	 
   var info = new EiInfo();
   info.set("url",ef.get("url").value);
   EiCommunicator.send( "ER40", "generateExcelFile" , info, callback );
}

button_load_onclick = function () {
				downloadExcel();
}

function downloadExcel(){
	ef.get("downloadExcel").src="ER/download.jsp?path=ER/RESOURCE_RESULT.xls";
}



button_loadxml_onclick = function () 
{
  var spreadSheet = ef.get("mySpreadsheet");
  var reportFileName = ef.get("reportFileName").value;
  var reportPath = ef.get("reportPath").value;
  
  if(reportPath != "")
	 reportFileName = reportPath + "/" + reportFileName;
  
  if (reportFileName != "") {
    var url = "ER/download.jsp?path=" + reportFileName;
    try {
      spreadSheet.XMLURL = url;
    } catch (ex) {
    }
  }
  
}