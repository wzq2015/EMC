<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="java.net.URLDecoder"%>
<HTML>
<BODY BGCOLOR="white">
<%

	
    String imagePath=request.getParameter("filePath");
    String  imageId= request.getParameter("fileId");
    String url=null;
if(imagePath!=null && imagePath.contains("/content")){
    //imagePath=FrameworkInfo.getText("upload.dir")+imagePath.substring(1);
	 url =  imagePath; // "ECDM0104.jsp?filePath="+imagePath;
}
else if(imageId!=null){
	
	 url = "ECDM0104.jsp?fileId="+imageId;
   
}
%>
<img id="image2"/>
<input id='imagePath' type="hidden" value="<%=imagePath %>">
<input id='imageId' type="hidden" value="<%=imageId %>">
</BODY>
</HTML>
<script language="JavaScript" type="text/javascript">
document.getElementById("image2").src=encodeURI("<%=url%>");
</script>
