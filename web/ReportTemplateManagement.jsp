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
    <title>报表模板管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./ReportTemplateManagement.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
	<table id="datagrid" class="easyui-datagrid" title="报表模板列表" data-options="fit:true,fitColumns:true,singleSelect:true,pagination:true,toolbar:toolbar">
        <thead>
            <tr>
                <th data-options="field:'f_reportTemplateName',width:200, editor:'text'">报表模板名称</th>
                <th data-options="field:'f_reportTemplateDesc',width:200, editor:'text'">报表模板描述</th>
                <th data-options="field:'f_reportTemplateTypeName',width:100,
                			editor:
                			{
                            	type:'combobox',
                            	options:
                            	{
                            		valueField:'text',
                                	textField:'text',
                                	data:reportTypeArray,
                                	panelHeight:'auto',
                                	editable:false
                            	}
                        	}">报表模板类型</th>
                <th data-options="field:'f_reportTemplatePath',width:200, editor:'text'">报表模板路径</th>
                <th data-options="field:'f_reportTemplateAutogenerate',width:120,
                			editor:
                			{
                				type:'checkbox',
                				options:
                				{
                					on: '1',
                					off: '0'
                				}
                			}">是否定期产生</th>
                <th data-options="field:'f_reportTemplateModifiedtime',width:120">上次修改时间</th>
                <th data-options="field:'action',width:120,formatter:actionformat">操作</th>
            </tr>
        </thead>
	</table>
</body>
</html>