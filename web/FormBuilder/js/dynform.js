function dynform_init($holder) {
	__eiInfo.setByNodeObject(document.forms[0]);
	EiCommunicator.send('EDMD90', 'wfFormInitialize', __eiInfo, {
		onSuccess : function(outInfo) {
			__eiInfo = outInfo;
			$holder.append($(outInfo.get('__html')));
			outInfo.set('__html', null);
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
}

function dynform_eiinfo() {
	var info = new EiInfo();
	info.setByNodeObject(document.forms[0]);

	var grids = __eiInfo.get('__grids');
	if (grids == null || grids.length == 0)
		return info;
	grids = grids.split(',');
	for (var i=0; i<grids.length; i++) {
		var gridId = 'ef_grid_' + grids[i];
		var grid = efform.getGrid(gridId);
		var block = new EiBlock(grid.getBlockData().getBlockMeta());
		efgrid.addAllData(block, grid);
		info.addBlock(block);
	}
	return info;
}

/**
* 将表格选中的数据加入块中. iplat.ui.grid.js
* 
* @private
* @param {EiBlock}
*            block : 数据块对象.
* @param {efgrid}
*            grid : 表格对象.
* 
* @return void.
*/
efgrid.addAllData = function (block, grid) {
    var blockData = grid.getBlockData();
    var colCount = grid.getColCount(TYPE_DATA) + grid.getColCount(TYPE_FIX)
			+ grid.getInvisibleColCount();

    for (var i = 0; i < grid.getRowCount(); i++) {
    	var row = blockData.getRows()[i];
    	for (var j = 0; j < row.length; j++) {
    		row[j] = efutils.trimString(row[j]);
    		if (row[j] == "")
    			row[j] = " ";
    	}
        block.addRow(row);
    }
};

function dynform_rm_row(button) {
	var pos = efgrid.getCellPos(button);
	var grid = efgrid.getEfGridNode(button).efgrid;
	grid.removeRow(pos.row);
	grid.refresh();
}
