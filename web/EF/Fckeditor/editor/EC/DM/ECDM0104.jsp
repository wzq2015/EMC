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
<%
	String imagePath=request.getParameter("filePath");
  if(imagePath!=null)
	imagePath = new String(imagePath.getBytes("ISO-8859-1"),"UTF-8");
	FileUploadBean fileuploadbean= new FileUploadBean();
	String bashPath=FrameworkInfo.getText("upload.dir"); 
	if(imagePath==null){//获取默认图片
		String imageId=request.getParameter("fileId");
	    if(imageId!=null){
	    	Dao dao = (Dao) SpringApplicationContext.getBean("dao");
			HashMap map=new HashMap();
			map.put("fileId",imageId);
			List fileList=dao.query("tecdm01.query",map);
			Tecdm01 tecdm01 = new Tecdm01();
			if(fileList.size()>0){
				tecdm01 = (Tecdm01)fileList.get(0);
				imagePath = tecdm01.getFilePath();
				imagePath=bashPath+imagePath;
				
			}
			
	    }
	    if(imagePath==null){	
		String path = request.getRealPath("/");
		imagePath = path+TemplateConstant.DEFAULT_IMG;
	    }
	}
	
	fileuploadbean.setFileURLOfDownServerToClient(imagePath);
	fileuploadbean.setUploadType("downloadFromServerToClient");
	FileUploadManager manager = new FileUploadManager(fileuploadbean);	
	manager.execute(pageContext);
%><%=fileuploadbean.getPromptMessage() %>