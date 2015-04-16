<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.baosight.vfj.info.*" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@page import="com.baosight.iplat4j.core.threadlocal.*" %>
<%@page import="com.baosight.iplat4j.core.resource.Resources" %>
<%@page import="com.baosight.iplat4j.util.DateUtils" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>


<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title>IMap值设置</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EE/DM/EEDM91.js"></script>  
</HEAD>

<body class="bodyBackground">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_app" title="应用服务器信息" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">服务器地址:</td>
		<td nowrap><%=request.getLocalAddr()%></td>
	</tr>
	<tr>
		<td nowrap width="15%">服务器端口:</td>
		<td nowrap><%=request.getLocalPort()%></td>
	</tr>
	<!-- 
	<tr>
		<td nowrap width="15%">集群Master地址:</td>
		<td nowrap id="masterAddress"></td>
	</tr>
	 -->
</table>
</div>
</div>

<div id="ef_region_imap" title="设置IMap的值" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">key:</td>
		<td nowrap><EF:EFInput blockId="" ename="imapKey" row="" etc="size=60" /></td>
	</tr>
	<tr>
		<td nowrap width="15%">value:</td>
		<td nowrap><EF:EFInput blockId="" ename="imapValue" row="" etc="size=60" /></td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_show" title="获取IMap的值">
	<textarea id="show" style="width:100%;height:300px;" ></textarea>    
</div>

<EF:EFRegion/>

</body>
</html>
