var curActivitySetting=null;
efform_onload = function() {
	efform.hideFormHead();		
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new SubProcessActivitySetting(editor);
	curActivitySetting.renderSubProcessActSetting();
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}

function button_confirm_onclick() {
	if(curActivitySetting.inputValidate()){
     curActivitySetting.updateSubProcessActSetting();
	 parent.closeDialog('EW0104');
   }
   else
   	curActivitySetting.popTipsDialog("请按照提示信息修改");
	
}

function button_cancel_onclick() {
	 parent.closeDialog('EW0104');
}

/*
 tab页之间切换的回调函数
 @param currentIndex 表示当前tab所在的序号
 @param index 表示要切换跳转的tab页所在序号
 返回true则发生tab页之间的切换跳转
 返回false则表示tab页不发生切换跳转
 不返回的时候则发生tab页之间的切换跳转
 */
fundiv = function(currentIndex, index) {
	if (currentIndex == 0 && index == 1) {
		button_query2_onclick();
	}
}
 
 