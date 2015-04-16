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
    <title>EMC项目周期管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./ProjectCycleManagement.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'north',split:true, title:'项目信息', collapsible:false" style="height:80px;">
		<div style="padding:15px">
			<label id="lblProjectDesc"></label>
		</div>
	</div>
	<div data-options="region:'center',split:true" title="项目周期列表">
		<table id="datagrid" class="easyui-datagrid" data-options="singleSelect:true,pagination:true,fit:true,fitColumns:true">
	        <thead>
	            <tr>
	                <th data-options="field:'f_emcprojectCycleIndex',width:100">周期序号</th>
	                <th data-options="field:'f_emcprojectCycleStarttime',width:160,editor:'datetimebox'">周期起始时间</th>
	                <th data-options="field:'f_emcprojectCycleEndtime',width:160,editor:'datetimebox'">周期结束时间</th>
	                <th data-options="field:'action',width:240,formatter:actionformat">操作</th>
	            </tr>
	        </thead>
		</table>
	</div>
</div>
</body>
</html>