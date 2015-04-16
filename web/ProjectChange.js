var areaNodes = [];
var companyNodes = [];
var projectNodes = [];

$(function() {
	$.messager.defaults = { ok: "确定", cancel: "取消" };
    var info = new EiInfo();
	EiCommunicator.send("CMIMArea", "queryAreas", info, queryAreasCallback);
});

queryAreasCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取区域信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					id: row[metas.f_areaId.pos],
	    					text: row[metas.f_areaName.pos],
	    					attributes: {type: 'area', logicid: row[metas.f_areaId.pos]},
	    					children:[],
	    					iconCls:'icon-add'
	    			   };
	        areaNodes.push(node);
	    }
	    var info = new EiInfo();
	    EiCommunicator.send("CMIMCompany", "queryCompanies", info, queryCompaniesCallback);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取区域信息失败');
	}
}

queryCompaniesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取公司信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for(var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					id: row[metas.f_companyId.pos],
	    					text: row[metas.f_companyName.pos],
	    					attributes: {type: 'company', logicid: row[metas.f_companyId.pos], parentId:row[metas.f_areaId.pos], parentCompanyId: row[metas.f_parentCompanyId.pos]},
	    					children: [],
	    					iconCls:'icon-add',
	    			   };
	    	companyNodes.push(node);
	    	
	    	for (var j=0; j<areaNodes.length; j++) {
	    		if ((areaNodes[j].attributes.logicid == node.attributes.parentId) && (node.attributes.parentCompanyId == -1)) {
	    			areaNodes[j].children.push(node);
	    		}
	    	}
	    }
	    
	    for (var i=0; i<companyNodes.length; i++) {
	    	if (companyNodes[i].attributes.parentCompanyId == -1) {
	    		continue;
	    	}
	    	for (var j=0; j<companyNodes.length; j++) {
	    		if (companyNodes[i].attributes.parentCompanyId == companyNodes[j].attributes.logicid) {
	    			companyNodes[j].children.push(companyNodes[i]);
	    		}
	    	}
	    }
	    var info = new EiInfo();
	    EiCommunicator.send("CMIMEmcproject", "queryEmcprojects", info, queryProjectsCallback);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取公司信息失败');
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
	    for(var i=0; i<resultBlock.rows.length; i++) {
	    	var row = eiInfo.blocks.result.rows[i];
	    	var node = {
	    					id: row[metas.f_emcprojectId.pos],
	    					text: row[metas.f_emcprojectName.pos],
	    					attributes: {type: 'emcproject', logicid: row[metas.f_emcprojectId.pos], parentId: row[metas.f_companyId.pos], 
	    					    initPage: row[metas.f_emcprojectInitpage.pos], projectPreName: row[metas.f_emcprojectDesc.pos]}
	    			   };
	    	
	    	projectNodes.push(node);
	    	for (var j=0; j<companyNodes.length; j++) {
	    		if (companyNodes[j].attributes.logicid == node.attributes.parentId) {
	    			companyNodes[j].children.push(node);
	    		}
	    	}
	    }
	    
	    var rootNode = [{id:0, text:"根节点", attributes: {type: 'root'}, children:areaNodes, iconCls:'icon-add'}];
		$('#tree').tree('loadData', rootNode);
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

var projectName = '';

function ChangeProject(){
	var node = $('#tree').tree('getSelected');
	if ((node == undefined) || (node == null)) {
		$.messager.alert('提示','请选择要切换到的项目');
		return;
	}
	if (node.attributes.type != 'emcproject') {
		$.messager.alert('提示','选择的节点不是项目节点');
		return;
	}
	projectName = node.text;
	
	var info = new EiInfo();
	info.set("projectId", node.id);
	info.set("projectName", node.text);
	info.set("initPage", node.attributes.initPage);
	info.set("projectPreName", node.attributes.projectPreName);
	
	EiCommunicator.send("CMIMEmcproject", "changeProject", info, changeProjectCallback);
}

changeProjectCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-2") {
			$.messager.alert('警告','没有进入该项目的权限');
			return;
		}
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','切换项目失败');
			return;
		}
		window.parent.setPageType('monitor');
		window.parent.setProjectName(projectName);
		parent.$.fn.colorbox.close();
	},
    onFail : function(eMsg){
		$.messager.alert('错误','切换项目失败');
	}
}