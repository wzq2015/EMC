<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>模板设置-图片新闻设置</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1007.js"></script>
</head>
<body class="bodyBackground">

<form id="ECTM1007" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result7" title="图片新闻" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result7" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result7" ename="templateUnitType" row="0" etc="value='7'" type="hidden" />
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">来源方式</td>
		<td nowrap width="85%">
			<EF:EFSelect blockId="result7" ename="titleLinkContentSourceMode" etc="onchange=onselect_source(3,this.value)" row="0">
				<EF:EFOption label="指定栏目　　　　　　" value="1"></EF:EFOption>
				<EF:EFOption label="当前栏目" value="3"></EF:EFOption>
			</EF:EFSelect>
		</td>
	</tr>
	<tr id='colsource3' style='display:;'>
		<td nowrap width="15%">指定栏目</td>
		<td nowrap width="85%">
			<EF:EFInput blockId="result7" ename="titleLinkSpecColumn" row="0" type="hidden" /> 
			<EF:EFInput blockId="result7" ename="titleLinkSpecColumnName" row="0" etc="size='24' readonly" /> 
				<input type=button value='选择' id="colSelect7" onclick='openPan(7)' style='border:#aaaaaa solid 1px;background-color:#fff999;height=17px;padding-top:0px;'>
		</td>
	</tr>
	<tr>
		<td nowrap width="15%">新闻数目</td>
		<td nowrap width="85%">
			<EF:EFSelect blockId="result7" ename="titleLinkDisplayRows" row="0">
				<EF:EFOption label="1" value="1"></EF:EFOption>
				<EF:EFOption label="2" value="2"></EF:EFOption>
				<EF:EFOption label="3" value="3"></EF:EFOption>
				<EF:EFOption label="4" value="4"></EF:EFOption>
				<EF:EFOption label="5" value="5"></EF:EFOption>
				<EF:EFOption label="6" value="6"></EF:EFOption>
			</EF:EFSelect>
		</td>
	</tr>
	<tr>
		<td nowrap width="15%">标题字数</td>
		<td nowrap width="85%">
			<EF:EFInput blockId="result7" ename="titleLinkDisplayWords" row="0" etc="size='10' maxlength='2' validateType='positive_integer'" />
		</td>
	</tr>
	<tr>
		<td nowrap width="15%">图片宽度</td>
		<td nowrap width="85%">
			<EF:EFInput blockId="result7" ename="imgWidth" row="0" etc="size='10' validateType='positive_integer'" />Px
		</td>
	</tr>
	<tr>
		<td nowrap width="15%">图片高度</td>
		<td nowrap width="85%">
			<EF:EFInput blockId="result7" ename="imgHeight" row="0" etc="size='10' validateType='positive_integer'" />Px
		</td>
	</tr>
</table>
</div>
</div>

<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
