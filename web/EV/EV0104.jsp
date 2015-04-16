
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%
	EiInfo Info=(EiInfo)request.getAttribute("ei");
	String portalId = (String)Info.get("portalId");
	String nodeId = (String)Info.get("nodeId");
	String isDefault = (String)Info.get("isDefault");
	String isSysOnly = (String)Info.get("isSysOnly");
%>
<HEAD>
<title>门户首页菜单页面</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<link href="${ctx}/EF/Images/tab.css" rel="stylesheet" type="text/css"/>	
<link href="${ctx}/EF/EF.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${ctx}/EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="${ctx}/EF/jQuery/jquery.tab.js"></script>
<script type="text/javascript" src="${ctx}/EF/EF.js"></script>
<script type="text/javascript" src="${ctx}/EV/EV0104.js"></script>
<script type="text/javascript" src="${ctx}/EV/EV.js"></script>

<style type="text/css">
html,body {
	background: #CCCCCC none repeat scroll 0%;
	color: #000000;
	margin: 0px auto;
	padding: 0px;
	text-align: right;
}
</style>
</HEAD>

<body>
<input type="hidden" id="portalId" value="<%=portalId%>"/>
<input type="hidden" id="nodeId" value="<%=nodeId%>"/>
<input type="hidden" id="isDefault" value="<%=isDefault%>"/>
<input type="hidden" id="isSysOnly" value="<%=isSysOnly%>"/>
<table width="100%" height="100%" cellpadding="0" cellspacing="0"
	background="${ctx}/EF/Images/bgline02.gif">
	<tr>
		<td width="100%" align='left'>
		<div id="nMenu"></div>
		</td>
	</tr>
</table>

</body>
</HTML>
