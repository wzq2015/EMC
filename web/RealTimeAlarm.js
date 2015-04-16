$(function() {
	queryRealTimeAlarm();
	window.setInterval(queryRealTimeAlarm, 3000);
});

var status = '0';

function queryRealTimeAlarm() {
	var info = new EiInfo();
	EiCommunicator.send("CMIMAlarm", "GetRealAlarms", info, querycallback);
}

function actionformat(val, row, index) {
	if (row.fdIsConfirm == "否") {
		var s = '<a href="javascript:void(0)" onclick="confirmAlarm(\''+ row.fdServerName + '\',\'' + row.fdAlarmId + '\')">确认</a> ';
		return s;
	}
};

querycallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			if (status == '0') {
				$.messager.alert('错误','获取实时报警数据失败');
				status = '-1';
			}
			return;
		}
			
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var rows = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	if (row[metas.ConfirmStatus.pos] == "true") {
	    		row[metas.ConfirmStatus.pos] = "是";
	    	}
	    	else {
	    		row[metas.ConfirmStatus.pos] = "否";
	    	}
	    	if (row[metas.ResumeStatus.pos] == "true") {
	    		row[metas.ResumeStatus.pos] = "是";
	    	}
	    	else {
	    		row[metas.ResumeStatus.pos] = "否";
	    	}
	        rows.push({
	        	fdOccurtime: row[metas.OccurTime.pos],
	            fdConfirmtime: row[metas.ConfirmTime.pos],
	            fdRecovertime: row[metas.ResumeTime.pos],
	            fdTagname: row[metas.TagName.pos],
	            fdAlarmtype: row[metas.AlarmType.pos],
	            fdConfirmperson: row[metas.Confirmer.pos],
	            fdTagdesp: row[metas.Desc.pos],
	            fdPriority: row[metas.Priority.pos],
	            fdCurvalue: row[metas.TagValue.pos],
	            fdIsConfirm: row[metas.ConfirmStatus.pos],
	            fdIsRecover: row[metas.ResumeStatus.pos],
	            fdAlarmId: row[metas.AlarmID.pos],
	            fdServerName: row[metas.ServerName.pos]
	        });
	    }
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', rows);
		status = '0';
	},
	onFail : function(eMsg) {
		$.messager.alert('错误','获取实时报警数据失败');
	}
}

function confirmAlarm(serverName, alarmId) {
	var info = new EiInfo();
	info.set("serverName", serverName);
	info.set("alarmId", alarmId);
	EiCommunicator.send("CMIMAlarm", "ConfirmAlarm", info, confirmcallback);
}

confirmcallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','确认报警失败');
			return;
		}
		if (eiInfo.get("confirmResult") == "-1") {
			$.messager.alert('错误','确认报警失败');
			return;
		}
		queryRealTimeAlarm();
	},
	onFail : function(eMsg) {
		$.messager.alert('错误','确认报警失败');
	}
}

function commonPagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function') {
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}