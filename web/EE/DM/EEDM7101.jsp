<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String chartType=request.getParameter("chartType");
	String dataType=request.getParameter("data");
	String bgcolor=request.getParameter("bgcolor");
	String plotcolor=request.getParameter("plotcolor");
	String showValues = request.getParameter("showValues");
	String queryParam="chartType="+chartType+"&dataType="+dataType+"&bgcolor="+bgcolor+"&canvasBgColor="+plotcolor+"&showValues="+showValues+"&isFreeChart=1";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	
</head>
<body>
<form id="EEDM70" method="POST" action="<%=actionUrl%>" >

<EF:EFFreeChartRender blockId="efChartBlock" chartType="<%=chartType%>" id="aaa" height="400" width="600"  align="left"  methodName="getChartData" serviceName="EEDM71"  queryParam="<%=queryParam%>"></EF:EFFreeChartRender>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
