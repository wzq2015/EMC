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
	<script type="text/javascript" src="./ED/ED32.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ED32" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_result" title="JAR包信息" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="JAR包信息" style="overflow: hidden;height:275px;">
	</div> 
</div>

<div id = "ef_region_classes" title="CLASS信息" style="overflow:scroll"> 
	<div id = "ef_grid_classes" title="CLASS信息" style="overflow: hidden;height:275px;">
	</div> 
</div>
<EF:EFInput blockId="inqu_status" ename="location" row="0" type="hidden"/>

<EF:EFRegion/>
  
<EF:EFGrid blockId="result" autoDraw="yes" readonly="true" style="navigationBar:false;">
</EF:EFGrid>

<EF:EFGrid blockId="classes" autoDraw="yes" readonly="true" ajax="true" queryMethod="queryClass" style="navigationBar:false;">
</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
