<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
com.baosight.iplat4j.core.ei.EiInfo,com.baosight.iplat4j.util.transform.DataParser,
com.baosight.iplat4j.core.spring.SpringApplicationContext, 
com.baosight.iplat4j.util.eixlstyle.writer.XLSWriter,
com.baosight.iplat4j.util.eixlstyle.reader.XLSReader,
java.io.File"%>
<html>
<head>
<title>模板导出</title>
</head>
<body>
<%
	
	EiInfo info = (EiInfo)request.getAttribute("ei");
 	String temPath = info.getString("temPath");
 	
	File file = new File(temPath);
	
	if(file.exists()){
		XLSWriter writer = new XLSWriter();
		XLSReader reader = writer.dealData(new XLSReader(temPath), info);
	
		FileUploadManager manager = new FileUploadManager();	
		manager.downloadFromObjectToClient(System.currentTimeMillis() + ".xls",reader.getHssfBook(),pageContext);
	}
%>

<%if(!file.exists()) {%>
<script type="text/javascript">
	alert("文件路径错误或者文件不存在!");
</script>
<%} %>

</body>
</html>
