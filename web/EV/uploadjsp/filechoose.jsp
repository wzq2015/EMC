
<%@ page contentType="text/html;charset=UTF-8"%>
<head>
	<script type="text/javascript" src="filechoose.js"></script>
	<script type="text/javascript" src="../../EF/EF.js"></script>
</head>
<HTML>
<BODY BGCOLOR="white">
	<font color="red">*上传文件大小不要超过1M,且只能上传"jpg,gif,png,swf"等文件！</font><br/>
<HR>
<%
	//String action = "upload.jsp?id="+request.getParameter("id");
    String action = "upload_open.jsp?id="+request.getParameter("id");
%>
<FORM METHOD="POST" action=<%=action%>  enctype="multipart/form-data" >
     <input type="file" name="myfile" contentEditable="false"/><br/>
     <input type="button" value="上传" onclick="upload()"/>
</FORM>
<HR>
<script type="text/javascript">
</script>
</BODY>
</HTML>
