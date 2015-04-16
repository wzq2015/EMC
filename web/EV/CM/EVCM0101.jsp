
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
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
									com.baosight.iplat4j.ec.am.service.ServiceECAM0103,
									 com.baosight.iplat4j.util.PlatUtils,
									java.lang.String"%>
<%@page import="java.net.URLDecoder"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>主题上传</title>
</head>
<body class="bodyBackground">

<%
    com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
	String bashPath = request.getRealPath(request.getContextPath());
	bashPath=bashPath.substring(0,bashPath.lastIndexOf(File.separator)); 
	String themaFilePath= request.getParameter("themaFilePath");
//	themaFilePath=new String(themaFilePath.getBytes("ISO8859_1"),"UTF-8");
    themaFilePath=URLDecoder.decode(themaFilePath,"UTF-8");
	String themaId = request.getParameter("themaId");
	String themaEname = request.getParameter("themaEname");

	FileUploadBean Bean = new FileUploadBean();
	String toFile = FrameworkInfo.getText("upload.dir")+ ECUtil.UPLOAD_FOLDER + PlatUtils.getUserId()+File.separator ;
	
	File delFile = new File(toFile);
	ServiceECAM0103.deleteTempDir(delFile);
 
	Bean.setUploadFiletype("zip,jpg,gif,png");
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
	
	Bean.setUploadFileKeepedDir(toFile);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	String status=null;//状态位
	String msg = null;//返回信息
	String filePath= request.getSession().getServletContext().getRealPath(File.separator);
	if(Bean.isStatues()){
		
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "EVCM01");
		info.set(EiConstant.methodName, "upload");
		info.set("bean",Bean);
		info.set("themaFilePath",themaFilePath);
		info.set("themaId",themaId);
		info.set("themaEname",themaEname);
		info.set("bashPath",bashPath);
		info.set("filePath",filePath);
		EiInfo outInfo = SoaManager.invoke(info);
		msg = outInfo.getMsg();
 
		out.println("<script type=\"text/javascript\">");
		out.println("parent.uploadcallBack('"+ msg +"');");
		out.println("</script>");
	}
	pageContext.getResponse().flushBuffer();
	
%>
<form id="EVCM0101" method="POST" action="" >
	<input id="msg" type="hidden" value="<%=msg %>">
</form>
<script type="text/javascript">
var msg = document.getElementById("msg").value;
</script>
</body>
</html>  
