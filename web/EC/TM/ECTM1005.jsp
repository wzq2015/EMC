<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>模板设置-文章正文设置</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<!--<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1000.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM1005.js"></script>
</head>
<body class="bodyBackground">

<form id="ECTM1005" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result5" title="文章正文" style="overflow:scroll;width:100%;">
	<EF:EFInput blockId="result5" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFInput blockId="result5" ename="templateUnitType" row="0" etc="value='5'" type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table>
			<tr>
				<td nowrap width="15%">文章正文样式</td>
				<td nowrap width="85%">
					<EF:EFSelect blockId="result5" ename="unitStyleId" etc="" row="0">
						<EF:EFOptions blockId="result51" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
					</EF:EFSelect>
				</td>
			</tr>
			<tr>
				<td nowrap width="20%">是否启用相关文章</td>
				<td nowrap width="80%">
					<EF:EFInput blockId="result5" ename="articleLikeStatus" row="0" type="hidden" />
					<EF:EFInput blockId="result5" ename="articleLikeStatusCheck" type="checkbox" row="0" value="1" etc="onclick='javascript:enableArticleLike()'"></EF:EFInput>
				</td>
			</tr>
			<div>
				<table id="articlePros" style="display:none;">
					<tr>
						<td nowrap width="15%">相关文章样式</td>
						<td nowrap width="85%">
							<EF:EFSelect blockId="result5" ename="articleLikeStyleId" etc="" row="0">
								<EF:EFOptions blockId="result511" labelColumn="styleName" valueColumn="styleId"></EF:EFOptions>
							</EF:EFSelect>
						</td>
					</tr>
			
					<tr>
						<td nowrap width="15%">显示行数</td>
						<td nowrap width="85%">
							<EF:EFInput blockId="result5" ename="articleDisplayRows" row="0" etc="size='24' maxlength='2' validateType='positive_integer'" />
						</td>
					</tr>
					<tr>
						<td nowrap width="15%">显示字数</td>
						<td nowrap width="85%">
							<EF:EFInput blockId="result5" ename="articleDisplayWords" row="0" etc="size='24' maxlength='2' validateType='positive_integer'" />
						</td>
					</tr>
			</table>
		</div>
</table>
</div>
</div>

<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
