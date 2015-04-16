<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.eu.af.config.FileUpLoadManager" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%
    String documentId = request.getParameter("documentId");
    FileUpLoadManager fileUpLoadManager =(FileUpLoadManager) SpringApplicationContext.getBean("fileUpLoadManager");
    String filesInfo = "[]";
    if(StringUtils.isNotEmpty(documentId)){
         filesInfo = fileUpLoadManager.getFilesInfo(documentId);
    }
    out.print(filesInfo);
%>
