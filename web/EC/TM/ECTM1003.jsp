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
<title>模板设置-标题链接设置</title>
<LINK rel=stylesheet href="EU/ueditor/themes/default/ueditor.css"> 
<SCRIPT type=text/javascript src="EU/ueditor/editor_config_1.js"></SCRIPT> 

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1003.js"></script>
</head>
<body class="bodyBackground">
<EF:EFInput blockId="result3" type="hidden" ename="userTitlePrefixHd" row="0" />
<EF:EFInput blockId="result3" type="hidden" ename="userTitleSuffixHd" row="0" />

<form id="ECTM1003" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result3" title="标题链接" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result3" type="hidden" ename="userTitlePrefixHd" row="0" />
	<EF:EFInput blockId="result3" type="hidden" ename="userTitleSuffixHd" row="0" />
	<EF:EFInput blockId="result3" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result3" ename="templateUnitType" row="0" etc="value='3'" type="hidden" /> 
	<EF:EFInput blockId="result3" ename="titleLinkIsIncludeUnder" row="0" type="hidden" /> 
	<EF:EFInput blockId="result3" ename="titleLinkIsPage" row="0" type="hidden" /> 
	<EF:EFInput blockId="result3" ename="titleLinkIsShowUnder" row="0" type="hidden" />
	<input type=hidden id='nodeId' value="<%=nodeId%>">
	<input type=hidden id='nodeType' value="<%=nodeType%>">
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td  width="15%">标题样式</td>
		<td  width="85%">
			<EF:EFSelect blockId="result3" ename="unitStyleId" etc="" row="0">
				<EF:EFOptions blockId="result31" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
			</EF:EFSelect> &nbsp;&nbsp; 
			<a style='cursor:pointer' onclick="openTemplatePrefixSufix();"> 
				<font color="blue"><span id='styleCode'>定义标题链接前后缀</span> </font> 
			</a>
		</td>
	</tr>
	<tr>
		<td  width="15%">来源方式</td>
		<td  width="85%">
			<EF:EFSelect blockId="result3" ename="titleLinkContentSourceMode" etc="onchange=onselect_source(2,this.value)" row="0">
				<EF:EFOption label="指定栏目　　　　　　" value="1"></EF:EFOption>
				<EF:EFOption label="当前栏目" value="3"></EF:EFOption>
			</EF:EFSelect>
		</td>
	</tr>
	<tr id='colsource2' style='display:;'>
		<td  width="15%">指定栏目</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" ename="titleLinkSpecColumn" row="0" type="hidden" /> 
			<EF:EFInput blockId="result3" ename="titleLinkSpecColumnName" row="0" etc="size='24' readonly" /> 
			<input type=button value='选择' id="colSelect2" onclick='openPan(2)' style='border:#aaaaaa solid 1px;background-color:#fff999;height=17px;padding-top:0px;'>
		</td>
	</tr>
	<tr>
		<td  width="15%">获取规则</td>
		<td  width="85%">
			<EF:EFSelect blockId="result3" ename="titleLinkAccessRule" etc="" row="0">
				<EF:EFOption label="最新文章" value="1"></EF:EFOption>
				<EF:EFOption label="最热文章" value="2"></EF:EFOption>
			</EF:EFSelect>
		</td>
	</tr>
	<tr>
		<td  width="15%">是否包含下级</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" type="checkbox" ename="isIncludeUnder" row="0" etc="onclick='formatIsIncludeUnder(this);' " />
		</td>
	</tr>
	<tr id="titleLink_IsPage">
		<td  width="15%">是否分页</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" type="checkbox" ename="isPage" row="0" etc="onclick='formatIsPage(this);' " />
		</td>
	</tr>
	<tr id="titleLink_IsShowUnder">
		<td  width="15%">分组显示下级栏目</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" type="checkbox" ename="isShowUnder" row="0" etc="onclick='formatIsShowUnder(this);' " />
		</td>
	</tr>
	<tr>
		<td  width="15%">显 示</td>
		<td  width="85%">
			<table>
				<tr><td>
						<EF:EFInput blockId="result3" ename="titleLinkDisplayRows" row="0" etc="size='10' maxlength='3' validateType='positive_integer'" />行
					</td>
					<td style="display:block" id="titleLink_DisplayCols">
						<EF:EFInput blockId="result3" ename="titleLinkDisplayCols" row="0" etc="size='10' maxlength='3' validateType='positive_integer'" />列
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td  width="15%">显示字数</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" ename="titleLinkDisplayWords" row="0" etc="size='24' maxlength='2' validateType='positive_integer'" />
		</td>
	</tr>
	<tr style="display:none" id="titleLink_PageDisplayNum">
		<td  width="15%">每页行数</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" ename="titleLinkPageDisplayNum" row="0" etc="size='24' maxlength='3' validateType='positive_integer'" />
		</td>
	</tr>
	<tr>
		<td colspan="2" width="100%">
		<div id="templdatePrefixSuffix" style="display:none">
		<table>
			<tr>
				<td width="15%">标题前缀</td>
				<td>
					<!--<div id="FCKeditorTitlePrefix" style="display: none">
						<textarea id="DataFCKeditorTitlePrefix" cols="80" rows="10"></textarea>
					</div>-->
					<div id="myEditor1"> 
					</div>
					<EF:EFInput blockId="result3" ename="titleLinkPrefixString" type="hidden" row="0"  />
				</td>
			</tr>
			<tr>
				<td width="15%">标题后缀</td>
				<td>
					<!--<div id="FCKeditorTitleSuffix" style="display: none">
						<textarea id="DataFCKeditorTitleSuffix" cols="80" rows="10"></textarea>
					</div>-->
					<div id="myEditor2"> 
					</div>
					<EF:EFInput blockId="result3" ename="titleLinkPostfixString" type="hidden" row="0"  />
				</td>
			</tr>
			<tr> 
				<td  width="15%">标题前缀显示方式</td>
				<td  width="85%">
					<input type="radio" name="userTitlePrefix" value="1" id="useTitPrefix" /> 模板级前缀&nbsp; 
					<input type="radio" name="userTitlePrefix" value="2" id="useArtPrefix" checked="checked" /> 文章级前缀&nbsp; 
					<input type="radio" name="userTitlePrefix" value="3" id="useBothPrefix" /> 以上全选
				</td>
			</tr>
			<tr>
				<td  width="15%">标题后缀显示方式</td>
				<td  width="85%">
					<input type="radio" name="userTitleSuffix" id="useTitSuffix" value="1" /> 模板级后缀&nbsp; 
					<input type="radio" name="userTitleSuffix" id="useArtSuffix" value="2" checked="checked" /> 文章级后缀&nbsp; 
					<input type="radio" name="userTitleSuffix" id="useBothSuffix" value="3" /> 以上全选
				</td>
			</tr>
		</table>
		</div>
		</td>
	</tr>
	<tr>
		<td  width="15%">标题前缀有效时间</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" ename="titleLinkPrefixEffectDays" row="0" etc="size='24' maxlength='3' validateType='positive_integer'" />天
		</td>
	</tr>
	<tr>
		<td  width="15%">标题后缀有效时间</td>
		<td  width="85%">
			<EF:EFInput blockId="result3" ename="titleLinkPostfixEffectDays" row="0" etc="size='24' maxlength='3' validateType='positive_integer'" />天
		</td>
	</tr>
	<tr>
		<td width="15%">更多显示样式</td>
		<td>
			<!--<div id="FCKeditorTitleMoreDispStyle" style="display: none">
						<textarea id="DataFCKeditorTitleMoreDispStyle" cols="80" rows="10"></textarea>
		    </div>-->
		    <div id="myEditor3"> 
			</div>
			<EF:EFInput blockId="result3" ename="titleLinkMoreString" type="hidden" row="0" etc="size='24' maxlength='20'" />
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
