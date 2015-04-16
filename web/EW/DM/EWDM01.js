efform_onload = function() { 
	efregion.setTitle("ef_region_info", "报销审批信息(" + _getEi().get("divTitle") + ")");
	efregion.show("ef_region_info");
	}

function submit_onclick(){
	var info=new EiInfo();
	info.setByNode('ef_region_info');//将region中的数据塞入EiInfo中
	
	//获取下一个节点转移名称
	var next_transition=document.getElementById('next_transition').value;
	info.set("next_transition",next_transition);
	
	//获取审批意见，当流程开始的时候不存在审批意见，需要异常处理
	var approve_message="";
	if (document.getElementById('approve_message') != null) {
		approve_message=document.getElementById('approve_message').value;
	}
	info.set("approve_message",approve_message);
	
	//获取任务id
	var taskId=document.getElementById('taskId').value;
	info.set("taskId",taskId);
	
	//调用Service的submit方法
	EiCommunicator.send("EWDM01", "submit", info, null);
	
	//跳转到任务中心
	var end= window.location.href.lastIndexOf("efFormEname");
	window.location.href=window.location.href.substring(0,end)+"efFormEname=EWWI00";
}



