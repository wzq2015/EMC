var curTransitionSetting=null;
efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	var editor=parent.getCurrentEditor();
	curTransitionSetting = new TransitionSetting(editor);
	curTransitionSetting.renderBasicAttr();
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}

function button_confirm_onclick() {	 
	  if (curTransitionSetting.inputValidate()) {
		curTransitionSetting.updateBasicAtrr();
		parent.closeDialog('EW0111');
	}
	 else
	 curTransitionSetting.popTipsDialog("请按照提示信息修改");
}

function button_cancel_onclick() {
	   parent.closeDialog('EW0111');
}

 
 