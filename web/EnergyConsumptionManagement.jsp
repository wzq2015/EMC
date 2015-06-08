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
    <title>能耗工艺参数管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./EnergyConsumptionManagement.js"></script>
	<script type="text/javascript">
		var currentProjectId = <%= projectId %>;
		var currentProjectName = '<%= projectName %>';
	</script>
</head>
<body>
	<table id="datagrid" class="easyui-datagrid" title="能耗工艺参数列表" data-options="singleSelect:true,pagination:true,toolbar:toolbar,fit:true,fitColumns:true">
        <thead>
            <tr>
                <th data-options="field:'f_energyConsumptionName',width:160,editor:'text'">能耗名称</th>
                <th data-options="field:'f_energyConsumptionDesc',width:160,editor:'text'">能耗描述</th>
                <th data-options="field:'f_energyConsumptionFormula',width:240">能耗计算公式</th>
                <th data-options="field:'f_energyConsumptionTargetvalue',width:120,editor:'text'">能耗基准值</th>
                <th data-options="field:'action',width:160,formatter:actionformat">操作</th>
            </tr>
        </thead>
    </table>
    
    <div id="dlgformula" class="easyui-dialog" style="width:550px;height:550px;padding:10px;" closed="true" buttons="#dlgformulaButtons">
    	<textarea id="txtformula" rows="5" cols="70" wrap="virtual"></textarea>
    	<div style="padding:5px;">
	        <a href="#" class="easyui-linkbutton" onclick="insertFormula('+')">+</a>
    	    <a href="#" class="easyui-linkbutton" onclick="insertFormula('-')">-</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('*')">*</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('/')">/</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('%')">%</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('(')">(</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula(')')">)</a>
        	<br/>
        	<br/>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('Math.abs(x)')">abs</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('Math.pow(x, y)')">pow</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('Math.log(x)')">log</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('x.toFixed(n)')">Fixed</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('Math.sin(x)')">sin</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('Math.cos(x)')">cos</a>
        	<a href="#" class="easyui-linkbutton" onclick="insertFormula('Math.tan(x)')">tan</a>
    	</div>
    	
    	<div style="padding:5px 0px;">
    		<table id="datagridtag" class="easyui-datagrid" title="Tag点列表" pagination="true" data-options="rownumbers:true,pagination:true,singleSelect:true,toolbar:'#taggridtb'">
        		<thead>
	            	<tr>
	                	<th data-options="field:'f_deviceparaName',width:100">设备参数名称</th>
	                	<th data-options="field:'f_deviceparaDesc',width:100">设备参数描述</th>
	                	<th data-options="field:'f_deviceparaTagname',width:120">Tag点</th>
	                	<th data-options="field:'action',width:120,formatter:tagactionformat">选择</th>
	            	</tr>
        		</thead>
    		</table>
    		<div id="taggridtb" style="padding:5px;height:auto">
    			<input id="txtTagName" style="width:80px" />&nbsp&nbsp
    			<a href="#" class="easyui-linkbutton" onclick="searchTag()">查询</a>
    		</div>
    	</div>
    </div>
    <div id="dlgformulaButtons">
		<a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveFormula()">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgformula').dialog('close')">取消</a>
	</div>
</body>
</html>