var energysavingTypeArray = [];

$(function() {
    var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMEnergysavingType", "queryEnergysavingTypeByProjectId", info, querycallback);
});

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
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量信息失败');
	}
}

function queryEnergysavingResult() {
	var startTime = $('#dateStartTime').datetimebox('getValue');
	var endTime = $('#dateEndTime').datetimebox('getValue');
	var info = new EiInfo();
	info.set("StartTime", startTime);
	info.set("EndTime", endTime);
	info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMEnergysavingCalc", "queryEnergysavingResultByTime", info, queryEnergysavingResultCallback);
}

queryEnergysavingResultCallback = {
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
	            f_energysavingDetailAcqvalue: row[metas.f_energysavingDetailAcqvalue.pos]
	        });
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量结果失败');
	}
}