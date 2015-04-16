var expenseTypeArray = [];
var expenseInfoArray = [];
var expenseTypeIds = undefined;
var year = undefined;
var queryType = undefined;
var indexQuarterOrMonth = undefined;

$(function() {
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMExpenseType", "queryExpenseTypeByProjectId", info, queryExpenseTypeCallback);
});

queryExpenseTypeCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误', '获取费用类型失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		for ( var i = 0; i < resultBlock.rows.length; i++) {
			var row = resultBlock.rows[i];
			expenseTypeArray.push({
				f_expenseTypeId : row[metas.f_expenseTypeId.pos],
				f_expenseTypeName : row[metas.f_expenseTypeName.pos]
			});
			document.getElementById("selectExpenseType").options.add(new Option(row[metas.f_expenseTypeName.pos], row[metas.f_expenseTypeId.pos]));
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

		var quarterdata = [];
		for (var i = 1; i <= 4; i++) {
			quarterdata.push({ 'text' : i, 'value' : i });
		}
		$('#selectQuarter').combobox('loadData', quarterdata);
		$('#selectQuarter').combobox('select', '1');
		
		actualWidth = $('#chartColumn').width();
	},
	onFail : function(eMsg) {
		$.messager.alert('错误', '获取费用类型失败');
	}
}

function queryExpenseInfo() {
	var selectExpenseType = document.getElementById("selectExpenseType");
	var expenseTypeIdArray = [];
	var expenseTypeNameArray = [];
	for (var i = 0; i < selectExpenseType.length; i++) {
		if (selectExpenseType.options[i].selected) {
			expenseTypeIdArray.push(selectExpenseType.options[i].value);
			expenseTypeNameArray.push(selectExpenseType.options[i].text);
		}
	}
	if (expenseTypeIdArray.length == 0) {
		$.messager.alert('警告','请至少选择一个费用类型');
		return;
	}
	
	expenseTypeIds = expenseTypeIdArray.join(',');
	
	year = $('#selectYear').combobox('getValue');
	queryType = $("input[name='selectMethod']:checked").val();
	if (queryType=='1') {
		indexQuarterOrMonth = $('#selectQuarter').combobox('getValue');
	}
	else if(queryType=='2') {
		indexQuarterOrMonth = $('#selectMonth').combobox('getValue');
	}
	expenseInfoArray = [];
	for (var i=0; i<expenseTypeIdArray.length; i++) {
		expenseInfoArray.push({
			f_expenseTypeId : expenseTypeIdArray[i],
			f_expenseTypeName : expenseTypeNameArray[i],
			f_expenseBudgetYear : year,
			f_expenseBudgetIndex : indexQuarterOrMonth,
			f_expenseBudgetPlannedvalue : 0,
			f_expenseBudgetActualvalue: 0
		});
	}

	var info = new EiInfo();
	info.set("expenseTypeIds", expenseTypeIds);
	info.set("year", year);
	info.set("queryType", queryType);
	info.set("indexQuarterOrMonth", indexQuarterOrMonth);
	EiCommunicator.send("CMIMExpenseBudget", "queryExpenseBudgetByTypeIdsAndIndexes", info, querycallback);
}

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误', '获取预算费用数据失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		for (var i = 0; i < resultBlock.rows.length; i++) {
			var row = resultBlock.rows[i];
			for (var j = 0; j < expenseInfoArray.length; j++) {
				if (expenseInfoArray[j].f_expenseTypeId == row[metas.f_expenseTypeId.pos]) {
					expenseInfoArray[j].f_expenseBudgetPlannedvalue = row[metas.f_expenseBudgetPlannedvalue.pos];
				}
			}
		}
		
		var info = new EiInfo();
		info.set("expenseTypeIds", expenseTypeIds);
		info.set("year", year);
		info.set("queryType", queryType);
		info.set("indexQuarterOrMonth", indexQuarterOrMonth);
		EiCommunicator.send("CMIMExpenseDetail", "queryExpenseDetailByTypeIdsAndTime", info, queryExpenseDetailCallback);
	},
	onFail : function(eMsg) {
		$.messager.alert('错误', '获取预算费用数据失败');
	}
}

queryExpenseDetailCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误', '获取实际费用数据失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var expenseDetailArray = [];
		for (var i = 0; i < resultBlock.rows.length; i++) {
			var row = resultBlock.rows[i];
			expenseDetailArray.push({
				f_expenseTypeId : row[metas.f_expenseTypeId.pos],
				f_expenseDetailValue : row[metas.f_expenseDetailValue.pos]
			});
		}
		for (var i = 0; i < expenseInfoArray.length; i++) {
			var actualExpense = 0;
			for (var j = 0; j < expenseDetailArray.length; j++) {
				if (expenseDetailArray[j].f_expenseTypeId == expenseInfoArray[i].f_expenseTypeId) {
					actualExpense = actualExpense + parseFloat(expenseDetailArray[j].f_expenseDetailValue);
				}
				expenseInfoArray[i].f_expenseBudgetActualvalue = actualExpense;
			}
		}
		fillCharts(expenseInfoArray);
	},
	onFail : function(eMsg) {
		$.messager.alert('错误', '获取实际费用数据失败');
	}
}

function fillCharts(data) {
	var expenseChartCategories = [];
	var expenseBudget = [];
	var expenseDetail = [];
	var chartCount = data.length;
	if (chartCount*100 > actualWidth) {
		var chartWidth = chartCount*100 + "px";
		$('#chartColumn').css("width", chartWidth);
	}
	else {
		$('#chartColumn').css("width", "100%");
	}
	
	for ( var i = 0; i < data.length; i++) {
		expenseChartCategories.push(data[i].f_expenseTypeName);
		expenseBudget.push(parseFloat(data[i].f_expenseBudgetPlannedvalue));
		expenseDetail.push(parseFloat(data[i].f_expenseBudgetActualvalue));
	}

	$('#chartColumn').highcharts({
		chart : { type: 'column' },
		title : { text: '费用对比查询柱状图' },
		xAxis : {
			categories: expenseChartCategories,
			title: { enabled: true, text: '费用类型' }
		},
		yAxis: { title: { text: '费用对比' } },
		credits: { enabled:false },
		plotOptions : {
			column : { pointPadding : 0.2, borderWidth : 0 }
		},
		series : [{
						name: '预算值', data: expenseBudget,
						dataLabels: {
		                	enabled: true, color: '#000000', align: 'top',
		                	style: { fontSize: '13px', fontFamily: 'Verdana, sans-serif' }
		            	}
				  }, 
				  {
						name: '实际值', data: expenseDetail,
						dataLabels: {
		                	enabled: true, color: '#000000', align: 'top',
		                	style: { fontSize: '13px', fontFamily: 'Verdana, sans-serif' }
		            	}
				  }]
		});

	var pieBudget = [];
	for (var i = 0; i < data.length; i++) {
		pieBudget.push({
			'name' : data[i].f_expenseTypeName,
			'y' : parseFloat(data[i].f_expenseBudgetPlannedvalue)
		});
	}

	$('#chartBudget').highcharts({
		chart : { plotBackgroundColor : null, plotBorderWidth : null, plotShadow : false },
		title : { text : '费用预算值饼图' },
		yAxis: { title: { text: '费用预算值' } },
		credits: { enabled:false },
		tooltip : { pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>' },
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : { enabled : true, color: '#000000', format: '<b>{point.name}</b>: {point.y} ' },
				showInLegend : true
			}
		},
		series : [{ type: 'pie', name: '预算值', data: pieBudget }]
	});

	var pieDetail = [];
	for ( var i = 0; i < data.length; i++) {
		pieDetail.push({
			'name' : data[i].f_expenseTypeName,
			'y' : parseFloat(data[i].f_expenseBudgetActualvalue)
		});
	}

	$('#chartDetail').highcharts({
		chart : { plotBackgroundColor : null, plotBorderWidth : null, plotShadow : false },
		title : { text : '费用实际值饼图' },
		yAxis: { title: { text: '费用实际值' } },
		credits: { enabled:false },
		tooltip : { pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>' },
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : { enabled : true, color: '#000000', format: '<b>{point.name}</b>: {point.y} ' },
				showInLegend : true
			}
		},
		series: [{ type: 'pie', name: '实际值', data: pieDetail }]
	});
}

function showTime(value) {
	if (value == '0') {
		document.getElementById("divQuarter").style.display = "none";
		document.getElementById("divMonth").style.display = "none";
	}
	if (value == '1') {
		document.getElementById("divQuarter").style.display = "";
		document.getElementById("divMonth").style.display = "none";
	}
	if (value == '2') {
		document.getElementById("divQuarter").style.display = "none";
		document.getElementById("divMonth").style.display = "";
	}
}