efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
}

button_confirm_onclick = function()
{
	var name = parent.getSelectedFlowName();
	var formEname = $("#inqu_status-0-form_ename").val().trim();
	var formCname = $("#inqu_status-0-form_cname").val().trim();
	var treeEname = $("#inqu_status-0-tree_ename").val().trim();
	
	if (formEname.length == 0) {
		alert('"画面英文名"不能为空！');
		return;
	}
	if (formCname.length == 0) {
		alert('"画面中文名"不能为空！');
		return;
	}
	
	info = new EiInfo();
	info.set('name', name);
	info.set('form_ename', formEname);
	info.set('form_cname', formCname);
	info.set('tree_ename', treeEname);
	EiCommunicator.send('EDMD99', 'confirm', info, {
		onSuccess : function(outInfo) {
			if(outInfo.getStatus() != -1){
				alert("注册成功！");
				 parent.closeDialog('EDMD99');
			}
			else
			    alert("注册失败！"+outInfo.getMsg());
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
	
}

function button_cancel_onclick() {
	  parent.closeDialog('EDMD99');
}

function treeNodeInitializer(node){
	node.textClicked = function()
					{
						if(node.leaf()){
						alert("请选择非叶子节点!");
						}
						else{
						$("#inqu_status-0-tree_ename").val(node.label()) ;
						efwindow.hide();
						}
					};
	node._jTreeNodeDIV.title = node.label()+" "+node.text();//鼠标悬浮到节点上的提示信息。	
	
}

function myConfigTree(tree){
  tree.nodeInitializer = treeNodeInitializer;
  tree.initialExpandDepth = 3;//树默认展开到第三层。  将深度设置的深一点，就可以全部展开。 
}