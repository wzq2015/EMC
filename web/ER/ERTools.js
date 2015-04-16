erOwc = function() {
}

erOwc.setCurrentOwc = function(){
  ef.get("spreadSheetDiv").innerHTML = ' <object id="mySpreadsheet" classid="CLSID:0002E559-0000-0000-C000-000000000046" style="width:100%;height:400px"> </object>';
  spreadSheet = ef.get("mySpreadsheet");
  if(undefined == spreadSheet.version){
  	ef.get("spreadSheetDiv").innerHTML = ' <object id="mySpreadsheet" classid="CLSID:0002E551-0000-0000-C000-000000000046" style="width:100%;height:400px"> </object>';
  	spreadSheet = ef.get("mySpreadsheet");
  }
  if(undefined == spreadSheet.version)
  	alert("目前只支持office2003 和officeXP版本，请安装office2003或者officeXP");
}

/**
 * 得到版本的类型 得到客户端安装的办公软件类型，默认选择wps
 */
erOwc.getType = function(){
	try{
	    excelApp = new ActiveXObject("et.Application"); 
	    return excelApp;
	}catch(e){
		try{
			excelApp = new ActiveXObject("excel.Application");
			return excelApp;
		}catch(e){
			return null;
		}
		
	}
	    
}

/**
 * 产生打印预览和打印的xml临时文件
 * @param {} xmlStr
 * @param {} fileName
 */

erOwc.generateFile = function(xmlStr,fileName){
  		xmlStr = erTools.office2wps(xmlStr);
  		try{
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var a = fso.CreateTextFile(fileName, true,true);
			a.WriteLine(xmlStr);
			a.Close();	
  		}catch(e){
  			alert("临时文件生成报告错误！");
  		}finally{
  			a.Close();
  		}
}


/**
 * 
 * @param {} fileDir
 */
erOwc.createFileDir = function(fileDir){
	try{
		
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			//var a = fso.CreateTextFile(fileName, true,true);
			if(!fso.folderExists(fileDir))
				fso.CreateFolder (fileDir);
				
	}catch(e){
  			alert("生成文件目录"+fileDir+"错误！");
  	}finally{
  	
  	}
	
}



//自定义托管函数udf
erOwc.udf = function() {
  //debugger;
  
  if (!efvalidateDiv("ef_para_list", false,true))
    return;//没有必要的生成参数，不计算
  
  var paraLen = arguments.length;
  
  var p0 = arguments[0];
  var p1 = arguments[1];
  
  var spreadSheet = ef.get("mySpreadsheet");

  var ddd = spreadSheet.ActiveSheet;
  var rangeNow = spreadSheet.Selection;
    
  ef.debug( "udf [" + p0 + "] start call!");

  var inInfo = new EiInfo();
  inInfo.setByNameValue("funcId", p0);
  inInfo.setByNameValue("funcPara", p1);
  
  var commParaStr = erTools.getParaStr("ef_para_list", true);
  inInfo.setByNameValue("funcCommonPara", commParaStr);
  
  //设置报表固定参数
  erTools.setFixParam(inInfo);
  
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

erTools = function() {
}

//导出指定行rowPos数据
erTools.dumpRow = function(nameRange, blockValue, rowPos) {

  
  var cellNow = nameRange.Rows(rowPos+1);
  var colCount = cellNow.Cells.Count;
  for (var j = 0; j < colCount; j ++) {
    var colValue = ""; 
    if ((rowPos < blockValue.getRows().length) && (j < blockValue.getBlockMeta().colCount)) {
      var colValue = blockValue.getCellByPos(rowPos, j);
    }         
    cellNow.Cells(j+1) = colValue;  
  }  
  
  /*
  for (var j = 0; j < nameRange.Cells.Count; j ++) {
    var cellNow = nameRange.Cells(j + 1);

    var colValue = "";
    if ((rowPos < blockValue.getRows().length) && (j < blockValue.getBlockMeta().colCount)) {
      var colValue = blockValue.getCellByPos(rowPos, j);
    }         
    cellNow.Offset(rowPos, 0) = colValue;
  }
  */

}

//导出指定列colPos数据
erTools.dumpCol = function(nameRange, blockValue, colPos) {
  for (var i = 0; i < nameRange.Cells.Count; i ++) {
    var cellNow = nameRange.Cells(i + 1);  
    
    var colValue = "";
    if ((i < blockValue.getRows().length) && (colPos < blockValue.getBlockMeta().colCount)) {
      var colValue = blockValue.getCellByPos(i, colPos);
    }
    cellNow.Offset(0, colPos) = colValue;
  }
}

//导出Block数据
erTools.dumpBlock = function(nameRange, blockValue, blockPos) {

  var rangeRowCount = nameRange.Rows.Count;
  var rangeColCount = nameRange.Columns.Count;
  var rangeNow = nameRange.Offset(0, blockPos * rangeColCount);
  for (var i = 0; i < rangeRowCount; i ++) {  
    
    erTools.dumpRow(rangeNow, blockValue, i);
  }
}


//将值映射到区域
erTools.dumpInfo = function(spreadSheet, nameRange, udfValue, ajaxOutInfo) {
  var ssConstants = spreadSheet.Constants;


  if(!!ajaxOutInfo)	
  	unionModel = ajaxOutInfo.get("unionModel");


  var returnValue;
  var returnValues;
  var formulaType;
  
  if (typeof(udfValue) != "string") {
    nameRange.Value = udfValue;
    return;
  }

  if (udfValue.substr(0, 3) == "___") {
    returnValue = udfValue.substr(3);
    returnValues = returnValue.split(",");
    if (returnValues.length > 1) {
      formulaType = "3"; 
    } else {
      formulaType = "2"; 
    }
  } else {
    returnValue = udfValue;
    formulaType = "1"; 
  }
  
  var rangeType = "A";
  var rangeRowCount = nameRange.Rows.Count;
  var rangeColCount = nameRange.Columns.Count;
  
  if (nameRange.Count == 0) return;
  if ((rangeRowCount == 1) && (rangeColCount > 1))  rangeType = "B";
  if ((rangeRowCount > 1)  && (rangeColCount == 1)) rangeType = "C";
  if ((rangeRowCount > 1)  && (rangeColCount > 1))  rangeType = "D";
  
  //为单个返回值的情况
  if (formulaType == "1") {
    switch (rangeType) {
      default:
        nameRange.Cells(1).Value = returnValue;
    }
    return;
  }
  
  //为结果集返回的情况
  if (formulaType == "2") {

    var returnBlock = ajaxOutInfo.getBlock(returnValue);

    var returnRows = returnBlock.getRows();
    var rowCount = returnBlock.getRows().length;
    var colCount = returnBlock.getBlockMeta().colCount;
  
    switch (rangeType) {
      //单行单列
      case "A":
        nameRange.Cells(1).Value = returnBlock.getCellByPos(0, 0);
        break;
      //单行多列
      case "B":
        for (var i = 0; i < rowCount; i ++) {        
          erTools.dumpRow(nameRange, returnBlock, i);          
          if (i != (rowCount - 1)) {
            if(unionModel !="cover"){
	            var addRow = nameRange.Offset(i + 1, 0).EntireRow;
	            addRow.Insert(ssConstants.xlShiftDown);
            }
            
          //  nameRange.Copy();
          //  nameRange.Offset(i + 1, 0).Paste();
          }
        }
        break;
      //多行单列
      case "C":
        for (var i = 0; i < colCount; i ++) {        
          erTools.dumpCol(nameRange, returnBlock, i);          
          if (i != (colCount - 1)) {
          	if(unionModel !="cover"){
	            var addColumn = nameRange.Offset(0, i + 1).EntireColumn;
	            addColumn.Insert(ssConstants.xlShiftToRight);
            }
          //  nameRange.Copy();
          //  nameRange.Offset(0, i + 1).Paste();
          }
        }
        break;
      //多行多列
      case "D":
        for (var i = 0; i < rangeRowCount; i ++) {        
          for (var j = 0; j < rangeColCount; j ++) {   
            try{
            	nameRange.Cells(i + 1, j + 1).Value = returnBlock.getCellByPos(i, j);
            }catch(e){
            }	     
          }
        }
        break;
        
    }
  } 
  
  //为多结果集返回的情况
  if (formulaType == "3") {

    for (var i = 0; i < returnValues.length; i ++) {

      var unionBlockId = efutils.trimString(returnValues[i]);
      var unionBlock = ajaxOutInfo.getBlock(unionBlockId);
      erTools.dumpBlock(nameRange, unionBlock, i); 
      
      if (i != (returnValues.length - 1)) {
      	if(unionModel !="cover"){
	          for (var j = 0; j < rangeColCount; j ++) { 
	            var columnWidth = nameRange.Columns(j + 1).ColumnWidth;
	                   
	            var addColumn = nameRange.Columns(j + 1).Offset(0, (i + 1) * rangeColCount).EntireColumn;
	            addColumn.Insert(ssConstants.xlShiftToRight);
	            
	            var newColumn = addColumn.Offset(0, 1).EntireColumn;           
	            newColumn.ColumnWidth = columnWidth;
	          }
          }
          
            
          nameRange.Copy();
          nameRange.Offset(0, (i + 1) * rangeColCount).Paste();          
      }
    }
  }
  
}

//根据eiInfo的信息绘制参数列表
erTools.autodrawPara = function (eiInfo, paraBlockId, divId) 
{
  var i = 0;
  var paraBlock = eiInfo.getBlock(paraBlockId);
  
  var innerHtml = "<table>";
  var inputHtml = "";
  
  for ( i = 0; i < paraBlock.rows.length; i++ ){
    //debugger;
    
    var paraDesc = paraBlock.getCell(i, "paraDesc") ;
    var paraContext = paraBlock.getCell(i, "paraContext") ;
    var paraMustFlag = paraBlock.getCell(i, "paraMustFlag") ;
    var paraDisplayMode = paraBlock.getCell(i, "paraDisplayMode") ;
    var paraChoiceKey = paraBlock.getCell(i, "paraChoiceKey") ;
    var paraDefaultValue = paraBlock.getCell(i, "paraDefaultValue") ;
    var paraReadonly = paraBlock.getCell(i, "paraReadonly");
    
    inputHtml += "<tr><td width=50% align='right'>";
    if (paraMustFlag == "1") inputHtml += "<font color=red>*</font>";
    inputHtml += "<span id='_" + paraContext + "'>" + paraDesc + "</span></td>" +
      "<td width=50% nowarp>" + 
      "<input type='text' style='width:80px;overflow-x:visible;overflow-y:visible;' " +
      "id='" + paraContext + "' " + 
      "name='" + paraContext + "' " + 
      "value='" + efutils.trimString(paraDefaultValue) + "' " +  
      "class='inputField' ";
    if (paraMustFlag == "1") {
      inputHtml += "nullable='false' errorPrompt='"+ paraDesc + "' ";
    }
    if(paraReadonly == 'true')
    	inputHtml +=" readOnly ";
    inputHtml += "/>";
    
    switch (paraDisplayMode) {
      //如果显示类型为D，绑定日期框
      case "D":    
        inputHtml += " <img title=\"日历选择\" src=\""+efico.get("efcalendar.iconImg")+"\" " + 
          "onmouseover=\"this.style.cursor='hand'\" " +
          "onClick=\"efcalendar_click(this, '" + paraContext + "');\" />";
        break;
      //如果显示类型为B，当前窗口下拉Grid
      case "B":    
        inputHtml += " <img title=\"选择数据\" " + 
          "src=\""+efico.get("efform.efPopupWindow")+"\" " +
		  "onmouseover=\"this.style.cursor='hand'\" " +
		  "onClick=\"erTools.openSubGrid('" + 
		  paraChoiceKey + "', '" + divId + "', '" + paraContext + "');\" />";
		break;
      //如果显示类型为F，弹出新的选择页面
      case "F":    
        inputHtml += " <img title=\"弹出选择页面[" + paraChoiceKey + "]\" " + 
          "src=\""+efico.get("efgrid.newForm")+"\" " +
		  "onmouseover=\"this.style.cursor='hand'\" " +
		  "onClick=\"erTools.openNewForm('" + paraChoiceKey + "', '" + divId + "', '"+paraContext+"');\" >";
		break;
    }

    inputHtml += "</td></tr>";
  }

  innerHtml += inputHtml + "</table>";
  
  ef.get(divId).innerHTML = innerHtml;
}

//根据跳转的页面号打开新页面
erTools.openNewForm = function (paraChoiceKey, divId,returnValueId) 
{
  var paraStr = erTools.getParaStr(divId, true, "&");
  efform.openNewForm(paraChoiceKey,  paraStr + "&&efFormPopup=1&parentEfFormEname="
  		+ef.get("efFormEname").value
  		+"&returnValueId="+returnValueId
  		+"&reportId="+ef.get("reportId").value
		+"&reportBelongTo="+ef.get("reportBelongTo").value
		+"&reportVersion="+ef.get("reportVersion").value);		
}

//根据参数区域的内容返回参数串
erTools.getParaStr = function (divId, addName, splitStr) { 

  var paras = ef.get(divId).getElementsByTagName("input");
  var paraStr = "";
  
  if (splitStr == null) splitStr = ",";
  	
  for ( var i = 0; i < paras.length; i++ )   
  {
    var paraValue = efutils.trimString(paras[i].value);
    
    if ((paraValue == "") && (addName == true)) continue;

    if (i > 0) paraStr += splitStr;
    if (addName == true) {
      paraStr += paras[i].name + "=" + paraValue;
    } else {
      paraStr += paraValue;
    }
  }
    
  return paraStr;
}

//设置报表固定参数

erTools.setFixParam = function (inInfo){
	inInfo.setById("reportId");
	inInfo.setById("reportBelongTo");
	inInfo.setById("reportVersion");
	return inInfo;
}

//打开SubGrid
erTools.openSubGrid = function (paraChoiceKey, divId, paraContext) 
{
  var paras = paraChoiceKey.split(".");
  if (paras.length != 2) return;
  
  //从数据库加载参数列表
  var inInfo = new EiInfo();
  inInfo.setByNode(divId);
  
  inInfo.set("currentEditId",paraContext);
  ef.get("currentEditId").value=paraContext;
  
  var serviceName = paras[0];
  var queryMethod = paras[1];
  
  EiCommunicator.send(serviceName, queryMethod, inInfo);
  if (ajaxEi == null) return;
  
  var subGridColumn = new efSubgridColumn();
  var eiColumn = new EiColumn(paraContext);
  eiColumn.blockName = "result";
  subGridColumn.setEiMeta({}, eiColumn);
  subGridColumn.set("serviceName", serviceName);
  subGridColumn.set("queryMethod", queryMethod); 
  subGridColumn.set("valueProperty", paraContext);
     
  var div = efform.getSubGridDiv();
  div.efDisplayCol = subGridColumn;
  efform.showSubGridWindow(paraContext, ajaxEi);
}

/**
 * 对str进行字符转换让金山的wps能支持office的xml格式
 * @param {} str
 */
erTools.office2wps = function(xmlStr){
	
	var reg=new RegExp("<ss:","g"); //创建正则RegExp对象
	var newXmlStr = xmlStr.replace(reg,"<");

	var reg2=new RegExp("</ss:","g");
	newXmlStr=newXmlStr.replace(reg2,"</");

	var excelWorkbook = "<x:ExcelWorkbook>"
	
	var str = newXmlStr.split(excelWorkbook);
	
	var wpsXmlTitle = "<?xml version=\"1.0\"?>\r\n"
		+ "<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"\r\n"
		+ " xmlns:o=\"urn:schemas-microsoft-com:office:office\"\r\n"
		+ " xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\r\n"
		+ " xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"\r\n"
		+ " xmlns:c=\"urn:schemas-microsoft-com:office:component:spreadsheet\"\r\n"
		+ " xmlns:html=\"http://www.w3.org/TR/REC-html40\">\"\r\n";
	newXmlStr = wpsXmlTitle + " " + excelWorkbook + str[1];	
	return newXmlStr;
}



