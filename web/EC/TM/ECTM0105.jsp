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
	<script type="text/javascript" src="./EC/TM/ECTM0105.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">
<form id="ECTM0105" name="form1" method="POST" action="<%=actionUrl%>"  >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_result" title="模板在线编辑" style="overflow:scroll">
<div  style="overflow:hidden;width:100%">
	<EF:EFInput type="textarea" blockId="result" row="0" ename="templateContent" etc="cols=\"100\" rows=\"30\" style=\"width=100%;overflow-x:auto;overflow-y:auto\""/>
	<EF:EFInput type="hidden" blockId="result" row="0" ename="fileName"/>
	<EF:EFInput type="hidden" blockId="result" row="0" ename="templateTypeId"/>
	<EF:EFInput type="hidden" blockId="result" row="0" ename="templateDefId"/>
	<EF:EFInput type="hidden" blockId="result" row="0" ename="defName"/>
	
</div>
</div>

<EF:EFRegion />
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
