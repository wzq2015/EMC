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
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>
<body class="bodyBackground">

<form id="EEDM41" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<script type="text/javascript" src="./EE/DM/EEDM41.js"></script>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="width:100%">
		<table>
			<tr>
				<td colspan="4">
					<input id="alert_button" type="button" value="警告框">
					<input id="confirm_button" type="button" value="确认框" />
					<input id="prompt_button" type="button" value="输入框" />
					<input id="alert_button_with_html" type="button" value="显示HTML消息" />
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<input id="example1" type="button" value="Photo 1" onclick="example1_onclick()">
					<input id="example2" type="button" value="Outside HTML (Ajax)" onclick="example2_onclick()">
					<input id="example3" type="button" value="Flash / Video (Ajax/Embedded)" onclick="example3_onclick()"><br>
					<input id="example4" type="button" value="Flash / Video (Iframe)" onclick="example4_onclick()">
					<input id="example5" type="button" value="Outside Webpage (Iframe)" onclick="example5_onclick()">
					<input id="example6" type="button" value="Inline HTML" onclick="example6_onclick()">
					<!-- This contains the hidden content for inline calls -->
					<div style='display:none'>
						<div id='inline_example1' style='padding:10px; background:#fff;'>
						<p><strong>This content comes from a hidden element on this page.</strong></p>
						<p>The inline option preserves bound JavaScript events and changes, and it puts the content back where it came from when it is closed.<br />
						<a id="click" href="#" style='padding:5px; background:#ccc;'>Click me, it will be preserved!</a></p>
						<p><strong>If you try to open a new ColorBox while it is already open, it will update itself with the new content.</strong></p>
					</div>
				</td>
			</tr>
		</table>
	</div>
</div>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
