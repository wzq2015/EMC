button_load_onclick = function()
{
	var formName = $('#inqu_status-0-formName').val();
	if (formName.trim().length == 0) {
		alert('表单名为空');
		return;
	}
	
	info = new EiInfo();
	info.set('formName', formName);
	EiCommunicator.send('EDMD96', 'renderDataGrid', info, {
		onSuccess : function(outInfo) {
			var html = outInfo.get('html');
			var region = $('#datagrid');
			region.empty();
			region.append($(html));

			var ef_region_result__buttonbar = new efbuttonbar();
			ef_region_result__buttonbar.buttonCount = 0;
			efregion.show("ef_region_result");
			ef_region_result__buttonbar.paint("ef_region_result__buttonbar");
			
			efgrid.submitInqu("ef_grid_result", "", "EDMD96", "query");			
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
}

button_new_onclick = function()
{
	var formName = $('#inqu_status-0-formName').val();
	if (formName.trim().length == 0) {
		alert('表单名为空');
		return;
	}

	var child = efform.openNewForm('EDMD97', "formName=" + formName);
	child.focus();
}