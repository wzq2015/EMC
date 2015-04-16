//上传下载 进度 标志 对象
var ecsm08_modalWin;
var ecsm08_isShow;
efform_onload = function ()
{
	initDivData();
	//创建 进度窗口
	ecsm08_modalWin  = new EFModalWindow('ecsm08_progressWindow');
	ecsm08_isShow = false;
}	


function onlineEdit_valid(){
	var info=new EiInfo();
	var templateTypeId = document.getElementById("templateTypeId").value;
	var templateDefName = document.getElementById("templateDefName").value;
	
    if(templateDefName==null || templateDefName==""){
    	alert("请填写模版定义名称");
    	return;
    }
	info.set("defName",templateDefName);
	info.set("templateTypeId",templateTypeId);
	
	info.set("templateContent",document.getElementById("templateContent").value);
	EiCommunicator.send("ECTM01", "onLineEditValid", info, null);
	if(ajaxEi!=null){
		var msg = ajaxEi.get("validMsg");
		alert(msg.replaceAll("<br>","\n",true));
	}
}

button_valid_onclick=function()
{
	var opstatus = document.getElementById("opstatus").value;
	var opmode = getRadioVal("mode");
	
	if(opmode == "0"){
		onlineEdit_valid();
	}else if(opmode == "1"){
		uploadTemplate_valid();
	}	
}

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {    
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {    
	      return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);    
	} else {    
	      return this.replace(reallyDo, replaceWith);    
	}    
}    

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	//ef.get("inqu_status-0-nodeId").value=ef.get("nodeId").value;
	//ef.get("inqu_status-0-nodeType").value=ef.get("nodeType").value;
   
	efgrid.submitInqu( "ef_grid_result", "ec","ECSM08","query");
}


efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      var grid = efgrid.getGridObject( "ef_grid_result" );
      var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
       var value=grid.getCellValue(row_index,2,TYPE_DATA);
      if(columnEname=="edit"){   
    	return "<div align='center' efval=''>"
    	//+"<input value='在线编辑' class='buttonclass' type='button' align='center' onclick='efgrid_onEditOnLineClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>&nbsp;"
    	+"<input value='查询实例' class='buttonclass' type='button' align='center' onclick='efgrid_onQueryObjectClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>&nbsp;"
    	//+"<input value='编辑' class='buttonclass' type='button' align='center' onclick='efgrid_onEditButtonClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>&nbsp;"
    	+"<input value='模板维护' class='buttonclass' type='button' align='center' onclick='efgrid_onModifyClick(\""+grid_id+"\",\""+row_index+"\")'>&nbsp;"
    	+"<input value='模板复制' class='buttonclass' type='button' align='center' onclick='efgrid_onCopyClick(\""+grid_id+"\",\""+row_index+"\")'>&nbsp;"
    	
    	+"</div>" ;
      }
      
      }
}
//点击在线编辑模板按钮

efgrid_onEditOnLineClick=function(grid_id,row_index,col_index,cell_value)
{
	if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
    
     var fileName=grid.getCellValue(row_index,1,TYPE_DATA);
     var templateTypeId = grid.getCellValue(row_index,2,TYPE_DATA);
     var templateDefId=grid.getCellValue(row_index,0,TYPE_DATA,true);
     var childWindow = efform.openNewForm('ECTM0105',"fileName="+ fileName + "&templateTypeId=" + templateTypeId + "&templateDefId=" + templateDefId);
     childWindow.focus();
     
   }
}

//点击查询模板实例按钮
efgrid_onQueryObjectClick=function(grid_id,row_index,col_index,cell_value)
{
	if(grid_id=="ef_grid_result"){ 
		var grid=efgrid.getGridObject("ef_grid_result");
	   	var templateDefId=grid.getCellValue(row_index,0,TYPE_DATA,true);
       	var childWindow = efform.openNewForm('ECTM07', "serviceName=ECTM07&methodName=query&templateDefId="+templateDefId);
       	childWindow.focus();
    }
}
/*
button_insert_onclick = function(){
	var nodeId = ef.get("inqu_status-0-nodeId").value;
	var nodeType = ef.get("inqu_status-0-nodeType").value;
	
	if(nodeId==null || nodeId == "" ){
		alert("节点ID获取失败！");
		return;
	}
	if(nodeType==null || nodeType == "" ){
		alert("节点类型获取失败！");
		return;
	}
	var childWindow = efform.openNewForm('ECSM0801', "&nodeId="+ nodeId + "&nodeType="+nodeType + "&opstatus=insert");
    childWindow.focus();
}
*/
efgrid_onEditButtonClick =function(grid_id,row_index,col_index,cell_value)
{	
	if(grid_id=="ef_grid_result"){ 
		var grid=efgrid.getGridObject("ef_grid_result");
	   	
	   	var templateDefId=grid.getCellValue(row_index,0,TYPE_DATA,true);
	   	
	   	var suffix=grid.getCellValue(row_index,5,TYPE_DATA);
	   	var templateDefName=grid.getCellValue(row_index,0,TYPE_DATA);
	   	var templateTypeId=grid.getCellValue(row_index,2,TYPE_DATA);
	   	var templateFileName=grid.getCellValue(row_index,1,TYPE_DATA);
	   	
	   	var param = "templateDefId="+templateDefId ;
	   	param +="&suffix="+suffix;
	   	param +="&templateDefName=" + templateDefName;
	   	param += "&templateTypeId=" + templateTypeId;
	   	param += "&templateFileName=" + templateFileName;
	   	param += "&opstatus=edit";
	   	
       	var childWindow = efform.openNewForm('ECSM0801', param);
       	
       	childWindow.focus();
    }
}


/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
	var  grid=efgrid.getGridObject("ef_grid_result");
	if(checkNullRow()){
		if(confirm("删除操作不可恢复，您确定删除此模板?")){
			efgrid.submitForm( "ef_grid_result", "ec","ECSM08","delete",true);
			if(ajaxEi!=null){
		      conflict=ajaxEi.get("conflict");
		      alert(conflict);
		    }
	    }
	}
	
}
//判断有没有选择记录
function checkNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择一条记录进行操作!");
      return false;
     }
     else
      return true;
}

/*
  上传结束后页面刷新
*/
efform_onPopupReturn = function(winId, returnValue)
{
  if(returnValue=="0")
	efgrid.submitInqu( "ef_grid_result", "ec","ECSM08","query");
}


efgrid_onModifyClick =function(grid_id,row_index){
	getTemplateData(grid_id,row_index);
	document.getElementById("opstatus").value = "update";
	document.getElementById("templateTypeId").disabled = true;
	editModeSelect();
	
	removeFileObj();
	var file1 = document.getElementById("file1");
	var fileObj=document.createElement('input');
	fileObj.type = "file";
	fileObj.name = "model_file";
	fileObj.id = "model_file";
	fileObj.contentEditable = false;
	if(!file1.hasChildNodes()){
		file1.appendChild(fileObj);
	}
	efwindow.show(null,"templateupload","center");
}

efgrid_onCopyClick = function(grid_id,row_index){
	getTemplateData(grid_id,row_index);
	document.getElementById("opstatus").value = "copy";
	document.getElementById("templateTypeId").disabled = false;
	editModeSelect();
	
	removeFileObj();
	var file1 = document.getElementById("file1");
	var fileObj=document.createElement('input');
	fileObj.type = "file";
	fileObj.name = "model_file";
	fileObj.id = "model_file";
	fileObj.contentEditable = false;
	if(!file1.hasChildNodes()){
		file1.appendChild(fileObj);
	}
	efwindow.show(null,"templateupload","center");
}


function getTemplateData(grid_id,row_index){
	if(grid_id=="ef_grid_result"){ 
		var grid=efgrid.getGridObject("ef_grid_result");
	   	var templateDefId=grid.getCellValue(row_index,0,TYPE_DATA,true);
	   	var suffix=grid.getCellValue(row_index,5,TYPE_DATA);
	   	var templateDefName=grid.getCellValue(row_index,0,TYPE_DATA);
	   	var templateTypeId=grid.getCellValue(row_index,2,TYPE_DATA);
	   	var templateFileName=grid.getCellValue(row_index,1,TYPE_DATA);
	   
	   	document.getElementById("templateDefName").value = templateDefName;
	   	document.getElementById("templateDefName_old").value = templateDefName;
		document.getElementById("templateDefId").value = templateDefId;
		document.getElementById("templateFileName").value = templateFileName;
		document.getElementById("suffix").value = suffix;
		document.getElementsByName("mode")[0].checked = true;
		var obj = document.getElementById("templateTypeId").options;
		for(var i=0;i<obj.length;i++){
			if(obj[i].value == templateTypeId){
				obj[i].selected = true;
				break;
			}
		}
		var info = new EiInfo();
		info.set("fileName",templateFileName);
		info.set("templateTypeId",templateTypeId);
		EiCommunicator.send( "ECTM0105", "initLoad" , info, null);
		if(ajaxEi!=null){
			try{
				var block = ajaxEi.getBlock("result");
				document.getElementById("templateContent").value = block.getCell(0,"templateContent");
			}catch(e){
				alert("模板文件读取失败！");
				initDivData();//重置DIV数据为默认
			}
		}
	}
}

button_insert_onclick = function(){
	var nodeType = document.getElementById("inqu_status-0-nodeType").value;
	var opstatus = document.getElementById("opstatus").value;
	//操作状态改变，DIV重新初始化
	if(opstatus!="" && opstatus !="insert"){
		initDivData();
	}
	document.getElementById("opstatus").value = "insert";
	addoptions(nodeType);
	document.getElementById("templateTypeId").disabled = false;
	document.getElementsByName("mode")[0].checked = true;
	editModeSelect();
	
	
	removeFileObj();
	var file1 = document.getElementById("file1");
	var fileObj=document.createElement('input');
	fileObj.type = "file";
	fileObj.name = "model_file";
	fileObj.id = "model_file";
	fileObj.contentEditable = false;
	if(!file1.hasChildNodes()){
		file1.appendChild(fileObj);
	}
	efwindow.show(null,"templateupload","center");
	
}

button_confirm_onclick = function(){
	var opstatus = document.getElementById("opstatus").value;
	var opmode = getRadioVal("mode");
	var templateDefName = document.getElementById("templateDefName").value;
	var oldDefName = document.getElementById("templateDefName_old").value;
	if(opstatus == "insert" || opstatus == "copy"){
		//模板重名校验
		if(!checkTemplateDefName(templateDefName)){
			return false;
		}
		if(opmode == "0"){
			onlineEdit_Insert();
		}else if(opmode == "1"){
			uploadTemplate();
		}
	}
	if(opstatus == "update"){
		if(templateDefName != oldDefName){//更新操作，模板名称是否修改
			//模板重名校验
			if(!checkTemplateDefName(templateDefName)){
				return false;
			}
		}
		if(opmode == "0"){
			onlineEdit_update();
		}else if(opmode == "1"){
			uploadTemplate();
		}
	}
}
//模板定义名称校验  
checkTemplateDefName = function(templateDefName){
	if(templateDefName ==null || templateDefName ==""){
		alert("请输入模板名称");
		return false;
	}
	var info1 = new EiInfo();
	info1.set("fileName",templateDefName);
	EiCommunicator.send("ECTM01", "checkTemplateName", info1, null);
	if(ajaxEi!=null){
		var flag = ajaxEi.get("flag");
		if(flag == "false"){
			alert("模板定义名称已存在，请修改模板名称！");
			return false;
		}
	}
	return true;
}


//模板以在线编辑方式更新
function onlineEdit_update(){
	var info=new EiInfo();
	var nodeType = document.getElementById("inqu_status-0-nodeType").value;
	var suffix = document.getElementById("suffix").value;
	var templateDefName = document.getElementById("templateDefName").value;
	info.set("nodeType",nodeType);
	info.set("suffix",suffix);
	info.set("templateDefName",templateDefName);
	info.set("templateDefId",document.getElementById("templateDefId").value);
	info.set("templateContent",document.getElementById("templateContent").value);
	EiCommunicator.send("ECTM0105", "updateTemplate", info, ajax_onDoTemplate_finish);
}
//模板新增、编辑结束回调 重新查询
ajax_onDoTemplate_finish = {
	      onSuccess : function(eiInfo){
	    	  if(eiInfo.getStatus() == "0"){
	    		  alert("操作成功!");
	    		  initDivData();
	    		  efgrid.submitInqu( "ef_grid_result", "ec","ECSM08","query");
	    		  efwindow.hide();
	    	  }else{
	    		  alert(eiInfo.getMsg());
	    	  }
	      },
	      onFail: function(eMsg){
	      	alert("failure");
	      }
	}
//模板以在线编辑方式新增
function onlineEdit_Insert(){
	var info=new EiInfo();
	var nodeId = ef.get("inqu_status-0-nodeId").value;
	var nodeType = document.getElementById("inqu_status-0-nodeType").value;
	var suffix = ef.get("suffix").value;
	var templateTypeId = document.getElementById("templateTypeId").value;
	var templateDefName = document.getElementById("templateDefName").value;
	
	
     if(templateDefName==null || templateDefName==""){
     	alert("请填写模版定义名称");
     	return;
     }
	
	info.set("defName",templateDefName);
	info.set("templateTypeId",templateTypeId);
	info.set("nodeId",nodeId);
	info.set("nodeType",nodeType);
	info.set("suffix",suffix);
	
	info.set("templateContent",document.getElementById("templateContent").value);
	EiCommunicator.send("ECTM0105", "InsertTemplate", info, ajax_onDoTemplate_finish);
}




function addoptions(nodeType){
	cleanoptions();
	var obj = document.getElementById("templateTypeId");
	var item = null;
	if(nodeType!="" && nodeType == "s"){
		item = new Option("站点首页模板",0); 
		obj.options.add(item); 
	}
	if(nodeType!="" && nodeType != "a" ){
		item = new Option("栏目首页模板",1);   
		obj.options.add(item); 
	}
	item = new Option("文章显示模板",3);    
	obj.options.add(item);  
}

function cleanoptions(){
	var obj = document.getElementById("templateTypeId");
	for(var i=obj.length-1;i>=0;i--){
		obj.options.remove(i);
	}
}

function editModeSelect(){
	var opmode = getRadioVal("mode");
	var onlineEditRegion = document.getElementById("ef_region_onlineedit");
	var uploadRegion = document.getElementById("ef_region_upload");
	if(opmode =="1"){
		uploadRegion.style.display = "block";
		onlineEditRegion.style.display = "none";
	}else{
		onlineEditRegion.style.display = "block";
		uploadRegion.style.display = "none";
	}
}

function getRadioVal(radioName){
	var opmode = null;
	var objmode = document.getElementsByName(radioName);
	for(var i=0;i<objmode.length;i++){
		if(objmode[i].checked){
			opmode = objmode[i].value;
			break;
		}
	} 
	return opmode;
}

//模板上传
function uploadTemplate()
{
	var model_file = document.getElementById('model_file').value;
	var exp1 = model_file.substring(model_file.length-3,model_file.length);
	var nodeId = ef.get("inqu_status-0-nodeId").value;
	var nodeType = ef.get("inqu_status-0-nodeType").value;
	var templateTypeId =document.getElementById("templateTypeId").value;
	
	if(nodeId==null || nodeId == "" ){
		alert("节点ID获取失败！");
		return false;
	}
	if(nodeType==null || nodeType == "" ){
		alert("节点类型获取失败！");
		return false;
	}
	if(exp1.toLowerCase()!='jsp'){
		alert('请上传jsp文件！');
		return false;
	}else{
		var templateDefId = ef.get("templateDefId").value;
		var templateDefName =ef.get("templateDefName").value;
		var templateFileName =ef.get("templateFileName").value ;
		var templateTypeId = templateTypeId;
		var suffix = ef.get("suffix").value;
		
		var actionUrl= "./EC/SM/ECSM0802.jsp"+"?templateTypeId="+templateTypeId+"&templateDefId="+templateDefId;
		
		actionUrl += "&templateDefName=" + encodeURI(encodeURI(templateDefName));
		actionUrl += "&templateFileName= " + templateFileName;
		actionUrl += "&suffix=" + suffix;
		actionUrl += "&nodeId=" + nodeId;
		actionUrl += "&nodeType=" + nodeType;
		
		ef.get("ECSM08").action = actionUrl;
		
		//var childWindow = efform.openNewForm('ECSM0801', "&nodeId="+ nodeId + "&nodeType="+nodeType + "&opstatus=insert");
		document.form1.target = "uploadFrame";
		document.form1.submit();
	}
}

function uploadTemplate_valid()
{
	var model_file = document.getElementById('model_file').value;
	var exp1 = model_file.substring(model_file.length-3,model_file.length);
	var templateTypeId =document.getElementById("templateTypeId").value;
	if(exp1.toLowerCase()!='jsp'){
		alert('请上传jsp文件！');
		return false;
	}else{
		var templateDefId = ef.get("templateDefId").value;
		var templateTypeId = templateTypeId;
		var actionUrl= "./EC/SM/ECSM0802.jsp"+"?templateTypeId="+templateTypeId+"&templateDefId="+templateDefId;
		actionUrl += "&isCheck=true";
		
		ef.get("ECSM08").action = actionUrl;
		document.form1.target = "uploadFrame";
		document.form1.submit();
	}
}

function uploadcallBack(msg,status) {
	if(status=='0'){
		document.getElementById("uploadFrame").src="";
		document.form1.target = "_self";
		alert(msg);
		initDivData();
		efform_onPopupReturn("ECSM08", "0");
		efwindow.hide();
	}else{
		document.getElementById("uploadFrame").src="";
		document.form1.target = "_self";
		alert(msg);
	}	
}
function uploadcallBack2(msg) {
	document.getElementById("uploadFrame").src="";
	document.form1.target = "_self";
	alert(msg.replaceAll("<br>","\n",true));
	
}
//重置DIV数据
function initDivData(){
	document.getElementById("templateDefName").value = "";
	document.getElementById("opstatus").value = "";
	document.getElementById("templateDefId").value = "";
	document.getElementById("templateFileName").value = "";
	document.getElementById("templateContent").value = "";
	document.getElementById("suffix").value = "";
	//clearFileInput(document.getElementById("model_file"));
	document.getElementsByName("mode")[0].checked = true;
	var nodeType = document.getElementById("inqu_status-0-nodeType").value;
	addoptions(nodeType);
	document.getElementById("templateTypeId").disabled = true;
}

function clearFileInput(file){
    var form=document.createElement('form');
    document.body.appendChild(form);
    //记住file在旧表单中的的位置
    var pos=file.nextSibling;
    form.appendChild(file);
    form.reset();
    pos.parentNode.insertBefore(file,pos);
    document.body.removeChild(form);
}

//模板操作结束
function onWorkFinish(){
	initDivData();
	efwindow.hide();
}

button_cancel_onclick = function(){
	initDivData();
	efwindow.hide();
}

button_export_onclick = function(){
	   //显示出导出文章 选择项的图层
	   efwindow.show(null,"exportTemplate","center");
}


//执行 导出
button_exp_onclick=function(){
	var info=_getEi();
	var expType = "0";//默认导出直属模板
	var path = document.getElementById("path").value;
	var expObj = document.getElementsByName("expType");
	for(var i=0;i<expObj.length;i++){
	    if(expObj[i].checked == true){
	       expType = expObj[i].value;
	    } 
	}
	info.set("path",path);
	info.set("expType",expType);
	info.set("inqu_status",0,"nodeId",ef.get("inqu_status-0-nodeId").value);
	info.set("inqu_status",0,"nodeType",ef.get("inqu_status-0-nodeType").value);
	
	var grid=efgrid.getGridObject("ef_grid_result");
	var rows=grid.getCheckedRows();
	var templateIds = "";
	if(rows.length>0){
		for(var i=0;i<rows.length;i++){
			var templateId=grid.getCellValue(rows[i],0,TYPE_DATA,true).trim();
			templateIds = templateIds+","+templateId;
		}
		info.set("templateIds",templateIds.substring(1,templateIds.length));
	}else{
		if(expType == "2"){
			alert("请选中需要导出的记录！");
			return;
		}
	}
	//调用导出进度标志
	ecsm08_modalWin.showProgressBar();
	ecsm08_isShow = true;
	EiCommunicator.send("ECSM08", "exportTemplate", info,exp_callback,false,true);
	
}

/*回调函数，下载文件*/
var exp_callback = {
onSuccess : function(eiInfo) {
	var zipFilePath = eiInfo.get("zipFilePath");
	if (zipFilePath != null && zipFilePath!="") {
	 document.getElementById("downloadObject").src=ef.get("url").value+"?efFormEname=ECAM0101&serviceName=ERBase&methodName=initLoad&fileurl="+encodeURI(encodeURI(zipFilePath));
	}else{
		alert(eiInfo.getMsg());
	}
	efwindow.hide();
	ecsm08_modalWin.hide();
},
onFail : function(eMsg) {
	alert("failure");
},
onExportFinish : function () {
		exportFinish();
	}
}

//隐藏导入导出进度标识
var exportFinish = function(){
	if(ecam01_isShow){
		ecsm08_modalWin.hide();
		ecsm08_isShow = false;
	}
};

//点击导出文章弹出框中的取消按钮
button_cancel2_onclick=function(){
  	efwindow.hide();
}

//点击导入模板弹出框中的取消按钮
button_cal_onclick=function(){
  	efwindow.hide();
}

button_import_onclick = function(){
	
	removeFileObj();
	var file2 = document.getElementById("file2");
	var fileObj=document.createElement('input');
	fileObj.type = "file";
	fileObj.name = "importFile";
	fileObj.id = "importFile";
	fileObj.contentEditable = false;
	
	if(!file2.hasChildNodes()){
		file2.appendChild(fileObj);
	}
	//显示出导出文章 选择项的图层
	efwindow.show(null,"importTemplate","center");
}
//执行导入
button_imp_onclick=function(){
	var importFile = document.getElementById('importFile').value;
	var suffix = importFile.substring(importFile.length-3,importFile.length);
	if(suffix.toLowerCase()!='zip'){
		alert('请上传zip文件！');
		return false;
	}else{
		//调用导出进度标志
		ecsm08_modalWin.showProgressBar();
		ecsm08_isShow = true;
		var nodeId = ef.get("inqu_status-0-nodeId").value;
		var nodeType = ef.get("inqu_status-0-nodeType").value;
		
	    ef.get("ECSM08").action = "./EC/SM/ECSM0803.jsp?nodeId="+nodeId+"&nodeType="+nodeType;
		ef.get("ECSM08").target = "importFrame";
		document.form1.submit();
	}
}

function uploadTemplatecallBack(msg) {
    ecsm08_modalWin.hide();
	efwindow.hide();
	document.getElementById("importFrame").src="";
	document.form1.target = "_self";
	alert(msg);
	efgrid.submitInqu( "ef_grid_result", "ec","ECSM08","query");
}

//移除页面FILE控件，待相应DIV显示的时候再动态添加，以免冲突
function removeFileObj(){
	var f = document.getElementById("file1");      
	var childs = f.childNodes;    
	for(var i = childs.length - 1; i >= 0; i--) {      
	    //alert(childs[i].nodeName);      
	    f.removeChild(childs[i]);      
	}   

	 f = document.getElementById("file2");      
	 childs = f.childNodes;    
	 for(var i = childs.length - 1; i >= 0; i--) {      
	    //alert(childs[i].nodeName);      
	    f.removeChild(childs[i]);      
	}   
}







