<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.baosight.vfj.info.*" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@page import="com.baosight.iplat4j.core.threadlocal.*" %>
<%@page import="com.baosight.iplat4j.core.resource.Resources" %>
<%@page import="com.baosight.iplat4j.util.DateUtils" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<% ServletInfo servletInfo = new ServletInfo(application); %>
<!--<% //DatabaseInfo databaseInfo = new DatabaseInfo();%>-->
<% SystemInfo sysInfo = new SystemInfo();%>

<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title>系统信息</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EP/EP03.js"></script>  
</HEAD>

<body class="bodyBackground">
<jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_app" title="应用服务器信息" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">应用服务器:</td>
		<td nowrap><%=servletInfo.getServerInfo()%></td>
	</tr>
	<tr>
		<td nowrap width="15%">servlet版本:</td>
		<td nowrap><%=servletInfo.getServletVersion()%></td>
	</tr>
	<tr>
		<td nowrap width="15%">服务器地址:</td>
		<td nowrap><%=request.getLocalAddr()%></td>
	</tr>
	<tr>
		<td nowrap width="15%">服务器端口:</td>
		<td nowrap><%=request.getLocalPort()%></td>
	</tr>
	<tr>
		<td nowrap width="15%">虚拟机内存:</td>
		<td nowrap id="totalMemory"></td>
	</tr>
	<tr>
		<td nowrap width="15%">虚拟机空闲内存:</td>
		<td nowrap id="freeMemory"></td>
	</tr>
</table>
</div>
</div>


<div id="ef_region_db" title="数据库信息" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">数据库:</td>
		<td nowrap id="dbName"></td>
	</tr>
	<tr>
		<td nowrap width="15%">数据库URL:</td>
		<td nowrap id="dbUrl"></td>
	</tr>
	<tr>
		<td nowrap width="15%">数据库用户名:&nbsp&nbsp&nbsp</td>
		<td nowrap id="dbUserName"></td>
	</tr>
</table>
</div>
</div>

<!-- ePass与平台深度整合，无需 
<div id="ef_region_epassdb" title="epass数据库信息" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">数据库:</td>
		<td nowrap id="epassDbName"></td>
	</tr>
	<tr>
		<td nowrap width="15%">数据库URL:</td>
		<td nowrap id="epassDbUrl"></td>
	</tr>
	<tr>
		<td nowrap width="15%">数据库用户名:&nbsp&nbsp&nbsp</td>
		<td nowrap id="epassDbUserName"></td>
	</tr>
</table>
</div>
</div>
 -->

<div id="ef_region_iplat" title="平台信息" >
<div style="overflow:hidden;width:100%">
<table>
<!--  	<tr>
		<td nowrap width="15%">JS库版本:</td>
		<td nowrap><script>document.write(ef_version)</script></td>
	</tr> 
-->	
	<tr>
		<td nowrap width="15%">平台版本:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
		<td nowrap id="serverVersion"></td>
	</tr>
	<tr>
		<td nowrap width="15%">许可证信息:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
		<td nowrap id="licenseInfo"></td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_window" title="窗口信息"  style="display:none">
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">窗口信息:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
		<td nowrap id="windowInfo"></td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_class" title="class载入信息" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">class名称:</td>
		<td nowrap><EF:EFInput blockId="" ename="EP03className" row="" etc="size=60" /></td>
	</tr>
	<tr>
		<td nowrap width="15%">载入路径:</td>
		<td nowrap id="codeSource"></td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_bean" title="bean信息" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">bean名称:</td>
		<td nowrap><EF:EFInput blockId="" ename="EP03beanName" row="" /></td>
	</tr>
	<tr>
		<td nowrap width="15%">是否已定义:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
		<td nowrap id="defineFlag"></td>
	</tr>
	<tr>
		<td nowrap width="15%">类名:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
		<td nowrap id="classInfo"></td>
	</tr>
	<tr>
		<td nowrap width="15%">对象信息:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
		<td nowrap id="beanInfo"></td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_session" title="session信息" style="display:none">
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">sessionID:</td>
		<td nowrap><%=session.getId() %></td>
	</tr>
	<tr>
		<td nowrap width="15%">创建时间:</td>
		<td nowrap><%=DateUtils.toDateTimeStr19(new java.util.Date(session.getCreationTime())) %></td>
	</tr>
	<tr>
		<td nowrap width="15%">最后访问时间:</td>
		<td nowrap><%=DateUtils.toDateTimeStr19(new java.util.Date(session.getLastAccessedTime())) %></td>
	</tr>
	<tr>
		<td nowrap width="15%">当前用户:</td>
		<td nowrap><%=session.getAttribute("loginname") %></td>
	</tr>
	<tr>
		<td nowrap width="15%">当前用户ID:</td>
		<td nowrap><%=session.getAttribute("userid") %></td>
	</tr>
	<tr>
		<td nowrap width="15%">客户地址:</td>
		<td nowrap><%=UserSession.getRemoteAddr(request)%></td>
	</tr>
	<tr>
		<td nowrap width="15%">客户主机:</td>
		<td nowrap><%=request.getRemoteHost() %></td>
	</tr>
	<tr>
		<td nowrap width="15%">客户端口:</td>
		<td nowrap><%=request.getRemotePort() %></td>
	</tr>
	<tr>
		<td nowrap width="15%">访问sessionId:</td>
		<td nowrap><%=request.getRequestedSessionId() %></td>
	</tr>
	<tr>
		<td nowrap width="15%">当前线程名称:</td>
		<td nowrap><%=Thread.currentThread().getName() %></td>
	</tr>
	<tr>
		<td nowrap width="15%">当前线程信息:</td>
		<td nowrap><%=Thread.currentThread().toString() %></td>
	</tr>
	<tr>
		<td nowrap width="15%">线程上下文用户:</td>
		<td nowrap><%=UserSession.getLoginName()%></td>
	</tr>
	<tr>
		<td nowrap width="15%">线程上下文用户ID:</td>
		<td nowrap><%=UserSession.getUserId()%></td>
	</tr>
	<tr>
		<td nowrap width="15%">线程上下文用户键:</td>
		<td nowrap><%=Resources.getValue(
				ThreadConstants.threadlocalResourceProvider,
				ThreadConstants.resource_loginName)%></td>
	</tr>
	<tr>
		<td nowrap width="15%">线程上下文用户ID键:</td>
		<td nowrap><%=Resources.getValue(
				ThreadConstants.threadlocalResourceProvider,
				ThreadConstants.resource_userId)%></td>
	</tr>
	<tr>
		<td nowrap width="15%">线程上下文配置键:</td>
		<td nowrap><%=Resources.getValue(
				ThreadConstants.threadlocalResourceProvider,
				ThreadConstants.resource_sessionKeys)%></td>
	</tr>
	<tr>
		<td nowrap width="15%">线程上下文ip:</td>
		<td nowrap><%=UserSession.getIpaddress()%></td>
	</tr>
</table>
</div>
</div>

<EF:EFRegion/>

</body>
</html>
