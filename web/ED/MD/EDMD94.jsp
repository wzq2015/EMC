<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ page import="com.baosight.iplat4j.dao.*" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
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



<html>
<%
    
String processDefinitionName = "请假DEMO流程";
long processInsId;
String userName = (String) UserSession.getUserId();
String actionUrl = request.getContextPath() + "/DispatchAction.do";
String processId = request.getParameter("inqu_status-0-processid");
String formName = request.getParameter("formName");
String taskId = request.getParameter("inqu_status-0-taskid");
String pageTitle = null;
Task task = null;


if (processId == null) { // 流程尚未启动
	ActivityDefinition acdef = WorkflowManager
			.getStartActivity(processDefinitionName);
	pageTitle = processDefinitionName;
	formName = acdef.getFormResourceName().trim();
	processInsId = -1;
} else { // 流程已启动
	processInsId = Long.parseLong(processId);
	// 获取当前任务
	List<Task> tasks = WorkflowManager.getTasks(processInsId,
			userName);

	if (tasks.size() == 0) {
		out.println("流程已结束");
		return;
	}
	System.out.println("ok....processId:"+processId+" formName:"+formName+" taskId:"+taskId);
	
	task = tasks.get(0);
	ActivityDefinition actdef = WorkflowManager.getActivity(Long.parseLong(taskId));
	//formName = actdef.getFormResourceName().trim();
	pageTitle = task.getActivityDisplayName();
}
%>

<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title><%=processDefinitionName%></title>

</head>
<body class="bodyBackground">
<form id="EDMD94" method="POST" action="<%=actionUrl%>">
<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript">
var info = new EiInfo();
info.set('formName', '<%=formName%>');
$(function() {
<%if (formName.length() > 0) {%>
	EiCommunicator.send('EDMD92', 'renderForm', info, {
		onSuccess : function(outInfo) {
			var html = outInfo.get('html');
			$('#formDiv').append($(html));
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
<%}%>
});
</script>

<div id="ef_region_result" title="请假表单" efRegionShowClear="true">
<div id="formDiv"></div>
</div>
<EF:EFRegion/>
</form>	
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>

</body>
</html>