var toolbar = 
	[
		{ text:'增加', iconCls:'icon-add', handler:insert}
	];
	
var editIndex = undefined;
var typeNameArray = [];
        
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

$(function(){
	actionType = ActionType.Normal;
    var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMExpenseType", "queryExpenseTypeByProjectId", info, querytypeNameList);
});

querytypeNameList = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取费用类型失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var data = [];
		data.push({'text':'全部', 'value':'0'});
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        typeNameArray.push({
	        	f_expenseTypeId : row[metas.f_expenseTypeId.pos],
	        	f_expenseTypeName : row[metas.f_expenseTypeName.pos]
	        });
	       	data.push({
	        	'value' : row[metas.f_expenseTypeId.pos],
	        	'text' : row[metas.f_expenseTypeName.pos]
	        });
	    }
	    var columns = $('#datagrid').datagrid('getColumnFields');
	    var column = columns[0];
	    var option = $('#datagrid').datagrid('getColumnOption',column);
	    option.editor.options.data = typeNameArray;
	    
	    $('#selectExpenseType').combobox('loadData', data);
	    $('#selectExpenseType').combobox('select', '0');
	    
	    var info = new EiInfo();
    	info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMExpenseDetail", "queryJoin", info, querycallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取费用类型失败');
	}
}

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取实际费用数据失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        rows.push({        	
	        	f_expenseDetailId:row[metas.f_expenseDetailId.pos],
	        	f_expenseTypeId:row[metas.f_expenseTypeId.pos],
	        	f_emcprojectId:row[metas.f_emcprojectId.pos],
	        	f_expenseTypeName:row[metas.f_expenseTypeName.pos],
	        	f_expenseDetailTime: row[metas.f_expenseDetailTime.pos],
	        	f_expenseDetailValue: row[metas.f_expenseDetailValue.pos],
	        	f_expenseDetailDesc: row[metas.f_expenseDetailDesc.pos]
	        });
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取实际费用数据失败');
	}
}

function queryActualExpense() {
	var expenseTypeId = $('#selectExpenseType').combobox('getValue');
	var startTime = $('#dateStartTime').datetimebox('getValue');
	var endTime = $('#dateEndTime').datetimebox('getValue');
	
	var info = new EiInfo();
	info.set("f_expenseTypeId", expenseTypeId);
   	info.set("startTime", startTime);
    info.set("endTime", endTime);
    info.set("f_emcprojectId", currentProjectId);
    EiCommunicator.send("CMIMExpenseDetail", "queryExpenseDetailByCondition", info, querycallback);
}

function updateRow(index, isediting){
	$('#datagrid').datagrid('getRows')[index].editing = isediting;
	$('#datagrid').datagrid('updateRow', {index: index, row: {}});
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

function saverow(target) {
    if (editIndex == undefined) { 
    	return;
    }
    
    $('#datagrid').datagrid('endEdit', editIndex);
    
    var row = $('#datagrid').datagrid('getRows')[editIndex];
	if (row.f_expenseTypeName == "") {
		$.messager.alert('错误','费用类型不能为空');
		$('#datagrid').datagrid('beginEdit', editIndex);
		return;
	}
	if(row.f_expenseDetailTime == "") {
		$.messager.alert('错误','实际费用生成时间不能为空');
		$('#datagrid').datagrid('beginEdit', editIndex);
		return;
	}
	if(row.f_expenseDetailValue == "") {
		row.f_expenseDetailValue = 0;
	}
	
	var f_expenseTypeId = undefined;
	for (var i=0; i< typeNameArray.length; i++) {
		if (row.f_expenseTypeName == typeNameArray[i].f_expenseTypeName) {
			f_expenseTypeId = typeNameArray[i].f_expenseTypeId;
			break;
		}
	}
	
	var info = new EiInfo();
	info.set("f_expenseTypeId", f_expenseTypeId);
   	info.set("f_expenseDetailTime", row.f_expenseDetailTime);
	info.set("f_expenseDetailValue", row.f_expenseDetailValue);
	info.set("f_expenseDetailDesc", row.f_expenseDetailDesc);

	if (actionType == ActionType.Adding) {
		EiCommunicator.send("CMIMExpenseDetail", "insertDetail", info, savecallback);
	}
	else if (actionType == ActionType.Editing) {
		info.set("f_expenseDetailId", row.f_expenseDetailId);
		EiCommunicator.send("CMIMExpenseDetail", "updateDetail", info, savecallback);
	}
}

savecallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存数据失败');
			$('#datagrid').datagrid('beginEdit', editIndex);
			return;
		}
		
		updateRow(editIndex, false);
		actionType = ActionType.Normal;
		queryActualExpense();
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存数据失败');
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
	editIndex = undefined;
	actionType = ActionType.Normal;
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

function deleterow(index) {
	if (actionType != ActionType.Normal){
		return;
	}
	var row = $('#datagrid').datagrid('getRows')[index];
	$.messager.confirm('警告','是否删除选中数据？',
		function (r) {
			if (!r) {
				return;
			}
			var info = new EiInfo();
			info.set("f_expenseDetailId", row.f_expenseDetailId);
			EiCommunicator.send("CMIMExpenseDetail", "deleteDetail", info, deletecallback);
		});
}

deletecallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','删除数据失败');
			return;
		}
		queryActualExpense();
	},
    onFail : function(eMsg){
		$.messager.alert('错误','删除数据失败');
	}
}