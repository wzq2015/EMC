<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/ED20.js"></script>

</head>
<body class="bodyBackground">
<form id="ED11" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
<div>
<table>
	<tr>
		<td width="25%"><%=I18nMessages.getText("label.EDPackageName", "包名")%></td>
		<td width="55%"><EF:EFInput blockId="inqu_status"
			ename="packageName" row="0" style="width:350;"/></td>
	</tr>
	<tr>
		<td width="25%"><%=I18nMessages.getText("label.EDIsRecursive", "是否递归")%></td>
		<td width="75%"><EF:EFInput blockId="inqu_status"
			ename="isRecursive" type="checkbox" row="0" /></td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_result" title="" style="overflow: scroll;display: none">
<div id="ef_grid_result" title="" style="overflow: hidden;"></div>
</div>

<EF:EFRegion />
	<EF:EFGrid blockId="result">
	</EF:EFGrid>
<jsp:include
	flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include></form>

</body>
</html>
