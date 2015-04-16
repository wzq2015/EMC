var curActivitySetting=null;
efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new ForkActivitySetting(editor);
	curActivitySetting.renderForkActSetting();
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}


function button_confirm_onclick() {
	if (curActivitySetting.inputValidate()) {
		curActivitySetting.updateForkActSetting();
		parent.closeDialog('EW0108');
	}
	 else
	 curActivitySetting.popTipsDialog("请按照提示信息修改");
}



function button_cancel_onclick() {
	parent.closeDialog('EW0108');
}

 
 