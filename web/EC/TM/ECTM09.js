efform_onload = function ()
{
	var Id = "0000000999999999";
			  
	var Type = "0";
	var info = new EiInfo();
	info.set("objId",Id);
	info.set("objType",Type);
	
	ef.get("inqu_status-0-objId").value=Id;
	ef.get("inqu_status-0-objType").value=Type;
	
	EiCommunicator.send( "ECTM05", "getIns" , info, null );
	
	ef.get("ef_region_result1").style.display='';
	if(ajaxEi!=null){
	      ef.get("result1-0-templateInsId").value=check(ajaxEi.get("templateInsId1"),"0");
	      ef.get("result2-0-templateInsId").value=check(ajaxEi.get("templateInsId2"),"1");
	      ef.get("result3-0-templateInsId").value=check(ajaxEi.get("templateInsId3"),"2");
	      ef.get("result4-0-templateInsId").value=check(ajaxEi.get("templateInsId4"),"3");
	      
	      ef.get("result1-0-templateInsName").value=check(ajaxEi.get("templateInsName1"),"0");
	      ef.get("result2-0-templateInsName").value=check(ajaxEi.get("templateInsName2"),"1");
	      ef.get("result3-0-templateInsName").value=check(ajaxEi.get("templateInsName3"),"2");
	      ef.get("result4-0-templateInsName").value=check(ajaxEi.get("templateInsName4"),"3");
	}
}

/*
  对没有模板实例的文本框格式化输出
*/
function check(a,id){
	
	if(id=="0"){
		id="1";
	}else if(id=="1"){
		id="2";
	}else if(id=="2"){
		id="3";
	}else if(id=="3"){
		id="4";
	}

	if(a==undefined){
		efbutton.setButtonStatus("set"+id, false);
		return '暂无';
	}
	else{
		efbutton.setButtonStatus("set"+id, true);
		return a;
	}
}

/*********************************开始：模板实例的新增***************************************/
/*
  新增站点首页模板实例
*/
button_add1_onclick = function () 
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "0";
	
	var childWindow = efform.openNewForm('ECTM0104', "serviceName=ECTM0104&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
	
}

/*
  新增栏目首页模板实例
*/
button_add2_onclick = function ()
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "1";
	
	var childWindow = efform.openNewForm('ECTM0104', "serviceName=ECTM0104&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
	
}

/*
  新增栏目列表模板实例
*/
button_add3_onclick = function ()
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "2";
	
	var childWindow = efform.openNewForm('ECTM0104', "serviceName=ECTM0104&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
	
}

/*
  新增文章模板实例
*/
button_add4_onclick = function () 
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "3";
	
	var childWindow = efform.openNewForm('ECTM0104', "serviceName=ECTM0104&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
	
}
/*********************************结束：模板实例的新增***************************************/



/*********************************开始：模板实例的选择***************************************/
/*
  选择站点首页模板实例
*/
button_select1_onclick = function () 
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "0";
	
	var childWindow = efform.openNewForm('ECTM03', "serviceName=ECTM03&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
}

/*
  选择栏目首页模板实例
*/
button_select2_onclick = function ()
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "1";
	
	var childWindow = efform.openNewForm('ECTM03', "serviceName=ECTM03&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
}

/*
  选择栏目列表模板实例
*/
button_select3_onclick = function ()
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "2";
	
	var childWindow = efform.openNewForm('ECTM03', "serviceName=ECTM03&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
}

/*
  选择文章模板实例
*/
button_select4_onclick = function () 
{	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value
	var templateTypeId = "3";
	var childWindow = efform.openNewForm('ECTM03', "serviceName=ECTM03&objId="+objId+"&objType="+objType+"&templateTypeId="+templateTypeId);
    childWindow.focus();
}
/*********************************结束：模板实例的选择***************************************/

/*********************************开始：模板实例的设置***************************************/
/*
  设置站点首页模板实例
*/
button_set1_onclick = function () 
{	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("result1-0-templateInsId").value;
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value;
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	
	var nodeType="s";
	if(objType=="1"){
		nodeType="c";
	}
	
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,1);
			//删了templateTypeId试试看
		}
}

/*
  设置栏目首页模板实例
*/
button_set2_onclick = function ()
{	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("result2-0-templateInsId").value;
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value;
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	var nodeType="s";
	if(objType=="1"){
		nodeType="c";
	}
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,2);
			}
}

/*
  设置栏目列表模板实例
*/
button_set3_onclick = function ()
{	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("result3-0-templateInsId").value;
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value;
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	var nodeType="s";
	if(objType=="1"){
		nodeType="c";
	}
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,3);
		}
}

/*
  设置文章模板实例
*/
button_set4_onclick = function () 
{	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("result4-0-templateInsId").value;
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("inqu_status-0-objId").value;
	var objType = ef.get("inqu_status-0-objType").value;
	var artId = "";
	var nodeType="s";
	if(objType=="1"){
		nodeType="c";
	}
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,4);
	
		}
}


/*********************************结束：模板实例的设置***************************************/

/*开窗通用方法*/
function open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,area){
	var url1=filepath + templateTypeId +"/" + templateFilename + "&mode=edit_1_plus_1&tempDefId="+templateDefId+"&tempInsId="+insId+"&nodeId="+objId+"&nodeType="+nodeType+"&area="+area+"&imagespath=/"+filepath + templateTypeId +"/images";
	window.open( "DispatchAction.do?efFormEname=ECTM0501&url="+url1,"模板设置","top=0,left=0,menubar=no,width="+screen.width+",height="+screen.availHeight+",scrollbars=yes,resizable=yes");
}