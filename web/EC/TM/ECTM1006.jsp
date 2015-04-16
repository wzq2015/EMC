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
<title>模板设置-公告设置</title>
<LINK rel=stylesheet href="EU/ueditor/themes/default/ueditor.css"> 
<SCRIPT type=text/javascript src="EU/ueditor/editor_config_1.js"></SCRIPT> 
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1006.js"></script>
</head>
<body class="bodyBackground">

<form id="ECTM1006" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result6" title="公告" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result6" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result6" ename="templateUnitType" row="0" etc="value='6'" type="hidden" />
	<input type=hidden id='nodeId' value="<%=nodeId%>">
	<input type=hidden id='nodeType' value="<%=nodeType%>">
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td width="15%">公告标题样式</td>
		<td width="85%">
			<EF:EFSelect blockId="result6" ename="unitStyleId" etc="" row="0">
				<EF:EFOptions blockId="result61" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
			</EF:EFSelect>
		</td>
	</tr>
	<tr>
		<td width="15%">显 示</td>
		<td width="85%">
			<EF:EFInput blockId="result6" ename="titleLinkDisplayRows" row="0" etc="size='10' maxlength='3' validateType='positive_integer'" />行
		</td>
	</tr>
	<tr>
		<td width="15%">显示字数</td>
		<td width="85%">
			<EF:EFInput blockId="result6" ename="titleLinkDisplayWords" row="0" etc="size='24' maxlength='2' validateType='positive_integer'" />
		</td>
	</tr>
	<tr>
		<td width="15%">更多显示样式</td>
		<td>
			<!--<div id="FCKeditorAfficheMoreDispStyle" style="display: none">
					<textarea id="DataFCKeditorAfficheMoreDispStyle" cols="80" rows="10"></textarea>
	    	</div> -->
	    	<div id="myEditor1"> 
			</div>
			<EF:EFInput blockId="result6" ename="titleLinkMoreString" type="hidden" row="0" etc="size='24' maxlength='20'" />
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
