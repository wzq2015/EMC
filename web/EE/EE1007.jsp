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
	<script type="text/javascript" src="./EE/EE1007.js"></script>
	
</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div>
	<table>
	<tr>
		<td nowrap width="25%">
		      产品代号：
		</td>
		<td nowrap width="25%">
			<input type="text" name="inqu_data-0-product_id" value="${inqu.rows[0].product_id}" class = "inputField" />
		</td>
		<td nowrap width="25%">
		 	公司名称：
		</td>
		<td nowrap width="25%">
			<input type="text" name="inqu_data-0-company_name" value="${inqu.rows[0].company_name}" class = "inputField" />
		</td>
	</tr>
	<tr>
		<td nowrap width="25%">
		      产地：
		</td>
		<td nowrap width="25%">
			<input type="text" name="inqu_data-0-made_country" value="${inqu.rows[0].made_country}" class = "inputField" />
		</td>
		<td nowrap width="50%" colspan="2" >
		 	价格大于&nbsp;<input type="text" name="inqu_data-0-price_low" value="${inqu.rows[0].price_low}" class = "inputField" />
		 	&nbsp;小于&nbsp;<input type="text" name="inqu_data-0-price_high" value="${inqu.rows[0].price_high}" class = "inputField" />
		</td>
	</tr>
	</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>     

<EF:EFRegion/>

<EF:EFGrid blockId="r" autoDraw="yes" enable="false" style="operationBar:false;toolBar:true" >
</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
	
