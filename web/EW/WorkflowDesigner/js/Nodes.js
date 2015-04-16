Editor.prototype.nodetypes = {
	Swimlane : {
		width : 910,
		height : 160,
		style : 'swimlane;horizontal=0;strokeWidth=1;strokeColor=#658AB1;fillColor=#CCE5FF;gradientColor=#FFFFFF;shadow=1;'
	},
	Start : {
		isBizNode: true,
		style : 'shape=mxgraph.bpmn.start;verticalLabelPosition=bottom;verticalAlign=top;strokeWidth=2;strokeColor=#62A92B;fillColor=#F4F5D6;gradientColor=#FFFFFF;shadow=1;'
	},
	End : {
		isBizNode: true,
		style : 'shape=mxgraph.bpmn.end;verticalLabelPosition=bottom;verticalAlign=top;strokeWidth=2;strokeColor=#8A151A;fillColor=#8A151A;gradientColor=#FFFFFF;shadow=1;'
	},
	Manual : {
		isBizNode: true,
		width : 100,
		height : 50,
		style : 'rounded=1;strokeWidth=2;strokeColor=#658AB1;fillColor=#CCE5FF;gradientColor=#FFFFFF;shadow=1;',
		createCell : function(value, x, y,w,h, id) {
			if (!x) x = 0;
			if (!y) y = 0;
			if (!w) w = this.width;
			if (!h) h = this.height;
			value.setAttribute('IsBizNode', 'true');
			var geo = new mxGeometry(x, y, w, h);
			var cell = new mxCell(value, geo, this.style);
			cell.vertex = true;
			if (id) cell.setId(id);
			geo = new mxGeometry(0, 0, 14, 14);
			geo.relative = true;
			geo.offset = new mxPoint(5, 5);
			var plus = new mxCell(null, geo, 'shape=actor;strokeColor=#ffffff;fillColor=#27aa2d;gradientColor=#65e96e;');
			plus.setVertex(true);
			plus.setConnectable(false);
			cell.insert(plus);
			return cell;
		}
	},
	Fork : {
		isBizNode: true,
		style : 'shape=mxgraph.bpmn.fork;verticalLabelPosition=bottom;verticalAlign=top;strokeWidth=2;strokeColor=#62A92B;fillColor=#F4F5D6;gradientColor=#FFFFFF;shadow=1;'	
	},
	Join : {
		isBizNode: true,
		style : 'shape=mxgraph.bpmn.join;verticalLabelPosition=bottom;verticalAlign=top;strokeWidth=2;strokeColor=#62A92B;fillColor=#F4F5D6;gradientColor=#FFFFFF;shadow=1;'	
	},
	SubProcess : {
		isBizNode: true,
		width : 100,
		height : 50,
		style : 'rounded=1;strokeWidth=2;strokeColor=#658AB1;fillColor=#CCE5FF;gradientColor=#FFFFFF;shadow=1;',
		createCell : function(value, x, y,w,h, id) {
			if (!x) x = 0;
			if (!y) y = 0;			
			if (!w) w = this.width;
			if (!h) h = this.height;
			value.setAttribute('IsBizNode', 'true');
			var geo = new mxGeometry(x, y, w, h);
			var cell = new mxCell(value, geo, this.style);
			cell.vertex = true;
			if (id) cell.setId(id);
			geo = new mxGeometry(0.5, 1, 14, 14);
			geo.relative = true;
			geo.offset = new mxPoint(-6, -12);
			var plus = new mxCell(null, geo, 'shape=plus;strokeColor=#ffffff;fillColor=#27aa2d;gradientColor=#65e96e;');
			plus.setVertex(true);
			plus.setConnectable(false);
			cell.insert(plus);
			return cell;
		}
	},
	Code : {
		isBizNode: true,
		width : 100,
		height : 50,
		style : 'rounded=1;strokeWidth=2;strokeColor=#658AB1;fillColor=#CCE5FF;gradientColor=#FFFFFF;shadow=1;',
		createCell : function(value, x, y,w,h, id) {
			if (!x) x = 0;
			if (!y) y = 0;			
			if (!w) w = this.width;
			if (!h) h = this.height;
			value.setAttribute('IsBizNode', 'true');
			var geo = new mxGeometry(x, y, w, h);
			var cell = new mxCell(value, geo, this.style);
			cell.vertex = true;
			if (id) cell.setId(id);
			geo = new mxGeometry(0, 0, 14, 14);
			geo.relative = true;
			geo.offset = new mxPoint(5, 5);
			var plus = new mxCell(null, geo, 'shape=tape;strokeColor=#ffffff;fillColor=#27aa2d;gradientColor=#65e96e;');
			plus.setVertex(true);
			plus.setConnectable(false);
			cell.insert(plus);
			return cell;
		}
	},
	CounterSignature : {
		isBizNode: true,
		width : 100,
		height : 50,
		style : 'rounded=1;strokeWidth=2;strokeColor=#658AB1;fillColor=#CCE5FF;gradientColor=#FFFFFF;shadow=1;',
		createCell : function(value, x, y,w,h, id) {
			if (!x) x = 0;
			if (!y) y = 0;
			if (!w) w = this.width;
			if (!h) h = this.height;
			value.setAttribute('IsBizNode', 'true');
			var geo = new mxGeometry(x, y, w, h);
			var cell = new mxCell(value, geo, this.style);
			cell.vertex = true;
			if (id) cell.setId(id);
			geo = new mxGeometry(0, 0, 14, 14);
			geo.relative = true;
			geo.offset = new mxPoint(5, 5);
			var plus = new mxCell(null, geo, 'shape=step;strokeColor=#ffffff;fillColor=#27aa2d;gradientColor=#65e96e;');
			plus.setVertex(true);
			plus.setConnectable(false);
			cell.insert(plus);
			return cell;
		}	
	}
}

for (nodetype in Editor.prototype.nodetypes) {
	if (!Editor.prototype.nodetypes[nodetype].width)
		Editor.prototype.nodetypes[nodetype].width = 50;
	if (!Editor.prototype.nodetypes[nodetype].height)
		Editor.prototype.nodetypes[nodetype].height = 50;
	if (!Editor.prototype.nodetypes[nodetype].createCell)
		Editor.prototype.nodetypes[nodetype].createCell = 
			function(value, x, y, w, h, id) {
				if (!x) x = 0;
				if (!y) y = 0;
				if (!w) w = this.width;
				if (!h) h = this.height;
				if (this.isBizNode)
					value.setAttribute('IsBizNode', 'true');
				var geo = new mxGeometry(x, y, w, h);
				var cell = new mxCell(value, geo, this.style);
				cell.vertex = true;
				if (id) cell.setId(id);
				return cell;
			};
}
