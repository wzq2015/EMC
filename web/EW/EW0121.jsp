<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html style="height:90%;width:90%;" align="center">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>保存流程</title>
	<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="EW/EW0121.js"></script>
	<script type="text/javascript" src="EU/mxGraph/mxClient.js"></script>
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="FormBuilder/js/Math.uuid.js"></script>
</head>
<body class="bodyBackground" style="height:100%;width:100%;">

<form id="EW0121" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<table width="100%" height="100%">
		<tr>
			<td colspan="2" id="promption" align="center"></td>
		 </tr>
		 <tr>
			<td colspan="2" align="center">
			<div id="actionDiv">
			<select id="action">
				<option value="O">覆盖已有版本</option>
				<option value="N">保存为新版本</option>
			</select>
			</div>
			</td>
		 </tr>
		 <tr>
		    <td>
		    	<EF:EFButton ename="draft" cname="保存草稿" />
		    </td>
		    <td>
		    	<EF:EFButton ename="publish" cname="发布流程" />
		    </td>
		 </tr>  
		</table>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
