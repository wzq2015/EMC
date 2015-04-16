var actionType = ActionType.Normal;

function actionformat(val, row, index) {
	if (row.editing){
		var s = '<a href="javascript:void(0)" onclick="saverow()">保存</a> ';
		var c = '<a href="javascript:void(0)" onclick="cancelrow()">取消</a>';
		return s+c;
	} 
	else {
		var e = '<a href="javascript:void(0)" onclick="editrow(' + index.toString() + ')">编辑</a> ';
		return e;
	}
};

$(function() {
    var info = new EiInfo();
    info.set("f_emcprojectId", currentProjectId);
	EiCommunicator.send("CMIMEmcproject", "queryEmcprojectById", info, querycallback);
});

querycallback = {
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
	    var projectCycleType = row[metas.f_emcprojectCycletype.pos];
	    var startDate = row[metas.f_emcprojectStartdate.pos];
	    var endDate = row[metas.f_emcprojectEnddate.pos];
	    $('#lblProjectDesc').html('当前项目的周期为' + projectCycleType + '个月，起始时间为' + startDate +
	    '，结束时间为' + endDate + '，共有' + totalCycleNo + '个结算周期');

	    var info = new EiInfo();
		info.set("f_emcprojectId", currentProjectId);
		EiCommunicator.send("CMIMEmcprojectCycle", "queryEmcprojectCycleById", info, queryProjectCycleCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

queryProjectCycleCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目周期信息失败');
			return;
		}
		var rowsProjectCycle = [];
	    for (var i=0; i<eiInfo.blocks.result.rows.length; i++) {
	    	var resultBlock = eiInfo.blocks.result;
			var metas = resultBlock.meta.metas;
	    	var row = resultBlock.rows[i];
	    	if (row[metas.f_emcprojectCycleCycleindex.pos] == '0') {
	    		continue;
	    	}
	        rowsProjectCycle.push({
	        	f_emcprojectCycleId: row[metas.f_emcprojectCycleId.pos],
	            f_emcprojectCycleIndex: row[metas.f_emcprojectCycleCycleindex.pos],
	            f_emcprojectCycleStarttime: row[metas.f_emcprojectCycleStarttime.pos],
	            f_emcprojectCycleEndtime: row[metas.f_emcprojectCycleEndtime.pos]
	        });
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rowsProjectCycle);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目周期信息失败');
	}
}

function editrow(index) {
	if (actionType != ActionType.Normal){
		return;
	}
	editIndex = index;
	updateRow(editIndex, true);
	actionType = ActionType.Editing;
	$('#datagrid').datagrid('beginEdit', editIndex);
}

function updateRow(index, isediting){
	$('#datagrid').datagrid('getRows')[index].editing = isediting;
	$('#datagrid').datagrid('updateRow',{
		index: index,
		row:{}
	});
}

function saverow() {
	$('#datagrid').datagrid('endEdit', editIndex);
	
	var info = new EiInfo();
	var row = $('#datagrid').datagrid('getRows')[editIndex];
	
	info.set("f_emcprojectCycleId", row.f_emcprojectCycleId);
	info.set("f_emcprojectCycleStarttime", row.f_emcprojectCycleStarttime);
	info.set("f_emcprojectCycleEndtime", row.f_emcprojectCycleEndtime);

	EiCommunicator.send("CMIMEmcprojectCycle", "updateEmcprojectCycle", info, saveCallback);
}

saveCallback = {
	onSuccess : function(eiInfo){
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存项目周期信息失败');
			return;
		}
		updateRow(editIndex, false);
		actionType = ActionType.Normal;
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存项目周期信息失败');
	}
}

function cancelrow() {
	$('#datagrid').datagrid('cancelEdit', editIndex);
	updateRow(editIndex, false);
	actionType = ActionType.Normal;
}