<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<HTML>
<head>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
</head>
<BODY BGCOLOR="white">
	<HR>
	<%
		String action = "upload.jsp?id=" + request.getParameter("id")
				+ "&rowIndex=" + request.getParameter("rowIndex");
	%>
	<FORM METHOD="POST" action=<%=action%> enctype="multipart/form-data">
		<input type="file" id="myfile" name="myfile" /><br /> 
		<input type="button"
			value="上传" onclick="upload()" />
	</FORM>
	<HR>
	<script type="text/javascript">
		function upload() {
			var fileName = getFileName();
			if(!fileName){
				alert("文件不能为空");
			}
			else if (fileName.length > 10) {
				alert("文件名超长");
			} else {
				document.forms[0].submit();
			}
		}

		//获取文件名，不包含路径
		function getFileName() {
			var fileName = document.getElementById("myfile").value;
			if (fileName != '') {
				var index1 = fileName.lastIndexOf('/');
				var index2 = fileName.lastIndexOf('\\');
				var index = 0;
				if (index1 != -1)
					index = index1;
				if (index2 != -1 && index2 > index1)
					index = index2;
				if (index == 0) {
					alert("上传文件路径不正确");
					return false;
				} else
					fileName = fileName.substring(index + 1);
				return fileName;
			} else
				return false;

		}
	</script>
</BODY>
</HTML>
