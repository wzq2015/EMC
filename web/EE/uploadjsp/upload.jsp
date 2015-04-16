<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,com.baosight.iplat4j.er.util.*,
								com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								com.baosight.iplat4j.common.er.domain.*,
								java.util.HashMap,
								java.util.Map,
								com.baosight.iplat4j.core.threadlocal.*,
								com.baosight.iplat4j.util.*,
								com.baosight.iplat4j.core.*"%>
<html>
<head>
<title> upload</title>
</head>
<body>
<%
	FileUploadBean Bean = new FileUploadBean();
	Bean.setTableKeys("id="+request.getParameter("id"));
	Bean.setTableName(FrameworkInfo.getPlatSchema()+".tee50");
	Bean.setTableBlobName("tempfile");
	Bean.setUploadFiletype("jpg");
	Bean.setUploadType("uploadToDB");
	
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	
	if(Bean.isStatues())//上传文件成功,把文件路径放到数据库表中
	{
		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
		Map map = new HashMap();
		map.put("id",request.getParameter("id"));
		map.put("name",Bean.getUploadFileName());
		dao.update("EE50.update",map);
	}	
	
	
	pageContext.getResponse().flushBuffer();
%>
<font color="red" > <%=request.getAttribute("upload_message") %> </font>
<input id='filename' type="hidden" value=<%=Bean.getUploadFileName()%>>
<input id='rowIndex' type="hidden" value=<%=request.getParameter("rowIndex")%>>
<hr>
<br>
<input type="button" value="关闭" onclick="closewindow()"/>
<%if(Bean.isStatues()) {%>
<script type="text/javascript">
window.opener.uploadSuc(document.getElementById("filename").value,document.getElementById("rowIndex").value);
//alert('hello');
</script>
<%}%>
<script type="text/javascript">
closewindow = function(){
	window.close();
}
</script>
</body>
</html>
