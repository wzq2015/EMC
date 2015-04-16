<!DOCTYPE html>

<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM70.js"></script>
	<script language="JavaScript" src="./FusionCharts/Charts/FusionCharts.js"></script>
</head>
<body class="bodyBackground">

<form id="EEDM70" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>

		    <td nowrap width="15%">
		      图形类型
		    </td>
		    <td nowrap width="20%">
		     <EF:EFSelect blockId="inqu" ename="chartType" row="0" etc="style='width:145' onChange='changeChartType()'">
			    <EF:EFOption label="2D柱状图" value="Column2D" />
			    <EF:EFOption label="3D柱状图" value="Column3D" />
			    <EF:EFOption label="2D饼状图" value="Pie2D" />
			    <EF:EFOption label="3D饼状图" value="Pie3D" />
			    <EF:EFOption label="线性图" value="Line" />
			    <EF:EFOption label="区域图" value="Area" />
			    <EF:EFOption label="2D条型图" value="Bar2D" />
			    <EF:EFOption label="3D条型图" value="Bar3D" />
			    <EF:EFOption label="2D柱状堆栈图" value="StackedColumn2D" />
			    <EF:EFOption label="3D柱状堆栈图" value="StackedColumn3D" />
			    <EF:EFOption label="3D柱状线性混合图" value="ColumnLine3D" />
			</EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		      数据来源
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="inqu" ename="data" row="0" etc="style='width:145'">
			</EF:EFSelect>
		    </td>

		    <td nowrap width="15%">
		       <input  id='showValue' name='showValue'  type="checkbox"  >显示数据</input>
		     </td>
		  </tr>
		  <tr>
		     <td nowrap width="15%">图片背景色</td>
			 <td><EF:EFInput blockId="inqu" ename="bgcolor" row="0"
					etc="readOnly" /> <img title='颜色选择器' align='center'
					src='EV/images/color.JPG' onmouseover="this.style.cursor='hand'"
					onClick="openSelectColor(1);"></td>
		     </td>
		     <td nowrap width="15%" align="left">图形背景色</td>
			 <td><EF:EFInput blockId="inqu" ename="plotcolor" row="0"
					etc="readOnly" /> <img title='颜色选择器' align='center'
					src='EV/images/color.JPG' onmouseover="this.style.cursor='hand'"
					onClick="openSelectColor(2);"></td>
		     </td>
		  </tr>
		</table>
	</div>
</div>

	<iframe  id="chart"   height="500" width="700"  style="display:none; border:0px;"></iframe>

  <EF:EFRegion/>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
