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
    <title>操作日志查询 </title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./QueryOperationLog.js"></script>
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
			<input class="easyui-datetimebox" style="width:160px" id="dateStartTime"></input>
			<label style="margin-left:10px">结束时间：</label>
			<input class="easyui-datetimebox" style="width:160px" id="dateEndTime"></input>
			<a style="margin-left:10px" href="#" class="easyui-linkbutton" onclick="queryOperationLog()">查询</a>
		</div>
	</div>
	<div data-options="region:'center',split:true" title="操作日志列表">
	  	<table id="datagrid" class="easyui-datagrid" data-options="rownumbers:true,singleSelect:true,pagination:true,fit:true,fitColumns:true">
	      <thead>
	          <tr>
	              <th data-options="field:'f_operation_time',width:160,editor:'text'">日志时间</th>
	              <th data-options="field:'f_operation_type',width:120,editor:'text'">日志级别</th>
	              <th data-options="field:'f_user_name',width:120,editor:'text'">用户名称</th>
	              <th data-options="field:'f_operation_clientip',width:240,editor:'text'">用户IP地址</th>
	              <th data-options="field:'f_operation_content',width:360,editor:'text'">日志内容</th>
	          </tr>
	      </thead>
	  	</table>
  	</div>
</div>
</body>
</html>