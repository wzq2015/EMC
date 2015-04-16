var energysavingTypeArray = [];
var energysavingDetail = [];
var cycleIndexArray = [];
var energysavingTypeIdArray = [];
var energysavingTypeNameArray = [];
var actualWidth = undefined;

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
	    var row = resultBlock.rows[0];
	    var totalCycleNo = parseInt(row[metas.f_emcprojectTotalcyclenumber.pos]);
		for (var i = 1; i <= totalCycleNo; i++) {
			document.getElementById("selectCycleIndex").options.add(new Option(i, i));
		}
		
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
	    for (var i=0; i < resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        energysavingTypeArray.push({
	        	f_energysavingTypeId: row[metas.f_energysavingTypeId.pos],
	            f_energysavingTypeName: row[metas.f_energysavingTypeName.pos],
	            f_energysavingTypeDesc: row[metas.f_energysavingTypeDesc.pos],
	            f_energysavingTypeTargetvalue: row[metas.f_energysavingTypeTargetvalue.pos]
	        });
	        document.getElementById("selectEnergysavingType").options.add(new Option(row[metas.f_energysavingTypeName.pos], row[metas.f_energysavingTypeId.pos]));
	    }
	    
	    actualWidth = $('#inputvalueColumn').width();
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量信息失败');
	}
}

function queryEnergysavingDetail() {
	var selectType = document.getElementById("selectEnergysavingType");
	energysavingTypeIdArray = [];
	energysavingTypeNameArray = [];
	for (var i = 0; i < selectType.length; i++) {
		if (selectType.options[i].selected) {
			energysavingTypeIdArray.push(selectType.options[i].value);
			energysavingTypeNameArray.push(selectType.options[i].text);
		}
	}
	if (energysavingTypeIdArray.length == 0) {
		$.messager.alert('警告','请至少选择一个节能量类型');
		return;
	}

	var selectCycleIndex = document.getElementById("selectCycleIndex");
	cycleIndexArray = [];
	for (var i = 0; i < selectCycleIndex.length; i++) {
		if (selectCycleIndex.options[i].selected) {
			cycleIndexArray.push(selectCycleIndex.options[i].value);
		}
	}
	if (cycleIndexArray.length == 0) {
		$.messager.alert('警告','请至少选择一个结算周期序号');
		return;
	}
	
	energysavingDetail = [];
	for (var i=0; i<energysavingTypeIdArray.length; i++) {
		for (var j=0; j<cycleIndexArray.length; j++) {
			energysavingDetail.push({
	    		f_energysavingTypeId: energysavingTypeIdArray[i],
	        	f_energysavingTypeName: energysavingTypeNameArray[i],
	        	f_emcprojectCycleIndex: cycleIndexArray[j],
	        	f_energysavingDetailInputvalue: 0,
	            f_energysavingDetailAcqvalue: 0,
	        });
		}
	}
	
	var energysavingTypeIds = energysavingTypeIdArray.join(',');
	var emcprojectCycleIndexes = cycleIndexArray.join(',');
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	info.set("f_emcprojectCycleIndexes", emcprojectCycleIndexes);
	info.set("f_energysavingTypeIds", energysavingTypeIds);
	EiCommunicator.send("CMIMEnergysavingDetail", 'queryEnergysavingDetailByEnergysavingTypeIdsAndCycleIndexes', info, queryEnergysavingDetailCallback);
}

queryEnergysavingDetailCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取节能量结果失败');
			return;
		}
			
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i = 0; i < resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var energysavingTypeId = row[metas.f_energysavingTypeId.pos];
	    	var cycleIndex = row[metas.f_emcprojectCycleIndex.pos]
	    	for (var j = 0; j < energysavingDetail.length; j++) {
	    		if ((energysavingDetail[j].f_energysavingTypeId == energysavingTypeId) && (energysavingDetail[j].f_emcprojectCycleIndex == cycleIndex)){
	    			energysavingDetail[j].f_energysavingDetailInputvalue = row[metas.f_energysavingDetailInputvalue.pos];
	    			energysavingDetail[j].f_energysavingDetailAcqvalue = row[metas.f_energysavingDetailAcqvalue.pos];
	    		}
	    	}
	    }
		fillCharts(energysavingDetail);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量结果失败');
	}
}

function fillCharts(data) {
	var input = [];
	var acq = [];
	var chartCount = 0;
	
	for (var i=0; i<energysavingTypeIdArray.length; i++) {
		var inputValue = [];
		var acqValue = [];
		for (var j=0; j<data.length; j++) {
			if (data[j].f_energysavingTypeId == energysavingTypeIdArray[i]) {
				inputValue.push(parseFloat(data[j].f_energysavingDetailInputvalue));
				acqValue.push(parseFloat(data[j].f_energysavingDetailAcqvalue));
			}
		}
		chartCount = inputValue.length;
		input.push({
			name: energysavingTypeNameArray[i],
			dataLabels: {
                enabled: true, color: '#000000', align: 'top',
                style: { fontSize: '10px', fontFamily: 'Verdana, sans-serif'}
			},
			data:inputValue
		});
		acq.push({
			name:energysavingTypeNameArray[i],
			dataLabels: {
                enabled: true, color: '#000000', align: 'top',
                style: { fontSize: '10px', fontFamily: 'Verdana, sans-serif'}
			},
			data:acqValue
		});
	}
	
	if (chartCount*100 > actualWidth) {
		var chartWidth = chartCount*100 + "px";
		$('#inputvalueColumn').css("width", chartWidth);
		$('#acqvalueColumn').css("width", chartWidth);
	}
	else {
		$('#inputvalueColumn').css("width", "100%");
		$('#acqvalueColumn').css("width", "100%");
	}
	
	$('#inputvalueColumn').highcharts({
		chart : { type:'column' },
		title : { text:'节能量录入值柱状图' },
		xAxis : {
			categories : cycleIndexArray,
			title : { enabled: true, text:'项目结算周期序号' }
		},
		yAxis: { title: { text: '节能量' } },
		credits:{ enabled:false },
		plotOptions : {
			column : { pointPadding : 0.2, borderWidth : 0 }
		},
		series : input
	});
	
	$('#acqvalueColumn').highcharts({
		chart : { type : 'column' },
		title : { text : '节能量采集值柱状图' },
		xAxis : {
			categories : cycleIndexArray,
			title: { enabled: true, text:'项目结算周期序号' }
		},
		yAxis: { title: { text: '节能量' } },
		credits: { enabled:false },
		plotOptions : {
			column : { pointPadding : 0.2, borderWidth : 0 }
		},
		series : acq
	});

}