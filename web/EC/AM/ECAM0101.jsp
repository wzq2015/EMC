<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,java.io.File,
com.baosight.iplat4j.er.util.*,com.baosight.iplat4j.util.transform.TransformUtils,java.util.Date,java.io.File,com.baosight.iplat4j.core.ei.EiInfo,com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="java.net.URLDecoder"%>
<%
	String fileurl=request.getParameter("fileurl");
	fileurl = URLDecoder.decode(fileurl,"UTF-8");
	File file1 = new File(fileurl); 
	
	if(file1.exists()){
		FileUploadBean fileuploadbean= new FileUploadBean();
		fileuploadbean.setFileURLOfDownServerToClient(fileurl);
		fileuploadbean.setUploadType("downloadFromServerToClient");
		FileUploadManager manager = new FileUploadManager(fileuploadbean);	
		manager.execute(pageContext);
		file1.delete(); 
	}else if(!file1.exists()) {
%>	
<script type="text/javascript">
	alert("文件路径错误或者文件不存在!");
</script>

<%
	} 
%>
