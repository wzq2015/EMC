<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="java.net.URLDecoder"%>
<%@page import="com.baosight.iplat4j.dao.Dao"%>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.List"%>
<%@page import="com.baosight.iplat4j.common.ec.domain.Tecdm01"%>
<%@page import="com.baosight.iplat4j.ec.tm.utils.TemplateInitInfo"%>
<%@page import="java.util.HashMap"%>
<HTML>
<BODY BGCOLOR="white">
<%
	String relativePath="";//相对路径
	String url="";//文件路径
    String  fileId= request.getParameter("fileId");
	if(fileId!=null){
		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
		Map<String,String> map = new HashMap<String,String>();
		map.put("fileId",fileId);
		List list = dao.query("ECDM01.queryFile",map);
		if(list.size()>0){
			Tecdm01 ecdm01=(Tecdm01)list.get(0);
			relativePath = ecdm01.getFilePath();
			url ="http://"+TemplateInitInfo.getIp()+":"+TemplateInitInfo.getPort()+ relativePath; // +TemplateUtils.getProjectPath()
		}
	}
%>
<img id="image2"/>
</BODY>
</HTML>
<script language="JavaScript" type="text/javascript">
document.getElementById("image2").src=encodeURI("<%=url%>");
</script>
