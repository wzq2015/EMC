var curActivitySetting = null;

efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	var basicAttrRegion = $('#ef_region_cdPart');
	$('#id', basicAttrRegion)
			.attr('value', parent.tempSelectedPart.getAttribute('Name'));
	$('#name', basicAttrRegion).attr('value',
			parent.tempSelectedPart.getAttribute('DisplayName'));
	$('#tableName', basicAttrRegion)
			.attr('value', $('TableName ', $(parent.tempSelectedPart)).text());
	$('#rule', basicAttrRegion)
			.attr('value', $('Rule', $(parent.tempSelectedPart)).text());
	$('#type', basicAttrRegion)
			.attr('value', $('Type', $(parent.tempSelectedPart)).text());
			
	var editor=parent.getCurrentEditor();
	curActivitySetting = new ManualActivitySetting(editor);	
	
	var basicAttrInputs = $('#ef_region_cdPart');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
	
}




function button_confirm_onclick() {
	curActivitySetting.actPartsSetting.finishCustomizeDatasetEdit();
			
	parent.closeDialog('EW0124');
}

function button_cancel_onclick() {
	parent.closeDialog('EW0124');
}
