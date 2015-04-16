<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/DF/EDDF02.js"></script>

</head>
<body class="bodyBackground">

<form id="EDDF02" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
<div id="ef_div_inqu" style="overflow: hidden; width: 100%">
<table>
	<tr>
		<td nowrap>表单名称</td>
		<td nowrap width="15%"><EF:EFInput blockId="inqu_status"
			ename="form_ename" row="0" style="text-transform : uppercase;"
			etc="validateType='string' maxLength='8' size='8'" /> <img
			title="结点英文名列表" id="popupWindowId"
			onload="efico.setImageSrc(this,'efform.efPopupWindow')"
			src="./EF/Images/eftree_blank.png"
			onmouseover="this.style.cursor='hand'" " onClick="openSubGrid();" />
		</td>
		<td nowrap>表单数据标识</td>
		<td nowrap width="15%"><EF:EFInput blockId="inqu_status"
			ename="data_id" row="0" /></td>
		<td nowrap>记录创建开始日期</td>
		<td nowrap width="15%"><EF:EFInput blockId="inqu_status"
			ename="rec_create_time_start" row="0" popup="date"
			etc="maxLength='8' size='8'" /></td>
		<td nowrap>记录创建截止日期</td>
		<td nowrap width="15%"><EF:EFInput blockId="inqu_status"
			ename="rec_create_time_end" row="0" popup="date"
			etc=" maxLength='8' size='8'" /></td>
	</tr>
	<tr>
		<td nowrap>记录修改开始日期</td>
		<td nowrap width="15%"><EF:EFInput blockId="inqu_status"
			ename="rec_revise_time_start" row="0" popup="date"
			etc="maxLength='8' size='8'" /></td>
		<td nowrap>记录修改截止日期</td>
		<td nowrap width="15%"><EF:EFInput blockId="inqu_status"
			ename="rec_revise_time_end" row="0" popup="date"
			etc=" maxLength='8' size='8'" /></td>
	</tr>
</table>
</div>
</div>

<div id="ef_region_result" title="记录集" style="overflow: scroll">
<div id="ef_grid_result" title="表单信息"
	style="overflow: hidden; height: 250px;"></div>
</div>

<EF:EFRegion /> <EF:EFGrid blockId="result" autoDraw="yes"
	readonly="true" style="navigationBar:true;operationBar:true"
	ajax="true">

</EF:EFGrid> <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
