<!DOCTYPE html>
<!-- Generate time : 2011-07-27 15:39:39 -->
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/BB/EEBB02.js"></script>
</head>
<body class="bodyBackground">
<form id="EEBB02" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title=" " efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
			<tr>
				<td nowrap align="right" width="105px">日期</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="fdate" row="0" type="text" trim="false" />
				</td>
				<td nowrap align="right" width="105px">公司</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="company" row="0" type="text" trim="false" />
				</td>
				<td nowrap align="right" width="105px">产品</td>
				<td nowrap colspan="1" width="175px">
					A<EF:EFInput blockId="inqu_status" ename="product" row="0" value="0" type="checkbox" />
					B<EF:EFInput blockId="inqu_status" ename="product" row="0" value="1" type="checkbox" />
					C<EF:EFInput blockId="inqu_status" ename="product" row="0" value="2" type="checkbox" />
				</td>
				<td nowrap align="right" width="105px">产品产量</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFSelect blockId="inqu_status" ename="prodQuantity" row="0">
						<EF:EFOption label="请选择" value="" />
					</EF:EFSelect>
				</td>
			</tr>
			<tr>
				<td nowrap align="right" width="105px">营业收入</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="income" row="0" type="text" trim="false" />
				</td>
				<td nowrap align="right" width="105px">计划营业收入</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="planIncome" row="0" type="text" trim="false" />
				</td>
			</tr>
		</table>	</div>
</div>

<div id = "ef_region_result" title=" " style="overflow:scroll"> 
	<div id = "ef_grid_result" title=" " style="overflow: hidden;height:300px;">
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no">
	<EF:EFColumn ename="fdate" cname="日期" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="company" cname="公司" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="product" cname="产品" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="prodQuantity" cname="产品产量" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="income" cname="营业收入" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="planIncome" cname="计划营业收入" fix="no" width="100" sort="false"/>
</EF:EFGrid> 

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
