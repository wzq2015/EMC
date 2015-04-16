<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EM/UV/EMUV03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EMUV03" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_userlist" title="<%=I18nMessages.getText("label.userlist", "审批人清单")%>" efRegionShowClear=true>
	<div id = "ef_grid_userlist" style="overflow:hidden;height:275px;">		
	</div>
</div>

<EF:EFRegion/>


<EF:EFGrid blockId="userlist" autoDraw="false" readonly="false">		
	<EF:EFColumn ename="userId" cname="审批人工号" width="80" />
	<EF:EFColumn ename="userName" cname="审批人姓名" width="80" />	
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
