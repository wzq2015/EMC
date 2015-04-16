//日历框选择 
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efform_onload = function ()
{
  efregion.show("ef_region_report");
  efregion.show("ef_region_excel");
  
  erOwc.setCurrentOwc();
  
  var reportFileName = ef.get("reportFileName").value;

  if (reportFileName == "") {
    alert("没有指定预查看的报表文件名，无法载入！");
    this.close();
  }
  
  para_value_load();  
  load_excel_xml();  
}

//加载excel的xml文件
load_excel_xml = function () 
{ 
  var spreadSheet = ef.get("mySpreadsheet");
  var reportId = ef.get("reportId").value;
  var reportFileName = ef.get("reportFileName").value;
  
  var reportFilePath = "";
  if(reportId != "")
	 reportFilePath = "data" + "/" + reportId + "/" + reportFileName +".xml";

  if (reportFilePath != "") {
    var url = "ER/download.jsp?path=" + reportFilePath;
    try {
      spreadSheet.XMLURL = url;
    } catch (ex) {
      alert("报表[" + reportId + "/" + reportFileName + "]加载失败！");
    }    
  }
}

//加载生成参数列表
para_value_load = function () 
{
  //从数据库加载自定义参数
  var inInfo = new EiInfo();
  inInfo.setById("reportFileName");
  
  EiCommunicator.send("ERUtils","getParaValue", inInfo);
  
  if (ajaxEi != null) {
    erTools.autodrawPara(ajaxEi, "para", "ef_para_list");
  }
}


button_prcten_onclick = function(){
	checkedNumber = 0;

	if(ef.get("select_book").checked)	
		checkedNumber = 2;
	else if(ef.get("select_sheet").checked)
		checkedNumber = 3;	

	
	var excelApp;
	var Spreadsheet1 = ef.get("mySpreadsheet");
    var Spreadsheet1 = ef.get("mySpreadsheet");
    var rangeNow = Spreadsheet1.Selection;
    var xlA1 = 1;
    var rangeAddress = "=" + rangeNow.Address(true, true, xlA1, true);	
	
	try{
		var ssConstants = Spreadsheet1.Constants;
	
	    Spreadsheet1.Export("C:/ssheet1.xml", ssConstants.ssExportActionNone, ssConstants.ssExportXMLSpreadsheet);
	    
	    excelApp = new ActiveXObject("Excel.Application"); 
		var xlBook = excelApp.Workbooks.Open("C:/ssheet1.xml");
		var inInfo = new EiInfo();
		inInfo.set("reportId",ef.get("reportId").value);
		inInfo.set("reportBelongTo",ef.get("reportBelongTo").value);
		inInfo.set("reportVersion",ef.get("reportVersion").value);		
		
		
		for(i=1;i<=xlBook.Worksheets.Count;i++){
			var xlsheet = xlBook.Worksheets(i);
		    inInfo.set("activeSheet",xlsheet.Name);		
		    if(Spreadsheet1.ActiveSheet.Name == xlsheet.Name)
		    	activeSheet = xlBook.Worksheets(i);
			EiCommunicator.send("ER20","getPrintConfigInfo", inInfo, null, false);
			
			if (ajaxEi != null) {
					paraMap = ajaxEi.extAttr;
				for(var v in paraMap){
					if(undefined != xlsheet.PageSetup[v]){
						if(v.indexOf("Margin")!=-1)
							xlsheet.PageSetup[v] = parseInt(parseFloat(paraMap[v])*1000/35);
						else{	
							if(isNaN(parseInt(paraMap[v])))
								xlsheet.PageSetup[v] = paraMap[v];
							else
								xlsheet.PageSetup[v] = parseInt(paraMap[v]);
						}
					}
				}
			}			
			
		}
		
		excelApp.Application.visible = true;
		
		if(2 == checkedNumber)
			xlBook.PrintOut(); // 直接整个工作薄打印
		else if(3 == checkedNumber)
			xlBook.ActiveSheet.PrintOut();	//打印当前工作薄

		//xlsheet.Quit();
	}catch(e){
		alert('文件打印出错！' + e.description);
	}finally{
		if(excelApp != null){
			excelApp.Quit();
		}
	}
}

button_print_onclick = function(){
	efwindow.show(null,"printContent","center");
}

button_printview_onclick = function(){

	var excelApp;
	var Spreadsheet1 = ef.get("mySpreadsheet");
	try{
		var ssConstants = Spreadsheet1.Constants;
	
	    Spreadsheet1.Export("C:/ssheet1.xml", ssConstants.ssExportActionNone, ssConstants.ssExportXMLSpreadsheet);
	    
	    excelApp = new ActiveXObject("Excel.Application"); 
		xlBook = excelApp.Workbooks.Open("C:/ssheet1.xml");
		var inInfo = new EiInfo();
		inInfo.set("reportId",ef.get("reportId").value);
		inInfo.set("reportBelongTo",ef.get("reportBelongTo").value);
		inInfo.set("reportVersion",ef.get("reportVersion").value);		
		
		for(i=1;i<=xlBook.Worksheets.Count;i++){
			var xlsheet = xlBook.Worksheets(i);
		    inInfo.set("activeSheet",xlsheet.Name);		
			EiCommunicator.send("ER20","getPrintConfigInfo", inInfo, null, false);
			
			if (ajaxEi != null) {
					paraMap = ajaxEi.extAttr;
				/*	
				for(var v in paraMap){
					if(undefined != xlsheet.PageSetup[v]){
						if(v.indexOf("Margin")!=-1)
							xlsheet.PageSetup[v] = parseInt(parseFloat(paraMap[v])*1000/35);
						else	
							xlsheet.PageSetup[v] = parseInt(paraMap[v]);
					}
				}	*/
				
				for(var v in paraMap){
					if(undefined != xlsheet.PageSetup[v]){
						if(v.indexOf("Margin")!=-1)
							xlsheet.PageSetup[v] = parseInt(parseFloat(paraMap[v])*1000/35);
						else{	
							if(isNaN(parseInt(paraMap[v])))
								xlsheet.PageSetup[v] = paraMap[v];
							else
								xlsheet.PageSetup[v] = parseInt(paraMap[v]);
						}
					}
				}				
				
				/*	
				if(isAvailable(paraMap["Orientation"]))
					xlsheet.PageSetup.Orientation = parseInt(paraMap["Orientation"]); 		 //打印方向设置(1-纵向，2-横向);
				if(isAvailable(paraMap["Zoom"]))
					xlsheet.PageSetup.Zoom = parseInt(paraMap["Zoom"]);
				if(isAvailable(paraMap["PaperSize"]))
					xlsheet.PageSetup.PaperSize = parseInt(paraMap["PaperSize"]);
				*/	
			}			
			
		}
		//xlsheet.PageSetup.PrintTitleRows="$1:$2";
		excelApp.Application.visible = true;	
	
		xlBook.PrintPreview();
		//xlsheet.Quit();
	}catch(e){
		alert('文件打印出错！' + e.description);
	}finally{
		if(excelApp != null){
			excelApp.Quit();
		}
	}

}
