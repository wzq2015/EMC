<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
java.util.HashMap,
java.util.Map,
com.baosight.iplat4j.dao.*,
com.baosight.iplat4j.core.spring.SpringApplicationContext,
com.baosight.eqrd.builder.BomJarDownloader,
java.util.List"%>
<html>
<head>
<title>导出BOM</title>
</head>
<body bgcolor="#0080FF">
<%
BomJarDownloader manager=new BomJarDownloader();
if(manager.isValidBomView(pageContext))
{
manager.download(pageContext);
out.clear(); 
out = pageContext.pushBody();
}
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