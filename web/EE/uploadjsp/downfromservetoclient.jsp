<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*"%><%
	String fileurl = "C:/WINDOWS/winhelp.exe";
	FileUploadBean fileuploadbean= new FileUploadBean();
	fileuploadbean.setFileURLOfDownServerToClient(fileurl);
	fileuploadbean.setUploadType("downloadFromServerToClient");
	FileUploadManager manager = new FileUploadManager(fileuploadbean);	
//	manager.downloadFromServerToClient(fileurl,pageContext);
	manager.execute(pageContext);
%>
<%=fileuploadbean.getPromptMessage() %>
