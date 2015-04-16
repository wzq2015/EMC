<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/ED301.js"></script>

</head>
<body class="bodyBackground">
<form id="ED301" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="语句信息" efRegionShowClear=false>
	<div id = "ef_grid_result" title="语句信息" style="overflow: hidden;height:500px;">
     </div>
</div>

<EF:EFRegion/>
		
<EF:EFGrid blockId="result" autoDraw="no" readonly="true" paintId="ef_grid_result" style="operationBar:false;toolBar:false;navigationBar:false">
	<EF:EFColumn ename="id" cname="语句ID" width="300" sort="false"/>
	<EF:EFColumn ename="statementType" cname="语句类型" width="100" sort="false"/>
	<EF:EFColumn ename="sql" cname="SQL" width="2000" sort="false"/>
</EF:EFGrid>

	<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
