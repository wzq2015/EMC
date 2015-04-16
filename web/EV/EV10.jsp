
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%@page import="com.baosight.iplat4j.ev.util.PortalUtil, com.baosight.iplat4j.core.ei.*"%>
<%
	String contextpath = request.getContextPath();
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	EiInfo Info=(EiInfo)request.getAttribute("ei");
	String portalId =(String)Info.get("portalId");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title></title>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/EV10.js"></script>
</head>
<body class="bodyBackground">
<input type="hidden" id="portalId" value="<%=portalId%>"/>
	<form id="EV10" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include> 
		<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
			<div style="overflow:hidden;width:100%" id="tag">
				<table>
				</table>
			</div>
		</div>     
		
		<EF:EFRegion/>
		<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
	</form>
</body>
</html>   
