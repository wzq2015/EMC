<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>

<%
	String contextPath = request.getContextPath();
%>

<HTML>
<HEAD>
	<title>错误信息</title>

	<script type="text/javascript" src="<%=contextPath %>/EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="<%=contextPath %>/EP/EP01.js"></script>  
	
</HEAD>
<body>
<form action="">

<div id="ef_region_iplat" title="异常描述">
	<div>
		<table>
		  <tr>
		    <td nowrap width="20%">
		      异常代码
		    </td>
		    <td nowrap width="80%">${iplat_msgKey}</td>
		  </tr>		  
		  <tr>
		    <td nowrap width="20%">
		      异常信息
		    </td>
		    <td nowrap width="80%">${iplat_msg}</td>
		  </tr>		  
		  <tr>
		    <td nowrap width="20%">
		      异常堆栈
		    </td>
		    <td nowrap width="80%">${iplat_msgDetail}</td>
		  </tr>		  
		</table>
	</div>	
</div>

  </form>
</body>
</html>
