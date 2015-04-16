<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.ei.EiInfo,
								java.util.List,
								com.baosight.iplat4j.ec.util.TemplateConstant"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	EiInfo eiInfo = (EiInfo) request.getAttribute("ei");
	String siteId = eiInfo.getString("siteId");
	String columnId = eiInfo.getString("columnId");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>高级搜索</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM1501.js"></script>
	<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
</head>
<body class="">

<form id="ECTM1501" method="POST" action="<%=actionUrl%>" >
<input id="siteId" name="siteId" value="<%=siteId %>" type="hidden"/>
<input id="columnId" name="columnId" value="<%=columnId %>" type="hidden"/>
	<table align=center>
		<tr>
			<td></td>
			<td  align="center" valign="center" style="font-size:36px; font-weight:bolder">高级搜索</td>
		</tr>
		<br><br>
		<tr>
			<td style="font-size: 12px;">文章标题：</td>
			<td><input id="articleTitle" name="articleTitle" value="" type="text" size="40"/></td>
		</tr>
		
		<tr>
			<td style="font-size: 12px;">文章作者：</td>
			<td><input id="author" name="author" value="" type="text" size="40"/></td>
		</tr>
		
		<tr>
			<td style="font-size: 12px;">文章摘要：</td>
			<td><input id="articleAbstract" name="articleAbstract" value="" type="text" size="40"/></td>
		</tr>
		
		<tr>
			<td style="font-size: 12px;">文章正文：</td>
			<td><input id="articleContent" name="articleContent" value="" type="text" size="40"/></td>
		</tr>
	
		<tr>
			<br><br>
		</tr>
		<tr>
			<td></td>
			<td><input style="font-size: 14px; width: 80px; padding-top: 2px; height: 22px" id="advancedSearch" value="高级搜索" type="button" /></td>
		</tr>
	</table>
</form>
</body>
</html>   
