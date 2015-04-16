<!DOCTYPE html>
<!-- Generate time : 2011-07-27 17:27:07 -->
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
	<script type="text/javascript" src="./EE/BB/EEBB03.js"></script>
</head>
<body class="bodyBackground">
<form id="EEBB03" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
			<tr>
				<td nowrap align="right" width="105px">公司代号</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="companyCode" row="0" type="text" />
				</td>
				<td nowrap align="right" width="105px">公司名称</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="companyName" row="0" type="text" />
				</td>
				<td nowrap align="right" width="105px">公司电话</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="companyTel" row="0" type="text" />
				</td>
				<td nowrap align="right" width="105px">公司地址</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="companyAddr" row="0" type="text" />
				</td>
			</tr>
			<tr>
				<td nowrap align="right" width="105px">国家代号</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFSelect blockId="inqu_status" ename="countryCode" row="0">
					</EF:EFSelect>
				</td>
				<td nowrap align="right" width="105px">成立日期</td>
				<td nowrap colspan="1" width="175px">
					<EF:EFInput blockId="inqu_status" ename="companyDate" row="0" popup="date" />
				</td>
			</tr>
		</table>	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="记录信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no">
	<EF:EFColumn ename="companyCode" cname="公司代号" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="companyName" cname="公司名称" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="companyTel" cname="公司电话" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="companyAddr" cname="公司地址" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="countryCode" cname="国家代号" fix="no" width="100" sort="false"/>
	<EF:EFColumn ename="companyDate" cname="成立日期" fix="no" width="100" sort="false"/>
</EF:EFGrid> 

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type="text/javascript">
	efcalendar_click = function (control_source, id) {
		var node = ef.getNodeById(id);
		if (id=='inqu_status-0-companyDate') efcalendar(control_source, node, 'yyyy-mm-dd', true);
	};
</script>
</body>
</html>
