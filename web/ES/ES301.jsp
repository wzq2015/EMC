<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@page import="com.baosight.iplat4j.ef.ui.column.*,java.util.*"%>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ES/ES301.js"></script>
</head>
<body class="bodyBackground">

<form id="ES301" method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_region_result" title="<%=I18nMessages.getText("label.ESOrgBuild","组织建设") %>" efRegionShowClear=false>
<table id="mainFrameTable" width="100%"  cellpadding=1 cellspacing=0 >
  <tr>
  	<td></td>
	<td><div id="middleTreeDiv" style='overflow:auto; width:200; height:100%;'>
	 <EF:EFTree model="orgTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESOrganization","组织机构") %>' configFunc="configTree">
     </EF:EFTree>
	</div>
	</td>
	<td></td>
</table>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
