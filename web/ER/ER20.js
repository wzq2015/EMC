
//存放自定义公式信息
var udfInfo = null;  
var nameSelect = 0;//标识选中区域的变化是否由自定义名称select的选择引起，1表示是

//日历框选择 
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efform_onload = function ()
{
  var inInfo = _getEi();
  if(inInfo.status==-1){
  	return false;
  }
  efregion.show("ef_region_para");

  erOwc.setCurrentOwc();  
  
//  debugger;
 
  var spreadSheet = ef.get("mySpreadsheet");
  
  spreadSheet.DisplayDesignTimeUI = true ;
  spreadSheet.attachEvent("SheetCalculate", spreadSheet_SheetCalculate);  

  var reportId = ef.get("reportId").value;
  var reportBelongTo = ef.get("reportBelongTo").value;
  var reportVersion = ef.get("reportVersion").value;

  if (reportId == "") {
    alert("没有指定预编辑的报表ID，无法载入！");
    this.close();
  }
  
  var titleStr = "当前报表[" + reportId 
    + "]  报表归属["+ reportBelongTo + "]  报表版本[" + reportVersion + "]";
  efregion.setTitle("ef_region_excel", titleStr);

  user_define_para_load();  

  load_excel_xml();

  spreadSheet.AddIn(erOwc);
  spreadSheet.attachEvent("SelectionChange", spreadSheet_SelectionChange);  


  load_sheetNames_tree();

  user_define_name_load();  

  spreadSheet.Dirty = false;//初始清空，默认总为true
  
  //判断是否为保存后重新加载
  var loadAfterSave = ef.get("loadAfterSave").value;
  if (loadAfterSave == "1") {
    ef.get("loadAfterSave").value = "0";
  } else {
    efform.setStatus(0, "报表[" + reportId + "]载入成功！");   
  }
 
// 用户添加自定义参数 而不是通过模板参数注册的方式  
/*  $("<table><tr><td width=50% align='right'>test:</td>"
  +"<td width=50% nowarp><input id='testudf' name='testudf' type='text' style='width:80px;overflow-x:visible;overflow-y:visible;' class='inputField'>"
  +"</input></td></tr></table>")
  .appendTo(ef.get("ef_para_list"));
*/  
	efregion.toggleShow('ef_region_para');
	efregion.toggleShow('ef_region_udf');


}


var reportTreeModel =  new eiTreeModel('ER09');
load_sheetNames_tree = function(){

	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");


	try{
	
    nd = tree.expandNode(ef.get("reportId").value+":"
    					+ef.get("reportBelongTo").value+":"
    					+ef.get("reportVersion").value);
    if ( nd != null ){ 
        nd.textDom().style.color = "red";
      }		
    }catch(e){
	}
	
}

treeModel.prototype.getParent = function(p){

}


	   
function treeNodeInitializer(node){
		  node.count = 0;
          node.textClicked = function (){   var spreadSheet = ef.get("mySpreadsheet");
          								 	
          					if(node.reportId ==ef.get("reportId").value 
          								 		&& node.reportVersion == ef.get("reportVersion").value
          								 		&& node.reportBelongTo == ef.get("reportBelongTo").value){
          								 		if(node.leaf() == true)
													spreadSheet.Sheets(node.label()).Activate();
												else	
													spreadSheet.Sheets(1).Activate();
												//设置打印信息
												var inInfo = new EiInfo();
												inInfo.set("reportId",ef.get("reportId").value);
												inInfo.set("reportBelongTo",ef.get("reportBelongTo").value);
												inInfo.set("reportVersion",ef.get("reportVersion").value);
											    inInfo.set("activeSheet",spreadSheet.ActiveSheet.Name);		
												EiCommunicator.send("ER20","getPrintConfigInfo", inInfo, null, false);
												
												
										
												if (ajaxEi != null) {

													tempNode = ef.get("PageSize");
													tempNode.selectedIndex = 0;
													if(ajaxEi.get("PageSize") == undefined)
														tempNode.selectedIndex = 0;
													else{	
														for( var i=0; i<tempNode.options.length; i++ )
														{
															if( tempNode.options[i].value == ajaxEi.get("PageSize") )
															{
																tempNode.selectedIndex = i;
																break;
															}
														}	
													}
																									
													ef.get("print-0-print_vertical").checked = false;
													ef.get("print-0-print_horizon").checked = false;	
													if(ajaxEi.get("Orientation") == 1)
														ef.get("print-0-print_vertical").checked = true;
													else
														ef.get("print-0-print_horizon").checked = true;
													ef.get("Zoom").value = ajaxEi.get("Zoom")==undefined?100:ajaxEi.get("Zoom");	
													ef.get("TopMargin").value = ajaxEi.get("TopMargin")==undefined?2.5:ajaxEi.get("TopMargin");
													ef.get("BottomMargin").value = ajaxEi.get("BottomMargin")==undefined?2.5:ajaxEi.get("BottomMargin");
													ef.get("LeftMargin").value = ajaxEi.get("LeftMargin")==undefined?1.9:ajaxEi.get("LeftMargin");
													ef.get("RightMargin").value = ajaxEi.get("RightMargin")==undefined?1.9:ajaxEi.get("RightMargin");	
													ef.get("HeaderMargin").value = ajaxEi.get("HeaderMargin")==undefined?1.3:ajaxEi.get("HeaderMargin");
													ef.get("FooterMargin").value = ajaxEi.get("FooterMargin")==undefined?1.3:ajaxEi.get("FooterMargin");
													ef.get("PrintTitleRows").value = ajaxEi.get("PrintTitleRows")==undefined?"":ajaxEi.get("PrintTitleRows");
												}
																						
												spreadSheet.Dirty = false;
										}else{
											ef.get("reportId").value = node.reportId;
											ef.get("reportVersion").value = node.reportVersion ;
											ef.get("reportBelongTo").value = node.reportBelongTo ;
											efform_onload();
										}
          								 
          								 };
}
	
function configTree(tree){
	      tree.nodeInitializer = treeNodeInitializer;          
	      tree.emptyNodeAsLeaf = true;
}

















window.onbeforeunload = function(){
  try{
	  var spreadSheet = ef.get("mySpreadsheet");
	  if(spreadSheet.Dirty )
	    return "您已对文档进行了修改，如果不保存即关闭将会丢失所有的修改信息！";
	  else {
	  	spreadSheet.Dirty = true; 
	  }	
  }catch(e){
  }
}

//从弹出窗口返回
efform_onPopupReturn = function(winId, udfStr, returnId)
{
  if(returnId == "formulaValue")//excel公式，前面加上等号
    udfStr = "=" + udfStr;
  ef.get(returnId).value = udfStr;
  efform.setStatus(1, "从页面[" + winId + "]返回自定义函数信息！"); 
  
}

//加载excel的xml文件
load_excel_xml = function () 
{ 
  var spreadSheet = ef.get("mySpreadsheet");
  var reportId = ef.get("reportId").value;
  var reportBelongTo = ef.get("reportBelongTo").value;
  var reportVersion = ef.get("reportVersion").value;
  
  var reportFilePath;
  if(reportId != "")
	 reportFilePath = "model" + "/" + reportId + "/" 
	   + reportId + "_" + reportBelongTo + "_" + reportVersion +".xml";

  if (reportFilePath != "") {
    var url = "ER/download.jsp?path=" + reportFilePath;
    try {
      spreadSheet.XMLURL = url;
    } catch (ex) {
    }    
  }
  
  //从数据库加载自定义公式
  var inInfo = new EiInfo();
  //组织公用参数
  inInfo.setByNode("commonPara");
  
  EiCommunicator.send("ER20","loadUdf", inInfo, null, false);
  if (ajaxEi == null) return;
  
  //将公式列表保存在udfInfo中
  if (ajaxEi != null) {
    udfInfo = ajaxEi;
  } else {
    udfInfo = null;
  }
}

//加载参数列表
user_define_para_load = function () 
{
  //从数据库加载自定义参数
  var inInfo = new EiInfo();
  //组织公用参数
  inInfo.setByNode("commonPara");
  
  EiCommunicator.send("ERUtils","getPara", inInfo, null, false);
  if (ajaxEi == null) return;
  
  erTools.autodrawPara(ajaxEi, "para", "ef_para_list");
}

//加载自定义名称列表
user_define_name_load = function () 
{
  //debugger;
  var spreadSheet = ef.get("mySpreadsheet");
  var udnList = ef.get("udNameList");
  udnList.options.length = 0;
    
  var names = spreadSheet.Names;
  var nameCount = names.Count;
  for (var i = 0; i < nameCount; i ++) {
    var name = names(i + 1);
    
    var varText = name.Name;
    var varValue = name.Name;
    var varItem = new Option(varText, varValue);      
    udnList.options.add(varItem);
  }
}

judge_single_name = function(userName){
  var spreadSheet = ef.get("mySpreadsheet");
  var names = spreadSheet.Names;
  var nameCount = names.Count;
  for (var i = 0; i < nameCount; i ++) {
    var name = names(i + 1);
    
    var varText = name.Name;
	if(varText == userName){
		return false;
	}
  }
  return true;
}


//自定义名称列表选择项变化
user_define_name_onchange = function (nameValue) 
{
	//不能多选
	select = ef.get("udNameList");
	var count = 0;
	for (var i = 0; i < select.options.length; i ++) 
	{ 
		if (select.options[i].selected) count++;
		if (count > 1) {
			select.options[i].selected = false;	
			count--;
			alert("不能多选");
		}
	} 

  var spreadSheet = ef.get("mySpreadsheet");
  var nameRef = spreadSheet.Names(nameValue);
    
  //如果对象没有引用区域（例如，引用常量或公式），该属性RefersToRange将产生运行时出错
  try {
    nameSelect = 1;
    nameRef.RefersToRange.Select(); 
  } catch (ex) {
    efform.setStatus(1, "该名称[" + nameValue + "]没有引用区域！");
    nameSelect = 0;
  }
  
  ef.get("regionNow").value = nameRef.RefersTo;
  
  var SheetName = ef.get("regionNow").value.split("!");
  
  var curSheetName = SheetName[0].substring(1);
  
  spreadSheet.Sheets(curSheetName).Activate();

		
		
  ef.get("userDefineName").value = nameValue;
  efregion.setTitle("ef_region_udn", "区域[" + ef.get("regionNow").value + "]名称");
  
  //载入自定义公式
  ef.get("userDefineNameNow").value = nameValue;
  efregion.setTitle("ef_region_udf", "名称[" + nameValue + "]自定义公式");
  
  var udf = udfInfo.get(nameValue);
  if (typeof(udf) == "undefined") {
    ef.get("userDefineFunction").value = "";
  } else {
    ef.get("userDefineFunction").value = udf;
  }
}

button_utpen_onclick = function(){
	button_namenew_onclick();
}

button_imgCommand_onclick = function (){
	efwindow.show(null,"udnType","center");
}



//增加新名称 
button_namenew_onclick = function () 
{
 
 
 
  var spreadSheet = ef.get("mySpreadsheet");
  var userName = ef.get("userDefineName").value;
  userName = efutils.trimString(userName);
  if (userName == "") {
    efform.setStatus(-1, "请输入自定义名称！");
   // ef.get("userDefineName").focus();    
    return;
  } 
  //判断该名称是否已经存在 存在的话则提示不能增加 
  if(!judge_single_name(userName)){
    efform.setStatus(-1, "已经具有相同的自定义名称，请更改自定义名称！");
    //ef.get("userDefineName").focus();    
    return; 
  }
  
  //获取当前选择区域的外部引用地址
  var rangeNow = spreadSheet.Selection;
  var xlA1 = 1;
  var rangeAddress = "=" + rangeNow.Address(true, true, xlA1, true);
  try{
  	spreadSheet.Names.Add(userName, rangeAddress);  
  }catch(e){
  	alert("该自定义名称含有非法字符！");
  	return ;
  }
  //把新增自定义名称记录添加到数据库
  
  var inInfo = new EiInfo();
  inInfo.set("userDefineNameNow",userName);
  inInfo.set("userDefineFunction"," ");
  udn_Type = " ";
  if(ef.get("udn_type_F").checked)	
	udn_Type = "F";
  else if(ef.get("udn_type_S").checked)
	udn_Type = "S";	  
  else if(ef.get("udn_type_D").checked)
  	udn_Type = "D";
  else if(ef.get("udn_type_N").checked)	
    udn_Type = "N";
  
  inInfo.set("type",udn_Type); 
  inInfo.set("reportUdnPlace",userName); 
  

  inInfo.setByNode("commonPara");
  EiCommunicator.send("ER20","saveUdf", inInfo);
  if (ajaxEi == null) return;

  

  
  //重新加载名称列表
  user_define_name_load();

  efform.setStatus(1, "名称[" + userName + "]新增成功，请在退出前保存模板以记录更改！");
}

//删除现有名称 
button_namedel_onclick = function () 
{
  var spreadSheet = ef.get("mySpreadsheet");
  var userName = ef.get("userDefineName").value;
  
  userName = efutils.trimString(userName);
  if (userName == "") {
    efform.setStatus(-1, "请选择预删除的自定义名称！");
    ef.get("userDefineName").focus();    
    return;
  } 
  
  try{
  	spreadSheet.Names(userName).Delete();
  }catch(e){
  	alert("该自定义名称含有非法字符！");
  	return ;
  }
  
  var inInfo = new EiInfo();
  inInfo.setById("userDefineNameNow");
  //组织公用参数
  inInfo.setByNode("commonPara");
  
  EiCommunicator.send("ER20","deleteUdf", inInfo);
  if (ajaxEi == null) {
    return;
  }

  //重新加载名称列表
  user_define_name_load();

  efform.setStatus(1, "名称[" + userName + "]删除成功，请在退出前保存模板以记录更改！");
}

//保存XML文件
button_imgSave_onclick = function () 
{
  var spreadSheet = ef.get("mySpreadsheet");

  
  var xmlStr = spreadSheet.XMLData + '';

  xmlStr = erTools.office2wps(xmlStr);
	
  var inInfo = new EiInfo();
  //组织公用参数
  inInfo.setByNode("commonPara");

  ef.get("xmlStr").value = xmlStr;
  ef.get("methodName").value = "saveReportModel";
  ef.get("serviceName").value = "ERUtils";
  
  //设置保存后加载开关
  ef.get("loadAfterSave").value = "1";
  spreadSheet.Dirty = false;//保存时，标识清空
  

  var inInfo = new EiInfo();
  inInfo.set("reportId",ef.get("reportId").value);
  inInfo.set("reportBelongTo",ef.get("reportBelongTo").value);
  inInfo.set("reportVersion",ef.get("reportVersion").value);
  
  reportModelSheetNames = "";
  
  for(var i=1;i<= spreadSheet.Worksheets.Count;i++){
  		var workSheet = spreadSheet.Worksheets.Item(i);
  		if(i<spreadSheet.Worksheets.Count)
			reportModelSheetNames += workSheet.Name +",";
		else
			reportModelSheetNames += workSheet.Name;	
  }  

  inInfo.set("reportModelSheetNames",reportModelSheetNames);
  EiCommunicator.send("ER20","saveReportModelSheetNames", inInfo);  
  
  
  
  document.forms[0].submit();
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

//公式计算
button_evaluate_onclick = function ()
{  
  var userDefineNameNow = efutils.trimString(ef.get("userDefineNameNow").value);
  if (userDefineNameNow == "") {
    	alert("请选择或添加公式对应的自定义名称！");
    	return;
  } 

  if (efvalidateDiv("ef_para_list")) {

    var udf = ef.get("userDefineFunction").value;
    var nameValue = ef.get("userDefineNameNow").value;
     
    evaluateUdf(nameValue, udf);
  }
}

//重新计算
button_calculate_onclick= function(){

  if (efvalidateDiv("ef_para_list")) {
    select = ef.get("udNameList");
    var spreadSheet = ef.get("mySpreadsheet");
    for (var i=0; i<select.options.length; i++) 
    { 
	  nameValue = select.options[i].value;
	  udf = udfInfo.get(nameValue);
	  udf = efutils.trimString(udf);
      evaluateUdf(nameValue, udf);
    }
    
    //遍历所有公式，一次性提交到后台计算
   //var start =  new Date();
    //single_submit_calculate();
    spreadSheet.CalculateFull();
   // var end =  new Date();
   // alert(end.getTime()-start.getTime());
    
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

//弹出自定义公式ER21页面
button_udf_onclick = function ()
{
  var formula = ef.get("userDefineFunction").value;
  if(formula != undefined) {
  	formula = formula.replace(/\+/g,"%2b");
  }
  var er21ChildWindow = efform.openNewForm('ER21', "efFormPopup=1&userDefineFunction=" + formula
  								+"&reportId="+ef.get("reportId").value
								+"&reportBelongTo="+ef.get("reportBelongTo").value
								+"&reportVersion="+ef.get("reportVersion").value
								+"&efReturnId=userDefineFunction");
  er21ChildWindow.focus();
}

//函数导向按钮
button_fx_onclick = function ()
{
  var formula = ef.get("formulaValue").value;
  if(formula != undefined) {
  	if(formula.indexOf("=")==0)
      formula = formula.substr(1);
  	formula = formula.replace(/\+/g,"%2b");
  }
  var er21ChildWindow = efform.openNewForm('ER21', "efFormPopup=1&userDefineFunction=" + formula
  								+"&reportId="+ef.get("reportId").value
								+"&reportBelongTo="+ef.get("reportBelongTo").value
								+"&reportVersion="+ef.get("reportVersion").value
								+"&efReturnId=formulaValue");
  er21ChildWindow.focus();
}

//保存自定义公式
button_addudf_onclick = function ()
{
  var userDefineNameNow = efutils.trimString(ef.get("userDefineNameNow").value);
  if (userDefineNameNow == "") {
    efform.setStatus(-1, "请选择公式对应的自定义名称！");
    return;
  } 
  
  var inInfo = new EiInfo();
  inInfo.setById("userDefineNameNow");
  inInfo.setById("userDefineFunction");
  str = inInfo.get("userDefineFunction");
  inInfo.set("userDefineFunction",str.replace(/\+/g,"%2b"));
  //组织公用参数
  inInfo.setByNode("commonPara");
  
  EiCommunicator.send("ER20","saveUdf", inInfo);
  if (ajaxEi == null) return;
  
  if (udfInfo != null) {
    udfInfo.setByNameValue(inInfo.get("userDefineNameNow"), inInfo.get("userDefineFunction")); 
  }
  efform.setStatus(1, "公式保存完成！");
}

//切换当前选择
spreadSheet_SelectionChange = function() {

  findRowsCount = 0;
  findColumnsCount = 0;
  replaceRowsCount = 0;
  replaceColumnsCount = 0;
  findFormulaRowsCount = 0;
  findFormulaColumnsCount = 0;


  isCellEdited = true;
  var spreadSheet = ef.get("mySpreadsheet");
  //获取当前选择区域的外部引用地址
  var rangeNow = spreadSheet.Selection;
  var xlA1 = 1;
  ef.get("regionNow").value = rangeNow.Address(true, true, xlA1, true);
  efregion.setTitle("ef_region_udn", "选定区域[" + ef.get("regionNow").value + "]");

  ef.get("cellName").innerText = ef.get("regionNow").value;
  
  
  //获得公式定义
  if (rangeNow.Cells.Count == 1)
    ef.get("formulaValue").value = rangeNow.Formula;
  else 
    ef.get("formulaValue").value = "";
  
  if(nameSelect == 1)//用户选择名称导致，无需处理 
  {
  	nameSelect = 0;
  	return;
  }
  try {
    var udname = rangeNow.Name.Name;
	select = ef.get("udNameList");
	if(select.options.length == 0) return ;//无名称下拉选项，不处理，多发于初始化载入时
	for (var i = 0; i < select.options.length; i ++) 
	{ 
		if (select.options[i].value == udname)
			select.options[i].selected = true;	
		else 
		    select.options[i].selected = false;
	} 
    user_define_name_onchange(udname)

    nameSelect = 0; 
     
  } catch (ex) {//异常，表示无对应名称
    //alert(ex);
    clear_udinfo();
  }
  ef.get("userDefineName").value = ef.get("regionNow").value.replace("!$","_").replace(":$","_").replace("$","").replace("$","");
  ef.get("userDefineName").value = ef.get("userDefineName").value.replace("=","");
}

//清除相关的字段信息，name下拉筐等内容
clear_udinfo = function() {
  	select = ef.get("udNameList");
	for (var i = 0; i < select.options.length; i ++) 
	{ 
	  select.options[i].selected = false;
	}
	ef.get("userDefineName").value = "";
    ef.get("userDefineNameNow").value = "";
    ef.get("userDefineFunction").value = "";
}

spreadSheet_SheetCalculate = function(sh) {
  var spreadSheet = ef.get("mySpreadsheet");
  var rangeNow = spreadSheet.Selection;
  
  var ssConstants = spreadSheet.Constants;
  
  var ddd = spreadSheet.ActiveSheet.UsedRange.cells;
  
  //var con = ssConstants.xlCellTypeFormulas;
  //var con = -4123; 
  //var eee = ddd.SpecialCells(con);
  
  //debugger;
}

//重新设定单元格的公式
formulaValue_Change = function() {
  if (event.keyCode == 13) {
    var spreadSheet = ef.get("mySpreadsheet");
    var rangeNow = spreadSheet.Selection;
  
    rangeNow.Formula = ef.get("formulaValue").value;

  }
  
}

button_saveas_onclick = function(){
  var saveAs = efform.openNewForm('ER24', "efFormPopup=1"
  								+"&reportId="+ef.get("reportId").value
								+"&reportBelongTo="+ef.get("reportBelongTo").value
								+"&reportVersion="+ef.get("reportVersion").value
  								+"&reportSaveAsId="+ef.get("reportId").value
								+"&reportSaveAsBelongTo="+ef.get("reportBelongTo").value
								+"&reportSaveAsVersion="+ef.get("reportVersion").value);
  saveAs.focus();
}

reportSaveAs = function (map){
  var spreadSheet = ef.get("mySpreadsheet");
  var xmlStr = spreadSheet.XMLData + '';

  xmlStr = erTools.office2wps(xmlStr);
  
  ef.get("reportSaveAsId").value = map.reportSaveAsId;
  ef.get("reportSaveAsBelongTo").value = map.reportSaveAsBelongTo;
  ef.get("reportSaveAsVersion").value = map.reportSaveAsVersion;
  	
  ef.get("xmlStr").value = xmlStr;
  ef.get("methodName").value = "saveAsReportModel";
  ef.get("serviceName").value = "ERUtils";
  
  //设置保存后加载开关
  ef.get("loadAfterSave").value = "1";
  
  document.forms[0].submit();

}



eftabShowCount = 0;
button_imgFind_onclick = function () 
{
	efwindow.show(null,"findReplace","center");
	if(eftabShowCount == 0){
		eftab.show("ef_tab_x");
		eftabShowCount++;
	}
	/*	
	 var spreadSheet = ef.get("mySpreadsheet");
    for(var j = 0; j<spreadSheet.Selection.Rows.Count; j++) {
      for(var k =0; k<spreadSheet.Selection.Columns.Count; k++ ) {
      		cellValue = spreadSheet.Selection.Cells(j+1,k+1).Value;
      		alert(cellValue);
      	}
      }	 */
	
}

button_imgDefine_onclick = function(){
	efwindow.show(null,"ef_region_ud","center");

}

button_imgHelp_onclick = function (){
	button_fx_onclick();
}

button_imgRight_onclick = function (){
    var spreadSheet = ef.get("mySpreadsheet");
    var rangeNow = spreadSheet.Selection;
    rangeNow.Formula = ef.get("formulaValue").value+"";
}


button_imgDetail_onclick = function (){
	ef.get("detailFormulaValue").value = ef.get("formulaValue").value;
	efwindow.show(ef.get("formulaValue"),"detailFormulaValueId","fixed");
}

button_imgFalse_onclick = function(){
	ef.get("formulaValue").value = "";
}

button_replaceValueClose_onclick = function(){
	efwindow.hide();
}

button_replaceFormulaClose_onclick = function(){
	efwindow.hide();
}

button_imgPrint_onclick = function(){
	efwindow.show(null,"printContent","center");
}

/**
 * @creater 对应原始需求：94834 报表打印功能
 */

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
	
//	    Spreadsheet1.Export("C:/ssheet1.xml", ssConstants.ssExportActionNone, ssConstants.ssExportXMLSpreadsheet);
//	    
//	    excelApp = new ActiveXObject("Excel.Application"); 
//		var xlBook = excelApp.Workbooks.Open("C:/ssheet1.xml");
		
		
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






var findRowsCount = 0;
var findColumnsCount = 0;
/**
 * @creater 对应原始需求：92079 报表编辑owc控件提供选中区域查询替换功能
 */
button_findNextValue_onclick = function(){
	var spreadSheet = ef.get("mySpreadsheet");
    var nameRange = spreadSheet.Selection;
    findValue = ef.get("find_content_Value").value;
    var findFlage = false;
    if(nameRange.Rows.Count == 262144){
    	alert("不能全选！");
    	return ;
    }
    //debugger;
    for(var j = findRowsCount; j<nameRange.Rows.Count; j++) {
      for(var k =findColumnsCount; k<nameRange.Columns.Count; k++ ) {
	      	cellValue = nameRange.Cells(j+1,k+1).Value + "";
	      	//added by wangyuqiu@2009-03-16 reconfig the bug
	      if("undefined" == cellValue && nameRange.Cells(j+1,k+1).Text == "")	
	      	continue;	 	      	
	      if(cellValue.indexOf(findValue) != -1){
	      		nameRange.Cells(j+1,k+1).Activate();
	      		findFlage = true;
	      		if(nameRange.Columns.Count-1 == k){
	      			findRowsCount = j+1;
	      			findColumnsCount = 0;
	      		}
	      		else{	
	      			findColumnsCount = k+1;
	      			findRowsCount = j;
	      		}	
	      		break;
	      	}
      }
      if(findFlage == true)
      	break;
      else
      	findColumnsCount = 0;	
    }  
    
   if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count && findRowsCount==0 && findColumnsCount ==0)
   		alert("Excel 搜索不到查询内容！"); 
   else if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count ){	
     	findRowsCount = 0;
        findColumnsCount = 0;
        button_findNextValue_onclick();
   }    
    
}


var replaceRowsCount = 0;
var replaceColumnsCount = 0;

/**
 * @creater 对应原始需求：92079 报表编辑owc控件提供选中区域查询替换功能
 */
button_replaceNextValue_onclick = function(){
	var spreadSheet = ef.get("mySpreadsheet");
    var nameRange = spreadSheet.Selection;
    findValue = ef.get("find_content_Value").value;
    replaceValue = ef.get("replace_content_Value").value;
    var replaceFlage = false;
    if(nameRange.Rows.Count == 262144){
    	alert("不能全选！");
    	return ;
    }
    //debugger;
    for(var j = replaceRowsCount; j<nameRange.Rows.Count; j++) {
      for(var k =replaceColumnsCount; k<nameRange.Columns.Count; k++ ) {
	      	cellValue = nameRange.Cells(j+1,k+1).Value + "";
	      	//added by wangyuqiu@2009-03-16 reconfig the bug
	      if("undefined" == cellValue && nameRange.Cells(j+1,k+1).Text == "")	
	      	continue;	 	      	
	      if(cellValue.indexOf(findValue) != -1){
	      		nameRange.Cells(j+1,k+1).Value = cellValue.replace(new RegExp(findValue,"gm"),replaceValue);
	      		nameRange.Cells(j+1,k+1).Activate();
	      		replaceFlage = true;
	      		if(nameRange.Columns.Count-1 == k){
	      			replaceRowsCount = j+1;
	      			replaceColumnsCount = 0;
	      		}
	      		else{	
	      			replaceColumnsCount = k+1;
	      			replaceRowsCount = j;
	      		}	
	      		break;
	      	}
      }
      if(replaceFlage == true)
      	break;
      else
      	replaceColumnsCount = 0;	
    }  
    
   if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count && replaceRowsCount==0 && replaceColumnsCount ==0)
   		alert("Excel 搜索不到要替换的内容！"); 
   else if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count ){	
     	replaceRowsCount = 0;
        replaceColumnsCount = 0;
        button_replaceNextValue_onclick();
   }  	
}

/**
 * @creater 对应原始需求：92079 报表编辑owc控件提供选中区域查询替换功能
 */
button_replaceAllValue_onclick = function (){
	var spreadSheet = ef.get("mySpreadsheet");
    var nameRange = spreadSheet.Selection;
    findValue = ef.get("find_content_Value").value;
    replaceValue = ef.get("replace_content_Value").value;
    var replaceFlage = false;
    if(nameRange.Rows.Count == 262144){
    	alert("不能全选！");
    	return ;
    }
    //debugger;
    for(var j = 0; j<nameRange.Rows.Count; j++) {
      for(var k =0; k<nameRange.Columns.Count; k++ ) {
	      	cellValue = nameRange.Cells(j+1,k+1).Value + "";
	      	//added by wangyuqiu@2009-03-16 reconfig the bug
	      if("undefined" == cellValue && nameRange.Cells(j+1,k+1).Text == "")	
	      	continue;	       	
	      if(cellValue.indexOf(findValue) != -1){
	      		nameRange.Cells(j+1,k+1).Value = cellValue.replace(new RegExp(findValue,"gm"),replaceValue);
	      		nameRange.Cells(j+1,k+1).Activate();
	      		replaceFlage = true;
	      	}
      }
 	
    }  
    
   if(replaceFlage == false)
   		alert("Excel 搜索不到要替换的内容！"); 
 
}

/**
 * @creater 对应原始需求：93286 报表编辑owc控件提供选中区域的公式查询替换功能
 */
button_replaceAllFormula_onclick = function (){
	var spreadSheet = ef.get("mySpreadsheet");
    var nameRange = spreadSheet.Selection;
    findValue = ef.get("find_content_Formula").value;
    replaceValue = ef.get("replace_content_Formula").value;
    var replaceFlage = false;
    if(nameRange.Rows.Count == 262144){
    	alert("不能全选！");
    	return ;
    }
    for(var j = 0; j<nameRange.Rows.Count; j++) {
      for(var k =0; k<nameRange.Columns.Count; k++ ) {
	      	cellValue = nameRange.Cells(j+1,k+1).Formula + "";
	      if(cellValue.indexOf(findValue) != -1){
	      		nameRange.Cells(j+1,k+1).Formula = cellValue.replace(findValue.indexOf("(")!=-1?findValue:new RegExp(findValue,"gm"),replaceValue);
	      		nameRange.Cells(j+1,k+1).Activate();
	      		replaceFlage = true;
	      	}
      }
 	
    }  
    
   if(replaceFlage == false)
   		alert("Excel 搜索不到要替换的内容！"); 
 
}

/**
 * @creater 对应原始需求：93286 报表编辑owc控件提供选中区域的公式查询替换功能
 */
var findFormulaRowsCount = 0;
var findFormulaColumnsCount = 0;
button_findNextFormula_onclick = function(){
	var spreadSheet = ef.get("mySpreadsheet");
    var nameRange = spreadSheet.Selection;
    findValue = ef.get("find_content_Formula").value;
    var findFlage = false;
    if(nameRange.Rows.Count == 262144){
    	alert("不能全选！");
    	return ;
    }
    //debugger;
    for(var j = findFormulaRowsCount; j<nameRange.Rows.Count; j++) {
      for(var k =findFormulaColumnsCount; k<nameRange.Columns.Count; k++ ) {
	      	cellValue = nameRange.Cells(j+1,k+1).Formula + "";
	      if(cellValue.indexOf(findValue) != -1){
	      		nameRange.Cells(j+1,k+1).Activate();
	      		ef.get("formulaValue").value = cellValue;
	      		findFlage = true;
	      		if(nameRange.Columns.Count-1 == k){
	      			findFormulaRowsCount = j+1;
	      			findFormulaColumnsCount = 0;
	      		}
	      		else{	
	      			findFormulaColumnsCount = k+1;
	      			findFormulaRowsCount = j;
	      		}	
	      		break;
	      	}
      }
      if(findFlage == true)
      	break;
      else
      	findFormulaColumnsCount = 0;	
    }  
    
   if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count && findFormulaRowsCount==0 && findFormulaColumnsCount ==0)
   		alert("Excel 搜索不到要查询的公式！"); 
   else if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count ){	
     	findFormulaRowsCount = 0;
        findFormulaColumnsCount = 0;
        button_findNextFormula_onclick();
   } 
}

/**
 * @creater 对应原始需求：93286 报表编辑owc控件提供选中区域的公式查询替换功能
 */
var replaceFormulaRowsCount = 0;
var replaceFormulaColumnsCount = 0;

button_replaceNextFormula_onclick = function(){
	var spreadSheet = ef.get("mySpreadsheet");
    var nameRange = spreadSheet.Selection;
    findValue = ef.get("find_content_Formula").value;
    replaceValue = ef.get("replace_content_Formula").value;
    var replaceFlage = false;
    if(nameRange.Rows.Count == 262144){
    	alert("不能全选！");
    	return ;
    }
    //debugger;
    for(var j = replaceFormulaRowsCount; j<nameRange.Rows.Count; j++) {
      for(var k =replaceFormulaColumnsCount; k<nameRange.Columns.Count; k++ ) {
	      	cellValue = nameRange.Cells(j+1,k+1).Formula + "";
	      if(cellValue.indexOf(findValue) != -1){
	      		nameRange.Cells(j+1,k+1).Formula = cellValue.replace(findValue.indexOf("(")!=-1?findValue:new RegExp(findValue,"gm"),replaceValue);
	      		nameRange.Cells(j+1,k+1).Activate();
	      		ef.get("formulaValue").value = nameRange.Cells(j+1,k+1).Formula;
	      		replaceFlage = true;
	      		if(nameRange.Columns.Count-1 == k){
	      			replaceFormulaRowsCount = j+1;
	      			replaceFormulaColumnsCount = 0;
	      		}
	      		else{	
	      			replaceFormulaColumnsCount = k+1;
	      			replaceFormulaRowsCount = j;
	      		}	
	      		break;
	      	}
      }
      if(replaceFlage == true)
      	break;
      else
      	replaceFormulaColumnsCount = 0;	
    }  
    
   if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count && replaceFormulaRowsCount==0 && replaceFormulaColumnsCount ==0)
   		alert("Excel 搜索不到要替换的内容！"); 
   else if(j == nameRange.Rows.Count  && k == nameRange.Columns.Count ){	
     	replaceFormulaRowsCount = 0;
        replaceFormulaColumnsCount = 0;
        button_replaceNextFormula_onclick();
   }
}



eftabPrintShowCount = 0;
button_imgPrintConfig_onclick = function(){
	
	efwindow.show(null,"pagePrintConfig","center");

	if(eftabPrintShowCount == 0){
		efregion.show("ef_region_printDirection");
		efregion.show("ef_region_printZoom");
		efregion.show("ef_region_pageDistanceConfig");

		eftab.show("ef_tab_y");
		eftabPrintShowCount++;
		button_imgPrintConfig_onclick();
	}
}

button_cancel_onclick = function (){
	efwindow.hide();
}

/**
 *  @creater 对应原始需求：94834 报表打印功能
 */
button_ensure_onclick = function (){
	var spreadSheet = ef.get("mySpreadsheet");
	var inInfo = new EiInfo();
	inInfo.set("reportId",ef.get("reportId").value);
	inInfo.set("reportBelongTo",ef.get("reportBelongTo").value);
	inInfo.set("reportVersion",ef.get("reportVersion").value);
    inInfo.set("activeSheet",spreadSheet.ActiveSheet.Name);
    if(!efvalidateDiv("pagePrintConfig"))
    	return;
    
	inInfo.setByNode("pagePrintConfig");
	EiCommunicator.send("ER20","savePrintConfigInfo", inInfo, null, false);
	
}

/**
 * @creater 对应原始需求：94834 报表打印功能
 */
button_preview_onclick = function(){
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
		var xlsheet ;
		for(i=1;i<=xlBook.Worksheets.Count;i++){
			xlsheet = xlBook.Worksheets(i);
			if(xlsheet.Name == Spreadsheet1.ActiveSheet.Name)
				break;
		}
		
		var inInfo = new EiInfo();
		inInfo.set("reportId",ef.get("reportId").value);
		inInfo.set("reportBelongTo",ef.get("reportBelongTo").value);
		inInfo.set("reportVersion",ef.get("reportVersion").value);
	    inInfo.set("activeSheet",Spreadsheet1.ActiveSheet.Name);		
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
		
		//xlsheet.PageSetup.PrintTitleRows="$1:$2";		
		
		excelApp.Application.visible = true;
		//xlsheet.PrintPreview(); // 预览
		
		for(var i=1;i<= spreadSheet.Worksheets.Count;i++){
			xlBook.Worksheets(i).PrintPreview(); 
		}

	}catch(e){
		alert('文件打印出错！' + e.description);
	}finally{
		if(excelApp != null){
			excelApp.Quit();
		}
	}	
}

common_config_top_func = function (id){
	ef.get(id).value = parseInt(ef.get(id).value*1000+500)/1000 ;
	ef.get(id).focus();
	ef.get(id).select();
}

common_config_down_func = function(id){
	ef.get(id).value = parseInt(ef.get(id).value*1000-500)/1000 ;
	if(parseFloat(ef.get(id).value)<0)
		ef.get(id).value = 0;
	ef.get(id).focus();
	ef.get(id).select();		
}

zoom_config_top_func = function(id){
	ef.get(id).value = parseInt(parseInt(ef.get(id).value)+5) ;
	if(parseInt(ef.get(id).value)>400)
		ef.get(id).value = 400;	
	ef.get(id).focus();
	ef.get(id).select();	
}

zoom_config_down_func = function(id){
	ef.get(id).value = parseInt(parseInt(ef.get(id).value)-5) ;
	if(parseInt(ef.get(id).value)<10)
		ef.get(id).value = 10;
	ef.get(id).focus();
	ef.get(id).select();	
}

button_export_onclick = function () 
{
	var spreadSheet = ef.get("mySpreadsheet");
	var xmlStr = spreadSheet.XMLData + '';
		
	date = new Date();

	var fileName = "c:/TEMP/ssheet1"+date.getTime()+".xml";
	try{
		erOwc.generateFile(xmlStr,fileName);
	}catch(e){
		
	}
	excelApp = erOwc.getType();
	excelApp.Workbooks.Open(fileName);

	excelApp.DisplayAlerts = false;
	excelApp.Visible = true;
}



