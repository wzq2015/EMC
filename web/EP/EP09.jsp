<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EP/EP09.js"></script>

</head>

<body class="bodyBackground">

<form id="EP09" method="POST" action="<%=actionUrl%>?efFormEname=EP09" >

<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFInput blockId="" ename="workNumber" row="" type="hidden" />
<EF:EFInput blockId="" ename="email" row="" type="hidden" />

<div id="ef_region_password" title="重新设置密码申请" efRegionShowClear=true>
<div>
<table>
	<tr>
		<td>用户名</td>
		<td><EF:EFInput blockId="inqu_status" ename="username" row="0" etc="size=30"/></td>
	</tr>
	<tr>
		<td>邮箱</td>
		<td><EF:EFInput blockId="inqu_status" ename="email" row="0" etc="size=30"/></td>
	</tr>

</table>
</div>
</div>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
