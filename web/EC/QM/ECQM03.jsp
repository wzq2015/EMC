<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String chartType=request.getParameter("chartType");
	String dataType=request.getParameter("data");
	if("2".equals(dataType)&&!chartType.startsWith("StackedColumn")){
		chartType="MS"+chartType;
	}
	String questionnaireId=request.getParameter("inqu_status-0-questionnaireId");
	String showValues=request.getParameter("showValues");
	String bgcolor=request.getParameter("bgcolor");
	String plotcolor=request.getParameter("plotcolor");

	String queryParam="chartType="+chartType+"&dataType="+dataType+"&bgcolor="+bgcolor+"&canvasBgColor="+plotcolor+"&showValues="+showValues+"&questionnaireId="+questionnaireId+"&questionId=";
	
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script language="JavaScript" src="./ER/chart/FusionCharts/FusionCharts.js"></script>

</head>
<body>
<form id="ECQM03" method="POST" action="<%=actionUrl%>" >
<c:set var="form" value="${ei.blocks.r1}"/>
<c:set var="question" value="${ei.blocks.r2}"/>


<p style="text-align:center;font-size:20px;font-weight:bold;">${form.rows[0].questionnaireName}</p>
<div style="text-align:left;font:10px;">已有<font color="blue">${ei.attr.answerCount}</font>人参与本次调查    截止日期:${form.rows[0].endTime} </div>
<hr/>
<table style="width:100%;height:100%;overflow:auto;">
<tr>
<td>
	<c:set var="questionIndex" value="0"/>
	<c:forEach items="${question.rows}" var="q1">
	<ul>
		<li>
			${questionIndex+1}.${q1.questionDesc}
			<c:set var="questionId" scope="request" value="${q1.questionId}"/>
			<c:set var="chartHeight" scope="request" value="${100+q1.selectionCount*20}"/><!--计算图的高度：基础值100+问题选项总数*20-->
			<EF:EFChartRender blockId="efChartBlock" chartType="<%=chartType%>" width="320" height="${chartHeight}" id="chart${questionIndex+1}"  methodName="getChartData" serviceName="ECQM0301" queryParam="<%=queryParam + request.getAttribute("questionId")%>" ></EF:EFChartRender>
		</li>
	</ul>
	<c:set var="questionIndex" value="${questionIndex+1}"/>
	</c:forEach>
</td>
</tr>

</form>
</body>
</html>
