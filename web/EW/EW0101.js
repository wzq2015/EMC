

var curActivitySetting = null;

efform_onload = function() {	
	efform.hideFormHead();
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();		
	var editor=parent.getCurrentEditor();
	curActivitySetting = new ManualActivitySetting(editor);	
	curActivitySetting.render(); 
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});

}

function button_confirm_onclick() {
	if(curActivitySetting.inputValidate()){
     curActivitySetting.update();
      parent.closeDialog('EW0101');	
   }
   else
   	curActivitySetting.popTipsDialog("请按照提示信息修改");
	
}

function button_cancel_onclick() {
	  parent.closeDialog('EW0101');
}

function button_delete_onclick(button) {
	var pos = efgrid.getCellPos(button);
	var grid = efgrid.getEfGridNode(button).efgrid;
	var block = grid.eiinfo.getBlock("activityParticipantsResult");
	var id=block.getCell(pos.row, 'Id');
	curActivitySetting.actPartsSetting.deleteActivityParticipant(id);	
	
}

function button_edit_onclick(button) {
	var pos = efgrid.getCellPos(button);
	var grid = efgrid.getEfGridNode(button).efgrid;
	var block = grid.eiinfo.getBlock("activityParticipantsResult");
	var id=block.getCell(pos.row, 'Id');
	curActivitySetting.actPartsSetting.editActivityParticipant(id);	
	
}

function button_view_onclick(button) {
	var pos = efgrid.getCellPos(button);
	var grid = efgrid.getEfGridNode(button).efgrid;
	var block = grid.eiinfo.getBlock("activityParticipantsResult");
	var id=block.getCell(pos.row, 'Id');	
	curActivitySetting.actPartsSetting.viewActivityParticipant(id);	
}

function treeNodeInitializer(node) {
	node.textClicked = function() {
		curActivitySetting.actPartsSetting.switchActivityParticipantsByType(node.label());
	};	
}

function configTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
	tree.emptyNodeAsLeaf = true;
	tree.initialExpandDepth = 2; // 设置树初始加载时展开的深度。
}
