efform_onload = function() {
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	tree1.expand();
};

function treeNodeInitializer(node) {
	function addDirectory(id, label) {
		dialog('添加目录', 'EW0116',
				{
				  width:'550',
				  height:'300',
				  params:'parent=' + id, 
				  onclose : function(event, ui) {
								if (isDirtyTree)
									node.reload();
							}
				});
	}
	function viewDirectory(id, label) {
		dialog('目录信息', 'EW0117', 
				{ params : 'id=' + id,
				  width:'550',
				  height:'300',
				  onclose : function(event, ui) {
								if (isDirtyTree)
									node.parent().reload();
							}
				});
	}

	function deleteCategory(categoryid) {
		$('body').append($('<div style="display:none"/>')
				.attr({id: 'confirm', title: '提示信息'})
				.append($('<p><span>删除此目录将一并删除目录下所有流程定义信息，确认执行此操作？</span></p>')));
		$("#confirm").dialog({
			resizable: false,
			height:140,
			modal: true,
			buttons: {
			"确认": function() {
				var info = new EiInfo();
				info.set('categoryid', categoryid);
				EiCommunicator.send('EW01', 'deleteCategory', info, {
					onSuccess : function(outInfo) {
						node.parent().reload();
					},
					onFail : function(message) {
						alert(message);
					}}, false, false);
				$(this).dialog( "close" );
				closeDialog('confirm');
			},
			"取消": function() {
				$( this ).dialog( "close" );
				closeDialog('confirm');
			}
			}
		});
	}
	
	var data = node.data();

	if (data != null) {
		if (data.oIcon || data.cIcon) {
			node.openIcon(data["oIcon"]);
			node.icon(data["cIcon"]);
		} else {
			node.hideIcon = true;
		}
	}
	
    node.addMenuItem("", {
		label : "addDirectory",
		parent : "",
		text : "添加目录",
		leaf : "1",
		func : addDirectory
	});				
	if(node.label() != null) { //非根节点
		node.addMenuItem("", {
					label : "removeDirectory",
					parent : "",
					text : "删除目录",
					leaf : "1",
					func : deleteCategory
				});
				node.addMenuItem("", {
					label : "viewDirectory",
					parent : "",
					text : "查看目录信息",
					leaf : "1",
					func : viewDirectory
				});
	}
	
}

var processtree = new eiTreeModel('EW0100');
function configTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
}

function getProcessTree() {
	return tree1;
}

function findTreeNode(id) {
	var tree = getProcessTree();
	if (!id)
		return tree._rootNode;
	var q = [];
	q.push(tree._rootNode);
	while (q.length > 0) {
		var n = q.pop();
		if (n.label() == id)
			return n;
		if (n.leaf())
			continue;
		var children = n.getChildNodes(); 
		for (var i=0; i<children.length; i++)
			q.push(children[i]);
	}
	return null;
}

function dialog(title, form, options) {
	var src = window.location.pathname + '?efFormEname=' + form;
	if (options && options.params)
		src += '&' + options.params;
	$('body').append($('<div style="display:none"/>')
			.attr({id: form, title: title}));
			
//		var iframe = $("<iframe>").attr("src", src).attr({id: form, title: title}).css({height : '100%', width : '100%'});
//       iframe.appendTo("body");
//		$("#"+form).appendTo("form:eq(0)");
	$('#' + form).dialog({
		autoOpen : true,
		modal : true,
		height : options && options.height ? options.height : 600,
		width : options && options.width ? options.width : 800,
		zIndex : 9999,
		resizable: false,
		close: function(event, ui) {
			$(event.target).dialog("destroy").remove();
			if (options && options.onclose)
				options.onclose(event, ui);
		}
	});
	
	//IE9 Iframe在DOM移动一次 加载js就会失败
	$('#' + form).append(
			$('<iframe frameborder= "0" />')
			.attr('src', src)
			.css({height : '100%', width : '100%'}));
}

function closeDialog(name) {
	var dia = $('#' + name);
	dia.dialog('close');
}

