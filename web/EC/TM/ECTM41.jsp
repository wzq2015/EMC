<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								java.util.HashMap,
								java.util.List,
								com.baosight.iplat4j.core.ei.EiInfo,
								com.baosight.iplat4j.common.ec.domain.Tecsm01,
								com.baosight.iplat4j.ec.util.*"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>							
<%
	EiInfo info = (EiInfo)request.getAttribute("ei");
	out.print(info.getMsg());
%>
<html>
  <head>
    <title>【系统提示】</title>
  </head>
　<body class="bodyBackground" style='font-size:12px'>
    <br><br>返回<a href='login.jsp'>登录</a>页面<br><br>
    10秒钟后本页面自动关闭
　</body>
　<script>setTimeout("window.close()",10000)</script>
</html>
