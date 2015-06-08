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
    <title>项目信息编码管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="./jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="./jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EventLogManagement.js"></script>
	<script type="text/javascript" src="./EventLogManagement1.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
	<style type="text/css">
		.desctitle {
			height:30px;
			font-weight:bold;
			font-size:12pt;
		}
		.descitem {
			line-height:22pt;
		}
        .descitem label {
            display:inline-block;
            width:120px;
        }
	</style>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'west',split:true,title:'项目信息树',collapsible:false" style="width:350px;">
		<ul id="tree" class="easyui-tree"></ul>
	</div>
	<div data-options="region:'center',split:true" title="详细信息">
		<input type="hidden" id="f_eventLogType" />
		<input type="hidden" id="f_eventLogBelongId" />
		<table id="datagrid" class="easyui-datagrid" title="" data-options="singleSelect:true,pagination:true,toolbar:toolbar,fit:true,fitColumns:true">
        	<thead>
            	<tr>
                	<th data-options="field:'f_eventLogName',width:160,editor:'text'">事件名称</th>
                	<th data-options="field:'f_eventLogDesc',width:160,editor:'text'">事件描述描述</th>
                	<th data-options="field:'f_eventLogRemindDate',width:240,editor:{type:'datebox',options:{editable:false}}">事件提醒时间</th>
                	<th data-options="field:'f_eventLogRemindSwitch',width:240,editor:{
	                            type:'combobox',
	                            options:{
	                                valueField:'value',
	                                textField:'text',
	                                panelHeight:'auto',
	                                editable:false
	                            }}">事件提醒开关</th>
                	<th data-options="field:'f_eventLogType',width:240">事件所属类型</th>
                	<th data-options="field:'action',width:160,formatter:actionformat">操作</th>
            	</tr>
        	</thead>
    	</table>
	</div>
</div>
</body>
</html>