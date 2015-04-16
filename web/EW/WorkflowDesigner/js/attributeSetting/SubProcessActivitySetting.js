SubProcessActivitySetting=function (editor) {
	this.editor = editor;
	this.setting = this.getCurrentAttributeSetting();
};

mxUtils.extend(SubProcessActivitySetting, AttributeSetting);

/**
 * 渲染子流程活动属性配置页面
 */
SubProcessActivitySetting.prototype.renderSubProcessActSetting = function() {
	this.renderBasicAttrOfSubProcessActivity();
	this.renderExtra();
	this.renderParametersOfSubProcessActivity();
};

/**
 * 渲染子流程活动的基本属性设置页面
 */
SubProcessActivitySetting.prototype.renderBasicAttrOfSubProcessActivity = function() {
	var basicAttrRegion = $('#ef_region_basicAttr');
	$('#name', basicAttrRegion)
			.attr('value', this.setting.getAttribute('Name'));
	$('#displayName', basicAttrRegion).attr('value',
			this.setting.getAttribute('DisplayName'));
	var subprocess = $('SubProcesses>SubProcess', this.setting)[0];
	if (subprocess != null) {
		$('#subProcessName', basicAttrRegion).attr('value',
				subprocess.getAttribute('SubProcessName'));
		$('#invokeType', basicAttrRegion).attr('value',
				subprocess.getAttribute('InvokeType'));
		$('#isStay', basicAttrRegion).attr('value',
				subprocess.getAttribute('IsStay'));
	}
};

/**
 * 渲染扩展属性数据表格
 * 
 * @return
 */
SubProcessActivitySetting.prototype.renderExtra = function() {
	var GRIDNAME = "extraResult";
	var dom = $(this.setting);
	// 构造eiInfo
	var info = new EiInfo();

	var typemeta = new EiBlockMeta('form');
	var typecol1 = new EiColumn('A');
	typecol1.pos = 0;
	typecol1.descName = 'A';

	var typecol2 = new EiColumn('B');
	typecol2.pos = 1;
	typecol2.descName = 'B';
	typemeta.addMeta(typecol1);
	typemeta.addMeta(typecol2);

	var typerow1 = [];
	typerow1.push("String");
	typerow1.push("String");

	var typeblock = new EiBlock(typemeta);

	typeblock.addRow(typerow1);

	info.addBlock(typeblock);

	var meta = new EiBlockMeta(GRIDNAME);
	var col1 = new EiColumn('Name');
	col1.pos = 0;
	col1.descName = '名称';
	col1.labelProperty = 'Name';
	col1.valueProperty = '名称';
	col1.width = '100';

	var col2 = new EiColumn('Type');
	col2.pos = 1;
	col2.editor = 'combo';
	col2.descName = '类型';
	col2.blockName = 'form';
	col2.valueProperty = 'A'; // Key
	col2.labelProperty = 'B'; // 界面显示
	col2.width = '70';

	var col3 = new EiColumn('Value');
	col3.descName = '值';
	col3.pos = 2;
	col3.labelProperty = 'Value';
	col3.valueProperty = '值';
	col3.width = '120';

	var col4 = new EiColumn('Desc');
	col4.descName = '描述';
	col4.pos = 3;
	col4.labelProperty = 'Desc';
	col4.valueProperty = '描述';
	col4.width = '150';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);
	meta.addMeta(col4);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 加载扩展属性数据
	$(dom).find('Variable').each(function() {
				var row = [];
				$.each(this.attributes, function(i, attrib) {
							var name = attrib.name;
							var value = attrib.value;
							row.push(value);
						});
				block.addRow(row);

			});

	// 绘制grid 
	var extraGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				extraGrid.paint();
			});
	return extraGrid;

};
/**
 * 渲染子流程参数相关参数数据表格
 * 
 * @return
 */
SubProcessActivitySetting.prototype.renderParametersOfSubProcessActivity = function() {
	var GRIDNAME = "parametersResult";
	var dom = $(this.setting);
	// 构造eiInfo
	var info = new EiInfo();
	var typemeta = new EiBlockMeta('form');
	var typecol1 = new EiColumn('A');
	typecol1.pos = 0;
	typecol1.descName = 'A';

	var typecol2 = new EiColumn('B');
	typecol2.pos = 1;
	typecol2.descName = 'B';
	typemeta.addMeta(typecol1);
	typemeta.addMeta(typecol2);

	var typerow1 = [];
	typerow1.push("In");
	typerow1.push("输入");

	var typerow2 = [];
	typerow2.push("Out");
	typerow2.push("输出");

	var typerow3 = [];
	typerow3.push("InOut");
	typerow3.push("输入输出");

	var typeblock = new EiBlock(typemeta);

	typeblock.addRow(typerow1);
	typeblock.addRow(typerow2);
	typeblock.addRow(typerow3);

	info.addBlock(typeblock);

	var meta = new EiBlockMeta(GRIDNAME);
	var col1 = new EiColumn('variable');
	col1.pos = 0;
	col1.descName = '主流程参数名称';
	col1.labelProperty = 'variable';
	col1.valueProperty = '主流程参数名称';
	col1.width = '200';

	var col2 = new EiColumn('subVariable');
	col2.descName = '子流程参数名称';
	col2.pos = 1;
	col2.labelProperty = 'subVariable';
	col2.valueProperty = '描述';
	col2.width = '150';

	var col3 = new EiColumn('type');
	col3.pos = 2;
	col3.editor = 'combo';
	col3.descName = '参数传输方式';
	col3.blockName = 'form';
	col3.valueProperty = 'A'; // Key
	col3.labelProperty = 'B'; // 界面显示
	col3.width = '90';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 加载扩展属性数据
	$(dom).find('SubProcess>Parameters>Parameter').each(function() {
				var row = [];
				row.push(this.getAttribute("Variable"));
				row.push(this.getAttribute("SubVariable"));
				row.push(this.getAttribute("Type"));
				block.addRow(row);
			});

	// 绘制grid 
	var eventGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				eventGrid.paint();
			});
	return eventGrid;

};
/**
 * 保存子流程活动属性设置
 */
SubProcessActivitySetting.prototype.updateSubProcessActSetting = function() {
	this.updateBasicAtrrOfSubProcessActSetting();
	this.updateExtra();
	this.updateParametersOfSubProcessActSetting();
	
	this.updateAttributeSetting();
};

/**
 * 保存子流程活动基本属性设置
 */
SubProcessActivitySetting.prototype.updateBasicAtrrOfSubProcessActSetting = function() {
	// 获取活动属性配置
	var basicAttrRegion = $('#ef_region_basicAttr');
	var name = $('#name', basicAttrRegion).attr('value');
	var displayName = $('#displayName', basicAttrRegion).attr('value');
	var subProcessName = $('#subProcessName', basicAttrRegion).attr('value');;
	var invokeType = $('#invokeType', basicAttrRegion).attr('value');
	var isStay = $('#isStay', basicAttrRegion).attr('value');

	var doc = this.createXmlDocument();
	var subProcesses = $(this.setting).find('SubProcesses')[0];
	if (subProcesses == null) {
		subProcesses = doc.createElement('SubProcesses');
		$(this.setting).find('Extras').append($(subProcesses));
	} else
		$(subProcesses).empty();
	// 设置基本属性
	var cas = this.setting;
	cas.setAttribute('Name', name);
	cas.setAttribute('DisplayName', displayName);
	var subprocess = doc.createElement('SubProcess');
	subprocess.setAttribute('SubProcessName', subProcessName);
	subprocess.setAttribute('InvokeType', invokeType);
	subprocess.setAttribute('IsStay', isStay);
	$(subProcesses).append($(subprocess));
};
/**
 * 保存扩展属性设置
 * 
 * @return
 */
SubProcessActivitySetting.prototype.updateExtra = function() {
	var GRIDNAME = "extraResult";
	// 设置扩展属性
	var doc = this.createXmlDocument();
	var actExtraParams = $(this.setting).find('ActivityExtraParameters')[0];
	if (actExtraParams == null) {
		actExtraParams = doc.createElement('ActivityExtraParameters');
		$(this.setting).find('Extras')[0].appendChild(actExtraParams);
	} else
		$(actExtraParams).empty();

	var grid = efform.getGrid("ef_grid_" + GRIDNAME);
	var eiinfo = grid.eiinfo;
	var block = eiinfo.getBlock(GRIDNAME);
	var variable = null;
	if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
			variable = doc.createElement('Variable');
			variable.setAttribute('Name', block.getCell(i, 'Name'));
			variable.setAttribute('Type', block.getCell(i, 'Type'));
			variable.setAttribute('Value', block.getCell(i, 'Value'));
			variable.setAttribute('Desc', block.getCell(i, 'Desc'));
			actExtraParams.appendChild(variable);
		}
};
/**
 * 保存子流程活动相关参数设置
 * 
 * @return
 */
SubProcessActivitySetting.prototype.updateParametersOfSubProcessActSetting = function() {
	var GRIDNAME = "parametersResult";
	// 设置扩展属性
	var doc = this.createXmlDocument();
	var params = $(this.setting).find('SubProcesses>SubProcess>Parameters')[0];
	if (params == null) {
		params = doc.createElement('Parameters');
		$(this.setting).find('SubProcesses>SubProcess')[0].appendChild(params);
	} else
		$(params).empty();

	var grid = efform.getGrid("ef_grid_" + GRIDNAME);
	var eiinfo = grid.eiinfo;
	var block = eiinfo.getBlock(GRIDNAME);
	var parameter = null;
	if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
			parameter = doc.createElement('Parameter');
			parameter.setAttribute('Type', block.getCell(i, 'type'));
			parameter.setAttribute('Variable', block.getCell(i, 'variable'));
			parameter.setAttribute('SubVariable', block.getCell(i,
							'subVariable'));
			parameter.setAttribute('Expression', "");
			params.appendChild(parameter);
		}
};