<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%@ page import="com.baosight.iplat4j.ec.tm.utils.TemplateInitInfo,com.baosight.iplat4j.util.DateUtils,com.baosight.iplat4j.ec.tm.utils.TemplateInitInfo.*" %>
<%
	//request.getSession().setMaxInactiveInterval( 2*60*60 );
	if(TemplateInitInfo.getContextPath() == null){
		TemplateInitInfo.setContextPath(request.getContextPath());//存上下文
    	TemplateInitInfo.setIp(request.getServerName());//存ip
    	TemplateInitInfo.setPort(request.getServerPort());//存port
	}
%>

<HTML>
	<HEAD>
	 	<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	</HEAD>
	<body>
	</body>
    <script type="text/javascript">
	    var load_time = new Date();  
	    var load_label = "indexReal" + load_time.getTime();
	    window.location.href='./indexReal-3.0.jsp';
    </script>
</HTML>