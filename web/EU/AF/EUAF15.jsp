<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String method = (String) request.getParameter("method");
	String nodeVal = (String) request.getParameter("nodeVal");
	String parentVal = (String) request.getParameter("parentVal");

%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>
	<script type="text/javascript" src="./EU/AF/EUAF15.js"></script>
	<style type="text/css">
	.data_table {
		width:100%;
	}
	.data_table tr{
		margin:5px;
	}
	.data_table td{
		padding:3px;
	}
	.button_table{
		margin:0px;
		width:100%;
		height:100%;
		 background-color: #A0D3F0;
	}
	.button_table tr,td {
		padding: 0px;
		margin: 0px;
	}
	.search_table td {
		vertical-align: middle;
		margin: 0px;
		padding: 0px;
	}
	.search_table a {
		display: block;
		width:13px;
	}
	</style>
</head>
<body class="bodyBackground">
<form id="EUAF15" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="帮助文档" efRegionShowClear=false>
	<div id="ef_region_main" style="overflow:hidden;width:100%;padding:0px;">
		<table class="button_table">
			<tr>
				<td colspan="4">
					<div id = "ef_region_inqu" title="表单信息" efRegionShowClear=true>
						<div style="overflow:hidden;width:100%;">
						<input id='method' name='method' value="<%=method %>" type="hidden" />
						<input id='nodeVal' name='nodeVal' value="<%=nodeVal %>"  type="hidden" />
						<input id='parentVal' name='parentVal' value="<%=parentVal %>"  type="hidden" />

						<EF:EFInput blockId="inqu" ename="parentId" row="0" type="hidden" />
						<EF:EFInput blockId="inqu" ename="id" row="0" type="hidden" />
						<table class="data_table">
							<tr>
								<td nowrap width="12%" align="center">标题</td>
								<td nowrap ><EF:EFInput blockId="inqu"
									ename="title" row="0" etc="size='30' maxLength='30'" /><font color="red">*</font></td>
								<td nowrap width="12%"  align="center">关键字</td>
								<td nowrap >
								<EF:EFInput blockId="inqu"
									ename="key" row="0" etc="size='30' maxLength='30'" /><font color="red">*</font></td>
							</tr>
							<tr>
								<td nowrap  align="center">编号</td>
								<td nowrap ><EF:EFInput blockId="inqu"
									ename="docNo" row="0" etc="size='20' maxLength='20'" /><font color="red">*</font></td>
								<td nowrap  align="center">作者</td>
								<td nowrap ><EF:EFInput blockId="inqu"
									ename="author" row="0" etc="size='20' maxLength='20'" /></td>
							</tr>
							<tr>
								<td nowrap  align="center">对应页面号</td>
								<td nowrap colspan="3"><EF:EFInput blockId="inqu"
									ename="pageNo" row="0" etc="size='20' maxLength='20' style='text-transform : uppercase;' " /><font color="red">*</font></td>
							</tr>
							<tr>
								   <td nowrap  align="center" valign="middle">内容</td>
								   <td nowrap width="85%" colspan="3">
									<div id="FCKeditorDisplay" style="display:none">
											<textarea id="FCKeditorTextarea" cols="80" rows="10"></textarea>
							    	</div>
									<EF:EFInput blockId="inqu" ename="infoContent" type="hidden" row="0" />
							   </td>
							</tr>
						</table>
						</div>
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
