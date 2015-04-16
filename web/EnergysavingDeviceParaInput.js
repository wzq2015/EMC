var currentEmcprojectCycleId = undefined;
var tagArray = [];
var actionType = ActionType.Normal;

function actionformat(val, row, index) {
	if (row.editing) {
		var s = '<a href="javascript:void(0)" onclick="saverow()">保存</a> ';
		var c = '<a href="javascript:void(0)" onclick="cancelrow()">取消</a>';
		return s+c;
	} 
	else {
		var e = '<a href="javascript:void(0)" onclick="editrow(' + index.toString() + ')">编辑</a> ';
		return e;
	}
};

$(function() {
    var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMEmcproject", "queryEmcprojectById", info, querycallback);
});

querycallback = {
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
	    var row = eiInfo.blocks.result.rows[0];
	    var totalCycleNo = parseInt(row[metas.f_emcprojectTotalcyclenumber.pos]);
		$('#nsCycleIndex').numberspinner({min:0, max:totalCycleNo});

	    var info = new EiInfo();
		info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMEnergysavingType", "queryEnergysavingTypeByProjectId", info, queryEnergysavingTypeCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

queryEnergysavingTypeCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目信息失败');
			return;
		}
		
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var formula = row[metas.f_energysavingTypeFormula.pos];
	    	var searchPos = 0;
	    	while (formula.indexOf('start(', searchPos) != -1) {
	    		var posStart = formula.indexOf('start(', searchPos);
	    		var posEnd = formula.indexOf(')', posStart);
	    		if (posEnd == -1) {
	    			return;
	    		}
	    		searchPos = posEnd;
	    		var tagName = formula.substring(posStart + 7, posEnd - 1);
	    		var isExist = false;
	    		for (var j=0; j<tagArray.length; j++) {
	    			if (tagArray[j] == tagName) {
	    				isExist = true;
	    				break;
	    			}
	    		}
	    		if (!isExist) {
	    			tagArray.push(tagName);
	    		}
	    	}
	    }
	    $('#nsCycleIndex').numberspinner('setValue', 0);
	    showDeviceParaGrid();
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

function showDeviceParaGrid() {
	var index = $('#nsCycleIndex').numberspinner('getValue');
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	info.set("f_emcprojectCycleCycleindex", index);
	EiCommunicator.send("CMIMEmcprojectCycle", "queryCycleByProjectIdAndIndex", info, queryCycleIdCallback);
}

queryCycleIdCallback = {
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
		var cycleId = row[metas.f_emcprojectCycleId.pos];
		currentEmcprojectCycleId = cycleId;
		var info = new EiInfo();
		info.set("f_emcprojectCycleId", cycleId);
		EiCommunicator.send("CMIMDeviceparaEntry", "queryDeviceparaEntryByCycleId", info, queryDeviceparaEntryCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

queryDeviceparaEntryCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目信息失败');
			return;
		}
		var deviceParaInputRows = [];
		for (var i=0; i<tagArray.length; i++) {
			var row = {f_deviceparaEntryId:undefined, f_deviceparaName:tagArray[i], f_deviceparaEntryValue:'', f_deviceparaEntryDatetime:''};
			deviceParaInputRows.push(row);
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var tagName = row[metas.f_deviceparaName.pos];
	    	for (var j=0; j<deviceParaInputRows.length; j++) {
	    		if (deviceParaInputRows[j].f_deviceparaName == tagName) {
	    			deviceParaInputRows[j].f_deviceparaEntryId = row[metas.f_deviceparaEntryId.pos];
	    			deviceParaInputRows[j].f_deviceparaEntryValue = row[metas.f_deviceparaEntryValue.pos];
	    			deviceParaInputRows[j].f_deviceparaEntryDatetime = row[metas.f_deviceparaEntryDatetime.pos];
	    		}
	    	}
	    }
	    $('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', deviceParaInputRows);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

function editrow(index) {
	if (actionType != ActionType.Normal) {
		return;
	}
	editIndex = index;
	updateRow(editIndex, true);
	actionType = ActionType.Editing;
	$('#datagrid').datagrid('beginEdit', editIndex);
}

function updateRow(index, isediting){
	$('#datagrid').datagrid('getRows')[index].editing = isediting;
	$('#datagrid').datagrid('updateRow',{ index: index, row:{} });
}

function saverow() {
	$('#datagrid').datagrid('endEdit', editIndex);
	
	var info = new EiInfo();
	var row = $('#datagrid').datagrid('getRows')[editIndex];
	info.set("f_emcprojectCycleId", currentEmcprojectCycleId);
	info.set("f_deviceparaName", row.f_deviceparaName);
	info.set("f_deviceparaEntryValue", row.f_deviceparaEntryValue);
	info.set("f_deviceparaEntryDatetime", row.f_deviceparaEntryDatetime);
	
	if (row.f_deviceparaEntryId != undefined) {
		info.set("f_deviceparaEntryId", row.f_deviceparaEntryId);
		EiCommunicator.send("CMIMDeviceparaEntry", "updateDeviceparaEntry", info, saveCallback);
	}
	else {
		EiCommunicator.send("CMIMDeviceparaEntry", "insertDeviceparaEntry", info, saveCallback);
	}
}

saveCallback = {
	onSuccess : function(eiInfo){
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存设备参数录入值失败');
			$('#datagrid').datagrid('beginEdit', editIndex);
			return;
		}
		updateRow(editIndex, false);
		actionType = ActionType.Normal;
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存设备参数录入值失败');
		$('#datagrid').datagrid('beginEdit', editIndex);
	}
}

function cancelrow() {
	$('#datagrid').datagrid('cancelEdit', editIndex);
	updateRow(editIndex, false);
	actionType = ActionType.Normal;
}