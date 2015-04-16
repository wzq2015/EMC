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

<form id="EEDM40" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<script type="text/javascript" src="./EE/DM/EEDM40.js"></script>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="width:100%">
		<table style="width:100%">
		<tr>
			<td align="right" nowrap style="width:5%">
			   产品代码：
			</td>
			<td nowrap style="width:5%">
				<EF:EFFlexBox blockId="inqu_status" ename="productCode" row="0" dataBlockId="dataBlock" displayValue="name" hiddenValue="id" displayAll="true" detailInfo="info" onSelect="select()" width="128" />
		    </td>
		    <td align="right" nowrap style="width:5%">
			   产品代码2：
			</td>
			<td nowrap style="width:15%">
				<EF:EFFlexBox blockId="inqu_status" ename="product2" row="0" serviceName="EEDM40" methodName="getData" dataBlockId="dataBlock" displayAll="true" initialValue="123" detailInfo="info" width="130"/>
		    </td>
		 </tr>
		  <tr>
		    <td align="right" nowrap>
		      检核标记：
		    </td>
		    <td >
		    <EF:EFInput blockId="inqu_status" ename="validateId" row="0" />
		    </td>
		    <td align="right" nowrap >
		      父检核标记：
		    </td>
		    <td nowrap >
		    <EF:EFInput blockId="inqu_status" ename="parentValidateId" row="0" />
		    </td>
		  </tr>
		  <tr>
		    <td align="right" nowrap >
		      消息号码：
		    </td>
		    <td nowrap >
		    <EF:EFInput blockId="inqu_status" ename="messageId" row="0" />
		    </td>
		    <td align="right" nowrap >
		      业务逻辑服务英文名：
		    </td>
		    <td  nowrap >
		    <EF:EFInput blockId="inqu_status" ename="serviceEname" row="0" />
		    </td>
		   </tr>
		  <tr>
		    <td align="right"  nowrap >
		      业务逻辑方法英文名：
		    </td>
		    <td  nowrap >
		    <EF:EFInput blockId="inqu_status" ename="methodEname" row="0" />
		    </td>
		    <td align="right" nowrap >
		      记录创建者：
		    </td>
		    <td >
		    <EF:EFInput blockId="inqu_status" ename="recCreator" row="0" />
		    </td>
		   </tr>
		</table>
	</div>
</div>
<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:400px;">
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false" readonly="false">
<EF:EFColumn ename="id" cname="产品代码"/>
<EF:EFColumn ename="name" cname="产品名称"/>
<EF:EFColumn ename="info" cname="产品信息"/>
</EF:EFGrid>

s
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
