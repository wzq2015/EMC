var toolbar = 
	[
		{ text:'增加', iconCls:'icon-add', handler:insert },
<<<<<<< HEAD
		{ text:'编辑公式', iconCls:'icon-save', handler:editformula },
		{ text:'清空', iconCls:'icon-cancel', handler:empty }
=======
		{ text:'编辑公式', iconCls:'icon-save', handler:editformula }
>>>>>>> origin/master
	];

function actionformat(val, row, index) {
	if (row.editing){
		var s = '<a href="javascript:void(0)" onclick="saverow()">保存</a> ';
		var c = '<a href="javascript:void(0)" onclick="cancelrow()">取消</a>';
		return s+c;
	} else {
		var e = '<a href="javascript:void(0)" onclick="editrow(' + index.toString() + ')">编辑</a> ';
		var d = '<a href="javascript:void(0)" onclick="deleterow(' + index.toString() + ')">删除</a>';
		return e+d;
	}
};

function tagactionformat(val,row) {
	var tagName = row.f_deviceparaTagname;
	var s = '<a href="javascript:void(0)" onclick="selectstarttag(\'' + '' + tagName + '\')">周期初值</a> ';
	var e = '<a href="javascript:void(0)" onclick="selectendtag(\'' + tagName + '\')">周期末值</a>';
	return s + e;
};

//$(function(){
//	actionType = ActionType.Normal;
//	var info = new EiInfo();
//	info.set("f_emcprojectId", currentProjectId);
//	EiCommunicator.send("CMIMEnergysavingType", "queryEnergysavingTypeByProjectId", info, querycallback);
//});

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取节能量信息失败');
			return;
		}
			
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        rows.push({
	        	f_energysavingTypeId: row[metas.f_energysavingTypeId.pos],
	            f_energysavingTypeName: row[metas.f_energysavingTypeName.pos],
	            f_energysavingTypeDesc: row[metas.f_energysavingTypeDesc.pos],
	            f_energysavingTypeFormula: row[metas.f_energysavingTypeFormula.pos],
	            f_energysavingTypeCalcstep: row[metas.f_energysavingTypeCalcstep.pos],
	            f_energysavingTypeTargetvalue: row[metas.f_energysavingTypeTargetvalue.pos]
	        });
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量信息失败');
	}
}

function updateRow(index, isediting){
	$('#datagrid').datagrid('getRows')[index].editing = isediting;
	$('#datagrid').datagrid('updateRow',{ index: index, row:{} });
}

function insert() {
	if (actionType == ActionType.Normal) {
		$('#datagrid').datagrid('appendRow',{});
		editIndex = $('#datagrid').datagrid('getRows').length - 1;
		actionType = ActionType.Adding;
		updateRow(editIndex, true);
		$('#datagrid').datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
	}
}

<<<<<<< HEAD
function empty() {
	var typeTemplateId = $('#f_typeTemplateId').val();
	if(typeTemplateId == null){
		$.messager.alert('错误','清空出现异常，请检查类型模版是否存在！');
		return;
	}
	$.messager.confirm('确认', '清空后数据将不能恢复，请慎重操作！是否确认清空？', 
		function(r) {
			if (r) {
				var info = new EiInfo();
				info.set("f_typeTemplateId", typeTemplateId);
				EiCommunicator.send("CMIMEnergysavingTypeTemplates", "emptyEnergysavingTypeTemplates", info, deletecallback);
			}
		});
}

=======
>>>>>>> origin/master
function saverow() {
    if (editIndex == undefined) { 
    	return;
    }	
    $('#datagrid').datagrid('endEdit', editIndex);
	var info = new EiInfo();
	var row = $('#datagrid').datagrid('getRows')[editIndex];
	if (row.f_energysavingTypeName == "") {
		$.messager.alert('警告','请输入节能量类型名称');
		$('#datagrid').datagrid('beginEdit', editIndex);
		return;
	}
	
	var rows = $('#datagrid').datagrid('getRows');
	for (var i=0; i<rows.length; i++) {
		if ((row.f_energysavingTypeName == rows[i].f_energysavingTypeName) && (editIndex != i)) {
			$.messager.alert('警告','节能量类型名称不能重复');
			$('#datagrid').datagrid('beginEdit', editIndex);
			return;
		}
	}

//	if ((row.f_energysavingTypeTargetvalue == "") || isNaN(row.f_energysavingTypeTargetvalue)) {
//		$.messager.alert('警告','目标值必须录入数字');
//		$('#datagrid').datagrid('beginEdit', editIndex);
//		return;
//	}
	
   	info.set("f_energysavingTypeName", row.f_energysavingTypeName);
	info.set("f_energysavingTypeDesc", row.f_energysavingTypeDesc);
	info.set("f_typeTemplateId", $('#f_typeTemplateId').val());

	if (actionType == ActionType.Adding) {
		EiCommunicator.send("CMIMEnergysavingTypeTemplates", "insertEnergysavingTypeTemplates", info, savecallback);
	}else if (actionType == ActionType.Editing) {
		info.set("f_energysavingtypeTemplateId", row.f_energysavingtypeTemplateId);
		EiCommunicator.send("CMIMEnergysavingTypeTemplates", "updateEnergysavingTypeTemplates", info, savecallback);
	}
}

savecallback = {
	onSuccess : function(eiInfo){
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存节能量类型模版信息失败');
			$('#datagrid').datagrid('beginEdit', editIndex);
			return;
		}
		updateRow(editIndex, false);
		actionType = ActionType.Normal;
		
		var info = new EiInfo();
		info.set("f_typeTemplateId", $('#f_typeTemplateId').val());
		EiCommunicator.send("CMIMEnergysavingTypeTemplates", "queryEnergysavingTypeTemplatesByTypeTemplateId", info, queryEnergysavingTypeTemplatesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存节能量类型模版信息失败');
		$('#datagrid').datagrid('beginEdit', editIndex);
	}
}

function cancelrow() {
	if (editIndex == undefined) {
		return;
	}
	if (actionType == ActionType.Adding) {
		$('#datagrid').datagrid('deleteRow', editIndex);
	}
	else if (actionType == ActionType.Editing) {
		$('#datagrid').datagrid('cancelEdit', editIndex);
		updateRow(editIndex, false);
	}
	actionType = ActionType.Normal;
}

function editrow(index) {
	if (actionType != ActionType.Normal){
		return;
	}
	editIndex = index;
	updateRow(editIndex, true);
	actionType = ActionType.Editing;
	$('#datagrid').datagrid('beginEdit', editIndex);
}

function deleterow(index) {
	if (actionType != ActionType.Normal){
		return;
	}
	$.messager.confirm('确认', '是否确认删除？', 
		function(r) {
			if (r) {
				var row = $('#datagrid').datagrid('getRows')[index];
				var info = new EiInfo();
				info.set("f_energysavingtypeTemplateId", row.f_energysavingtypeTemplateId);
				EiCommunicator.send("CMIMEnergysavingTypeTemplates", "deleteEnergysavingTypeTemplates", info, deletecallback);
			}
		});
}

deletecallback = {
	onSuccess : function(eiInfo){
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','删除节能量类型模版信息失败');
			return;
		}		
		var info = new EiInfo();
		info.set("f_typeTemplateId", $('#f_typeTemplateId').val());
		EiCommunicator.send("CMIMEnergysavingTypeTemplates", "queryEnergysavingTypeTemplatesByTypeTemplateId", info, queryEnergysavingTypeTemplatesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','删除节能量类型模版信息失败');
	}
}

function insertFormula(str) {
	var pos = {};
    if('number' === typeof $('#txtformula')[0].selectionStart){
        pos.start = $('#txtformula')[0].selectionStart;
        pos.end = $('#txtformula')[0].selectionEnd;
    }
    
	var str0 = $('#txtformula')[0].value.substring(0,pos.start);
	var str1 = $('#txtformula')[0].value.substring(pos.end);
    $('#txtformula')[0].value = str0 + str + str1;
    pos.start += str.length;
    pos.end = pos.start;

    if($('#txtformula')[0].setSelectionRange){
        $('#txtformula')[0].focus();
        $('#txtformula')[0].setSelectionRange(pos.start,pos.end);
    }
}

var isFormula = true;
function editformula() {
	isFormula = true;
	var row = $('#datagrid').datagrid('getSelected');
	if (row) {
		$('#dlgformula').dialog('open').dialog('setTitle','节能量计算公式编辑');
		$('#txtformula').val(row.f_energysavingTypeFormula);
//		searchTag();
	}
}

function editCalcstep() {
	isFormula = false;
	var row = $('#datagrid').datagrid('getSelected');
	if (row) {
		$('#dlgformula').dialog('open').dialog('setTitle','节能量计算过程编辑');
		$('#txtformula').val(row.f_energysavingTypeCalcstep);
		searchTag();
	}
}


function selectstarttag(tagName) {
	var str = 'start("' + tagName + '")';
	insertFormula(str);
};

function selectendtag(tagName) {
	var str = 'end("' + tagName + '")';
	insertFormula(str);
};

function saveFormula() {
	var row = $('#datagrid').datagrid('getSelected');
	if (row) {
		var info = new EiInfo();
		if (isFormula) {
			info.set("f_energysavingtypeTemplateId", row.f_energysavingtypeTemplateId);
			info.set("f_energysavingTypeFormula", $('#txtformula').val());
			EiCommunicator.send("CMIMEnergysavingTypeTemplates", "updateFormula", info, saveFormulaCallback);
		}
//		else {
//			info.set("f_energysavingTypeId", row.f_energysavingTypeId);
//			info.set("f_energysavingTypeCalcstep", $('#txtformula').val());
//			EiCommunicator.send("CMIMEnergysavingType", "updateCalcstep", info, saveFormulaCallback);
//		}
	}
}

saveFormulaCallback = {
	onSuccess : function(eiInfo){
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存计算公式失败');
			return;
		}
		$('#dlgformula').dialog('close');
		var info = new EiInfo();
		info.set("f_typeTemplateId", $('#f_typeTemplateId').val());
		EiCommunicator.send("CMIMEnergysavingTypeTemplates", "queryEnergysavingTypeTemplatesByTypeTemplateId", info, queryEnergysavingTypeTemplatesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存计算公式失败');
	}
}

function searchTag() {
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMDevicePara", "queryDeviceParasByProjectId", info, queryDeviceParasCallback);
}

queryDeviceParasCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取设备参数信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
		var tagName = $('#txtTagName').val();
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	if ((tagName != '') && (row[metas.f_deviceparaTagname.pos].toString().indexOf(tagName) < 0)) {
	    		continue;
	    	}
	    	rows.push({
	        	f_deviceparaName: row[metas.f_deviceparaName.pos],
	            f_deviceparaDesc: row[metas.f_deviceparaDesc.pos],
	            f_deviceparaTagname: row[metas.f_deviceparaTagname.pos]
	        });
	    }
	    
		$('#datagridtag').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取设备参数信息失败');
	}
}