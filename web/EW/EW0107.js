var curActivitySetting = null;
var curNode = null;

efform_onload = function() {
	efform.hideFormHead();
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	eaTree.dynamic=false;
	var editor=parent.getCurrentEditor();
	curActivitySetting = new CodeActivitySetting(editor);
	curActivitySetting.renderCodeActSetting();
	
	var basicAttrInputs = $('#basicAttrInputs');
	var inputs=basicAttrInputs.find('input');
	inputs.mouseenter(function(event){
	  $(this).focus();
	});
}

function getUrl() {
	var url = location.href;
	var lastIndex = url.lastIndexOf("/");
	return url.substring(0, lastIndex).replace('WorkflowDesigner', '');
}


function button_confirm_onclick() {
	if(curActivitySetting.inputValidate()){
    curActivitySetting.updateCodeActSetting();
	parent.closeDialog('EW0107');	
   }
   else
   	curActivitySetting.popTipsDialog("请按照提示信息修改");	
}

function button_cancel_onclick() {
	parent.closeDialog('EW0107');
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

function removeFuncBarContent(){
$('#ef_grid_extraAttrTreeResult_new_row_img').remove();
$('#ef_grid_extraAttrTreeResult_remove_row_img').remove();
}

function eaTreeNodeInitializer(node) {
	if (node.leaf()) {
		node.type(new radioItemType(true));
	}
	node.textClicked = function() {
		//alert(node.label()+ ":" + node.text()+":"+node.data() );
		curNode = eaTree.getCurrent();
		curActivitySetting.setCurNode(curNode);
		curActivitySetting.renderExtraAttributesOfCodeActivity(node.data(),true);		
	};
	node.textContextMenu = function (node, event) {
    this.rightMenuShow(event);
	this.textClicked();	
    }
	if(node.label()!=null){
    // 支持右键菜单
	node.addMenuItem("", {
				label : "add",
				parent : "",
				text : "新增节点",
				leaf : "1",
				func : function(id, label) {
					// 此处添加事件
					// alert("新增id：" + id +" label:" + label);
					parent.curNode = eaTree.getCurrent();
					curActivitySetting.setCurNode(node);
					$("#nodeAdd").dialog({
						autoOpen : false,
						height : 300,
						width : 350,
						modal : true,
						close: function(event, ui) {
			            $(event.target).dialog("destroy").remove();			            
		                },
		                 open:function(event,ui){
		                 $("#nodeAdd #name").val("");
		                 $("#nodeAdd #displayName").val("");
		                 $("#nodeAdd #description").val("");
		                },
						buttons : {
							"确定" : function() {
								// alert($("#nodeAdd #name").val());
								var name = $("#nodeAdd #name").val();
								var displayName = $("#nodeAdd #displayName")
										.val();
								var desc = $("#nodeAdd #description").val();

								curActivitySetting
										.addExtraAttributesNodeOfCodeActivity(
												name, displayName, desc);
								$(this).dialog("close");
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						},
						close : function() {

						}
					});
					$("#nodeAdd").dialog("open");
				}
			});
	if(node.label()!="ROOT")
	node.addMenuItem("", {
				label : "remove",
				parent : "",
				text : "删除节点",
				leaf : "1",
				// 此处添加事件
				func : function(id, label) {
					//alert("新增id：" + id + " label:" + label);
					parent.curNode = eaTree.getCurrent();
					curActivitySetting.setCurNode(node);
					curActivitySetting
										.deleteExtraAttributesNodeOfCodeActivity();
				}
			});
	if(node.label()!="ROOT")
	node.addMenuItem("", {
				label : "edit",
				parent : "",
				text : "编辑节点",
				leaf : "1",
				// 此处添加事件
				func : function(id, label) {
					

					parent.curNode = eaTree.getCurrent();
					curActivitySetting.setCurNode(node);
					$("#nodeAdd").dialog({
						autoOpen : false,
						height : 300,
						width : 350,
						modal : true,
						close: function(event, ui) {
			            $(event.target).dialog("destroy").remove();			            
		                },
		                open:function(event,ui){
		                 $("#nodeAdd #name").val(node.label());
		                 $("#nodeAdd #displayName").val(node.text());
		                 $("#nodeAdd #description").val(node.desc);
		                },
						buttons : {
							"确定" : function() {
								// alert($("#nodeAdd #name").val());
								var name = $("#nodeAdd #name").val();
								var displayName = $("#nodeAdd #displayName")
										.val();
								var desc = $("#nodeAdd #description").val();

								curActivitySetting
										.updateExtraAttributesNodeOfCodeActivity(
												name, displayName, desc);
								$(this).dialog("close");
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						},
						close : function() {

						}
					});
					$("#nodeAdd").dialog("open");
				}
			});
			
	node.addMenuItem("", {
				label : "editAttr",
				parent : "",
				text : "编辑节点属性",
				leaf : "1",
				// 此处添加事件
				func : function(id, label) {
				parent.curNode = node;
				var options={'width':650,'height':420,'params':'efHeadTail=none'};
		        parent.dialog('编辑节点属性', 'EW0125',options);
		        parent.$("#EW0125").css('height','420px');
				
				}	
			});
	}
			
	node._jTreeNodeDIV.title = (node.label()==null?"":node.label()) + " " + node.text(); // 设置树节点的悬浮提示框内容。(toolTip)
}

function configEATree(tree) {
	tree.nodeInitializer = eaTreeNodeInitializer;
	tree.emptyNodeAsLeaf = true;
	tree.initialExpandDepth = 10; // 设置树初始加载时展开的深度。
}

function treeNodeInitializer(node) {
//	if (node.leaf()) {
//		node.type(new radioItemType(true));
//	}
	node.textClicked = function() {
		//alert(node.label() + ":" + node.text());		
		curActivitySetting.actPartsSetting.switchActivityParticipantsByType(node.label());
	};
	//node._jTreeNodeDIV.title = node.label() + " " + node.text(); // 设置树节点的悬浮提示框内容。(toolTip)
}

function configTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
	tree.emptyNodeAsLeaf = true;
	tree.initialExpandDepth = 10; // 设置树初始加载时展开的深度。
}
