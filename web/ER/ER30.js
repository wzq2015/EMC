efform_onload = function ()
{
  var spreadSheet = ef.get("mySpreadsheet");
  button_load_onclick();
}

button_save_onclick = function () 
{
 //   var spreadSheet = ef.get("mySpreadsheet");
 //   var ssConstants = spreadSheet.Constants;
 //   spreadSheet.Export("c:\\aa.xml", ssConstants.ssExportActionNone, ssConstants.ssExportXMLSpreadsheet);
	  sendXmlStr();
}

button_open_onclick = function () {
	var callback = {
			onSuccess :	function(eiInfo) {	
				downloadExcel();
			},
			onFail : function(eMsg) {
				alert(eMsg);
			}
	}	 
   var info = new EiInfo();
   info.set("project_prefix",ef.get("inqu_status-0-project_prefix").value);
   info.set("url",ef.get("url").value);
   EiCommunicator.send( "ER30", "generateExcelFile" , info, callback );

}

function sendXmlStr(){
	var spreadSheet = ef.get("mySpreadsheet");
	var xmlStr = spreadSheet.XMLData+'';
	ef.get("xmlStr").value=xmlStr;
	ef.get("methodName").value="sendXML";
	ef.get("serviceName").value="ER20";
	document.forms[0].submit();
}

button_load_onclick = function () 
{
  var spreadSheet = ef.get("mySpreadsheet");
  var reportFileName = ef.get("reportFileName").value;
  var reportPath = ef.get("reportPath").value;
  if (reportFileName != "") {
    var url = baseUrl + "/" + reportPath + "/" + reportFileName;
    spreadSheet.XMLURL = url;
  }
}

function downloadExcel(){
	ef.get("downloadExcel").src="./ER/downloadExcel.jsp";
}
