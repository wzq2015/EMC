function Validation()
{
	
};

Validation.prototype.register=function(graph)
{
	var cellHooks = [];
	var edgeHooks = [];
	
	function isActivity(cell) {
		return cell.vertex && cell.id !== '0' && cell.id !== '1' && 
		cell.value && cell.value.nodeName != 'Swimlane';
	}
	function isTransition(edge) {
		return edge && edge.edge && edge.value;
	}
	
	//	1.流程中的活动的名称不能重复。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell))
			return null;
		var name = cell.value.getAttribute('Name');
		if (name == null || name.length == 0)
			return "活动名称为空";
		var activities = graph.getActivities();
		for (var i=0; i<activities.length; i++)
			if (activities[i] !== cell && activities[i].getAttribute('Name') == name)
				return "活动名称重复";
		return null;
	});

	cellHooks.push(function(cell, context) {
		if (!isTransition(cell))
			return null;
		var name = cell.value.getAttribute('Name');
		if (name == null || name.length == 0)
			return "转移名称为空";
		if (!cell.source)
			return null;
		var edges = cell.source.edges;
		for (var i=0; i<edges.length; i++)
			if (edges[i] !== cell && edges[i].source === cell.source && 
				edges[i].value.getAttribute('Name') == name)
				return "转移名称重复";
		return null;
	});
	
	//	2.流程中人工活动节点必须配置参与者或任务接口信息。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName != 'Manual')
			return null;
		if (cell.value.getElementsByTagName('Participant').length > 0)
			return null;
		return '人工活动节点必须配置参与者或任务接口信息';
	});
	
	//	3.流程中会签活动的输出转移有且只有1条。
	graph.multiplicities.push(new mxMultiplicity(true, 'CounterSignature', null, null, 1, 1,
			null, '会签活动的输出转移有且只有1条'));
	
	//	4.流程中转移必须有起始活动和目标活动。
	cellHooks.push(function(cell, context) {
		if (!isTransition(cell))
			return null;
		return (cell.source != null && cell.target != null) ? null : '转移必须有起始活动和目标活动';
	});
	
	//	5.流程中所有非结束活动都必须有输出转移。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName == 'End')
			return null;
		if (cell.edges)
			for (var i=0; i<cell.edges.length; i++)
				if (cell.edges[i].source == cell)
					return null;
		return '所有非结束活动都必须有输出转移';
	});

	//	6.流程中所有非起始活动都必须有输入转移。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName == 'Start')
			return null;
		if (cell.edges)
			for (var i=0; i<cell.edges.length; i++)
				if (cell.edges[i].target == cell)
					return null;
		return '所有非起始活动都必须有输入转移';
	});
	
	//	7.流程中起始节点后可跟多条输出转移，可以指向结束活动，会签活动。
	
	//	8.流程中子流程活动必须配置子流程名称而且必须存在，并且不能为子流程活动所在流程本身。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName != 'SubProcess')
			return null;
		var subs = cell.value.getElementsByTagName('SubProcess');
		if (subs.length == 1) {
			var subName = subs[0].getAttribute('SubProcessName').trim();
			if (subName.length > 0 && subName != graph.getWorkflow().getAttribute('Name'))
				return null;
		}
		return '子流程活动必须配置子流程名称而且必须存在，并且不能为子流程活动所在流程本身';
	});
	
	//	9.流程中会签活动必须配置启动流程而且必须存在，并且不能为会签流程本身。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName != 'CounterSignature')
			return null;
		var subs = cell.value.getElementsByTagName('SubProcess');
		if (subs.length > 0) {
			var i;
			var name = cell.value.getAttribute('Name');
			for (i=0; i<subs.length; i++)
				if (subs[i].getAttribute('SubProcessName') == name)
					break;
			if (i == subs.length)
				return null;
		}
		return '会签活动必须配置启动流程而且必须存在，并且不能为会签流程本身';
	});

	//	10.流程中会签活动中的启动流程不可以重复。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName != 'CounterSignature')
			return null;
		var subs = cell.value.getElementsByTagName('SubProcess');
		if (subs.length <= 1)
			return null;
		var map = new Object();
		for (var i=0; i<subs.length; i++) {
			var subName = subs[i].getAttribute('SubProcessName').trim();
			if (map[subName])
				return '会签活动中的启动流程不可以重复';
			map[subName] = 0;
		}
		return null;
	});
	
	//	11.聚合活动只能有一条输出转移。
	graph.multiplicities.push(new mxMultiplicity(true, 'Join', null, null, 1, 1,
			null, '聚合活动只能有一条输出转移'));

	//	12.只有人工活动的转移的才可以指向自身。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName == 'Manual')
			return null;
		if (cell.edges)
			for (var i=0; i<cell.edges.length; i++)
				if (cell.edges[i].source === cell.edges[i].target)
					return '只有人工活动的转移才可以指向自身';
		return null;
	});
	
	//	13.结束活动不能有输出的转移。
	cellHooks.push(function(cell, context) {
		if (!isActivity(cell) || cell.value.nodeName != 'End')
			return null;
		if (cell.edges)
			for (var i=0; i<cell.edges.length; i++)
				if (cell.edges[i].source == cell)
					return '结束活动不能有输出的转移';
		return null;
	});
		
	//	14.活动间的转移不能重复。
	edgeHooks.push(function(edge, source, target) {
		if (source == null || target == null || !isTransition(edge))
			return null;
		var transitions = graph.getTransitions();
		for (var i=0; i<transitions.length; i++)
			if (transitions[i] != edge && transitions[i].source == source && transitions[i].target == target)
				return '活动间的转移不能重复';
		return null;
	});

	// hook wrapper
	graph.validateCell = function(cell, context) {
		var result = null;
		for (var i=0; i<cellHooks.length; i++) {
			var message = cellHooks[i](cell, context);
			if (message != null)
				result = result == null ? message : result + '\n' + message;
		}
		return result;
	};
	
	graph.validateEdge = function(edge, source, target) {
		var result = null;
		for (var i=0; i<edgeHooks.length; i++) {
			var message = edgeHooks[i](edge, source, target);
			if (message != null)
				result = result == null ? message : result + '\n' + message;
		}
		return result ? result + '\n' : null; // validateEdge will be concatenated with validateCell message
	};

	// Installs automatic validation (use editor.validation = true
	// if you are using an mxEditor instance)
	var listener = function(sender, evt) {
		graph.validateGraph();
	};

	graph.getModel().addListener(mxEvent.CHANGE, listener);	


};