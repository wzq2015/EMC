var mapConfig;
var _addNewControl, _dragFeature, _selectControl;
var _selectedFeature = null;
var _projectLayer;

OpenLayers.Util.onImageLoadErrorColor = "transparent";

OpenLayers.Control.OverRejet = OpenLayers.Class(
	OpenLayers.Control, 
	{
        layer: null,
        defaultHandlerOptions: {
			'delay': 2000,
			'pixelTolerance': 1,
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
		over: function(feature) { },
		out: function(feature) { }
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
	var level = mapConfig.getZoom();
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

function init(){
	getTreeData();
		
    mapConfig = new OpenLayers.Map('mapConfig',	{
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
    
    mapConfig.addLayer(mbTilesLayer);
	
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers; 
	
    _projectLayer = new OpenLayers.Layer.Vector("项目图层", {
        styleMap: defaultStyleMap,
        isBaseLayer: false,
        rendererOptions: {yOrdering: true},
        renderers: renderer
    });
    mapConfig.addLayer(_projectLayer); 
    
    _dragFeature = new OpenLayers.Control.DragFeature(_projectLayer); 
    _dragFeature.onComplete = onDrageComplete;          
    mapConfig.addControl(_dragFeature);
    _dragFeature.activate();
    
    var highlightCtrl = new OpenLayers.Control.OverRejet(_projectLayer);
	        
    mapConfig.addControl(highlightCtrl);
    highlightCtrl.activate();
    
    _selectControl = new OpenLayers.Control.SelectFeature(_projectLayer, { 
    	clickout: true,
    	toggle: true,
    	multiple:false
    });         
    mapConfig.addControl(_selectControl);
    
	var handler = new OpenLayers.Handler.Click(
	    _selectControl,
	    {
	        click: function(evt) { },
	        dblclick: function(evt) { }
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
    mapConfig.setCenter(new OpenLayers.LonLat(parseFloat(_gisCenterLon), parseFloat(_gisCenterLat)), parseInt(_gisDefaultZoom));  
    getAllProjects();
}

function onDrageComplete(feature, pixel) {
	$.messager.confirm('确认', '是否移动项目到此新位置？', 
			function(r) {
				if (r) {
					var lonLat = mapConfig.getLonLatFromPixel(pixel);
					var info = new EiInfo();
					info.set('id', feature.id);
					info.set('lon', lonLat.lon.toString());
					info.set('lat', lonLat.lat.toString());
					EiCommunicator.send("CMIMEmcproject", "updatePos", info, updatePosCallback);
				}
			});
}

updatePosCallback = {
	onSuccess : function(eiInfo) { },
	onFail : function(eMsg){
		alert("更新项目位置失败："+eMsg);
	}
}

function changeFeatureIcon(fe) {	
	if (fe.attributes.isSmallIcon == 1) {
		if (fe.isHighlighted) {
			fe.layer.drawFeature(fe, 'smallHighlight');
		}
		else {
			fe.layer.drawFeature(fe, 'smallDefault');
		}
	}
	else {
		if (fe.isHighlighted) {
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
		
		var projectColor = 'green';
		var projectName = row[metas.f_emcprojectName.pos];
		
		var latLon = mapConfig.getCenter();
		
		if ((row[metas.f_emcprojectLon.pos] == '0') && (row[metas.f_emcprojectLat.pos] == '0')) {
			projectName += '(未定位)';
			projectColor = 'red';
		} 
		else {
			latLon.lon = parseFloat(row[metas.f_emcprojectLon.pos]);
			latLon.lat = parseFloat(row[metas.f_emcprojectLat.pos]);
		}
				    	
        var proj = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(latLon.lon, latLon.lat));

		proj.id = row[metas.f_emcprojectId.pos].toString();
		proj.attributes = {
							projectId: row[metas.f_emcprojectId.pos],
		                	projectName: projectName,
		                	projectFontColor: projectColor,
		                	align: "cm",
		                	xOffset: 0,
		                	yOffset: 40,
		                	isSmallIcon: 1
		            	  };
		proj.data = row;
        features.push(proj);
   	}
  	_projectLayer.addFeatures(features);  
   	_selectedFeature = null;
   	for (var i = 0; i < _projectLayer.features.length; ++i) {
		changeFeatureIcon(_projectLayer.features[i]);
	}
}

function getTreeData() {
	GetTreeRootNode(getTreeRootNodeCallback);
}

function getTreeRootNodeCallback(rootNode) {
	$('#tt').tree('loadData', rootNode);
	$('#tt').tree({ 
						onClick: 
						function(node) {
							if (node.attributes.type == 'emcproject')
								centerProject(node.attributes.logicid);
   						}
   				  });
}

function centerProject(id) {
	for (var i = 0; i < _projectLayer.features.length; ++i) {
		_projectLayer.features[i].isHighlighted = false;
		if (_projectLayer.features[i].id == id) {
			_projectLayer.features[i].isHighlighted = true;
			mapConfig.setCenter(new OpenLayers.LonLat(_projectLayer.features[i].geometry.x, _projectLayer.features[i].geometry.y));
		}
		changeFeatureIcon(_projectLayer.features[i]);
	}
}