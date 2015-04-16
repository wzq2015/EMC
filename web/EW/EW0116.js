efform_onload = function() {
	efform.hideFormHead();
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}

function button_confirm_onclick() {
	if (!efvalidateForm(document.forms[0])) {
		alert('表单数据不合法！');
		return;
	}
	
	var info = new EiInfo();
	info.setByNodeObject(document.forms[0]);

	EiCommunicator.send('EW01', 'saveCategoryInfo', info, {
		onSuccess : function(outInfo) {
			alert('创建成功！');
			parent.isDirtyTree = true;
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
			
	parent.closeDialog('EW0116');
}

function button_cancel_onclick() {
	parent.closeDialog('EW0116');
}
