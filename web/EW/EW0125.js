var curActivitySetting = null;
var curNode = null;

efform_onload = function() {
	efform.hideFormHead();
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new CodeActivitySetting(editor);
	curActivitySetting.renderExtraAttributesOfCodeActivity(parent.curNode.data(),false);
}




function button_confirm_onclick() {
	curActivitySetting.saveExtraAttributesOfCodeActivity();
	parent.closeDialog('EW0125');	
}

function button_cancel_onclick() {
	parent.closeDialog('EW0125');
}

