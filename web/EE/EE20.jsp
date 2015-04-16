<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
    <script type="text/javascript" src="./EE/EE20.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>
<body class="bodyBackground">

<form id="forms" method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="查询条件">
	<div>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:400px;">
	</div>
</div>
<EF:EFRegion/>
<EF:EFGrid blockId="r" autoDraw="yes" readonly="true"   ajax="true">
</EF:EFGrid>


<!-- 代码展示  -->
<div id = "ef_region_codeDemo" title="示例代码">
<div id="ef_tab_x"  lastRange="99%" eftabType="efRoundDivTab">
	<div id="jsp" title="JSP 源代码" >
	<textarea  name="code" class="html">
&lt;div id = "ef_region_inqu" title="查询条件"&gt;
	&lt;div&gt;
	&lt;/div&gt;
&lt;/div&gt;

&lt;div id = "ef_region_result" title="记录集" style="overflow:scroll"&gt;
	&lt;div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:400px;"&gt;
	&lt;/div&gt;
&lt;/div&gt;
&lt;EF:EFRegion/&gt;
&lt;EF:EFGrid blockId="r" autoDraw="yes" readonly="true"   ajax="true"&gt;
&lt;/EF:EFGrid&gt;
	</textarea>
</div>
<div id="javascript" title="Javasript 源代码" >
	<textarea name="code" class="javascript">
	</textarea>
 </div>
 </div>
<EF:EFTab tabId="x" action="fundiv"/>
<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('code');
</script>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type="text/javascript">
var tab  = ef.get("jquery_tab_div_content");
tab.style.height = "";
var tab1 = ef.get("jsp");
tab1.style.display = "block";
tab1.style.height = "";
tab1.style.width = "100%";
var tab2 = ef.get("javascript");
tab2.style.height = "";
tab2.style.width = "100%";
</script>
</body>
</html>
