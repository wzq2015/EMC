
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,java.io.File,
com.baosight.iplat4j.er.util.*,com.baosight.iplat4j.util.transform.TransformUtils,java.util.Date,java.io.File"%><%
	
	String fileurl = request.getParameter("path");
	System.out.println(fileurl);	

	String template = request.getParameter("template");
	String[] reports = request.getParameter("reports").toString().split(";");
	String[] reportFiles = new String[reports.length];
	String templateDir = ERUtils.getTemplateDir();


	
	File dir = new File(templateDir+"model/temp/");
	System.out.println(dir.exists());
	if(!dir.exists()){
		dir.mkdir();
		System.out.println("not exist");
	}
	String[] files = dir.list();
	long nowTime = new Date().getTime();
	for(int j=0;j<files.length;j++){
		String tempStr = files[j].substring(0,files[j].indexOf("."));
		long tempFileCount = Long.parseLong(tempStr);
		long gap = nowTime - tempFileCount;
		//86400000为一天的毫秒数
		if(gap>86400000){
			File tempFile = new File(templateDir+"model/temp/"+files[j]);
			if(tempFile.exists())
				tempFile.delete();
		}
			
	}
	
	for(int i=0;i<reports.length;i++){
		String[] report = reports[i].split(",");
		reportFiles[i] = templateDir + "model/" +report[0]+"/"+ report[0]+"_"+report[1]+"_"+report[2]+".xml";
	}
	
	if(reports.length == 1)
		fileurl = templateDir + fileurl;
	else {
		fileurl = templateDir+"model/temp/"+nowTime+".rar";		
	    TransformUtils.toZipFile(fileurl,reportFiles);
	}    
	

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
