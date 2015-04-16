<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>历史报警查询</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./HisAlarm.js"></script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'north',split:true,title:'查询条件',collapsible:false" style="height:80px;">
		<div style="padding:10px;">
			<label>开始时间：</label>
			<input class="easyui-datetimebox" style="width:160px" id="dateStartTime"></input>&nbsp;&nbsp;
			<label style="margin-left:10px">结束时间：</label>
			<input class="easyui-datetimebox" style="width:160px" id="dateEndTime"></input>
			<label style="margin-left:10px">Tag点名称：</label>
			<input style="width:160px" id="txtTagName"></input>
			<a style="margin-left:10px" href="#" class="easyui-linkbutton" onclick="queryHisAlarm()">查询</a>
		</div>
	</div>
	<div data-options="region:'center',split:true" title="历史报警列表">
		<table id="datagrid" class="easyui-datagrid" title="" data-options="singleSelect:true,pagination:true,pageSize:10,fit:true,fitColumns:true">
	        <thead>
	            <tr>
	                <th data-options="field:'fdOccurtime',width:160">发生时间</th>
	                <th data-options="field:'fdConfirmtime',width:160">确认时间</th>
	                <th data-options="field:'fdRecovertime',width:160">恢复时间</th>
	                <th data-options="field:'fdTagname',width:160">变量名称</th>
	                <th data-options="field:'fdEgu',width:160">报警类型</th>
	                <th data-options="field:'fdConfirmperson',width:160">确认人</th>
	                <th data-options="field:'fdTagdesp',width:160">变量描述</th>
	                <th data-options="field:'fdPriority',width:80">优先级</th>
	                <th data-options="field:'fdCurvalue',width:160">报警值</th>
	                <th data-options="field:'fdStatus',width:160">报警状态</th>
	            </tr>
	        </thead>
	    </table>
    </div>
</div>
</body>
</html>