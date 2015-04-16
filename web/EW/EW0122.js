var curActivitySetting=null;
efform_onload = function() {
	efform.hideFormHead();	
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	var subProcessName=null;
	 if(parent.tempSelectedPart!=null){
     subProcessName= parent.tempSelectedPart.getAttribute("SubProcessName");
    }
	var editor=parent.getCurrentEditor();
	curActivitySetting = new CounterSignatureActivitySetting(editor);
	curActivitySetting.renderSubProcessOfCounterSignatureActivity(subProcessName);
	
	var basicAttrInputs = $('#processBasicAttr');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}

function button_confirm_onclick() {
     curActivitySetting.finishStartParameterAdd();
     parent.tempSelectedPart=null;
	 parent.closeDialog('EW0122');	
}

function button_cancel_onclick() {
	parent.tempSelectedPart=null;
	parent.closeDialog('EW0122');
}

 