var expenseTypeArray = [];
var expenseInfoArray = [];

$(function(){
    var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMExpenseType", "queryExpenseTypeByProjectId", info, queryExpenseTypeCallback);
});

queryExpenseTypeCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取费用类型失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var typedata = [];
		typedata.push({'text':'全部', 'value':'0'});
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        expenseTypeArray.push({
	        	f_expenseTypeId: row[metas.f_expenseTypeId.pos],
	        	f_expenseTypeName: row[metas.f_expenseTypeName.pos]
	        });
	        typedata.push({
	        	'value': row[metas.f_expenseTypeId.pos],
	        	'text': row[metas.f_expenseTypeName.pos]
	        });
	    }
	    $('#selectExpenseType').combobox('loadData', typedata);
	    $('#selectExpenseType').combobox('select', '0');
	    
	    var myDate = new Date();
		var yeardata = [];
		yeardata.push({'text':'全部', 'value':'0'});
		for (var i = myDate.getFullYear(); i >= 2010; --i) {
			yeardata.push({'text':i, 'value':i});
		}
		$('#selectYear').combobox('loadData', yeardata);
		$('#selectYear').combobox('select', '0');
		
		var monthdata = [];
		monthdata.push({'text':'全部', 'value':'0'});
		for (var i = 1; i <= 12; i++) {
			monthdata.push({'text':i, 'value':i});
		}
	    $('#selectMonth').combobox('loadData', monthdata);
	    $('#selectMonth').combobox('select', '0');
	    
	    var info = new EiInfo();
   		info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMExpenseBudget", "queryJoin", info, querycallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取费用类型失败');
	}
}

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取预算费用数据失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		expenseInfoArray = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        expenseInfoArray.push({
	        	f_expenseTypeId:row[metas.f_expenseTypeId.pos],
	        	f_expenseTypeName:row[metas.f_expenseTypeName.pos],
	        	f_expenseBudgetYear: row[metas.f_expenseBudgetYear.pos],
	        	f_expenseBudgetIndex: row[metas.f_expenseBudgetIndex.pos],
	        	f_expenseBudgetPlannedvalue: row[metas.f_expenseBudgetPlannedvalue.pos]
	        });
	    }
	    var info = new EiInfo();
    	info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMExpenseDetail", "queryJoin", info, queryExpenseDetailCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取预算费用数据失败');
	}
}

queryExpenseDetailCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取实际费用数据失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var expenseDetailArray = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        expenseDetailArray.push({
	        	f_expenseTypeId: row[metas.f_expenseTypeId.pos],
	        	f_expenseTypeName: row[metas.f_expenseTypeName.pos],
	        	f_expenseDetailTime: row[metas.f_expenseDetailTime.pos],
	        	f_expenseDetailValue: row[metas.f_expenseDetailValue.pos]
	        });
	    }
		for (var i=0; i<expenseInfoArray.length; i++) {
			var actualExpense = 0;
			var expenseInfo = expenseInfoArray[i];
			for (var j=0; j<expenseDetailArray.length; j++) {
				if (expenseDetailArray[j].f_expenseTypeName == expenseInfo.f_expenseTypeName) {
					if (isInPeriod(expenseDetailArray[j].f_expenseDetailTime, expenseInfo.f_expenseBudgetYear, expenseInfo.f_expenseBudgetIndex)) {
						actualExpense = actualExpense + parseFloat(expenseDetailArray[j].f_expenseDetailValue);
					}
				}
				expenseInfo.f_expenseBudgetActualvalue = actualExpense;
			}
		}
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', expenseInfoArray);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取实际费用数据失败');
	}
}

function isInPeriod(time, year, month) {
	if (month.length == 1) {
		month = "0" + month;
	}
	if (time.substring(5,7) == month) {
		return true;
	}
	else {
		return false;
	}
}

function queryExpenseInfo() {
	var expenseTypeId = $('#selectExpenseType').combobox('getValue');
	var year = $('#selectYear').combobox('getValue');
	var month = $('#selectMonth').combobox('getValue');
	
	var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
    info.set("f_expenseTypeId", expenseTypeId);
   	info.set("f_expenseBudgetYear", year);
   	info.set("f_expenseBudgetIndex", month);
	EiCommunicator.send("CMIMExpenseBudget", "queryExpenseBudgetByCondition", info, querycallback);
}