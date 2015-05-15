var areaNodes = [];
var companyNodes = [];
var projectNodes = [];
var rootNode = undefined;

$(function() {
    var info = new EiInfo();
	EiCommunicator.send("CMIMArea", "queryAreas", info, queryAreasCallback);
});

queryAreasCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取区域信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					id: row[metas.f_areaId.pos],
	    					text: row[metas.f_areaName.pos],
	    					attributes: {type:'area', logicid:row[metas.f_areaId.pos]},
	    					children:[],
	    					iconCls:'icon-add'
	    			   };
	        areaNodes.push(node);
	    }
	    var info = new EiInfo();
	    EiCommunicator.send("CMIMCompany", "queryCompanies", info, queryCompaniesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取区域信息失败');
	}
}

queryCompaniesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取公司信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for(var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					id: row[metas.f_companyId.pos],
	    					text: row[metas.f_companyName.pos],
	    					attributes: {type: 'company', logicid: row[metas.f_companyId.pos], parentId:row[metas.f_areaId.pos], parentCompanyId: row[metas.f_parentCompanyId.pos]},
	    					children: [],
	    					iconCls:'icon-add',
	    			   };
	    	companyNodes.push(node);
	    	
	    	for (var j=0; j<areaNodes.length; j++) {
	    		if ((areaNodes[j].attributes.logicid == node.attributes.parentId) && (node.attributes.parentCompanyId == -1)) {
	    			areaNodes[j].children.push(node);
	    		}
	    	}
	    }
	    
	    for (var i=0; i<companyNodes.length; i++) {
	    	if (companyNodes[i].attributes.parentCompanyId == -1) {
	    		continue;
	    	}
	    	for (var j=0; j<companyNodes.length; j++) {
	    		if (companyNodes[i].attributes.parentCompanyId == companyNodes[j].attributes.logicid) {
	    			companyNodes[j].children.push(companyNodes[i]);
	    		}
	    	}
	    }
	    var info = new EiInfo();
	    EiCommunicator.send("CMIMEmcproject", "queryEmcprojects", info, queryProjectsCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取公司信息失败');
	}
}

queryProjectsCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for(var i=0; i<resultBlock.rows.length; i++) {
	    	var row = eiInfo.blocks.result.rows[i];
	    	var node = {
	    					id: row[metas.f_emcprojectId.pos],
	    					text: row[metas.f_emcprojectName.pos],
	    					attributes: {type: 'emcproject', logicid: row[metas.f_emcprojectId.pos], parentId: row[metas.f_companyId.pos]},
	    			   };
	    	
	    	projectNodes.push(node);
	    	for (var j=0; j<companyNodes.length; j++) {
	    		if (companyNodes[j].attributes.logicid == node.attributes.parentId) {
	    			companyNodes[j].children.push(node);
	    		}
	    	}
	    }
	    
	    rootNode = {id:0, text:"根节点", attributes: {type: 'root'}, children:areaNodes, iconCls:'icon-add'};
		$('#tree').tree('loadData', [rootNode]);
		$('#tree').tree({onClick: onTreeClick});
		$('#tree').tree({onBeforeDrag: 
			function (node) {
				if (node.attributes.type != 'emcproject') {
					return false;
				}
			}
		});
		
		$('#tree').tree({onDragEnter: 
			function (target,source) {
				if ($('#tree').tree('getNode', target).attributes.type !=  'company') {
					return false;
				}
			}
		});
		
		$('#tree').tree({onBeforeDrop: 
			function (target,source,point) {
				if ((point == 'top') || (point == "bottom")) {
					$.messager.alert('错误','项目节点只能拖放到公司节点下方');
					return false;
				}
			}
		});
		
		$('#tree').tree({onDrop: 
			function (target,source,point) {
				var companyId = $('#tree').tree('getNode', target).id;
				var info = new EiInfo();
				info.set("f_emcprojectId", source.id);
				info.set("f_companyId", companyId);
	    		EiCommunicator.send("CMIMEmcproject", "updateProjectParentId", info, updateProjectParentIdCallback);
			}
		});
		showDiv("root");
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

updateProjectParentIdCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','修改项目父节点失败');
			RefreshMainTree();
			return;
		}
	},
    onFail : function(eMsg){
		$.messager.alert('错误','修改项目父节点失败');
	}
	
}

function onTreeClick(node) {
	showDiv(node.attributes.type);
	$('#btnAddSubCompanyNode').linkbutton('disable');
	$('#pType').val("");
//	jQuery("#txtNewProjectType").empty();
	jQuery("#txtProjectType").empty();
	
	var info = new EiInfo();
	if (node.attributes.type == 'area') {
		info.set("f_areaId", node.attributes.logicid);
		EiCommunicator.send("CMIMArea", "queryAreaById", info, queryAreaCallback);
	}
	else if (node.attributes.type == 'company') {
		info.set("f_companyId", node.attributes.logicid);
		$('#btnAddSubCompanyNode').linkbutton('enable');
		EiCommunicator.send("CMIMCompany", "queryCompanyById", info, queryCompanyCallback);
	}
	else if (node.attributes.type == 'emcproject') {
		info.set("f_emcprojectId", node.attributes.logicid);
		EiCommunicator.send("CMIMEmcproject", "queryEmcprojectById", info, queryEmcprojectCallback);
	}
}

queryAreaCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取区域信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		if (resultBlock.rows.length != 1) {
			$.messager.alert('错误','获取区域信息失败');
			return;
		}
    	var row = resultBlock.rows[0];
    	$('#txtAreaName').val(row[metas.f_areaName.pos]);
    	$('#txtAreaDesc').val(row[metas.f_areaDesc.pos]);
    	$('#divArea input').attr("disabled", true);
    	$('#btnSaveArea').linkbutton('disable');
    	$('#btnCancelSaveArea').linkbutton('disable');
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取区域信息失败');
	}
}

queryCompanyCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取公司信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    if (resultBlock.rows.length != 1) {
	    	$.messager.alert('错误','获取公司信息失败');
			return;
		}
		var row = resultBlock.rows[0];
		$('#txtCompanyName').val(row[metas.f_companyName.pos]);
		$('#txtCompanyDesc').val(row[metas.f_companyDesc.pos]);
		$('#txtCompanyAddress').val(row[metas.f_companyAddress.pos]);
		$('#txtZipCode').val(row[metas.f_companyZipcode.pos]);
		$('#txtCompanyAccount').val(row[metas.f_companyAccount.pos]);
		$('#txtTaxNumber').val(row[metas.f_companyTaxnumber.pos]);
		$('#txtBank').val(row[metas.f_companyBank.pos]);
		$('#txtOrgCode').val(row[metas.f_companyOrgcode.pos]);
		$('#divCompany input').attr("disabled", true);
		$('#btnSaveCompany').linkbutton('disable');
    	$('#btnCancelSaveCompany').linkbutton('disable');
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取公司信息失败');
	}
}

queryEmcprojectCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    if (resultBlock.rows.length != 1) {
	    	$.messager.alert('错误','获取项目信息失败');
			return;
		}
		var row = resultBlock.rows[0];
		$('#txtProjectName').val(row[metas.f_emcprojectName.pos]);
		$('#txtProjectDesc').val(row[metas.f_emcprojectDesc.pos]);
		$('#txtProjectAddress').val(row[metas.f_emcprojectAddress.pos]);
		$('#txtConstructDate').datebox('setValue', row[metas.f_emcprojectConstructdate.pos]);
		$('#txtCommissionDate').datebox('setValue', row[metas.f_emcprojectCommissioningdate.pos]);
		$('#txtProjectRes').val(row[metas.f_emcprojectResponsible.pos]);
		$('#txtConstructUnit').val(row[metas.f_emcprojectConstructunit.pos]);
		$('#txtStartDate').datebox('setValue', row[metas.f_emcprojectStartdate.pos]);
		$('#txtEndDate').datebox('setValue', row[metas.f_emcprojectEnddate.pos]);
		$('#txtTotalCycleNumber').val(row[metas.f_emcprojectTotalcyclenumber.pos]);
		$('#txtResEmail').val(row[metas.f_emcprojectResEmail.pos]);
		$('#txtResPhone').val(row[metas.f_emcprojectResPhonenumber.pos]);
		$('#txtCustomerPM').val(row[metas.f_emcprojectCustomerpm.pos]);
		$('#txtCustomerPMEmail').val(row[metas.f_emcprojectCustomerpmEmail.pos]);
		$('#txtCustomerPMPhone').val(row[metas.f_emcprojectCustomerpmPhonenumber.pos]);
		$('#txtInitPage').val(row[metas.f_emcprojectInitpage.pos]);
		$('#pType').val(row[metas.f_emcprojectType.pos]);
		
		$('#divEmcproject input').attr("disabled", true);
		$('#divEmcproject select').attr("disabled", true);
		$('#btnSaveProject').linkbutton('disable');
    	$('#btnCancelSaveProject').linkbutton('disable');
    	
    	var info = new EiInfo();
		EiCommunicator.send("CMIMEmcproject", "queryProjectTypes", info, projectTypesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取项目信息失败');
	}
}

function addNode(addType) {
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		$.messager.alert('提示','请选择一个节点');
		return;
	}
	if (node.attributes.type == 'root') {
		$('#dlgArea').dialog('open');
		$('#dlgArea input').val("");
	}else if (node.attributes.type == 'area') {
		$('#dlgCompany').dialog('open');
		$('#dlgCompany input').val("");
	}else if (node.attributes.type == 'company') {
		if (addType == "addSubCompanyNode") {
			$('#dlgCompany').dialog('open');
			$('#dlgCompany input').val("");
		}else {
			$('#dlgProject').dialog('open');
			$('#dlgProject input').val("");
			$('#txtNewConstructDate').datebox('clear');
			$('#txtNewCommissionDate').datebox('clear');
			$('#txtNewStartDate').datebox('clear');
			$('#txtNewEndDate').datebox('clear');
			jQuery("#txtNewProjectType").empty();
			var info = new EiInfo();
			EiCommunicator.send("CMIMEmcproject", "queryProjectTypes", info, projectTypesCallback);
		}
	}else if (node.attributes.type == 'emcproject') {
		$.messager.alert('提示','选中节点为项目节点，无法增加子节点');
	}
}

projectTypesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','项目类型异常，请检查项目类型！');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var pType = $('#pType').val();
		if(pType == null || pType == ""){
			$("#txtNewProjectType").prepend("<option value='-1'>---请选择---</option>");
			if(resultBlock.rows.length > 0){
				for(var i=0; i<resultBlock.rows.length; i++){
					var row = resultBlock.rows[i];
					jQuery("#txtNewProjectType").append("<option value='"+row[metas.f_projectTypeId.pos]+"'>"+row[metas.f_projectTypeName.pos]+"</option>"); 
				}
			}
		}else{
			$("#txtProjectType").prepend("<option value='-1'>---请选择---</option>");
			if(resultBlock.rows.length > 0){
				for(var i=0; i<resultBlock.rows.length; i++){
					var row = resultBlock.rows[i];
					jQuery("#txtProjectType").append("<option value='"+row[metas.f_projectTypeId.pos]+"'>"+row[metas.f_projectTypeName.pos]+"</option>");
				}
				jQuery("#txtProjectType").val(pType);
			}
		}
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','项目类型异常，请检查项目类型！');
	}
}

function showDiv(divName) {
	if (divName == "root") {
		$('#divArea')[0].style.display = 'none';
		$('#divCompany')[0].style.display = 'none';
		$('#divEmcproject')[0].style.display = 'none';
	}
	else if (divName == "area") {
		$('#divArea')[0].style.display = 'block';
		$('#divCompany')[0].style.display = 'none';
		$('#divEmcproject')[0].style.display = 'none';
	}
	else if (divName == "company") {
		$('#divArea')[0].style.display = 'none';
		$('#divCompany')[0].style.display = 'block';
		$('#divEmcproject')[0].style.display = 'none';
	}
	else if (divName == "emcproject") {
		$('#divArea')[0].style.display = 'none';
		$('#divCompany')[0].style.display = 'none';
		$('#divEmcproject')[0].style.display = 'block';
	}
}

function insertArea() {
	var areaname = $('#txtNewAreaName').val();
	if (areaname == "") {
		$.messager.alert('警告','区域名称不能为空');
		return;
	}
	for (var i=0; i<areaNodes.length; i++) {
		if (areaname == areaNodes[i].text) {
			$.messager.alert('警告','区域名称不能重复');
			return;
		}
	}
	var info = new EiInfo();
	info.set("f_areaName", $('#txtNewAreaName').val());
	info.set("f_areaDesc", $('#txtNewAreaDesc').val());
	EiCommunicator.send("CMIMArea", "insertArea", info, insertCallback);
}

function insertCompany() {
	var companyName = $('#txtNewCompanyName').val();
	if (companyName == "") {
		$.messager.alert('警告','公司名称不能为空');
		return;
	}
	for (var i=0; i<companyNodes.length; i++) {
		if (companyName == companyNodes[i].text) {
			$.messager.alert('警告','公司名称不能重复');
			return;
		}
	}
	var info = new EiInfo();
	info.set("f_companyName", $('#txtNewCompanyName').val());
	info.set("f_companyDesc", $('#txtNewCompanyDesc').val());
	info.set("f_companyAddress", $('#txtNewCompanyAddress').val());
	info.set("f_companyAccount", $('#txtNewCompanyAccount').val());
	info.set("f_companyTaxnumber", $('#txtNewTaxNumber').val());
	info.set("f_companyBank", $('#txtNewBank').val());
	info.set("f_companyOrgcode", $('#txtNewOrgCode').val());
	info.set("f_companyZipcode", $('#txtNewZipCode').val());
	
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		return;
	}
	if (node.attributes.type == 'area') {
		info.set("f_areaId", node.attributes.logicid);
		info.set("f_parentCompanyId", "-1");
	}
	else if (node.attributes.type == 'company') {
		info.set("f_areaId", node.attributes.parentId);
		info.set("f_parentCompanyId", node.attributes.logicid);
	}
	
	EiCommunicator.send("CMIMCompany", "insertCompany", info, insertCallback);
}

function insertProject() {
	var projectName = $('#txtNewProjectName').val();
	var projectType = $('#txtNewProjectType').val();
	if (projectName == "") {
		$.messager.alert('警告','项目名称不能为空');
		return;
	}
	for (var i=0; i<projectNodes.length; i++) {
		if (projectName == projectNodes[i].text) {
			$.messager.alert('警告','项目名称不能重复');
			return;
		}
	}
	var totalCycleNumber = $('#txtNewTotalCycleNumber').val();
	var r = new RegExp("^[0-9]*[1-9][0-9]*$");
	if (!r.test(totalCycleNumber)) {
		$.messager.alert('警告','项目结算周期必须录入正整数');
		return;
	}
	
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		return;
	}
	
	if(projectType == -1){
		$.messager.alert('警告','请选择项目类型！');
		return;
	}
	
	var info = new EiInfo();
	
	info.set("f_companyId", node.attributes.logicid);
	info.set("f_emcprojectName", $('#txtNewProjectName').val());
	info.set("f_emcprojectDesc", $('#txtNewProjectDesc').val());
	info.set("f_emcprojectAddress", $('#txtNewProjectAddress').val());
	info.set("f_emcprojectConstructdate", $('#txtNewConstructDate').datebox('getValue'));
	info.set("f_emcprojectCommissioningdate", $('#txtNewCommissionDate').datebox('getValue'));
	info.set("f_emcprojectResponsible", $('#txtNewProjectRes').val());
	info.set("f_emcprojectConstructunit", $('#txtNewConstructUnit').val());
	info.set("f_emcprojectStartdate", $('#txtNewStartDate').datebox('getValue'));
	info.set("f_emcprojectEnddate", $('#txtNewEndDate').datebox('getValue'));
	info.set("f_emcprojectTotalcyclenumber", $('#txtNewTotalCycleNumber').val());
	info.set("f_emcprojectResEmail", $('#txtNewResEmail').val());
	info.set("f_emcprojectResPhonenumber", $('#txtNewResPhone').val());
	info.set("f_emcprojectCustomerpm", $('#txtNewCustomerPM').val());
	info.set("f_emcprojectCustomerpmEmail", $('#txtNewCustomerPMEmail').val());
	info.set("f_emcprojectCustomerpmPhonenumber", $('#txtNewCustomerPMPhone').val());
	info.set("f_emcprojectInitpage", $('#txtNewInitPage').val());
	info.set("f_emcprojectType", projectType);
	
	EiCommunicator.send("CMIMEmcproject", "insertProject", info, insertCallback);
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
		if (type == "area") {
			$('#dlgArea').dialog('close');
		}
		else if (type == "company") {
			$('#dlgCompany').dialog('close');
		}
		else if (type == "emcproject") {
			newNode.iconCls = '';
			$('#dlgProject').dialog('close');
		}

		$('#tree').tree('append', {parent: node.target, data: [newNode]});
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','增加节点失败');
	}
}

function RefreshMainTree() {
	areaNodes = [];
	companyNodes = [];
	projectNodes = [];
	var info = new EiInfo();
	EiCommunicator.send("CMIMArea", "queryAreas", info, queryAreasCallback);
}

function editNode() {
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		$.messager.alert('提示','请首先选中编辑节点');
		return;
	}
	
	showDiv(node.attributes.type);
	
	if (node.attributes.type == 'root') {
		$.messager.alert('提示','根节点无法编辑');
		return;
	}
	else if (node.attributes.type == 'area') {
		$('#divArea input').attr("disabled", false);
    	$('#btnSaveArea').linkbutton('enable');
    	$('#btnCancelSaveArea').linkbutton('enable');
	}
	else if (node.attributes.type == 'company') {
		$('#divCompany input').attr("disabled", false);
    	$('#btnSaveCompany').linkbutton('enable');
    	$('#btnCancelSaveCompany').linkbutton('enable');
	}
	else if (node.attributes.type == 'emcproject') {
    	$('#divEmcproject input').attr("disabled", false);
		$('#btnSaveProject').linkbutton('enable');
    	$('#btnCancelSaveProject').linkbutton('enable');
	}
}

function updateArea() {
	var node = $('#tree').tree('getSelected');
	var areaname = $('#txtAreaName').val();
	if (areaname == "") {
		$.messager.alert('警告','区域名称不能为空');
		return;
	}
	for (var i=0; i<areaNodes.length; i++) {
		if (areaNodes[i].id == node.id) {
			continue;
		}
		if (areaname == areaNodes[i].text) {
			$.messager.alert('警告','区域名称不能重复');
			return;
		}
	}
	
	var info = new EiInfo();
	info.set("f_areaId", node.attributes.logicid);
	info.set("f_areaName", $('#txtAreaName').val());
	info.set("f_areaDesc", $('#txtAreaDesc').val());
	EiCommunicator.send("CMIMArea", "updateArea", info, updateCallback);
}

function updateCompany() {
	var node = $('#tree').tree('getSelected');
	var companyName = $('#txtCompanyName').val();
	if (companyName == "") {
		$.messager.alert('警告','公司名称不能为空');
		return;
	}
	for (var i=0; i<companyNodes.length; i++) {
		if (companyNodes[i].id == node.id) {
			continue;
		}
		if (companyName == companyNodes[i].text) {
			$.messager.alert('警告','公司名称不能重复');
			return;
		}
	}
	
	var info = new EiInfo();
	info.set("f_companyId", node.attributes.logicid);
	info.set("f_companyName", $('#txtCompanyName').val());
	info.set("f_companyDesc", $('#txtCompanyDesc').val());
	info.set("f_companyAddress", $('#txtCompanyAddress').val());
	info.set("f_companyAccount", $('#txtCompanyAccount').val());
	info.set("f_companyTaxnumber", $('#txtTaxNumber').val());
	info.set("f_companyBank", $('#txtBank').val());
	info.set("f_companyOrgcode", $('#txtOrgCode').val());
	info.set("f_companyZipcode", $('#txtZipCode').val());
	EiCommunicator.send("CMIMCompany", "updateCompany", info, updateCallback);
}

function updateProject() {
	var node = $('#tree').tree('getSelected');
	var projectName = $('#txtProjectName').val();
	var projectType = $('#txtProjectType').val();
	if (projectName == "") {
		$.messager.alert('警告','EMC项目名称不能为空');
		return;
	}
	for (var i=0; i<projectNodes.length; i++) {
		if (projectNodes[i].id == node.id) {
			continue;
		}
		if (projectName == projectNodes[i].text) {
			$.messager.alert('警告','EMC项目名称不能重复');
			return;
		}
	}
	
	var totalCycleNumber = $('#txtTotalCycleNumber').val();
	var r = new RegExp("^[0-9]*[1-9][0-9]*$");
	if (!r.test(totalCycleNumber)) {
		$.messager.alert('警告','项目结算周期必须录入正整数');
		return;
	}
	
	if(projectType == -1){
		$.messager.alert('警告','请选择项目类型！');
		return;
	}
	
	var info = new EiInfo();
	info.set("f_emcprojectId", node.attributes.logicid);
	info.set("f_emcprojectName", $('#txtProjectName').val());
	info.set("f_emcprojectDesc", $('#txtProjectDesc').val());
	info.set("f_emcprojectAddress", $('#txtProjectAddress').val());
	info.set("f_emcprojectConstructdate", $('#txtConstructDate').datebox('getValue'));
	info.set("f_emcprojectCommissioningdate", $('#txtCommissionDate').datebox('getValue'));
	info.set("f_emcprojectResponsible", $('#txtProjectRes').val());
	info.set("f_emcprojectConstructunit", $('#txtConstructUnit').val());
	info.set("f_emcprojectStartdate", $('#txtStartDate').datebox('getValue'));
	info.set("f_emcprojectEnddate", $('#txtEndDate').datebox('getValue'));
	info.set("f_emcprojectTotalcyclenumber", $('#txtTotalCycleNumber').val());
	info.set("f_emcprojectResEmail", $('#txtResEmail').val());
	info.set("f_emcprojectResPhonenumber", $('#txtResPhone').val());
	info.set("f_emcprojectCustomerpm", $('#txtCustomerPM').val());
	info.set("f_emcprojectCustomerpmEmail", $('#txtCustomerPMEmail').val());
	info.set("f_emcprojectCustomerpmPhonenumber", $('#txtCustomerPMPhone').val());
	info.set("f_emcprojectInitpage", $('#txtInitPage').val());
	info.set("f_emcprojectType", projectType);
	EiCommunicator.send("CMIMEmcproject", "updateProject", info, updateCallback);
}

updateCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','更新节点信息失败');
			return;
		}
		var node = $('#tree').tree('getSelected');
		if ((node == undefined) || (node == null)) {
			return;
		}
		cancelUpdate(node.attributes.type);
		if (node.attributes.type == 'area') {
			$('#tree').tree('update', {target: node.target, text: $('#txtAreaName').val()});
		}
		else if (node.attributes.type == 'company') {
			$('#tree').tree('update', {target: node.target, text: $('#txtCompanyName').val()});
		}
		else if (node.attributes.type == 'emcproject') {
			$('#tree').tree('update', {target: node.target, text: $('#txtProjectName').val()});
		}
	},
    onFail : function(eMsg){
		$.messager.alert('错误','更新节点信息失败');
	}
}

function cancelUpdate(type) {
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
	if (node.attributes.type == 'root') {
		$.messager.alert('提示','根节点无法删除');
	}else if (node.attributes.type == 'area') {
		$.messager.confirm('确认', '是否确认删除区域节点？', 
			function(result) {
				if (result) {
					info.set("f_areaId", node.attributes.logicid);
					EiCommunicator.send("CMIMArea", "deleteArea", info, deleteCallback);
				}
			}
		);
	}else if (node.attributes.type == 'company') {
		$.messager.confirm('确认', '是否确认删除公司节点？', 
			function(result) {
				if (result) {
					info.set("f_companyId", node.attributes.logicid);
					EiCommunicator.send("CMIMCompany", "deleteCompany", info, deleteCallback);
				}
			}
		);
	}else if (node.attributes.type == 'emcproject') {
		$.messager.confirm('确认', '是否确认删除EMC项目节点？', 
			function(result) {
				if (result) {
					info.set("f_emcprojectId", node.attributes.logicid);
					EiCommunicator.send("CMIMEmcproject", "deleteProject", info, deleteCallback);
				}
			}
		);
	}
}

deleteCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','删除节点信息失败');
			return;
		}
		var node = $('#tree').tree('getSelected');
		$('#tree').tree('remove', node.target);
		onTreeClick(rootNode);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','删除节点信息失败');
	}
}