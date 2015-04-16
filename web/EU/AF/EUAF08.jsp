<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.eu.af.config.FileUpLoadManager" %>
<%
    String attachmentId = request.getParameter("attachmentId");
    FileUpLoadManager fileUpLoadManager =(FileUpLoadManager) SpringApplicationContext.getBean("fileUpLoadManager");
    fileUpLoadManager.deleteAttachment(attachmentId);
%>
