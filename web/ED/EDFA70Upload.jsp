<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,
								com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								java.util.HashMap,
								java.util.Map,
								com.baosight.iplat4j.ee.dm.utils.*,
								com.baosight.iplat4j.core.threadlocal.*,
								java.io.File,
								java.util.ArrayList,
                                java.util.List,
                                java.util.Date,
                                com.baosight.iplat4j.logging.Logger,
                                com.baosight.iplat4j.logging.LoggerFactory,
                                com.baosight.iplat4j.core.FrameworkInfo,
								com.baosight.iplat4j.util.*"%>
<%@page import="com.mysql.jdbc.log.Log"%>
<html>
<head>
<title>模板上传</title>
</head>
<body onload="uploadReady()">
<%
	Logger platLogger = LoggerFactory.getLogger("com.baosight.iplat4j.ed.service.ServiceEDFA701");
    
	FileUploadBean Bean = new FileUploadBean();

	//获取当前系统的绝对路径
	
	String bashPath = FrameworkInfo.getText("template.excel.dir");
	
	String uploadPath=bashPath+"";
	String tempPath=bashPath+"temp";
	//保存位子的相对路径
	String uploadRelaPath="";
	
	String gridId = request.getParameter("gridId");
	String templateId = request.getParameter("templateId");
	String templateName = request.getParameter("templateName");
	templateName=new String(templateName.getBytes("ISO8859_1"),"UTF-8");
	
//	templateName = templateName.trim();
//	  if(templateName.equals(""))
//		  templateName=" ";
	
	String fileId="0";
	String beanFileName="";
	String fileName=new Date().getTime()+"";
	String suffix="";
	 
	    Bean.setUploadFiletype("xls");
		Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);	
		Bean.setUploadFileKeepedDir(uploadPath);
		Bean.setUploadMaxSize(50*1024*1024);
		Bean.setUploadTempFileKeepedDir(tempPath);
	    FileUploadManager manager = new FileUploadManager(Bean);
	    manager.execute(pageContext);
	    
	    beanFileName=Bean.getUploadFileName();
	    File file =new File(uploadPath+beanFileName);
	   if(file.exists()&&Bean.isStatues()){
	    if(file.length()==0){
	    	request.setAttribute("upload_message","文件为空或文件不存在!");
	    	file.delete();
	    	Bean.setStatues(false);
	    }
	   }
		   
	if(Bean.isStatues())//上传Excel模板成功,把Excel模板路径放到数据库表中
	{  
		 int index=beanFileName.indexOf(".");
		 if(index>0){
			//获取文件的后缀名
			 suffix=Bean.getUploadFileName().substring(beanFileName.lastIndexOf("."));
		 }
		 long fileSize=0;
//		 String userId = String.valueOf(UserSession.getLoginName());
		 if(file.exists()){
//			fileSize=file.length();
			file.renameTo(new File(uploadPath+fileName+suffix));
		 }
		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
		HashMap map=new HashMap();

		    map.put("gridId",gridId);
		    map.put("templateId",templateId);
		    map.put("templateName",templateName);
//		    map.put("fileDes",fileDes);
//		    map.put("typeId",typeId);
//		    map.put("fileSize",fileSize+"");
			map.put("templateFilepath",uploadRelaPath+fileName+suffix);
//			map.put("recCreator",userId);
//			map.put("recCreateTime",DateUtils.curDateTimeStr14());
			dao.update("tedfa701.insert",map);	
	}
	
	pageContext.getResponse().flushBuffer();
%>
<input id="upload_message" type="hidden" value=<%=request.getAttribute("upload_message") %>/> 
<hr>
<br>

<script type="text/javascript">
uploadReady = function(){
	alert("上传成功！");
	 if (window.opener!=null&&!window.opener.closed) {
	             window.opener.efform_onPopupReturn("EDFA70Upload", "0");	
             }
	window.close();
}
</script>

</body>
</html>
