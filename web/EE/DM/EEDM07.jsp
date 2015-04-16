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
	<script type="text/javascript" src="./EE/DM/EEDM07.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM07" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:10%">
		   	      洲名称：
		    </td>
		    <td nowrap >
		    <EF:EFSelect blockId="inqu_status" ename="continentCode" row="0" etc=' style="width:120px";styleClass="inputField" '>
		      <EF:EFOption label="全部" value="" />
		      <EF:EFOptions blockId="continent" labelColumn="continentName" valueColumn="continentCode">
		      </EF:EFOptions>
		    </EF:EFSelect>
		    </td>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="国家信息" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:200px;">
	</div>
</div>

<div id = "ef_region_company" title="公司信息" style="overflow:scroll">
	<div id = "ef_grid_company" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
<EF:EFInput blockId="company_inqu_status" ename="countryCode" row="0" type="hidden"/>
</div>

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" ajax="true" >
</EF:EFGrid>
<EF:EFGrid blockId="company" autoDraw="yes" readonly="false" ajax="true" queryMethod="queryCompany">
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
