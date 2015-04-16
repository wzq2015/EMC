
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,com.baosight.iplat4j.util.DateUtils,com.baosight.iplat4j.core.threadlocal.UserSession,java.io.*"%>
<html>
<head>
<title> upload</title>
</head>
<body>
<%
	FileUploadBean Bean = new FileUploadBean();
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
	Bean.setUploadAllChangedName(UserSession.getLoginName()+DateUtils.curDateTimeStr14());
	//Bean.setUploadFileKeepedDir("E:/files/");
    String path = request.getSession().getServletContext().getRealPath(File.separator)+"EV"+File.separator+"upload_pic"+File.separator;	
	Bean.setUploadFileKeepedDir(path);
	Bean.setUploadFiletype("jpg,gif,png,swf");
	Bean.setUploadMaxSize(1*1024*1024);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	pageContext.getResponse().flushBuffer();
%>
<font color="red" > <%=request.getAttribute("upload_message") %> </font>
<input id='filename' type="hidden" value="<%=java.net.URLEncoder.encode(Bean.getUploadFileName())%>">
<input id='id' type="hidden" value="<%=request.getParameter("id")%>">

<%if(Bean.isStatues()) {%>
<script type="text/javascript">
window.opener.uploadSuc("EV/upload_pic/"+document.getElementById("filename").value,document.getElementById("id").value);
window.close();
</script>
<%}%>
</body>
</html>
