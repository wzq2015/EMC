<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.ei.EiInfo" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
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

<form id="EL000301" method="POST" action="<%=actionUrl%>" >

<EF:EFChartRender blockId="efChartBlock" id="dataChart" serviceName="EL000301" methodName="charInitLoad" ></EF:EFChartRender>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
