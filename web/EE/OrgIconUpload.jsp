<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.upload.*" %>
<%
 
  String type = request.getParameter("ORG_TYPE_ID");
  if ( type != null ){
		FileUploadBean uploader = new FileUploadBean();
		uploader.setUploadType("uploadToDB");
		uploader.setTableName("T_HROG_ORG_TYPE");
		uploader.setTableBlobName("DISPLAY_ICON");
		uploader.setTableKeys("ORG_TYPE_ID="+request.getParameter("ORG_TYPE_ID"));
		uploader.setUploadFiletype("jpg,word,txt,gif");	
		
		FileUploadManager manager = new FileUploadManager(uploader);
		manager.execute(pageContext);	
	}	

%>

<html>
 <body>
  <font color="red" > <%=request.getAttribute("upload_message") %> </font>

  <FORM METHOD="POST" action="OrgIconUpload.jsp?ORG_TYPE_ID=8"  enctype="multipart/form-data" >
     <input type="file" name="myfile" /><br/>
     <input type="submit" value="upload"/>
  </FORM>

  
 </body>
</html>
