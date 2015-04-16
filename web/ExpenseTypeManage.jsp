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
    <title>费用类型管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./ExpenseTypeManage.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
	<table id="datagrid" class="easyui-datagrid" title="费用类型列表" data-options="singleSelect:true,toolbar:toolbar,pagination:true,pageSize:10,fit:true,fitColumns:true">
        <thead>
            <tr>
                <th data-options="field:'f_expenseTypeName',width:240,editor:'text'">费用类型名称</th>
                <th data-options="field:'f_expenseTypeDesc',width:360,editor:'text'">费用类型描述</th>
                <th data-options="field:'action',width:240,formatter:actionformat">操作</th>
            </tr>
        </thead>
    </table>
</body>
</html>