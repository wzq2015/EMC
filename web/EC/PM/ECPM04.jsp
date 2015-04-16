<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.upload.*"%>
<%@page import="com.baosight.iplat4j.common.ec.domain.Tecdm01"%>
<%@page import="com.baosight.iplat4j.dao.Dao"%>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@page import="com.baosight.iplat4j.upload.FileUploadManager"%>
<%@page import="com.baosight.iplat4j.upload.FileUploadBean"%>
<%@page import="com.baosight.iplat4j.upload.UpLoadUtil"%>
<%@page import="com.baosight.iplat4j.util.DateUtils"%>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="java.io.File"%>
<%@page import="com.baosight.iplat4j.util.PlatUtils"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="com.baosight.iplat4j.common.ec.domain.Tecsm01"%>
<%@page import="com.baosight.iplat4j.ec.tm.utils.TemplateUtils"%>
<%@page import="com.baosight.iplat4j.ec.lg.utils.ECLGUtils"%>
<%@page import="com.baosight.iplat4j.ec.lg.utils.ECLGConstant"%>
<%@page import="com.baosight.iplat4j.common.ec.domain.Tecpm03"%>
<%@page import="com.baosight.iplat4j.ec.util.ECUtil"%>
<%@page import="org.apache.commons.lang.StringUtils"%>	
<%@page import="org.eclipse.swt.printing.Printer"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="com.baosight.iplat4j.ec.util.TemplateConstant"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<script type="text/javascript" src="../../EF/jQuery/jquery-1.7.js"></script>
<script type="text/javascript" src="../../EF/EF.js"></script>
</head>
<body>
<%
	com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
	Dao dao = (Dao) SpringApplicationContext.getBean("dao");
	String userId = PlatUtils.getUserId();//当前用户
	//获取当前节点,以及节点类型
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
	String logoSeq = request.getParameter("logoSeq");
	//查询节点别名 s:站点 c:栏目
	//String bashPath1=FrameworkInfo.getText("content.url");//集群环境下的应用地址
	//获取应用下content目录
	String contentUrl = TemplateUtils.getWebContentPath()+TemplateConstant.dirStaticFile;//content文件夹路径
	String projectEname = FrameworkInfo.getPlatProjectEname();//项目英文名
	String projectType = FrameworkInfo.getProjectType();//项目类型
	TemplateUtils util = new TemplateUtils();
	String projectName =util.getProjectPath();//项目名称
	String logoId = "";
	String aliaS="";
	String uploadPath="";
	String beanFileName="";
	String relativePath="";//相对路径
	int ID_NUM=18;
	if(nodeType.equals("s")){//站点
		HashMap map = new HashMap();
		map.put("siteId",nodeId);
		List list = dao.query("ECSM01.query",map);
		if(list.size()>0){
			Tecsm01 ecsm01 = (Tecsm01)list.get(0);
			aliaS = ecsm01.getSiteAlias();	 
			uploadPath =contentUrl + "/" + aliaS + "/logo/"; 
			relativePath = projectName+"/content/"+aliaS + "/logo/"; 
		}
	}else{//栏目
		aliaS = util.getAliaString(nodeId);
		uploadPath =contentUrl + "/" + aliaS + "logo/"; 
		relativePath = projectName+"/content/"+aliaS + "logo/"; 
	}
	
	//临时目录
	String tempPath = contentUrl + "/temp/";
	
	//创建logo文件夹
	if (!(new File(uploadPath).isDirectory())) {
		new File(uploadPath).mkdirs();
	}

	String fileId=projectEname+projectType+new Date().getTime();//项目英文名+项目类型+生成文档时的时间戳   如：iplat01245223469502
	
	FileUploadBean Bean = new FileUploadBean();
	Bean.setUploadFiletype("jpg,jpeg,gif,png,bmp");
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);	
	Bean.setUploadFileKeepedDir(uploadPath);
	Bean.setUploadMaxSize(1*1024*1024);
	Bean.setUploadTempFileKeepedDir(tempPath);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	String uploadFileUrl = Bean.getUploadFileURL();
	
	beanFileName=Bean.getUploadFileName();
	File file = new File(uploadPath+beanFileName);

	if(file.exists()&&Bean.isStatues()){
		if(file.length()==0){
			request.setAttribute("upload_message","文件为空或文件不存在!");
			file.delete();
			Bean.setStatues(false);
		}
	}

	if(Bean.isStatues())
	{  
		int index=beanFileName.indexOf(".");
		String suffix = beanFileName.substring(index);
		String fileName1 = DateUtils.curDateStr(DateUtils.DATETIME14_PATTERN) + suffix;//文件重命名
		relativePath = relativePath + fileId + fileName1;
		if(file.exists()){
			String filepath = uploadPath + fileId + fileName1;
			file.renameTo(new File(filepath));	
		}
		
		Tecdm01 tecdm01 = new Tecdm01();
		tecdm01.setFileId(fileId);
		tecdm01.setFileName(beanFileName);
		tecdm01.setTypeId("0000000000000102");
		tecdm01.setFileSize(file.length());
		tecdm01.setFilePath(relativePath);
		tecdm01.setRecCreator(userId);
		tecdm01.setRecCreateTime(DateUtils.curDateTimeStr14());
		try {
			dao.insert("tecdm01.insert", tecdm01);	
		} catch (Exception e) {
			e.printStackTrace();
		}
		ECLGUtils.log(fileId ,ECLGConstant.NODE_DOC,ECLGConstant.DOC_CREATE);
		
		Tecpm03 ecpm03 = new Tecpm03();
		ecpm03.setNodeId(nodeId);
		ecpm03.setNodeType(nodeType);
		ecpm03.setLogoSeq(logoSeq);
		ecpm03.setLogoPath(fileId);
		
		logoId = ECUtil.generateId(ECUtil.LOGO_ID_GENERATE);
		logoId = StringUtils.leftPad(logoId, ID_NUM, "0");
		ecpm03.setLogoId(logoId);
		try {
			dao.insert("tecpm03.insert",ecpm03);
		} catch (Exception e) {
			request.setAttribute("upload_message","图片上传成功,但保存图片基本信息失败!");
			request.setAttribute("state","-1");
			e.printStackTrace();
		}	
	}
	pageContext.getResponse().flushBuffer();
%>

<font color="red" > <%=request.getAttribute("upload_message") %> </font><br/>
<input type="button" value="关闭" onclick="returnback()"/>
<script type="text/javascript">
	function returnback(){
		if(<%=request.getAttribute("state")%>!="-1"){
			window.parent.efform_onPopupReturn("ECPM04", "true");
		}
	}
</script>
</body>
</html>