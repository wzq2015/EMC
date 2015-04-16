var toolbar = 
	[
		{ text:'增加', iconCls:'icon-add', handler:insert},
	];
		
function actionformat(val, row, index) {
	if (row.editing) {
		var s = '<a href="javascript:void(0)" onclick="saverow()">保存</a> ';
		var c = '<a href="javascript:void(0)" onclick="cancelrow()">取消</a>';
		return s+c;
	} else {
		var e = '<a href="javascript:void(0)" onclick="editrow(' + index.toString() + ')">编辑</a> ';
		var d = '<a href="javascript:void(0)" onclick="deleterow(' + index.toString() + ')">删除</a>';
		return e+d;
	}
};

reportTypeArray = [];
reportTypeArray.push({'text':'分享周期', 'value':'0'});
reportTypeArray.push({'text':'年报', 'value':'1'});
reportTypeArray.push({'text':'季报', 'value':'2'});
reportTypeArray.push({'text':'月报', 'value':'3'});
reportTypeArray.push({'text':'日报', 'value':'4'});


$(function() {
	actionType = ActionType.Normal;
    RefreshReportGrid();
});

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取报表模板信息失败');
			return;
		}
			
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        rows.push({
	        	f_reportTemplateId: row[metas.f_reportTemplateId.pos],
	        	f_reportTemplateName: row[metas.f_reportTemplateName.pos],
	            f_reportTemplateDesc: row[metas.f_reportTemplateDesc.pos],
	            f_reportTemplateTypeName: getTypeNameById(row[metas.f_reportTemplateType.pos]),
	            f_reportTemplatePath: row[metas.f_reportTemplatePath.pos],
	            f_reportTemplateAutogenerate: row[metas.f_reportTemplateAutogenerate.pos],
	            f_reportTemplateModifiedtime: row[metas.f_reportTemplateModifiedtime.pos]
	        });
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取报表模板信息失败');
	}
}

function getTypeNameById(id) {
	for (var i=0; i<reportTypeArray.length; i++) {
		if (reportTypeArray[i].value == id) {
			return reportTypeArray[i].text;
		}
	}
	return "";
}

function getIdByTypeName(typeName) {
	for (var i=0; i<reportTypeArray.length; i++) {
		if (reportTypeArray[i].text == typeName) {
			return reportTypeArray[i].value;
		}
	}
	return '0';
}

function updateRow(index, isediting) {
	$('#datagrid').datagrid('getRows')[index].editing = isediting;
	$('#datagrid').datagrid('updateRow',{ index: index, row:{} });
}

function insert() {
	$('#datagrid').datagrid('appendRow',{});
	editIndex = $('#datagrid').datagrid('getRows').length - 1;
	actionType = ActionType.Adding;
	updateRow(editIndex, true);
	$('#datagrid').datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
}

function saverow() {
    if (editIndex == undefined) { 
    	return;
    }
	$('#datagrid').datagrid('endEdit', editIndex);
	var row = $('#datagrid').datagrid('getRows')[editIndex];
	
	if (row.f_reportTemplateName == "") {
		$.messager.alert('警告','请输入报表模板名称');
		$('#datagrid').datagrid('beginEdit', editIndex);
		return;
	}
	
	if (row.f_reportTemplateTypeName == "") {
		$.messager.alert('警告','请输入报表模板类型');
		$('#datagrid').datagrid('beginEdit', editIndex);
		return;
	}
	
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
   	info.set("f_reportTemplateName", row.f_reportTemplateName);
	info.set("f_reportTemplateDesc", row.f_reportTemplateDesc);
	info.set("f_reportTemplateType", getIdByTypeName(row.f_reportTemplateTypeName));
	info.set("f_reportTemplatePath", row.f_reportTemplatePath);
	info.set("f_reportTemplateAutogenerate", row.f_reportTemplateAutogenerate);

	if (actionType == ActionType.Adding) {
		EiCommunicator.send("CMIMReportTemplate", "insertReportTemplate", info, savecallback);
	}
	else if (actionType == ActionType.Editing) {
		info.set("f_reportTemplateId", row.f_reportTemplateId);
		EiCommunicator.send("CMIMReportTemplate", "updateReportTemplate", info, savecallback);
	}
}

savecallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存报表模板信息失败');
			$('#datagrid').datagrid('beginEdit', editIndex);
			return;
		}
		
		updateRow(editIndex, false);
		actionType = ActionType.Normal;
		RefreshReportGrid();
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','保存报表模板信息失败');
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
	$.messager.confirm('确认', '是否确认删除报表模板？', 
			function(r) {
				if (r) {
					var row = $('#datagrid').datagrid('getRows')[index];
					var info = new EiInfo();
					info.set("f_reportTemplateId", row.f_reportTemplateId);
					EiCommunicator.send("CMIMReportTemplate", "deleteReportTemplate", info, deletecallback);
				}
			});
}

deletecallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','删除报表模板信息失败');
			return;
		}
	
		RefreshReportGrid();
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','删除报表模板信息失败');
	}
}

function RefreshReportGrid() {
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMReportTemplate", "queryReportTemplateByProjectId", info, querycallback);
}