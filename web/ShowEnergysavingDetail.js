var energysavingTypeArray = [];

function actionformat(val, row, index) {
	var s = '<a href="javascript:void(0)" onclick="showInputCalcStep(' + index.toString() + ')">查看录入值计算过程</a> ';
	var c = '<a href="javascript:void(0)" onclick="showAcqCalcStep(' + index.toString() + ')">查看采集值计算过程</a>';
	return s + c;
};

$(function() {
    var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMEmcproject", "queryEmcprojectById", info, queryProjectCallback);
});

queryProjectCallback = {
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
		var data = [];
		for (var i = 1; i <= totalCycleNo; i++) {
			data.push({'text':i, 'value':i});
		}
		$('#selectCycleIndex').combobox('loadData', data);
		$('#selectCycleIndex').combobox('setValue', '1');
		
		var info = new EiInfo();
    	info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMEnergysavingType", "queryEnergysavingTypeByProjectId", info, querycallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取项目信息失败');
	}
}

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取节能量信息失败');
			return;
		}
			
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        energysavingTypeArray.push({
	        	f_energysavingTypeId: row[metas.f_energysavingTypeId.pos],
	            f_energysavingTypeName: row[metas.f_energysavingTypeName.pos],
	            f_energysavingTypeDesc: row[metas.f_energysavingTypeDesc.pos],
	            f_energysavingTypeTargetvalue: row[metas.f_energysavingTypeTargetvalue.pos]
	        });
	    }
	    queryEnergysavingDetail();
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量信息失败');
	}
}

queryEnergysavingDetailCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取节能量结果失败');
			return;
		}
			
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i = 0; i < resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var energysavingTypeId = row[metas.f_energysavingTypeId.pos];
	    	var energysavingType = undefined;
	    	for (var j = 0; j < energysavingTypeArray.length; j++) {
	    		if (energysavingTypeArray[j].f_energysavingTypeId == energysavingTypeId) {
	    			energysavingType = energysavingTypeArray[j];
	    			break;
	    		}
	    	}
	    	if (energysavingType == undefined) {
	    		return;
	    	}
	        rows.push({
	        	f_energysavingTypeName: energysavingType.f_energysavingTypeName,
	        	f_energysavingTypeDesc: energysavingType.f_energysavingTypeDesc,
	        	f_energysavingDetailInputvalue: row[metas.f_energysavingDetailInputvalue.pos],
	            f_energysavingDetailInputcalcstep: row[metas.f_energysavingDetailInputcalcstep.pos],
	            f_energysavingDetailAcqvalue: row[metas.f_energysavingDetailAcqvalue.pos],
	            f_energysavingDetailAcqcalcstep: row[metas.f_energysavingDetailAcqcalcstep.pos]
	        });
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量结果失败');
	}
}

function queryEnergysavingDetail() {
	var cycleIndex = $('#selectCycleIndex').combobox('getValue');
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	info.set("f_emcprojectCycleIndex", cycleIndex);
	EiCommunicator.send("CMIMEnergysavingDetail", 'queryEnergysavingDetail', info, queryEnergysavingDetailCallback);
}

function showInputCalcStep(index) {
	var row = $('#datagrid').datagrid('getRows')[index];
	$('#dlgcalcstep').dialog('open').dialog('setTitle','录入值计算过程');
	$('#txtcalcstep').val(row.f_energysavingDetailInputcalcstep);
}

function showAcqCalcStep(index) {
	var row = $('#datagrid').datagrid('getRows')[index];
	$('#dlgcalcstep').dialog('open').dialog('setTitle','采集值计算过程');
	$('#txtcalcstep').val(row.f_energysavingDetailAcqcalcstep);
}