<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.core.ei.EiConstant"%>
<%@page import="com.baosight.iplat4j.core.ei.EiBlock"%>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String categoryId = request.getParameter("categoryId");
%>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9">
	<title>导入流程</title>
	<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="EW/EW0118.js"></script>
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="EU/mxGraph/mxClient.js"></script>
	<link type="text/css" rel="stylesheet" href="EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

	<script type="text/javascript">
		var categoryId = '<%=categoryId%>';
	</script>

</head>

<body class="bodyBackground">
<form id="EW0118" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"/>
<div>
<textarea id="xml" style="width:100%;height:470px;"></textarea>
</div>

<div style="overflow:hidden;width:100%;">
	<table>
		  <tr>
		   <td nowrap width="50%">
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="save" cname="导入" />
		    </td>
		    <td nowrap >
		    	<EF:EFButton ename="close" cname="取消" />
		    </td>
		     <td nowrap width="50%">
		    </td>
		  </tr>  
 	</table>
</div>
<jsp:include flush="true" page="../EF/Form/iplat.ef.tail.jsp"/>
</form>

</body>
</html>
