<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String chartType=request.getParameter("chartType");
	String dataType=request.getParameter("data");
	if("2".equals(dataType)&&!chartType.startsWith("StackedColumn")){
		chartType="MS"+chartType;
	}

	String showValues=request.getParameter("showValues");
	String bgcolor=request.getParameter("bgcolor");
	String plotcolor=request.getParameter("plotcolor");

	String queryParam="chartType="+chartType+"&dataType="+dataType+"&bgcolor="+bgcolor+"&canvasBgColor="+plotcolor+"&showValues="+showValues;
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
<form id="EEDM7001" method="POST" action="<%=actionUrl%>" >


<EF:EFChartRender blockId="efChartBlock" chartType="<%=chartType%>" width="600" height="400" id="qqq"  methodName="getChartData" serviceName="EEDM71" queryParam="<%=queryParam%>" ></EF:EFChartRender>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
