var projectNode = undefined;
var deviceGroupNodes = [];
var deviceNodes = [];
var deviceParaNodes = [];

$(function() {
	projectNode = {text: currentProjectName, attributes: {type: 'project', logicid: currentProjectId}, children:[], iconCls:'icon-add'};
	$('#f_eventLogBelongId').val(currentProjectId);
    var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMDeviceGroup", "queryDeviceGroupsByProjectId", info, queryDeviceGroupsCallback);
});

queryDeviceGroupsCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取设备组信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for(var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					text: row[metas.f_devicegroupName.pos],
	    					attributes: {type: 'devicegroup', logicid: row[metas.f_devicegroupId.pos], parentDeviceGroupId: row[metas.f_parentDevicegroupId.pos]},
	    					children: [],
	    					iconCls:'icon-add',
	    			   };
	    	deviceGroupNodes.push(node);
	    	
    		if (node.attributes.parentDeviceGroupId == -1) {
    			projectNode.children.push(node);
    		}
	    }
	    
	    for (var i=0; i<deviceGroupNodes.length; i++) {
	    	if (deviceGroupNodes[i].attributes.parentDeviceGroupId == -1) {
	    		continue;
	    	}
	    	for (var j=0; j<deviceGroupNodes.length; j++) {
	    		if (deviceGroupNodes[i].attributes.parentDeviceGroupId == deviceGroupNodes[j].attributes.logicid) {
	    			deviceGroupNodes[j].children.push(deviceGroupNodes[i]);
	    		}
	    	}
	    }
	    var info = new EiInfo();
	    info.set("f_emcprojectId", currentProjectId);
	    EiCommunicator.send("CMIMDevice", "queryDevicesByProjectId", info, queryDevicesCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取设备组信息失败');
	}
}

queryDevicesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取设备信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					text: row[metas.f_deviceName.pos],
	    					attributes: {type: 'device', logicid: row[metas.f_deviceId.pos], parentId: row[metas.f_devicegroupId.pos]},
	    					children: [],
	    					iconCls:'icon-add',
	    			   };
	    	deviceNodes.push(node);
			for (var j=0; j<deviceGroupNodes.length; j++) {
	    		if (deviceGroupNodes[j].attributes.logicid == node.attributes.parentId) {
	    			deviceGroupNodes[j].children.push(node);
	    		}
	    	}
	    }
//	    var info = new EiInfo();
//	    info.set("f_emcprojectId", currentProjectId);
//	    EiCommunicator.send("CMIMDevicePara", "queryDeviceParasByProjectId", info, queryDeviceParasCallback);

		$('#tree').tree('loadData', [projectNode]);
		$('#tree').tree({onClick: onTreeClick});
		
		
		var info = new EiInfo();
		info.set("f_eventLogBelongId", currentProjectId);
		info.set("f_eventLogType", 1);
		$('#f_eventLogType').val("1");
		EiCommunicator.send("CMIMEventLogManagement", "queryEventLogs", info, queryEventLogsCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取设备信息失败');
	}
}

queryDeviceParasCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取设备参数信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					text: row[metas.f_deviceparaName.pos],
	    					attributes: {type: 'devicepara', logicid: row[metas.f_deviceparaId.pos], parentId: row[metas.f_deviceId.pos]}
	    			   };
	    	deviceParaNodes.push(node);
			for (var j=0; j<deviceNodes.length; j++) {
	    		if (deviceNodes[j].attributes.logicid == node.attributes.parentId) {
	    			deviceNodes[j].children.push(node);
	    		}
	    	}
	    }

	    $('#tree').tree('loadData', [projectNode]);
		$('#tree').tree({onClick: onTreeClick});
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取设备参数信息失败');
	}
}

function onTreeClick(node) {
//	showDiv(node.attributes.type);
//	$('#btnAddSubDeviceGroup').linkbutton('disable');
	
	var info = new EiInfo();
	info.set("f_eventLogBelongId", node.attributes.logicid);
	$('#f_eventLogBelongId').val(node.attributes.logicid);
	if (node.attributes.type == 'project') {
		info.set("f_eventLogType", 1);
		$('#f_eventLogType').val("1");
	}else if (node.attributes.type == 'devicegroup') {
		info.set("f_eventLogType", 2);
		$('#f_eventLogType').val("2");
//		$('#btnAddSubDeviceGroup').linkbutton('enable');
	}else if (node.attributes.type == 'device') {
		info.set("f_eventLogType", 3);
		$('#f_eventLogType').val("3");
	}
//	else if (node.attributes.type == 'devicepara') {
//		info.set("f_deviceparaId", node.attributes.logicid);
//		EiCommunicator.send("CMIMDevicePara", "queryDeviceParaById", info, queryDeviceParaCallback);
//	}

	EiCommunicator.send("CMIMEventLogManagement", "queryEventLogs", info, queryEventLogsCallback);
}

queryEventLogsCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取事件信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		if (resultBlock.rows.length > 0) {
			var rows = [];
			var typeName="";
			var remindSwitchName="";
	    	for (var i=0; i<resultBlock.rows.length; i++) {
	    		var row = resultBlock.rows[i];
	    		if(row[metas.f_eventLogType.pos]==1){
	    			typeName = "项目";
	    		}else if(row[metas.f_eventLogType.pos]==2){
	    			typeName = "工艺段";
	    		}else if(row[metas.f_eventLogType.pos]==3){
	    			typeName = "设备";
	    		}
	    		if(row[metas.f_eventLogRemindSwitch.pos]==0){
	    			remindSwitchName = "开";
	    		}else if(row[metas.f_eventLogRemindSwitch.pos]==1){
	    			remindSwitchName = "关";
	    		}else{
	    			remindSwitchName = " ";
	    		}
	        	rows.push({
	        		f_eventLogId: row[metas.f_eventLogId.pos],
	            	f_eventLogName: row[metas.f_eventLogName.pos],
	           	 	f_eventLogDesc: row[metas.f_eventLogDesc.pos],
	            	f_eventLogRemindDate: row[metas.f_eventLogRemindDate.pos],
	            	f_eventLogType: typeName,
	            	f_eventLogRemindSwitch: remindSwitchName,
	            	f_eventLogBelongId: row[metas.f_eventLogBelongId.pos]
	        	});
	    	}
			$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
		}else{
			$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', []);
		}
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取事件信息失败');
	}
}

queryDeviceGroupCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取设备组信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    if (resultBlock.rows.length != 1) {
	    	$.messager.alert('错误','获取设备组信息失败');
			return;
		}
		var row = resultBlock.rows[0];
		$('#txtDeviceGroupName').val(row[metas.f_devicegroupName.pos]);
		$('#txtDeviceGroupDesc').val(row[metas.f_devicegroupDesc.pos]);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取设备组信息失败');
	}
}

queryDeviceCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取设备信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    if (resultBlock.rows.length != 1) {
	    	$.messager.alert('错误','获取设备信息失败');
			return;
		}
		var row = resultBlock.rows[0];
		$('#txtDeviceName').val(row[metas.f_deviceName.pos]);
		$('#txtDeviceDesc').val(row[metas.f_deviceDesc.pos]);
		$('#txtDevicePosition').val(row[metas.f_devicePosition.pos]);
		$('#txtDeviceManu').val(row[metas.f_deviceManufacture.pos]);
		$('#txtDeviceTypeNo').val(row[metas.f_deviceTypenumber.pos]);
		$('#txtDeviceSerialNo').val(row[metas.f_deviceSerialnumber.pos]);
		$('#txtPurchaseDate').datebox('setValue', row[metas.f_devicePurchasedate.pos]);
		$('#txtInstallDate').datebox('setValue', row[metas.f_deviceInstalldate.pos]);
		$('#txtWarrantyDate').datebox('setValue', row[metas.f_deviceWarrantydate.pos]);
		$('#txtLastInspectDate').datebox('setValue', row[metas.f_deviceLastinspectdate.pos]);
		$('#txtInspectCycle').val(row[metas.f_deviceInspectcycle.pos]);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取设备信息失败');
	}
}

queryDeviceParaCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取设备参数信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    if (resultBlock.rows.length != 1) {
	    	$.messager.alert('错误','获取设备参数信息失败');
			return;
		}
		var row = resultBlock.rows[0];
		$('#txtDeviceParaName').val(row[metas.f_deviceparaName.pos]);
		$('#txtDeviceParaDesc').val(row[metas.f_deviceparaDesc.pos]);
		$('#txtDeviceParaTag').val(row[metas.f_deviceparaTagname.pos]);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取设备信息失败');
	}
}

function showDiv(divName) {
	if (divName == "project") {
		$('#divProject')[0].style.display = '';
		$('#divDeviceGroup')[0].style.display = 'none';
		$('#divDevice')[0].style.display = 'none';
		$('#divDevicePara')[0].style.display = 'none';
		$('#divProject input').attr("disabled", true);
	}
	else if (divName == "devicegroup") {
		$('#divProject')[0].style.display = 'none';
		$('#divDeviceGroup')[0].style.display = '';
		$('#divDevice')[0].style.display = 'none';
		$('#divDevicePara')[0].style.display = 'none';
		$('#divDeviceGroup input').attr("disabled", true);
		$('#btnSaveDeviceGroup').linkbutton('disable');
    	$('#btnCancelSaveDeviceGroup').linkbutton('disable');
	}
	else if (divName == "device") {
		$('#divProject')[0].style.display = 'none';
		$('#divDeviceGroup')[0].style.display = 'none';
		$('#divDevice')[0].style.display = '';
		$('#divDevicePara')[0].style.display = 'none';
		$('#divDevice input').attr("disabled", true);
		$('#btnSaveDevice').linkbutton('disable');
    	$('#btnCancelSaveDevice').linkbutton('disable');
	}
	else if (divName == "devicepara") {
		$('#divProject')[0].style.display = 'none';
		$('#divDeviceGroup')[0].style.display = 'none';
		$('#divDevice')[0].style.display = 'none';
		$('#divDevicePara')[0].style.display = '';
		$('#divDevicePara input').attr("disabled", true);
		$('#btnSaveDevicePara').linkbutton('disable');
    	$('#btnCancelSaveDevicePara').linkbutton('disable');
	}
}

function addNode(addType) {
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		$.messager.alert('提示','请选择一个节点');
		return;
	}
	if (node.attributes.type == 'project') {
		$('#dlgDeviceGroup').dialog('open');
		$('#dlgDeviceGroup input').val("");
	}
	else if (node.attributes.type == 'devicegroup') {
		if (addType == "addSubDeviceGroup") {
			$('#dlgDeviceGroup').dialog('open');
			$('#dlgDeviceGroup input').val("");
		}
		else {
			$('#dlgDevice').dialog('open');
			$('#dlgDevice input').val("");
			$('#txtNewPurchaseDate').datebox('clear');
			$('#txtNewInstallDate').datebox('clear');
			$('#txtNewWarrantyDate').datebox('clear');
			$('#txtNewLastInspectDate').datebox('clear');
		}
	}
	else if (node.attributes.type == 'device') {
		$('#dlgDevicePara').dialog('open');
		$('#dlgDevicePara input').val("");
	}
	else if (node.attributes.type == 'devicepara') {
		$.messager.alert('提示','选中节点为设备参数节点，无法增加子节点');
	}
}

function insertDeviceGroup() {
	var deviceGroupName = $('#txtNewDeviceGroupName').val();
	if (deviceGroupName == "") {
		$.messager.alert('警告','工艺段名称不能为空');
		return;
	}
	for (var i=0; i<deviceGroupNodes.length; i++) {
		if (deviceGroupName == deviceGroupNodes[i].text) {
			$.messager.alert('警告','工艺段名称不能重复');
			return;
		}
	}
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	info.set("f_devicegroupName", $('#txtNewDeviceGroupName').val());
	info.set("f_devicegroupDesc", $('#txtNewDeviceGroupDesc').val());
	
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		return;
	}
	if (node.attributes.type == 'project') {
		info.set("f_parentDevicegroupId", "-1");
	}
	else if (node.attributes.type == 'devicegroup') {
		info.set("f_parentDevicegroupId", node.attributes.logicid);
	}
	
	EiCommunicator.send("CMIMDeviceGroup", "insertDeviceGroup", info, insertCallback);
}

function insertDevice() {
	var deviceName = $('#txtNewDeviceName').val();
	if (deviceName == "") {
		$.messager.alert('警告','设备名称不能为空');
		return;
	}
	for (var i=0; i<deviceNodes.length; i++) {
		if (deviceName == deviceNodes[i].text) {
			$.messager.alert('警告','设备名称不能重复');
			return;
		}
	}
	
	var inspectCycle = $('#txtNewInspectCycle').val();
	var r = new RegExp("^[0-9]*[1-9][0-9]*$");
	if (!r.test(inspectCycle)) {
		$.messager.alert('警告','检验周期必须录入正整数');
		return;
	}
	
	var info = new EiInfo();
	info.set("f_deviceName", $('#txtNewDeviceName').val());
	info.set("f_deviceDesc", $('#txtNewDeviceDesc').val());
	info.set("f_devicePosition", $('#txtNewDevicePosition').val());
	info.set("f_deviceManufacture", $('#txtNewDeviceManu').val());
	info.set("f_deviceTypenumber", $('#txtNewDeviceTypeNo').val());
	info.set("f_deviceSerialnumber", $('#txtNewDeviceSerialNo').val());
	info.set("f_devicePurchasedate", $('#txtNewPurchaseDate').datebox('getValue'));
	info.set("f_deviceInstalldate", $('#txtNewInstallDate').datebox('getValue'));
	info.set("f_deviceWarrantydate", $('#txtNewWarrantyDate').datebox('getValue'));
	info.set("f_deviceLastinspectdate", $('#txtNewLastInspectDate').datebox('getValue'));
	info.set("f_deviceInspectcycle", $('#txtNewInspectCycle').val());
	
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		return;
	}
	info.set("f_devicegroupId", node.attributes.logicid);
	
	EiCommunicator.send("CMIMDevice", "insertDevice", info, insertCallback);
}

function insertDevicePara() {
	var deviceParaName = $('#txtNewDeviceParaName').val();
	if (deviceParaName == "") {
		$.messager.alert('警告','设备参数名称不能为空');
		return;
	}
	for (var i=0; i<deviceParaNodes.length; i++) {
		if (deviceParaName == deviceParaNodes[i].text) {
			$.messager.alert('警告','设备参数名称不能重复');
			return;
		}
	}
	var info = new EiInfo();
	info.set("f_deviceparaName", $('#txtNewDeviceParaName').val());
	info.set("f_deviceparaDesc", $('#txtNewDeviceParaDesc').val());
	info.set("f_deviceparaTagname", $('#txtNewDeviceParaTag').val());
	
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		return;
	}
	info.set("f_deviceId", node.attributes.logicid);
	
	EiCommunicator.send("CMIMDevicePara", "insertDevicePara", info, insertCallback);
}

insertCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','增加节点失败');
			return;
		}
		var node = $('#tree').tree('getSelected');
		var type = eiInfo.get("addType");
		var newid = eiInfo.get("newId");
		var name = eiInfo.get("name");
		var newNode = {text: name, attributes: {type: type, logicid: newid}, children:[], iconCls:'icon-add'};
		if (type == "devicegroup") {
			$('#dlgDeviceGroup').dialog('close');
		}
		else if (type == "device") {
			$('#dlgDevice').dialog('close');
		}
		else if (type == "devicepara") {
			newNode.iconCls = '';
			$('#dlgDevicePara').dialog('close');
		}

		$('#tree').tree('append', {parent: node.target, data: [newNode]});
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','增加节点失败');
	}
}

function editNode() {
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		$.messager.alert('提示','请首先选中编辑节点');
		return;
	}

	if (node.attributes.type == 'project') {
		$.messager.alert('提示','项目节点无法编辑');
		return;
	}
	else if (node.attributes.type == 'devicegroup') {
		$('#divDeviceGroup input').attr("disabled", false);
    	$('#btnSaveDeviceGroup').linkbutton('enable');
    	$('#btnCancelSaveDeviceGroup').linkbutton('enable');
	}
	else if (node.attributes.type == 'device') {
		$('#divDevice input').attr("disabled", false);
    	$('#btnSaveDevice').linkbutton('enable');
    	$('#btnCancelSaveDevice').linkbutton('enable');
	}
	else if (node.attributes.type == 'devicepara') {
    	$('#divDevicePara input').attr("disabled", false);
		$('#btnSaveDevicePara').linkbutton('enable');
    	$('#btnCancelSaveDevicePara').linkbutton('enable');
	}
}

function updateDeviceGroup() {
	var node = $('#tree').tree('getSelected');
	var deviceGroupName = $('#txtDeviceGroupName').val();
	if (deviceGroupName == "") {
		$.messager.alert('警告','工艺段名称不能为空');
		return;
	}
	for (var i=0; i<deviceGroupNodes.length; i++) {
		if (deviceGroupNodes[i].attributes.logicid == node.attributes.logicid) {
			continue;
		}
		if (deviceGroupName == deviceGroupNodes[i].text) {
			$.messager.alert('警告','工艺段名称不能重复');
			return;
		}
	}
	
	var info = new EiInfo();
	info.set("f_devicegroupId", node.attributes.logicid);
	info.set("f_devicegroupName", $('#txtDeviceGroupName').val());
	info.set("f_devicegroupDesc", $('#txtDeviceGroupDesc').val());
	
	EiCommunicator.send("CMIMDeviceGroup", "updateDeviceGroup", info, updateCallback);
}

function updateDevice() {
	var node = $('#tree').tree('getSelected');
	var deviceName = $('#txtDeviceName').val();
	if (deviceName == "") {
		$.messager.alert('警告','设备名称不能为空');
		return;
	}
	for (var i=0; i<deviceNodes.length; i++) {
		if (deviceNodes[i].attributes.logicid == node.attributes.logicid) {
			continue;
		}
		if (deviceName == deviceNodes[i].text) {
			$.messager.alert('警告','设备名称不能重复');
			return;
		}
	}
	
	var inspectCycle = $('#txtInspectCycle').val();
	var r = new RegExp("^[0-9]*[1-9][0-9]*$");
	if (!r.test(inspectCycle)) {
		$.messager.alert('警告','检验周期必须录入正整数');
		return;
	}
	
	var info = new EiInfo();
	
	info.set("f_deviceId", node.attributes.logicid);
	info.set("f_deviceName", $('#txtDeviceName').val());
	info.set("f_deviceDesc", $('#txtDeviceDesc').val());
	info.set("f_devicePosition", $('#txtDevicePosition').val());
	info.set("f_deviceManufacture", $('#txtDeviceManu').val());
	info.set("f_deviceTypenumber", $('#txtDeviceTypeNo').val());
	info.set("f_deviceSerialnumber", $('#txtDeviceSerialNo').val());
	info.set("f_devicePurchasedate", $('#txtPurchaseDate').datebox('getValue'));
	info.set("f_deviceInstalldate", $('#txtInstallDate').datebox('getValue'));
	info.set("f_deviceWarrantydate", $('#txtWarrantyDate').datebox('getValue'));
	info.set("f_deviceLastinspectdate", $('#txtLastInspectDate').datebox('getValue'));
	info.set("f_deviceInspectcycle", $('#txtInspectCycle').val());
	
	EiCommunicator.send("CMIMDevice", "updateDevice", info, updateCallback);
}

function updateDevicePara() {
	var node = $('#tree').tree('getSelected');
	var deviceParaName = $('#txtDeviceParaName').val();
	if (deviceParaName == "") {
		$.messager.alert('警告','设备参数名称不能为空');
		return;
	}
	for (var i=0; i<deviceParaNodes.length; i++) {
		if (deviceParaNodes[i].attributes.logicid == node.attributes.logicid) {
			continue;
		}
		if (deviceParaName == deviceParaNodes[i].text) {
			$.messager.alert('警告','设备参数名称不能重复');
			return;
		}
	}
	
	var info = new EiInfo();
	info.set("f_deviceparaId", node.attributes.logicid);
	info.set("f_deviceparaName", $('#txtDeviceParaName').val());
	info.set("f_deviceparaDesc", $('#txtDeviceParaDesc').val());
	info.set("f_deviceparaTagname", $('#txtDeviceParaTag').val());
	
	EiCommunicator.send("CMIMDevicePara", "updateDevicePara", info, updateCallback);
}

updateCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','修改节点失败');
			return;
		}
		var node = $('#tree').tree('getSelected');
		endUpdate(node.attributes.type);
		if (node.attributes.type == 'devicegroup') {
			$('#tree').tree('update', {target: node.target, text: $('#txtDeviceGroupName').val()});
		}
		else if (node.attributes.type == 'device') {
			$('#tree').tree('update', {target: node.target, text: $('#txtDeviceName').val()});
		}
		else if (node.attributes.type == 'devicepara') {
			$('#tree').tree('update', {target: node.target, text: $('#txtDeviceParaName').val()});
		}
	},
    onFail : function(eMsg){
		$.messager.alert('错误','修改节点失败');
	}
}

function endUpdate(type) {
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		return;
	}
	onTreeClick(node);
}

function deleteNode() {
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		$.messager.alert('提示','请首先选中删除节点');
		return;
	}
	
	var info = new EiInfo();
	if (node.attributes.type == 'project') {
		$.messager.alert('提示', '项目节点无法删除');
	}
	else if (node.attributes.type == 'devicegroup') {
		$.messager.confirm('确认', '是否确认删除工艺段节点？', 
			function(r) {
				if (r) {
					info.set("f_devicegroupId", node.attributes.logicid);
					EiCommunicator.send("CMIMDeviceGroup", "deleteDeviceGroup", info, deleteCallback);
				}
			}
		);
	}
	else if (node.attributes.type == 'device') {
		$.messager.confirm('确认', '是否确认删除设备节点？', 
			function(r) {
				if (r) {
					info.set("f_deviceId", node.attributes.logicid);
					EiCommunicator.send("CMIMDevice", "deleteDevice", info, deleteCallback);
				}
			}
		);
	}
	else if (node.attributes.type == 'devicepara') {
		$.messager.confirm('确认', '是否确认删除设备参数节点？', 
			function(r) {
				if (r) {
					info.set("f_deviceparaId", node.attributes.logicid);
					EiCommunicator.send("CMIMDevicePara", "deleteDevicePara", info, deleteCallback);
				}
			}
		);
	}
}

deleteCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','删除节点失败');
			return;
		}
		var node = $('#tree').tree('getSelected');
		$('#tree').tree('remove', node.target);
		onTreeClick(projectNode);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','删除节点失败');
	}
}