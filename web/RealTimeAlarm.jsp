<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>实时报警列表</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./RealTimeAlarm.js"></script>
</head>
<body>
	<table id="datagrid" class="easyui-datagrid" title="实时报警列表" data-options="singleSelect:true,pagination:true,pageSize:10,fit:true,fitColumns:true">
        <thead>
            <tr>
                <th data-options="field:'fdOccurtime',width:160">发生时间</th>
                <th data-options="field:'fdConfirmtime',width:160">确认时间</th>
                <th data-options="field:'fdRecovertime',width:160">恢复时间</th>
                <th data-options="field:'fdTagname',width:160">变量名称</th>
                <th data-options="field:'fdAlarmtype',width:80">报警类型</th>
                <th data-options="field:'fdConfirmperson',width:160">确认人</th>
                <th data-options="field:'fdTagdesp',width:160">变量描述</th>
                <th data-options="field:'fdPriority',width:80">优先级</th>
                <th data-options="field:'fdCurvalue',width:120">报警值</th>
                <th data-options="field:'fdIsConfirm',width:80">是否确认</th>
                <th data-options="field:'fdIsRecover',width:80">是否恢复</th>
                <th data-options="field:'action',width:120,formatter:actionformat">操作</th>
            </tr>
        </thead>
    </table>
</body>
</html>