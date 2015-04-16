<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>模板设置-静态单元设置</title>
<LINK rel=stylesheet href="EU/ueditor/themes/default/ueditor.css"> 
<SCRIPT type=text/javascript src="EU/ueditor/editor_config_1.js"></SCRIPT> 

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1001.js"></script>

</head>
<body class="bodyBackground">

<form id="ECTM1001" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result1" title="静态单元" style="overflow:scroll;width:100%;">
    <input id='result1-0-templateUnitInsId' name='result1-0-templateUnitInsId' type="hidden"/>
	<input id='result1-0-templateUnitType' name='result1-0-templateUnitType' value="1" type="hidden"/>
	<input type=hidden id='nodeId' value="<%=nodeId%>">
	<input type=hidden id='nodeType' value="<%=nodeType%>">
	<div style="overflow:hidden;width:100%">
	<table>
		<tr>
			<td>
			<!--
			<div id="FCKeditor" style="overflow:hidden;display:;">	   
				<textarea id="DataFCKeditor" cols="80" rows="20"></textarea>
			</div>-->
			<div id="myEditor1"> 
			</div>
			<EF:EFInput blockId="result1" ename="staticUnitHtmlContent" row="0" type="hidden" etc=" style='width:400px;height:200px'" />
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
