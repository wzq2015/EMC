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
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1010.js"></script>
</head>
<body class="bodyBackground">
<form id="ECTM1010" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result10" title="门户(每个区域必须在同一个页面)" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result10" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result10" ename="templateUnitType" row="0" etc="value='10'" type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table>
			<tr>
				<td nowrap width="15%">门户区域</td>
				<td nowrap width="85%">
					<EF:EFSelect blockId="result10" ename="portalRegion" etc="onchange=onselect_portal(this.value)" row="0">
						<EF:EFOption label="TAB切换区" value="table"></EF:EFOption>
						<EF:EFOption label="配置区" value="config"></EF:EFOption>
						<EF:EFOption label="Portal区" value="portal"></EF:EFOption>
					</EF:EFSelect>
				</td>
			</tr>
			<tr>
				<td nowrap width="15%">页面号</td>
				<td nowrap width="85%">
					<EF:EFInput blockId="result10" ename="portalNum" row="0" etc="size='24' id='portalNum'" />
					<font color="red">有特殊需求时填写，一般采用默认页面号</font>
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
