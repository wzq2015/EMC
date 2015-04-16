var toolbar = 
	[
		{ text:'编辑授权信息', iconCls:'icon-edit', handler:edit },
		{ text:'保存授权信息', iconCls:'icon-save', handler:save },
	];

var projectAuthItems = [];

$(function(){
    var info = new EiInfo();
	EiCommunicator.send("CMIMUser", "queryUsers", info, queryCallback);
});

queryCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取用户信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var userNodes = [];
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					id: i,
	    					text: row[metas.userId.pos],
	    					iconCls:'icon-person',
	    					children:[]
	    			   };
	        userNodes.push(node);
	    }
	    rootNode = {id:0, text:"用户列表", children:userNodes, iconCls:'icon-add'};
	    $('#tree').tree('loadData', [rootNode]);
	    $('#tree').tree({onClick: onTreeClick});
	    var info = new EiInfo();
	    EiCommunicator.send("CMIMEmcproject", "queryEmcprojects", info, queryProjectsCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取用户信息失败');
	}
}

queryProjectsCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		projectAuthItems = [];
	    for(var i=0; i<resultBlock.rows.length; i++) {
	    	var row = eiInfo.blocks.result.rows[i];
	    	var item = {
	    					f_emcprojectId: row[metas.f_emcprojectId.pos],
	    					f_emcprojectName: row[metas.f_emcprojectName.pos],
	    					isSelected: '否'
	    			   };
	    	projectAuthItems.push(item);
	    }
	    $('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', projectAuthItems);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

function onTreeClick(node) {
	var username = node.text
	var info = new EiInfo();
	info.set("UserName", username);
	EiCommunicator.send("CMIMUser", "queryProjectAuthInfos", info, queryProjectAuthInfosCallback);
}

queryProjectAuthInfosCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取授权信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var authInfoArray = [];
		for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var authInfo = 
	    			{
	    				f_username: row[metas.f_username.pos],
	    				f_emcprojectId: row[metas.f_emcprojectId.pos]
	    			};
	        authInfoArray.push(authInfo);
	    }
	    
		for (var i=0; i<projectAuthItems.length; i++) {
			var projectId = projectAuthItems[i].f_emcprojectId;
			var isFind = false;
			for (var j=0; j<authInfoArray.length; j++) {
				if (authInfoArray[j].f_emcprojectId == projectId) {
					isFind = true;
					break;
				}
			}
			if (isFind == true) {
				projectAuthItems[i].isSelected = "是";
			}
			else {
				projectAuthItems[i].isSelected = "否";
			}
		}
		$('#datagrid').datagrid({loadFilter:commonPagerFilter}).datagrid('loadData', projectAuthItems);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取授权信息失败');
	}
}

function edit() {
	for (var i=0; i<projectAuthItems.length; i++) {
		$('#datagrid').datagrid('beginEdit', i);
	}
}

function save() {
	var authedProjectIdArray = []
	for (var i=0; i<projectAuthItems.length; i++) {
		$('#datagrid').datagrid('endEdit', i);
		var row = $('#datagrid').datagrid('getRows')[i];
		if (row.isSelected == "是") {
			authedProjectIdArray.push(row.f_emcprojectId);
		}
	}
	var authedProjectIds = authedProjectIdArray.join(",");
	var username = $('#tree').tree('getSelected').text;
	var info = new EiInfo();
	info.set("AuthedProjectIds", authedProjectIds);
	info.set("UserName", username);
	EiCommunicator.send("CMIMUser", "saveProjectAuthInfos", info, savecallback);
}

savecallback = {
	onSuccess : function(eiInfo){
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','保存授权信息失败');
			for (var i=0; i<projectAuthItems.length; i++) {
				$('#datagrid').datagrid('beginEdit', i);
			}
			return;
		}
	},
    onFail : function(eMsg){
		$.messager.alert('错误','保存授权信息失败');
		for (var i=0; i<projectAuthItems.length; i++) {
			$('#datagrid').datagrid('beginEdit', i);
		}
	}
}