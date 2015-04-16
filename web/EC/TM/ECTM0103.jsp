<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java"    import="com.baosight.iplat4j.upload.*,
                                    com.baosight.iplat4j.er.util.*,
									com.baosight.iplat4j.dao.*,
									com.baosight.iplat4j.common.er.domain.*,
									java.util.HashMap,
									java.util.Map,
									com.baosight.iplat4j.core.FrameworkInfo,
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
									java.lang.String"%>
<html>
<head>
<title>模板上传结果</title>
</head>
<body>
<%
com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
	//String bashPath = request.getRealPath(request.getContextPath());
    String bashPath=FrameworkInfo.getText("ectemplate.path");
    String webPath=request.getRealPath(request.getContextPath());
	webPath=webPath.substring(0,webPath.lastIndexOf(File.separator)); 
	String relaPath="../..";
	String filepath=bashPath+"/File";
	String uploadPath=bashPath+"/File/module/";
	webPath=webPath+"/EC/File/module/";
	String tempPath=bashPath+"/File/module/temp/";	
	String fileclassid = (String)request.getParameter("fileclassid");
	String templateDefId = (String)request.getParameter("templateDefId");
	
	//模板编号
	String fileId="0";
	//模板上传后名称
	String file_name="";
	//模板上传前名称
	String file_srcname="";
	//模板单元数组
	HashMap UnitInfo = null;
	
	String key=null;
	String value="";
	String uploadFileName = "m"+DateUtils.curDateMselStr18();
	
	File dirFile = new File(filepath);
	if ( ! (dirFile.exists()) && !(dirFile.isDirectory()))  {
	    dirFile.mkdirs();
	}
	dirFile = new File(uploadPath.substring(0,uploadPath.length()-1));
	if ( ! (dirFile.exists()) && !(dirFile.isDirectory()))  {
	    dirFile.mkdirs();
	}
	dirFile = new File(uploadPath+"1");
	if ( ! (dirFile.exists()) && !(dirFile.isDirectory()))  {
	    dirFile.mkdirs();
	}
	dirFile = new File(uploadPath+"2");
	if ( ! (dirFile.exists()) && !(dirFile.isDirectory()))  {
	    dirFile.mkdirs();
	}
	dirFile = new File(uploadPath+"3");
	if ( ! (dirFile.exists()) && !(dirFile.isDirectory()))  {
	    dirFile.mkdirs();
	}
	dirFile = new File(uploadPath+"0");
	if ( ! (dirFile.exists()) && !(dirFile.isDirectory()))  {
	    dirFile.mkdirs();
	}
	dirFile = new File(uploadPath+"9");
	if ( ! (dirFile.exists()) && !(dirFile.isDirectory()))  {
	    dirFile.mkdirs();
	}		
	
	uploadPath += fileclassid +"/";
	webPath+=fileclassid+"/";
	EiInfo inInfo = new EiInfo();
	String reportId = (String)request.getParameter("reportId");
	String reportBelongTo = (String) request.getParameter("reportBelongTo");
	String reportVersion = (String) request.getParameter("reportVersion");
	String funcCommonPara = (String) request.getParameter("funcCommonPara");

	inInfo.set("reportId",reportId);
	inInfo.set("reportBelongTo",reportBelongTo);
	inInfo.set("reportVersion",reportVersion);
	inInfo.set("funcCommonPara",funcCommonPara);
	
	FileUploadBean Bean = new FileUploadBean();
	Bean.setUploadFiletype("zip,jsp");
	
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);

	Bean.setUploadFileKeepedDir(uploadPath);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	if(Bean.isStatues())//上传文件成功,把文件路径放到数据库表中
	{
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "ECTM01");
		info.set(EiConstant.methodName, "parse");
		info.set("bean",Bean);
		info.set("uploadPath",uploadPath);
		info.set("fileclassid",fileclassid);
		info.set("templateDefId",templateDefId);
		info.set("webPath",webPath);
		EiInfo outInfo = SoaManager.invoke(info);
	    String returnStr = outInfo.getString("returnStr");
	     
	    if(returnStr!=null)
	    	out.println(returnStr);
	}

	pageContext.getResponse().flushBuffer();

	if (Bean.isStatues()) {
%>
	<script type="text/javascript">
		if (!window.opener.closed) {
			window.opener.efform_onPopupReturn("ECTM01", "0");	
		}
		setTimeout("closewindow()",10000);
		function closewindow(){
		}
	</script>
<%} %>
</body>
</html>
