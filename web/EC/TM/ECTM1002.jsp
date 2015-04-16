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
<title>模板设置-栏目链接设置</title>


<LINK rel=stylesheet href="EU/ueditor/themes/default/ueditor.css"> 
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1002.js"></script>
<SCRIPT type=text/javascript src="EU/ueditor/editor_config_1.js"></SCRIPT>  

</head>
<body class="bodyBackground">

<form id="ECTM1002" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result2" title="栏目链接" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result2" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result2" ename="templateUnitType" row="0" etc="value='2'" type="hidden" />
	
	<input type=hidden id='nodeId' value="<%=nodeId%>">
	<input type=hidden id='nodeType' value="<%=nodeType%>">
<div style="overflow:hidden;">
<table>
	<tr>
		<td  width="15%">栏目样式</td>
		<td  width="85%">
			<EF:EFSelect blockId="result2" ename="unitStyleId" etc="" row="0">
				<EF:EFOptions blockId="result21" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
			</EF:EFSelect>
			&nbsp;&nbsp; 
			<a style='cursor:pointer' onclick="openColumnPrefixSufix();"> 
					<font color="blue"><span id='styleCode'>添加栏目前后缀</span> </font> 
			</a>
		</td>
	</tr>
	<tr>
		<td  width="15%">来源方式</td>
		<td  width="85%">
			<EF:EFSelect blockId="result2" ename="columnLinkContentSourceMod" etc="onchange=onselect_source(1,this.value)" row="0">
				<EF:EFOption label="指定栏目" value="1"></EF:EFOption>
				<EF:EFOption label="指定栏目子栏目" value="2"></EF:EFOption>
				<EF:EFOption label="当前栏目" value="3"></EF:EFOption>
				<EF:EFOption label="当前栏目子栏目　　　　" value="4"></EF:EFOption>
			</EF:EFSelect>
		</td>
	</tr>
	<tr id='colsource1'>
		<td  width="15%">指定栏目</td>
		<td  width="85%">
			<EF:EFInput blockId="result2" ename="columnLinkSpecColumn" row="0" type="hidden" /> 
			<EF:EFInput blockId="result2" ename="columnLinkSpecColumnName" row="0" etc="size='24' readonly" /> 
				<input type=button value='选择' id="colSelect1" onclick='openPan(1)' style='border:#aaaaaa solid 1px;background-color:#fff999;height=17px;padding-top:0px;'>
		</td>
	</tr>
	<tr>
		<td  width="15%">显 示</td>
		<td  width="85%">
			<EF:EFInput blockId="result2" ename="columnLinkDisplayRows" row="0" etc="size='10' maxlength='3' validateType='positive_integer'" />行 
			<EF:EFInput blockId="result2" ename="columnLinkDisplayCols" row="0" etc="size='10' maxlength='3' validateType='positive_integer'" />列</td>
	</tr>
	<tr>
		<td  width="15%">显示字数</td>
		<td  width="85%">
			<EF:EFInput blockId="result2" ename="columnLinkDisplayWords" row="0" etc="size='24' maxlength='2' validateType='positive_integer'" /></td>
	</tr>

	<tr>
		<td width="100%"  colspan="2">
			<div id="columnPrefixSuffix" style="display:none;">
				<table>
					<tr>
						<td width="15%">栏目前缀</td>
						<td >
							<div id="myEditor1"> 
				   			</div>
							<EF:EFInput blockId="result2" ename="columnLinkPrefixString" type="hidden" row="0" />
						</td>
					</tr>
					<tr>
						<td width="15%">栏目后缀</td>
						<td>
							<div id="myEditor2"> 
				   			</div>
							<EF:EFInput blockId="result2" ename="columnLinkPostfixString" type="hidden" row="0" />
						</td>
					</tr>
				</table>
			</div>
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
