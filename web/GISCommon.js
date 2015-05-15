var areaNodes = [];
var companyNodes = [];
var projectNodes = [];
var callback = undefined;
var SHADOW_Z_INDEX = 10;
var MARKER_Z_INDEX = 11;
var ALARM_Z_INDEX = 12;
var projectTypesNodes = [];

function GetTreeRootNode() {
	var info = new EiInfo();
	EiCommunicator.send("CMIMArea", "queryAreas", info, queryAreasCallback);
}

function GetTreeRootNodeByProjectType() {
	var info = new EiInfo();
	EiCommunicator.send("CMIMProjectTypes", "queryProjectTypes", info, queryProjectTypesCallback);
}

queryProjectTypesCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目类型信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
	    for (var i=0; i<resultBlock.rows.length; i++) {
	    	var row = resultBlock.rows[i];
	    	var node = {
	    					id: row[metas.f_projectTypeId.pos],
	    					text: row[metas.f_projectTypeName.pos],
	    					attributes: {type:'projectType', logicid:row[metas.f_projectTypeId.pos]},
	    					children:[],
	    					iconCls:'icon-add'
	    			   };
	        projectTypesNodes.push(node);
	    }
	    
	    var info = new EiInfo();
	    EiCommunicator.send("CMIMEmcproject", "queryEmcprojects", info, queryProjectCallback);
	},
    onFail : function(eMsg){ $.messager.alert('错误','获取项目类型信息失败'); }
}

queryProjectCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
    	for(var i=0; i<resultBlock.rows.length; i++) {
	    	var row = eiInfo.blocks.result.rows[i];
	    	var node = {
	    					id: row[metas.f_emcprojectId.pos],
	    					text: row[metas.f_emcprojectName.pos],
	    					attributes: {type: 'emcproject', logicid: row[metas.f_emcprojectId.pos], parentId: row[metas.f_emcprojectType.pos]},
	    			   };
	    	
	    	projectNodes.push(node);
	    	for (var j=0; j<projectTypesNodes.length; j++) {
	    		if (projectTypesNodes[j].attributes.logicid == node.attributes.parentId) {
	    			projectTypesNodes[j].children.push(node);
	    		}
	    	}
	    }
    	getTreeDataByProjectType();
	},
    onFail : function(eMsg){
		$.messager.alert('错误','获取项目失败');
	}
}

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
	    					attributes: {type:'area', logicid:row[metas.f_areaId.pos]},
	    					children:[],
	    					iconCls:'icon-add'
	    			   };
	        areaNodes.push(node);
	    }
	    var info = new EiInfo();
	    EiCommunicator.send("CMIMCompany", "queryCompanies", info, queryCompaniesCallback);
	},
    onFail : function(eMsg){ $.messager.alert('错误','获取区域信息失败'); }
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
	    					attributes: {type: 'emcproject', logicid: row[metas.f_emcprojectId.pos], parentId: row[metas.f_companyId.pos]},
	    			   };
	    	
	    	projectNodes.push(node);
	    	for (var j=0; j<companyNodes.length; j++) {
	    		if (companyNodes[j].attributes.logicid == node.attributes.parentId) {
	    			companyNodes[j].children.push(node);
	    		}
	    	}
	    }
	    getTreeData();
	},
    onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

var defaultStyleMap = new OpenLayers.StyleMap({
        	"default": new OpenLayers.Style({
	            externalGraphic: "img/pic1.png",
	            backgroundGraphic: "",
	            backgroundXOffset: 0,
	            backgroundYOffset: 0,
	            graphicZIndex: MARKER_Z_INDEX,
	            backgroundGraphicZIndex: SHADOW_Z_INDEX,
	            pointRadius: 20,
                label : "${projectName}",
                fontColor: "${projectFontColor}",
                fontSize: "13px",
                fontFamily: "Courier New, monospace",
                fontWeight: "bold",
                labelAlign: "${align}",
                labelXOffset: "${xOffset}",
                labelYOffset: "${yOffset}",
                labelOutlineColor: "white",
                labelOutlineWidth: 3
	        }),
        	"alarm": new OpenLayers.Style({
	            externalGraphic: "img/alarm.png",
	            graphicZIndex: ALARM_Z_INDEX,
                fontColor: "red"
	        }),
	        "highlight": new OpenLayers.Style({
	            pointRadius: 30
	        }),
	        "alarmHighlight": new OpenLayers.Style({
	           	externalGraphic: "img/alarm.png",
	            graphicZIndex: ALARM_Z_INDEX,
                fontColor: "red",
                pointRadius: 30
	        }),
	       	"smallDefault": new OpenLayers.Style({
	            externalGraphic: "OpenLayers/img/marker-green.png",
	            pointRadius: 15,
	            label : "${projectId}"
	        }),
	        "smallAlarm": new OpenLayers.Style({
	            externalGraphic: "OpenLayers/img/marker.png",
	            graphicZIndex: ALARM_Z_INDEX,
	            pointRadius: 15,
	            label : "${projectId}"
	        }),
	        "smallHighlight": new OpenLayers.Style({
	            externalGraphic: "OpenLayers/img/marker-green.png",
	            pointRadius: 20,
	            label : "${projectId}"
	        }),
	        "smallAlarmHighlight": new OpenLayers.Style({
	            externalGraphic: "OpenLayers/img/marker.png",
	            graphicZIndex: ALARM_Z_INDEX,
	            pointRadius: 20,
	            label : "${projectId}"
	        })
});