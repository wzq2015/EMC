<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
java.util.HashMap,
java.util.Map,
com.baosight.iplat4j.dao.*,
com.baosight.iplat4j.core.spring.SpringApplicationContext,
java.util.List"%><%
	FileUploadBean bean = new FileUploadBean();
	bean.setUploadType(UpLoadUtil.DOWNLOAD_FROM_SERVER_TO_CLIENT);
	String  file= request.getParameter("file");
	bean.setFileURLOfDownServerToClient(file);
	FileUploadManager manager= new FileUploadManager(bean);
	manager.execute(pageContext);
%>

