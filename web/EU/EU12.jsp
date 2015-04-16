<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,
com.baosight.iplat4j.core.ei.EiInfo"%>
<%
	
	EiInfo info = (EiInfo)request.getAttribute("ei");
	
	String outputFileName = (String)info.getString("OUTPUT_FILE_NAME");
	response.setContentType("application/unknown");
	response.addHeader("Content-Disposition", "attachment; filename="+outputFileName);
	response.getWriter().print(info.getString("SQL"));
		
%>
