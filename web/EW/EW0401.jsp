<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ page import="com.baosight.iplat4j.dao.*" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%@page import="com.baosight.iplat4j.ep.util.DispatchHandler"%>
<%@page import="com.baosight.iplat4j.common.ed.domain.TEDFA00"%>
<%@page import="com.baosight.ieasyflow.engine.WorkflowManager"%>
<%@page import="com.baosight.ieasyflow.engine.task.Task"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%@page import="com.baosight.ieasyflow.engine.activity.ActivityDefinition"%>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%@page import="com.baosight.ieasyflow.engine.Transition"%>
<%@page import="com.baosight.iplat4j.ed.md.formbuilder.FbUtils"%>
<%@page import="com.baosight.ieasyflow.engine.history.HistoryTask"%>
<%@page import="com.baosight.ieasyflow.engine.ProcessDefinition"%>
<%@page import="com.baosight.ieasyflow.engine.Activity"%>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%><html>
<%    
	long processInsId;
	String processDefinitionName=null;
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String processId = request.getParameter("processId");
	String formName = null;
	boolean isCorrectFormName=true;
	String wfPageEname = null;
	String pageTitle = null;
	String rgnTitle = null;
	
	if (processId == null) { // 流程尚未启动
		wfPageEname = request.getParameter("efFormEname");
		String formParam= DispatchHandler.checkFormInfo(wfPageEname).getForm_param();
	    processDefinitionName=formParam.substring(formParam.indexOf("=")+1).trim();
	    System.out.println("processDefinitionName:"+processDefinitionName);
		ActivityDefinition acdef = WorkflowManager
				.getStartActivity(processDefinitionName);
		pageTitle = processDefinitionName;
		formName = acdef.getFormResourceName().trim(); 
		TEDFA00 formInfo=null;
		try{
		formInfo=DispatchHandler.checkFormInfo(formName);
		}catch(Exception ex){
			isCorrectFormName=false;
		}
		if(formInfo==null) rgnTitle ="流程关联的表单【"+formName+"】不存在或尚未发布!";
		if(formInfo!=null&&!formInfo.form_type.equals("3")){
			rgnTitle ="流程关联的表单【"+formName+"】不是自定义表单!";
			isCorrectFormName=false;
		}
		if(formInfo!=null&&formInfo.form_type.equals("3"))
		rgnTitle =formInfo.getForm_cname();
		processInsId = -1;
	} else { // 流程已启动
		processInsId = Long.parseLong(processId);
	    wfPageEname = request.getParameter("wfPageEname");
		String formParam= DispatchHandler.checkFormInfo(wfPageEname).getForm_param();
	    processDefinitionName=formParam.substring(formParam.indexOf("=")+1).trim();
		 ActivityDefinition acdef = WorkflowManager
			.getStartActivity(processDefinitionName);
	    pageTitle = processDefinitionName;
	    formName = acdef.getFormResourceName().trim();
	    System.out.println("formName:"+formName);
	    rgnTitle="【操作成功】";
	}
	
	EiInfo info = (EiInfo) pageContext.getAttribute("ei");
	if (info == null) {
		info = new EiInfo();
		pageContext.setAttribute("ei", info);
	}
	info.setCell("inqu_status", 0, "processName", processDefinitionName);
	info.setCell("inqu_status", 0, "processId", processId);
	info.setCell("inqu_status", 0, "formName", formName);
	info.setStatus(1);
	System.out.println(info.getDetailMsg());
%>

<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title><%=pageTitle%></title>

<link type="text/css" href="FormBuilder/css/formrender.css" media="screen" rel="stylesheet" />
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="EW/EW0401.js"></script>
<script type="text/javascript" src="FormBuilder/js/dynform.js"></script>
<script type="text/javascript">
function setPageAttr(info) {
	info.set('wfPageEname', '<%=wfPageEname%>');
	info.set('formName', '<%=formName%>');
	info.set('processName', '<%=processDefinitionName%>');
<%  if(processInsId != -1) { %> 
	info.set("processId", '<%=processInsId%>');
<%	} %>
}

$(function() {
<%if (formName.length() > 0&&isCorrectFormName==true) {%>  
	dynform_init($('#formDiv'));
<%}%>

<%if (processInsId == -1&&isCorrectFormName==true) {%>
	$('#start').click(function() {
		if (!efvalidateForm($('#EW0401').get(0))){
			return;
		}
		var info = dynform_eiinfo();
		setPageAttr(info);
		info.set("description", "从表单【"+'<%=formName%>'+"】启动流程");
		EiCommunicator.send('EW0401', 'startProcess', info, {
			onSuccess : function(outInfo) {
				var childWindow = efform.openNewForm('EW0401', 'processId=' + outInfo.get("processId")+'&wfPageEname='+outInfo.get("wfPageEname"));
				childWindow.focus();
			},
			onFail : function(message) {
				alert(message);
			}
		}, false, false);
	});
	$('#tempStore').click(function() {
		var info = dynform_eiinfo();
		setPageAttr(info);
		info.set("processId", '<%=processInsId%>');		
		info.set("description", "从表单【"+'<%=formName%>'+"】启动流程");

		EiCommunicator.send('EW0401', 'tempStore', info, {
			onSuccess : function(outInfo) {
				var childWindow = efform.openNewForm('EW0401', 'processId=' + outInfo.get("processId")+'&wfPageEname='+outInfo.get("wfPageEname"));
				childWindow.focus();
			},
			onFail : function(message) {
				alert(message);
			}
		}, false, false);
	});
<%} else {%>
	$('#start').hide();
	$('#tempStore').hide();
<%}%>	
});
</script>
</head>

<body>
<form id="EW0401" method="POST" action="<%=actionUrl%>">
<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFInput blockId="inqu_status" ename="formName" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="processName" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="processId" row="0" type="hidden"/>

<div id="ef_region_result" title="<%=rgnTitle%>">
	<div id="formDiv" style="overflow:hidden;width:100%;"></div>
	<div style="vertical-align:top"> 
	    <button id="tempStore" type="button">暂存表单</button>
		<button id="start" type="button">启动流程</button>
	</div>
</div>

<EF:EFRegion/>
</form> 

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>