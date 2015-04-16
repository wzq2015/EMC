var editor = parent.getCurrentEditor();
var select, mostRecentVersion, mostRecentUuid;

function update_graph(graph, maxVersion) {
	var root = graph.getModel().getCell('0');
	root.value.setAttribute('Id', Math.uuid());		
	var dataFields = root.value.getElementsByTagName('DataField');
	for (var i=0; i<dataFields.length; i++)
		dataFields[i].setAttribute('Id', Math.uuid());
	if (maxVersion)
		root.value.setAttribute('Version', maxVersion + 1);

	graph.travelCells(function(cell) {
		cell.setId(Math.uuid());
	});
}

function verify_uuid(graph, uuid, version) {
	var workflow = graph.getWorkflow();
	if (workflow.getAttribute('Id') != uuid) {
		// corner case when importing or renaming
		update_graph(graph);
		workflow.setAttribute('Id', uuid);
		workflow.setAttribute('Version', version);
	}
}

function save(editor, status, newCopy) {
	var workflow = editor.graph.getWorkflow();
	workflow.setAttribute('Status', status);
	workflow.setAttribute('DeployTime', new Date().toString("yyyy-MM-dd HH:mm:ss"));
	var method = newCopy ? 'saveProcess' : 'updateProcess';
	var info = new EiInfo();
	
	info.set('ProcessDefinitionId', workflow.getAttribute('Id'));
	info.set('CategoryId', workflow.getAttribute('Category').trim());
	info.set('ProcessDefinitionXMLInfo', mxUtils.getXml(editor.getWorkflowXml()));

	var ew00 = parent;
	EiCommunicator.send('EW00', method, info, {
		onSuccess : function(outInfo) {
			var retValue = outInfo.get('ProcessReturnValue');
			if (retValue == 'ProcessReturnException') {
				alert('保存失败：未知原因');
				return;
			}
			alert('保存成功');
			editor.modified = false;
			var node = ew00.findTreeNode(workflow.getAttribute('Category').trim());
			if (node)
				node.reload();
			parent.closeDialog('EW0121');
		},
		onFail : function(message) {
			alert(message);
			parent.closeDialog('EW0121');
		}
	}, false, true);
}

function verifySubprocess(workflow) {
	var subs = workflow.getElementsByTagName('SubProcess');
	var namemap = new Object();
	for (var i=0; i<subs.length; i++) {
		var name = subs[i].getAttribute('SubProcessName');
		if (name == null) // an activity
			continue;
		name = name.trim();
		if (name.length == 0) {
			alert('子进程名或者会签起始进程名为空！');
			return false;
		}
		if (!namemap[name])
			namemap[name] = 0;
	}
	var array = [], message = null;
	for (var name in namemap)
		array.push(name);
	if (array.length == 0)
		return true;
	
	var info = new EiInfo();	
	info.set('processNames', array);

	EiCommunicator.send('EW00', 'verifyProcessRef', info, {
		onSuccess : function(outInfo) {
			var result = outInfo.get('processNames');
			if (result.length > 0)
				message = "流程名未定义：" + result;
		},
		onFail : function(err) {
			message = err;
		}
	}, false, false);
	
	if (message != null) {
		alert(message);
		return false;
	}
	return true;
}
 
function hasError(graph) {
	var cells = graph.getChildCells();
	for (var i=0; i<cells.length; i++)
		if (graph.validateCell(cells[i]) != null ||
			graph.getCellValidationError(cells[i]) != null)
			return true;
	return false;
}

$(function() {
	efform.hideFormHead();

	var workflow = editor.graph.getWorkflow();
	var name = workflow.getAttribute('Name');
	var version = workflow.getAttribute('Version');

	var count;
	var info = new EiInfo();
	info.set('ProcessName', name);
	var blk = new EiBlock('result');
	info.addBlock(blk);
	blk.set('offset', '0');
	blk.set('limit', '1000');

	EiCommunicator.send('EW00', 'queryProcess', info, {
	onSuccess : function(outInfo) {
		var retValue = outInfo.get('ProcessReturnValue');
		if (retValue == 'ProcessReturnException') {
			alert(outInfo.getMsg());
			parent.closeDialog('EW0121');
			return;
		}
		count = outInfo.getBlock('result').get('count');
		mostRecentVersion = parseInt(outInfo.getBlock('result').get('mostRecentVersion'));
		mostRecentUuid = outInfo.getBlock('result').get('mostRecentUuid');
		initPage(name,count, version);
	},
	onFail : function(message) {
		alert(message);
		parent.closeDialog('EW0121');
	}
	}, false, true);
});

function initPage(name,count, version) {
	if (count == 0) {
		$('#promption').append('请选择保存草稿或者发布流程');
		$('#actionDiv').hide();
		select = null;
	}
	else {
		$('#promption').append(name + '版本'+ version + '已存在！');
		select = $('#action');
	}
}

function button_draft_onclick() {
	var newCopy = select == null || select.val() == 'N';
	if (newCopy)
		update_graph(editor.graph, mostRecentVersion);
	else 
		verify_uuid(editor.graph, mostRecentUuid, mostRecentVersion);
	save(editor, 'draft', newCopy);
}

function button_publish_onclick() {
	if (!verifySubprocess(editor.getWorkflowXml())) {
		parent.closeDialog('EW0121');
		return;
	}
	var newCopy = select == null || select.val() == 'N';
	if (newCopy)
		update_graph(editor.graph, mostRecentVersion);
	else
		verify_uuid(editor.graph, mostRecentUuid, mostRecentVersion);			
	save(editor, 'published', newCopy);
}
