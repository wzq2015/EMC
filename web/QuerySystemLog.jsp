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
    <title>系统日志查询</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./QuerySystemLog.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'north',split:true, title:'查询条件', collapsible:false" style="height:80px;">
		<div style="padding:10px;">
			<label>初始时间：</label>
			<input class="easyui-datetimebox" style="width:160px" id="dateStartTime"></input>&nbsp;&nbsp;
			<label style="margin-left:10px">结束时间：</label>
			<input class="easyui-datetimebox" style="width:160px" id="dateEndTime"></input>
			<a style="margin-left:10px" href="#" class="easyui-linkbutton" onclick="querySystemLog()">查询</a>
		</div>
	</div>
	<div data-options="region:'center',split:true" title="系统日志列表">
	   	<table id="datagrid" class="easyui-datagrid" data-options="pagination:true,rownumbers:true,singleSelect:true,fit:true,fitColumns:true">
	        <thead>
	            <tr>
	                <th data-options="field:'f_system_log_time',width:200,editor:'text'">日志时间</th>
	                <th data-options="field:'f_system_log_level',width:150,editor:'text'">日志级别</th>
	                <th data-options="field:'f_system_log_content',width:500,editor:'text'">日志内容</th>
	            </tr>
	        </thead>
	    </table>
    </div>
</div>
</body>
</html>
