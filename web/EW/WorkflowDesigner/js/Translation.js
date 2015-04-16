Editor.prototype.setWorkflowXml = function(rootNode) {
	function getRootLayer(model) {
		return model.getRoot().getChildAt(0);
	}
	function xml2edge(graph, node) {
		var model = graph.getModel();
		var value = node.cloneNode(true);
		var geo = new mxGeometry();
		geo.relative = true;
		
		var id = value.getAttribute('Id');
		var sourceId = value.getAttribute('BeginActivityId');
		var targetId = value.getAttribute('To');
		
		var style = value.getAttribute('LineType');
		if (style == 'Line' || style == 'Polyline') { // the silverlight designer
			var x1, x2, y1, y2; // label line
			if (style == 'Polyline') { // try to go through the mid-turnpoint
				x1 = parseInt(value.getAttribute('TurnPoint1X'));
				y1 = parseInt(value.getAttribute('TurnPoint1Y'));
				x2 = parseInt(value.getAttribute('TurnPoint2X'));
				y2 = parseInt(value.getAttribute('TurnPoint2Y'));
				geo.points = [new mxPoint(Math.round((x1 + x2) / 2), Math.round((y1 + y2) / 2))];
			}
			else {
				x1 = parseInt(value.getAttribute('BeginPointX'));
				y1 = parseInt(value.getAttribute('BeginPointY'));
				x2 = parseInt(value.getAttribute('EndPointX'));
				y2 = parseInt(value.getAttribute('EndPointY'));
			}
			// calculate the offset, may be improved here
			var len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			geo.offset = new mxPoint(Math.round(20 * (y2 - y1) / len), 
									 Math.round(10 * (x1 - x2) / len));
			style = null;
		}
		else { // the new js designer
			var x, y;
			x = value.getAttribute('BeginPointX');
			if (x && x.length > 0) {
				y = value.getAttribute('BeginPointY');
				geo.setTerminalPoint(new mxPoint(parseInt(x), parseInt(y)), true);
			}
			x = value.getAttribute('EndPointX');
			if (x && x.length > 0) {
				y = value.getAttribute('EndPointY');
				geo.setTerminalPoint(
						new mxPoint(parseInt(x), parseInt(y)), false);
			}
			x = value.getAttribute('TurnPoint1X');
			if (x && x.length > 0) {
				y = value.getAttribute('TurnPoint1Y');
				geo.points = [new mxPoint(parseInt(x), parseInt(y))];
			}
			x = value.getAttribute('OffsetX');
			if (x && x.length > 0) {
				y = value.getAttribute('OffsetY');
				geo.offset = new mxPoint(parseInt(x), parseInt(y));
			}
		}
		
		var attrs = ['Id', 'BeginActivityId', 'To', 'LineType', 
	                  'BeginPointX', 'BeginPointY', 
	                  'EndPointX', 'EndPointY',
	                  'TurnPoint1X', 'TurnPoint1Y', 
	                  'TurnPoint2X', 'TurnPoint2Y', 
	                  'OffsetX', 'OffsetY', 'ZIndex'];
		for (var i=0; i<attrs.length; i++)
			value.removeAttribute(attrs[i]);

		value.setAttribute('IsBizNode', 'true');
		var cell = new mxCell(value, geo, style);
		cell.setId(id);
		cell.setEdge(true);
		if (sourceId.length > 0)
			cell.setTerminal(model.getCell(sourceId), true);
		if (targetId.length > 0)
			cell.setTerminal(model.getCell(targetId), false);
		model.add(getRootLayer(model), cell);
	}
	
	function xml2vertex(graph, node) {
		var nodeName = node.nodeName;
		var nodetype = this.nodetypes[nodeName];
		
		var model = graph.getModel();
		var value = node.cloneNode(true);
		var id = value.getAttribute('Id');
		var x = parseInt(value.getAttribute('PositionX'));
		var y = parseInt(value.getAttribute('PositionY'));
		value.removeAttribute('Id');
		value.removeAttribute('PositionX');
		value.removeAttribute('PositionY');
		var width = 50, height = 50;  // the old editor's defaults
		var extra = DomHelper.getChild(value, 'Extras');
		if (extra != null) {
			if (extra.getAttribute('Width') != null) {
				width = parseFloat(extra.getAttribute('Width'));
				extra.removeAttribute('Width');
			}
			if (extra.getAttribute('Height') != null) {
				height = parseFloat(extra.getAttribute('Height'));
				extra.removeAttribute('Height');
			}
		}
		
		var cell = nodetype.createCell(value, x, y, width, height, id);
		model.add(getRootLayer(model), cell);
	}
	
	var model = this.graph.getModel();
	model.clear();
	this.graph.configure();
	
	if (rootNode.nodeName == 'mxGraphModel') { // the new backend
		this.setGraphXml(rootNode);
		this.modified = false;
		this.undoManager.clear();
		return;
	}
	
	var value = rootNode.cloneNode(true);
	var transitions = new Array();
	var i, j, k;
	
	for (i=value.childNodes.length - 1; i>=0; i--) {
		var node = value.childNodes[i];
		if (node.nodeName == 'Activities') {
			var activities = node.childNodes;
			for (j=0; j<activities.length; j++) {
				if (activities[j].nodeType != Node.ELEMENT_NODE)
					continue;
				// remove sub-nodes first
				var subtrans = activities[j].childNodes;
				for (k=subtrans.length - 1; k>=0; k--) {
					if (activities[j].nodeType != Node.ELEMENT_NODE) {
						activities[j].removeChild(subtrans[k]);
						continue;
					}
					if (subtrans[k].nodeName == 'Transition') {
						subtrans[k].setAttribute("BeginActivityId", activities[j].getAttribute("Id"));
						transitions.push(subtrans[k]);
						activities[j].removeChild(subtrans[k]);
					}
				}
				xml2vertex.call(this, this.graph, activities[j]);
			}
			value.removeChild(node);
			continue;
		}
		if (node.nodeName == 'Transitions') {
			for (j=0; j<node.childNodes.length; j++) {
				if (node.childNodes[j].nodeType != Node.ELEMENT_NODE)
					continue;
				var transition = node.childNodes[j];
				transition.setAttribute("BeginActivityId", '');
				transitions.push(transition);
			}
			value.removeChild(node);
			continue;
		}
		if (node.nodeName == 'DataFields' || node.nodeName == 'Extras')
			continue;
		value.removeChild(node); // remove #text node		
	}
	for (i=0; i<transitions.length; i++)
		xml2edge.call(this, this.graph, transitions[i]);
	
	model.getRoot().value = value;
	this.updateGraphComponents();
	this.modified = false;
	this.undoManager.clear();
	//this.resetHistory();
}

Editor.prototype.getWorkflowXml = function() {
	var workflow = this.getGraphXml();
	workflow.setAttribute('Width', this.graph.pageFormat.width);
	workflow.setAttribute('Height', this.graph.pageFormat.height);
	return workflow;
	
	
	/*
	function edge2xml(edge) {
		var wfNode = edge.cloneValue();
		var geo = edge.getGeometry();
		var term = geo.getTerminalPoint(true);
		var style = edge.getStyle();
		if (term) {
			wfNode.setAttribute('BeginPointX', term.x);
			wfNode.setAttribute('BeginPointY', term.y);
		}
		term = geo.getTerminalPoint(false);
		if (term) {
			wfNode.setAttribute('EndPointX', term.x);
			wfNode.setAttribute('EndPointY', term.y);
		}

		if (style && style.length > 0)
			wfNode.setAttribute('LineType', style);
		if (geo.points && geo.points.length >0)
			for (var i=0; i<geo.points.length; i++) {
				wfNode.setAttribute('TurnPoint'+ (i+1) + 'X', geo.points[i].x);
				wfNode.setAttribute('TurnPoint'+ (i+1) + 'Y', geo.points[i].y);
			}

		if (geo.offset) {
			wfNode.setAttribute('OffsetX', geo.offset.x);
			wfNode.setAttribute('OffsetY', geo.offset.y);
		}
			
		wfNode.setAttribute("Id", edge.id);
		wfNode.setAttribute("To", edge.target ? edge.target.id : '');
		return wfNode;
	}
	
	function vertex2xml(cell) {
		var wfNode = cell.cloneValue();
		wfNode.setAttribute('Id', cell.getId());
		var geo = cell.getGeometry();
		wfNode.setAttribute('PositionX', geo.x);
		wfNode.setAttribute('PositionY', geo.y);
		var extra = DomHelper.getChild(wfNode, 'Extras', true);
		extra.setAttribute('Width', geo.width);
		extra.setAttribute('Height', geo.height);
		
		var edges = cell.edges;
		if (!edges)
			return wfNode;
			
		for (var i=0; i<edges.length; i++)
			if (edges[i].source === cell)
				wfNode.appendChild(edge2xml(edges[i]));
		return wfNode;
	}
	
	var workflow = this.graph.getModel().getCell('0').value.cloneNode(true);
	var activities = DomHelper.createElement('Activities');
	var transitions = DomHelper.createElement('Transitions');
	workflow.appendChild(activities);
	workflow.appendChild(transitions);
	var cells = this.graph.getChildCells();
	
	for (var i=0; i<cells.length; i++) {
		var cell = cells[i];
		if (cell.vertex && cell.value)
			activities.appendChild(vertex2xml.call(this, cell));
		if (cell.edge && !cell.source && cell.value) {
			transitions.appendChild(edge2xml(cell));
		}
	};
		
	return workflow;
	*/
}

/**
* Constructs a new edit file dialog.
*/
function SaveDevelDialog(editorUi)
{
	var div = document.createElement('div');
	div.style.textAlign = 'right';
	var textarea = document.createElement('textarea');
	textarea.style.width = '600px';
	textarea.style.height = '374px';
	
	textarea.value = mxUtils.getPrettyXml(editorUi.editor.getWorkflowXml());
	div.appendChild(textarea);

	div.appendChild(mxUtils.button("重绘", function() {
		editorUi.editor.setWorkflowXml(editorUi.editor.getWorkflowXml());
		editorUi.hideDialog();
	}));
	
	div.appendChild(mxUtils.button(mxResources.get('close'), function() {
		editorUi.hideDialog();
	}));
	
	this.container = div;
};
