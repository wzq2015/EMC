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
	<script type="text/javascript" src="./EE/DM/EEDM05.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM05" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
<div id="country" title="国家信息" >
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:5%">
		      国家代号：
		    </td>
		    <td   nowrap style="width:5%">
		    <EF:EFInput blockId="inqu_status" ename="countryCode" row="0" />

		    </td>
		    <td  align="right" nowrap style="width:5%">
		      国家名称：
		    </td>
		    <td  nowrap style="width:20%">
		    <EF:EFInput blockId="inqu_status" ename="countryName" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>
</div>


<div id="company" title="公司信息" >
<div id = "ef_region_inqu_2" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table  style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:10%" >
		      公司代号：
		    </td>
		    <td  nowrap style="width:10%">
		    <EF:EFInput blockId="inqu_status" ename="companyCode" row="0" />

		    </td>
		    <td align="right" nowrap style="width:10%">
		      公司名称：
		    </td>
		    <td nowrap style="width:10%">
		    <EF:EFInput blockId="inqu_status" ename="companyName" row="0" />
		    </td>
		    <td align="right" nowrap style="width:10%">
		      国家代号：
		    </td>
		    <td nowrap style="width:30%">
		    <EF:EFInput blockId="inqu_status" ename="companyCountryCode" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result_2" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result_2" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>
</div>


</div>


<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" paintId="ef_grid_result" ajax="true">
<EF:EFColumn ename="countryCode" cname="国家代号" sort="true" fix="true" readonly="true"/>
<EF:EFColumn ename="countryName" cname="国家名称"  />

<EF:EFComboColumn ename="continentCode" cname="洲代号" blockName="continents"
                      valueProperty="continentCode"  labelProperty="continentName"  width="200" formatString="#valueString#-#labelString#">
</EF:EFComboColumn>
<EF:EFColumn ename="view" cname="查看所有公司"/>
</EF:EFGrid>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result_2" ajax="true" serviceName="EEDM05" queryMethod="queryCompany">
<EF:EFColumn ename="companyCode" cname="公司代号" sort="true" fix="true" readonly="true"/>
<EF:EFColumn ename="companyName" cname="公司名称"  />
<EF:EFColumn ename="companyTel" cname="公司电话"  />
<EF:EFColumn ename="companyAddr" cname="公司地址"  />
<EF:EFColumn ename="countryCode" cname="国家代号"  />
<EF:EFColumn ename="companyDate" cname="成立日期"  />
</EF:EFGrid>

<EF:EFTab tabId="y" />


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
