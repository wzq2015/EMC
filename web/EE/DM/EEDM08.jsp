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
	<script type="text/javascript" src="./EE/DM/EEDM08.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM08" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:10%">
		      公司名称：
		    </td>
		    <td >
		    <EF:EFInput blockId="inqu_status" ename="companyName" row="0" />
		    </td>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:250px;" >
	</div>
</div>

<div id = "ef_region_detail" title="明细区" style="overflow:scroll" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      公司代号
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="company_detail" ename="companyCode" row="0" type="text" style='width:200px'/>
		    <EF:EFInput blockId="company_detail" ename="preCode" row="0" type="hidden" />
		    </td>
		    <td nowrap width="15%">
		      公司名称
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="company_detail" ename="companyName" row="0" type="text" style='width:200px'/>
		    </td>
		   </tr>
		   <tr>
		    <td nowrap width="15%">
		      公司电话
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="company_detail" ename="companyTel" row="0" type="text" style='width:200px' etc=" validateType='phone_with_area_code'  "/>
		    </td>
		    <td nowrap width="15%">
		      公司地址
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="company_detail" ename="companyAddr" row="0" type="text" style='width:300px'/>
		    </td>
		   </tr>
		   <tr>
		    <td nowrap width="15%">
		      国家
		    </td>
		    <td nowrap width="50%">
		    <EF:EFSelect blockId="company_detail" ename="countryCode" row="0" etc=' styleClass="inputField" '>
		      <EF:EFOptions conj="-" blockId="country" labelColumn="countryName" valueColumn="countryCode"/>
		    </EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		      成立日期
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="company_detail" ename="companyDate" row="0" type="text" style='width:200px'/>
		    </td>
		   </tr>
		</table>
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="true" style="navigationBar:true;operationBar:false" ajax="true">
<EF:EFColumn ename="companyCode" readonly="true" cname="公司代号" sort="true"/>
<EF:EFColumn ename="companyName" cname="公司名称"/>
</EF:EFGrid>


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
