<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@page import="java.util.*" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/EE1004.js"></script>
	
</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<c:set var="result" value="${ei.blocks.result}"/>

<input type="hidden" id="result-showCount" name="result-showCount" value="true" />
<input type="hidden" id="result-offset" name="result-offset" value="${result.attr.offset}" />
<input type="hidden" id="result-limit" name="result-limit" value="${result.attr.limit}" />
<input type="hidden" id="result-orderBy" name="result-orderBy" value="${result.attr.orderBy}" />
<input type="hidden" id="result-pre" name="result-pre" value="" />
<input type="hidden" id="result-last" name="result-last" value="" />

<div id = "ef_region_detail" title="Ajax记录示例2">
	<div>
	<table width="100%">
	<tr>
		<td align="left" nowrap>
			<font color='blue'><b>单记录翻页获取演示，点击导航栏按钮查看记录</b></font>
		</td>
		<td align="right" nowrap>
			<div id="navibar"></div>
		</td>
		<td width="1%" align="right" nowrap>
			<IMG SRC="<%=contextpath%>/EF/Images/efgrid_blue_divider.gif" >
			当前记录[<span id="current_offset">${result.attr.offset}</span>]
			<IMG SRC="<%=contextpath%>/EF/Images/efgrid_blue_divider.gif" >
			总记录数 ${result.attr.count}
		</td>
	</tr>
	</table>
	
	
	<table>
	<tr>
		<td nowrap >
		      产品代号:&nbsp;&nbsp;
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="product_id" row="0" etc=" style='width:300px' "/>&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td nowrap >
		      公司名称:&nbsp;&nbsp;
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="company_name" row="0" etc=" style='width:300px' "/>
		</td>
	</tr>
	<tr>
		<td nowrap >
		 	产地:
		</td>
		<td nowrap >
			<EF:EFSelect blockId="result" ename="made_country" row="0" etc=" class='pulldown' style='width:300px' " >
				<EF:EFOption value="" label="请选择"/>
				<EF:EFOptions blockId="country" valueColumn="country_ename" 
					labelColumn="country_cname"/>
			</EF:EFSelect>
		</td>
		<td nowrap >
		      上市日期:
		</td>
		<td nowrap>
			<EF:EFInput blockId="result" ename="sale_date" row="0" popup="date" etc=" style='width:300px' "/>
		</td>
	</tr>
	<tr>
		<td nowrap >
		 	价格:
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="price" row="0" etc=" style='width:300px' " />
		</td>
		<td nowrap >
		      公司主页:
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="company_page" row="0" type="textarea" 
				etc=" style='width:300px' "
			/>
		</td>
	</tr>
	</table>
	</div>
</div>  

<EF:EFRegion/>  

<EF:EFNavigationBar navBarId="navibar"  />

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>

</form>
</body>
</html>   
	
