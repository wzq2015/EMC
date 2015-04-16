<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>项目权限管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="./jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="./jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ProjectAuth.js"></script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'west',split:true,title:'用户信息树',collapsible:false" style="width:350px;">
		<ul id="tree" class="easyui-tree"></ul>
	</div>
	<div data-options="region:'center',split:true" title="项目信息">
	  	<table id="datagrid" class="easyui-datagrid" data-options="toolbar:toolbar,singleSelect:true,pagination:true,fit:true,fitColumns:true">
	      <thead>
	          <tr>
	              <th data-options="field:'isSelected',width:80,editor:
	              			{
                				type:'checkbox',
                				options:
                				{
                					on: '是',
                					off: '否'
                				}
                			}">是否授权</th>
	              <th data-options="field:'f_emcprojectName',width:120">项目名称</th>
	          </tr>
	      </thead>
	  	</table>
	</div>
</div>
</body>
</html>