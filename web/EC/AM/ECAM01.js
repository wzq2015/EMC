//上传下载 进度 标志 对象
var ecam01_modalWin;
var ecam01_isShow;
var columnCategoryVal = null;
efform_onload = function ()
{
  	ef.get("inqu_status-0-columnId").value = parent.ef.get("inqu_status-0-columnId").value;
     //创建 进度窗口
     ecam01_modalWin  = new EFModalWindow('ecam01_progressWindow');
     ecam01_isShow = false;
     columnCategoryVal = parent.document.getElementById("inqu_status-0-columnCategory").value;
 	 setButtonStatus();
}	

function setButtonStatus(){
	//alert(columnCategoryVal);
	if(columnCategoryVal!="00"){
		efbutton.setButtonStatus("export", false);
		efbutton.setButtonStatus("import", false);
		efbutton.setButtonStatus("insert", false);
		efbutton.setButtonStatus("update", false);
		efbutton.setButtonStatus("submit", false);
		efbutton.setButtonStatus("delete", false);
		efbutton.setButtonStatus("authorize", false);
		efbutton.setButtonStatus("transfer", false);
		efbutton.setButtonStatus("publish", false);
		efbutton.setButtonStatus("recall", false);
		efbutton.setButtonStatus("refer", false);
		efbutton.setButtonStatus("history", false);
		efbutton.setButtonStatus("recycle", false);
	}
}

//-----隐藏导入导出进度标识
var exportFinish = function(){
	if(ecam01_isShow){
		ecam01_modalWin.hide();
		ecam01_isShow = false;
	}
};


//将引用的文章信息用红色标记出来
efgrid_onGridDisplayReady=function(div_node)
{

  if(div_node.id=="ef_grid_result")
  {
     var grid=efgrid.getGridObject("ef_grid_result");
     var rowCount=grid.getRowCount();
     for(var i=0;i<rowCount;i++)
     {
       var isRefer=grid.getCellValue(i,0,TYPE_DATA,true).trim();

       if(isRefer.length>0)
         efgrid.setRowDisplayStyle(div_node.id,i,"show");
     }    
     }
     
}
checkIsRefer = function(){
	var grid=efgrid.getGridObject("ef_grid_result");
    var rows=grid.getCheckedRows();
    for(var i=0;i<rows.length;i++)
    {
      var isRefer=grid.getCellValue(rows[i],0,TYPE_DATA,true).trim();
      if(isRefer.length>0)
    	  return true;
    } 
	return false;
}

 

//把 新增 引用 、回收站、导出按钮置灰色
function setFalseButton(){
  efbutton.setButtonStatus("insert", false);
  efbutton.setButtonStatus("refer", false);
  efbutton.setButtonStatus("recycle", false);
  efbutton.setButtonStatus("export", false);//结果集下的导出按钮
  efbutton.setButtonStatus("import", false);//结果集下的导入按钮
}
//把 新增 引用 、回收站、导出按钮置为活动状态
function setTrueButton(){
  efbutton.setButtonStatus("insert", true);
   efbutton.setButtonStatus("refer", true);
   efbutton.setButtonStatus("recycle", true);
   efbutton.setButtonStatus("export", true);//结果集下的导出按钮
    efbutton.setButtonStatus("import", true);//结果集下的导入按钮
}
//渲染编辑按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      var grid = efgrid.getGridObject( "ef_grid_result" );
      var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      var value=grid.getCellValue(row_index,2,TYPE_DATA);
      var isRefer=grid.getCellValue(row_index,0,TYPE_DATA,true).trim();
      var state = grid.getCellValue(row_index,2,TYPE_DATA);
      if(columnEname=="edit"){ 
      	var button = "<div align='center' efval=''>";
      	if((columnCategoryVal=="00" || columnCategoryVal==null)&& !isRefer.length>0){
      		if(state=='10'||state=='20'){
      			button += "<input value='编辑' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>";  
      			button += "<input value='设置' class='buttonclass' type='button' align='center' onclick='efgrid_onTemplateLinkClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\")'>";
    		}    		
    	}
    	button += "<input value='预览' class='buttonclass' type='button' align='center' onclick='efgrid_onprivewClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>";	
    	
    	button += "</div>";
    	return button ;
      }
     
      }
}
//点击编辑按钮的相关操作
efgrid_onDataCellClick=function(grid_id,row_index,col_index,cell_value)
{
  
  if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var value=grid.getCellValue(row_index,2,TYPE_DATA,true); 
     
     var columnId=grid.getCellValue(row_index,1,TYPE_DATA,true);
    
     var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname(); 
      if(columnEname=="edit"){   

      var articleType= grid.getCellValue(row_index,2,TYPE_DATA); 
      //flag主要用于控制是否只读
      var flag;
      if(articleType=="10"||articleType=="20")
          flag="true";
          else
          flag="false";
      if(value.trim()!="") {
      var childWindow = efform.openNewForm('ECAM02', "serviceName=ECAM02&methodName=query&inqu_status-0-articleId=" + value+"&inqu_status-0-flag="+flag+"&inqu_status-0-columnId="+columnId);
      childWindow.focus();
      }
      }
      
      }
}
//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
//点击查询按钮
button_query_onclick = function () {
	var recCreateTimeStart=ef.get("inqu_status-0-recCreateTimeStart").value;
	var recCreateTimeEnd=ef.get("inqu_status-0-recCreateTimeEnd").value;
    if (recCreateTimeStart!=""&&recCreateTimeEnd!=""){
    if (recCreateTimeStart > recCreateTimeEnd){
    alert("开始日期,截止日期录入有误，请重新输入！");
    ef.get("inqu_status-0-recCreateTimeStart").value="";
    ef.get("inqu_status-0-recCreateTimeEnd").value="";
    return ;
   }
   }
   var nodeId = ef.get("nodeId").value;
   if(nodeId!=null && !nodeId=="")
   {
   		ef.get("inqu_status-0-columnId").value=nodeId;
   }

   	efgrid.submitInqu( "ef_grid_result", "ec","ECAM01","query");
}

button_insert_onclick = function () {

     var columnId=ef.get("inqu_status-0-columnId").value;
     var childWindow = efform.openNewForm('ECAM02',"inqu_status-0-flag=insert&inqu_status-0-columnId="+columnId);
     childWindow.focus();
}


button_update_onclick=function(){
	 var grid = efgrid.getGridObject( "ef_grid_result" );
   	 var rows=grid.getCheckedRows();
  	 if(rows.length==0){
  	 	 alert("请选择需要操作的记录！");
  		 return ;
  	 }

  	 if(checkState()){
     	efgrid.submitForm( "ef_grid_result", "ec","ECAM01","update",true);
     	alert("修改标识成功!");
     }else{
     	alert("文章状态为新稿和已否状态下的文章才可进行修改!");
     	efgrid.submitInqu( "ef_grid_result", "ec","ECAM01","query");
     	return false;
     }
}

//点击删除按钮
button_delete_onclick=function(){ 
    var  grid=efgrid.getGridObject("ef_grid_result");
    if(checkNullRow()){
     if(isReferOrCreate())
     	efgrid.submitForm( "ef_grid_result", "ec","ECAM01","delete",true);
     else
      	alert("只可删除引用文章或文章状态为新稿(已否)的文章");
      
    }     
}
function isReferOrCreate(){
   var grid=efgrid.getGridObject("ef_grid_result");
     var rows=grid.getCheckedRows();
     var articleType;
     var isRefer;
     var tag=true;   
     for(var i=0;i<rows.length;i++){
       articleType= grid.getCellValue(rows[i],2,TYPE_DATA); 
       isRefer=grid.getCellValue(rows[i],0,TYPE_DATA,true).trim();
       //新稿  或者 已否
       if(articleType!='10'&&articleType!='20'&&isRefer.length==0)
         tag=false; 
     }
     return tag;
}

//判断记录是否处于某一个状态
function checkState(){

  var grid=efgrid.getGridObject("ef_grid_result");
     var rows=grid.getCheckedRows();
     var articleType;
     var tag=false;
     var count=0;
     
     for(var i=0;i<rows.length;i++){
       	articleType= grid.getCellValue(rows[i],2,TYPE_DATA); 
     
       	if(articleType=='10'||articleType=='20'){
			count++; 
       	}

		if(count==rows.length){
			tag=true;
		}
     }
     return tag;
}


function checkRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
   if(rowCount>1)
     {
     alert("只能对一条记录进行操作");
     return false;
     }
     else if(rowCount==0){
      alert("请选择需要操作的记录！");
      return false;
     }
     else
      return true;
}
function checkNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择需要操作的记录！");
      return false;
     }
     else
      return true;
}

//点击历史按钮
button_history_onclick=function(){
   
   var grid = efgrid.getGridObject( "ef_grid_result" );
   var rows=grid.getCheckedRows();
   if(rows.length==0){
     	alert("请选择需要操作的记录！ ");
     	return;
     }else if(rows.length>1){
     	alert("只能选择一条记录进行操作！ ");
     	return;
     }
   var value=grid.getCellValue(rows[0],2,TYPE_DATA,true); 
   var title=grid.getCellValue(rows[0],0,TYPE_DATA);
   if(value.trim()!=''){
   var childWindow = efform.openNewForm('ECAM03', "serviceName=ECAM03&methodName=query&inqu_status-0-articleId=" + value+"&title="+encodeURI(title));
   childWindow.focus();
   }else
   alert('该文章不存在');
}

//点击发布按钮
button_publish_onclick=function(){
	if(checkIsRefer()){
		alert("不能将引用的文章发布!");
		return false;
	  }
  if(checkNullRow() && checkArticleState()){
  	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
  	efgrid.submitForm( "ef_grid_result", "ec","ECAM01","publish",true);
  }
}

//点击提交按钮
button_submit_onclick=function(){
  if(checkIsRefer()){
	  alert("不能提交引用的文章!");
	  return false;
  }
  if(checkNullRow()){
  //处于新稿或者已否状态
  if(checkState())
    efgrid.submitForm( "ef_grid_result", "ec","ECAM01","submit",true);
  else
    alert("状态为'新稿'或'已否'的文章才可进行提交!");
  	return false;
 }
    
}

//点击撤稿按钮
button_recall_onclick=function(){
	if(checkIsRefer()){
		alert("不能将引用的文章撤稿!");
		return false;
	  }
  if(checkNullRow()){
  	efgrid.submitForm( "ef_grid_result", "ec","ECAM01","recall",true);
  }
}

//点击引用按钮
 button_refer_onclick=function(){
   var columnId=ef.get("inqu_status-0-columnId").value;
   var childWindow = efform.openNewForm('ECAM04', "serviceName=ECAM01&methodName=query&inqu_status-0-referColumnId="+columnId+"&inqu_status-0-columnId=site");
     
 }
//点击回收站按钮
button_recycle_onclick=function(){
  var columnId=ef.get("inqu_status-0-columnId").value;
  var childWindow = efform.openNewForm('ECAM05', "serviceName=ECAM05&methodName=query&inqu_status-0-columnId="+columnId);
}
//点击批量授权按钮
button_authorize_onclick=function(){
  var grid=efgrid.getGridObject("ef_grid_result");
  if(authorizeCheckNullRow()){
  	if(checkState()){
    	var articleIdList = "";
    	var rows = grid.getSelectRowsData();
    	for( var i=0; i<rows.length; i++ ){
      	var row = rows[i];  
      	articleIdList = articleIdList+row["articleId"]+"#";
  		}
  		ef.get("inqu_status-0-articleIdList").value = articleIdList;
  	}
  	else{
  		alert("状态为'新稿'或'已否'的文章才可进行批量授权!");
  		return false;
  	}
  	efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
  } 
}

//回调函数
efform_onPopupReturn = function(winId, returnValue){
	if (winId == "ESUT10") {
		var tempArray = new Array();
  		var typeList = "";
  		var idList = "";
  		var descList = "";
  		for( var i=0; i<returnValue.length; i++ ){
    		var row = returnValue[i];  
    		typeList = typeList+row["clazz"]+"#";
    		idList = idList+row["id"]+"#";
    		descList = descList+row["name"]+"#";
  		}
  		ef.get("inqu_status-0-typeList").value = typeList;
  		ef.get("inqu_status-0-idList").value = idList;
  		ef.get("inqu_status-0-descList").value = descList; 
  		efgrid.submitForm("ef_grid_result", "EC","ECAM01","authorize", true );
  		//在db中增加数据
	}
	if (winId == "ECAM02"||winId == "ECAM05" || winId=="ECAM07") {
		efgrid.submitInqu( "ef_grid_result", "ec","ECAM01","query");
	}
	/*此段原自ECAM07调用,文章转移应不需要刷新树节点 
	if (winId == "ECAM01"){
		  if(returnValue=="0"){
  			efgrid.submitInqu( "ef_grid_result", "ec","ECAM01","query");
    		var nd = parent.parent.nTree.getCurrent();
  			if ( null == nd ){
  	  			nTree.reload(nTree._model);	 
  			} else {  	
	  			nd.reload();
			}  
  		}
  		ef.get("inqu_status-0-columnId").value=column;
	}*/
	if(winId == "ECAM0102"){
		ecam01_modalWin.hide();
		efwindow.hide();
		alert(returnValue);
		var nd = nTree.getCurrent();
		nd.reload();
	}
	
}

function authorizeCheckNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择需要授权的文章!");
      return false;
     }
     else
      return true;
}

//点击移动按钮,转移文章
button_transfer_onclick = function () {
    //为选择文章状态；
    var grid = efgrid.getGridObject( "ef_grid_result" );
	var rows = grid.getCheckedRows(); 
	if(rows.length < 1){
     alert("请选中需要移动的文章");
     return;
     }
     
    //取得articleId,columnId; 引用文章不能被转移；被引用文章不能转移；     
     var info = new EiInfo();
     var block=new EiBlock("result");
     info.addBlock( block );
     meta=new EiBlockMeta();
     column=new EiColumn("articleId");
     column.pos=0;
     meta.addMeta(column);
     
     column1=new EiColumn("articleTitle");
     column1.pos=1;
     meta.addMeta(column1);   
     block.setBlockMeta(meta);
    
     var articleStr = ""; 
    for( var i=0; i< rows.length;i++ ){
    isRefer=grid.getCellValue(rows[i],0,TYPE_DATA,true).trim();
    articleTiTle=grid.getCellValue(rows[i],0,TYPE_DATA).trim();
    if(isRefer.length>0)
    {  
       alert("文章["+articleTiTle+"]是引用文章不能转移！");
       return;
    }
    var articles = [];
    articleId=grid.getCellValue(rows[i],2,TYPE_DATA,true).trim(); 
    articleStr += articleId + ",";
    articles[0]=articleId;  
    articles[1]=articleTiTle; 
    block.addRow(articles);
    }
     
     var columnId=ef.get("inqu_status-0-columnId").value;
     info.set("columnId",columnId);   
     EiCommunicator.send( "ECAM01", "checkRefer" , info, null ); 
     if(ajaxEi!=null){
     var articleTitle=ajaxEi.get("articleTitle");
     if(articleTitle!=null){
     alert("存在对文章["+articleTitle+"]的引用");	
     return;
     }
     }
     var childWindow = efform.openNewForm('ECAM07',"serviceName=ECAM07&methodName=initLoad&articleStr="+articleStr);

   }
   
   
   /*
     ********************************* 加入文章的导出功能 start
   */
    //点击 文章维护页面结果集下的 导出 按钮
	button_export_onclick = function(){
	   //显示出导出文章 选择项的图层
	   efwindow.show(null,"exportArticle","center");
	   	  
	}
    
    //执行 导出
	button_exp_onclick=function(){
		var info=_getEi();
		var expType = "0";//默认导出直属文章
		var expObj = document.getElementsByName("expType");
		for(var i=0;i<expObj.length;i++){
		    if(expObj[i].checked == true){
		       expType = expObj[i].value;
		    } 
		}
		var webPath = document.getElementById("webPath").value;
		info.set("expType",expType);
		info.set("webPath",webPath);
		info.set("inqu_status",0,"columnId",ef.get("inqu_status-0-columnId").value);
		
		var grid=efgrid.getGridObject("ef_grid_result");
		var rows=grid.getCheckedRows();
		var articleIds = "";
		if(rows.length>0){
			for(var i=0;i<rows.length;i++){
				if(expType=="2"){//如果是点击导出选中的记录
					var isRefer = grid.getCellValue(rows[i],0,TYPE_DATA,true).trim();
					if(isRefer!=""){
						alert("引用的文章无法导出！");
						return;
					}
				}
				var articleId=grid.getCellValue(rows[i],2,TYPE_DATA,true).trim();
				articleIds = articleIds+","+articleId;
			}
			info.set("articleIds",articleIds.substring(1,articleIds.length));
		}else{
			if(expType == "2"){
				alert("请选中需要导出的记录！");
				return;
			}
		}
		//调用导出进度标志
		ecam01_modalWin.showProgressBar();
		ecam01_isShow = true;
		EiCommunicator.send("ECAM01", "export", info,exp_callback,false,true);
	}
	
	/*回调函数，下载文件*/
	var exp_callback = {
	onSuccess : function(eiInfo) {
		var zipFilePath = eiInfo.get("zipFilePath");
		if (zipFilePath != null && zipFilePath!="") {
			var exportMsg = eiInfo.get("exportMsg");
			if(exportMsg!=null){
				alert(exportMsg);
			}
			ef.get("downloadObject").src=ef.get("url").value+"?efFormEname=ECAM0101&serviceName=ERBase&methodName=initLoad&fileurl="+encodeURI(encodeURI(zipFilePath));
		}else{
			alert(eiInfo.getMsg());
		}
		efwindow.hide();
		ecam01_modalWin.hide();
	},
	onFail : function(eMsg) {
		alert("failure");
	},
	onExportFinish : function () {
			exportFinish();
		}
	}
  
    //点击导出文章弹出框中的取消按钮
	button_cancel_onclick=function(){
	  	efwindow.hide();
	}
    
    button_import_onclick = function(){
	   //显示出导出文章 选择项的图层
	   efwindow.show(null,"importArticle","center");
	}
	
	button_cancel2_onclick=function(){
	  	efwindow.hide();
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
			ecam01_modalWin.showProgressBar();
			ecam01_isShow = true;
			var columnId = ef.get("inqu_status-0-columnId").value;
			ef.get("ECAM01").action = "./EC/AM/ECAM0102.jsp?columnId="+columnId;
			document.forms[0].submit();
		}
	}
	
	function uploadArtilecallBack(msg) {
	        ecam01_modalWin.hide();
			efwindow.hide();
			ef.get("uploadArtilceIframe").src = "";
			alert(msg);
			efgrid.submitInqu( "ef_grid_result", "ec","ECAM01","query");
    }
    
   /*
      ********************************* 文章的导出功能 end
    */

    //点击设置按钮相关操作
efgrid_onTemplateLinkClick = function(grid_id,row_index,col_index)
{
	if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var columnId=grid.getCellValue(row_index,2,TYPE_DATA,true);
     //隐藏域赋值，获取文章ID
     ef.get("templatelink_nodeId").value = columnId;
     
     var info = new EiInfo();
	 info.set("objId",columnId);
	 info.set("objType",2);
	 EiCommunicator.send( "ECTM05", "getIns" , info, null );
	 
	 if(ajaxEi!=null){
	    
	    ef.get("templateInsId3").value=check(ajaxEi.get("templateInsId4"));
	    
	    ef.get("templateInsName3").value=check(ajaxEi.get("templateInsName4"));
	    
	    ef.get("ArticleTemplatePreview").value = check(ajaxEi.get("templateInsName4"));
	 }
     //alert(ef.get("templatelink_nodeId").value);
     efwindow.show(null,"templatelink","center");
   }
}

/*
  撤销文章模板实例
  textobj : 实例文本框对象名称
  templateTypeId：模板类型
  nodeType：节点类型
*/
function onUndoClick(textobj,templateTypeId,nodeType)
{	
	//alert(ef.get("templateInsName"+templateTypeId).value);
	if(ef.get("templateInsName"+templateTypeId).value==""){
		alert("没有可供撤销的模板实例！");
		return false;
	}
	if(confirm("是否确认撤销？")){
		var info = new EiInfo();
		
		//节点编号
		info.set("objId",ef.get("templatelink_nodeId").value); 
		//节点类型
		info.set("objType",nodeType); 
		//模板类型标识
		info.set("templateTypeId",templateTypeId);
		
		EiCommunicator.send( "ECTM05", "undoIns" , info, null );
		
		if(ajaxEi!=null){
			var returnValSeq = templateTypeId*1+1; //返回值序号
		    ef.get("templateInsId"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get("templateInsName"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get(textobj).value = check(ajaxEi.get("templateInsId"+returnValSeq));
		}
	}
}
function check(value){
	//alert(typeof(value)=="undefined");
	return typeof(value)=="undefined"?"":value;
}

//设置模板按钮相关操作
function selectTemplate(preObjectId,templateTypeId)
{
	var grid=efgrid.getGridObject("ef_grid_result");
     var nodeId=ef.get("templatelink_nodeId").value;
     //alert(nodeId);
     var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=a" +"&objType=2"); //objType节点类型 0 站点 1 栏目 2 文章
     childWindow.focus(); 
}

//选择模板实例按钮相关操作:文章模版
function selectTemplateIns(preObjectId,templateTypeId)
{
	var nodeId = ef.get("templatelink_nodeId").value;
 	var childWindow = efform.openNewForm('ECSM0102', "nodeId="+ nodeId + "&nodeType=a&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=2");
     childWindow.focus();
}

button_close_onclick=function()
{
	efwindow.hide();
}

previewTemplate = function (type,objType){
	//alert(document.getElementById("templateInsId"+type).value);
	//alert(document.getElementById("templateInsName"+type).value);
	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("templateInsId"+type).value;//document.getElementById("result4-0-templateInsId").value;
	if(insId == null || insId.trim() ==""){
		alert("没有可供设置的模版实例!");
		return false;
	}
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("templatelink_nodeId").value;//ef.get("inqu_status-0-objId").value;
	var objType = objType;//ef.get("inqu_status-0-objType").value;
	
	var nodeType="a";
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,type+1,"&mode=edit_1_plus_1");
	
		}
}
preview = function (type,objType){
	//alert(document.getElementById("templateInsId"+type).value);
	//alert(document.getElementById("templateInsName"+type).value);
	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("templateInsId"+type).value;//document.getElementById("result4-0-templateInsId").value;
	if(insId == null || insId.trim() ==""){
		alert("没有可供设置的模版实例!");
		return false;
	}
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("templatelink_nodeId").value;//ef.get("inqu_status-0-objId").value;
	var objType = objType;//ef.get("inqu_status-0-objType").value;
	
	var nodeType="a";
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,type+1,"");
	
		}
}
/*开窗通用方法*/
function open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,area,param){
	var url=filepath + templateTypeId +"/" + templateFilename + "?tempDefId="+templateDefId+ param +"&tempInsId="+insId+"&nodeId="+objId+"&nodeType="+nodeType+"&area="+area+"&imagespath=/"+filepath + templateTypeId +"/images";
	var url1=filepath + templateTypeId +"/" + templateFilename + "&tempDefId="+templateDefId+ param +"&tempInsId="+insId+"&nodeId="+objId+"&nodeType="+nodeType+"&area="+area+"&imagespath=/"+filepath + templateTypeId +"/images";

	window.open( "DispatchAction.do?efFormEname=ECTM0501&url="+url1,"模板设置","top=0,left=0,menubar=no,width="+screen.width+",height="+screen.availHeight+",scrollbars=yes,resizable=yes");
}

efgrid_onprivewClick = function(grid_id,row_index,col_index,cell_value){
	
      if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var value=grid.getCellValue(row_index,2,TYPE_DATA,true); 
     
     var columnId=grid.getCellValue(row_index,1,TYPE_DATA,true);
    
	   var artId = value;
  	
	
		var info = new EiInfo();
  		if(artId==""){
  			alert("文章必须新建后才允许预览！");
  			return;
  		}
		info.set("articleId",artId);
		EiCommunicator.send( "ECAM02", "viewArticle" , info, null );
		var url=ajaxEi.get("url");
		window.open(url); 		
	 		
	}  
}

checkArticleState = function(){
	var grid=efgrid.getGridObject("ef_grid_result");
	var siteArticleState = "";
	var columnId = document.getElementById("inqu_status-0-columnId").value;
	var info = new EiInfo();
	info.set("nodeId",columnId);
	info.set("nodeType","c")
	EiCommunicator.send( "ECCM01", "getSiteArticleStates" , info, null );
	if(ajaxEi!=null){
		siteArticleState = ajaxEi.get("siteArticleState");
	}
	
	var rows = grid.getCheckedRows(); 
	for(var i=0;i<rows.length;i++){
		var articleState = grid.getCellValue(rows[i],2,TYPE_DATA,false).trim();
		var articleTitle = grid.getCellValue(rows[i],0,TYPE_DATA,false).trim();
		if(articleState=="" || siteArticleState.indexOf(articleState,0)==-1){
			alert("文章["+articleTitle+"]的状态在所处站点下不允许发布！")
			return false;
		}
	}
	return true;
}