efform_onload = function ()
{
  ef.get("inqu_status-0-siteType").value=0;
}	

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ec","ECSM01","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
   	if(rows.length==0){
     	alert("请选中需要删除的记录！");
     	return;
    }

	if(!confirm("是否确认删除当前选中记录？")){
		return ;
	} 	
	efgrid.submitForm( "ef_grid_result", "ec","ECSM01","delete", true,false); 	
}

/*
  点击新增按钮后调用后台的serviceECSM
*/
button_insert_onclick = function () 
{  
  //  if(efvalidateDiv("ef_grid_result"))
	//efgrid.submitForm( "ef_grid_result", "ec","ECSM01","insert",true );
	btnSiteDisabled();//模板按钮不可用
	changeJobType(0);
	document.getElementById("d-0-flag").value="insert";
	efform.clearDiv("detailContent1");
	efwindow.show(null,"detailContent1","center");
	//文章默认待发布和已发布
	document.getElementById("statePublishing").checked = true;
	document.getElementById("stateRelease").checked = true;
	//按钮默认是预览提交保存可用
	document.getElementById("Preview").checked = true;
	document.getElementById("Save").checked = true;
	document.getElementById("Close").checked = true;
	//定时任务默认不配置
	document.getElementsByName("d-0-jobType")[0].checked = true;
	changeTimeValue(0);
}

/*
  点击新增按钮后调用后台的serviceECSM
*/
button_save_onclick = function () 
{
	if(checkColumnValue()== false){
		return ;
	}
	if(!confirm("是否保存当前数据？"))
	{
		return false;
	}
    var jobType = getRadioValue("d-0-jobType");
	changeTimeValue(jobType);
	var method = document.getElementById("d-0-flag").value;
	
	var str="";
	var btnBoxs = document.getElementsByName("chkBtnBox");

    for (var i=0;i<btnBoxs.length;i++ ){
		if(btnBoxs[i].checked){
			str=str+btnBoxs[i].value + "#";  
		}
    }
    var leg = str.length - 1;
    str = str.substring(0,leg);
    if (str == "") {
    	var sure1 = confirm("文章按钮设置为空，默认为'预览、保存、关闭'，是否继续？");
    	 if (!sure1) return false;
		 str = "01#02#03#"; //默认预览保存关闭 
    }
	document.getElementById("siteArticleButton").value=str;
	
	var chkstatus = document.getElementsByName("articlestates");
	var articleReleaseStates = "";
	for(var i=0;i<chkstatus.length;i++){
		if(chkstatus[i].checked==true)
			if(articleReleaseStates==""){
				articleReleaseStates = chkstatus[i].value;
			}else{
				articleReleaseStates += "," + chkstatus[i].value;
			}
	}
	if (articleReleaseStates == ""){
		 var sure2=confirm("文章状态为空，默认为'待发布，已发'，是否继续？");
		 if (!sure2) return false;
		 articleReleaseStates = "40,50"; //待发布，已发
	}
	document.getElementById("articleReleaseStates").value = articleReleaseStates;

	
	var info = new EiInfo();
	info.setByNode("ef_region_detail");
	EiCommunicator.send( "ECSM01", method , info, ajax_callback_save );
}

ajax_callback_save =
{
	onSuccess :
   		function(eiInfo)
		{
			if(eiInfo.getStatus()==-1){
				var msg=eiInfo.getMsg();
				alert(msg);
			}else{
				alert("保存成功!");
				efgrid.submitForm( "ef_grid_result", "ec","ECSM01","query", true); 	
			}
   		},
 		onFail:
   		function(eMsg)
		{
   			alert("保存失败，原因："+eMsg);
		}
};


//取消按钮
button_cancel1_onclick = function(){
	efwindow.hide();
}
/*校验*/
checkColumnValue = function (){
	if(ef.get("d-0-siteName").value.trim()==""){
		alert("请输入站点名称!");
		return false;
	};
	
	if(ef.get("d-0-siteAlias").value.trim()==""){
		alert("请输入存放位置!");
		return false;
	};

	if(ef.get("d-0-siteSeq").value.trim()==""){
		alert("请输入栏目序号!");
		return false;
	};
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
	efgrid.submitForm( "ef_grid_result", "ec","ECSM01","update",true );
}

/*
  点击文章查询按钮后调用后台的service
*/
button_display_onclick=function(){
   
   var grid = efgrid.getGridObject( "ef_grid_result" );
   var rows=grid.getCheckedRows();
   if(rows.length!=1){
     alert("请选中一条记录");
     return;
     }
   var value=grid.getCellValue(rows[0],0,TYPE_DATA); 
   
   var childWindow = efform.openNewForm('ECSM02', "serviceName=ECSM02&methodName=queryArticle&inqu_status-0-siteId=" + value);
   childWindow.focus();
}
/*
  点击明细设置操作按钮
*/
efgrid_detail_onclick = function(row_index)
{
	setCheckBoxFlase();
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var siteId=grid.getCellValue(row_index,0,TYPE_DATA);
	
	var info = new EiInfo();
	info.set("siteId",siteId);
	EiCommunicator.send( "ECSM01", "getSiteById" , info, ajax_bindBtn_refresh);
}
/*
  绑定checkbox
*/
ajax_bindBtn_refresh = {
      onSuccess : function(eiInfo){
		var articleBtn= eiInfo.get("siteArticleButton");

     	var btns = articleBtn.split("#");
		for(var i=0;i< btns.length;i++){
			if(btns[i]=="01")
				document.getElementById("Preview").checked = true;
			if(btns[i]=="02")
				document.getElementById("Save").checked = true;	
			if(btns[i]=="03")
				document.getElementById("Close").checked = true;		
			if(btns[i]=="04")
				document.getElementById("SaveSubmit").checked = true;		
			if(btns[i]=="05")
				document.getElementById("SaveCreate").checked = true;		
			if(btns[i]=="06")
				document.getElementById("SubmitCreate").checked = true;		
			if(btns[i]=="07")
				document.getElementById("SaveClose").checked = true;		
			if(btns[i]=="08")
				document.getElementById("SavePublish").checked = true;		
			if(btns[i]=="09")
				document.getElementById("ShenPi").checked = true;				
		}
		//efwindow.show(null,"stateoptions","center");
      },
      onFail: function(eMsg){
      	alert("failure");
      }
}
//清空多选框
function setCheckBoxFlase(){
	document.getElementById("Preview").checked = false;
	document.getElementById("Save").checked = false;
	document.getElementById("Close").checked = false;
	document.getElementById("SaveSubmit").checked = false;
	document.getElementById("SaveCreate").checked = false;
	document.getElementById("SubmitCreate").checked = false;
	document.getElementById("SaveClose").checked = false;
	document.getElementById("SavePublish").checked = false;	
	document.getElementById("ShenPi").checked = false;
}

/*
  点击保存按钮

button_saveOptions_onclick=function()
{
	var siteId=ef.get("d-0-siteId").value; 
	var str="";
	var btnBoxs = document.getElementsByName("chkBtnBox");

    for (var i=0;i<btnBoxs.length;i++ ){
		if(btnBoxs[i].checked){ 	
			str=str+btnBoxs[i].value + "#";  
		}
    }
    var leg = str.length - 1;
    str = str.substring(0,leg);
    
 	var info = new EiInfo();
	info.set("siteId",siteId);
	info.set("articleBtn",str);
	EiCommunicator.send( "ECSM01", "saveArticleBtn" , info, null);
	efwindow.hide();
}
*/

/*
  点击静态发布按钮后调用后台的service
*/
button_release_onclick=function(){

  	var grid = efgrid.getGridObject( "ef_grid_result" );
  	var rows=grid.getCheckedRows();
  	if(rows.length==0){
     	alert("请选中一条记录");
 		return;
    }
   	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
    var flag=1;
 	for(i=0;i<rows.length;i++){
		var isStaticRelease=grid.getCellValue(rows[i],6,TYPE_DATA);
		var isAnony=grid.getCellValue(rows[i],4,TYPE_DATA);
		if(isStaticRelease=="0" || (isAnony=="0")){
			flag=0;
		}
	}
	if (flag==1){
		efgrid.submitForm( "ef_grid_result", "ec","ECSM01","release", true,false); 
		alert("发布成功!");
		return;
	}
	else
		alert("所选站点中包含非静态访问或者非匿名访问站点，不能静态发布");
}

//渲染按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      	var grid = efgrid.getGridObject( "ef_grid_result" );
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      	var value=grid.getCellValue(row_index,2,TYPE_DATA);
      	var siteId=grid.getCellValue(row_index,0,TYPE_DATA);
      	var jobType=grid.getCellValue(row_index,2,TYPE_DATA,true);
      	if(columnEname=="option"){   
    		var optionButton= "<div align='center' efval=''>";
    			optionButton += "<input value='修改' class='buttonclass' style='width:60px;' type='button' align='center' onclick='efgrid_editClick(\""+row_index+"\",\""+jobType+"\")'>";
    			//optionButton += "<input value='复制' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
      			//optionButton += "<input value='设置' class='buttonclass' type='button' align='center' onclick='efgrid_onTemplateLinkClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
      			//optionButton += "<input value='明细操作设置' class='buttonclass' type='button' align='center' onclick='efgrid_detail_onclick(\""+row_index+"\")'>" ;
      			//optionButton += "<input value='文章状态' class='buttonclass' type='button' align='center' onclick='efgrid_articlestates_onclick(\""+row_index+"\")'>" ;
      			optionButton += "</div>" ;
      			return optionButton;
      	}
      	if(columnEname=="history"){   
    		return "\<input value='历史记录' class='buttonclass' type='button' align='center' onclick='historyDisp(\""+siteId+"\")'>" ;
      	}
      	if(columnEname=="deploy"){   
    		return "\<input value='站点分发' class='buttonclass' type='button' align='center' onclick='deployDisp(\""+siteId+"\")'>" ;
      	}
      }
}

//点击复制站点按钮的相关操作
efgrid_onDataCellClick=function(grid_id,row_index,col_index,cell_value)
{
  if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var columnId=grid.getCellValue(row_index,0,TYPE_DATA,true);
     //隐藏域赋值，获取复制站点的ID
     //alert(document.getElementById("siteId"));
     document.getElementById("_siteId").value = columnId;
     //alert(document.getElementById("_siteId").value);
     efwindow.show(null,"detailContent","center");
   }
}

//点击复制站点弹出框中的取消按钮
button_cancel_onclick=function(){
  efwindow.hide();
}
//点击复制站点弹出框中的确定按钮
button_confirm_onclick=function(){
  efgrid.submitForm( "ef_grid_result", "ec","ECSM01","copy",true);
  efwindow.hide();
}
//点击设置按钮相关操作
efgrid_onTemplateLinkClick = function(grid_id,row_index,col_index,cell_value)
{
	if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var columnId=grid.getCellValue(row_index,0,TYPE_DATA,false);
     //隐藏域赋值，获取复制站点的ID
     ef.get("templatelink_nodeId").value = columnId;
     
     var info = new EiInfo();
	 info.set("objId",columnId);
	 info.set("objType",0);
	 EiCommunicator.send( "ECTM05", "getIns" , info, null );
	 
	 if(ajaxEi!=null){
	 	ef.get("templateInsId00").value=check(ajaxEi.get("templateInsId1"));
	    ef.get("templateInsId01").value=check(ajaxEi.get("templateInsId2"));
	    //ef.get("templateInsId2").value=ajaxEi.get("templateInsId3");
	    ef.get("templateInsId03").value=check(ajaxEi.get("templateInsId4"));
	      
	    ef.get("templateInsName00").value=check(ajaxEi.get("templateInsName1"));
	    ef.get("templateInsName01").value=check(ajaxEi.get("templateInsName2"));
	    //ef.get("templateInsName2").value=ajaxEi.get("templateInsName3");
	    ef.get("templateInsName03").value=check(ajaxEi.get("templateInsName4"));
	    
	    ef.get("SiteTemplatePreview0").value = check(ajaxEi.get("templateInsName1"));
	    ef.get("ColumnTemplatePreview0").value = check(ajaxEi.get("templateInsName2"));
	    ef.get("ArticleTemplatePreview0").value = check(ajaxEi.get("templateInsName4"));
	 }
     //alert(ef.get("templatelink_nodeId").value);
     efwindow.show(null,"templatelink","center");
   }
}
function check(value){
	//alert(typeof(value)=="undefined");
	return typeof(value)=="undefined"?"":value;
}
//设置模板按钮相关操作
function selectTemplate(preObjectId,templateTypeId)
{
	var nodeId = ef.get("templatelink_nodeId").value;
	var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=0"); //objType节点类型 0 站点 1 栏目 2 文章
	/*
	if(templateTypeId=='0'){
		var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=0"); //objType节点类型 0 站点 1 栏目 2 文章
	}
	if(templateTypeId=='1'){
		var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=1"); //objType节点类型 0 站点 1 栏目 2 文章
	}
	if(templateTypeId=='3'){
		var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=2"); //objType节点类型 0 站点 1 栏目 2 文章
	}*/
     childWindow.focus();  
}
//选择模板实例按钮相关操作:站点模版
function selectTemplateIns(preObjectId,templateTypeId)
{
	var nodeId = ef.get("templatelink_nodeId").value;
 	var childWindow = efform.openNewForm('ECSM0102', "nodeId="+ nodeId + "&nodeType=s&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=0");
     childWindow.focus();
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
	if(ef.get("templateInsName0"+templateTypeId).value==""){
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
		    ef.get("templateInsId0"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get("templateInsName0"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get(textobj).value = check(ajaxEi.get("templateInsId"+returnValSeq));
		}
	}
}


button_cancel_onclick=function()
{
	efwindow.hide();
}

//查看历史记录
historyDisp=function(siteId){
  var childWindow = efform.openNewForm('ECSM07', "serviceName=ECSM07&methodName=query&inqu_status-0-siteId=" + siteId);
}
//查看站点分发
deployDisp=function(siteId){
  ef.get("inqu_status-0-siteId").value=siteId;
  var childWindow = efform.openNewForm('ECSM06', "serviceName=ECSM06&methodName=query&nodeId=" + siteId);
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

//点击修改弹出修改内容
efgrid_editClick=function(row_index,jobType){
	btnSiteUnDisabled();//模板按钮可用
	bindForm("result",row_index,"ECSM01","d-0-");
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
	if(jobType==null||jobType.trim()==""){
		document.getElementsByName("d-0-jobType")[0].checked = true;
		changeJobType(0);
	}else{
		if(jobType=="1"){
			document.getElementById("d-0-jobStartHour1").value = document.getElementById("d-0-jobStartHour").value;
			document.getElementById("d-0-jobStartMin1").value = document.getElementById("d-0-jobStartMin").value;
			document.getElementById("d-0-jobStartHour").value = "";
			document.getElementById("d-0-jobStartMin").value = "";
		}
		document.getElementsByName("d-0-jobType")[jobType].checked = true;
		setRadioValue("d-0-jobType",jobType);
		changeJobType(jobType);
	}

	document.getElementById("d-0-flag").value="update";
	
   	/********************************************站点、栏目、文章模板值绑定到页面**********************************/
   	var grid = efgrid.getGridObject( "ef_grid_result" );
	var siteId=grid.getCellValue(row_index,0,TYPE_DATA);
	
	//ef.get("d-0-firsetLevelColumn").value = "true";
	ef.get("templatelink_nodeId").value = siteId;  //选择模版时所需要的SiteId
	
	clear();//清空模板内容
    
    for(var i=0;i<3;i++){
		var info = new EiInfo(); 
		info.set("objId",siteId); //节点编号
		var nodeType=0; 
		var templateTypeId;
		for(var i=0;i<3;i++){
			if(i%3=='0'){
				/* 站点 */
				templateTypeId = 0; //0:站点首页模板1:栏目首页模板2:栏目列表模板3:文章显示模板
				//nodeType = 0; //0:站点 1：栏目 2：文章
				info.set("templateTypeId",templateTypeId);//模板类型标识
				info.set("objType",nodeType); //节点类型
			}else if(i%3=='1'){
				/* 栏目 */
				templateTypeId = 1; 
				//nodeType = 1; 
				info.set("templateTypeId",templateTypeId);
				info.set("objType",nodeType); 
			}else{
				templateTypeId = 3;
				//nodeType = 2; 
				info.set("templateTypeId",templateTypeId);
				info.set("objType",nodeType);
			}
			EiCommunicator.send( "ECTM03", "getTemplateFileName" , info, null );
			
			if(ajaxEi!=null){
				templateInsId = ajaxEi.get("templateInsId");
				templateInsName = ajaxEi.get("templateInsName");
				if(i%3=='0'){
					//绑定栏目模版实例名称
					document.getElementById("templateInsId00").value = templateInsId;//预览时需要的模板实例ID 
					document.getElementById("SiteTemplatePreview0").value = templateInsName;
					document.getElementById("templateInsName00").value = templateInsName;
				}else if(i%3=='1'){
					//绑定栏目模版实例名称
					document.getElementById("templateInsId01").value = templateInsId;//预览时需要的模板实例ID 
					document.getElementById("ColumnTemplatePreview0").value = templateInsName;
					document.getElementById("templateInsName01").value = templateInsName;
				}else{
					//绑定栏文章模版实例名称
					document.getElementById("templateInsId03").value = templateInsId;//预览时需要的模板实例ID
					document.getElementById("ArticleTemplatePreview0").value = templateInsName;
					document.getElementById("templateInsName03").value = templateInsName;
				}
			}	
		}
    }
  	
	/***************************************模板绑定结束**********************************/
	
	setArticleStatesVal(row_index);
	efgrid_detail_onclick(row_index);
	
    efwindow.show(null,"detailContent1","center");
    //var jobType = getRadioValue("d-0-jobType");
    //changeJobType(jobType);
}

/*****************************站点编辑页面模板按钮设置***************************/
//按钮不可用
function btnSiteDisabled(){
	document.getElementById("SiteTemplate").disabled="true";
	document.getElementById("undoSiteTemplate").disabled="true";
	document.getElementById("previewSiteTemplate").disabled="true";
	
	document.getElementById("ColumnTemplate").disabled="true";
	document.getElementById("undoColumnTemplate").disabled="true";
	document.getElementById("previewColumnTemplate").disabled="true";
	
	document.getElementById("ArticleTemplate").disabled="true";
	document.getElementById("undoArticleTemplate").disabled="true";
	document.getElementById("previewArticleTemplate").disabled="true";
}
//按钮可用
function btnSiteUnDisabled(){
	document.getElementById("SiteTemplate").disabled="";
	document.getElementById("undoSiteTemplate").disabled="";
	document.getElementById("previewSiteTemplate").disabled="";
	
	document.getElementById("ColumnTemplate").disabled="";
	document.getElementById("undoColumnTemplate").disabled="";
	document.getElementById("previewColumnTemplate").disabled="";
	
	document.getElementById("ArticleTemplate").disabled="";
	document.getElementById("undoArticleTemplate").disabled="";
	document.getElementById("previewArticleTemplate").disabled="";
}
//清空模板数据
function  clear(){
	document.getElementById("templateInsId00").value = "";
	document.getElementById("SiteTemplatePreview0").value = "";
	document.getElementById("templateInsId01").value = "";
	document.getElementById("ColumnTemplatePreview0").value = "";
	document.getElementById("templateInsId03").value = "";
	document.getElementById("ArticleTemplatePreview0").value = "";
}

function setArticleStatesVal(row_index){
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var value=grid.getCellValue(row_index,10,TYPE_DATA,true);
	var tmpvalue = value.split(",");
	cleanArticleStates();
	for(var i =0;i<tmpvalue.length;i++){
    	if(tmpvalue[i]=="10")
    		document.getElementById("stateCreate").checked = true;
    	else if(tmpvalue[i]=="20")	
    		document.getElementById("stateDenial").checked = true;
    	else if(tmpvalue[i]=="30")
    		document.getElementById("stateAudit").checked = true;
    	else if(tmpvalue[i]=="40")
    		document.getElementById("statePublishing").checked = true;
    	else if(tmpvalue[i]=="50")
    		document.getElementById("stateRelease").checked = true;
    }
}

function cleanArticleStates(){
	var chkbox = document.getElementsByName("articlestates");
	for(var i=0;i<chkbox.length;i++){
		chkbox[i].checked = false;
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
		if(l[i].value==value) 
		{
			l[i].checked = true;
		}else
			l[i].checked = false;
	} 
} 
previewTemplate = function (type,objType){
	//alert(document.getElementById("templateInsId"+type).value);
	//alert(document.getElementById("templateInsName"+type).value);
	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("templateInsId0"+type).value;//document.getElementById("result4-0-templateInsId").value;
	if(insId == null || insId.trim() ==""){
		alert("没有可供设置的模版实例!");
		return false;
	}
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("templatelink_nodeId").value;//ef.get("inqu_status-0-objId").value;
	var objType = objType;//ef.get("inqu_status-0-objType").value;
	
	var nodeType="s";
	
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
	var insId = document.getElementById("templateInsId0"+type).value;//document.getElementById("result4-0-templateInsId").value;
	if(insId == null || insId.trim() ==""){
		alert("没有可供设置的模版实例!");
		return false;
	}
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("templatelink_nodeId").value;//ef.get("inqu_status-0-objId").value;
	var objType = objType;//ef.get("inqu_status-0-objType").value;
	
	var nodeType="s";
	
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


button_confirm1_onclick = function () 
{
	var objs= document.getElementsByName("articlestates");
	var siteId = document.getElementById("ArticleStates_SiteId").value;
	var checkedVal = "";
	for(var i=0;i<objs.length;i++){
		if(objs[i].checked == true){
			if(checkedVal==""){
				checkedVal = objs[i].value;
			}else{
				checkedVal +=","+objs[i].value;
			}
		}
	}
	//alert(checkedVal);
	var info = new EiInfo();
	info.set("siteId",siteId);
	info.set("articleReleaseStates",checkedVal);
	EiCommunicator.send( "ECSM01", "updateArticleReleaseStates", info, null );
	articlestates_clean();
	efwindow.hide();
}


button_cancel1_onclick = function () 
{
	efwindow.hide();
}
efgrid_articlestates_onclick = function (row_index) 
{	
	articlestates_clean();
	var grid=efgrid.getGridObject("ef_grid_result");
    var articleReleaseStates="";//grid.getCellValue(row_index,10,TYPE_DATA,true);
    var siteId = grid.getCellValue(row_index,0,TYPE_DATA,false);
    
    var info = new EiInfo();
    var block=new EiBlock("inqu_status");
    info.addBlock( block );
    meta=new EiBlockMeta();
    column=new EiColumn("siteId");
    column.pos=0;
    meta.addMeta(column);
    block.setBlockMeta(meta);
    var inqu_status = [];
    inqu_status[0]=siteId; 
    block.addRow(inqu_status);
	info.addBlock(block);
    EiCommunicator.send( "ECSM01", "query", info, null );
    if(ajaxEi!=null){
    	var eiBlock = ajaxEi.getBlock("result");
    	articleReleaseStates = eiBlock.getCell(0,"articleReleaseStates")
    }
    var strlist  = articleReleaseStates.split(",");
    for(var i =0;i<strlist.length;i++){
    	if(strlist[i]=="10")
    		document.getElementById("stateCreate").checked = true;
    	else if(strlist[i]=="20")	
    		document.getElementById("stateDenial").checked = true;
    	else if(strlist[i]=="30")
    		document.getElementById("stateAudit").checked = true;
    	else if(strlist[i]=="40")
    		document.getElementById("statePublishing").checked = true;
    	else if(strlist[i]=="50")
    		document.getElementById("stateRelease").checked = true;
    }
    document.getElementById("ArticleStates_SiteId").value = siteId;
	efwindow.show(null,"articlestates","center");
}

articlestates_clean = function(){
	var objs= document.getElementsByName("articlestates");
	for(var i=0;i<objs.length;i++){
		objs[i].checked = false;
	}
}

changeMin = function(){
    document.getElementById("d-0-jobEndMin").value = document.getElementById("d-0-jobStartMin").value;
}

function releaseOptionChange(value){
	//alert(value);
	isAnonyChange(value)
	
}
function isAnonyChange(value){
	var obj = document.getElementById("d-0-isAnony");
	if(value == "1"){
		obj.disabled= true;
		for(var i=0;i<obj.options.length;i++){
			if(obj.options[i].value = value){
				obj.options[i].selected = true;
				break;
			}
		}
	}else{
		obj.disabled= false;
	}
}