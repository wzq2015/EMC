
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,java.io.File,
com.baosight.iplat4j.er.util.*"%><%
	
	String fileurl = request.getParameter("path");
	String template = request.getParameter("template");
	if(template == null)
		fileurl = ERUtils.getTemplateDir()+fileurl;
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
