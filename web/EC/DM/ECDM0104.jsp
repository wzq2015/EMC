<!DOCTYPE html>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*"%>
<%@ page language="java"  import="
        com.baosight.iplat4j.ec.util.*,
     	com.baosight.iplat4j.core.spring.SpringApplicationContext,
		com.baosight.iplat4j.dao.*,
		java.util.HashMap,
		com.baosight.iplat4j.common.ec.domain.Tecdm01,
		com.baosight.iplat4j.core.FrameworkInfo,
		java.util.ArrayList,
        java.util.List,
		java.util.Map"%>
<%@page import="java.net.URLDecoder"%>
<%
	String imagePath = "";
	FileUploadBean fileuploadbean= new FileUploadBean();
	String bashPath=FrameworkInfo.getText("upload.dir"); 
	
	String filePath=request.getParameter("filePath");
  	if(filePath!=null){
  		filePath = URLDecoder.decode(filePath,"utf-8");
  		fileuploadbean.setFileURLOfDownServerToClient(filePath);		
  	}else{
  		String imageId=request.getParameter("fileId"); //例：iplat4j01343364634000#
		if(imageId!=null && imageId.indexOf("@")!=-1){
			int index = imageId.indexOf("@");
			imageId = imageId.substring(0,index);
		}
	    if(imageId!=null){
	    	Dao dao = (Dao) SpringApplicationContext.getBean("dao");
			HashMap map=new HashMap();
			map.put("fileId",imageId);
			List fileList=dao.query("tecdm01.query",map);
			Tecdm01 tecdm01 = new Tecdm01();
			if(fileList.size()>0){
				tecdm01 = (Tecdm01)fileList.get(0);
				imagePath = tecdm01.getFilePath();
        			
				if(request.getParameter("fileId").indexOf("@")!=-1){
					int index = imagePath.lastIndexOf("/");
					String str1 = imagePath.substring(0,index)+ "/littleImage";
					String str2 = imagePath.substring(index);
					imagePath = str1 + str2;
				}
			
				imagePath=bashPath+imagePath;
			}
	    }
		//获取默认图片
	    if(imagePath==null || "".equals(imagePath)){	
		String path = request.getRealPath("/");
		imagePath = path+TemplateConstant.DEFAULT_IMG;
	    }
		fileuploadbean.setFileURLOfDownServerToClient(imagePath);	
  	}
  	
	fileuploadbean.setUploadType("downloadFromServerToClient");
	FileUploadManager manager = new FileUploadManager(fileuploadbean);	
	manager.execute(pageContext);
%><%=fileuploadbean.getPromptMessage() %>
