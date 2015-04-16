<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
com.baosight.iplat4j.core.ei.EiInfo"%><%
	
	EiInfo info = (EiInfo)request.getAttribute("ei");

	response.setContentType("application/unknown");
	response.addHeader("Content-Disposition", "attachment; filename=EDFA00.sql");
	response.getWriter().print(info.getString("SQL"));
			
		
%>
