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
									org.apache.commons.httpclient.util.URIUtil,
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
	
	//String fileclassid = (String)request.getParameter("fileclassid");
	String templateDefId = (String)request.getParameter("templateDefId");
	String templateTypeId = (String)request.getParameter("templateTypeId");
	String templateDefName = request.getParameter("templateDefName");
	if(templateDefName!=null){
    	templateDefName=URIUtil.decode(templateDefName);
    }
	String templateFileName = (String)request.getParameter("templateFileName");
	String suffix = (String)request.getParameter("suffix");
	String nodeId = (String)request.getParameter("nodeId");
	String nodeType = (String)request.getParameter("nodeType");
	String isCheck  = (String)request.getParameter("isCheck");
	
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
	
	uploadPath += templateTypeId +"/";
	webPath+=templateTypeId+"/";
	
	FileUploadBean Bean = new FileUploadBean();
	Bean.setUploadFiletype("zip,jsp");
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
	
	Bean.setUploadFileKeepedDir(uploadPath);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
	
	String returnStr = "模板操作异常！";
	if(Bean.isStatues() && !"true".equals(isCheck))//上传文件成功,把文件路径放到数据库表中
	{
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "ECSM08");
		info.set(EiConstant.methodName, "parse");
		info.set("bean",Bean);
		info.set("uploadPath",uploadPath);
		info.set("templateTypeId",templateTypeId);
		info.set("templateDefId",templateDefId);
		info.set("webPath",webPath);
		
		info.set("templateDefName",templateDefName);
		info.set("templateFileName",templateFileName);
		info.set("suffix",suffix);
		info.set("nodeId",nodeId);
		info.set("nodeType",nodeType);
		EiInfo outInfo = SoaManager.invoke(info);
	    returnStr = outInfo.getString("returnStr");
	     
	    if(returnStr!=null)
	    	out.println(returnStr);
	}
	//模板校验
	if(Bean.isStatues() && "true".equals(isCheck)){
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "ECTM01");
		info.set(EiConstant.methodName, "uploadValid");
		info.set("bean",Bean);
		info.set("uploadPath",uploadPath);
		EiInfo outInfo = SoaManager.invoke(info);
		
		returnStr = outInfo.getString("validMsg"); 
	}

	pageContext.getResponse().flushBuffer();

	if (Bean.isStatues()&& !"true".equals(isCheck)) {
		out.println("<script type=\"text/javascript\">");
		if(returnStr.contains("成功")){
			out.println("parent.uploadcallBack('操作成功，模板已上传！','0');");
		}else{
			out.println("parent.uploadcallBack('模板解析失败，请上传正确的模板！','1');");
		}
		//out.println("parent.uploadcallBack('"+ msg +"');");
		out.println("</script>");
	} else{
		out.println("<script type=\"text/javascript\">");
		out.println("parent.uploadcallBack2('"+ returnStr +"');");
		out.println("</script>");
	}
%>
</body>
</html>
