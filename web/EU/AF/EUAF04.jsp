<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.eu.af.config.FileUpLoadManager" %>
<%
    FileUpLoadManager fileUpLoadManager =(FileUpLoadManager) SpringApplicationContext.getBean("fileUpLoadManager");
    try {
        String attachmentId = fileUpLoadManager.uploadFile(pageContext);
        out.print(attachmentId);
    } catch (Exception e) {
        e.printStackTrace(); 
    }
%>
