<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/MD/EDMD45.js"></script>

</head>
<body class="bodyBackground">

	<form id="EDMD45" method="POST" action="<%=actionUrl%>">

		<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

		<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
			<div style="width: 100%" id="inline1">
				<table>
					<tr>
						<td>功能英文名</td>
						<td><EF:EFInput blockId="inqu_status" ename="funcEname"
								row="0" /></td>
						<td>功能中文名称</td>
						<td><EF:EFInput blockId="inqu_status" ename="funcCname"
								row="0" /></td>
					</tr>
				</table>
			</div>
		</div>

		<div id="ef_region_copy" title="新功能模型信息" efRegionShowClear=true style="display:none;">
			<div style="width: 100%">
				<table>
					<tr>
						<td>功能英文名</td>
						<td><EF:EFInput blockId="copy" ename="funcEname"
								row="0" /></td>
						<td>功能中文名称</td>
						<td><EF:EFInput blockId="copy" ename="funcCname"
								row="0" /></td>
					</tr>
					<tr>
						<td>一级模块名</td>
						<td><EF:EFInput blockId="copy" ename="moduleEname1"
								row="0" /></td>
						<td>二级模块名</td>
						<td><EF:EFInput blockId="copy" ename="moduleEname2"
								row="0" /></td>
					</tr>
				</table>
			</div>
		</div>

		<div id="ef_region_result" title="记录集" style="overflow: scroll">
			<div id="ef_grid_result" title="页面信息"
				style="overflow: hidden; height: 300px;"></div>
		</div>

		<EF:EFRegion />
		<EF:EFGrid blockId="result" autoDraw="false">
			<EF:EFColumn ename="id" visible="false"/>
			<EF:EFColumn ename="funcEname" />
			<EF:EFColumn ename="funcCname" />
			<EF:EFComboColumn ename="funcType" valueProperty="value"
				align="center" width="100">
				<EF:EFOption value="0" label="单记录风格" />
				<EF:EFOption value="1" label="多记录风格" />
			</EF:EFComboColumn>

			<EF:EFColumn ename="moduleEname1" cname="一级模块名" />
			<EF:EFColumn ename="moduleEname2" cname="二级模块名" />

			<EF:EFPopupColumn ename="modelId" cname="领域模型" labelProperty="dataModelName"
         		contentDivId = "dataModelId_Popup" width="120" />

			<EF:EFColumn ename="editModel" cname="配置" width="40"/>
			<EF:EFColumn ename="recCreator" visible="false" />
			<EF:EFColumn ename="recCreateTime" visible="false" />
			<EF:EFColumn ename="recRevisor" visible="false" />
			<EF:EFColumn ename="recReviseTime" visible="false" />
			<EF:EFColumn ename="archiveFlag" visible="false" />
		</EF:EFGrid>

		<div id="dataModelId_Popup" class="efwindow" title="请选择"
			style="overflow: hidden; display: none; width: 520px">
			<table>
				<tr>
					<td colspan=2>
						<table>
							<tr>
								<td nowrap width="15%">模型英文名</td>
								<td nowrap width="20%">
									<EF:EFInput blockId="cond_inqu"	ename="modelEname" row="0" /></td>
								<td nowrap width="15%">模型中文名</td>
								<td nowrap width="20%">
									<EF:EFInput blockId="cond_inqu"	ename="modelCname" row="0" /></td>
								<td nowrap width="20%">
									<input class="buttonClass"
									type="button" value="查询" onclick='dataMode_query_onclick();' />
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan=2>
						<div id="ef_grid_result_combineModel" title="页面信息"
							style="overflow: hidden; height: 300px;">
						</div>
						<EF:EFGrid
							blockId="result_combineModel" autoDraw="false" ajax="true" enable="false" serviceName="EDMD41" queryMethod="getCombineModel"
							style="operationBar:false;toolBar:false">
							<EF:EFColumn ename="modelId" cname="编号" width="40" 	visible="false" />
							<EF:EFColumn ename="modelEname" cname="模型英文名" width="200" />
							<EF:EFColumn ename="dataModelName" cname="模型中文名" width="200" />
						</EF:EFGrid>
					</td>
				</tr>
				<tr>
					<td align='right' colspan=2><input class=buttonClass
						type=button value='确定' onclick='dataMode_popup_save_onclick();' />
					</td>
				</tr>
			</table>
		</div>

		<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>

</body>
</html>
