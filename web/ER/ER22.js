//存放自定义公式信息
var udfInfo = null;

//日历框选择 
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efform_onload = function ()
{
  efregion.show("ef_region_report");
  
  erOwc.setCurrentOwc();
  
  user_define_para_load();
  
 // load_model();
  
  checkGenNow();
  
  var reportFileName = ef.get("reportFileName").value;
  if(efutils.trimString(reportFileName) != ""){
  		fill_param();
  		load_file(reportFileName);
  	}
}

checkGenNow = function () 
{
  var genNow = ef.get("reportGenNow").value;
  if (genNow == "1")
  {//是否立即生成报表，1表示是
    ef.get("reportGenNow").value = "0";

    //根据传入的参数值自动填充生成参数
	fill_param();
	if(!button_getfile_onclick())
		button_gen_onclick();
  }
}

fill_param = function(){
	  var paras = ef.get("ef_para_list").getElementsByTagName("input");
	  var name;
	  var value = "";
	  
	  for ( var i = 0; i < paras.length; i++ )   
	  {
	    name = paras[i].name;
	    value = _getEi().get(name);
	    if(value == undefined) value = "";
	    ef.get(name).value = value;
	  }	
}

//加载参数列表
user_define_para_load = function () 
{
  //从数据库加载自定义参数
  var inInfo = new EiInfo();
  //报表模板参数
  erTools.setFixParam(inInfo);
  
  EiCommunicator.send("ERUtils","getPara", inInfo);
  
  if (ajaxEi != null) {
    erTools.autodrawPara(ajaxEi, "para", "ef_para_list");
  }
}

//保存XML文件
button_save_onclick = function () 
{

  if (!efvalidateForm(ef.get("ER22"))) return;

  var spreadSheet = ef.get("mySpreadsheet");
  
  //组织计算结果值
  var inInfo = new EiInfo();

  //报表模板参数
  erTools.setFixParam(inInfo);

  //报表生成参数
  var commParaStr = getParaDescStr("ef_para_list");
  inInfo.setByNameValue("funcCommonPara", commParaStr);

  //组织EiInfo结构
  var block = new EiBlock("result");
  var blockMeta = new EiBlockMeta("result");
  var meta = new EiColumn("reportUdn");
  meta.pos =1;
  blockMeta.addMeta(meta);
  meta = new EiColumn("reportUdnRow");
  meta.pos =2;
  blockMeta.addMeta(meta);
  meta = new EiColumn("reportUdnCol");
  meta.pos =3;
  blockMeta.addMeta(meta);
  meta = new EiColumn("reportUdnValue");
  meta.pos =4;
  blockMeta.addMeta(meta);
  block.setBlockMeta(blockMeta);
  
  //填充计算结果值
  var names = spreadSheet.Names;
  var nameCount = names.Count;
  var rowNo = 0;
  var cellValue;

  for (var i = 0; i < nameCount; i ++) {
    var name = names(i + 1);
    //alert(name.Name);
    nameRange= name.RefersToRange;
    for(var j = 0; j<nameRange.Rows.Count; j++) {
      for(var k =0; k<nameRange.Columns.Count; k++ ) {
        //alert(nameRange.Cells(j+1,k+1).Value);
        cellValue = nameRange.Cells(j+1,k+1).Value;
        
        if(typeof cellValue == "number")
        	cellValue += "";    
        else if(typeof cellValue == "date")
        	cellValue = nameRange.Cells(j+1,k+1).Text;
        	
        if(cellValue == undefined)
          cellValue = " ";
        block.setCell(rowNo,"reportUdn",name.Name);
        block.setCell(rowNo,"reportUdnRow",j+1);
        block.setCell(rowNo,"reportUdnCol",k+1);
        block.setCell(rowNo++,"reportUdnValue",cellValue);
      }
    }
  }
  
  inInfo.addBlock(block);
  EiCommunicator.send("ERUtils","saveUdnValue", inInfo);
  if(ajaxEi == null) return ;
  
  //保存文件
  var xmlStr = spreadSheet.XMLData + '';
  ef.get("xmlStr").value = xmlStr;
  ef.get("methodName").value = "saveReportFile";
  ef.get("serviceName").value = "ERUtils";
  
  //保存计算结果时，返回的文件名
  ef.get("reportFileName").value = ajaxEi.get("reportFileName");
  
  //设置保存后加载开关
  //ef.get("loadAfterSave").value = "1";
  
  document.forms[0].submit();
}

//根据模板参数，载入模板
load_model = function () 
{
  var spreadSheet = ef.get("mySpreadsheet");
  
  var reportId = ef.get("reportId").value;
  var reportBelongTo = ef.get("reportBelongTo").value;
  var reportVersion = ef.get("reportVersion").value;

  if (reportId == "") {
    alert("没有指定预生成的报表ID，无法载入！");
    this.close();
  }
  
    var reportFilePath;
  if(reportId != "")
	 reportFilePath = "model" + "/" + reportId + "/" 
	   + reportId + "_" + reportBelongTo + "_" + reportVersion +".xml";

  if (reportFilePath != "") {
    var url = "ER/download.jsp?path=" + reportFilePath;
    try {
      spreadSheet.XMLURL = url;

      efform.setStatus(0, "报表[" + reportId + "]载入成功！");   
    } catch (ex) {
      efform.setStatus(-1, "报表[" + reportId + "]载入失败！");   
    }    
  }
  //提高报表生成速度　注释掉
  //spreadSheet.AddIn(erOwc);

}

//加载excel的xml文件
load_file = function (reportFileName) 
{
  var spreadSheet = ef.get("mySpreadsheet");
  var reportId = ef.get("reportId").value;
  
  var reportFilePath = "";
  if(reportId != "")
	 reportFilePath = "data" + "/" + reportId + "/" + reportFileName +".xml";

  if (reportFilePath != "") {
    var url = "ER/download.jsp?path=" + reportFilePath;
    try {
      spreadSheet.XMLURL = url;
	  efform.setStatus(0,"载入文件" + reportFileName + "成功！");
	  return true;
    } catch (ex) {
      efform.setStatus(-1, "报表[" + reportId + "/" + reportFileName + "]加载失败！");
      return false;
    }    
  }
}


//根据生成参数，获取已有的文件
button_getfile_onclick = function ()
{
  if (efvalidateDiv("ef_para_list")) {

  	var inInfo = new EiInfo();

	//报表模板参数
	erTools.setFixParam(inInfo);
    var commParaStr = erTools.getParaStr("ef_para_list", true);
    inInfo.setByNameValue("funcCommonPara", commParaStr);
    
	EiCommunicator.send("ERUtils","getReportFileName", inInfo);
	if (ajaxEi == null) {
	  efform.setStatus(-1, "获取文件名出错");
	  return false;
	}
	
	var reportFileName = ajaxEi.get("reportFileName");
	if(reportFileName == "") {
	  efform.setStatus(1,"未生成文件！");
	  return false;
	}
	
	return load_file(reportFileName);
  
  }

}

// 一次性提交所有公式
single_submit_calculate = function(){
	//组织计算结果值
	var inInfo = new EiInfo();
		
				
	//报表模板参数
	erTools.setFixParam(inInfo);
	//报表生成参数
	var commParaStr = erTools.getParaStr("ef_para_list", true);
	inInfo.setByNameValue("funcCommonPara", commParaStr);

	//组织EiInfo结构
	var block = new EiBlock("result");
	var blockMeta = new EiBlockMeta("result");
	meta = new EiColumn("cellRow");
	meta.pos =1;
	blockMeta.addMeta(meta);
	meta = new EiColumn("cellCol");
	meta.pos =2;
	blockMeta.addMeta(meta);
	/*	
	meta = new EiColumn("funcId");
	meta.pos =3;
	blockMeta.addMeta(meta);
	meta = new EiColumn("funcPara");
	meta.pos =4;
	blockMeta.addMeta(meta);
	*/	
	meta = new EiColumn("cellValue");
	meta.pos =3;
	blockMeta.addMeta(meta);
		
	block.setBlockMeta(blockMeta);
	
	
	var spreadSheet = ef.get("mySpreadsheet");
	//debugger;
    for(var i=1;i<= spreadSheet.Worksheets.Count;i++){
    	 var rowNo = 0;
   		 var workSheet = spreadSheet.Worksheets.Item(i);
   		 var range = workSheet.UsedRange;
   		 for(var r=1;r<=range.Rows.Count;r++){
	  		 for(var c=1;c<=range.Columns.Count;c++){
	  		 	cell = range.Cells(r,c);
	  		 	//cell.Calculate();
	  		 	formula = cell.Formula;
	  		 	if(formula.indexOf('udf') != -1 ){  //为自定义函数 重新计算
	  		 	    /*
	  		 		arr = formula.split(')');
	  		 		if(arr.length == 2 && arr[1] == "")	{		//单个udf 自定义公式
	  		 			//组数据一次性提交
	  		 			formula = formula.replace("=udf(","");
	  		 			formula = formula.replace(")","");
	  		 			formulaArr = formula.split('","');
						block.setCell(rowNo,"cellRow",r);
	  		 			block.setCell(rowNo,"cellCol",c);
	  		 			block.setCell(rowNo,"funcId",formulaArr[0].substring(1));
	  		 			block.setCell(rowNo,"funcPara",formulaArr[1].substring(0,formulaArr[1].length-1));
	  		 			block.setCell(rowNo++,"cellValue","");
	  		 		*/	

						block.setCell(rowNo,"cellRow",r);
	  		 			block.setCell(rowNo,"cellCol",c);
	  		 			block.setCell(rowNo++,"cellValue",formula);
	  		 			
	  		 	}	
	  		 	//formulaStr.push(cell.Formula);
	  		 }
  		 }
	   inInfo.addBlock(block);  
	   EiCommunicator.send("ERUtils","singleCalculate2", inInfo);
	   
	   if (ajaxEi == null) return;
	   //debugger;
	   block = ajaxEi.getBlock("result");  
	   for(j = 0;j<block.rows.length;j++){
	   		value = block.getCell(j,"cellValue");
	   		r = block.getCell(j,"cellRow");
	   		c = block.getCell(j,"cellCol");
	   		cell = range.Cells(parseInt(r),parseInt(c));
	   		try{
	   			cell.Formula = value; 
	   			//if(cell.Text == "#NAME?" || cell.Text == "#VALUE!") 	 
	   			//	cell.Value = value.substring(1);	
	   		} catch(e){
	   			//cell.Value = value.substring(1); 
	   		}
	   		 	   
	   }
	   
	   //防止合法公式里引用当前还未计算出来单元格值 而导致和字符串类型冲突
	   for(j = 0;j<block.rows.length;j++){
	   		r = block.getCell(j,"cellRow");
	   		c = block.getCell(j,"cellCol");
	   		cell = range.Cells(parseInt(r),parseInt(c));	
	   		try{
	   			if(cell.Text == "#NAME?" || cell.Text == "#VALUE!") 	 
	   			//截取掉字符串的最前面的'='字符，以便准确赋值
	   				cell.Value = value.substring(1);	
	   		} catch(e){
	   			cell.Value = value.substring(1); 
	   		}	   		   
	   }
	   
	   	
	   /*
	   for(j = 0;j<block.rows.length;j++){
	   		value = block.getCell(j,"cellValue");
	   		r = block.getCell(j,"cellRow");
	   		c = block.getCell(j,"cellCol");
	   		cell = range.Cells(parseInt(r),parseInt(c));
	   		cell.Value = value;
	   }
	   */
	   block = new EiBlock("result");
	   block.setBlockMeta(blockMeta);	   	 
  		 
    }
}

//生成EXCEL文件，根据参数生成文件
button_gen_onclick = function () 
{
  if (efvalidateDiv("ef_para_list")) {
    //载入模板
  	//加载模板文件
    load_model();
    //var spreadSheet = ef.get("mySpreadsheet");
    
 
   //遍历所有公式，一次性提交到后台计算
   // var start =  new Date();
    single_submit_calculate();
   // var end =  new Date();
   // alert(end.getTime()-start.getTime()); 
    

	//从数据库加载自定义公式
	var inInfo = new EiInfo();

	//报表模板参数
	erTools.setFixParam(inInfo);
  
	EiCommunicator.send("ER20","loadUdf", inInfo);
	if (ajaxEi == null) return;
	udfInfo = ajaxEi;
  
    var spreadSheet = ef.get("mySpreadsheet");
    spreadSheet.AddIn(erOwc);
	button_calculate_onclick();
	
	clear_funcs();
  }
}

//清空模板文件里的udf函数定义，以value值替代
clear_funcs = function () 
{
  var spreadSheet = ef.get("mySpreadsheet");
  var range;
  var cell;
  var formula;
  
  for(var k = 1; k <= spreadSheet.sheets.Count; k++) {
    range = spreadSheet.sheets(k).UsedRange;
    
    for(var i = 1; i <= range.Rows.Count; i ++) {
      for(var j =1; j <= range.Columns.Count; j++) {
  	    cell = range.cells(i,j);
  	    formula = cell.formula;
  	    if(formula != undefined && formula != "" && formula.indexOf("=")==0 && formula.indexOf("udf(")!=-1) {
  	  	  cell.formula = cell.Value; 
  	    }
  	  }
    }
  }

}

//计算单个公式
evaluateUdf = function (nameValue, udf)
{
  //var start =  new Date();
  


  //debugger;
  udf = efutils.trimString(udf);
  if (udf == "") {
    efform.setStatus(1, "没有定义自定义公式！");
    return;
  } 
  
  var spreadSheet = ef.get("mySpreadsheet");
  var udfValue = spreadSheet.Evaluate(udf);
  var nameRef = spreadSheet.Names(nameValue);
    
  //判断对象是否引用区域
  var nameRange;
  try {
    nameRange= nameRef.RefersToRange;
  } catch (ex) {
    efform.setStatus(1, "该名称[" + nameValue + "]没有引用区域！");
  }	

  erTools.dumpInfo(spreadSheet, nameRange, udfValue, ajaxEi);
  efform.setStatus(1, "公式计算完成!");  
  
  //var end =  new Date();
  //alert(end.getTime()-start.getTime());  
}

//计算所有公式
button_calculate_onclick= function(){

  var spreadSheet = ef.get("mySpreadsheet");
  var names = spreadSheet.Names;
  var nameCount = names.Count;
  var udf;

  for (var i = 0; i < nameCount; i ++) {
    var name = names(i + 1);
    
	udf = udfInfo.get(name.Name);
	udf = efutils.trimString(udf);
    evaluateUdf(name.Name, udf);
    
  }
}

//根据参数区域的内容返回参数串,并带上参数的中文描述
getParaDescStr = function (divId, splitStr) { 

  var paras = ef.get(divId).getElementsByTagName("input");
  var paraStr = "";
  
  if (splitStr == null) splitStr = ",";
  	
  for ( var i = 0; i < paras.length; i++ )   
  {
    var paraValue = efutils.trimString(paras[i].value);
    
    if (paraValue == "") continue;
    
    var paraDesc = ef.get("_" + paras[i].name).innerText;

    if (i > 0) paraStr += splitStr;
      paraStr += paras[i].name + "=" + paraDesc + "=" + paraValue;
  }
    
  return paraStr;
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
	
	    //Spreadsheet1.Export("C:/ssheet1.xml", ssConstants.ssExportActionNone, ssConstants.ssExportXMLSpreadsheet);
	    
	    //excelApp = new ActiveXObject("Excel.Application"); 
		
		var xmlStr = Spreadsheet1.XMLData + '';
		
		date = new Date();

		fileName = "ssheet1"+date.getTime()+".xml";
			
		
		//解决ie7的问题
		try{  
			erOwc.createFileDir("c:\\TEMP");
			erOwc.generateFile(xmlStr,"c:/TEMP/"+fileName);
		}catch(e){
			
		}
		
	    excelApp = erOwc.getType();
		
		var xlBook = excelApp.Workbooks.Open("c:/TEMP/"+fileName);
		
		
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
	
	    //Spreadsheet1.Export("C:/ssheet1.xml", ssConstants.ssExportActionNone, ssConstants.ssExportXMLSpreadsheet);
	    
		var xmlStr = Spreadsheet1.XMLData + '';
		
		date = new Date();

		fileName = "ssheet1"+date.getTime()+".xml";
			
		
		//解决ie7的问题
		try{  
			erOwc.createFileDir("c:\\TEMP");
			erOwc.generateFile(xmlStr,"c:/TEMP/"+fileName);
		}catch(e){
			
		}
		
	    excelApp = erOwc.getType();
		
		var xlBook = excelApp.Workbooks.Open("c:/TEMP/"+fileName);
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
		
		excelApp.Application.visible = true;	
		//xlBook.Worksheets(1).PrintPreview();
		

		  
		for(var i=1;i<= spreadSheet.Worksheets.Count;i++){
			xlBook.Worksheets(i).PrintPreview(); 
		}
		//xlBook.Worksheets(1).PrintPreview();  
		//xlBook.Worksheets(2).PrintPreview();
		//xlsheet.Quit();

	}catch(e){
		alert('文件打印出错！' + e.description);
	}finally{
		if(excelApp != null){
			//excelApp.Quit();
		}
	}

}

