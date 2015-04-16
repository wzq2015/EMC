ManualActivitySetting=function (editor) {
	this.editor = editor;
	this.setting = this.getCurrentAttributeSetting();	
	this.actPartsSetting=new ActivityParticipantsSetting(editor);
};

mxUtils.extend(ManualActivitySetting, AttributeSetting);

ManualActivitySetting.prototype.actPartsSetting=null;



ManualActivitySetting.prototype.render = function() {
	this.renderBasicAttr();
	this.renderExtra();
	this.renderTaskTactics();
	this.renderEvents();
	this.renderReturnSetting();
	this.renderFormSetting();
	this.renderParticipantSet();
	this.actPartsSetting.renderActivityParticipantsTypeTree();
	this.actPartsSetting.renderActivityParticipantsGrid();
	this.overwriteNewRecord();
};
ManualActivitySetting.prototype.overwriteNewRecord=function(){
	efpage.newRecord = function(grid_id) {
		var actPartsType=null;
		if (grid_id == "ef_grid_participantSetResult") {
			var options={'width':650,'height':560,'params':'efHeadTail=none'};
		    parent.dialog('设置参与者', 'EW0120',options);
		} 		
		else if (grid_id == "ef_grid_activityParticipantsResult") {
			var url = curActivitySetting.getUrl();
			actPartsType=curActivitySetting.actPartsSetting.getActPartsType();
			if(actPartsType==null){
			alert('请选择任务接口类型！');return;
			}
			var foregroundService= curActivitySetting.actPartsSetting.getForegroundServiceByLabel(actPartsType);
			var pageLabel=$('PageName',$(foregroundService)).text();
			var wnd=$('Window',$(foregroundService))[0];
			var width=650;
			var height=530;
			if(wnd!=null){
			//width=wnd.getAttribute('Width');
			//height=wnd.getAttribute('Height');
			}	
			var options={'width':width,'height':height,'params':'efHeadTail=none'};
		    parent.dialog('添加参与者', pageLabel,options);
		}
		
		
		else {
			curActivitySetting.newRecord(grid_id);
		}
		
	};
	efgrid.removeSelectedRow = function(grid_id) {
		if (grid_id == "ef_grid_activityParticipantsResult") {

			actPartsType = curActivitySetting.actPartsSetting.getActPartsType();
			if (actPartsType == null) {
				alert('请选择任务接口类型！');
				return;
			}

			var grid = efform.getGrid(grid_id);

			var checkedRows = grid.getSelectRowsData();
			if (checkedRows.length > 0)
				for (var i = 0; i < checkedRows.length; i++) {
					var id = checkedRows[i]['Id'];
					curActivitySetting.actPartsSetting.deleteActivityParticipant(id);
				}

			var count = grid.getCheckedRowCount();
			var checkedRows = grid.getCheckedRows();
			for (var i = 0; i < count; i++) {
				grid.removeRow(checkedRows[i] - i);
			}

			grid.refresh();

			for (i = 0; i < grid._rowStyle.length; i++) {
				grid._rowStyle[i] = "tableRow" + i % 2;
			}

		} else {
			curActivitySetting.removeSelectedRow(grid_id);
		}

		// efform.setStatus(0,"删除"+rowLength+"条记录成功!");
	};
				

};
ManualActivitySetting.prototype.update = function() {
	this.updateBasicAtrr();
	this.updateExtra();
	this.updateTaskTactics();
	this.updateEvents();
	this.updateReturnSetting();
	this.updateFormSetting();
	this.updateParticipantSet();
    this.updateAttributeSetting();

	
};

/**
 * 渲染的基本属性设置页面
 */
ManualActivitySetting.prototype.renderBasicAttr = function() {
	var basicAttrRegion = $('#ef_region_basicAttr');
	$('#name', basicAttrRegion)
			.attr('value', this.setting.getAttribute('Name'));
	$('#displayName', basicAttrRegion).attr('value',
			this.setting.getAttribute('DisplayName'));
	$('#form', basicAttrRegion)
			.attr('value', this.setting.getAttribute('Form'));
	$('#desc', basicAttrRegion).attr('value',
			this.setting.getAttribute('Description').trim());
};

/**
 * 渲染扩展属性数据表格
 * 
 * @return
 */
ManualActivitySetting.prototype.renderExtra = function() {
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
 * 渲染事件配置数据表格
 * 
 * @return
 */
ManualActivitySetting.prototype.renderEvents = function() {
	var GRIDNAME = "eventsResult";
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
	typerow1.push("start");
	typerow1.push("活动开始时");

	var typerow2 = [];
	typerow2.push("assign");
	typerow2.push("任务分配后");

	var typerow3 = [];
	typerow3.push("end");
	typerow3.push("活动结束时");

	var typeblock = new EiBlock(typemeta);

	typeblock.addRow(typerow1);
	typeblock.addRow(typerow2);
	typeblock.addRow(typerow3);

	info.addBlock(typeblock);

	var col1 = new EiColumn('type');
	col1.pos = 0;
	col1.editor = 'combo';
	col1.descName = '触发类型';
	col1.blockName = 'form';
	col1.valueProperty = 'A'; // Key
	col1.labelProperty = 'B'; // 界面显示
	col1.width = '90';

	var meta = new EiBlockMeta(GRIDNAME);
	var col2 = new EiColumn('class');
	col2.pos = 1;
	col2.descName = '触发方法';
	col2.labelProperty = 'class';
	col2.valueProperty = '触发方法';
	col2.width = '200';

	var col3 = new EiColumn('description');
	col3.descName = '描述';
	col3.pos = 2;
	col3.labelProperty = 'description';
	col3.valueProperty = '描述';
	col3.width = '150';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 加载扩展属性数据
	$(dom).find('Event').each(function() {
				var row = [];
				row.push(this.attributes["Type"].value);
				var evtListener = $(this).find('EventListener');
				row.push($(evtListener)[0].attributes['class'].value);
				row.push($(evtListener)[0].attributes['Description'].value);
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
 * 渲染回退配置数据表格
 * 
 * @return
 */
ManualActivitySetting.prototype.renderReturnSetting = function() {
	var GRIDNAME = "returnSettingResult";
	var dom = $(this.setting);
	// 构造eiInfo
	var info = new EiInfo();

	var meta = new EiBlockMeta(GRIDNAME);

	var col1 = new EiColumn('Name');
	col1.descName = '活动名称';
	col1.pos = 0;
	col1.labelProperty = 'Name';
	col1.valueProperty = '活动名称';
	col1.width = '200';
	col1.readonly=true;

	var col2 = new EiColumn('DisplayName');
	col2.pos = 1;
	col2.descName = '活动显示名称';
	col2.labelProperty = 'DisplayName';
	col2.valueProperty = '活动显示名称';
	col2.width = '250';
	col2.readonly=true;

	meta.addMeta(col1);
	meta.addMeta(col2);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 加载回退属性数据
	var returnTactics = $(dom).find('ReturnsActivities');

	var returnTacticsRegion = $('#returnSetting');
	var returnScope = null;
	var returnType =  null;
	if(returnTactics.length>0){
	 returnScope =returnTactics[0].getAttribute("Type");
	  returnType =returnTactics[0].getAttribute("Enabled");
	}
	if (returnScope == null)
		returnScope = 'Last';
	$('#returnScope', returnTacticsRegion).attr('value', returnScope);

	var returnTypes = $('input', returnTacticsRegion);	
	returnTypes.each(function() {
				if ($(this).attr("value") == returnType)
					$(this).attr("checked", "checked");
			});	
   
	var selectedRows = [];
	$(dom).find('ReturnsActivity').each(function() {
				selectedRows.push(this.getAttribute("Name"));
			});
	var activities = this.getAllActivities();
	var curActivityName=this.setting.getAttribute("Name");
	//加载回退活动信息
	$(activities).each(function() {
				var row = [];
				var name = this.value.getAttribute("Name");
				var displayName =this.value.getAttribute("DisplayName");
				row.push(name);
				row.push(displayName);	
				if(name!=curActivityName)
				block.addRow(row);
			});	

	// 绘制grid 
	var returnsGrid = this.constructGrid(GRIDNAME, info, "false");
	//标注是否选中
	if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
		    for(var j=0;j<selectedRows.length;j++){
		        if(selectedRows[j]==block.getCell(i, 'Name'))
		        returnsGrid.setRowChecked(i,true);
		    }		   
		}
	$(document).ready(function() {
				returnsGrid.paint();
			});
			
	//设置回退范围的隐藏与显示
	//var returnTacticsRegion = $('#returnSetting');
	$('input[value="false"]', returnTacticsRegion).click(function(event){	
	  $('#rs', returnTacticsRegion).hide();
	  $('#ef_grid_returnSettingResult', returnTacticsRegion).hide(); 	  
	});
	$('input[value="true"]', returnTacticsRegion).click(function(event){	 
	  $('#rs', returnTacticsRegion).show();
	  $('#ef_grid_returnSettingResult', returnTacticsRegion).show();
	});
	
	//var returnSettingRegion = $('#returnSetting');
	//var returnScope = $('#returnScope', returnSettingRegion).attr('value');
//	var returnTypes = $('input', returnTacticsRegion);
//	var returnType = null;
//	returnTypes.each(function() {
//				if ($(this).attr("checked"))
//					returnType = $(this).attr("value");
//			});
	if(returnType=='false'){
	$('#rs', returnTacticsRegion).hide();
	  $('#ef_grid_returnSettingResult', returnTacticsRegion).hide(); 
	}
		
	return returnsGrid;

};



/**
 * 渲染事件配置数据表格
 * 
 * @return
 */
ManualActivitySetting.prototype.renderEvents = function() {
	var GRIDNAME = "eventsResult";
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
	typerow1.push("start");
	typerow1.push("活动开始时");

	var typerow2 = [];
	typerow2.push("assign");
	typerow2.push("任务分配后");

	var typerow3 = [];
	typerow3.push("end");
	typerow3.push("活动结束时");

	var typeblock = new EiBlock(typemeta);

	typeblock.addRow(typerow1);
	typeblock.addRow(typerow2);
	typeblock.addRow(typerow3);

	info.addBlock(typeblock);

	var col1 = new EiColumn('type');
	col1.pos = 0;
	col1.editor = 'combo';
	col1.descName = '触发类型';
	col1.blockName = 'form';
	col1.valueProperty = 'A'; // Key
	col1.labelProperty = 'B'; // 界面显示
	col1.width = '90';

	var meta = new EiBlockMeta(GRIDNAME);
	var col2 = new EiColumn('class');
	col2.pos = 1;
	col2.descName = '触发方法';
	col2.labelProperty = 'class';
	col2.valueProperty = '触发方法';
	col2.width = '200';

	var col3 = new EiColumn('description');
	col3.descName = '描述';
	col3.pos = 2;
	col3.labelProperty = 'description';
	col3.valueProperty = '描述';
	col3.width = '150';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 加载扩展属性数据
	$(dom).find('Event').each(function() {
				var row = [];
				row.push($(this).attr("Type"));
				var evtListener = $(this).find('EventListener');
				row.push($(evtListener[0]).attr('class'));
				row.push($(evtListener[0]).attr('Description'));
				block.addRow(row);
			});

	// 绘制grid 
	var eventGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				eventGrid.paint();
			});
	return eventGrid;

};

ManualActivitySetting.prototype.renderTaskTactics = function() {
	var taskTacticsRegion = $('#ef_region_taskTactics');
	var isDeffered = this.setting.getAttribute('IsDeffered');
	if (isDeffered == null)
		isDeffered = 'false';
	$('#isDeffered', taskTacticsRegion).attr('value', isDeffered);
	var handleTypes = $('input', taskTacticsRegion);
	var handleType = this.setting.getAttribute('HandleType');
	handleTypes.each(function() {
				if ($(this).attr("value") == handleType)
					$(this).attr("checked", "checked");
			});
};





/**
 * 渲染参与者数据表格
 * 
 * @return
 */
ManualActivitySetting.prototype.renderParticipantSet = function() {
	var GRIDNAME = "participantSetResult";
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
	typerow1.push("User");
	typerow1.push("用户");

	var typerow2 = [];
	typerow2.push("Role");
	typerow2.push("角色");

	var typerow3 = [];
	typerow3.push("PRCESS_INS_STARTER");
	typerow3.push("流程启动者");

	var typeblock = new EiBlock(typemeta);
	typeblock.addRow(typerow1);
	typeblock.addRow(typerow2);
	typeblock.addRow(typerow3);
	info.addBlock(typeblock);

	var meta = new EiBlockMeta(GRIDNAME);

	var col1 = new EiColumn('Id');
	col1.descName = '标识';
	col1.pos = 0;
	col1.labelProperty = 'Id';
	col1.valueProperty = '标识';
	col1.width = '150';
	col1.readonly=true;

	var col2 = new EiColumn('Name');
	col2.pos = 1;
	col2.descName = '名称';
	col2.labelProperty = 'Name';
	col2.valueProperty = '名称';
	col2.width = '180';
    col2.readonly=true;
    
	var col3 = new EiColumn('Type');
	col3.pos = 2;
	col3.editor = 'combo';
	col3.descName = '类型';
	col3.blockName = 'form';
	col3.valueProperty = 'A'; // Key
	col3.labelProperty = 'B'; // 界面显示
	col3.width = '150';
    col3.readonly=true;
    
	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);
	var block = new EiBlock(meta);
	info.addBlock(block);

	$(dom).find('ParticipantSet>Participant').each(function() {
				var row = [];
				$.each(this.attributes, function(i, attrib) {
							var value = attrib.value;
							row.push(value);
						});
				block.addRow(row);

			});

	// 绘制grid 
	var participantSetGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				participantSetGrid.paint();
			});		
	
	return participantSetGrid;

};


/**
 * 渲染表单配置数据表格
 * 
 * @return
 */
ManualActivitySetting.prototype.renderFormSetting = function() {
	var GRIDNAME = "formSettingResult";
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
	typerow1.push("readonly");
	typerow1.push("只读");

	var typerow2 = [];
	typerow2.push("hide");
	typerow2.push("隐藏");

	var typerow3 = [];
	typerow3.push("normal");
	typerow3.push("正常");

	var typeblock = new EiBlock(typemeta);

	typeblock.addRow(typerow3);
	typeblock.addRow(typerow1);
	typeblock.addRow(typerow2);

	info.addBlock(typeblock);

	var meta = new EiBlockMeta(GRIDNAME);
	var col1 = new EiColumn('Name');
	col1.pos = 0;
	col1.descName = '字段名称';
	col1.labelProperty = 'Name';
	col1.valueProperty = '字段名称';
	col1.width = '120';
	col1.readonly=true;

	var meta = new EiBlockMeta(GRIDNAME);
	var col2 = new EiColumn('Type');
	col2.pos = 1;
	col2.descName = '字段类型';
	col2.labelProperty = 'Type';
	col2.valueProperty = '字段类型';
	col2.width = '120';
	col2.readonly=true;

	var col3 = new EiColumn('Display');
	col3.pos = 2;
	col3.editor = 'combo';
	col3.descName = '显示方式';
	col3.blockName = 'form';
	col3.valueProperty = 'A'; // Key
	col3.labelProperty = 'B'; // 界面显示
	col3.width = '80';

	var col4 = new EiColumn('DefaultValue');
	col4.descName = '缺省值';
	col4.pos = 3;
	col4.labelProperty = 'DefaultValue';
	col4.valueProperty = '缺省值';
	col4.width = '100';
	col4.readonly=true;

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);
	meta.addMeta(col4);

	var block = new EiBlock(meta);
	info.addBlock(block);
	var formName = this.setting.getAttribute('Form');
	if (formName == null || formName == "") {
		formName = "";
		// alert("请先在基本属性中设置业务地址属性！");
	} else {
		formName = formName.trim();
	}

	if ($(dom).find('Field').length == 0) {
		var fields = this.getFormFields(formName);
		$(fields).each(function() {
					var row = [];
					$(this).each(function() {
								// alert(this);
								row.push(this.toString());
							});
					block.addRow(row);
				});
	} else {
		$(dom).find('Field').each(function() {
					var row = [];
					$.each(this.attributes, function(i, attrib) {
								var value = attrib.value;
								row.push(value);
							});
					block.addRow(row);

				});
	}

	// 绘制grid 
	var eventGrid = this.constructGrid(GRIDNAME, info);
	$(document).ready(function() {
				eventGrid.paint();
			});
	return eventGrid;
};


/**
 * 渲染[角色类型+流程组织]输入数据表格
 * 
 * @return
 */
ManualActivitySetting.prototype.renderRoleWithOrg = function() {

	var GRIDNAME = "roleWithOrgResult";

	var info = new EiInfo();

	var meta = new EiBlockMeta(GRIDNAME);
	var col1 = new EiColumn('RoleName');
	col1.pos = 0;
	col1.descName = '角色类型编码';
	col1.labelProperty = 'RoleName';
	col1.valueProperty = '角色类型编码';
	col1.width = '100';

	var col2 = new EiColumn('RoleDisplayName');
	col2.pos = 1;
	col2.descName = '角色类型显示名称';
	col2.labelProperty = 'RoleDisplayName';
	col2.valueProperty = '角色类型显示名称';
	col2.width = '150';

	var col3 = new EiColumn('OrgCode');
	col3.descName = '组织编码在流程对应的参数编码';
	col3.pos = 2;
	col3.labelProperty = 'OrgCode';
	col3.valueProperty = '组织编码在流程对应的参数编码';
	col3.width = '200';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 绘制grid 
	var roleWithOrgGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				roleWithOrgGrid.paint();
			});
	return roleWithOrgGrid;
};

ManualActivitySetting.prototype.renderActivityLastExecutor = function() {

	var GRIDNAME = "activityLastExecutorResult";

	var info = new EiInfo();

	var meta = new EiBlockMeta(GRIDNAME);
	var col1 = new EiColumn('ActivityName');
	col1.pos = 0;
	col1.descName = '节点名称';
	col1.labelProperty = 'ActivityName';
	col1.valueProperty = '节点名称';
	col1.width = '100';

	var col2 = new EiColumn('ActivityDisplayName');
	col2.pos = 1;
	col2.descName = '节点显示显示名称';
	col2.labelProperty = 'ActivityDisplayName';
	col2.valueProperty = '节点显示显示名称';
	col2.width = '200';

	meta.addMeta(col1);
	meta.addMeta(col2);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 绘制grid 
	var activityLastExecutorGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				activityLastExecutorGrid.paint();
			});
	return activityLastExecutorGrid;
};
ManualActivitySetting.prototype.getFormFields = function(formName) {
	var rows = [];
	if (formName == "")
		return rows;
	info = new EiInfo();
	info.set('formName', formName);
	EiCommunicator.send('EDMD90', 'getFormFields', info, {
				onSuccess : function(outInfo) {
					block = outInfo.getBlock('result');
					rows = block.getRows();
				},
				onFail : function(message) {
					// alert(message);
				}
			}, false, false);
	return rows;
};


ManualActivitySetting.prototype.getAllActivities = function() {
	var graph = this.editor.graph;
	var root = null;
	root = graph.getCurrentRoot();
	if (root == null) {
		root = graph.getModel().getRoot();
	}
	var model = graph.getModel();
	var filter = function(cell) {
		var tagName=cell.value.tagName;
		return model.isVertex(cell)&&(tagName=='Start'||tagName=='Manual');
	}
	var acts = [];
	
	var rootChilds=model.getChildCells(model.getCell("1"));
	$(rootChilds).each(function(){
	   var tagName=this.value.tagName;
	   if(model.isVertex(this)&&tagName=='Swimlane'){
	     var slChilds=model.filterCells(model.getChildCells(this),filter);
	     $(slChilds).each(function(){
	     acts.push(this);
	     });
	   }
	   if(model.isVertex(this)&&(tagName=='Start'||tagName=='Manual'))
	     acts.push(this);
	});
	
	return acts;
};

ManualActivitySetting.prototype.verifyPartHasSelected = function(partId, type,
		partsBlock) {

	var verifyPartHasSelected = false;
	if (partsBlock.getRows().length > 0)
		for (var i = 0; i < partsBlock.getRows().length; i++) {
			if (partsBlock.getCell(i, 'Id') == partId
					&& partsBlock.getCell(i, 'Type') == type) {
				verifyPartHasSelected = true;
				break;
			}
		}
	return verifyPartHasSelected;
};


/**
 * 增加参与者
 * 
 * @return
 */
ManualActivitySetting.prototype.finishParticipantsSelection = function() {
	var partsGridName = "participantSetResult";
	var partsGrid = $('iframe',parent.$("#EW0101"))[0].contentWindow.efform.getGrid("ef_grid_" + partsGridName);	
	var partsInfo = partsGrid.eiinfo;
	var partsBlock = partsInfo.getBlock(partsGridName);
	// 选择角色
	var rolesGridName = "Roles";
	var rolesGrid = efform.getGrid("ef_grid_" + rolesGridName);
	var rolesInfo = rolesGrid.eiinfo;
	var rolesBlock = rolesInfo.getBlock(rolesGridName);
	 var rolesCheckedRows=rolesGrid.getSelectRowsData();
	if (rolesCheckedRows.length > 0)
		for (var i = 0; i < rolesCheckedRows.length; i++) {
			var roleId = rolesCheckedRows[i]['RoleId'];
			var type = "Role";
			if (this.verifyPartHasSelected(roleId, type, partsBlock))
				continue;
			var row = [];
			row.push(roleId);
			row.push(rolesCheckedRows[i]['RoleName']);
			row.push(type);
			partsBlock.addRow(row);
		}
	// 选择用户
	var usrsGridName = "Users";
	var usrsGrid = efform.getGrid("ef_grid_" + usrsGridName);
	var usrsInfo = usrsGrid.eiinfo;
	var usrsBlock = usrsInfo.getBlock(usrsGridName);
	var usrsCheckedRows=usrsGrid.getSelectRowsData();
	if (usrsCheckedRows.length > 0)
		for (var i = 0; i < usrsCheckedRows.length; i++) {
			var userId = usrsCheckedRows[i]['UserId'];
			var type = "User";
			if (this.verifyPartHasSelected(userId, type, partsBlock))
				continue;
			var row = [];
			row.push(userId);
			row.push(usrsCheckedRows[i]['UserName']);
			row.push(type);
			partsBlock.addRow(row);
		}
	// 选择启动者
	if ($("#processStarter input").is(":checked")
			&& !this.verifyPartHasSelected("PRCESS_INS_STARTER",
					"PRCESS_INS_STARTER", partsBlock)) {
		var row = [];
		row.push("PRCESS_INS_STARTER");
		row.push("流程启动者");
		row.push("PRCESS_INS_STARTER");
		partsBlock.addRow(row);
	}
	// 绘制grid 

    partsGrid.refresh(partsInfo);
};
/**
 * 保存参与者配置
 * 
 * @return
 */
ManualActivitySetting.prototype.updateParticipantSet = function() {
	var GRIDNAME = "participantSetResult";
	var doc = this.createXmlDocument();
	var participantSet = $(this.setting).find('ParticipantSet')[0];
	if (participantSet == null) {
		participantSet = doc.createElement('ParticipantSet');
		$(this.setting).find('Extras')[0].appendChild(participantSet);
	} else
		$(participantSet).empty();

	var grid = efform.getGrid("ef_grid_" + GRIDNAME);
	var eiinfo = grid.eiinfo;
	var block = eiinfo.getBlock(GRIDNAME);
	var participant = null;
	if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
			participant = doc.createElement('Participant');
			participant.setAttribute('Id', block.getCell(i, 'Id'));
			participant.setAttribute('Name', block.getCell(i, 'Name'));
			participant.setAttribute('Type', block.getCell(i, 'Type'));
			participantSet.appendChild(participant);
		}
};

ManualActivitySetting.prototype.updateTaskTactics = function() {
	// 获取任务策略属性配置
	var taskTacticsRegion = $('#ef_region_taskTactics');
	var isDeffered = $('#isDeffered', taskTacticsRegion).attr('value');
	var handleTypes = $('input', taskTacticsRegion);
	var handleType = null;
	handleTypes.each(function() {
				if ($(this).attr("checked"))
					handleType = $(this).attr("value");
			});

	// 设置基本属性
	var cas = this.setting;
	cas.setAttribute('IsDeffered', isDeffered);
	cas.setAttribute('HandleType', handleType);
};

/**
 * 保存事件配置
 * 
 * @return
 */
ManualActivitySetting.prototype.updateEvents = function() {
	var GRIDNAME = "eventsResult";
	var doc = this.createXmlDocument();
	var events = $(this.setting).find('Events')[0];
	if (events == null) {
		events = doc.createElement('Events');
		$(this.setting).find('Extras')[0].appendChild(events);
	} else
		$(events).empty();

	var grid = efform.getGrid("ef_grid_" + GRIDNAME);
	var eiinfo = grid.eiinfo;
	var block = eiinfo.getBlock(GRIDNAME);
	
	if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
			var event = doc.createElement('Event');
			event.setAttribute('Type', block.getCell(i, 'type'));
			var evtListener = doc.createElement('EventListener');
			evtListener.setAttribute('class', block.getCell(i, 'class'));
			evtListener.setAttribute('Description', block.getCell(i,
							'description'));
			event.appendChild(evtListener);
			events.appendChild(event);
		}

};
/**
 * 保存回退设置
 * 
 * @return
 */
ManualActivitySetting.prototype.updateReturnSetting = function() {
	var GRIDNAME = "returnSettingResult";

	var doc = this.createXmlDocument();
	var racts = $(this.setting).find('ReturnsActivities')[0];
	if (racts == null) {
		racts = doc.createElement('ReturnsActivities');
		$(this.setting).find('Extras')[0].appendChild(racts);
	} else
		$(racts).empty();

	// 设置回退策略配置
	var returnSettingRegion = $('#returnSetting');
	var returnScope = $('#returnScope', returnSettingRegion).attr('value');
	var returnTypes = $('input', returnSettingRegion);
	var returnType = null;
	returnTypes.each(function() {
				if ($(this).attr("checked"))
					returnType = $(this).attr("value");
			});
	racts.setAttribute('Enabled', returnType);
	racts.setAttribute('Type', returnScope);
	// 设置回退范围
	if(returnScope=="Appointed"){
	var grid = efform.getGrid("ef_grid_" + GRIDNAME);
	var eiinfo = grid.eiinfo;
	var block = eiinfo.getBlock(GRIDNAME);
	var variable = null;
	var ractCheckedRows=grid.getSelectRowsData();
	if (ractCheckedRows.length > 0)
		for (var i = 0; i < ractCheckedRows.length; i++) {
			ract = doc.createElement('ReturnsActivity');
			ract.setAttribute('Name', ractCheckedRows[i]['Name']);
			ract.setAttribute('DisplayName', ractCheckedRows[i]['DisplayName']);
			racts.appendChild(ract);
		}
	}
};
/**
 * 保存表单设置
 * 
 * @return
 */
ManualActivitySetting.prototype.updateFormSetting = function() {
	var GRIDNAME = "formSettingResult";
	var doc = this.createXmlDocument();
	var form = $(this.setting).find('Form')[0];
	if (form == null) {
		form = doc.createElement('Form');
		$(this.setting).find('Extras')[0].appendChild(form);
	} else
		$(form).empty();

	var grid = efform.getGrid("ef_grid_" + GRIDNAME);
	var eiinfo = grid.eiinfo;
	var block = eiinfo.getBlock(GRIDNAME);
	var field = null;
	if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
			field = doc.createElement('Field');
			field.setAttribute('Name', block.getCell(i, 'Name'));
			field.setAttribute('Type', block.getCell(i, 'Type'));
			field.setAttribute('Value', block.getCell(i, 'Display'));
			var defaultValue = block.getCell(i, 'DefaultValue');
			field
					.setAttribute('Desc', defaultValue == null
									? ""
									: defaultValue);
			form.appendChild(field);
		}
};


/**
 * 保存活动基本属性设置
 */
ManualActivitySetting.prototype.updateBasicAtrr = function() {

	// 获取活动属性配置
	var basicAttrRegion = $('#ef_region_basicAttr');
	var name = $('#name', basicAttrRegion).attr('value');
	var displayName = $('#displayName', basicAttrRegion).attr('value');
	var form = $('#form', basicAttrRegion).attr('value');;
	var description = $('#desc', basicAttrRegion).attr('value');
	// 设置基本属性
	var cas = this.setting;
	cas.setAttribute('Name', name);
	cas.setAttribute('DisplayName', displayName);
	cas.setAttribute('Form', form);
	cas.setAttribute('Description', description);
};






/**
 * 保存扩展属性设置
 * 
 * @return
 */
ManualActivitySetting.prototype.updateExtra = function() {
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


