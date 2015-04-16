<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ page language="java"
	import="com.baosight.iplat4j.security.sso.SSOCredential"%>
<%@ page language="java"
	import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@ page language="java"
	import="com.baosight.iplat4j.security.bridge.SecurityBridge"%>
<%@ page language="java"
	import="com.baosight.iplat4j.security.bridge.SecurityBridgeFactory"%>
<%@ page language="java"
	import="com.baosight.iplat4j.core.resource.Resources"%>
<%

	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	
	String host = Resources.getValue("iPlatConfig", "serviceHostAddr");

	String username = request.getParameter("p_username");
	String cred = request.getParameter("p_password");
	String authen = request.getParameter("p_authen");

	boolean valid = false;

	if (username != null && cred != null & authen != null) {
		SSOCredential credentialChecker = (SSOCredential) SpringApplicationContext
				.getBean("PwdReset");

		try {
			valid = credentialChecker
					.validateCredential(cred, username);
		} catch (Exception e) {
			valid = false;
		}

	}
	
	if(valid) {
		SecurityBridge b = SecurityBridgeFactory.getBridge();
		b.setUserValid(username, true);
	}

%>
<html>
  <head>
    <title></title>
    <link href="framework/css/style.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	
  </head>
  <body>
  	<script type="text/javascript">
  	if(<%=valid%>) {
  	  	alert("激活成功!");  	  	
  	} else {
  	  	alert("认证信息有误!");
  	}
  	window.location = "<%=host%>/login.jsp";
  	</script>
  </body>
</html>
