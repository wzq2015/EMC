var tempSelectedPart=null;
var i = 1;
var o = null;
var isDirtyTree = false;

function getTabId(processId) {
	return 'tabn_' + processId;
}

function newProceesName() {
	var i = 1;
	var name = null;
	
	do {
		name = '新流程' + i++;
	}
	while (!o.forEachTab(function(item) {
		var workflow = $('#' + item.id + " iframe")[0].contentWindow.EDITOR.editor.graph.getWorkflow();
		return name != workflow.getAttribute('Name');
	}));
	return name;
}

function newEditor(processId, processName, displayName, onload) {
	var tabid = getTabId(processId);
	var title = displayName ? displayName : processName;
	var clientHeight=document.body.clientHeight*0.85+'px';
	//alert("height:"+clientHeight);
	o.newTab({
		id : tabid,
		title : title,
		closed : true,
		icon : '',
		html : '<iframe frameborder="0" style="width:100%;height:'+clientHeight+'" src="EW/WorkflowDesigner/wfdesigner.jsp"/>',
		load : ''
	});

	$('#' + tabid + " iframe").load(function() {
		var w = this.contentWindow;		
		if (onload)
			onload(w);
		// IE8 workaround
		w.onbeforeunload = function(event) {
			if (this.EDITOR.editor.modified)
				return '流程"' + title + '"尚未保存';
		};
	});
	
	return o.getItemWithId(tabid);
}

/*
(function(){
	var ver = navigator.userAgent.match(/MSIE ([\d.]+)/);
	if (ver && ver[1] == '8.0') {
		window.onbeforeunload = function(event) {
			var msg;
			o.forEachTab(function(item) {
				var iw = $('#' + item.id + ' iframe')[0].contentWindow;
				var tmp = iw.onbeforeunload(event);
				if (tmp) {
					if (msg)
						msg += '\n' + tmp;
					else
						msg = tmp;
				}
				return true;
			});
			return msg;
		};
	}
})();
*/

efform_onload = function() {		
	efform.hideFormHead();
	$("#ef_tab_y").children('br').remove();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	tree1.expand();
	$(document).ready(function() {

		o = $("#tab_list").Tab({
			items : [],
			width : '100%',
			height : '100%',
			tabcontentWidth : '100%',
			tabScroll : false,
			tabWidth : 100,
			tabHeight : 35,
			tabScrollWidth : 10,
			tabClassDiv : 'benma_ui_tab',
			tabClass : 'benma_ui_tab',
			tabClassClose : 'tab_close',
			tabClassOn : 'tab_item',
			tabClassInner : 'tab_item',
			tabClassInnerLeft : 'tab_item1',
			tabClassInnerMiddle : 'tab_item2',
			tabClassInnerRight : 'tab_item3',
			tabClassText : 'text',
			tabClassScrollLeft : 'scroll-left',
			tabClassScrollRight : 'scroll-right',
			tabWidthSame : true
		});

		$("#tab_list").data("TabCtrl",o);		
		$("#tab_list").children('br').remove();
	});
};

function treeNodeInitializer(node) {
	function addDirectory(id, label) {
		dialog('添加目录', 'EW0116', 
				{					
				  width:'550',
				  height:'300',
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
	function importProcess(id, label) {
		dialog('导入流程', 'EW0118', 
				{ params : 'categoryId=' + id });
	}
	function deleteProcess(processId){
	$('body')
				.append($('<div style="display:none"/>')
						.attr({
									id : 'confirm',
									title : '提示信息'
								})
						.append($('<p>确定删除该流程？</p>')));
		$("#confirm").dialog({
					resizable : false,
					height : 140,
					modal : true,
					buttons : {
						"确认" : function() {
							var info = new EiInfo();
							info.set('ProcessDefinitionId', processId);
							EiCommunicator.send('EW00', 'deleteProcess', info,
									{
										onSuccess : function(outInfo) {
											if(node.parent()!=null&&node.parent().label().length>36)
											node.parent().parent().reload();
											else
											node.parent().reload();
										},
										onFail : function(message) {
											alert(message);
										}
									}, false, false);
							$(this).dialog("close");
							closeDialog('confirm');
						},
						"取消" : function() {
							$(this).dialog("close");
							closeDialog('confirm');
						}
					}
				});	
}
	
function deleteCategory(categoryid) {
	$('body').append($('<div style="display:none"/>')
			.attr({id: 'confirm', title: '提示信息'})
			.append($('<p><span>删除此目录将一并删除目录下所有流程定义信息，确认执行此操作？</span></p>')));
	 $( "#confirm" ).dialog({
            resizable: false,
            height:140,
            modal: true,
            buttons: {
                "确认": function() {
                	var info = new EiInfo();
							info.set('categoryid', categoryid);
							EiCommunicator.send('EW01', 'deleteCategory', info,
									{
										onSuccess : function(outInfo) {
											node.parent().reload();
										},
										onFail : function(message) {
											alert(message);
										}
			}, false, false);
                    $( this ).dialog( "close" );
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
	if(node.label()==null){//根节点
		node.addMenuItem("", {
					label : "createProcess",
					parent : "",
					text : "新建流程",
					leaf : "1",
					func : function(id, label) {
			         createNewProcess();					}
				});
		    node.addMenuItem("", {
					label : "addDirectory",
					parent : "",
					text : "添加目录",
					leaf : "1",
					func : addDirectory
				});
				
				node.addMenuItem("", {
					label : "importProcess",
					parent : "",
					text : "导入流程",
					leaf : "1",
					func : importProcess
				});
	}
    else
	if (node.leaf()) {//叶子节点
//		node._oIcon="./EW/WorkflowDesigner/images/Draft.png";
//		node._cIcon="./EW/WorkflowDesigner/images/Draft.png";
		node.addMenuItem("", {
					label : "openProcess",
					parent : "",
					text : "打开流程",
					leaf : "1",
					func : function(id, label) {						
						openProcess(id,node.label(),node.text());
					}
				});
		node.addMenuItem("", {
					label : "removeProcess",
					parent : "",
					text : "删除流程",
					leaf : "1",
					//此处添加事件
					func : function(id, label) {
						deleteProcess(id);
					}
				});

	} else {
		//非叶子节点并且不是流程版本目录
		if(node.label().length>36)return;
		 node.addMenuItem("", {
					label : "createProcess",
					parent : "",
					text : "新建流程",
					leaf : "1",
					func : function(id, label) {
						createNewProcess(id);
					}
				});
		node.addMenuItem("", {
					label : "removeDirectory",
					parent : "",
					text : "删除目录",
					leaf : "1",
					//此处添加事件
					func : function(id, label) {
						deleteCategory(id);
					}
				});
				node.addMenuItem("", {
					label : "viewDirectory",
					parent : "",
					text : "查看目录信息",
					leaf : "1",
					func : viewDirectory
				});
				node.addMenuItem("", {
					label : "importProcess",
					parent : "",
					text : "导入流程",
					leaf : "1",
					func : importProcess
				});
	}

	
	if(node.leaf())
		node.textClicked = function() {
			var processId = node.id;
			var processName=node.label();
			var processDisplayName=node.text();
			openProcess(processId, processName, processDisplayName);
			return false;
		};
	
//	$('#tab_list').find('ul li:eq()')find('td:eq(2)').find('div')

}
var processtree = new eiTreeModel('EW0000');
function configTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
}


/**
 * 
 * @param category
 * @return
 */
function createNewProcess(category)
{
	var processId = Math.uuid();
	var processName = newProceesName();
	var item = newEditor(processId, processName, null, function(w) {
		w.initNewProcess(processId, processName, category);
	});
		
	var index = eftab_GetIframeIndexById("tab_list", getTabId(processId));
	item.index = index;
	eftab.click("tab_list", item);
	efRoundDivTabChange_option("tab_list", index);
	i = i + 1;
}

 /**
  * 
  * @param category
  * @param xml
  * @return
  */
function importProcess(category, xml)
{
	var workflow = null;
	var doc = DomHelper.parseXml(xml);
	if (doc.documentElement.nodeName == 'mxGraphModel' &&
		doc.getElementsByTagName('WorkflowProcess').length == 1)
		workflow = doc.getElementsByTagName('WorkflowProcess')[0];
	else if (doc.documentElement.nodeName == 'WorkflowProcess')
		workflow = doc.documentElement;
	else {
		alert('导入失败：非法的工作流XML！');
		return;
	}
	workflow.setAttribute('Category', category == null ? ' ' : category);
		
	var processId = workflow.getAttribute('Id');
	var processName = workflow.getAttribute('Name');
	if (processId == null || processId.trim().length == 0) {
		alert('非法的工作流XML：流程Id为空！');
		return;
	}
	if (processName == null || processName.trim().length == 0) {
		alert('非法的工作流XML：流程名为空！');
		return;
	}
	
	var tabid = getTabId(processId);
	var item = o.getItemWithId(tabid);

	if (item) {
		alert('该流程已被打开，关闭后重试！');
		return;
	}
	
	item = newEditor(processId, processName, workflow.getAttribute('DisplayName'), function(w){
		w.EDITOR.editor.setWorkflowXml(doc.documentElement);		
	});

	var index = eftab_GetIframeIndexById("tab_list", tabid);
	item.index = index;
	eftab.click("tab_list", item);
	efRoundDivTabChange_option("tab_list", index);
	i = i + 1;
}

function openProcess(processId, processName, processDisplayName)
{
	var tabid = getTabId(processId);
	var item = o.getItemWithId(tabid);
	if (!item)
		item = newEditor(processId, processName, processDisplayName, function(w){
			var info = new EiInfo();
			info.set('ProcessDefinitionId', processName);

			EiCommunicator.send('EW00', 'loadProcess', info, {
				onSuccess : function(outInfo) {
				var xml = outInfo.get('ProcessDefinitionXMLInfo');
				w.loadWorkflowXml(xml);
			},
			onFail : function(message) {
				alert(message);
			}
			}, false, false);		
		});

	var index = eftab_GetIframeIndexById("tab_list", tabid);
	item.index = index;
	eftab.click("tab_list", item);
	efRoundDivTabChange_option("tab_list", index);
}

function openNode() {
	var nd = tree1.expandNode('520');
	if (nd != null) {
		nd.textDom().style.color = "red";
	} else {
		alert("Can NOT find node 520");
	}
}

function loadNode() {
	var nd = tree1.getNode('520');
	nd.reload();
}

function getProcessTree() {
	return tree1;
}

function getCurrentEditor() {
	var curTabIndex = eftab_current("tab_list");	
	return $('iframe', $("#tab_list>#jquery_tab_div_content").children().get(curTabIndex))[0].contentWindow.EDITOR.editor;
}
function getIframe(ifrId){
  return $('iframe',$("#"+ifrId))[0];
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
	var frame = $('<iframe frameborder= "0" />').attr('src', src)
		.css({height : '100%', width : '100%'});
	$('#' + form).append(frame);
}

function closeDialog(name) {
	var dia = $('#' + name);
	dia.dialog('close');
}

function updateTabTitle(processId, title) {
	var tabid = getTabId(processId);
	var item = o.getItemWithId(tabid);
	if (item)
		o.updateTitle(item, title);
}
