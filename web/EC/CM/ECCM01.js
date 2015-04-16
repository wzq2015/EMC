var tableTreeModel =  new eiTreeModel('ECCM04');
efform_onload = function ()
{
  var type=ef.get("inqu_status-0-parentType").value;
//  if(type=='')
//     setFalseButton();
}	

function setFalseButton(){
//  efbutton.setButtonStatus("insert", false);
//  efbutton.setButtonStatus("merge",false);
//  efbutton.setButtonStatus("transfer",false);
//  efbutton.setButtonStatus("updatecolumn",false);
}

function setTrueButton(){
//  efbutton.setButtonStatus("insert", true);
//  efbutton.setButtonStatus("merge",true);
//  efbutton.setButtonStatus("transfer",true);
  
}
  
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}
var treeNode;
function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
  if(node.depth() == 1) {
    node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }else if(node.depth()>1){
     node.icon("EF/Images/eftree_file.png");
    node.openIcon("EF/Images/eftree_file.png");
  }   
}

function treeNodeClicked(node){

var selfAble = (node._label).split("@")[3];
	  if(selfAble=="false"){
	  	 ef.get("inqu_status-0-parentType").value = '0';
	     alert("没有权限，不允许访问!");
	     setFalseButton();
	     efbutton.setButtonStatus("updatecolumn",false); 
	     return ;
	  }
   treeNode=node;
   var label=node._label;
   
   var type=[];
   var parentType;
   var parentId
   type=label.split('@');
  
   if(type.length>=2){
   parentId=type[1];
   parentType=type[0];
   }
    
   if(parentType=='site')
     parentType='0';
     else if(parentType=='column')
     parentType='1';
    
   ef.get("inqu_status-0-parentId").value=parentId;  
   ef.get("inqu_status-0-parentType").value=parentType;
   ef.get("columnInfo").value=label;
    
   
   var type=ef.get("inqu_status-0-parentType").value;
   if(type!='')
     setTrueButton();
   if(type=='0')
     efbutton.setButtonStatus("updatecolumn",false); 
   if(type=='1')
    efbutton.setButtonStatus("updatecolumn",true);
    efgrid.submitInqu( "ef_grid_result", "ec","ECCM01","query");
}


/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () {
   var parentId = ef.get("inqu_status-0-parentId").value;  
   //EC04页面参数
   var nodeId = ef.get("nodeId").value;
   if(nodeId!=null ){
   		parentId = nodeId;
   }
   if(parentId==''){
   		alert("请在站点栏目树上选择节点后执行查询！");
   		return;
   }
   efgrid.submitInqu( "ef_grid_result", "ec","ECCM01","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要删除的记录！");
  		return ;
  	}
  	if(!confirm("是否要删除选中栏目？"))
  	{
  		return;
  	}
  	//efgrid.submitForm( "ef_grid_result", "ec","ECCM01","moveToRecycleBin",true);//栏目回收站功能(暂不做的需求)
  	
	efgrid.submitForm( "ef_grid_result", "ec","ECCM01","moveToRecycleBin", true,false,true );
  	efgrid.submitForm( "ef_grid_result", "ec","ECCM01","delete", true,false,true );
  	if(ajaxEi!=null){
  	  if(ajaxEi.get("tag")=="true"){
  	  alert("栏目下有文章(包括回收站中的文章)或者子栏目，不允许删除该栏目！");
  	  }else{
  	  	parent.parent.onSiteListChange();
  	  	// parent.parent.nTree.reload(parent.parent.nTree._model);
  	  }
  	}
}
/*
	增量发布栏目
*/
button_increrelease_onclick = function (){
	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要增量发布的栏目！");
  		return ;
  	}
  	
  	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
  	
  	document.getElementById("hdIsIncre").value="true";
	efgrid.submitForm( "ef_grid_result", "ec","ECSM01","releaseColumnList", true,false); 
	if(ajaxEi!=null){	
		var msg=ajaxEi.getMsg();
		alert(msg);
	}   
} 

//完全发布
button_release_onclick=function(){
	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要完全发布的栏目！");
  		return ;
  	}
  	
  	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
  	
    efgrid.submitForm( "ef_grid_result", "ec","ECSM01","releaseColumnList", true,false);  
    if(ajaxEi!=null){
  		var msg=ajaxEi.getMsg();
		alert(msg);  
	}  
}

//发布首页
button_releasemain_onclick=function(){
  	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要发布首页的栏目！");
  		return ;
  	}
  	
  	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
  	
	document.getElementById("hdIsMainOnly").value="true";
	efgrid.submitForm( "ef_grid_result", "ec","ECSM01","releaseColumnList", true,false); 
	if(ajaxEi!=null){
  		var msg=ajaxEi.getMsg();
		alert(msg);
	}  
}

/*
  点击新增按钮后调弹出层 [新增栏目]
*/
button_insert_onclick = function () 
{
	efform.clearDiv("detail");
	btnDisabled();//模板按钮设为不可用
	changeJobType(0);
	setRadioValue("d-0-jobType",0);//默认选中不配置计划
    efwindow.show(null,"detail","center");

	document.getElementById("d-0-flag").value="insert";
	var siteId = document.getElementById("inqu_status-0-siteId").value;
	var parentId = document.getElementById("inqu_status-0-parentId").value;
	document.getElementById("d-0-siteId").value = siteId;
	document.getElementById("d-0-parentId").value = parentId;
	document.getElementById("d-0-siteName").value=document.getElementById("inqu_status-0-siteName").value;
	document.getElementById("d-0-parentName").value=document.getElementById("inqu_status-0-parentName").value;

	ef.get("d-0-firsetLevelColumn").value = "false";
	if(siteId == parentId){
		//站点下第一级新增栏目时选择栏目模版或文章模版情况
		ef.get("d-0-firsetLevelColumn").value = "true"; 
	}	
	
	var nodeId = document.getElementById("nodeId").value;
	ef.get("templatelink_nodeId").value = nodeId;  //选择模版时所需要的栏目Id
	
	document.getElementById("columnModel").style.display = "";
	document.getElementById("articleModel").style.display = "";
	document.getElementById("columnModel1").style.display = "";
	document.getElementById("articleModel1").style.display = "";
}

/*
  点击保存按钮后调用后台的serviceECSM
*/
button_save_onclick = function () 
{
	if(checkColumnInfo()==true){
	
		if(!confirm("是否保存当前数据？"))
		{
			return false;
		}
		if(ef.get("d-0-columnCategory").value!='00'){
			//当栏目类型改成非普通栏目时删除相关联的模版
			var info = new EiInfo();
			info.set("objId",ef.get("templatelink_nodeId").value); //节点编号
			var nodeType; 
			var templateTypeId;
			for(var i=0;i<2;i++){
				if(i%2=='0'){
					templateTypeId = 1;
					nodeType = 1;
					info.set("templateTypeId",templateTypeId);//模板类型标识
					info.set("objType",nodeType); //节点类型
				}else{
					templateTypeId = 3;
					nodeType = 2;				
					info.set("templateTypeId",templateTypeId);//模板类型标识
					info.set("objType",nodeType); //节点类型
				}
				EiCommunicator.send( "ECTM05", "undoIns" , info, null );
			}
		}
	    var jobType = getRadioValue("d-0-jobType");
		changeTimeValue(jobType);
		var method = document.getElementById("d-0-flag").value;
		//efgrid.submitForm( "ef_grid_result", "ec","ECCM01",method,true );
		
		var info = new EiInfo();
		info.setByNode("ef_region_detail");
		info.set("inqu_status",0,"parentId",document.getElementById("inqu_status-0-parentId").value);
		info.set("inqu_status",0,"parentType",document.getElementById("inqu_status-0-parentType").value);
		info.set("inqu_status",0,"siteId",document.getElementById("inqu_status-0-siteId").value);
		
		EiCommunicator.send( "ECCM01", method , info , ajax_callback_saveinsertcolumn );
	}
}

ajax_callback_saveinsertcolumn ={
	onSuccess :
   		function(eiInfo)
		{
			if(ajaxEi.getStatus()==-1){
				var msg=ajaxEi.getMsg();
				alert(msg);
			}else{
				efwindow.hide();
				parent.parent.onSiteListChange();
			}
   		},
 		onFail:
   		function(eMsg)
		{
   			alert("保存失败，原因："+eMsg);
		}
};
//验证栏目信息字段是否为空
function checkColumnInfo(){
	if(ef.get("d-0-columnName").value==""){
		alert("栏目名称不能为空!");
		return false;
	}
	
	if(ef.get("d-0-columnSeq").value==""){
		alert("栏目序号不能为空!");
		return false;
	}
	
	if(ef.get("d-0-columnCategory").value==""){
		alert("栏目类型不能为空!");
		return false;
	}
	
	if(ef.get("d-0-columnAlias").value==""){
		alert("存放位置不能为空!");
		return false;
	}
	return true;
}

//保存前调整清理时间信息
changeTimeValue=function(value){
	if(value=="1")
	{
		document.getElementById("d-0-jobStartHour").value = document.getElementById("d-0-jobStartHour1").value;
		document.getElementById("d-0-jobStartMin").value = document.getElementById("d-0-jobStartMin1").value;
		document.getElementById("d-0-jobEndHour").value = "";
		document.getElementById("d-0-jobEndMin").value = "";
		document.getElementById("d-0-jobIntervalHour").value = "";
		document.getElementById("d-0-jobIntervalMin").value = "";
	}else
	if(value=="2")
	{
		/*document.getElementById("d-0-jobStartHour").value = "";
		document.getElementById("d-0-jobStartMin").value = "";
		document.getElementById("d-0-jobEndHour").value = "";
		document.getElementById("d-0-jobEndMin").value = "";
		document.getElementById("d-0-jobIntervalHour").value = "";
		document.getElementById("d-0-jobIntervalMin").value = "";*/
	}else
	{
		document.getElementById("d-0-jobStartHour").value = "";
		document.getElementById("d-0-jobStartMin").value = "";
		document.getElementById("d-0-jobEndHour").value = "";
		document.getElementById("d-0-jobEndMin").value = "";
		document.getElementById("d-0-jobIntervalHour").value = "";
		document.getElementById("d-0-jobIntervalMin").value = "";
	}
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要修改的记录！");
  		return ;
  	}
	efgrid.submitForm( "ef_grid_result", "ec","ECCM01","update",true );
	if(treeNode!=undefined)
	treeNode.reload();
}

/*
  点击合并按钮后调用后台的service
*/
button_merge_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var rows=grid.getCheckedRows();
	if(rows.length <= 1){
     alert("选中的栏目少于两个,不能合并");
     return;
     }
    
    var value = new Array();
    for( var i=0; i< rows.length;i++ ){
    value[i]=grid.getCellValue(rows[i],0,TYPE_DATA,true); 
    }  
   ef.get("columns").value=value;
   efwindow.show(null,"checkContent","center");
   //alert(ef.get("columns").value);
}
//点击合并弹出框中的取消按钮
button_cancel_onclick=function(){
  efwindow.hide();
}
//点击合并弹出框中的确定按钮
button_confirm_onclick=function(){
    var value=ef.get("column_name").value.trim();
    var value2=ef.get("column_alias").value.trim();
    if(value!=''&& value2!='')
    {	
     if(efvalidateDiv("ef_region_check")){
        ef.get("column_name").value=value; 
        ef.get("column_alias").value=value2; 
        efgrid.submitForm( "ef_grid_result", "ec","ECCM01","merge",true);
        ef.get("column_name").value=''
        ef.get("column_alias").value=''
        efwindow.hide();
        treeNode.reload();
       }
   }
	else if(value='')
		{
	   alert("请输入新栏目名称");
	   return;
	   }
	 else 
	 {
	 alert("请输入新栏目存放位置");
	 
	 }
}
/*
  点击转移按钮后调用后台的service
*/
button_transfer_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var rows = grid.getCheckedRows(); 
	if(rows.length < 1){
     alert("请选中需要转移的栏目");
     return;
     }
    //得到columnID值；
    var value = new Array();
    for( var i=0; i< rows.length;i++ ){
    value[i]=grid.getCellValue(rows[i],0,TYPE_DATA,false);
    } 
    if(value!= null) {
      var childWindow = efform.openNewForm('ECCM02', "serviceName=ECCM01&methodName=initLoad&columnId=" + value);
      childWindow.focus();
    }
}
efform_onPopupReturn = function(winId, returnValue)
{
  if(returnValue=="0"){
  efgrid.submitInqu( "ef_grid_result", "ec","ECCM01","query");
 // debugger;
  parent.parent.nTree.reload(parent.parent.nTree._model);
  }
}

/*
  点击修改当前栏目按钮后调用后台的service
*/
button_updatecolumn_onclick = function () 
{
     //得到当前栏目节点的值     
      var parentId=ef.get("inqu_status-0-parentId").value;
     //alert(parentId);
     // 弹出新窗口;
     if(parentId!= null) {
      var childWindow = efform.openNewForm('ECCM05', "serviceName=ECCM05&methodName=query&result-0-columnId=" + parentId);
      childWindow.focus();
    }
}
//渲染上传、查看按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
	if(grid_id=="ef_grid_result"){
		var grid = efgrid.getGridObject( "ef_grid_result" );
		
		var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
		if(columnEname=="uploadColumnImg"){
			var columnId=grid.getCellValue(row_index,0,TYPE_DATA,false);
			var jobType=grid.getCellValue(row_index,0,TYPE_DATA,true);
			
			var button = "<div align='center' efval=''>";
			button +="<input value='修改' class='buttonclass' type='button' align='center' onclick='efgrid_editClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+jobType+"\")'>";
			button +="<input value='上传图片' class='buttonclass' type='button' align='center' onclick='uploadColumnImg(\""+columnId+"\","+row_index+","+col_index+")'>";
			button +="<input value='查看图片' class='buttonclass' type='button' align='center' onclick='viewColumnImg("+row_index+")'>";
			//button +="<input value='设置模板' class='buttonclass' type='button' align='center' style='display:none;' onclick='efgrid_onTemplateLinkClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\")'>";
			button +="<input value='预览' class='buttonclass' type='button' align='center' onclick='viewColumn(\""+columnId+"\")'>";
			button += "</div>" ;
			return button
		}
	}
}

//点击设置按钮相关操作
efgrid_onTemplateLinkClick = function(grid_id,row_index,col_index)
{
	if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var columnId=grid.getCellValue(row_index,0,TYPE_DATA,false);
     //隐藏域赋值，获取复制站点的ID
     ef.get("templatelink_nodeId").value = columnId;
     
     var info = new EiInfo();
	 info.set("objId",columnId);
	 info.set("objType",1);
	 EiCommunicator.send( "ECTM05", "getIns" , info, null );
	 
	 if(ajaxEi!=null){
	    ef.get("templateInsId1").value=check(ajaxEi.get("templateInsId2"));
	    ef.get("templateInsId3").value=check(ajaxEi.get("templateInsId4"));
	    
	    ef.get("templateInsName1").value=check(ajaxEi.get("templateInsName2"));
	    ef.get("templateInsName3").value=check(ajaxEi.get("templateInsName4"));
	    
	    ef.get("ColumnTemplatePreview").value = check(ajaxEi.get("templateInsName2"));
	    ef.get("ArticleTemplatePreview").value = check(ajaxEi.get("templateInsName4"));
	 }
     efwindow.show(null,"templatelink","center");
   }
}

/*预览栏目*/
function viewColumn(columnId){
	var info = new EiInfo();
	info.set("columnId",columnId);
	EiCommunicator.send( "ECCM01", "viewColumn" , info, null );
	var url=ajaxEi.get("url");
	window.open(url); 	
}
/*上传图片*/
function uploadColumnImg(columnId,row_index,col_index){
	var grid = efgrid.getGridObject( "ef_grid_result" );
	if(grid.isNewLine(row_index)){
		alert("请保存栏目后，再上传图片！");
	}else{
		//打开上传图片页面,上传图片
		var url = "./EC/DM/ECDM0105.jsp?columnId="+columnId;
		var fileId = window.showModalDialog(url,null,"dialogWidth:350px;dialogHeight:230px;");
		var index1 = fileId.lastIndexOf("/");
		var index2 = fileId.lastIndexOf("_");
		var fid = fileId.substring(index1+1,index2);
		//alert(fid);
		if(fid){
			/*保存上传后的文件名到COLUMN_IMG列*/
			
			var info=new EiInfo();
			info.set("columnId",columnId);
			info.set("columnImg",fid);
			EiCommunicator.send( "ECCM01", "updateColumnImg" , info, null );
			/*上传成功,设置columnImg隐藏列的值为新图片名*/
			if(ajaxEi){
				if(ajaxEi.getStatus()==1){
					grid.getBlockData().setCell( row_index, "columnImg", fid);
					grid.refreshCell(row_index,col_index+1,TYPE_DATA);
				}
			}
		}
	}
}
//FCK显示框
function FCKShowDialog(pagePath, args, width, height)
{	
	return showModalDialog(pagePath, args, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;scroll:no;status:no");
}
/*查看图片*/
function viewColumnImg(row_index){
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var columnImg=grid.getCellValue(row_index,5,TYPE_DATA,true);
	if(grid.isNewLine(row_index)||(!columnImg)){
		alert("还未上传图片，请上传后再查看");
	}else{
		var info=new EiInfo();
		info.set("fileId",columnImg);
		EiCommunicator.send( "ECDM01", "getFilePath" , info, null );
		
		if(ajaxEi!=null){
			var filePath = ajaxEi.get("filePath");
			window.open("./EC/DM/ECDM0103.jsp?filePath="+filePath);
			
		}
		
	}
}

//点击修改弹出修改内容[修改模板]
efgrid_editClick = function(grid_id,row_index,col_index,jobType)
{
	btnUnDisabled();//模板按钮设为可用
	bindForm("result",row_index,"ECCM01","d-0-");
	setRadioValue("d-0-jobType",jobType);
	if(" "==document.getElementById("d-0-jobStartHour").value)
		document.getElementById("d-0-jobStartHour").value = "";
	if(" "==document.getElementById("d-0-jobStartMin").value)
		document.getElementById("d-0-jobStartMin").value = "";
	if(" "==document.getElementById("d-0-jobEndHour").value)
		document.getElementById("d-0-jobEndHour").value = "";
	if(" "==document.getElementById("d-0-jobEndMin").value)
		document.getElementById("d-0-jobEndMin").value = "";
	if(" "==document.getElementById("d-0-jobIntervalHour").value)
		document.getElementById("d-0-jobIntervalHour").value = "";
	if(" "==document.getElementById("d-0-jobIntervalMin").value)
		document.getElementById("d-0-jobIntervalMin").value = "";
	document.getElementById("d-0-jobStartHour1").value = "";
	document.getElementById("d-0-jobStartMin1").value = "";
	if(jobType=="1")
	{
		document.getElementById("d-0-jobStartHour1").value = document.getElementById("d-0-jobStartHour").value;
		document.getElementById("d-0-jobStartMin1").value = document.getElementById("d-0-jobStartMin").value;
		document.getElementById("d-0-jobStartHour").value = "";
		document.getElementById("d-0-jobStartMin").value = "";
	}
	document.getElementById("d-0-flag").value="update";
	document.getElementById("d-0-siteId").value=document.getElementById("inqu_status-0-siteId").value;
	document.getElementById("d-0-siteName").value=document.getElementById("inqu_status-0-siteName").value;
	document.getElementById("d-0-parentId").value=document.getElementById("inqu_status-0-parentId").value;
	document.getElementById("d-0-parentName").value=document.getElementById("inqu_status-0-parentName").value;
    var jobType = getRadioValue("d-0-jobType");
    changeJobType(jobType);
    
    var nodeId = document.getElementById("d-0-columnId").value;
    ef.get("templatelink_nodeId").value = nodeId;  //选择模版时所需要的栏目Id
    
    clear();//清空
    for(var i=0;i<2;i++){
		var info = new EiInfo(); //将栏目首页模版值绑定到页面上
		info.set("objId",nodeId); //节点编号
		var nodeType = 1; 
		var templateTypeId;
		for(var i=0;i<2;i++){
			if(i%2=='0'){
				templateTypeId = 1; //0:站点首页模板1:栏目首页模板2:栏目列表模板3:文章显示模板
				//nodeType = 1; //0:站点 1：栏目 2：文章
				info.set("templateTypeId",templateTypeId);//模板类型标识
				info.set("objType",nodeType); //节点类型
			}else{
				templateTypeId = 3;
				//nodeType = 1; 
				info.set("templateTypeId",templateTypeId);
				info.set("objType",nodeType);
			}
			EiCommunicator.send( "ECTM03", "getTemplateFileName" , info, null );
			
			if(ajaxEi!=null){
				templateInsId = ajaxEi.get("templateInsId");
				templateInsName = ajaxEi.get("templateInsName");
				if(i%2=='0'){
					//绑定栏目模版实例名称
					document.getElementById("templateInsId1").value = templateInsId;//预览时需要的模板实例ID 
					document.getElementById("ColumnTemplatePreview").value = templateInsName;
					document.getElementById("templateInsName1").value = templateInsName;
				}else{
					//绑定栏文章模版实例名称
					document.getElementById("templateInsId3").value = templateInsId;//预览时需要的模板实例ID
					document.getElementById("ArticleTemplatePreview").value = templateInsName;
					document.getElementById("templateInsName3").value = templateInsName;
				}
			}	
		}
    }
    
    if(ef.get("d-0-columnCategory").value!='00'){
		document.getElementById("columnModel").style.display = "none";
		document.getElementById("articleModel").style.display = "none";
		document.getElementById("columnModel1").style.display = "none";
		document.getElementById("articleModel1").style.display = "none";
	}else{
		document.getElementById("columnModel").style.display = "";
		document.getElementById("articleModel").style.display = "";
		document.getElementById("columnModel1").style.display = "";
		document.getElementById("articleModel1").style.display = "";
	}
    efwindow.show(null,"detail","center");
}

function  clear(){
	document.getElementById("templateInsId1").value = "";
	document.getElementById("ColumnTemplatePreview").value = "";
	document.getElementById("templateInsId3").value = "";
	document.getElementById("ArticleTemplatePreview").value = "";
}

/*将eiInfo中的值绑定到form*/
function bindForm(blockName,rowId,formId,prefixId){
	grid = efgrid.getGridObject( "ef_grid_result" );
	row= grid.getRowData(rowId);
	var prefix = prefixId;
	
	for (node in row){
		var eleName = prefix+node;
		try{
			document.getElementById(eleName).value=row[node];
		}catch(e)
		{
		}
    }
}

/*
  撤销栏目列表模板实例
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
	return typeof(value)=="undefined"?"":value;
}

//设置模板按钮相关操作
function selectTemplate(preObjectId,templateTypeId)
{
	 //var grid=efgrid.getGridObject("ef_grid_result");
     var nodeId=ef.get("templatelink_nodeId").value;
     //alert(nodeId);
     /*if(ef.get("d-0-firsetLevelColumn").value=="true"){
     	var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=s" +"&objType=0"); //objType节点类型 0 站点 1 栏目 2 文章
     }else{
    	var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=c" +"&objType=1"); //objType节点类型 0 站点 1 栏目 2 文章
	 }*/
     var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=c" +"&objType=1"); //objType节点类型 0 站点 1 栏目 2 文章
     childWindow.focus();  
}

//选择模板实例按钮相关操作:栏目模版
function selectTemplateIns(preObjectId,templateTypeId)
{
	var nodeId = ef.get("templatelink_nodeId").value;
 	var childWindow = efform.openNewForm('ECSM0102', "nodeId="+ nodeId + "&nodeType=c&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=1");
     childWindow.focus();
}

button_close_onclick=function()
{
	efwindow.hide();
}

button_close1_onclick=function()
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
	
	var nodeType="c";
	
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
	
	var nodeType="c";
	
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


/*将eiInfo中的值绑定到form*/
function bindForm(blockName,rowId,formId,prefixId){
	grid = efgrid.getGridObject( "ef_grid_result" );
	row= grid.getRowData(rowId);
	var prefix = prefixId;
	
	for (node in row){
		var eleName = prefix+node;
		try{
			document.getElementById(eleName).value=row[node];
		}catch(e)
		{
		}
    }
}

function getRadioValue(name) 
{ 
	l=document.getElementsByName(name) 
	for(i=0;i<l.length;i++) 
	{ 
		if(l[i].checked) return l[i].value;
	} 
} 

function setRadioValue(name,value) 
{ 
	l=document.getElementsByName(name) 
	for(i=0;i<l.length;i++) 
	{ 
		if(i==value){
			l[i].checked = true;
		}else{
			l[i].checked = false;
		}
	} 
} 

//选择发布定时类型时显示对应时间
changeJobType=function(value){
	if(value=="1")
	{
		document.getElementById("jt1").style.display = "";
		document.getElementById("jt2").style.display = "none";
		document.getElementById("jt3").style.display = "none";
		document.getElementById("jt4").style.display = "none";
	}else
	if(value=="2")
	{
		document.getElementById("jt1").style.display = "none";
		document.getElementById("jt2").style.display = "";
		document.getElementById("jt3").style.display = "";
		document.getElementById("jt4").style.display = "";
	}else
	{
		document.getElementById("jt1").style.display = "none";
		document.getElementById("jt2").style.display = "none";
		document.getElementById("jt3").style.display = "none";
		document.getElementById("jt4").style.display = "none";
	}
}

selectConClick=function(){
	var retrievalConditionMode = document.getElementById("d-0-retrievalConditionMode").value;
	var columnId = document.getElementById("d-0-columnId").value;
	var context=ef.get("context").value;
	var url=context+"/DispatchAction.do?efFormEname=ECCM08&columnId="+columnId+"&retrievalType=1&retrievalConditionMode="+retrievalConditionMode;
	var data = showModalDialog(url, "","dialogHeight: 450px; dialogWidth: 600px; center: Yes; help: No; status: No; resizable:yes;edge unken");
	if(data){
		document.getElementById("d-0-retrievalConditionSql").value=data.retrievalConditionSql;
		document.getElementById("d-0-retrievalConditionMode").value=data.retrievalConditionMode;
	}
}

orderConClick=function(){
	var columnId = document.getElementById("d-0-columnId").value;
	var context=ef.get("context").value;
	var url=context+"/DispatchAction.do?efFormEname=ECCM0801&serviceName=ECCM08&methodName=query&columnId="+columnId+"&retrievalType=2";
	var data = showModalDialog(url, "","dialogHeight: 850px; dialogWidth: 1000px; center: Yes; help: No; status: No; resizable:yes;edge unken");
	if(data){
		var orderCondition = data.orderCondition;
		document.getElementById("d-0-orderCondition").value=orderCondition;
	}
}

//新增栏目时将模板按钮设为不可用
function btnDisabled(){
	document.getElementById("ColumnTemplate").disabled="true";
	document.getElementById("undoColumnTemplate").disabled="true";
	document.getElementById("previewColumnTemplate").disabled="true";
	
	document.getElementById("ArticleTemplate").disabled="true";
	document.getElementById("undoArticleTemplate").disabled="true";
	document.getElementById("previewArticleTemplate").disabled="true";
}
//修改时模板按钮设为可用状态
function btnUnDisabled(){
	document.getElementById("ColumnTemplate").disabled="";
	document.getElementById("undoColumnTemplate").disabled="";
	document.getElementById("previewColumnTemplate").disabled="";
	
	document.getElementById("ArticleTemplate").disabled="";
	document.getElementById("undoArticleTemplate").disabled="";
	document.getElementById("previewArticleTemplate").disabled="";
}
