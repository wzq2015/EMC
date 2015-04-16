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
<script type="text/javascript" src="./ES/ES99.js"></script>

</head>
<body class="bodyBackground">
<form id="ES99" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
<div>
<table>
	<tr>
		<td width="10%"><%=I18nMessages.getText("label.EDProjectEname", "项目英文名")%></td>
		<td width="20%"><EF:EFInput blockId="inqu_status"
			ename="projectEname" row="0"/></td>
		<td width="10%"><%=I18nMessages.getText("label.EDLoginName", "用户登录名")%></td>
		<td width="20%"><EF:EFInput blockId="inqu_status"
			ename="loginName" row="0"/></td>
		<td width="10%"><%=I18nMessages.getText("label.EDIpAddress", "登录IP地址")%></td>
		<td width="20%"><EF:EFInput blockId="inqu_status"
			ename="ipAddress" row="0"/></td>
	</tr>
	<tr>
		    <td ><%=I18nMessages.getText("label.ELStartDate","时间上限") %></td>
		    <td >		
			  <EF:EFInput blockId="inqu_status" ename="startDate" row="0"    />
			  <img id="efcalendar1" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_1_click(this);">
		    </td>
		    
		    <td ><%=I18nMessages.getText("label.ELEndDate","时间下限") %></td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="endDate" row="0" />
              <img id="efcalendar2" 
              onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
               onClick="efcalendar_2_click(this);">
		    </td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_result" title="<%=I18nMessages.getText("label.EDOnlineUserList","在线用户列表")%>" style="overflow: scroll;">
<div id="ef_grid_result" title="<%=I18nMessages.getText("label.EDOnlineUserList","在线用户列表")%>" style="overflow: hidden;"></div>
</div>

<div id="ef_region_total" title="<%=I18nMessages.getText("label.EDOnlineUserCount","在线人数")%>">
<div id="ef_grid_total" title="<%=I18nMessages.getText("label.EDOnlineUserCount","在线人数")%>" style="overflow: hidden;height:100px;"></div>
</div>

<EF:EFRegion />
	<EF:EFGrid blockId="result" autoDraw="yes" readonly="true" enable="false" ajax="true" queryMethod="query">
	<EF:EFColumn ename="loginName" width="150" />
	<EF:EFColumn ename="ipAddress" width="150" />
	<EF:EFColumn ename="createTime" width="150" />
	<EF:EFColumn ename="browserType" width="200" />
	<EF:EFColumn ename="userSystem" width="200" />
	<EF:EFColumn ename="loginEnd" width="250"/>
	<EF:EFColumn ename="sessionId" width="300" />
	</EF:EFGrid>
	<EF:EFGrid blockId="total" autoDraw="yes" readonly="true" enable="false" ajax="true" style="navigationBar:false;operationBar:false;checkStyle:false" queryMethod="query">
	<EF:EFColumn ename="onlineDuplicated" width="200" />
	<EF:EFColumn ename="onlineDistinct" width="200" />
	</EF:EFGrid>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
