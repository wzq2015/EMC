<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,com.baosight.iplat4j.core.ei.*"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	EiInfo info = (EiInfo) request.getAttribute("ei");
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>请假审批页面</title>
	<link href="framework/css/style.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EW/DM/EWDM02.js"></script>
</head>
<body class="bodyBackground">

<form id="EWDM02" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_info" title="请假信息" style="overflow:scroll">
<div style="overflow:hidden;width:100%">
<input id="taskId" type=hidden name="taskId" type="text" value="${ei.attr.taskId}">
<table width="300">
	<tr>
		<td nowrap width="15%">申请人：</td>
		<td nowrap width="40%"><EF:EFInput blockId="info" ename="person"
			row="0" etc="readonly='readonly' disabled='disabled'" /></td>
	</tr>
	<tr>
		<td nowrap width="15%">请假天数：</td>
		<td nowrap width="40%"><EF:EFInput blockId="info" ename="days"
			row="0"
			etc="validateType='positive_integer' minLength='1' onblur=efvalidateObj(this)" />
		<font color="red">*必填</font></td>
	</tr>
	<tr>
		<td nowrap>请假事由：</td>
		<td nowrap><EF:EFInput blockId="info" ename="reason" row="0"
			type="textarea" /></td>
	</tr>
</table>
<hr>
<table width="300">
	<%
		if (info.get("taskId") != null
			&& info.get("taskId").toString().trim().length() != 0) {
	%>
			<tr>
				<td nowrap width="15%">审批意见：</td>
				<td nowrap width="40%"><input name='approve_message'
					id="approve_message" type='textarea' cols='90' rows='6' /></td>
			</tr>
			<tr>
				<td nowrap width="15%">审批人:</td>
				<td nowrap width="40%"><input type="text"
					value="<%=info.get("info-0-person")%>" readonly="readonly"
					disabled="disabled" /></td>
			</tr>
	<%
	}
	%>
	<tr>
		<td nowrap width="15%">下一步:</td>
		<td nowrap width="40%">
			<select name="next_transition" id="next_transition">
			<%
				if (info != null && info.getBlock("NextTransitions") != null) {
					EiBlock block = info.getBlock("NextTransitions");
					for (int i = 0; i < block.getRowCount(); i++) {
						Map temp = block.getRow(i);
			%>
						<option value="<%=temp.get("Name")%>"><%=temp.get("DisplayName")%></option>
			<%
					}
				}
			%>
			</select>
		</td>
	</tr>
	<tr>
		<td>
			<input id="submit_button" onclick="submit_onclick()" type="button" value="提交">
		</td>
	</tr>
</table>
</div>
</div>
<EF:EFRegion /> 
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>

