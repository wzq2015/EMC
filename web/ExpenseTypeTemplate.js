var toolbar1 = 
	[
		{ text:'增加', iconCls:'icon-add', handler:insert1},
		{ text:'清空', iconCls:'icon-cancel', handler:empty1 }
	];

var editIndex1 = undefined;
var typeName = [];
        
function actionformat1(val, row, index) {
	if (row.editing){
		var s = '<a href="javascript:void(0)" onclick="saverow1()">保存</a> ';
		var c = '<a href="javascript:void(0)" onclick="cancelrow1()">取消</a>';
		return s+c;
	} else {
		var e = '<a href="javascript:void(0)" onclick="editrow1(' + index.toString() + ')">编辑</a> ';
		var d = '<a href="javascript:void(0)" onclick="deleterow1(' + index.toString() + ')">删除</a>';
		return e+d;
	}
};

//$(function(){
//	actionType = ActionType.Normal;
//    var info = new EiInfo();
//    info.set("f_emcprojectId", currentProjectId);
//	EiCommunicator.send("CMIMExpenseType", "queryExpenseTypeByProjectId", info, querycallback);
//});

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

function updateRow1(index, isediting){
	$('#datagrid1').datagrid('getRows')[index].editing = isediting;
	$('#datagrid1').datagrid('updateRow', {index: index, row:{}});
}

function insert1() {
	if (actionType == ActionType.Normal) {
		$('#datagrid1').datagrid('appendRow',{});
		editIndex1 = $('#datagrid1').datagrid('getRows').length - 1;
		actionType = ActionType.Adding;
		updateRow1(editIndex1, true);
		$('#datagrid1').datagrid('selectRow', editIndex1).datagrid('beginEdit', editIndex1);
	}	
}

function empty1() {
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
				EiCommunicator.send("CMIMExpenseTypeTemplates", "emptyExpenseTypeTemplates", info, deletecallback1);
			}
		});
}

function saverow1() {
    if (editIndex1 == undefined) { 
    	return;
    }
    $('#datagrid1').datagrid('endEdit', editIndex1);
    var row = $('#datagrid1').datagrid('getRows')[editIndex1];
    
    if (row.f_expenseTypeName == "") {
		$.messager.alert('错误','费用类型模版名称不能为空');
		$('#datagrid1').datagrid('beginEdit', editIndex1);
		return;
	}
	
	var rows = $('#datagrid1').datagrid('getRows');
	for (var i=0; i < rows.length; i++) {
		if ((rows[i].f_expenseTypeName == row.f_expenseTypeName) && (i != editIndex1)) {
			$.messager.alert('错误','费用类型模版名称不能重复');
			$('#datagrid1').datagrid('beginEdit', editIndex1);
			return;
		}
	}
	
	var info = new EiInfo();
   	info.set("f_expenseTypeName", row.f_expenseTypeName);
	info.set("f_expenseTypeDesc", row.f_expenseTypeDesc);
	info.set("f_typeTemplateId", $('#f_typeTemplateId').val());

	if (actionType == ActionType.Adding) {
		EiCommunicator.send("CMIMExpenseTypeTemplates", "insertExpenseTypeTemplate", info, savecallback1);
	}else if (actionType == ActionType.Editing) {
		info.set("f_expensetypeTemplateId", row.f_expensetypeTemplateId);
		EiCommunicator.send("CMIMExpenseTypeTemplates", "updateExpenseTypeTemplate", info, savecallback1);
	}
}

savecallback1 = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存费用类型模版信息失败');
			$('#datagrid1').datagrid('beginEdit', editIndex1);
			return;
		}
		
		updateRow1(editIndex1, false);
		actionType = ActionType.Normal;
		
		var info = new EiInfo();
		info.set("f_typeTemplateId", $('#f_typeTemplateId').val());
		EiCommunicator.send("CMIMExpenseTypeTemplates", "queryExpenseTypeTemplatesByTypeTemplateId", info, queryExpenseTypeTemplatesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存费用类型模版信息失败');
		$('#datagrid1').datagrid('beginEdit', editIndex1);
	}
}

function cancelrow1() {
	if (editIndex1 == undefined) {
		return;
	}
	if (actionType == ActionType.Adding) {
		$('#datagrid1').datagrid('deleteRow', editIndex1);
		editIndex1 = undefined;
	}else if(actionType == ActionType.Editing) {
		$('#datagrid1').datagrid('cancelEdit', editIndex1);
		updateRow1(editIndex1, false);
		editIndex1 = undefined;
	}
	actionType = ActionType.Normal;
}

function editrow1(index) {
	if (actionType != ActionType.Normal) {
		return;
	}
	editIndex1 = index;
	updateRow1(editIndex1, true);
	actionType = ActionType.Editing;
	$('#datagrid1').datagrid('beginEdit', editIndex1);
}

function deleterow1(index) {
	if (actionType != ActionType.Normal) {
		return;
	}
	$.messager.confirm('警告','是否删除选中数据？',
		function (r) {
			if (!r) {
				return;
			}
			var row = $('#datagrid1').datagrid('getRows')[index];
			var info = new EiInfo();
			info.set("f_expensetypeTemplateId", row.f_expensetypeTemplateId);
			EiCommunicator.send("CMIMExpenseTypeTemplates", "deleteExpenseTypeTemplate", info, deletecallback1);
		});
}

deletecallback1 = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','删除费用类型模版信息失败');
			return;
		}
		var info = new EiInfo();
		info.set("f_typeTemplateId", $('#f_typeTemplateId').val());
		EiCommunicator.send("CMIMExpenseTypeTemplates", "queryExpenseTypeTemplatesByTypeTemplateId", info, queryExpenseTypeTemplatesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','删除费用类型模版信息失败');
	}
}