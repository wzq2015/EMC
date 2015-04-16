<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM55.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM55" method="POST" action="<%=actionUrl%>"  >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="60">
		      公司代号
		    </td>
		    <td nowrap width="80%">
		    <EF:EFInput blockId="inqu_status" ename="companyCode" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>
<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
</div>
<EF:EFRegion showTitle="no" />
<EF:EFGrid blockId="result" buttonBarId="result" autoDraw="yes" toolBarPosition="bottom" style="personalBar:true">
<EF:EFColumn ename="companyDate" cname="成立日期" editType="date" dateFormat="yyyy-mm-dd" />
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
