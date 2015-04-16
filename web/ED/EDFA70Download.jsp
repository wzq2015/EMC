<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
java.io.File,
com.baosight.iplat4j.er.util.*,
com.baosight.iplat4j.core.FrameworkInfo"%>
<html>
<head>
<title>模板下载</title>
</head>
<body">
<%
	
	String fileurl = request.getParameter("templateFilepath");
	String bashPath=FrameworkInfo.getText("template.excel.dir"); 
	fileurl = bashPath + fileurl;
	
	File file = new File(fileurl);
	
	if(file.exists()){
		FileUploadBean fileuploadbean= new FileUploadBean();
		fileuploadbean.setFileURLOfDownServerToClient(fileurl);
		fileuploadbean.setUploadType("downloadFromServerToClient");
		FileUploadManager manager = new FileUploadManager(fileuploadbean);	
		manager.execute(pageContext);
	}   
%>    
<%if(!file.exists()) {%>
<script type="text/javascript">
	alert("文件路径错误或者文件不存在!");
</script>
<%} %>

</body>
</html>
