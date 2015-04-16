<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,
com.baosight.iplat4j.core.*"%>
<%
FileUploadBean bean = new FileUploadBean();
bean.setTableBlobName("tempfile");
bean.setTableName(FrameworkInfo.getPlatSchema()+".tee50");
bean.setTableKeys("id="+request.getParameter("id"));
bean.setUploadType("downloadFromDBToClient");
bean.setFileNameOfDownloadFromDBToClient(request.getParameter("id")+ ".jpg");
FileUploadManager manager= new FileUploadManager(bean);
manager.execute(pageContext);
%>

