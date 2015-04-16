ActivityParticipantsSetting=function (editor) {
	this.editor = editor;
	this.setting = this.getCurrentAttributeSetting();
};

mxUtils.extend(ActivityParticipantsSetting, AttributeSetting);
//ActivityParticipantsSetting.prototype.deleteButton = "<div align=\"center\"><input class=\"buttonclass\" type=\"button\" align=\"center\" value=\"删除\" onclick=\"button_delete_onclick(this);\"></div>";
//ActivityParticipantsSetting.prototype.disabledButton = "<div align=\"center\"><input class=\"buttonclass\" type=\"button\" align=\"center\" value=\"编辑\" onclick=\"button_edit_onclick(this);\" disabled></div>";
ActivityParticipantsSetting.prototype.disabledButton = "<div align=\"center\"></div>";
ActivityParticipantsSetting.prototype.editButton = "<div align=\"center\"><input class=\"buttonclass\" type=\"button\" align=\"center\" value=\"编辑\" onclick=\"button_edit_onclick(this);\"></div>";
ActivityParticipantsSetting.prototype.viewButton = "<div align=\"center\"><input class=\"buttonclass\" type=\"button\" align=\"center\" value=\"查看数据\" onclick=\"button_view_onclick(this);\"></div>";
ActivityParticipantsSetting.prototype.participantExtendSetXml = null;
ActivityParticipantsSetting.prototype.actPartsType = null;
ActivityParticipantsSetting.prototype.getActPartsType = function() {
	return this.actPartsType;
};
ActivityParticipantsSetting.prototype.deleteActivityParticipant = function(id) {
	var actPartsType=this.getActPartsType();
	this.removeParticipantsByType(actPartsType,id);	
};

ActivityParticipantsSetting.prototype.editActivityParticipant = function(id) {
	var actPartsType=this.getActPartsType();
	var part=null;
	if (actPartsType == "CustomizeDataset") {
//		$(dom)
//				.find('Participants[ParticipantType="CustomizeDataset"] Participant')
		var parts=this.getParticipantsByType("CustomizeDataset");
		$("Participant",parts).each(function() {
							 if(this.getAttribute("Name")==id){
						 	part=this;
						 	return;
						 	}	

						});
	parent.tempSelectedPart=part;
	var options={'width':550,'height':400,'params':'efHeadTail=none'};
	parent.dialog('编辑数据集参与者', 'EW0124',options);
	}	
};

ActivityParticipantsSetting.prototype.viewActivityParticipant = function(id) {
	var actPartsType=this.getActPartsType();
	var part=null;
	// 获取[角色类型+流程组织]的活动接口
	if (actPartsType == "EpassRoleWithInputOrg") {
		var parts=this.getParticipantsByType("EpassRoleWithInputOrg");
				$("Participant",parts).each(function() {
							 if(this.getAttribute("Name")==id){
						 	part=this;
						 	return;
						 	}	

						});
		// this.renderRoleWithOrg();
	}
	// 获取[取指定节点最后一次参与执行者]的活动接口
	if (actPartsType == "ActivityLastExecutor") {
		var parts=this.getParticipantsByType("ActivityLastExecutor");
//		$(dom)
//				.find('Participants[ParticipantType="ActivityLastExecutor"] Participant')
				$("Participant",parts).each(function() {
							 if(this.getAttribute("Name")==id){
						 	part=this;
						 	return;
						 	}	

						});
	}
	// 获取[协办参与者]的活动接口
	if (actPartsType == "Collaborator") {
		var parts=this.getParticipantsByType("Collaborator");
//		$(dom).find('Participants[ParticipantType="Collaborator"] Participant')
				$("Participant",parts).each(function() {
						 if(this.getAttribute("Name")==id){
						 	part=this;
						 	return;
						 	}							
						});
	}
	// 获取[数据集参与者]的活动接口
	if (actPartsType == "CustomizeDataset") {
//		$(dom)
//				.find('Participants[ParticipantType="CustomizeDataset"] Participant')
		var parts=this.getParticipantsByType("CustomizeDataset");
		$("Participant",parts).each(function() {
							 if(this.getAttribute("Name")==id){
						 	part=this;
						 	return;
						 	}	

						});
	}
	parent.tempSelectedPart=part;
	var options={'width':550,'height':350,'params':'efHeadTail=none'};
	parent.dialog('参与者详细信息', 'EW0123',options);
};

/**
 * 按类型渲染任务接口数据表格
 * 
 * @return
 */
ActivityParticipantsSetting.prototype.renderActivityParticipantsByType = function(
		actPartsType) {
	var dom = $(this.setting);
	var grid = this.getActivityParticipantsGrid("activityParticipantsResult");
	var eiinfo = grid.eiinfo;
	var block = eiinfo.getBlock("activityParticipantsResult");
	var disabledButton = this.disabledButton;
	var editButton = this.editButton;
	var viewButton = this.viewButton;
	// 获取[角色类型+流程组织]的活动接口
	if (actPartsType == "EpassRoleWithInputOrg") {
		var parts=this.getParticipantsByType("EpassRoleWithInputOrg");
				$("Participant",parts).each(function() {
							var row = [];
							row.push(this.getAttribute("Name"));
							row.push($('RoleDisplayName', $(this)).text());
							row.push("EpassRoleWithInputOrg");
							row.push(disabledButton);
							row.push(viewButton);
							block.addRow(row);

						});
		// this.renderRoleWithOrg();
	}
	// 获取[取指定节点最后一次参与执行者]的活动接口
	if (actPartsType == "ActivityLastExecutor") {
		var parts=this.getParticipantsByType("ActivityLastExecutor");
//		$(dom)
//				.find('Participants[ParticipantType="ActivityLastExecutor"] Participant')
				$("Participant",parts).each(function() {
							var row = [];
							row.push(this.getAttribute("Name"));
							row.push($('ActivityDisplayName', $(this)).text());
							row.push("ActivityLastExecutor");
							row.push(disabledButton);
							row.push(viewButton);
							block.addRow(row);

						});
	}
	// 获取[协办参与者]的活动接口
	if (actPartsType == "Collaborator") {
		var parts=this.getParticipantsByType("Collaborator");
//		$(dom).find('Participants[ParticipantType="Collaborator"] Participant')
				$("Participant",parts).each(function() {
							var row = [];
							row.push(this.getAttribute("Name"));
							row.push($('DisplayName', $(this)).text());
							row.push("Collaborator");
							row.push(disabledButton);
							row.push(viewButton);
							block.addRow(row);
						});
	}
	// 获取[数据集参与者]的活动接口
	if (actPartsType == "CustomizeDataset") {
//		$(dom)
//				.find('Participants[ParticipantType="CustomizeDataset"] Participant')
		var parts=this.getParticipantsByType("CustomizeDataset");
		$("Participant",parts).each(function() {
							var row = [];
							row.push(this.getAttribute("Name"));
							row.push(this.getAttribute("DisplayName"));
							row.push("CustomizeDataset");
							row.push(editButton);
							row.push(viewButton);
							block.addRow(row);

						});
	}

	$(document).ready(function() {
				grid.paint();
			});
};
ActivityParticipantsSetting.prototype.getParticipantsByType=function(participantLabel){
	var participants= $('ActivityParticipants>Participants',$(this.setting));
	var parts=[];
	participants.each(function(){
	   if(this.getAttribute("ParticipantType")==participantLabel) parts.push(this);
	});
	return parts;
};

ActivityParticipantsSetting.prototype.removeParticipantsByType=function(participantLabel,name){
	var participants= $('ActivityParticipants>Participants',$(this.setting));
	participants.each(function(){
	   if(this.getAttribute("ParticipantType")==participantLabel){
	   var parts=$('Participant',$(this));
	   parts.each(function(){
	   if(this.getAttribute("Name")==name)
	     $(this).remove();
	   });
	   } 
	});
};

ActivityParticipantsSetting.prototype.renderActivityParticipantsGrid = function() {
	var grid = this.getActivityParticipantsGrid("activityParticipantsResult");
	$(document).ready(function() {
				grid.paint();
			});
};
/**
 * 切换任务接口数据表格
 * 
 * @return
 */
ActivityParticipantsSetting.prototype.switchActivityParticipantsByType = function(
		actPartsType) {
	this.actPartsType = actPartsType;
	var grid = this.renderActivityParticipantsByType(actPartsType);
};

ActivityParticipantsSetting.prototype.getActivityParticipantsGrid = function(gridName) {

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

	var meta = new EiBlockMeta(gridName);

	var col1 = new EiColumn('Id');
	col1.descName = '标识';
	col1.pos = 0;
	col1.labelProperty = 'Id';
	col1.valueProperty = '标识';
	col1.width = '100';

	var col2 = new EiColumn('Name');
	col2.pos = 1;
	col2.descName = '名称';
	col2.labelProperty = 'Name';
	col2.valueProperty = '名称';
	col2.width = '100';

	var col3 = new EiColumn('Type');
	col3.pos = 2;
	col3.descName = '类型';
	col3.blockName = 'form';
	col3.labelProperty = 'Name';
	col3.valueProperty = '名称';
	col3.width = '100';
	
	
	var col4 = new EiColumn('edit');
	col4.pos = 3;
	col4.descName = '编辑';
	col4.labelProperty = 'edit';
	col4.valueProperty = '编辑';
	col4.version = '2.0';
	col4.defaultValue = this.editButton;
	col4.width = '60';
	
	
	var col5 = new EiColumn('view');
	col5.pos = 4;
	col5.descName = '查看数据';
	col5.labelProperty = 'view';
	col5.valueProperty = '查看数据';
	col5.version = '2.0';
	col5.defaultValue = this.viewButton;
	col5.width = '60';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);
	meta.addMeta(col4);
	meta.addMeta(col5);
	var block = new EiBlock(meta);
	info.addBlock(block);

	// 绘制grid 
	return  this.constructGrid(gridName, info, "true");
};


/**
 * 渲染[角色类型+流程组织]输入数据表格
 * 
 * @return
 */
ActivityParticipantsSetting.prototype.renderRoleWithOrg = function() {

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

ActivityParticipantsSetting.prototype.renderActivityLastExecutor = function() {

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


ActivityParticipantsSetting.prototype.renderCustomizeDataset = function() {

	var GRIDNAME = "customizeDatasetResult";

	var info = new EiInfo();

	var meta = new EiBlockMeta(GRIDNAME);
	var col1 = new EiColumn('Id');
	col1.pos = 0;
	col1.descName = '标识';
	col1.labelProperty = 'Id';
	col1.valueProperty = '标识';
	col1.width = '100';

	var col2 = new EiColumn('Name');
	col2.pos = 1;
	col2.descName = '名称';
	col2.labelProperty = 'Name';
	col2.valueProperty = '名称';
	col2.width = '100';
	
	var col3 = new EiColumn('TableName');
	col3.pos = 2;
	col3.descName = '表名';
	col3.labelProperty = 'TableName';
	col3.valueProperty = '表名';
	col3.width = '100';
	
	
	var col4 = new EiColumn('Rule');
	col4.pos = 3;
	col4.descName = '规则条件';
	col4.labelProperty = 'Rule';
	col4.valueProperty = '规则条件';
	col4.width = '450';
	
  
	var col5 = new EiColumn('ParticipantType');
	col5.pos = 4;
	col5.descName = '参与者类型';
	col5.labelProperty = 'ParticipantType';
	col5.valueProperty = '参与者类型';
	col5.width = '50';
	
	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);
	meta.addMeta(col4);
	//meta.addMeta(col5);

	var block = new EiBlock(meta);
	info.addBlock(block);

	// 绘制grid 
	var customizeDatasetGrid = this.constructGrid(GRIDNAME, info, "true");
	$(document).ready(function() {
				customizeDatasetGrid.paint();
			});
	
	initNewRecord=efpage.newRecord;
	efpage.newRecord = function( grid_id ){
		if(grid_id=="ef_grid_customizeDatasetResult")
		{
			
			var options={'width':650,'height':560,'params':'efHeadTail=none'};
		    parent.dialog('设置参与者', "EW0119",options);			
		}
		else{
			initNewRecord.call(this,grid_id);
		}

	};
	
	return customizeDatasetGrid;
};





ActivityParticipantsSetting.prototype.getParticipantExtendByLabel = function(
		participantLabel) {
	var participantExtend = $(DomHelper.parseXml(this.getParticipantExtendSetXml()))
			.find('ParticipantExtend>Label:contains("' + participantLabel
					+ '")').parent()[0];
	return participantExtend;
};
ActivityParticipantsSetting.prototype.getForegroundServiceByLabel = function(
		participantLabel) {
	var participantExtend = this.getParticipantExtendByLabel(participantLabel);
	var foregroundService = $('ForegroundService', $(participantExtend))[0];
	return foregroundService;
};

ActivityParticipantsSetting.prototype.finishCollaboratorSelection = function() {
    var parentIframeId=this.getParentDialogId()=="code"?"EW0107":"EW0101";
	var partsGridName = "activityParticipantsResult";
	var partsGrid = parent.getIframe(parentIframeId).contentWindow.efform.getGrid("ef_grid_" + partsGridName);	
	var partsInfo = partsGrid.eiinfo;
	var partsBlock = partsInfo.getBlock(partsGridName);

	// 选择角色
	var rolesGridName = "Roles";
	var rolesGrid = efform.getGrid("ef_grid_" + rolesGridName);
	var rolesInfo = rolesGrid.eiinfo;
	var rolesBlock = rolesInfo.getBlock(rolesGridName);
	
	// 选择用户
	var usrsGridName = "Users";
	var usrsGrid = efform.getGrid("ef_grid_" + usrsGridName);
	var usrsInfo = usrsGrid.eiinfo;
	var usrsBlock = usrsInfo.getBlock(usrsGridName);
	
	// 更新setting
	var doc = this.createXmlDocument();
	var actParts = $(this.setting).find('ActivityParticipants')[0];
	if (actParts == null) {
		actParts = doc.createElement('ActivityParticipants');
		$(this.setting).find('Extras')[0].appendChild(actParts);
	}
	var currentParticipantsExtend = this
			.getParticipantExtendByLabel("Collaborator");
	var participantTypeName = $('Name', $(currentParticipantsExtend)).text();
	var participantDescription = $('Description', $(currentParticipantsExtend))
			.text();
//	var participants = $(this.setting)
//			.find('ActivityParticipants Participants[ParticipantType="Collaborator"]')[0];
	var participants =  this.getParticipantsByType("Collaborator")[0];
	if (participants == null) {
		participants = doc.createElement('Participants');
		participants.setAttribute('ParticipantType', "Collaborator");
		participants.setAttribute('ParticipantTypeName', participantTypeName);
		participants.setAttribute('ParticipantDescription',
				participantDescription);
		$(this.setting).find('ActivityParticipants')[0]
				.appendChild(participants);
	}
	
	var participant = null;
   var rolesCheckedRows=rolesGrid.getSelectRowsData();
	if (rolesCheckedRows.length > 0)
		for (var i = 0; i < rolesCheckedRows.length; i++) {
			var roleId = rolesCheckedRows[i]['RoleId'];
			var roleName = rolesCheckedRows[i]['RoleName'];
			if (this.verifyPartHasSelected("Collaborator_" + roleId + "_Role",
					"Collaborator", partsBlock))
				continue;

			participant = doc.createElement('Participant');
			participant
					.setAttribute('Name', "Collaborator_" + roleId + "_Role");
			participant.setAttribute('DisplayName', roleName);
			var nameNode = doc.createElement('Name');
			$(nameNode).text(roleId);
			participant.appendChild(nameNode)
			var displayNameNode = doc.createElement('DisplayName');
			$(displayNameNode).text(roleName);
			participant.appendChild(displayNameNode)
			var typeNode = doc.createElement('Type');
			$(typeNode).text("Role");
			participant.appendChild(typeNode);
			participants.appendChild(participant);
		}
	var usrsCheckedRows=usrsGrid.getSelectRowsData();
	if (usrsCheckedRows.length > 0)
		for (var i = 0; i < usrsCheckedRows.length; i++) {
			var userId = usrsCheckedRows[i]['UserId'];
			var userName = usrsCheckedRows[i]['UserName'];
			if (this.verifyPartHasSelected("Collaborator_" + userId + "_User",
					"Collaborator", partsBlock))
				continue;
			participant = doc.createElement('Participant');
			participant
					.setAttribute('Name', "Collaborator_" + userId + "_User");
			participant.setAttribute('DisplayName', userName);
			var nameNode = doc.createElement('Name');
			$(nameNode).text(userId);
			participant.appendChild(nameNode)
			var displayNameNode = doc.createElement('DisplayName');
			$(displayNameNode).text(userName);
			participant.appendChild(displayNameNode)
			var typeNode = doc.createElement('Type');
			$(typeNode).text("User");
			participant.appendChild(typeNode);
			participants.appendChild(participant);
		}
	if ($("#processStarterResult input").is(":checked")
			&& !this.verifyPartHasSelected(
					"Collaborator_PRCESS_INS_STARTER_PRCESS_INS_STARTER",
					"PRCESS_INS_STARTER", partsBlock)) {
		participant = doc.createElement('Participant');
		var type = "PRCESS_INS_STARTER";
		participant.setAttribute('Name',
				"Collaborator_PRCESS_INS_STARTER_PRCESS_INS_STARTER");
		participant.setAttribute('DisplayName', "PRCESS_INS_STARTER");
		var nameNode = doc.createElement('Name');
		$(nameNode).text("PRCESS_INS_STARTER");
		participant.appendChild(nameNode)
		var displayNameNode = doc.createElement('DisplayName');
		$(displayNameNode).text("PRCESS_INS_STARTER");
		participant.appendChild(displayNameNode)
		var typeNode = doc.createElement('Type');
		$(typeNode).text(type);
		participant.appendChild(typeNode);
		participants.appendChild(participant);
	}
	
	//更新partsGrid
	if (rolesCheckedRows.length > 0)
		for (var i = 0; i < rolesCheckedRows.length; i++) {
			var roleId = rolesCheckedRows[i]['RoleId'];
			var roleName = rolesCheckedRows[i]['RoleName'];
			if (this.verifyPartHasSelected("Collaborator_" + roleId + "_Role",
					"Collaborator", partsBlock))
				continue;
			var row = [];
			row.push("Collaborator_" + roleId + "_Role");
			row.push(roleName);
			row.push("Collaborator");
			row.push(this.disabledButton);
			row.push(this.viewButton);
			partsBlock.addRow(row);
		}
     if (usrsCheckedRows.length > 0)
		for (var i = 0; i < usrsCheckedRows.length; i++) {
			var userId = usrsCheckedRows[i]['UserId'];
			var userName = usrsCheckedRows[i]['UserName'];
			if (this.verifyPartHasSelected("Collaborator_" + userId + "_User",
					"Collaborator", partsBlock))
				continue;
			var row = [];
			row.push("Collaborator_" + userId + "_User");
			row.push(userName);
			row.push("Collaborator");
			row.push(this.disabledButton);
			row.push(this.viewButton);
			partsBlock.addRow(row);
		}
	// 选择启动者
	if ($("#processStarter input").is(":checked")
			&& !this.verifyPartHasSelected(
					"Collaborator_PRCESS_INS_STARTER_PRCESS_INS_STARTER",
					"Collaborator", partsBlock)) {
		var row = [];
		row.push("Collaborator_PRCESS_INS_STARTER_PRCESS_INS_STARTER");
		row.push("流程启动者");
		row.push("Collaborator");
		row.push(this.disabledButton);
		row.push(this.viewButton);
		partsBlock.addRow(row);
	}
    partsGrid.refresh(partsInfo);	

	

};
ActivityParticipantsSetting.prototype.finishEpassRoleWithInputOrgSelection = function() {
	var rolesGridName = "roleWithOrgResult";
	var rolesGrid = efform.getGrid("ef_grid_" + rolesGridName);
	var rolesInfo = rolesGrid.eiinfo;	
	var rolesBlock = rolesInfo.getBlock(rolesGridName);
	
	var parentIframeId=this.getParentDialogId()=="code"?"EW0107":"EW0101";
	var partsGridName = "activityParticipantsResult";	
	var partsGrid = parent.getIframe(parentIframeId).contentWindow.efform.getGrid("ef_grid_" + partsGridName);	
	var partsInfo = partsGrid.eiinfo;
	var partsBlock = partsInfo.getBlock(partsGridName);
	
	// 更新setting
	var doc = this.createXmlDocument();
	var actParts = $(this.setting).find('ActivityParticipants')[0];
	if (actParts == null) {
		actParts = doc.createElement('ActivityParticipants');
		$(this.setting).find('Extras')[0].appendChild(actParts);
	}
	var currentParticipantsExtend = this
			.getParticipantExtendByLabel("EpassRoleWithInputOrg");
	var participantTypeName = $('Name', $(currentParticipantsExtend)).text();
	var participantDescription = $('Description', $(currentParticipantsExtend))
			.text();
//	var participants = $(this.setting)
//			.find('ActivityParticipants Participants[ParticipantType="EpassRoleWithInputOrg"]')[0];
	var participants =  this.getParticipantsByType("EpassRoleWithInputOrg")[0];
	if (participants == null) {
		participants = doc.createElement('Participants');
		participants.setAttribute('ParticipantType', "EpassRoleWithInputOrg");
		participants.setAttribute('ParticipantTypeName', participantTypeName);
		participants.setAttribute('ParticipantDescription',
				participantDescription);
		$(this.setting).find('ActivityParticipants')[0]
				.appendChild(participants);
	}
	
	var participant = null;
	if (rolesBlock.getRows().length > 0)
		for (var i = 0; i < rolesBlock.getRows().length; i++) {
			
			var roleName = rolesBlock.getCell(i, 'RoleName');
			var orgCode = rolesBlock.getCell(i, 'OrgCode');
			var roleDisplayName = rolesBlock.getCell(i, 'RoleDisplayName');
			if(this.verifyPartHasSelected("EpassRoleWithInputOrg_" + roleName + "_" + orgCode,"EpassRoleWithInputOrg",partsBlock))continue;
			participant = doc.createElement('Participant');
			participant.setAttribute('Name', "EpassRoleWithInputOrg_"
							+ roleName + "_" + orgCode);
			participant.setAttribute('DisplayName', roleDisplayName);
			var roleNameNode = doc.createElement('RoleName');
			$(roleNameNode).text(roleName);
			participant.appendChild(roleNameNode)
			var roleDisplayNode = doc.createElement('RoleDisplayName');
			$(roleDisplayNode).text(roleDisplayName);
			participant.appendChild(roleDisplayNode)
			var orgCodeNode = doc.createElement('OrgCode');
			$(orgCodeNode).text(orgCode);
			participant.appendChild(orgCodeNode)
			participants.appendChild(participant);
		}
		
	//更新partsGrid
	
	if (rolesBlock.getRows().length > 0)
		for (var i = 0; i < rolesBlock.getRows().length; i++) {
			var roleName = rolesBlock.getCell(i, 'RoleName');
			var orgCode = rolesBlock.getCell(i, 'OrgCode');
			if(this.verifyPartHasSelected("EpassRoleWithInputOrg_" + roleName + "_" + orgCode,"EpassRoleWithInputOrg",partsBlock))continue;
			
			var row = [];
			row.push("EpassRoleWithInputOrg_" + roleName + "_" + orgCode);
			row.push(rolesBlock.getCell(i, 'RoleDisplayName'));
			row.push("EpassRoleWithInputOrg");
			row.push(this.disabledButton);
			row.push(this.viewButton);
			partsBlock.addRow(row);
		}
		partsGrid.refresh(partsInfo);	
};

ActivityParticipantsSetting.prototype.finishActivityLastExecutorSelection = function() {
	var executorsGridName = "activityLastExecutorResult";
	var executorsGrid = efform.getGrid("ef_grid_" + executorsGridName);
	var executorsInfo = executorsGrid.eiinfo;
	var executorsBlock = executorsInfo.getBlock(executorsGridName);
	
	var parentIframeId=this.getParentDialogId()=="code"?"EW0107":"EW0101";
	var partsGridName = "activityParticipantsResult";
	var partsGrid = parent.getIframe(parentIframeId).contentWindow.efform.getGrid("ef_grid_" + partsGridName);	
	var partsInfo = partsGrid.eiinfo;	
	var partsBlock = partsInfo.getBlock(partsGridName);
	
			
	// 更新setting
	var doc = this.createXmlDocument();
	var actParts = $(this.setting).find('ActivityParticipants')[0];
	if (actParts == null) {
		actParts = doc.createElement('ActivityParticipants');
		$(this.setting).find('Extras')[0].appendChild(actParts);
	}
	var currentParticipantsExtend = this
			.getParticipantExtendByLabel("ActivityLastExecutor");
	var participantTypeName = $('Name', $(currentParticipantsExtend)).text();
	var participantDescription = $('Description', $(currentParticipantsExtend))
			.text();
//	var participants = $(this.setting)
//			.find('ActivityParticipants Participants[ParticipantType="ActivityLastExecutor"]')[0];
	var participants =  this.getParticipantsByType("ActivityLastExecutor")[0];
	if (participants == null) {
		participants = doc.createElement('Participants');
		participants.setAttribute('ParticipantType', "ActivityLastExecutor");
		participants.setAttribute('ParticipantTypeName', participantTypeName);
		participants.setAttribute('ParticipantDescription',
				participantDescription);
		$(this.setting).find('ActivityParticipants')[0]
				.appendChild(participants);
	}
	
	var participant = null;
	if (executorsBlock.getRows().length > 0)
		for (var i = 0; i < executorsBlock.getRows().length; i++) {			
			var activityName = executorsBlock.getCell(i, 'ActivityName');
			var activityDisplayName = executorsBlock.getCell(i,
					'ActivityDisplayName');
			if(this.verifyPartHasSelected("ActivityLastExecutor_" + activityName,"ActivityLastExecutor",partsBlock))continue;
			
			participant = doc.createElement('Participant');
			participant.setAttribute('Name', "ActivityLastExecutor_"
							+ activityName);
			participant.setAttribute('DisplayName', activityDisplayName);
			var activityNameNode = doc.createElement('ActivityName');
			$(activityNameNode).text(activityName);
			participant.appendChild(activityNameNode);
			var activityDisplayNameNode = doc
					.createElement('ActivityDisplayName');
			$(activityDisplayNameNode).text(activityDisplayName);
			participant.appendChild(activityDisplayNameNode);
			participants.appendChild(participant);
		}
	
	
	//更新partsGrid
	if (executorsBlock.getRows().length > 0)
		for (var i = 0; i < executorsBlock.getRows().length; i++) {
			var activityName = executorsBlock.getCell(i, 'ActivityName');
			var activityDisplayName = executorsBlock.getCell(i,
					'ActivityDisplayName');
			if(this.verifyPartHasSelected("ActivityLastExecutor_" + activityName,"ActivityLastExecutor",partsBlock))continue;
			var row = [];
			row.push("ActivityLastExecutor_" + activityName);
			row.push(activityDisplayName);
			row.push("ActivityLastExecutor");
			row.push(this.disabledButton);
			row.push(this.viewButton);
			partsBlock.addRow(row);
		}	
	partsGrid.refresh(partsInfo);	
};

ActivityParticipantsSetting.prototype.finishPostOrGroupSelection = function() {
    var custDSGridName = "customizeDatasetResult";
    var custDSGrid = parent.getIframe('EW0115').contentWindow.efform.getGrid("ef_grid_" + custDSGridName);	
	var custDSInfo = custDSGrid.eiinfo;
	var custDSBlock = custDSInfo.getBlock(custDSGridName);
	
	var postsGridName = "Posts";
	var postsGrid = efform.getGrid("ef_grid_" + postsGridName);
	var postsInfo = postsGrid.eiinfo;	
	var postsBlock = postsInfo.getBlock(postsGridName);
	
	var groupsGridName = "Groups";
	var groupsGrid = efform.getGrid("ef_grid_" + groupsGridName);
	var groupsInfo = groupsGrid.eiinfo;	
	var groupsBlock = groupsInfo.getBlock(groupsGridName);

    //更新custDSGrid
	var postsCheckedRows=postsGrid.getSelectRowsData();
	if (postsCheckedRows.length > 0)
		for (var i = 0; i < postsCheckedRows.length; i++) {
			var postName = postsCheckedRows[i]['PostName'];
			var postDisplayName = postsCheckedRows[i]['PostDisplayName'];
			if(this.verifyCustDSHasSelected(postName,postDisplayName,custDSBlock))continue;
			var row = [];
			row.push(postName);
			row.push(postDisplayName);
			custDSBlock.addRow(row);
		}
	var groupsGridCheckedRows=groupsGrid.getSelectRowsData();
	if (groupsGridCheckedRows.length > 0)
		for (var i = 0; i < groupsGridCheckedRows.length; i++) {
			var groupName = groupsGridCheckedRows[i]['GroupName'];
			var groupDisplayName = groupsGridCheckedRows[i]['GroupDisplayName'];
			if(this.verifyCustDSHasSelected(groupName,groupDisplayName,custDSBlock))continue;
			var row = [];
			row.push(groupName);
			row.push(groupDisplayName);
			custDSBlock.addRow(row);
		}	
	custDSGrid.refresh(custDSInfo);
};
ActivityParticipantsSetting.prototype.verifyCustDSHasSelected = function(id, name,
		custDSBlock) {

	var verifyPartHasSelected = false;
	if (custDSBlock.getRows().length > 0)
		for (var i = 0; i < custDSBlock.getRows().length; i++) {
			if (custDSBlock.getCell(i, 'Id') == id
					&& custDSBlock.getCell(i, 'Name') == name) {
				verifyPartHasSelected = true;
				break;
			}
		}
	return verifyPartHasSelected;
};

ActivityParticipantsSetting.prototype.finishCustomizeDatasetSelection = function() {
	var custDSGridName = "customizeDatasetResult";
	var custDSGrid = efform.getGrid("ef_grid_" + custDSGridName);
	var custDSInfo = custDSGrid.eiinfo;
	var custDSBlock = custDSInfo.getBlock(custDSGridName);
	
	var parentIframeId=this.getParentDialogId()=="code"?"EW0107":"EW0101";
	var partsGridName = "activityParticipantsResult";
	var partsGrid = parent.getIframe(parentIframeId).contentWindow.efform.getGrid("ef_grid_" + partsGridName);	
	var partsInfo = partsGrid.eiinfo;	
	var partsBlock = partsInfo.getBlock(partsGridName);
	
			
	// 更新setting
	var doc = this.createXmlDocument();
	var actParts = $(this.setting).find('ActivityParticipants')[0];
	if (actParts == null) {
		actParts = doc.createElement('ActivityParticipants');
		$(this.setting).find('Extras')[0].appendChild(actParts);
	}
	var currentParticipantsExtend = this
			.getParticipantExtendByLabel("CustomizeDataset");
	var participantTypeName = $('Name', $(currentParticipantsExtend)).text();
	var participantDescription = $('Description', $(currentParticipantsExtend))
			.text();

	var participants =  this.getParticipantsByType("CustomizeDataset")[0];
	if (participants == null) {
		participants = doc.createElement('Participants');
		participants.setAttribute('ParticipantType', "CustomizeDataset");
		participants.setAttribute('ParticipantTypeName', participantTypeName);
		participants.setAttribute('ParticipantDescription',
				participantDescription);
		$(this.setting).find('ActivityParticipants')[0]
				.appendChild(participants);
	}
	
	var participant = null;
	if (custDSBlock.getRows().length > 0)
		for (var i = 0; i < custDSBlock.getRows().length; i++) {			
			var id = custDSBlock.getCell(i, 'Id');
			var name = custDSBlock.getCell(i,'Name');
			var tableName = custDSBlock.getCell(i,'TableName');
			var rule = custDSBlock.getCell(i,'Rule');					
			var type = custDSBlock.getCell(i,'Type');
					
			if(this.verifyPartHasSelected(id,"CustomizeDataset",partsBlock))continue;
			
			participant = doc.createElement('Participant');
			participant.setAttribute('Name', id);
			participant.setAttribute('DisplayName', name);
			
			var tableNameNode = doc.createElement('TableName');
			$(tableNameNode).text(tableName);
			participant.appendChild(tableNameNode);
			
			var ruleNode = doc.createElement('Rule');
			$(ruleNode).text(rule);
			participant.appendChild(ruleNode);
			
			
			var typeNode = doc.createElement('Type');
			$(typeNode).text(type);
			participant.appendChild(typeNode);
			
			participants.appendChild(participant);
		}
	
	
	//更新partsGrid
	if (custDSBlock.getRows().length > 0)
		for (var i = 0; i < custDSBlock.getRows().length; i++) {
			var id = custDSBlock.getCell(i, 'Id');
			var name = custDSBlock.getCell(i,'Name');
			if(this.verifyPartHasSelected(id,"CustomizeDataset",partsBlock))continue;
			var row = [];
			row.push(id);
			row.push(name);
			row.push("CustomizeDataset");
			row.push(this.editButton);
			row.push(this.viewButton);
			partsBlock.addRow(row);
		}
	partsGrid.refresh(partsInfo);	
};

ActivityParticipantsSetting.prototype.finishCustomizeDatasetEdit = function() {
	var cdPartRegion = $('#ef_region_cdPart');
	var nid=$('#id', cdPartRegion)
			.attr('value');
	var nname=$('#name', cdPartRegion)
			.attr('value');
	var ntableName=$('#tableName', cdPartRegion)
			.attr('value');
	var nrule=$('#rule', cdPartRegion)
			.attr('value');
	var ntype=$('#type', cdPartRegion)
			.attr('value');
			
	var parentId=parent.tempSelectedPart.getAttribute('Name');
	
	var parentIframeId=this.getParentDialogId()=="code"?"EW0107":"EW0101";
	var partsGridName = "activityParticipantsResult";
	var partsGrid = parent.getIframe(parentIframeId).contentWindow.efform.getGrid("ef_grid_" + partsGridName);	
	var partsInfo = partsGrid.eiinfo;	
	var partsBlock = partsInfo.getBlock(partsGridName);
	
			
	// 更新setting
	var doc = this.createXmlDocument();
	var actParts = $(this.setting).find('ActivityParticipants')[0];
	if (actParts == null) {
		actParts = doc.createElement('ActivityParticipants');
		$(this.setting).find('Extras')[0].appendChild(actParts);
	}
	var currentParticipantsExtend = this
			.getParticipantExtendByLabel("CustomizeDataset");
	var participantTypeName = $('Name', $(currentParticipantsExtend)).text();
	var participantDescription = $('Description', $(currentParticipantsExtend))
			.text();

	this.removeParticipantsByType("CustomizeDataset",parentId);
	var participants =  this.getParticipantsByType("CustomizeDataset")[0];
	if (participants == null) {
		participants = doc.createElement('Participants');
		participants.setAttribute('ParticipantType', "CustomizeDataset");
		participants.setAttribute('ParticipantTypeName', participantTypeName);
		participants.setAttribute('ParticipantDescription',
				participantDescription);
		$(this.setting).find('ActivityParticipants')[0]
				.appendChild(participants);
	}
	
	var participant = null;
	if (partsBlock.getRows().length > 0)
		for (var i = 0; i < partsBlock.getRows().length; i++) {			
			var id = partsBlock.getCell(i, 'Id');
			if(parentId==id){
			partsBlock.setCell(i,'Id',nid);
			partsBlock.setCell(i,'Name',nname);
			partsBlock.setCell(i,'Type',ntype);
			
			
			 id = partsBlock.getCell(i, 'Id');
			var name = partsBlock.getCell(i,'Name');				
			var type = partsBlock.getCell(i,'Type');		
			
			participant = doc.createElement('Participant');
			participant.setAttribute('Name', id);
			participant.setAttribute('DisplayName', name);
			
			var tableNameNode = doc.createElement('TableName');
			$(tableNameNode).text(ntableName);
			participant.appendChild(tableNameNode);
			
			var ruleNode = doc.createElement('Rule');
			$(ruleNode).text(nrule);
			participant.appendChild(ruleNode);
			
			
			var typeNode = doc.createElement('Type');
			$(typeNode).text(type);
			participant.appendChild(typeNode);
			
			participants.appendChild(participant);
			}
			
		}	
	
	//更新partsGrid	
	partsGrid.refresh(partsInfo);	
};


ActivityParticipantsSetting.prototype.renderActivityParticipantsTypeTree=function(){
 var partExtends=$("ParticipantExtend:has(Visible:contains('true'))",$(DomHelper.parseXml(this.getParticipantExtendSetXml())));
  partExtends.each(function(){
  var label=$('Label',$(this)).text();
  var text=$('Name',$(this)).text();
  tModel.addChild('',{'label':label,'text':text,'leaf':'1'});
  });
  tree._rootNode.reload();
};
ActivityParticipantsSetting.prototype.getParticipantExtendSetXml = function() {
	var participantExtendSetXml = null;
	info = new EiInfo();
	EiCommunicator.send('EW00', 'getParticipantExtend', info, {
				onSuccess : function(outInfo) {
					participantExtendSetXml = outInfo.get("ParticipantExtend");
				},
				onFail : function(message) {
					// alert(message);
				}
			}, false, false);
	return participantExtendSetXml;
};
ActivityParticipantsSetting.prototype.verifyPartHasSelected = function(partId, type,
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
