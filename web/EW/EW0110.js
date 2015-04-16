var curActivitySetting=null;
efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new EndAcitivitySetting(editor);
	curActivitySetting.renderEndActSetting();
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}


function button_confirm_onclick() {	 
   if(curActivitySetting.inputValidate()){
    curActivitySetting.updateEndActSetting();
    parent.closeDialog('EW0110');
   }
   else
   	curActivitySetting.popTipsDialog("请按照提示信息修改");
}



function button_cancel_onclick() {
	  parent.closeDialog('EW0110');
//	 parent.$("#EW0110").dialog("close");
//	 parent.$("#EW0110").remove();
}

 
 