var editor = parent.getCurrentEditor();

efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	$('#xml').val(editor.formatXml(mxUtils.getXml(editor.getWorkflowXml())));

	$('textarea').mouseenter(function(event){
		$(this).focus();
	});
}

function button_close_onclick() {
	parent.closeDialog('EW0105');
}

function button_save_onclick() {
	var doc = DomHelper.parseXml($('#xml').val());
	if (doc && doc.childNodes.length == 1)
		editor.setWorkflowXml(doc.childNodes[0]);
	else
		alert('格式错误，保存失败！');
	parent.closeDialog('EW0105');
}
