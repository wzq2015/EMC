CodeActivitySetting=function (editor) {
	this.editor = editor;
	this.setting = this.getCurrentAttributeSetting();
	this.actPartsSetting=new ActivityParticipantsSetting(editor);
};

mxUtils.extend(CodeActivitySetting, AttributeSetting);
CodeActivitySetting.prototype.actPartsSetting=null;
CodeActivitySetting.prototype.curNode=null;
CodeActivitySetting.prototype.setCurNode= function(treeNode) {
  this.curNode=treeNode;
};
/**
 * 渲染可编程活动属性配置页面
 */
CodeActivitySetting.prototype.renderCodeActSetting = function() {
	this.renderBasicAttrOfCodeActivity();
	this.loadExtraAttrTree();	
	this.actPartsSetting.renderActivityParticipantsTypeTree();	
	this.actPartsSetting.renderActivityParticipantsGrid();
	this.overwriteNewRecord();
};
CodeActivitySetting.prototype.overwriteNewRecord=function(){	
	initNewRecord = efpage.newRecord;
	efpage.newRecord = function(grid_id) {
		var actPartsType=null;
		if (grid_id == "ef_grid_activityParticipantsResult") {
			var url = curActivitySetting.getUrl();
			actPartsType=curActivitySetting.actPartsSetting.getActPartsType();
			if(actPartsType==null){
			alert('请选择任务接口类型！');return;
			}
			var foregroundService= curActivitySetting.actPartsSetting.getForegroundServiceByLabel(actPartsType);
			var pageLabel=$('PageName',$(foregroundService)).text();
			var wnd=$('Window',$(foregroundService))[0];
			var width=630;
			var height=500;
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
	};

};
/**
 * 保存可编程活动属性设置
 */
CodeActivitySetting.prototype.updateCodeActSetting = function() {
	this.updateBasicAtrrOfCodeActSetting();
	this.updateExtraNodesOfCodeActivity();	
	this.updateAttributeSetting();
};
/**
 * 渲染可编程活动的基本属性设置页面
 */
CodeActivitySetting.prototype.renderBasicAttrOfCodeActivity = function() {
	var basicAttrRegion = $('#basicAttrInputs');
	$('#name', basicAttrRegion)
			.attr('value', this.setting.getAttribute('Name'));
	$('#displayName', basicAttrRegion).attr('value',
			this.setting.getAttribute('DisplayName'));
	$('#form', basicAttrRegion)
			.attr('value', this.setting.getAttribute('Form'));
};

CodeActivitySetting.prototype.loadExtraAttrTree=function(){
   var dom = $(this.setting);
	var root = $('ActivityExtraParameters>Variable', $(dom))[0];
	var childNodes = $(root).children();
	var rootAttrData = [];
	childNodes.each(function() {
				if (this.getAttribute("Type") == "String")
					rootAttrData.push(this);
			});  
	
	var rootNode = eaTree._rootNode;
	if (root == null) {
		eaTModel.addChild('', {
					'label' : 'ROOT',
					'text' : 'ROOT',
					'leaf' : '0',
					'variables' : null
				});
	} else
		this.appendChildTreeNode(root, null);	
	eaTree._rootNode.reload();
	//
	this.renderExtraAttributesOfCodeActivity(rootAttrData,true);
};


CodeActivitySetting.prototype.appendChildTreeNode=function(curNode,parentNode){
  var label=curNode.getAttribute('Name');
  var text=curNode.getAttribute('Value');
  var desc=curNode.getAttribute('Desc');
  
  var childNodesData=$(curNode).children();
   var nodeData=[];
  childNodesData.each(function(){
  if(this.getAttribute("Type")=="String")nodeData.push(this);
  });
  
  if(parentNode==null)
  eaTModel.addChild('',{'label':label,'text':text,'leaf':'0','desc':desc,'variables':nodeData});
  else
  eaTModel.addChild(parentNode.getAttribute('Name'),{'label':label,'text':text,'leaf':'0','desc':desc,'variables':nodeData});
  
  //var childNodes=$('Variable[Type="HashMap"]',$(curNode));
  
  var childNodes=$(curNode).children();
  if(childNodes.length==0)return; 
  for(var i=0;i<childNodes.length;i++){
  	var childNode=childNodes[i];
  	if(childNode.getAttribute("Type")=="HashMap")
     this.appendChildTreeNode(childNode,curNode);
  }
};

CodeActivitySetting.prototype.generateXmlTreeNode=function(curTreeNode){
	var variables = curTreeNode._data["variables"];
	//var desc=curTreeNode._data['desc']==null?"":curTreeNode._data['desc'];
	var desc=curTreeNode.desc==null?"":curTreeNode.desc;
	var doc = this.createXmlDocument();
	var curXmlDom = doc.createElement('Variable');
	curXmlDom.setAttribute('Type', "HashMap");
	curXmlDom.setAttribute('Name', curTreeNode.label());
	curXmlDom.setAttribute('Value',curTreeNode.text());
	curXmlDom.setAttribute('Desc', desc);
	if(variables!=null)
	$(curXmlDom).append(variables);
	var childTreeNodes=curTreeNode._childNodes;
	if(childTreeNodes.length!=0){
		for(var i=0;i<childTreeNodes.length;i++){
	    $(curXmlDom).append(this.generateXmlTreeNode(childTreeNodes[i]));	
	}
	}
	return curXmlDom;
};
CodeActivitySetting.prototype.saveExtraAttributesOfCodeActivity = function() {
	var parentExtraAttrGrid = $('iframe',parent.$("#EW0107"))[0].contentWindow.efform.getGrid("ef_grid_extraAttrTreeResult");	
	var parentExtraAttrInfo = parentExtraAttrGrid.eiinfo;
	var parentExtraAttrBlock = parentExtraAttrInfo.getBlock("extraAttrTreeResult");
	
	var count=parentExtraAttrGrid.getRowCount();
	var rows=parentExtraAttrBlock.getRows();
	for(var i=0;i<count;i++)
	{
		 parentExtraAttrGrid.removeRow(rows[i]-i);
	}
	
	var selectedNode=parent.curNode;
   var grid = efform.getGrid("ef_grid_extraAttrTreeResult");
    var block = grid.eiinfo.getBlock("extraAttrTreeResult");
    var variable=null;
    var variables=[];
    var doc=this.createXmlDocument();
    if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
			variable  = doc.createElement('Variable');
			variable .setAttribute('Type', block.getCell(i, 'Type'));
			variable .setAttribute('Name', block.getCell(i, 'Name'));
			variable .setAttribute('Value', block.getCell(i,
							'Value'));
			variable .setAttribute('Desc', block.getCell(i,
							'Desc'));
			variables.push(variable);			
		}
		selectedNode._data["variables"]=variables;
		var nodeData=selectedNode.data();
		 if(nodeData!=null)
	   $(nodeData.variables).each(function() {
				var row = [];				
				row.push(this.getAttribute("Name"));
				row.push(this.getAttribute("Type"));
				row.push(this.getAttribute("Value"));
				row.push(this.getAttribute("Desc"));
				parentExtraAttrBlock.addRow(row);
			});			
		parentExtraAttrGrid.refresh(parentExtraAttrInfo);		
		$('iframe',parent.$("#EW0107"))[0].contentWindow.removeFuncBarContent();
};

CodeActivitySetting.prototype.updateExtraAttributesOfCodeActivity=function(){
   var selectedNode=eaTree.getCurrent();
   var grid = efform.getGrid("ef_grid_extraAttrTreeResult");
    var block = grid.eiinfo.getBlock("extraAttrTreeResult");
    var variable=null;
    var variables=[];
    var doc=this.createXmlDocument();
    if (block.getRows().length > 0)
		for (var i = 0; i < block.getRows().length; i++) {
			variable  = doc.createElement('Variable');
			variable .setAttribute('Type', block.getCell(i, 'Type'));
			variable .setAttribute('Name', block.getCell(i, 'Name'));
			variable .setAttribute('Value', block.getCell(i,
							'Value'));
			variable .setAttribute('Desc', block.getCell(i,
							'Desc'));
			variables.push(variable);
		}
		
		selectedNode._data["variables"]=variables;
		this.curNode=selectedNode;
		this.renderExtraAttributesOfCodeActivity(this.curNode.data());
		alert("节点属性添加成功");
		
};
CodeActivitySetting.prototype.addExtraAttributesNodeOfCodeActivity=function(name,displayName,desc,curNode){
  
    var childNode=this.curNode._createChildNode({'label':name,'text':displayName,'leaf':'0','desc':desc,'variables':null});
	this.curNode.addNode(childNode);
};


CodeActivitySetting.prototype.updateExtraAttributesNodeOfCodeActivity=function(name,displayName,desc){
   this.curNode.label(name);
   this.curNode.text(displayName);
   this.curNode.desc=desc;
   this.curNode.reload();
};

CodeActivitySetting.prototype.deleteExtraAttributesNodeOfCodeActivity=function(){
   this.curNode.parent().removeNode(this.curNode);
};

CodeActivitySetting.prototype.updateExtraNodesOfCodeActivity=function(){
	// 设置扩展属性
	var doc = this.createXmlDocument();
	var actExtraParams = $(this.setting).find('ActivityExtraParameters')[0];
	if (actExtraParams == null) {
		actExtraParams = doc.createElement('ActivityExtraParameters');
		$(this.setting).find('Extras')[0].appendChild(actExtraParams);
	} else
		$(actExtraParams).empty(); 
	var rootNode=eaTree._rootNode;	
   var extraAttributeTreeDom=this.generateXmlTreeNode(rootNode._childNodes[0]);
	actExtraParams.appendChild(extraAttributeTreeDom);
};

CodeActivitySetting.prototype.renderExtraAttributesOfCodeActivity = function(nodeData,noFuncBar) {
    
     var grid=this.getExtraAttributesOfCodeActivity();
	 var block = grid.eiinfo.getBlock("extraAttrTreeResult");
    if(nodeData!=null)
	$(nodeData.variables).each(function() {
				var row = [];				
				row.push(this.getAttribute("Name"));
				row.push(this.getAttribute("Type"));
				row.push(this.getAttribute("Value"));
				row.push(this.getAttribute("Desc"));
				block.addRow(row);
			});
	
	$(document).ready(function() {
				grid.paint();
			});
   if(noFuncBar){
     $('#ef_grid_extraAttrTreeResult_new_row_img').remove();
	 $('#ef_grid_extraAttrTreeResult_remove_row_img').remove();
   }
	return grid;

};
CodeActivitySetting.prototype.getExtraAttributesOfCodeActivity = function() {
	var GRIDNAME = "extraAttrTreeResult";
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
	col3.width = '100';

	var col4 = new EiColumn('Desc');
	col4.descName = '描述';
	col4.pos = 3;
	col4.labelProperty = 'Desc';
	col4.valueProperty = '描述';
	col4.width = '100';

	meta.addMeta(col1);
	meta.addMeta(col2);
	meta.addMeta(col3);
	meta.addMeta(col4);

	var block = new EiBlock(meta);
	info.addBlock(block);	
	// 绘制grid 
	var extraGrid = this.constructGrid(GRIDNAME, info, "true");	
	return extraGrid;

};

/**
 * 保存可编程活动基本属性设置
 */
CodeActivitySetting.prototype.updateBasicAtrrOfCodeActSetting = function() {
	// 获取活动属性配置
	var basicAttrRegion = $('#basicAttrInputs');
	var name = $('#name', basicAttrRegion).attr('value');
	var displayName = $('#displayName', basicAttrRegion).attr('value');
	var form = $('#form', basicAttrRegion).attr('value');
	// 设置基本属性
	var cas = this.setting;
	cas.setAttribute('Name', name);
	cas.setAttribute('DisplayName', displayName);
	cas.setAttribute('Form', form);
};
