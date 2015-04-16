$(function() {
	info = new EiInfo();
	info.setByNodeObject(document.forms[0]);
	EiCommunicator.send('EDMD97', 'renderForm', info, {
		onSuccess : function(outInfo) {
			var html = outInfo.get('html');
			$('#dynform').append($(html));
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);	
});

function getFormEiInfo() {
	var info = new EiInfo();
	info.setByNodeObject(document.forms[0]);

	var grids = $.parseJSON($('#inqu_status-0-dataGrids').val());
	for (var i=0; i<grids.length; i++) {
		var gridId = 'ef_grid_' + grids[i];
		var grid = efform.getGrid(gridId);
		var block = new EiBlock(grid.getBlockData().getBlockMeta());
		efgrid.divFix.setRowsStatus(document.getElementById(gridId + '__grid_table'), true);
		efgrid._addSelectedData(block, grid);
		info.addBlock(block);
	}

	return info;
}

button_insert_onclick = function()
{
	if (!efvalidateForm(document.getElementById('EDMD97')))
		return;
	
	var info = getFormEiInfo();

	EiCommunicator.send('EDMD97', 'createNewForm', info, {
		onSuccess : function(outInfo) {
			var uuid = outInfo.get('uuid');
			alert(uuid);
			$('#inqu_status-0-dataId').val(uuid);
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);	
}

button_update_onclick = function()
{
	if (!efvalidateForm(document.getElementById('EDMD97')))
		return;
	
	var info = getFormEiInfo();

	EiCommunicator.send('EDMD97', 'updateFormData', info, {
		onSuccess : function(outInfo) {
			var count = outInfo.get('updateCount');
			if (count > 0)
				alert("更新成功！");
			else
				alert("更新失败！");
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);	
}
