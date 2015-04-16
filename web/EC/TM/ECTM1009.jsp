<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	//单元设置页
	String area = request.getParameter("area");
	String isSearchResult = request.getParameter("isSearchResult");
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>模板设置-搜索单元设置</title>
<LINK rel=stylesheet href="EU/ueditor/themes/default/ueditor.css"> 
<SCRIPT type=text/javascript src="EU/ueditor/editor_config_1.js"></SCRIPT> 
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1009.js"></script>
</head>
<body class="bodyBackground">
<input type=hidden id='area' value="<%=area%>">
<input type=hidden id='isSearchResult' value="<%=isSearchResult%>">
<form id="ECTM1009" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result9" title="搜索单元" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result9" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result9" ename="templateUnitType" row="0" etc="value='9'" type="hidden" />
	<input type=hidden id='nodeId' value="<%=nodeId%>">
	<input type=hidden id='nodeType' value="<%=nodeType%>">
	
	<div style="overflow:hidden;width:100%">
	<table>
		<tr>
			<td width="15%">搜索区域类型</td>
			<td width="85%">
				<EF:EFSelect blockId="result9" ename="columnLinkStyleId" row="0" etc="onchange=searchType_change(this.value);">
					<EF:EFOption label="搜索入口" value="0"></EF:EFOption>
					<EF:EFOption label="搜索结果" value="1"></EF:EFOption>
				</EF:EFSelect>
			</td>
		</tr>
	</table>
	<div id="searchEntry">
	<table>
		<tr>
			<td>
				<a style='cursor:pointer' onclick="showFCKeditor();"><font color="blue">高级设置</font></a>
			</td>
		</tr>
		<tr>
			<td>
				<!--<div id="FCKeditor" style="display: none">
					<textarea id="DataFCKeditor" cols="80" rows="20" style="display:none"></textarea>
				</div>-->
				<div id="myEditor1"> 
				</div>
				<EF:EFInput blockId="result9" ename="staticUnitHtmlContent" row="0" type="textarea" style="display:none" />
			</td>
		</tr>
	</table>
	</div>
	<div id='searchResult' style="display:none">
		<table>
			<tr>
				<td nowrap width="15%">搜索记录样式</td>
				<td nowrap width="85%">
					<EF:EFSelect blockId="result9" ename="unitStyleId" etc="" row="0">
						<EF:EFOptions blockId="result91" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
					</EF:EFSelect>
				</td>
			</tr>
			
			<tr>
				<td nowrap width="15%">翻页当前页样式</td>
				<td nowrap width="85%">
					<EF:EFSelect blockId="result9" ename="pageCurStyleId" etc="" row="0">
						<EF:EFOptions blockId="result911" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
					</EF:EFSelect>
				</td>
			</tr>
			
			<tr>
				<td nowrap width="15%">翻页非当前页样式</td>
				<td nowrap width="85%">
					<EF:EFSelect blockId="result9" ename="pageNCurStyleId" etc="" row="0">
						<EF:EFOptions blockId="result911" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
					</EF:EFSelect>
				</td>
			</tr>
			
			<tr>
				<td nowrap width="15%">搜索布局样式</td>
				<td nowrap width="85%">
					<EF:EFSelect blockId="result9" ename="totalStyleId" etc="" row="0">
						<EF:EFOptions blockId="result921" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
					</EF:EFSelect>
				</td>
			</tr>
			
			<tr>
				<td nowrap width="15%">每页显示行数</td>
				<td nowrap width="85%">
					<EF:EFInput blockId="result9" ename="showLines" row="0" etc="size='10' maxlength='2' validateType='positive_integer'" />
				</td>
			</tr>
		</table>
	</div>
</div>
</div>

<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
