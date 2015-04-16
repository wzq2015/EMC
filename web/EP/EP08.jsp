<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>

<%
String contextpath = request.getContextPath();
%>

<HTML><HEAD><TITLE>JSON 2 HTML</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<LINK href="<%=contextpath%>/framework/soa/render/json2html/style.css" type=text/css rel=StyleSheet>
<script type="text/javascript">CONTEXT_PATH = "."</script>
<SCRIPT src="<%=contextpath%>/EF/iplat-ui-2.0.js" type=text/javascript></SCRIPT>
<SCRIPT src="<%=contextpath%>/framework/soa/render/json2html/json-min.js" type=text/javascript></SCRIPT>
<SCRIPT src="<%=contextpath%>/framework/soa/render/json2html/BubbleTooltips.js" type=text/javascript></SCRIPT>
<SCRIPT src="<%=contextpath%>/framework/soa/render/json2html/parse.js" type=text/javascript></SCRIPT>
</HEAD>
<BODY>

<DIV id=inputcontainer>EiInfo信息:<br><TEXTAREA id=text rows=12></TEXTAREA></DIV>
EiInfo结构图:<br>
<DIV class=output id=output></DIV>
</BODY>
<script type="text/javascript">
try{
document.getElementById("text").value= JSON2String(window.opener.window.__ei);
doParse2();
}catch (ex){
	alert("EP08页面为查看EiInfo信息结构,不能直接打开该页面!");
}
</script>

</HTML>
