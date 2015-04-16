TransitionSetting=function (editor) {
	//this.setting = this.getCurrentAttributeSetting();
	this.editor = editor
	this.setting = this.getCurrentAttributeSetting();
};

mxUtils.extend(TransitionSetting, AttributeSetting);

/**
 * 渲染转移基本属性设置
 */
TransitionSetting.prototype.renderBasicAttr = function() {	
	var  ba=$('#ef_region_basicAttr');
	var as = this.setting;
	
	$('#name',ba).attr('value',as.getAttribute('Name'));
	$('#displayName',ba).attr('value',as.getAttribute('DisplayName'));	
	$('#condition',ba).attr('value',as.getAttribute('Condition'));
	$('#decisionType',ba).attr('value',as.getAttribute('DecisionType'));
	$('#conditionName',ba).attr('value',as.getAttribute('ConditionName'));
};

/**
 * 更新转移基本属性设置
 */
TransitionSetting.prototype.updateBasicAtrr = function() {	
	//获取活动属性配置
	var ba=$('#ef_region_basicAttr');	
	var name = $('#name',ba).val();
	var displayName = $('#displayName',ba).val();
	var condition = $('#condition',ba).val();
	var decisionType = $('#decisionType',ba).val();
    var conditionName = $('#conditionName',ba).val();
    
	//设置基本属性	
	var as = this.setting;	
	as.setAttribute('Name', name);
	as.setAttribute('DisplayName', displayName);
	as.setAttribute('Condition', condition);
	as.setAttribute('DecisionType', decisionType);
	as.setAttribute('ConditionName', conditionName);
	
    this.updateAttributeSetting();
};