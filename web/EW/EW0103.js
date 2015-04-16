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
	var blk = create_block('datafields', [['id','ID'], ['value','值'], 
	                                      ['name', '名称'], ['type', '类型'], 
	                                      ['description', '描述']]);
	info.addBlock(blk);
};

function extras2grid() {
	var blk;
	var ei = _getEi();
	var fields = settings.getElementsByTagName('DataField');
	if (fields.length > 0) {
		blk = ei.getBlock('datafields');
		for (var i=0; i<fields.length; i++)
			blk.addRow([ 
			    fields[i].getAttribute('Id'),
			    fields[i].getAttribute('InitialValue'),
			    fields[i].getAttribute('Name'),
			    fields[i].getAttribute('DataType'),
			    fields[i].getAttribute('Description')
			]);
		efgrid.getGridObject('ef_grid_datafields').refresh();
	}
}

function grid2extras() {
	var fields = null, grid, block;
	
	grid = efgrid.getGridObject('ef_grid_datafields');
	block = new EiBlock(grid.getBlockData().getBlockMeta());
	efgrid.addAllData(block, grid);
		var fields = DomHelper.getChild(settings, 'DataFields', true);
		DomHelper.clear(fields);
		for (var i=0; i<block.rows.length; i++) {
			var field = DomHelper.createElement('DataField');
			fields.appendChild(field);
			var uuid = block.getCell(i, 'id').trim();
			if (uuid == null || uuid.length == 0)
				uuid = Math.uuid();
			field.setAttribute('Id', uuid);
			field.setAttribute('InitialValue', block.getCell(i, 'value'));
			
			field.setAttribute('Name', block.getCell(i, 'name'));
			field.setAttribute('DataType', block.getCell(i, 'type'));
			field.setAttribute('Description', block.getCell(i, 'description'));
		}
}

efform_onload = function() {
	efform.hideFormHead();
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	extras2grid();
}

function button_confirm_onclick() {
	grid2extras();

	graph.getModel().beginUpdate();
	graph.getModel().setValue(rootCell, settings);
	graph.getModel().endUpdate();

	parent.closeDialog('EW0103');
}

function button_cancel_onclick() {
	parent.closeDialog('EW0103');
}
