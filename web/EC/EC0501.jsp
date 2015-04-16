<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ page language="java"    import="com.baosight.iplat4j.upload.*,
                                    com.baosight.iplat4j.er.util.*,
									com.baosight.iplat4j.dao.*,
									com.baosight.iplat4j.common.er.domain.*,
									java.util.HashMap,
									java.util.Map,
									java.io.*,
									com.baosight.iplat4j.core.threadlocal.*,
									com.baosight.iplat4j.ec.util.*,
									com.baosight.iplat4j.util.*,
									java.util.List,
									java.util.Date,
									com.baosight.iplat4j.core.ei.EiInfo,
									com.baosight.iplat4j.core.ei.EiConstant,
									com.baosight.iplat4j.ec.tm.utils.ECTMUtils,
									com.baosight.iplat4j.core.soa.SoaManager,
									com.baosight.iplat4j.core.FrameworkInfo,
									com.baosight.iplat4j.util.PlatUtils,
									java.lang.String"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>zip文件上传</title>
</head>
<body class="bodyBackground">

<%
	String bashPath = request.getRealPath(request.getContextPath());
	bashPath=bashPath.substring(0,bashPath.lastIndexOf(File.separator)+1); 
	String nodeId= request.getParameter("nodeId");
	String nodeType= request.getParameter("nodeType");
	
	
	FileUploadBean Bean = new FileUploadBean();
	String toFile = FrameworkInfo.getText("upload.dir")+ ECUtil.IMAGES_UPLOAD_FOLDER + PlatUtils.getUserId()+File.separator ;
	
	//File delFile = new File(toFile);
	ECUtil.deleteTempFolder(toFile);
 					
	Bean.setUploadFiletype("css,jpg,bmp,gif,png,jpeg,zip,js");
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
	
	
	Bean.setUploadFileKeepedDir(toFile);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	String status=null;//状态位
	String msg = null;//返回信息
	
	if(Bean.isStatues()){
		
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "EC0501");
		info.set(EiConstant.methodName, "importImages");
		info.set("bean",Bean);
		info.set("nodeId",nodeId);
		info.set("nodeType",nodeType);
		info.set("webPath",bashPath);
		EiInfo outInfo = SoaManager.invoke(info);
		msg = outInfo.getMsg();
 
		out.println("<script type=\"text/javascript\">");
		out.println("if(typeof(parent.uploadImagesCallBack)!= 'undefined') parent.uploadImagesCallBack('"+ msg +"');else uploadImagesCallBack('"+ msg +"');");
		out.println("</script>");
	}
	pageContext.getResponse().flushBuffer();
	
%>
<form id="EC0501" method="POST" action="" >
	<input id="msg" type="hidden" value="<%=msg %>">
</form>
<script type="text/javascript">
var msg = document.getElementById("msg").value;
	
</script>
</body>
</html>   
