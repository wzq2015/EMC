<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="com.baosight.iplat4j.soa.SoaConstants"%>
<%@ page import="com.baosight.iplat4j.soa.util.SoaUtils"%>
<%@ page import="com.baosight.iplat4j.ei.EiInfo"%>

<%
	request.setCharacterEncoding("UTF-8");
	EiInfo ei = (EiInfo)request.getAttribute(SoaConstants.EI);

	//默认返回json数据输出
	JSONObject result = SoaUtils.convertJson(ei);
	response.setContentType("text/json");
	response.setHeader("Cache-Control", "no-cache");
	response.getWriter().print(result);
%>
