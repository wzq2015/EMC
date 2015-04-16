var pageNumber = 1;
var pageSize = 10;
var startTime = '';
var endTime = '';

$(function() {
	$('#datagrid').datagrid('getPager').pagination({
		onSelectPage:function(number, size){
			pageNumber = number;
			pageSize = size;
		   	RefreshSystemLog();
		}
	});
	querySystemLog();
});

function querySystemLog() {
	pageNumber = 1;
	pageSize = 10;
	startTime = $('#dateStartTime').datetimebox('getValue');
	endTime = $('#dateEndTime').datetimebox('getValue');
	RefreshSystemLog();
}

function RefreshSystemLog() {
	var info = new EiInfo();
    info.set("pageNumber", pageNumber);
    info.set("pageSize", pageSize);
   	info.set("startTime", startTime);
    info.set("endTime", endTime);
    info.set("f_emcprojectId", currentProjectId);
    EiCommunicator.send("CMIMQuerySystemLog", "querySystemLogByProjectIdAndPage", info, querycallback);
}

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取系统日志数据失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	        rows.push({
	        	f_system_log_time: row[metas.f_systemLogTime.pos],
	        	f_system_log_level: row[metas.f_systemLogLevel.pos],
	        	f_system_log_content: row[metas.f_systemLogContent.pos]
	        });
	    }
		$('#datagrid').datagrid('loadData', rows);
		
		var info = new EiInfo();
	    info.set("f_emcprojectId", currentProjectId);
	    info.set("startTime", startTime);
    	info.set("endTime", endTime);
	    EiCommunicator.send("CMIMQuerySystemLog", "countByProjectId", info, countCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取系统日志数据失败');
	}
}

countCallback = {
	onSuccess : function(eiInfo) {		
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取系统日志数据失败');
			return;
		}
        var count = eiInfo.get("logCount");
		$('#datagrid').datagrid('getPager').pagination({
			showRefresh: false,
			total: count, 
			pageNumber: pageNumber,
			pageSize: pageSize
		});
	},
	onFail : function(eMsg){
		$.messager.alert('错误','获取系统日志数据失败');
	}
}