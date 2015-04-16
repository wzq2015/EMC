<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/EDFA80.js"></script>

</head>
<body class="bodyBackground">

	<form id="EDFA80" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="false" page="../EF/Form/EFFormHeadDQ.jsp"></jsp:include>
	
		<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
		<div style="overflow:hidden;width:100%">
		<table>
			<tr>
				<td nowrap width="15%">所有者</td>
				<td nowrap width="20%"><EF:EFInput blockId="inqu_status"
					ename="owner" row="0" style="text-transform : uppercase;"
					etc="validateType='string'" /></td>
				<td nowrap width="15%">对象名</td>
				<td nowrap width="20%"><EF:EFInput blockId="inqu_status"
					ename="tableName" row="0" style="text-transform : uppercase;" /></td>
				<td nowrap width="15%">字段代码</td>
				<td nowrap><EF:EFInput blockId="inqu_status" ename="columnName"
					row="0" style="text-transform : uppercase;" /></td>
			</tr>
		</table>
		</div>
		</div>
			
		<div id="ef_region_result" title="记录集" style="overflow:scroll">
			<div id="ef_grid_result" title="页面信息"	style="overflow: hidden;height:300px;">
			</div>
		</div>
		
		<EF:EFRegion />
		
		<EF:EFGrid blockId="result" autoDraw="yes"
			readonly="false" ajax="true">
			<EF:EFColumn ename="owner" fix="yes" nullable="false"  validateType="string"/>
			<EF:EFColumn ename="tableName" fix="yes" nullable="false" />
			<EF:EFColumn ename="columnId" fix="yes" nullable="false" />
			<EF:EFColumn ename="columnName" fix="yes" nullable="false" />
		</EF:EFGrid>
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>

</body>
</html>
