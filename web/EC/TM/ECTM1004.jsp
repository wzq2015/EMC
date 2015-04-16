<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>模板设置-当前位置设置</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1004.js"></script>
</head>
<body class="bodyBackground">

<form id="ECTM1004" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result4" title="当前位置" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result4" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result4" ename="templateUnitType" row="0" etc="value='4'" type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table>
			<tr>
				<td nowrap width="15%">当前位置样式</td>
				<td nowrap width="85%">
					<EF:EFSelect blockId="result4" ename="unitStyleId" etc="" row="0">
						<EF:EFOptions blockId="result41" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
					</EF:EFSelect>
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
