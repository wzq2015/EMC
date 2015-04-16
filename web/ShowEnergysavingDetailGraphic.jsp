<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%
	UserSession.web2Service(request);
	String projectId = (String) request.getSession().getAttribute("projectId");
	String projectName = (String) request.getSession().getAttribute("projectName");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>节能量结果图形显示</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script src="Highcharts/js/highcharts.js"></script>
	<script src="Highcharts/js/modules/exporting.js"></script>
	<script type="text/javascript" src="./ShowEnergysavingDetailGraphic.js"></script>
	<script type="text/javascript">
			var currentProjectId = <%=projectId%>;
			var currentProjectName = '<%=projectName%>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'west',split:true, title:'查询条件', collapsible:false" style="width:250px;text-align:center">
		<br>
		<label style="line-height:22pt">选择节能量类型：</label><br>
		<select id="selectEnergysavingType" name="selectEnergysavingType" size=10 style="width:180px" multiple="multiple;overflow:hidden"></select><br>
		<br>
		<label style="line-height:22pt">选择项目结算周期：</label><br>
		<select id="selectCycleIndex" name="selectCycleIndex" size=10 style="width:180px;overflow:hidden" multiple="multiple""></select><br>
		<br>
		<br>
		<a href="#" class="easyui-linkbutton" onclick="queryEnergysavingDetail()">查询</a>
	</div>
	<div data-options="region:'center',split:true" title="详细信息">
		<div style="height:46%">
			<div style="border:1px solid #000;margin:10px;">
				<div id="inputvalueColumn" style="height:100%;width:100%">
				</div>
			</div>
		</div>
		<div style="height:46%">
			<div style="border:1px solid #000;margin:10px;">
				<div id="acqvalueColumn" style="height:100%;width:100%">
				</div>
			</div>
		</div>
	</div>
</div>
</body>