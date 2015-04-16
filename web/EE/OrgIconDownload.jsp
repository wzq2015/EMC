<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*"%>
<%
FileUploadBean bean = new FileUploadBean();
bean.setUploadType("downloadFromDBToClient");
bean.setTableName("T_HROG_ORG_TYPE");
bean.setTableBlobName("DISPLAY_ICON");
bean.setTableKeys("ORG_TYPE_ID="+request.getParameter("ORG_TYPE_ID"));
FileUploadManager manager= new FileUploadManager(bean);
manager.execute(pageContext);
response.flushBuffer();
out.clear();
out = pageContext.pushBody();
%>

