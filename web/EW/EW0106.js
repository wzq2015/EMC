var curActivitySetting=null;
efform_onload = function() {
	efform.hideFormHead();	
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new CounterSignatureActivitySetting(editor);
	curActivitySetting.renderCounterSignatureActSetting();	
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}


function button_confirm_onclick() {
	if(curActivitySetting.inputValidate()){
     curActivitySetting.updateCounterSignatureActSetting();
	 parent.closeDialog('EW0106');	
   }
   else
   	curActivitySetting.popTipsDialog("请按照提示信息修改");
	
}

function button_cancel_onclick() {
	 parent.closeDialog('EW0106');
}

function button_edit_onclick(button) {
	var pos = efgrid.getCellPos(button);
	var grid = efgrid.getEfGridNode(button).efgrid;
	var block = grid.eiinfo.getBlock("parametersResult");
	var subProcessName=block.getCell(pos.row, 'subProcessName');
	curActivitySetting.editStartParameterOfCounterSignatureActSetting(subProcessName);	
} 

 