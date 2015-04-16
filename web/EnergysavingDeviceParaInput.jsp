<%@ page contentType="text/html; charset=UTF-8"%>

<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%
	UserSession.web2Service(request);
	String projectId = (String)request.getSession().getAttribute("projectId");
	String projectName = (String)request.getSession().getAttribute("projectName");
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>设备参数录入</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./EnergysavingDeviceParaInput.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'north',split:true, title:'查询条件', collapsible:false" style="height:80px;">
		<div style="padding:10px;">
			<label>选择需要录入的项目期数（0为初始值）：</label>
			<input id="nsCycleIndex" class="easyui-numberspinner" style="width:80px;">
			<a style="margin-left:10px" href="#" class="easyui-linkbutton" onclick="showDeviceParaGrid()">查询</a>
		</div>
	</div>
	<div data-options="region:'center',split:true" title="节能量设备参数列表">
		<table id="datagrid" class="easyui-datagrid" data-options="singleSelect:true,pagination:true,fit:true,fitColumns:true">
			<thead>
			    <tr>
			        <th data-options="field:'f_deviceparaName',width:160">设备参数名称</th>
			        <th data-options="field:'f_deviceparaEntryValue',width:160,editor:'text'">设备参数值</th>
			        <th data-options="field:'f_deviceparaEntryDatetime',width:160,editor:'datetimebox'">设备参数抄表时间</th>
			        <th data-options="field:'action',width:240,formatter:actionformat">操作</th>
			    </tr>
			</thead>
		</table>
	</div>
</div>
</body>
</html>