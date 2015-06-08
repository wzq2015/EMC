var projectTypesNodes = [];
var typeTemplateNodes = [];
var projectNodes = [];
var rootNode = undefined;
var actionType = ActionType.Normal;

$(function() {
	var info = new EiInfo();
	EiCommunicator.send("CMIMProjectTypes", "queryProjectTypes", info, queryProjectTypesCallback);
});

queryProjectTypesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目类型信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					id: row[metas.f_projectTypeId.pos],
	    					text: row[metas.f_projectTypeName.pos],
	    					attributes: {type:'projectType', logicid:row[metas.f_projectTypeId.pos]},
	    					children:[],
	    					iconCls:'icon-add'
	    			   };
	        projectTypesNodes.push(node);
	    }
	    
	    rootNode = {id:0, text:"根节点", attributes: {type: 'root'}, children:projectTypesNodes, iconCls:'icon-add'};
		$('#tree').tree('loadData', [rootNode]);
		$('#tree').tree({onClick: onTreeClick});
		$('#tree').tree({onBeforeDrag: 
			function (node) {
				if (node.attributes.type != 'projectType') {
					return false;
				}
			}
		});
		
		showDiv("root");
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取项目类型信息失败');
	}
}

function onTreeClick(node) {
	showDiv(node.attributes.type);
	
	var info = new EiInfo();
	if (node.attributes.type == 'projectType') {
		info.set("f_projectTypeId", node.attributes.logicid);
		EiCommunicator.send("CMIMProjectTypes", "queryProjectTypes", info, queryProjectTypeCallback);
	}
}

queryProjectTypeCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目类型信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		if (resultBlock.rows.length != 1) {
			$.messager.alert('错误','获取项目类型信息失败');
			return;
		}
    	var row = resultBlock.rows[0];
    	$('#txtProjectTypeName').val(row[metas.f_projectTypeName.pos]);
    	$('#txtProjectTypeDesc').val(row[metas.f_projectTypeDesc.pos]);
    	$('#divProjectTypes input').attr("disabled", true);
    	$('#btnSaveProjectType').linkbutton('disable');
    	$('#btnCancelSaveProjectType').linkbutton('disable');
    	
    	var info = new EiInfo();
    	info.set("f_projectTypeId", row[metas.f_projectTypeId.pos]);
		EiCommunicator.send("CMIMTypeTemplate", "queryTypeTemplate", info, queryTypeTemplateCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取项目类型信息失败');
	}
}


queryTypeTemplateCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取类型模版信息失败');
			return;
		}
		var info = new EiInfo();
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var row = resultBlock.rows[0];
		if(row != null){
			$('#f_typeTemplateId').val(row[metas.f_typeTemplateId.pos]);
    		info.set("f_typeTemplateId", row[metas.f_typeTemplateId.pos]);
		}
		EiCommunicator.send("CMIMEnergysavingTypeTemplates", "queryEnergysavingTypeTemplatesByTypeTemplateId", info, queryEnergysavingTypeTemplatesCallback);
		EiCommunicator.send("CMIMExpenseTypeTemplates", "queryExpenseTypeTemplatesByTypeTemplateId", info, queryExpenseTypeTemplatesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取类型模版信息失败');
	}
}


queryEnergysavingTypeTemplatesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取节能量类型模版信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		if (resultBlock.rows.length > 0) {
			var rows = [];
	    	for (var i=0; i<resultBlock.rows.length; i++) {
	    		var row = resultBlock.rows[i];
	        	rows.push({
	        		f_energysavingtypeTemplateId: row[metas.f_energysavingtypeTemplateId.pos],
	            	f_energysavingTypeName: row[metas.f_energysavingTypeName.pos],
	           	 	f_energysavingTypeDesc: row[metas.f_energysavingTypeDesc.pos],
	            	f_energysavingTypeFormula: row[metas.f_energysavingTypeFormula.pos],
	            	f_typeTemplateId: row[metas.f_typeTemplateId.pos]
	        	});
	    	}
			$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
		}else{
			$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', []);
		}
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量类型模版信息失败');
	}
}

queryExpenseTypeTemplatesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取费用类型模版信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		if (resultBlock.rows.length > 0) {
			var rows = [];
	    	for (var i=0; i<resultBlock.rows.length; i++) {
	    		var row = resultBlock.rows[i];
	        	rows.push({
	        		f_expensetypeTemplateId: row[metas.f_expensetypeTemplateId.pos],
	        		f_expenseTypeName: row[metas.f_expenseTypeName.pos],
	        		f_expenseTypeDesc: row[metas.f_expenseTypeDesc.pos],
	            	f_typeTemplateId: row[metas.f_typeTemplateId.pos]
	        	});
	    	}
			$('#datagrid1').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
		}else{
			$('#datagrid1').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', []);
		}
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取费用类型模版信息失败');
	}
}


function addNode(addType) {
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		$.messager.alert('提示','请选择一个节点');
		return;
	}
	if (node.attributes.type == 'root') {
		$('#dlgProjectType').dialog('open');
		$('#dlgProjectType input').val("");
	}
}

function showDiv(divName) {
	if (divName == "root") {
		$('#divProjectTypes')[0].style.display = 'none';
	}else if (divName == "projectType") {
		$('#divProjectTypes')[0].style.display = 'block';
	}
}

function insertProjectType() {
	var projecttypename = $('#txtNewProjectTypeName').val();
	if (projecttypename == "") {
		$.messager.alert('警告','项目类型名称不能为空');
		return;
	}
	for (var i=0; i<projectTypesNodes.length; i++) {
		if (projecttypename == projectTypesNodes[i].text) {
			$.messager.alert('警告','项目类型名称不能重复');
			return;
		}
	}
	var info = new EiInfo();
	info.set("f_projectTypeName", $('#txtNewProjectTypeName').val());
	info.set("f_projectTypeDesc", $('#txtNewProjectTypeDesc').val());
	info.set("f_projectTypeStatus", 0);
	EiCommunicator.send("CMIMProjectTypes", "insertProjectTypes", info, insertCallback);
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
		if (type == "projectType") {
			$('#dlgProjectType').dialog('close');
		}
		$('#tree').tree('append', {parent: node.target, data: [newNode]});
	},onFail : function(eMsg) {
		$.messager.alert('错误','增加节点失败');
	}
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
	}else if (node.attributes.type == 'projectType') {
		$('#divProjectTypes input').attr("disabled", false);
    	$('#btnSaveProjectType').linkbutton('enable');
    	$('#btnCancelSaveProjectType').linkbutton('enable');
	}
}

function updateProjectType() {
	var node = $('#tree').tree('getSelected');
	var projecttypename = $('#txtProjectTypeName').val();
	if (projecttypename == "") {
		$.messager.alert('警告','项目类型名称不能为空');
		return;
	}
	for (var i=0; i<projectTypesNodes.length; i++) {
		if (projectTypesNodes[i].id == node.id) {
			continue;
		}
		if (projecttypename == projectTypesNodes[i].text) {
			$.messager.alert('警告','项目类型名称不能重复');
			return;
		}
	}
	
	var info = new EiInfo();
	info.set("f_projectTypeId", node.attributes.logicid);
	info.set("f_projectTypeName", $('#txtProjectTypeName').val());
	info.set("f_projectTypeDesc", $('#txtProjectTypeDesc').val());
	EiCommunicator.send("CMIMProjectTypes", "updateProjectTypes", info, updateCallback);
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
		if (node.attributes.type == 'projectType') {
			$('#tree').tree('update', {target: node.target, text: $('#txtProjectTypeName').val()});
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
	}
	else if (node.attributes.type == 'projectType') {
		$.messager.confirm('确认', '是否确认删除区域节点？', 
			function(result) {
				if (result) {
					info.set("f_projectTypeId", node.attributes.logicid);
					info.set("f_projectTypeName", $('#txtProjectTypeName').val());
					info.set("f_projectTypeDesc", $('#txtProjectTypeDesc').val());
					EiCommunicator.send("CMIMProjectTypes", "deleteProjectTypes", info, deleteCallback);
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