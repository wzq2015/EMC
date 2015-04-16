<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>

<%
String contextpath = request.getContextPath();
%>

<HTML><HEAD><TITLE>JSON 2 HTML</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<LINK href="style.css" type=text/css rel=StyleSheet>
<SCRIPT src="json-min.js" type=text/javascript></SCRIPT>
<SCRIPT src="BubbleTooltips.js" type=text/javascript></SCRIPT>
<SCRIPT src="parse.js" type=text/javascript></SCRIPT>
</HEAD>
<BODY>

<DIV id=inputcontainer>表单信息:<br><TEXTAREA id=text rows=18></TEXTAREA></DIV>
表单结构图:<br>
<DIV class=output id=output></DIV>
</BODY>
<script type="text/javascript">
try{
	document.getElementById("text").value = window.opener.jsonFormData();
	doParse2();
}catch (ex){
	alert("formJson页面为查看表单信息结构,不能直接打开该页面!");
}
</script>

</HTML>
