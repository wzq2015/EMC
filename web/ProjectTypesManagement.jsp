<%@ page contentType="text/html; charset=UTF-8"%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>项目类型管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="./jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="./jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ProjectTypesManagement.js"></script>
	<script type="text/javascript" src="./EnergySavingTypeTemplate.js"></script>
	<script type="text/javascript" src="./ExpenseTypeTemplate.js"></script>
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
	<div data-options="region:'west',split:true, title:'项目类型树', collapsible:false" style="width:350px;">
		<div style="padding:5px">
			<a href="#" class="easyui-linkbutton" onclick="addNode()">增加</a>
			<a href="#" class="easyui-linkbutton" onclick="editNode()">编辑</a>
			<a href="#" class="easyui-linkbutton" onclick="deleteNode()">删除</a>
		</div>
		<ul id="tree" class="easyui-tree" dnd="true"></ul>
	</div>
	<div data-options="region:'center',split:true" title="详细信息">
		<input type="hidden" id="f_typeTemplateId" />
		<!-- 标签页面或者选项卡 -->
		<div id="divProjectTypes" class="easyui-tabs" fit="true" style="display:none;">
			<div title="项目类型基本信息" style="padding:10px;">
				<div class="descitem">
					<label>项目类型名称:</label><input id="txtProjectTypeName"/><br/>
					<label>项目类型描述:</label><input id="txtProjectTypeDesc"/><br/>
					<div style="padding:6px;padding-left:120px;">
						<a id="btnSaveProjectType" href="#" class="easyui-linkbutton" onclick="updateProjectType()">保存</a>&nbsp&nbsp
						<a id="btnCancelSaveProjectType" href="#" class="easyui-linkbutton" onclick="cancelUpdate('projectType')">取消</a>
					</div>
				</div>
			</div>
			<div id="energysavingTypeTemplate" title="节能量类型模版" style="padding:10px;">
				<table id="datagrid" class="easyui-datagrid" title="节能量类型模版列表" data-options="singleSelect:true,pagination:true,toolbar:toolbar,fit:true,fitColumns:true">
        			<thead>
            			<tr>
                			<th data-options="field:'f_energysavingTypeName',width:160,editor:'text'">节能量类型名称</th>
                			<th data-options="field:'f_energysavingTypeDesc',width:160,editor:'text'">节能量类型描述</th>
                			<th data-options="field:'f_energysavingTypeFormula',width:240">节能量计算公式</th>
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
    			</div>
    			<div id="dlgformulaButtons">
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveFormula()">确定</a>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgformula').dialog('close')">取消</a>
				</div>
			</div>
			<div id="expenseTypetemplate" title="费用类型模版" style="padding:10px;">
				<table id="datagrid1" class="easyui-datagrid" title="费用类型模版列表" data-options="singleSelect:true,toolbar:toolbar1,pagination:true,pageSize:10,fit:true,fitColumns:true">
        			<thead>
            			<tr>
                			<th data-options="field:'f_expenseTypeName',width:240,editor:'text'">费用类型模版名称</th>
                			<th data-options="field:'f_expenseTypeDesc',width:360,editor:'text'">费用类型模版描述</th>
                			<th data-options="field:'action',width:240,formatter:actionformat1">操作</th>
            			</tr>
        			</thead>
    			</table>
			</div>
		</div>
	</div>
</div>
<div id="dlgProjectType" class="easyui-dialog" title="新建项目类型" style="width:400px;height:280px;padding:10px 20px" closed="true" buttons="#dlgProjecttypeButtons">
	<div class="desctitle">项目类型信息</div>
	<div class="descitem">
		<label>项目类型名称:</label><input id="txtNewProjectTypeName"/>
		<label>项目类型描述:</label><input id="txtNewProjectTypeDesc"/>
	</div>
</div>
<div id="dlgProjecttypeButtons">
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="insertProjectType()">确定</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgProjectType').dialog('close')">取消</a>
</div>
</body>
</html>