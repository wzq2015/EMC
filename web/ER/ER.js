var inInfo = new EiInfo();
efform_onload_er = function ()
{
	//初始化控件对象
	erOwc.setCurrentOwc();
	
	var reportFilePath = "model" + "/" + reportId + "/" + reportId + "_" + reportBelongTo + "_" + reportVersion +".xml";
	var url = "ER/download.jsp?path=" + reportFilePath;
	var spreadSheet = ef.get("mySpreadsheet");
	spreadSheet.XMLURL = url;
	erTools.setFixParam();
}

gen_report = function (paraString) {
	efform_onload_er();
	
	single_submit_calculate(paraString);
  
	EiCommunicator.send("ER20","loadUdf", inInfo);
	if (ajaxEi == null) return;
	udfInfo = ajaxEi;
  
    var spreadSheet = ef.get("mySpreadsheet");
    spreadSheet.AddIn(erOwc);
  
	button_calculate_onclick();
	 
	clear_funcs();
}


// 一次性提交所有公式   遍历excel文件，找到所有存在的udf公式，并计算公式对应的数值
single_submit_calculate = function(commParaStr){
	//报表生成参数
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
	meta = new EiColumn("cellValue");
	meta.pos =3;
	blockMeta.addMeta(meta);
	block.setBlockMeta(blockMeta);
	
	var spreadSheet = ef.get("mySpreadsheet");
    for(var i=1;i<= spreadSheet.Worksheets.Count;i++){
    	 var rowNo = 0;
   		 var workSheet = spreadSheet.Worksheets.Item(i);
   		 var range = workSheet.UsedRange;
   		 for(var r=1;r<=range.Rows.Count;r++){
	  		 for(var c=1;c<=range.Columns.Count;c++){
	  		 	cell = range.Cells(r,c);
	  		 	formula = cell.Formula;
	  		 	if(formula.indexOf('udf') != -1 ){  //为自定义函数 重新计算
						block.setCell(rowNo,"cellRow",r);
	  		 			block.setCell(rowNo,"cellCol",c);
	  		 			block.setCell(rowNo++,"cellValue",formula);
	  		 	}	
	  		 }
  		 }
	   inInfo.addBlock(block);  
	   EiCommunicator.send("ERUtils","singleCalculate2", inInfo);
	   
	   if (ajaxEi == null) return;
	   block = ajaxEi.getBlock("result");  
	   for(j = 0;j<block.rows.length;j++){
	   		value = block.getCell(j,"cellValue");
	   		r = block.getCell(j,"cellRow");
	   		c = block.getCell(j,"cellCol");
	   		cell = range.Cells(parseInt(r),parseInt(c));
	   		try{
	   			cell.Formula = value; 
	   		} catch(e){
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
	   block = new EiBlock("result");
	   block.setBlockMeta(blockMeta);	   	 
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

//计算单个公式
evaluateUdf = function (nameValue, udf)
{
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
}

erOwc.udf = function() {
  var paraLen = arguments.length;
  
  var p0 = arguments[0];
  var p1 = arguments[1];
  
  var spreadSheet = ef.get("mySpreadsheet");

  var ddd = spreadSheet.ActiveSheet;
  var rangeNow = spreadSheet.Selection;
    
  ef.debug( "udf [" + p0 + "] start call!");

  inInfo.setByNameValue("funcId", p0);
  inInfo.setByNameValue("funcPara", p1);
  
  EiCommunicator.send("EPFunc","call", inInfo);
  if (ajaxEi == null) return;

  var funcReturnValue = ajaxEi.get("funcReturnValue");
  var funcReturnBlock = ajaxEi.get("funcReturnBlock");
  ef.debug( "udf [" + p0 + "] return value [" + funcReturnValue + "]");
  if (efutils.trimString(funcReturnBlock) == "") {
    return funcReturnValue;
  } else {
    return "___" + funcReturnBlock;
  }
}

erTools.setFixParam = function (){
	inInfo.set("reportId",reportId);
	inInfo.set("reportBelongTo",reportBelongTo);
	inInfo.set("reportVersion",reportVersion);
	return inInfo;
}


/*打印预览*/
button_printview_onclick = function(){

	var excelApp;
	var Spreadsheet1 = ef.get("mySpreadsheet");
	try{
		var ssConstants = Spreadsheet1.Constants;
	    
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
			}			
			
		}
		
		excelApp.Application.visible = true;	
		for(var i=1;i<= spreadSheet.Worksheets.Count;i++){
			xlBook.Worksheets(i).PrintPreview(); 
		}
	}catch(e){
		alert('文件打印出错！' + e.description);
	}finally{
		if(excelApp != null){
		}
	}

}

prcten = function(){
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
	}catch(e){
		alert('文件打印出错！' + e.description);
	}finally{
		if(excelApp != null){
			excelApp.Quit();
		}
	}
}  

