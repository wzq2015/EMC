var map;
var _addNewControl, _dragFeature;
var _selectedFeature = null; 
var _projectLayer;

OpenLayers.Util.onImageLoadErrorColor = "transparent";

OpenLayers.Control.OverRejet = OpenLayers.Class(
	OpenLayers.Control, 
	{
        layer: null,
        defaultHandlerOptions: {
			'delay': 2000,
			'pixelTolerance': 2,
			'stopMove': false
		},
		initialize: function(layer, options) {
			this.layer = layer;
			this.handlerOptions = OpenLayers.Util.extend(
				{}, this.defaultHandlerOptions);
					
			OpenLayers.Control.prototype.initialize.apply(
				this, arguments
			);

			this.handlers = {
				feature: new OpenLayers.Handler.Feature(
					this,
					this.layer,
					{
						'over': this.over,
						'out' : this.out
					},
					{}
				)};
		},
		draw: function() { return false; },
		activate: function() { this.handlers.feature.activate(); },
		deactivate: function() { this.handlers.feature.deactivate(); },
		over: function(feature) { onSelectedProject(feature); },
		out: function(feature) { onUnselectedProject(feature); }
	});

$(function() { 
	init(); 
});

function mbtilesURL (bounds) {
	var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    return this.url+"?z="+z+"&x="+x+"&y="+((1 << z) - y - 1);
}

function zoomendEvent(event) {
	var level = map.getZoom();
	if (level < 7) {
		for (var i = 0; i < _projectLayer.features.length; ++i) {
			_projectLayer.features[i].attributes.isSmallIcon = 1;
			changeFeatureIcon(_projectLayer.features[i]);
		}
	}
	else {
		for (var i = 0; i < _projectLayer.features.length; ++i) {
			_projectLayer.features[i].attributes.isSmallIcon = 0;
			changeFeatureIcon(_projectLayer.features[i]);
		}
	}
}
                
function init() {
	getTreeData();
		
    map = new OpenLayers.Map('map',	{
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar({zoomWorldIcon:true}),
                new OpenLayers.Control.LayerSwitcher({'ascending':false}),
                new OpenLayers.Control.Scale(),
                new OpenLayers.Control.ScaleLine(),
                new OpenLayers.Control.MousePosition(),
                new OpenLayers.Control.OverviewMap(),
                new OpenLayers.Control.KeyboardDefaults()
            ],
            projection: "EPSG:900913",
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            units: "m",
			numZoomLevels: 15,
			eventListeners: {
				"zoomend": zoomendEvent
			}
	    });
	        
    var mbTilesLayer = new OpenLayers.Layer.TMS("Local MBTiles File", _wmsUrl, {
    	getURL: mbtilesURL,
        attribution: "",
        transitionEffect: "resize",
        isBaseLayer: true,
        opacity: 1
    });
	
    map.addLayer(mbTilesLayer);
	
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers; 
	
    _projectLayer = new OpenLayers.Layer.Vector("项目图层", {
        styleMap: defaultStyleMap,
        isBaseLayer: false,
        rendererOptions: {yOrdering: true},
        renderers: renderer
    });
    map.addLayer(_projectLayer);
    
    var highlightCtrl = new OpenLayers.Control.OverRejet(_projectLayer);
    map.addControl(highlightCtrl);
    highlightCtrl.activate();
    
    var _selectControl = new OpenLayers.Control.SelectFeature(_projectLayer, { 
    	clickout: true,
    	toggle: true,
    	multiple:false
    });         
    map.addControl(_selectControl);
    
	var handler = new OpenLayers.Handler.Click(
	    _selectControl,
	    {
	        click: function(evt) {
	            enterProject();
	        },
	        dblclick: function(evt) {}
	    }, 
	    {
	    	delay: 150,
	        single: true,
	        double: true,
	        stopDouble: true,
	        stopSingle: true
	    }
	);
    handler.activate();
    map.setCenter(new OpenLayers.LonLat(parseFloat(_gisCenterLon), parseFloat(_gisCenterLat)), parseInt(_gisDefaultZoom));
    getAllProjects();
    window.setInterval(onRefreshDataAndStatus, 10000);
}

var projectId = undefined;
var projectName = undefined;
var initPage = undefined;
var projectPreName = undefined;

function onSelectedProject(feature) {
	if (feature == null)
		return;
	_selectedFeature = feature;
	changeFeatureIcon(feature);
			
	var status = '项目状态：';
	if (feature.isAlarm) {
		status += '报警';
	} else {
		status += '正常';
	}
	
	projectId = feature.id;
	projectName = feature.attributes.projectName;
	projectPreName = feature.attributes.projectPreName;
	initPage = feature.attributes.initPage;
	
	var myPage = '<div style="background:#FFF; color:#000";>'
		+ '<font size=\"3px\" face=\"monospace\">'
		+ '<h2 style=\"margin-bottom: 0px;margin-top: 4px; color:#7093DB\">' + projectName + '</h2>'
		+ '<hr size=\"1\" width=\"100%\" color=\"A8A8A8\" border=\"1\">'
		+ '<table>'
		+ '<tr><td>'
		+ '<a><img src="img/pic.png" width="83" height="110"></img></a>'
		+ '</td><td>' 
		+ '项目单位：' + feature.attributes.projectCompany
		+ '<br>建设日期：' + feature.attributes.constructDate
		+ '<br>投产日期：' + feature.attributes.commissioningDate
		+ '<br>项目周期：' + feature.attributes.startDate + '~' + feature.attributes.endDate
		+ '<br>' + status
		+ '<br>(点击进入项目)'
		+ '</td></tr></table>'
		+ '</div>';

    var popup = new OpenLayers.Popup.FramedCloud("popup",
        OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
        null, myPage, null, true, onPopupClose);

    popup.autoSize = true;
    popup.maxSize = new OpenLayers.Size(640, 480);
    popup.fixedRelativePosition = true;
    feature.popup = popup;
    map.addPopup(popup);
}

function onUnselectedProject(feature) {
	if (feature == null)
		return;
		
	_selectedFeature = null;
	changeFeatureIcon(feature);

	map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
    _projectLayer.redraw();
}

function enterProject() {
	if (_selectedFeature == null) {
		return;
	}
	var info = new EiInfo();
	info.set("projectId", projectId);
	info.set("projectName", projectName);
	info.set("projectPreName", projectPreName);
	info.set("initPage", initPage);
	EiCommunicator.send("CMIMEmcproject", "changeProject", info, changeProjectCallback);
}

changeProjectCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-2") {
			$.messager.alert('警告','没有进入该项目的权限');
			return;
		}
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','进入项目失败');
			return;
		}
		window.parent.setPageType('monitor');
		window.parent.setProjectName(projectName);
	},
    onFail : function(eMsg){
		$.messager.alert('错误','进入项目失败');
	}
}

function onPopupClose(evt) {
	onUnselectedProject(_selectedFeature);
}

function changeFeatureIcon(fe) {
	if (fe.attributes.isSmallIcon == 1) {
		if ((fe.isAlarm) && (fe.isHighlighted)) {
			fe.layer.drawFeature(fe, 'smallAlarmHighlight');
		}
		else if ((fe.isAlarm) && (!fe.isHighlighted)) {
			fe.layer.drawFeature(fe, 'smallAlarm');
		}
		else if ((!fe.isAlarm) && (fe.isHighlighted)) {
			fe.layer.drawFeature(fe, 'smallHighlight');
		}
		else {
			fe.layer.drawFeature(fe, 'smallDefault');
		}
	}
	else {
		if ((fe.isAlarm) && (fe.isHighlighted)) {
			fe.layer.drawFeature(fe, 'alarmHighlight');
		}
		else if ((fe.isAlarm) && (!fe.isHighlighted)) {
			fe.layer.drawFeature(fe, 'alarm');
		}
		else if ((!fe.isAlarm) && (fe.isHighlighted)) {
			fe.layer.drawFeature(fe, 'highlight');
		}
		else {
			fe.layer.drawFeature(fe, 'default');
		}
	}
}

function getAllProjects() {
	var info = new EiInfo();
	EiCommunicator.send("CMIMEmcproject", "queryEmcprojects", info, getProjectsCallback);
}

getProjectsCallback = {
	onSuccess : function(eiInfo) {
		addAllProjectsToMap(eiInfo);
	},
	onFail : function(eMsg){
		alert("获取数据失败："+eMsg);
	}
}

function addAllProjectsToMap(eiInfo) {
	var features = [];
	
	var resultBlock = eiInfo.blocks.result;
	var metas = resultBlock.meta.metas;
	for (var i = 0; i < resultBlock.rows.length; ++i) {
		var row = resultBlock.rows[i];		
        var proj = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(parseFloat(row[metas.f_emcprojectLon.pos]), parseFloat(row[metas.f_emcprojectLat.pos])));
		proj.id = row[metas.f_emcprojectId.pos].toString();
		proj.isAlarm = false;
		proj.attributes = 
					{
						projectId: row[metas.f_emcprojectId.pos],
		                projectName: row[metas.f_emcprojectName.pos],
		                projectPreName: row[metas.f_emcprojectDesc.pos],
		                projectCompany: row[metas.f_emcprojectConstructunit.pos],
		                constructDate: row[metas.f_emcprojectConstructdate.pos],
		                commissioningDate: row[metas.f_emcprojectCommissioningdate.pos],
		                startDate: row[metas.f_emcprojectStartdate.pos],
		                endDate: row[metas.f_emcprojectEnddate.pos],
		                initPage: row[metas.f_emcprojectInitpage.pos],
		                status: 0,
		                projectFontColor: 'green',
		                align: "cm",
		                xOffset: 0,
		                yOffset: 25,
		                isSmallIcon: 1
		            };
        features.push(proj);
   	}
  	_projectLayer.addFeatures(features);  
   	_selectedFeature = null;
   	onRefreshDataAndStatus();
   	for (var i = 0; i < _projectLayer.features.length; ++i) {
		changeFeatureIcon(_projectLayer.features[i]);
	}
}  

function onRefreshDataAndStatus() {
	var info = new EiInfo();
	EiCommunicator.send("CMIMAlarm", "GetAlarmProjects", info, onRefreshDataAndStatusCallback);
}

onRefreshDataAndStatusCallback = {
	onSuccess : function(eiInfo) {
		showProjectsStatuses(eiInfo);
	},
	onFail : function(eMsg){
		alert("获取数据失败："+eMsg);
		return;
	}
} 

function showProjectsStatuses(eiInfo) {
	var str = eiInfo.get('alarmproject');
	if ((str == null) || (str == undefined) || (str == "")) {
		return;
	}
	
	var alarmProjectArray = str.split(',');
	for (var i=0; i<_projectLayer.features.length; i++) {
		var bFind = false;
		for (var j=0; j<alarmProjectArray.length; j++) {
			if (_projectLayer.features[i].attributes.projectPreName == alarmProjectArray[j]) {
				_projectLayer.features[i].isAlarm = true;
				bFind = true;
				break;
			}
		}
		if (!bFind) {
			_projectLayer.features[i].isAlarm = false;
		}
	}
	
	for (var i = 0; i < _projectLayer.features.length; ++i) {
		changeFeatureIcon(_projectLayer.features[i]);
	}
}

function getTreeData() {
	GetTreeRootNode(getTreeRootNodeCallback);
}

function getTreeRootNodeCallback(rootNode) {
	$('#tt').tree('loadData', rootNode);
	$('#tt').tree({ onClick: function(node) {
								if (node.attributes.type == 'emcproject')
									centerProject(node.attributes.logicid);
   							 }
   				  });
}

function centerProject(id) {
	for (var i=0; i<_projectLayer.features.length; ++i) {
		_projectLayer.features[i].isHighlighted = false;
		if (_projectLayer.features[i].id == id) {
			_projectLayer.features[i].isHighlighted = true;
			map.setCenter(new OpenLayers.LonLat(_projectLayer.features[i].geometry.x, _projectLayer.features[i].geometry.y));
		}
		changeFeatureIcon(_projectLayer.features[i]);
	}
}