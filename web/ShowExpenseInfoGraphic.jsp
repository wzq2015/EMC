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
	<title>费用结果图形显示</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script src="Highcharts/js/highcharts.js"></script>
	<script src="Highcharts/js/modules/exporting.js"></script>
	<script type="text/javascript" src="./ShowExpenseInfoGraphic.js"></script>
	<script type="text/javascript">
			var currentProjectId = <%=projectId%>;
			var currentProjectName = '<%=projectName%>';
	</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'west',split:true, title:'查询条件', collapsible:false" style="width:250px;text-align:center">
		<br><label style="line-height:22pt">选择费用类型：</label><br>
 		<select id="selectExpenseType" name="selectExpenseType" size=10 style="width:180px" multiple="multiple""></select><br>
 		<br><label style="line-height:22pt">选择查询类型：</label><br>
 		<div style="border:1px solid #000;width:180px;margin-left:31px">
 			<div style="text-align:left;padding-left:30px;padding-top:10px;padding-bottom:10px">
 				<input type="radio" name="selectMethod" value="0" checked onClick="showTime(this.value);">按年查询<br/>
 				<input type="radio" name="selectMethod" value="1" onClick="showTime(this.value);">按季度查询<br/>
 				<input type="radio" name="selectMethod" value="2" onClick="showTime(this.value);">按月查询<br/>
 			</div>
 		</div>
 		<br>
 		<label style="line-height:22pt">选择查询时间：</label><br>
 		<div style="border:1px solid #000;width:180px;margin-left:31px;padding-top:10px;padding-bottom:10px">
	 		<div style="line-height:22pt">
	 			年度：<select class="easyui-combobox" id="selectYear" style="width:100px" data-options="editable:false, panelHeight:'auto'"></select><br> 
	 		</div>
	 		<div id="divQuarter" style="display:none;line-height:22pt">
				季度：<select class="easyui-combobox" id="selectQuarter" style="width:100px" data-options="editable:false, panelHeight:'auto'"></select>
	 		</div>
	 		<div id="divMonth" style="display:none;line-height:22pt">
	 			月份：<select class="easyui-combobox" id="selectMonth" style="width:100px" data-options="editable:false, panelHeight:'auto'"></select>
	 		</div>
 		</div>
		<br>
		<br>
		<a href="#" class="easyui-linkbutton" onclick="queryExpenseInfo()">查询</a>   
	</div>
	<div data-options="region:'center',split:true" title="详细信息">
		<div style="height:46%;border:1px solid #000;margin:10px;">
			<div id="chartColumn" style="height:100%;"></div>
		</div>
		<div style="height:46%;text-align:center">
			<div style="width:50%;height:100%;float:left;">
				<div style="border:1px solid #000;margin:10px;">
					<div id="chartBudget" style="height:100%;"></div>
				</div>
			</div>
			<div style="width:50%;height:100%;float:left;">
				<div style="border:1px solid #000;margin:10px;">
					<div id="chartDetail" style="height:100%;"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>