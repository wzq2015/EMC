
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,com.baosight.iplat4j.er.util.*"%><%
	String url = application.getRealPath("");
	String fileurl = ERUtils.getTemplateDir()+"/EDFA00_RESULT.xls";
	FileUploadBean fileuploadbean= new FileUploadBean();
	fileuploadbean.setFileURLOfDownServerToClient(fileurl);
	fileuploadbean.setUploadType("downloadFromServerToClient");
	FileUploadManager manager = new FileUploadManager(fileuploadbean);	
//	manager.downloadFromServerToClient(fileurl,pageContext);
	manager.execute(pageContext);
%>
<%=fileuploadbean.getPromptMessage() %>
