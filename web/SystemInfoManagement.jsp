<%@ page contentType="text/html; charset=UTF-8"%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>系统信息编码管理</title>
	<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="./jqueryeasyui/themes/icon.css">
	<script type="text/javascript" src="./jqueryeasyui/jquery.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="./jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="./EmcCommon.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./SystemInfoManagement.js"></script>
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
	<div data-options="region:'west',split:true, title:'系统信息树', collapsible:false" style="width:350px;">
		<div style="padding:5px">
			<a href="#" class="easyui-linkbutton" onclick="addNode()">增加</a>
			<a href="#" class="easyui-linkbutton" onclick="editNode()">编辑</a>
			<a href="#" class="easyui-linkbutton" onclick="deleteNode()">删除</a>
			<a id="btnAddSubCompanyNode" href="#" class="easyui-linkbutton" data-options="disabled:true" onclick="addNode('addSubCompanyNode')">增加子公司</a>
		</div>
		<ul id="tree" class="easyui-tree" dnd="true"></ul>
	</div>
	<div data-options="region:'center',split:true" title="详细信息">
		<div id="divArea" style="padding:30px;display:none;">
			<div class="desctitle">区域信息</div>
			<div class="descitem">
				<label>区域名称:</label><input id="txtAreaName"/><br/>
				<label>区域描述:</label><input id="txtAreaDesc"/><br/>
				<div style="padding:6px;padding-left:120px;">
					<a id="btnSaveArea" href="#" class="easyui-linkbutton" onclick="updateArea()">保存</a>&nbsp&nbsp
					<a id="btnCancelSaveArea" href="#" class="easyui-linkbutton" onclick="cancelUpdate('area')">取消</a>
				</div>
			</div>
		</div>
		<div id="divCompany" style="padding:30px;display:none;">
			<div class="desctitle">公司信息</div>
			<div class="descitem">
				<label>公司名称:</label><input id="txtCompanyName"/><br/>
				<label>公司描述:</label><input id="txtCompanyDesc"/><br/>
				<label>公司地址:</label><input id="txtCompanyAddress"/><br/>
				<label>邮政编码:</label><input id="txtZipCode"/><br/>
				<label>公司账号:</label><input id="txtCompanyAccount"/><br/>
				<label>公司税号:</label><input id="txtTaxNumber"/><br/>
				<label>公司开户行:</label><input id="txtBank"/><br/>
				<label>组织机构代码:</label><input id="txtOrgCode"/><br/>
				<div style="padding:6px;padding-left:120px;">
					<a id="btnSaveCompany" href="#" class="easyui-linkbutton" onclick="updateCompany()">保存</a>&nbsp&nbsp
					<a id="btnCancelSaveCompany" href="#" class="easyui-linkbutton" onclick="cancelUpdate('company')">取消</a>
				</div>
			</div>
		</div>
		<div id="divEmcproject" style="padding:30px;display:none;">
			<div class="desctitle">EMC项目信息</div>
			<div class="descitem">
				<label>项目名称:</label><input id="txtProjectName"/><br/>
				<label>项目描述:</label><input id="txtProjectDesc"/><br/>
				<label>项目地址:</label><input id="txtProjectAddress"/><br/>
				<label>建设日期:</label><input class="easyui-datebox" id="txtConstructDate"/><br/>
				<label>竣工日期:</label><input class="easyui-datebox" id="txtCommissionDate"/><br/>
				<label>项目责任人:</label><input id="txtProjectRes"/><br/>
				<label>建设单位:</label><input id="txtConstructUnit"/><br/>
				<label>开始日期:</label><input class="easyui-datebox" id="txtStartDate"/><br/>
				<label>结束日期:</label><input class="easyui-datebox" id="txtEndDate"/><br/>
				<label>项目结算周期数：</label><input id="txtTotalCycleNumber"/><br/>
				<label>负责人电子邮件：</label><input id="txtResEmail"/><br/>
				<label>负责人电话：</label><input id="txtResPhone"/><br/>
				<label>客户项目经理：</label><input id="txtCustomerPM"/><br/>
				<label>客户项目经理Email：</label><input id="txtCustomerPMEmail"/><br/>
				<label>客户项目经理电话：</label><input id="txtCustomerPMPhone"/><br/>
				<label>初始监控画面：</label><input id="txtInitPage"/><br/>
				<div style="padding:6px;padding-left:120px;">
					<a id="btnSaveProject" href="#" class="easyui-linkbutton" onclick="updateProject()">保存</a>&nbsp&nbsp
					<a id="btnCancelSaveProject" href="#" class="easyui-linkbutton" onclick="cancelUpdate('project')">取消</a>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="dlgArea" class="easyui-dialog" title="新建区域" style="width:400px;height:280px;padding:10px 20px" closed="true" buttons="#dlgAreaButtons">
	<div class="desctitle">区域信息</div>
	<div class="descitem">
		<label>区域名称:</label><input id="txtNewAreaName"/><br/>
		<label>区域描述:</label><input id="txtNewAreaDesc"/>
	</div>
</div>
<div id="dlgAreaButtons">
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="insertArea()">确定</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgArea').dialog('close')">取消</a>
</div>

<div id="dlgCompany" class="easyui-dialog" title="新建公司" style="width:400px;height:380px;padding:10px 20px" closed="true" buttons="#dlgCompanyButtons">
	<div class="desctitle">公司信息</div>
	<div class="descitem">
		<label>公司名称:</label><input id="txtNewCompanyName"/><br/>
		<label>公司描述:</label><input id="txtNewCompanyDesc"/><br/>
		<label>公司地址:</label><input id="txtNewCompanyAddress"/><br/>
		<label>邮政编码:</label><input id="txtNewZipCode"/><br/>
		<label>公司账号:</label><input id="txtNewCompanyAccount"/><br/>
		<label>公司税号:</label><input id="txtNewTaxNumber"/><br/>
		<label>公司开户行:</label><input id="txtNewBank"/><br/>
		<label>组织机构代码:</label><input id="txtNewOrgCode"/>
	</div>
</div>
<div id="dlgCompanyButtons">
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="insertCompany()">确定</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgCompany').dialog('close')">取消</a>
</div>

<div id="dlgProject" class="easyui-dialog" title="新建项目" style="width:400px;height:580px;padding:10px 20px" closed="true" buttons="#dlgProjectButtons">
	<div class="desctitle">EMC项目信息</div>
	<div class="descitem">
		<label>项目名称:</label><input id="txtNewProjectName"/><br/>
		<label>项目描述:</label><input id="txtNewProjectDesc"/><br/>
		<label>项目地址:</label><input id="txtNewProjectAddress"/><br/>
		<label>建设日期:</label><input class="easyui-datebox" id="txtNewConstructDate"/><br/>
		<label>竣工日期:</label><input class="easyui-datebox" id="txtNewCommissionDate"/><br/>
		<label>项目责任人:</label><input id="txtNewProjectRes"/><br/>
		<label>建设单位:</label><input id="txtNewConstructUnit"/><br/>
		<label>开始日期:</label><input class="easyui-datebox" id="txtNewStartDate"/><br/>
		<label>结束日期:</label><input class="easyui-datebox" id="txtNewEndDate"/><br/>
		<label>项目期数：</label><input id="txtNewTotalCycleNumber"/><br/>
		<label>负责人电子邮件：</label><input id="txtNewResEmail"/><br/>
		<label>负责人电话：</label><input id="txtNewResPhone"/><br/>
		<label>客户项目经理：</label><input id="txtNewCustomerPM"/><br/>
		<label>客户项目经理Email：</label><input id="txtNewCustomerPMEmail"/><br/>
		<label>客户项目经理电话：</label><input id="txtNewCustomerPMPhone"/><br/>
		<label>初始监控画面：</label><input id="txtNewInitPage"/><br/>
	</div>
</div>
<div id="dlgProjectButtons">
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="insertProject()">确定</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgProject').dialog('close')">取消</a>
</div>

</body>
</html>