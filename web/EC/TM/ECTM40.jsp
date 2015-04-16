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
<html>
<head>
<title>【系统提示】</title>
</head>
<body class="bodyBackground" style='font-size:12px'>								
<%
	EiInfo info = (EiInfo)request.getAttribute("ei");
	String url = (String)info.get("href");
	if(url==null){
		out.println(info.getMsg());
		return;
	}
	if(!url.equals("")){
		RequestDispatcher rd = request.getRequestDispatcher(url);
			try {
				rd.forward(request, response);
			} catch (ServletException e1) {
				e1.printStackTrace();
			}finally{
			out.clear();
			out = pageContext.pushBody();
		}
	}
%>
</body>
</html>
