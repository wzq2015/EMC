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
    <title>查询费用信息</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./ShowExpenseInfo.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'north',split:true, title:'查询条件', collapsible:false" style="height:80px;">
		<div style="padding:10px;">
			<label>选择费用类型：</label>
			<select class="easyui-combobox" id="selectExpenseType" style="width:160px" data-options="editable:false, panelHeight:'auto'"></select>
			<label style="margin-left:10px">选择年份：</label>
			<select class="easyui-combobox" id="selectYear" style="width:160px" data-options="editable:false, panelHeight:'auto'"></select>
			<label style="margin-left:10px">选择月份：</label>
			<select class="easyui-combobox" id="selectMonth" style="width:160px" data-options="editable:false, panelHeight:'auto'"></select>
			<a style="margin-left:10px" href="#" class="easyui-linkbutton" onclick="queryExpenseInfo()">查询</a>
		</div>
	</div>
	<div data-options="region:'center',split:true" title="费用结果列表">
		<table id="datagrid" class="easyui-datagrid" data-options="singleSelect:true,toolbar:toolbar,pagination:true,fit:true,fitColumns:true">
	        <thead>
	            <tr>
	                <th data-options="field:'f_expenseTypeName',width:120">费用类型</th>
	                <th data-options="field:'f_expenseBudgetYear',width:120">年度</th>
	                <th data-options="field:'f_expenseBudgetIndex',width:120">月份</th>
	                <th data-options="field:'f_expenseBudgetPlannedvalue',width:120,align:'right'">预算金额</th>
	                <th data-options="field:'f_expenseBudgetActualvalue',width:120,align:'right'">实际金额</th>
	            </tr>
	        </thead>
	    </table>
    </div>
</div>
</body>
</html>