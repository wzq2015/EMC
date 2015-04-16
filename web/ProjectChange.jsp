<%@ page contentType="text/html; charset=UTF-8"%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>切换项目</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="./jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="./jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ProjectChange.js"></script>
</head>
<body style="background-color:white;">
<div class="easyui-layout" style="height:200px">
	<div data-options="region:'center',split:true" style="height:200px;" title="项目树">
		<ul id="tree" class="easyui-tree"></ul>
	</div>
</div>
	<div style="text-align:center;padding-top:10px;">
		<a href="#" class="easyui-linkbutton" onclick="ChangeProject()">确定</a>
	</div>
</body>
</html>