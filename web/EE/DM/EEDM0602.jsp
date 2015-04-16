<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,
								com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								java.util.HashMap,
								java.util.Map,
								com.baosight.iplat4j.ee.dm.utils.*,
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
	System.out.println(request.getParameter("type"));
	if("DB".equals(request.getParameter("type"))){
		Bean.setTableKeys("FILE_CODE='"+request.getParameter("id")+"'");
		Bean.setTableName(FrameworkInfo.getPlatSchema()+".teedm06");
		Bean.setTableBlobName("FILE_OBJ");
		Bean.setUploadFiletype("jpg"); 
		Bean.setUploadType(UpLoadUtil.UPLOAD_TO_DB);	
		Bean.setUploadMaxSize(10*1024*1024);
	}else{
		Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
		String path = EEDMUtils.getEEDMTempFileDir();	
		Bean.setUploadFileKeepedDir(path);
		Bean.setUploadFiletype("jpg");
		Bean.setUploadMaxSize(10*1024*1024);
	}
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	
	if(Bean.isStatues())//上传文件成功,把文件路径放到数据库表中
	{
		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
		Map map = new HashMap();
		if("DB".equals(request.getParameter("type"))){
			map.put("fileCode",request.getParameter("id"));
			map.put("haveObj",Bean.getUploadFileName());
			dao.update("EEDM06.updateDBFileName",map);			
		}else{
			map.put("fileUrl",EEDMUtils.getEEDMTempFileDir()+Bean.getUploadFileName());
			System.out.println(Bean.getUploadFileURL());
			map.put("fileCode",request.getParameter("id"));
			map.put("fileName",Bean.getUploadFileName());
			dao.update("EEDM06.updateServerFileName",map);	
		}
		
	}	
	pageContext.getResponse().flushBuffer();
%>
<font color="red" > <%=request.getAttribute("upload_message") %> </font>
<input id='filename' type="hidden" value="<%=Bean.getUploadFileName()%>">
<input id='rowIndex' type="hidden" value=<%=request.getParameter("rowIndex")%>>
<input id='type' type="hidden" value=<%=request.getParameter("type")%>>
<hr>
<br>
<input type="button" value="关闭" onclick="closewindow()"/>
<%if(Bean.isStatues()) {%>
<script type="text/javascript">
window.opener.uploadSuc(document.getElementById("filename").value,
	document.getElementById("rowIndex").value
	,document.getElementById("type").value);
</script>
<%}%>
<script type="text/javascript">
closewindow = function(){
	window.close();
}
</script>
</body>
</html>
