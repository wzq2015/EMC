<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/AF/EUAF13.js"></script>
	<style type="text/css">

	.data_table {
		width:100%;
	}
	.data_table tr{
		margin:10px;
	}
	.data_table td{
		padding:5px;
	}
	.button_table{
		width:100%;
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

<form id="EUAF13" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="帮助文档" efRegionShowClear=false >
	<div id="ef_region_main" style="overflow:hidden;width:100%">
				<table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
				<tr>
					<td id="leftTree"  width="240px" height="20">
						<table class="search_table">
							<tr>
								<td valign="middle"><tt>搜索:</tt>&nbsp;<EF:EFInput blockId="inqu_status" ename="search_data" row="0" etc="size='10' maxLength='10' " />&nbsp;</td>
								<td valign="middle" width="15px"><a href="#"><img alt="a" src="./EF/Images/back.gif" width="10px" onclick="back()"></a></td>
								<td valign="middle" width="15px"><a href="#" ><img alt="b" src="./EF/Images/next.gif" width="10px" onclick="search()"></a></td>
							</tr>
						</table>
					</td>
					<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
					<td id="rightContent" width=100%  vAlign="top" rowspan="2" >
						<table >
							<tr>
								<td><EF:EFButton cname="添加" ename="addMenu" /></td>
								<td><EF:EFButton cname="编辑" ename="updateMenu"/></td>
								<td><EF:EFButton cname="删除" ename="deleteMenu"/> </td>
								<td width="100%">&nbsp;</td>
							</tr>
							<tr>
								<td colspan="4"><iframe id="rightFrame" name="rightFrame" marginWidth="0" marginHeight="0" src="DispatchAction.do?efFormEname=EUAF14" frameBorder="0" width="100%" scrolling="no" height="580px"></iframe></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td id="leftTree" vAlign="top" >
							<div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
							<EF:EFTree model="tableTreeModel" id="nTree" text="节点树" configFunc="configTree">
							</EF:EFTree>
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
