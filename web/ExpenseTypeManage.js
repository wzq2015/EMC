var toolbar = 
	[
		{ text:'增加', iconCls:'icon-add', handler:insert}
	];

var editIndex = undefined;
var typeName = [];
        
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
	EiCommunicator.send("CMIMExpenseType", "queryExpenseTypeByProjectId", info, querycallback);
});

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取费用类型失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        rows.push({
	        	f_expenseTypeId:row[metas.f_expenseTypeId.pos],
	        	f_expenseTypeName: row[metas.f_expenseTypeName.pos],
	        	f_expenseTypeDesc: row[metas.f_expenseTypeDesc.pos]
	        });
	        
	        typeName.push(row[metas.f_expenseTypeName.pos]);
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取费用类型失败');
	}
}

function updateRow(index, isediting){
	$('#datagrid').datagrid('getRows')[index].editing = isediting;
	$('#datagrid').datagrid('updateRow', {index: index, row:{}});
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

function saverow() {
    if (editIndex == undefined) { 
    	return;
    }
    $('#datagrid').datagrid('endEdit', editIndex);
    var row = $('#datagrid').datagrid('getRows')[editIndex];
    
    if (row.f_expenseTypeName == "") {
		$.messager.alert('错误','费用类型名称不能为空');
		$('#datagrid').datagrid('beginEdit', editIndex);
		return;
	}
	
	var rows = $('#datagrid').datagrid('getRows');
	for (var i=0; i < rows.length; i++) {
		if ((rows[i].f_expenseTypeName == row.f_expenseTypeName) && (i != editIndex)) {
			$.messager.alert('错误','费用类型名称不能重复');
			$('#datagrid').datagrid('beginEdit', editIndex);
			return;
		}
	}
	
	var info = new EiInfo();
   	info.set("f_expenseTypeName", row.f_expenseTypeName);
	info.set("f_expenseTypeDesc", row.f_expenseTypeDesc);

	if (actionType == ActionType.Adding) {
		info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMExpenseType", "insertExpenseType", info, savecallback);
	}
	else if (actionType == ActionType.Editing) {
		info.set("f_expenseTypeId", row.f_expenseTypeId);
		EiCommunicator.send("CMIMExpenseType", "updateExpenseType", info, savecallback);
	}
}

savecallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存费用类型信息失败');
			$('#datagrid').datagrid('beginEdit', editIndex);
			return;
		}
		
		updateRow(editIndex, false);
		actionType = ActionType.Normal;
		
		var info = new EiInfo();
		info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMExpenseType", "queryExpenseTypeByProjectId", info, querycallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存费用类型信息失败');
		$('#datagrid').datagrid('beginEdit', editIndex);
	}
}

function cancelrow() {
	if (editIndex == undefined) {
		return;
	}
	if (actionType == ActionType.Adding) {
		$('#datagrid').datagrid('deleteRow', editIndex);
		editIndex = undefined;
	}
	else if (actionType == ActionType.Editing) {
		$('#datagrid').datagrid('cancelEdit', editIndex);
		updateRow(editIndex, false);
		editIndex = undefined;
	}
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
	if (actionType != ActionType.Normal) {
		return;
	}
	$.messager.confirm('警告','是否删除选中数据？',
		function (r) {
			if (!r) {
				return;
			}
			var row = $('#datagrid').datagrid('getRows')[index];
			var info = new EiInfo();
			info.set("f_expenseTypeId", row.f_expenseTypeId);
			EiCommunicator.send("CMIMExpenseType", "deleteExpenseType", info, deletecallback);
		});
}

deletecallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','删除费用类型信息失败');
			return;
		}
		var info = new EiInfo();
		info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMExpenseType", "queryExpenseTypeByProjectId", info, querycallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','删除费用类型信息失败');
	}
}