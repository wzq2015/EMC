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
	<script type="text/javascript" src="./EM/UV/EMUV02.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EMUV02" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_activitylist" title="<%=I18nMessages.getText("label.activitylist", "履历详情")%>" efRegionShowClear=true>
	<div id = "ef_grid_activitylist" style="overflow:hidden;height:275px;">		
	</div>
</div>

<EF:EFRegion/>


<EF:EFGrid blockId="activitylist" autoDraw="false" readonly="false">	
	<!-- <EF:EFColumn ename="dbid" cname="节点编号" fix="yes" width="80" /> -->
	<EF:EFColumn ename="state" cname="状态" width="80" />
	<EF:EFColumn ename="activityname" cname="节点名称" width="80" />
	<EF:EFColumn ename="startTime" cname="提交时间" width="80" />
	<EF:EFColumn ename="endTime" cname="完成时间" width="80" />
	<EF:EFColumn ename="transition" cname="路径" width="80" />
	<EF:EFColumn ename="type" cname="备注" width="80" />	
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
