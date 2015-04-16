var pageNumber = 1;
var pageSize = 10;
var startTime = '';
var endTime = '';
var tagName = '';

$(function() {
	$('#datagrid').datagrid('getPager').pagination({
		onSelectPage:function(number, size){
			pageNumber = number;
			pageSize = size;
		   	RefreshHisAlarm();
		}
	});
	queryHisAlarm();
});

function queryHisAlarm() {
	pageNumber = 1;
	pageSize = 10;
	startTime = $('#dateStartTime').datetimebox('getValue');
	endTime = $('#dateEndTime').datetimebox('getValue');
	tagName = $('#txtTagName').val();
	RefreshHisAlarm();
}

function RefreshHisAlarm() {
	var info = new EiInfo();
    info.set("pageNumber", pageNumber);
    info.set("pageSize", pageSize);
   	info.set("startTime", startTime);
    info.set("endTime", endTime);
    info.set("tagName", tagName);
    EiCommunicator.send("CMIMHisAlarm", "queryHisAlarmsByPage", info, querycallback);
}

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取历史报警数据失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        rows.push({
	        	fdOccurtime: row[metas.fdOccurtime.pos],
	        	fdConfirmtime: row[metas.fdConfirmtime.pos],
	        	fdRecovertime: row[metas.fdRecovertime.pos],
	        	fdTagname: row[metas.fdTagname.pos],
	        	fdAlarmtype: row[metas.fdAlarmtype.pos],
	        	fdConfirmperson: row[metas.fdConfirmperson.pos],
	        	fdTagdesp: row[metas.fdTagdesp.pos],
	        	fdPriority: row[metas.fdPriority.pos],
	        	fdCurvalue: row[metas.fdCurvalue.pos],
	        	fdEgu: row[metas.fdEgu.pos],
	        	fdStatus: row[metas.fdStatus.pos]
	        });
	    }
		$('#datagrid').datagrid('loadData', rows);
		
		var info = new EiInfo();
	    info.set("startTime", startTime);
    	info.set("endTime", endTime);
    	info.set("tagName", tagName);
	    EiCommunicator.send("CMIMHisAlarm", "countHisAlarms", info, countCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取历史报警数据失败');
	}
}

countCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取历史报警数据失败');
			return;
		}
        var count = eiInfo.get("count");
		$('#datagrid').datagrid('getPager').pagination({
			showRefresh: false,
			total: count, 
			pageNumber: pageNumber,
			pageSize: pageSize
		});
	},
	onFail : function(eMsg){
		$.messager.alert('错误','获取历史报警数据失败');
	}
}