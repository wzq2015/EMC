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
	<script type="text/javascript" src="./ProjectInfoManagement.js"></script>
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
		<div style="padding:5px">
			<a href="#" class="easyui-linkbutton" onclick="addNode()">增加</a>
			<a href="#" class="easyui-linkbutton" onclick="editNode()">编辑</a>
			<a href="#" class="easyui-linkbutton" onclick="deleteNode()">删除</a>
			<a id="btnAddSubDeviceGroup" href="#" class="easyui-linkbutton" data-options="disabled:true" onclick="addNode('addSubDeviceGroup')">增加子工艺段</a>
		</div>
		<ul id="tree" class="easyui-tree"></ul>
	</div>
	<div data-options="region:'center',split:true" title="详细信息">
		<div id="divProject" style="padding:30px;display:none;">
			<div class="desctitle">EMC项目信息</div>
			<div class="descitem">
				<label>项目名称:</label><input id="txtProjectName" class="project"/><br/>
				<label>项目描述:</label><input id="txtProjectDesc" class="project"/><br/>
				<label>项目地址:</label><input id="txtProjectAddress" class="project"/><br/>
				<label>建设日期:</label><input id="txtConstructDate" class="project"/><br/>
				<label>竣工日期:</label><input id="txtCommissionDate" class="project"/><br/>
				<label>项目责任人:</label><input id="txtProjectRes" class="project"/><br/>
				<label>建设单位:</label><input id="txtConstructUnit" class="project"/><br/>
				<label>开始日期:</label><input id="txtStartDate" class="project"/><br/>
				<label>结束日期:</label><input id="txtEndDate" class="project"/><br/>
				<label>项目期数：</label><input id="txtTotalCycleNumber" class="project"/><br/>
				<label>负责人电子邮件：</label><input id="txtResEmail" class="project"/><br/>
				<label>负责人电话：</label><input id="txtResPhone" class="project"/><br/>
				<label>客户项目经理：</label><input id="txtCustomerPM" class="project"/><br/>
				<label>客户项目经理Email：</label><input id="txtCustomerPMEmail" class="project"/><br/>
				<label>客户项目经理电话：</label><input id="txtCustomerPMPhone" class="project"/><br/>
				<label>初始监控画面：</label><input id="txtInitPage" class="project"/>
			</div>
		</div>
		<div id="divDeviceGroup" style="padding:30px;display:none;">
			<div class="desctitle">工艺段信息</div>
			<div class="descitem">
				<label>工艺段名称:</label><input id="txtDeviceGroupName"/><br/>
				<label>工艺段描述:</label><input id="txtDeviceGroupDesc"/>
				<div style="padding:6px;padding-left:120px;">
					<a id="btnSaveDeviceGroup" href="#" class="easyui-linkbutton" onclick="updateDeviceGroup()">保存</a>&nbsp&nbsp
					<a id="btnCancelSaveDeviceGroup" href="#" class="easyui-linkbutton" onclick="endUpdate('devicegroup')">取消</a>
				</div>
			</div>
		</div>
		<div id="divDevice" style="padding:30px;display:none;">
			<div class="desctitle">设备信息</div>
			<div class="descitem">
				<label>设备名称:</label><input id="txtDeviceName"/><br/>
				<label>设备描述:</label><input id="txtDeviceDesc"/><br/>
				<label>设备位置:</label><input id="txtDevicePosition"/><br/>
				<label>设备制造商:</label><input id="txtDeviceManu"/><br/>
				<label>设备型号:</label><input id="txtDeviceTypeNo"/><br/>
				<label>设备序列号:</label><input id="txtDeviceSerialNo"/><br/>
				<label>购买日期:</label><input class="easyui-datebox" id="txtPurchaseDate"/><br/>
				<label>安装日期:</label><input class="easyui-datebox" id="txtInstallDate"/><br/>
				<label>质保日期:</label><input class="easyui-datebox" id="txtWarrantyDate"/><br/>
				<label>最后检验日期：</label><input class="easyui-datebox" id="txtLastInspectDate"/><br/>
				<label>检验周期（天）：</label><input id="txtInspectCycle"/>
				<div style="padding:6px;padding-left:120px;">
					<a id="btnSaveDevice" href="#" class="easyui-linkbutton" onclick="updateDevice()">保存</a>&nbsp&nbsp
					<a id="btnCancelSaveDevice" href="#" class="easyui-linkbutton" onclick="endUpdate('device')">取消</a>
				</div>
			</div>
		</div>
		<div id="divDevicePara" style="padding:30px;display:none;">
			<div class="desctitle">设备参数信息</div>
			<div class="descitem">
				<label>设备参数名称:</label><input id="txtDeviceParaName"/><br/>
				<label>设备参数描述:</label><input id="txtDeviceParaDesc"/><br/>
				<label>设备参数Tag点:</label><input id="txtDeviceParaTag"/>
				<div style="padding:6px;padding-left:120px;">
					<a id="btnSaveDevicePara" href="#" class="easyui-linkbutton" onclick="updateDevicePara()">保存</a>&nbsp&nbsp
					<a id="btnCancelSaveDevicePara" href="#" class="easyui-linkbutton" onclick="endUpdate('devicepara')">取消</a>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="dlgDeviceGroup" class="easyui-dialog" title="新建工艺段" style="width:400px;height:280px;padding:10px 20px" closed="true" buttons="#dlgDeviceGroupButtons">
	<div class="desctitle">工艺段信息</div>
	<div class="descitem">
		<label>工艺段名称:</label><input id="txtNewDeviceGroupName"/><br/>
		<label>工艺段描述:</label><input id="txtNewDeviceGroupDesc"/>
	</div>
</div>
<div id="dlgDeviceGroupButtons">
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="insertDeviceGroup()">确定</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgDeviceGroup').dialog('close')">取消</a>
</div>

<div id="dlgDevice" class="easyui-dialog" title="新建设备" style="width:400px;height:480px;padding:10px 20px" closed="true" buttons="#dlgDeviceButtons">
	<div class="desctitle">设备信息</div>
	<div class="descitem">
		<label>设备名称:</label><input id="txtNewDeviceName"/><br/>
		<label>设备描述:</label><input id="txtNewDeviceDesc"/><br/>
		<label>设备位置:</label><input id="txtNewDevicePosition"/><br/>
		<label>设备制造商:</label><input id="txtNewDeviceManu"/><br/>
		<label>设备型号:</label><input id="txtNewDeviceTypeNo"/><br/>
		<label>设备序列号:</label><input id="txtNewDeviceSerialNo"/><br/>
		<label>购买日期:</label><input class="easyui-datebox" id="txtNewPurchaseDate"/><br/>
		<label>安装日期:</label><input class="easyui-datebox" id="txtNewInstallDate"/><br/>
		<label>质保日期:</label><input class="easyui-datebox" id="txtNewWarrantyDate"/><br/>
		<label>最后检验日期：</label><input class="easyui-datebox" id="txtNewLastInspectDate"/><br/>
		<label>检验周期（天）：</label><input id="txtNewInspectCycle"/>
	</div>
</div>
<div id="dlgDeviceButtons">
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="insertDevice()">确定</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgDevice').dialog('close')">取消</a>
</div>

<div id="dlgDevicePara" class="easyui-dialog" title="新建设备参数" style="width:400px;height:280px;padding:10px 20px" closed="true" buttons="#dlgDeviceParaButtons">
	<div class="desctitle">设备参数信息</div>
	<div class="descitem">
		<label>设备参数名称:</label><input id="txtNewDeviceParaName"/><br/>
		<label>设备参数描述:</label><input id="txtNewDeviceParaDesc"/><br/>
		<label>设备参数Tag点:</label><input id="txtNewDeviceParaTag"/>
	</div>
</div>
<div id="dlgDeviceParaButtons">
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="insertDevicePara()">确定</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#dlgDevicePara').dialog('close')">取消</a>
</div>
</body>
</html>