CounterSignatureActivitySetting=function (editor) {
	this.editor = editor;
	this.setting = this.getCurrentAttributeSetting();
};

mxUtils.extend(CounterSignatureActivitySetting, AttributeSetting);


CounterSignatureActivitySetting.prototype.editButton = "<div align=\"center\"><input class=\"buttonclass\" type=\"button\" align=\"center\" value=\"编辑\" onclick=\"button_edit_onclick(this);\"></div>";
/**
 * 渲染会签活动的基本属性设置页面
 */
CounterSignatureActivitySetting.prototype.renderBasicAttrOfCounterSignatureActivity = function() {
	var basicAttrRegion = $('#ef_region_basicAttr');
	$('#name', basicAttrRegion)
			.attr('value', this.setting.getAttribute('Name'));
	$('#displayName', basicAttrRegion).attr('value',
			this.setting.getAttribute('DisplayName'));
};

/**
 * 渲染扩展属性数据表格
 * 
 * @return
 */
CounterSignatureActivitySetting.prototype.renderExtra = function() {
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
CounterSignatureActivitySetting.prototype.renderSubProcessOfCounterSignatureActivity=function(subProcessName){
	this.renderProcessBasicAttrsOfCounterSignatureActSetting(subProcessName);
	// 启动参数
	this.renderStartParametersOfCounterSignatureActivity(subProcessName);
	// 相关数据
	this.renderOthersParametersOfCounterSignatureActivity(subProcessName);
};

/**
 * 渲染会签活动会签流程参数设置数据表格
 * 
 * @return
 */
CounterSignatureActivitySetting.prototype.renderParametersOfCounterSignatureActivity = function() {
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
	typerow1.push("false");
	typerow1.push("否");

	var typerow2 = [];
	typerow2.push("true");
	typerow2.push("是");

	var typeblock = new EiBlock(typemeta);

	typeblock.addRow(typerow1);
	typeblock.addRow(typerow2);

	info.addBlock(typeblock);

	var meta = new EiBlockMeta(GRIDNAME);
	var col1 = new EiColumn('subProcessName');
	col1.pos = 0;
	col1.descName = '启动流程名称';
	col1.labelProperty = 'subProcessName';
	col1.valueProperty = '启动流程名称';
	col1.width = '80';

	var col2 = new EiColumn('subProcessDisplayName');
	col2.descName = '启动流程显示名称';
	col2.pos = 1;
	col2.labelProperty = 'subProcessDisplayName';
	col2.valueProperty = '启动流程显示名称';
	col2.width = '120';

	var col3 = new EiColumn('subProcessParameters');
	col3.descName = '启动参数';
	col3.pos = 2;
	col3.labelProperty = 'subProcessParameters';
	col3.valueProperty = '启动参数';
	col3.width = '100';

	var col4 = new EiColumn('isStay');
	col4.pos = 3;
	col4.editor = 'combo';
	col4.descName = '停留在开始活动';
	col4.blockName = 'form';
	col4.valueProperty = 'A'; // Key
	col4.labelProperty = 'B'; // 界面显示
	col4.width = '80';

	var col5 = new EiColumn('operation');
	col5.pos = 4;
	col5.descName = '操作';
	col5.labelProperty = 'operation';
	col5.valueProperty = '操作';
	col5.version = '2.0';
	col5.defaultValue = this.editButton;
	col5.width = '60';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);
	meta.addMeta(col4);
	meta.addMeta(col5);

	var block = new EiBlock(meta);
	info.addBlock(block);
	var editButton = this.editButton;
	$(dom).find('SubProcesses>SubProcess').each(function() {
				var row = [];
				row.push(this.getAttribute("SubProcessName"));
				row.push(this.getAttribute("SubProcessDisplayName"));

				var startParameters = "";
				$(this).find('StartParameters>StartParameter').each(function() {
							startParameters = startParameters + $(this).text()
									+ ",";
						});
				row.push(startParameters);

				row.push(this.getAttribute("IsStay"));
				row.push(editButton);
				block.addRow(row);
			});

	// 绘制grid 
	var parametersGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				parametersGrid.paint();
			});
	return parametersGrid;

};

/**
 * 渲染会签活动流程参数之启动参数
 * 
 * @return {}
 */
CounterSignatureActivitySetting.prototype.renderStartParametersOfCounterSignatureActivity = function(
		subProcessName) {
	var GRIDNAME = "startParametersResult";
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
	typerow1.push("false");
	typerow1.push("否");

	var typerow2 = [];
	typerow2.push("true");
	typerow2.push("是");

	var typeblock = new EiBlock(typemeta);

	typeblock.addRow(typerow1);
	typeblock.addRow(typerow2);

	info.addBlock(typeblock);

	var meta = new EiBlockMeta(GRIDNAME);

	var col1 = new EiColumn('startParameter');
	col1.descName = '启动参数';
	col1.pos = 0;
	col1.labelProperty = 'startParameter';
	col1.valueProperty = '启动参数';
	col1.width = '120';

	var col2 = new EiColumn('mustCompleted');
	col2.pos = 1;
	col2.editor = 'combo';
	col2.descName = '是否必须完成';
	col2.blockName = 'form';
	col2.valueProperty = 'A'; // Key
	col2.labelProperty = 'B'; // 界面显示
	col2.width = '100';

	meta.addMeta(col1);
	meta.addMeta(col2);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 加载扩展属性数据
	if(subProcessName!=null){
	//var subProcesses=$(dom).find('SubProcesses');
	// var editingSubProcess = this.getSubProcessByName(subProcessName,subProcesses);
	 var editingSubProcess = parent.tempSelectedPart;
	 var params=$('StartParameters>StartParameter',$(editingSubProcess));
//	 
//	$(dom).find('SubProcesses SubProcess[SubProcessName="' + subProcessName
//			+ '"] StartParameters StartParameter')
			
			params.each(function() {
				var row = [];
				row.push($(this).text());
				row.push(this.getAttribute("MustCompleted"));
				block.addRow(row);
			});
	}
	// 绘制grid 
	var startParametersGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				startParametersGrid.paint();
			});
	return startParametersGrid;

};

/**
 * 渲染会签活动流程参数之相关数据
 * 
 * @return
 */
CounterSignatureActivitySetting.prototype.renderOthersParametersOfCounterSignatureActivity = function(
		subProcessName) {
	var GRIDNAME = "otherParametersResult";
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
	if(subProcessName!=null)
	//var subProcesses=$(dom).find('SubProcesses');
	// var editingSubProcess = this.getSubProcessByName(subProcessName,subProcesses);
	var editingSubProcess = parent.tempSelectedPart;
	
	 var params=$('Parameters>Parameter',$(editingSubProcess));
//	$(dom).find('SubProcesses SubProcess[SubProcessName="' + subProcessName
//			+ '"] Parameters Parameter')
			params.each(function() {
				var row = [];
				row.push(this.getAttribute("Variable"));
				row.push(this.getAttribute("SubVariable"));
				row.push(this.getAttribute("Type"));
				block.addRow(row);
			});

	// 绘制grid 
	var otherParametersGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				otherParametersGrid.paint();
			});
	return otherParametersGrid;

};

/**
 * 渲染会签活动属性配置页面
 */
CounterSignatureActivitySetting.prototype.renderCounterSignatureActSetting = function() {
	
	
	this.renderBasicAttrOfCounterSignatureActivity();
	this.renderExtra();
	this.renderParametersOfCounterSignatureActivity();
	// 启动参数
	//this.renderStartParametersOfCounterSignatureActivity("");
	// 相关数据
	//this.renderOthersParametersOfCounterSignatureActivity("");
	//$('#parameterAdd').hide();
	//$('#ef_grid_parametersResult').show();
	this.overwriteNewRecord();
};

CounterSignatureActivitySetting.prototype.overwriteNewRecord=function(){
	
	initNewRecord = efpage.newRecord;
	efpage.newRecord = function(grid_id) {
		if (grid_id == "ef_grid_parametersResult") {
			var options={'width':650,'height':500,'params':'efHeadTail=none'};
		    parent.dialog('会签流程参数设置', 'EW0122',options);
		}		
		else {
			curActivitySetting.newRecord(grid_id);
		}

	};				

};

/**
 * 保存会签活动属性设置
 */
CounterSignatureActivitySetting.prototype.updateCounterSignatureActSetting = function() {
	this.updateBasicAtrrOfCounterSignatureActSetting();
	this.updateExtra();
	this.updateProcessParameters();
	this.updateAttributeSetting();
};
/**
 * 保存会签活动基本属性设置
 */
CounterSignatureActivitySetting.prototype.updateBasicAtrrOfCounterSignatureActSetting = function() {
	// 获取活动属性配置
	var basicAttrRegion = $('#ef_region_basicAttr');
	var name = $('#name', basicAttrRegion).attr('value');
	var displayName = $('#displayName', basicAttrRegion).attr('value');
	// 设置基本属性
	var cas = this.setting;
	cas.setAttribute('Name', name);
	cas.setAttribute('DisplayName', displayName);
};

/**
 * 保存扩展属性设置
 * 
 * @return
 */
CounterSignatureActivitySetting.prototype.updateExtra = function() {
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
 * 更新会签流程参数设置
 */
CounterSignatureActivitySetting.prototype.updateProcessParameters = function() {
	var parametersGrid = parent.getIframe("EW0106").contentWindow.efform
			.getGrid("ef_grid_parametersResult");
	var parametersBlock = parametersGrid.eiinfo.getBlock("parametersResult");
    //得到会签流程参数DataGrid中子流程的流程名数组
	var subProcessNames = [];
	if (parametersBlock.getRows().length > 0) {
		for (var i = 0; i < parametersBlock.getRows().length; i++) {
			subProcessNames.push(parametersBlock.getCell(i, 'subProcessName'));
		}
	}
	//清理掉设置中在DataGrid中不包含的子流程
	$(this.setting).find('SubProcesses>SubProcess').each(function() {
				var hasDeleted = true;
				for (var i = 0; i < subProcessNames.length; i++) {
					if (this.getAttribute("SubProcessName") == subProcessNames[i])
						hasDeleted = false;
				}
				if (hasDeleted) {
					$(this).remove();
				}
			});
};


CounterSignatureActivitySetting.prototype.getEditingSubProcess=function(subProcessName){
var subProcesses = $(this.setting).find('SubProcesses')[0];
var editingSubProcess = this.getSubProcessByName(subProcessName,subProcesses);
return editingSubProcess;
};

/**
 * 增加流程参数
 * 
 * @return
 */
CounterSignatureActivitySetting.prototype.finishStartParameterAdd = function() {
	var parametersGridName = "parametersResult";
	var parametersGrid =parent.getIframe("EW0106").contentWindow.efform.getGrid("ef_grid_" + parametersGridName);
	var parametersInfo = parametersGrid.eiinfo;
	var parametersBlock = parametersInfo.getBlock(parametersGridName);

	var processBasicAttr = $('#processBasicAttr');
	var subProcessName = $('#subProcessName', processBasicAttr).val();
	var subProcessDisplayName = $('#subProcessDisplayName', processBasicAttr)
			.val();
	var invokeType = $('#invokeType', processBasicAttr).val();
	var isStay = $('#isStay', processBasicAttr).attr('value');
    var preSubProcessName =null;
    if(parent.tempSelectedPart!=null){
     preSubProcessName= parent.tempSelectedPart.getAttribute("SubProcessName");
    }
    
	var doc = this.createXmlDocument();
	var subProcesses = $(this.setting).find('SubProcesses')[0];
	var editingSubProcess = null;
	if (subProcesses == null) {
		subProcesses = doc.createElement('SubProcesses');
		$(this.setting).find('Extras')[0].appendChild(subProcesses);
	}
   var editingSubProcess = this.getSubProcessByName(preSubProcessName,subProcesses);
//	editingSubProcess = $('SubProcess[SubProcessName="' + preSubProcessName
//					+ '"]', subProcesses)[0];
	if (editingSubProcess == null) {
		editingSubProcess = doc.createElement('SubProcess');
		subProcesses.appendChild(editingSubProcess);
	} else
		$(editingSubProcess).empty();

	// 更新增加或编辑的子流程属性
	editingSubProcess.setAttribute('SubProcessName', subProcessName);
	editingSubProcess.setAttribute('SubProcessDisplayName',
			subProcessDisplayName);
	editingSubProcess.setAttribute('InvokeType', invokeType);
	editingSubProcess.setAttribute('IsStay', isStay);

	// 增加启动参数
	var startParameters = "";
	var startParametersGridName = "startParametersResult";
	var startParametersGrid = efform.getGrid("ef_grid_"
			+ startParametersGridName);
	var startParametersInfo = startParametersGrid.eiinfo;
	var startParametersBlock = startParametersInfo
			.getBlock(startParametersGridName);
	if (startParametersBlock.getRows().length > 0) {
		var sps = doc.createElement('StartParameters');
		editingSubProcess.appendChild(sps);
		for (var i = 0; i < startParametersBlock.getRows().length; i++) {
			var startParameter = startParametersBlock.getCell(i,
					'startParameter');
			startParameters = startParameters + startParameter + ",";
			var mustCompleted = startParametersBlock
					.getCell(i, 'mustCompleted');
			var spNode = doc.createElement('StartParameter');
			spNode.setAttribute('MustCompleted', mustCompleted);
			$(spNode).text(startParameter);
			sps.appendChild(spNode);
		}

	}

	// 增加相关数据
	var otherParametersGridName = "otherParametersResult";
	var otherParametersGrid = efform.getGrid("ef_grid_"
			+ otherParametersGridName);
	var otherParametersInfo = otherParametersGrid.eiinfo;
	var otherParametersBlock = otherParametersInfo
			.getBlock(otherParametersGridName);

	if (otherParametersBlock.getRows().length > 0) {
		var opNodes = doc.createElement('Parameters');
		editingSubProcess.appendChild(opNodes);
		for (var i = 0; i < otherParametersBlock.getRows().length; i++) {
			var type = otherParametersBlock.getCell(i, 'type');
			var variable = otherParametersBlock.getCell(i, 'variable');
			var subVariable = otherParametersBlock.getCell(i, 'subVariable');
			var opNode = doc.createElement('Parameter');
			opNode.setAttribute('Type', type);
			opNode.setAttribute('Variable', variable);
			opNode.setAttribute('SubVariable', subVariable);
			opNodes.appendChild(opNode);
		}
	}
	if (preSubProcessName != null) {
		// 删除该行
		if (parametersBlock.getRows().length > 0) {
			for (var i = 0; i < parametersBlock.getRows().length; i++) {
				if (parametersBlock.getCell(i, 'subProcessName') == preSubProcessName) {
					parametersGrid.removeRow(i);
					break;
				}
			}
		}
	}
	// 更新改行
	var row = [];
	row.push(subProcessName);
	row.push(subProcessDisplayName);
	row.push(startParameters);
	row.push(isStay);
	row.push(this.editButton);
	parametersBlock.addRow(row);
	parametersGrid.refresh(parametersInfo);
};

CounterSignatureActivitySetting.prototype.editStartParameterOfCounterSignatureActSetting = function(
		subProcessName) {
	var part=this.getEditingSubProcess(subProcessName);		
	parent.tempSelectedPart=part;
	var options={'width':650,'height':500,'params':'efHeadTail=none'};
		    parent.dialog('会签流程参数设置', 'EW0122',options);	
};

CounterSignatureActivitySetting.prototype.renderProcessBasicAttrsOfCounterSignatureActSetting = function(
		subProcessName) {
	if(subProcessName==null)return;

	var dom = this.setting;
	var subProcesses = $(this.setting).find('SubProcesses')[0];
//	var editingSubProcess = this.getEditingSubProcess(subProcessName);
	var editingSubProcess = parent.tempSelectedPart;
//	editingSubProcess = $(
//			'SubProcess[SubProcessName="' + subProcessName + '"]', subProcesses)[0];
	var processBasicAttr = $('#processBasicAttr');
	$('#subProcessName', processBasicAttr).attr('value', subProcessName);
	$('#subProcessDisplayName', processBasicAttr).attr('value',
			editingSubProcess.getAttribute('SubProcessDisplayName'));
	$('#invokeType', processBasicAttr).attr('value',
			editingSubProcess.getAttribute('InvokeType'));
	$('#isStay', processBasicAttr).attr('value',
			editingSubProcess.getAttribute('IsStay'));
	$('#preSubProcessName', processBasicAttr).attr('value', subProcessName);
	
	
};
CounterSignatureActivitySetting.prototype.getSubProcessByName=function(subProcessName,subProcesses){
	var subPross= $('SubProcess',subProcesses);
	var processes=[];
	subPross.each(function(){
	   if(this.getAttribute("SubProcessName")==subProcessName) processes.push(this);
	});
	return processes[0];
};