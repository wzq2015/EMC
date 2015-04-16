var graph = parent.getCurrentEditor().graph;
var rootCell = graph.getModel().getCell('0');
var settings = rootCell.value;

function create_block(blkid, columns) {
	var meta = new EiBlockMeta(blkid);
	for (var i=0; i<columns.length; i++) {
		var col = new EiColumn(columns[i][0]);
		col.descName = columns[i][1];
		meta.addMeta(col);
	}
	return new EiBlock(meta);
}

function fix_direct_load() {
	var info = _getEi();
	var blk = create_block('vars', [['name','名称'], ['type','类型'], 
	                                ['value','值'], ['description','描述']]);
	info.addBlock(blk);
	blk = create_block('events', [['type','触发类型'], ['class','触发方法'], ['description','描述']]);
	info.addBlock(blk);	
};

function extras2grid() {
	var extra = DomHelper.getChild(settings, 'Extras');
	if (extra == null)
		return;

	var blk;
	var ei = _getEi();
	var vars = extra.getElementsByTagName('Variable');
	if (vars.length > 0) {
		blk = ei.getBlock('vars');
		for (var i=0; i<vars.length; i++)
			blk.addRow([ 
			    vars[i].getAttribute('Name'),
				vars[i].getAttribute('Type'),
				vars[i].getAttribute('Value'),
				vars[i].getAttribute('Desc')
			]);
		efgrid.getGridObject('ef_grid_vars').refresh();
	}
	
	var events = extra.getElementsByTagName('Event');
	if (events.length > 0) {
		blk = ei.getBlock('events');
		for (var i=0; i<events.length; i++) {
			var handler = events[i].getElementsByTagName('EventListener')[0];
			blk.addRow([ 
			    events[i].getAttribute('Type'),
			    handler.getAttribute('class'),
			    handler.getAttribute('Description')
			]);
		}
		efgrid.getGridObject('ef_grid_events').refresh();
	}
}

function grid2extras() {
	var vars = null, events = null, grid, block;
	
	grid = efgrid.getGridObject('ef_grid_vars');
	block = new EiBlock(grid.getBlockData().getBlockMeta());
	efgrid.addAllData(block, grid);
	if (block.rows.length > 0) {
		vars = DomHelper.createElement('ProcessExtraParameters');
		for (var i=0; i<block.rows.length; i++) {
			var v = DomHelper.createElement('Variable');
			vars.appendChild(v);
			v.setAttribute('Name', block.getCell(i, 'name'));
			v.setAttribute('Type', block.getCell(i, 'type'));
			v.setAttribute('Value', block.getCell(i, 'value'));
			v.setAttribute('Desc', block.getCell(i, 'description'));
		}
	}

	grid = efgrid.getGridObject('ef_grid_events');
	block = new EiBlock(grid.getBlockData().getBlockMeta());
	efgrid.addAllData(block, grid);
	if (block.rows.length > 0) {
		events = DomHelper.createElement('Events');
		for (var i=0; i<block.rows.length; i++) {
			var e = DomHelper.createElement('Event');
			events.appendChild(e);
			e.setAttribute('Type', block.getCell(i, 'type'));
			var l = DomHelper.createElement('EventListener');
			e.appendChild(l);
			l.setAttribute('class', block.getCell(i, 'class'));
			l.setAttribute('Description', block.getCell(i, 'description'));
		}
	}

	var extra = DomHelper.getChild(settings, 'Extras');
	if (extra == null)
		if (events == null && vars == null)
			return;
		else {
			extra = DomHelper.createElement('Extras');
			settings.appendChild(extra);
		}
	
	function updateNode(parent, childName, node) {
		var oldChild = DomHelper.getChild(parent, childName);
		if (node == null && oldChild != null)
			parent.removeChild(oldChild);
		else if (node != null && oldChild == null)
			parent.appendChild(node);
		else if (node != null && oldChild != null) {
			parent.replaceChild(node, oldChild);			
		}
	}
	updateNode(extra, 'ProcessExtraParameters', vars);
	updateNode(extra, 'Events', events);

	if (!DomHelper.hasChildElement(extra))
		settings.removeChild(extra);
}

efform_onload = function() {	
	efform.hideFormHead();
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	$('input#basic-name').val(settings.getAttribute('Name'));
	$('input#basic-displayName').val(settings.getAttribute('DisplayName'));
	$('input#basic-description').val(settings.getAttribute('Description'));
	$('input#basic-author').val(settings.getAttribute('Author'));
	
	$('input#version').val(settings.getAttribute('Version'));
	$('input#deployTime').val(settings.getAttribute('DeployTime'));
	
	$('input').mouseenter(function(event){
		$(this).focus();
	});

	extras2grid();
};

function ecapseNull(value) {
	return value == 'null' ? 'NULL' : value;
}

function button_confirm_onclick() {
	if (!efvalidateForm(document.getElementById('EW0102'))) 
		return;

	var displayName = $('input#basic-displayName').val().trim();
	var name = $('input#basic-name').val().trim();
	
	settings.setAttribute('Name', ecapseNull(name));
	settings.setAttribute('DisplayName', ecapseNull(displayName));
	settings.setAttribute('Description', ecapseNull($('input#basic-description').val().trim()));
	settings.setAttribute('Author', ecapseNull($('input#basic-author').val().trim()));
	grid2extras();

	graph.getModel().beginUpdate();
	graph.getModel().setValue(rootCell, settings);
	graph.getModel().endUpdate();
	
	parent.updateTabTitle(settings.getAttribute('Id'), displayName ? displayName : name);
	parent.closeDialog('EW0102');
}

function button_cancel_onclick() {
	parent.closeDialog('EW0102');
}
