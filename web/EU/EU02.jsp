<%@ page contentType="text/html;charset=UTF-8"%><%
  
  com.baosight.iplat4j.core.ei.EiInfo info = (com.baosight.iplat4j.core.ei.EiInfo)request.getAttribute("ei");
  java.io.InputStream is = (java.io.InputStream)info.get("DOWNLOAD");
  String name = (String)info.get("FILENAME");
  
  com.baosight.iplat4j.upload.FileUploadManager manager = new com.baosight.iplat4j.upload.FileUploadManager();  
  manager.downloadFromStreamToClient( name, is, pageContext );  
%>
