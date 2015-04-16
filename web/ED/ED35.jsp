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
<script type="text/javascript" src="./ED/ED35.js"></script>

</head>
<body class="bodyBackground">
	<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

	<div id="ef_region_inqu" title="页面加载测试工具" efRegionShowClear=true>
		<div style="overflow: hidden; width: 100%">
			<table>
				<tr>

					<td nowrap width="15%">当前项目</td>

					<td nowrap width="25%"><EF:EFSelect blockId="inqu_status"
							ename="project_prefix" row="0">
							<EF:EFOption label='全部' value="" />
							<EF:EFOptions conj="-" blockId="projectBlock"
								labelColumn="projectCname" valueColumn="projectPrefix" />
						</EF:EFSelect></td>
					<td nowrap width="15%">页面号</td>
  
					<td nowrap width="25%"><EF:EFInput blockId="inqu_status"
							ename="form_ename" row="0" style="text-transform : uppercase;" /></td>

				</tr>
			</table>
		</div>
	</div>

	<div>
		<div id="ef_grid_testResult" title="测试结果信息" style="height: 275px;"></div>
	</div>

	<div id="ef_tab_y" eftabWidth="100%">
		<div id="tabTestForm" title="页面测试" eftabSrc="about:blank" eftabHeight="600px" efRemember="yes"></div>
	</div>

	<EF:EFGrid blockId="testResult" autoDraw="no" readonly="false">
		<EF:EFColumn ename="form_ename" cname="页面号" fix="yes" />
		<EF:EFColumn ename="form_cname" cname="页面中文" width="200" />
		<EF:EFColumn ename="start_time" cname="开始时间" width="180" />
		<EF:EFColumn ename="end_time" cname="结束时间" width="180" />
		<EF:EFColumn ename="load_time" cname="加载时间" width="180" />
		<EF:EFColumn ename="load_result" cname="加载结果" width="180" />

	</EF:EFGrid>

	<EF:EFTab tabId="y" />
	<EF:EFRegion />

	<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>


</body>
</html>
