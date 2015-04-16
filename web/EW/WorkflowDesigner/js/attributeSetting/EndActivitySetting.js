EndAcitivitySetting=function (editor) {
	this.editor = editor;
	this.setting = this.getCurrentAttributeSetting();
};

mxUtils.extend(EndAcitivitySetting, AttributeSetting);

/**
 * 渲染结束活动属性设置页面
 */
EndAcitivitySetting.prototype.renderEndActSetting = function() {
	var basicAttrRegion = $('#ef_region_basicAttr');
	$('#name', basicAttrRegion)
			.attr('value', this.setting.getAttribute('Name'));
	$('#displayName', basicAttrRegion).attr('value',
			this.setting.getAttribute('DisplayName'));
	var description = $('Extras Description', this.setting)[0];
	if (description != null) {
		$('#description', basicAttrRegion).attr('value', $(description).text());
	}
};
/**
 * 保存结束活动属性设置
 */
EndAcitivitySetting.prototype.updateEndActSetting = function() {
	// 获取活动属性配置
	var basicAttrRegion = $('#ef_region_basicAttr');
	var name = $('#name', basicAttrRegion).attr('value');
	var displayName = $('#displayName', basicAttrRegion).attr('value');
	var description = $('#description', basicAttrRegion).attr('value');

	var doc = this.createXmlDocument();
	var desNode = $(this.setting).find('Description')[0];
	if (desNode == null) {
		desNode = doc.createElement('Description');
		$(this.setting).find('Extras').append($(desNode));
	} else
		$(desNode).empty();

	// 设置基本属性
	var cas = this.setting;
	cas.setAttribute('Name', name);
	cas.setAttribute('DisplayName', displayName);
	$(desNode).text(description);

	this.updateAttributeSetting();
};