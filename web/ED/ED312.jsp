<!DOCTYPE html>
<%@page import="com.baosight.iplat4j.ep.monitor.DiagnosticJob"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.base.utils.DiagnoseUtils"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	//session.getAttributes();
	String diagnoseId = request.getParameter("diagnoseId");
	String jobId = request.getParameter("diagnoseJobId");
	DiagnosticJob job = DiagnoseUtils.getJob(session.getId(), diagnoseId, jobId);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/ED312.js"></script>
</head>
<body class="bodyBackground">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="SQL语句" efRegionShowClear="false" >
<textarea rows="50" cols="100" id="diagnoseSQL" style="width:100%;height:120px;border:0px;font-family:Courier;font-weight:bold;color:#AA4433;"><%=job.information%></textarea>
<EF:EFButton ename="plan" cname='执行计划' />
</div>
<div id = "ef_region_plan" title="执行计划" efRegionShowClear="false" >
<textarea rows="50" cols="100" id="explainPlan" style="width:100%;height:380px;border:0px;font-family:Courier;font-weight:bold;color:#3344AA;"></textarea>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
<script type="text/javascript">
function efform_onload() {
	efregion.show("ef_region_inqu");
	efregion.show("ef_region_plan");
}

function button_plan_onclick() {
	var info = new EiInfo();
	info.set("sessionId", "<%=session.getId()%>");
	info.set("diagnoseId", "<%=diagnoseId%>");
	info.set("jobId", "<%=jobId%>");
	EiCommunicator.send("ED312", "explain", info, null, false, false);
	if (ajaxEi != null) {
		ef.get("explainPlan").value = ajaxEi.get("explain_plan");
	}
}
</script>
</body>
</html>
