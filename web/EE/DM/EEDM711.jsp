<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

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
<form id="EEDM711" method="POST" action="<%=actionUrl%>" >


<!--当serviceName和methodName没有配置的时候，需要当前页面中的EiInfo对象中含数据对象，此时需要将ServiceEEDM711中的initLoad方法放开  -->
<EF:EFChartRender blockId="efChartBlock"    id="qqq"   serviceName="EEDM711" methodName="getChartData"></EF:EFChartRender>
<EF:EFFreeChartRender blockId="efChartBlock"    id="qqq1"  serviceName="EEDM711" methodName="getChartData" ></EF:EFFreeChartRender>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
