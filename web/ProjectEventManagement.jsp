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
    <title>项目事件管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./ProjectEventManagement.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'north',split:true, title:'查询条件', collapsible:false" style="height:80px;">
		<div style="padding:10px;">
			<label>选择项目类型：</label>
			<select class="easyui-combobox" id="selectProjectTypes" style="width:160px" data-options="editable:false, panelHeight:'auto'"></select>
			<a style="margin-left:10px" href="#" class="easyui-linkbutton" onclick="queryEventByProjectType()">查询</a>
		</div>
	</div>
	<div data-options="region:'center',split:true" title="项目事件列表">
		<table id="datagrid" class="easyui-datagrid" data-options="singleSelect:true,toolbar:toolbar,pagination:true,fit:true,fitColumns:true">
	        <thead>
	            <tr>
	            	<th data-options="field:'ename',width:200,editor:'text'">事件名称</th>
                	<th data-options="field:'edesc',width:362,editor:'text'">事件描述描述</th>
	                <th data-options="field:'ptname',width:200,editor:'text'">项目类型</th>
	                <th data-options="field:'belongPname',width:200,editor:'text'">所属项目</th>
	                <th data-options="field:'e_belongName',width:200,editor:'text'">事件归属</th>
                	<th data-options="field:'etype',width:200,editor:'text'">事件类型</th>
	            </tr>
	        </thead>
	    </table>
    </div>
</div>
</body>
</html>