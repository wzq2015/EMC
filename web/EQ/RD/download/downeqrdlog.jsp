<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.eqrd.builder.LogDownloader"%>
<html>
<head>
<title>备份设计系统业务日志</title>
</head>
<body bgcolor="#0080FF">
<%
LogDownloader manager = new LogDownloader();

//if(manager.isValidLog(pageContext)) {
	manager.download(pageContext);
	out.clear(); 
	out = pageContext.pushBody();
//}
%>
<h3>
<font color="red" > <%=manager.getErrorMsg() %> </font>
</h3>
<input type="button" value="关闭" onclick="closewindow()"  border="2"/>
<script type="text/javascript">
closewindow = function(){
	window.close();
}
</script>
</body>
</html>