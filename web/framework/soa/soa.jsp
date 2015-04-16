<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="net.sf.json.JSONObject"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ page import="com.baosight.iplat4j.soa.SoaManager"%>
<%@ page import="com.baosight.iplat4j.soa.SoaConstants"%>
<%@page import="com.baosight.iplat4j.soa.util.SoaUtils"%>
<%@ page import="com.baosight.iplat4j.ei.EiInfo"%>

<%
	request.setCharacterEncoding("UTF-8");
	EiInfo eiInfo = new EiInfo();
	try {
		eiInfo = SoaManager.invokeRequest(request);
		String render = eiInfo.getString("render");
		//默认返回json数据输出
		if (render == null || render.equals("")) {
	JSONObject result = SoaUtils.convertJson(eiInfo);
	response.setContentType("text/json");
	response.setHeader("Cache-Control", "no-cache");
	response.getWriter().print(result);
		}else{
	request.setAttribute(SoaConstants.EI, eiInfo);
	request.getRequestDispatcher(render).forward(request,
	response);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
