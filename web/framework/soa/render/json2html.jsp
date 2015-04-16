<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import=" com.baosight.iplat4j.ei.EiInfo" %>
<%@ page import="com.baosight.iplat4j.soa.SoaConstants"%>
<%@page import="com.baosight.iplat4j.soa.util.SoaUtils"%>
<%@page import="net.sf.json.JSONObject"%>
<%
EiInfo ei = (EiInfo)request.getAttribute(SoaConstants.EI);
JSONObject result = SoaUtils.convertJson(ei);
String contextpath = request.getContextPath();
%>

<HTML><HEAD><TITLE>JSON 2 HTML</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<LINK href="<%=contextpath%>/framework/soa/render/json2html/style.css" type=text/css rel=StyleSheet>
<SCRIPT src="<%=contextpath%>/framework/soa/render/json2html/json-min.js" type=text/javascript></SCRIPT>
<SCRIPT src="<%=contextpath%>/framework/soa/render/json2html/BubbleTooltips.js" type=text/javascript></SCRIPT>
<SCRIPT src="<%=contextpath%>/framework/soa/render/json2html/parse.js" type=text/javascript></SCRIPT>

<BODY>
<DIV class=output id=output></DIV>
<INPUT id=submit onclick="doParse2(); return false;" type=button value="json 2 html"> 
<DIV id=inputcontainer><TEXTAREA id=text rows=12><%=result.toString().trim()%></TEXTAREA></DIV>
</BODY>
</HTML>
