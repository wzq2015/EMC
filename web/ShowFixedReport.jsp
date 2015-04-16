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
    <title>固定周期报表查询</title>
    <link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
    <link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
    <script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
    <script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>	
    <script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="./EF/EF.js"></script>
    <script type="text/javascript" src="ShowFixedReport.js"></script>
    <script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'north',collapsible:false,split:true" title="报表查询" style="height:90px">
		<div style="padding:7px">
			<div style="float:left;padding:10px">
				<label>选择报表类型：</label><select class="easyui-combobox" id="selectReportType" style="width:140px" data-options="editable:false,panelHeight:'auto'"></select>
			</div>
			<div style="float:left;padding:10px">
				<label>选择报表名称：</label><select class="easyui-combobox" id="selectReport" style="width:140px" data-options="editable:false,panelHeight:'auto'"></select>
			</div>
			<div style="float:left;padding:10px" id="divSelectCycleIndex">
				<label>选择项目周期：</label><select class="easyui-combobox" id="selectCycleIndex" style="width:140px" data-options="editable:false"></select>
			</div>
			<div style="float:left;display:none;padding:10px" id="divSelectYear">
				<label>选择年度：</label><select class="easyui-combobox" id="selectYear" style="width:140px" data-options="editable:false,panelHeight:'auto'"></select>
			</div>
			<div style="float:left;display:none;padding:10px" id="divSelectQuarterMonth">
				<label id="lblSelectQuarterMonth">选择季度：</label><select class="easyui-combobox" id="selectQuarterMonth" style="width:140px" data-options="editable:false,panelHeight:'auto'"></select>
			</div>
			<div style="float:left;display:none;padding:10px" id="divSelectDay">
				<label>选择日期：</label><input class="easyui-datebox" style="width:140px" id="dateSelectDay"></input>
			</div>
			<div style="padding:8px">
				<a style="margin-left:10px" href="#" id='searchButton' class="easyui-linkbutton" data-options="iconCls:'icon-reload'" onclick="doSearch()">查询</a>
				<a style="margin-left:10px" href="#" id='downloadButton' class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="doDownload()">打开表单</a>
			</div>
		</div>
	</div>
	<div data-options="region:'center'" title="固定报表查询">
		<iframe id="reportFrame" width="100%" height="99%" frameborder="0" src=""></iframe>
	</div>
</div>
</body>
</html>