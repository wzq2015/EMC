function WfModel(){};
WfModel.prototype.getWorkflowTokenObject=function(value){
	var doc = mxUtils.createXmlDocument();
	var obj = value;
	//开始活动
	if(value=='start'){
	obj=doc.createElement('Start');
	obj.setAttribute('Name', 'Start');
	obj.setAttribute('DisplayName', '开始活动');	
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//结束活动
	if(value=='end'){
	obj=doc.createElement('End');
	obj.setAttribute('Name', 'End');
	obj.setAttribute('DisplayName', '结束活动');		
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');	
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//人工活动
	if(value=='manual'){
	obj=doc.createElement('Manual');
	obj.setAttribute('Name', 'Manual');
	obj.setAttribute('DisplayName', '人工活动');
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');	
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//并发活动
	if(value=='fork'){
	obj=doc.createElement('Fork');
	obj.setAttribute('Name', 'Fork');
	obj.setAttribute('DisplayName', '并发活动');
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//聚合活动
	if(value=='join'){
	obj=doc.createElement('Join');
	obj.setAttribute('Name', 'Join');
	obj.setAttribute('DisplayName', '聚合活动');
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//子流程活动
	if(value=='subprocess'){
	obj=doc.createElement('SubProcess');
	obj.setAttribute('Name', 'SubProcess');
	obj.setAttribute('DisplayName', '子流程活动');
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//可编程活动
	if(value=='code'){
	obj=doc.createElement('Code');
	obj.setAttribute('Name', 'Code');
	obj.setAttribute('DisplayName', '可编程活动');
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//会签活动
	if(value=='countersignature'){
	obj=doc.createElement('CounterSignature');
	obj.setAttribute('Name', 'CounterSignature');
	obj.setAttribute('DisplayName', '会签活动');
	obj.setAttribute('Form', '');
	obj.setAttribute('IsDeffered', 'false');
	obj.setAttribute('HandleType', '0');
	obj.setAttribute('Description', '');
	obj.setAttribute('IsBizNode', 'true');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	//泳道
	if(value=='swimlane'){
	obj=doc.createElement('Swimlane');
	obj.setAttribute('Name', 'Swimlane');
	obj.setAttribute('DisplayName', '泳道');
	obj.setAttribute('Description', '');
	extras=doc.createElement('Extras');
	obj.appendChild(extras);
	}
	return obj;
};

WfModel.prototype.getWorkflowTransitionObject = function()
{
	var doc = mxUtils.createXmlDocument();
	var obj = doc.createElement('Transition');
	obj.setAttribute('Name', 'Transition');
	obj.setAttribute('DisplayName', '转移');
	obj.setAttribute('DecisionType', 'ByName');
	obj.setAttribute('ConditionName', 'normal');
	obj.setAttribute('Condition', '');
	obj.setAttribute('IsBizNode', 'true');
	return obj;	
};