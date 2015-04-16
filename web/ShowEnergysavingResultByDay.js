var energysavingTypeArray = [];
var energysavingResultArray = [];
var energysavingTypeIdArray = [];
var energysavingTypeNameArray = [];

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
	        document.getElementById("selectEnergysavingType").options.add(new Option(row[metas.f_energysavingTypeName.pos], row[metas.f_energysavingTypeId.pos]));
	    }
	    
	    var myDate = new Date();
		var yeardata = [];
		for (var i = myDate.getFullYear(); i >= 2010; i--) {
			yeardata.push({ 'text' : i, 'value' : i });
		}
		$('#selectYear').combobox('loadData', yeardata);
		$('#selectYear').combobox('select', '2014');
		
		var monthdata = [];
		for (var i = 1; i <= 12; i++) {
			monthdata.push({ 'text' : i, 'value' : i });
		}
		$('#selectMonth').combobox('loadData', monthdata);
		$('#selectMonth').combobox('select', '1');
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量信息失败');
	}
}

function queryEnergysavingResult() {
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
	
	var energysavingTypeIds = energysavingTypeIdArray.join(',');
	var year = $('#selectYear').combobox('getValue');
	var month = $('#selectMonth').combobox('getValue');
	var info = new EiInfo();
	info.set("Year", year);
	info.set("Month", month);
	info.set("f_emcprojectId", currentProjectId);
	info.set("EnergysavingTypeIds", energysavingTypeIds);
	EiCommunicator.send("CMIMEnergysavingCalc", "queryEnergysavingResultByDay", info, queryEnergysavingResultCallback);
}

queryEnergysavingResultCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取节能量结果失败');
			return;
		}
		energysavingResultArray = [];
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
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
	        energysavingResultArray.push({
	        	f_energysavingTypeId: energysavingType.f_energysavingTypeId,
	        	f_energysavingTypeName: energysavingType.f_energysavingTypeName,
	        	f_energysavingTypeDesc: energysavingType.f_energysavingTypeDesc,
	            f_energysavingDetailAcqvalue: row[metas.f_energysavingDetailAcqvalue.pos],
	            startDate: row[metas.f_energysavingDetailAcqcalcstep.pos]
	        });
	    }
	    fillCharts(energysavingResultArray);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取节能量结果失败');
	}
}

function fillCharts(energysavingResultArray) {
	var energyDataCollection = [];
	var dateArray = [];
	for (var i=0; i<energysavingTypeIdArray.length; i++) {
		var energySubDataCollection = [];
		for (var j=0; j<energysavingResultArray.length; j++) {
			if (energysavingResultArray[j].f_energysavingTypeId == energysavingTypeIdArray[i]) {
				energySubDataCollection.push(parseFloat(energysavingResultArray[j].f_energysavingDetailAcqvalue));
				if (i == 0) {
					dateArray.push(energysavingResultArray[j].startDate);
				}
			}
		}
		energyDataCollection.push({
			name:energysavingTypeNameArray[i],
			dataLabels: {
                enabled: true, color: '#000000', align: 'top',
                style: { fontSize: '13px', fontFamily: 'Verdana, sans-serif', textShadow: '0 0 3px black' }
			},
			data:energySubDataCollection
		});
	}
	
	$('#acqvalueColumn').highcharts({
		chart : { type : 'column' },
		title : { text : '节能量柱状图（按天）' },
		xAxis : {
			categories : dateArray,
			title: { enabled:true, text:'项目结算周期序号' }
		},
		credits:{ enabled:false },
		plotOptions : {
			column : { pointPadding:0.2, borderWidth:0 }
		},
		series : energyDataCollection
	});
}