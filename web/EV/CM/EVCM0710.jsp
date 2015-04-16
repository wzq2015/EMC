
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
                                com.baosight.iplat4j.ec.util.ECLogConstant,
                                com.baosight.iplat4j.ec.lg.utils.ECLGConstant,
                                com.baosight.iplat4j.ec.lg.utils.ECLGUtils,
                                com.baosight.iplat4j.core.FrameworkInfo,
                                com.baosight.iplat4j.ec.util.*,
                                com.baosight.iplat4j.util.GenGraphic,
                                org.apache.commons.lang.StringUtils,
								com.baosight.iplat4j.util.*"%>
<%@page import="com.mysql.jdbc.log.Log"%>
<html>
<head>
<title> upload</title>
</head>
<body>
<%
//RS:112785
   
	Logger platLogger = LoggerFactory.getLogger("com.baosight.iplat4j.ec.dm.service.ServiceECDM01");
    com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
    String userId = PlatUtils.getUserId();
    String msg="上传失败";
    String bashPath = request.getRealPath(request.getContextPath());
	bashPath=bashPath.substring(0,bashPath.lastIndexOf(File.separator)); 
	

	String layoutId = request.getParameter("layoutId");

	FileUploadBean Bean = new FileUploadBean();
	String toFile = bashPath+File.separator+"EV"+File.separator+"layout_upload"+File.separator ;
 
	Bean.setUploadFiletype("jpg,gif,png");
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
	Bean.setUploadFileKeepedDir(toFile);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
    
	String beanFileName=Bean.getUploadFileName();
	 File file =new File(toFile+beanFileName);
	   if(file.exists()&&Bean.isStatues()){
		   File newFile=new File(toFile+layoutId+".jpg");
		   if(newFile.exists())  newFile.delete();
	       file.renameTo(newFile);
	       String bigImagePath=toFile+File.separator+"396x171";
		   String littleImagePath=toFile+File.separator+"35x35";
		   File big=new File(bigImagePath);
			File little=new File(littleImagePath);
			 if(!big.exists())
				 big.mkdirs();
			 
			 if(!little.exists())
				 little.mkdirs();
			 
			 GenGraphic.transferGraphic(toFile+layoutId+".jpg", bigImagePath+File.separator+layoutId+".jpg", 396, 171);
			 GenGraphic.transferGraphic(toFile+layoutId+".jpg", littleImagePath+File.separator+layoutId+".jpg", 35, 35);
			 msg="上传成功";
	   }
	pageContext.getResponse().flushBuffer();
%>

<hr>
<br>
<input id="msg" type="hidden" value="<%=msg %>">

<script type="text/javascript">
var msg = document.getElementById("msg").value;
parent.uploadcallBack(msg);	
</script>
</body>
</html>
