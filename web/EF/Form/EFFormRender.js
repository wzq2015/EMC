/**
 * FormAutoRender
 * @author wangyuqiu 2010/12/25
 */


EiInfo.prototype.get = function(str){
	
	if(!str)
		return null;
		
	var strArray = str.split("-");
	if(3 == strArray.length){
		block = this.getBlock(strArray[0]);
		if(null != block)
			return block.getCell(parseInt(strArray[1]),strArray[2]);
		else
			return null;	
	}else if(2 == strArray.length){
		block = this.getBlock(strArray[0]);
		if(null != block)
			return block.get(strArray[1]);
		else
			return null;	
	
	}
    return this.extAttr[strArray[0]];
}



NODE_TYPE = {
		FORM_TOPNODE:"FormTopNode",
		FORM_REGION:"FormRegion",
		FORM_BUTTON:"FormButton",
		FORM_NESTREGION:"FormNestRegion",
		FORM_FIELD:"FormField"
		
		
};

NODE_META = {
		FORM_NAME:"formName",
		CONTROL_NAME:"controlName",
		CONTROL_TYPE:"controlType",
		CONTROL_PARENTNAME:"controlParentName",
		BLOCK_NAME:"blockName",
		SEQ_NO:"seqNo"
};


function UIWidget(node,block){
	this._node = node;
	this._id = node[NODE_META.CONTROL_NAME];
	this._type = node[NODE_META.CONTROL_TYPE];
	this._block = block;
	this.childWidgets = [];
	this.parentWidget = null;
	this._formRender = null;
	
	this.META_NAME = {
			FORM_NAME:"formName",
			CONTROL_NAME:"controlName",
			CONTROL_ATTR_NAME:"controlAttrName",
			CONTROL_ATTR_DISPLAYNAME:"controlAttrDisplayName",
			CONTROL_ATTR_TYPE:"controlAttrType",
			CONTROL_ATTR_VALUE:"controlAttrValue",
			CONTROL_ATTR_DESC:"controlAttrDesc",
			CONTROL_ATTR_CATEGORY:"controlAttrCategory"
	};

}

/*
 * 控件回调以及回调顺序控制
 */
UIWidget.prototype.callBack = function (){
	
	
}

/*
 * 控件渲染
 */
UIWidget.prototype.render = function (){
	
	
}
/*
 * 控件数据绑定
 */
UIWidget.prototype.bind = function (){
	
	
}

/*
 * 控件子节点
 */
UIWidget.prototype.putChildWidget = function(UIWidget){
	this.childWidgets.push(UIWidget);
}

UIWidget.prototype.getChildWidget = function(i){
	return this.childWidgets[i];
}




function FormTopNodeWidget(node,block,attr){
	UIWidget.apply(this, arguments);
	this._attr = attr;
}

FormTopNodeWidget.prototype = new UIWidget("","");

FormTopNodeWidget.prototype.render = function (){
	
	var formTopNode_html = [];
	formTopNode_html.push("<div id=\"FormTopDivNode\">");
	
	for(var o in this._attr){
		var value = this._attr[o];
		//与后台对接
		if(o == "FormName")
			o = "form_ename";
		
		var hiddenField = "<input type=\"hidden\" id=\"inqu_status-0-"+o+"\" name=\"inqu_status-0-"
			+ o +"\" value=\"" +value+"\" class=\"inputField\"></input>";
		formTopNode_html.push(hiddenField);
	}
	
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		var _node = this.childWidgets[i].render();
		if(!!_node){
			formTopNode_html.push(_node);
		}
		
	}
	formTopNode_html.push("</div>");
	return formTopNode_html.join("");
}

FormTopNodeWidget.prototype.callBack = function(){
	
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		this.childWidgets[i].callBack();
	}
	
	
}

FormTopNodeWidget.prototype.bind = function(){
	

	  var block = __uiDataEiInfo.getBlock("result");
	  if(block.rows.length == 0){
		  
		  return ;
	  }
	  this._formRender._editStyle = "update";
	  var row = block.rows[0];
	  var cols = block.getBlockMeta().getMetas();  
	  for(  var key in cols ){
	    var col = cols[key];
		//t[col.name] = row[col.pos];
	    try{
//	    	if("ID" == col.name)
//	    		document.getElementById("inqu_status-0-PrimaryKeyField").value = row[col.pos]==null?"":row[col.pos];
//	    	else
	    	document.getElementById("inqu_status-0-"+col.name).value = row[col.pos]==null?"":row[col.pos];
	    }catch(e){
	    
	    }
	  }
	  
	var len = this.childWidgets.length;
		
	for(var i=0;i<len;i++){
		this.childWidgets[i].bind();
	}
	
	
}


function FormRegionWidget (){
	UIWidget.apply(this,arguments);
	this._buttonData = [];
}
FormRegionWidget.prototype = new UIWidget("","");

FormRegionWidget.prototype.bind = function(){
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		this.childWidgets[i].bind();
	}
	return ;
}

FormRegionWidget.prototype.callBack = function(){
	
	efregion.show(this._regionId);

	var ef_region_result_buttonbar = new efbuttonbar();

	ef_region_result_buttonbar.buttonCount = this._buttonData.length;

	ef_region_result_buttonbar.buttonData = this._buttonData;
		//[["F6","新增","1"],["F3","修改","1"],["F4","删除","1"],["SQL","sql生成","1"]];

	ef_region_result_buttonbar.paint(this._regionId);
	
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		this.childWidgets[i].callBack();
	}

	
}

FormRegionWidget.prototype.render = function (){
	
	var domNode_html = [];
	
	this._regionId = "ef_region_" + this._id;
	domNode_html.push("<div id = \""+this._regionId+"\"  efRegionShowClear=true ");
	
	this._param = {};
	for(var i=0;i<this._block.rows.length;i++){
		
		var name = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);
		var value = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);
		this._param[name] = value;
		
		domNode_html.push(" "+name+"="+value+" ");

	}
	
	
	
	if(this._param["IsVisible"] == "False"){
		domNode_html.push("style=\"display:none\" ");
	}
	
	domNode_html.push("title=\""+this._param["DisplayName"]+"\">");
	

	domNode_html.push("<div id=\"ef_div_"+this._id+"\" style=\"overflow:hidden;width:100%\" >");
	
	
	var len = this.childWidgets.length;
	for(var i=0;i<len;i++){
		var _node = this.childWidgets[i].render();
		if(!!_node)
			domNode_html.push(_node);
	}
	
	domNode_html.push("</div></div>");
	
	return domNode_html.join("");
	
}


function FormFieldWidget(){
	UIWidget.apply(this, arguments);
}

FormFieldWidget.prototype = new UIWidget("","");

FormFieldWidget.prototype.bind = function(){
	
	if(this._param["IsPrimaryKey"] == "True"){
		
		 var block = __uiDataEiInfo.getBlock("result");
		  if(block.rows.length == 0){
			  return ;
		  }
		  var row = block.rows[0];
		  
		  if(row == null)
			  return ;
		  var cols = block.getBlockMeta().getMetas();  

		    var col = cols["ID"];
		    try{
		    	document.getElementById("inqu_status-0-"+this._id).value = row[col.pos]==null?"":row[col.pos];
		    	document.getElementById("inqu_status-0-"+this._id).readOnly = true;
		    }catch(e){
		    
		    }
		
	}
	
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		this.childWidgets[i].bind();
	}
	
	
}

FormFieldWidget.prototype.callBack = function(){
	var instance = this;
	if(this._editStyle=="Date" && !window["efcalendar_click"]){
		window["efcalendar_click"] = function( control_source, id ) 
		{
		  	var node = ef.get( id );
		  	efcalendar(control_source, node, 'yyyy-mm-dd', true);
		}
		return;
	}
	if(this._editStyle=="ComboGrid" && !window[this._id+"_combogrid_onclick"]){
		window[this._id+"_combogrid_onclick"] = function(){
			var inInfo = new EiInfo();
			  //设置查询条件
			  inInfo.setByNode("inqu_status-0-"+instance._id);
			  
			  var bindingInputId = "inqu_status-0-"+instance._id;
			  var serviceName = "EDFA00";
			  var queryMethod = "query";
			  
			  EiCommunicator.send(serviceName, queryMethod, inInfo);
			  if (ajaxEi == null) return;
			  
			  var subGridColumn = new efSubgridColumn();
			  var eiColumn = new EiColumn(bindingInputId);
			  
			  //指定数据返回块
			  eiColumn.blockName = "result";
			  
			  subGridColumn.setEiMeta({}, eiColumn);
			  subGridColumn.set("serviceName", serviceName);
			  subGridColumn.set("queryMethod", queryMethod); 
			  
			  //预选定的列名称
			  subGridColumn.set("valueProperty", "form_ename");
			     
			  var div = efform.getSubGridDiv();
			  div.efDisplayCol = subGridColumn;
			  efform.showSubGridWindow(bindingInputId, ajaxEi);
		}
		return ;
	}
	
	if(this._editStyle=="ComboTree" && !window[this._id+"_combotree_onclick"]){
		window[this._id+"_combotree_onclick"] = function(){
			alert('hello Tree');
		}
		return ;
	}
	
}

FormFieldWidget.prototype.render = function (){
	var FormField_html = [];

	var isParentFormRegion = false;
	if(this.parentWidget instanceof FormNestRegionWidget){
		FormField_html.push("<td nowrap>");
		isParentFormRegion = false;
	}
	
	if(this.parentWidget instanceof FormRegionWidget){
		FormField_html.push("<div >");
		isParentFormRegion = true;
	}
	
	var DisplayName = "";
	var EditStyle = "Text";
	var IsReadOnly = "False";
	var IsVisible = "True";
	
	this._param = {};
	for(var i=0;i<this._block.rows.length;i++){
		
		var name = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);
		var value = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);
		this._param[name] = value;

	}
	//span.innerHTML = this._param["DisplayName"]+"：";
	FormField_html.push(this._param["DisplayName"]+((isParentFormRegion == false)?"</td>":""));
	
	switch(this._param["EditStyle"]){
		case "Text":
			//<input  type="text"  id="inqu_status-0-form_cname"  name="inqu_status-0-form_cname"  value=""  class="inputField"  />
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap><input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"  name=\"inqu_status-0-"+this._id+"\" class=\"inputField\"  ></input></td>");
			else
				FormField_html.push("<input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"  name=\"inqu_status-0-"+this._id+"\" class=\"inputField\"  ></input>");

			this._editStyle = "Text";
			break;
		case "TextArea":
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap><textarea  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></textarea></td>");
			else
				FormField_html.push("<input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input>");

			this._editStyle = "TextArea";
			break;
		case "Date":
			var date_html = [];
			//date_html.push(span.outerHTML);
			date_html.push('<input  type="text"' 
					+'id=\"inqu_status-0-'+this._id+'\" name=\"inqu_status-0-'+this._id+'\" value="" class="inputField">');
			date_html.push('<img title="日历选择" '
					+'src="./EF/Images/efcalendar_icon.gif" '
					+'onmouseover="this.style.cursor="hand"" onclick="efcalendar_click(this,\'inqu_status-0-'+this._id+'\');" '
						+'style="cursor: pointer; ">');
				
			//div.innerHTML = date_html.join('');
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap>"+date_html.join('')+"</td>");
			else
				FormField_html.push(date_html.join(''));
			this._editStyle = "Date";
			break;
			
		case "ComboGrid":
			var ComboGrid_html = [];
			//ComboGrid_html.push(span.outerHTML);
			ComboGrid_html.push('<input  type="text"' 
					+'id=\"inqu_status-0-'+this._id+'\" name=\"inqu_status-0-'+this._id+'\" value="" class="inputField">');
			ComboGrid_html.push('<img title="'+DisplayName+'" '
					+'src="./EF/Images/ef_pop_up_window.gif" '
					+'onmouseover="this.style.cursor="hand"" onclick="'+this._id+'_combogrid_onclick();" '
						+'style="cursor: pointer; ">');
			
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap>"+ComboGrid_html.join('')+"</td>");
			else
				FormField_html.push(ComboGrid_html.join(''));
			
			this._editStyle = "ComboGrid";
			break;
		case "ComboTree":
			var ComboTree_html = [];
			//ComboTree_html.push(span.outerHTML);
			ComboTree_html.push('<input  type="text"' 
					+'id=\"inqu_status-0-'+this._id+'\" name=\"inqu_status-0-'+this._id+'\" value="" class="inputField">');
			ComboTree_html.push('<img title="'+DisplayName+'" '
					+'src="./EF/Images/ef_pop_up_window.gif" '
					+'onmouseover="this.style.cursor="hand"" onclick="'+this._id+'_combotree_onclick();" '
						+'style="cursor: pointer; ">');
				
			//div.innerHTML = ComboTree_html.join('');
			
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap>"+ComboTree_html.join('')+"</td>");
			else
				FormField_html.push(ComboTree_html.join(''));
			
			this._editStyle = "ComboTree";
			break;	
		case "ComboBox":
			var opts = [];
			opts.push("<option selected value='" + "baogang" + "'>" + "宝钢股份公司" + "</option>" );
			opts.push("<option selected value='" + "baoxing" + "'>" + "宝信软件公司" + "</option>" );
			opts.push("<option selected value='" + "baoxing" + "'>" + "宝信软件公司" + "</option>" );
			opts.push("<option selected value='" + "baogang" + "'>" + "宝钢股份公司" + "</option>" );
			opts.push("<option selected value='" + "baogang" + "'>" + "宝钢股份公司" + "</option>" );
			opts.push("<option selected value='" + "baogang" + "'>" + "宝钢股份公司" + "</option>" );
			
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap>"+"<select class='pulldown' "+ ">" + opts.join("") + "</select>"+"</td>");
			else
				FormField_html.push("<select class='pulldown' "+ ">" + opts.join("") + "</select>");
			
			this._editStyle = "ComboBox";
			break;		
		case "CheckBox":
			//<input  type="checkbox"  id="result-0-isproduced"  name="result-0-isproduced"  value="1"  class="inputField"  />
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap><input  type=\"checkbox\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input></td>");
			else
				FormField_html.push("<input  type=\"checkbox\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input>");
			

			this._editStyle = "CheckBox";
			break;
			
		default:
			if(!isParentFormRegion)
				FormField_html.push("<td nowrap><input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input></td>");
			else
				FormField_html.push("<input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"   class=\"inputField\"  ></input>");

			this._editStyle = "Text";
			break;
	
		}
	if(!isParentFormRegion)
		FormField_html.push("</td>");
	else
		FormField_html.push("</div>");
	
	return FormField_html.join("");

}

function FormButtonWidget(){
	UIWidget.apply(this, arguments);
}

FormButtonWidget.prototype = new UIWidget("","");

FormButtonWidget.prototype.bind = function(){
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		this.childWidgets[i].bind();
	}
}

FormButtonWidget.prototype.callBack = function(){
	var instance = this;
	window["button_"+this._id.toLowerCase()+"_onclick"] = function(  ) 
		{
		  	//alert(instance._id);
		  var inInfo = new EiInfo();
		  //设置查询条件
		  inInfo.setByNode("FormTopDivNode");
		  
		  //EiCommunicator.send("EDDF02","delete",
		  
		    var method = "insert";
		    if(instance._formRender._editStyle == "update")
		    	method = "update";
		  
			EiCommunicator.send("EDDF02",method,inInfo,{
				onSuccess :
					function(eiInfo){
						efform.setStatus(0,"保存信息成功！");
					},
			    onFail    : 
			    function(eMsg) {
						efform.setStatus(-1,"保存信息失败！");
			    }	
			} );	
		  
		  
		}
		return;
	
}

FormButtonWidget.prototype.render = function(){
	//准备按钮数据
	if(this.parentWidget instanceof FormRegionWidget){
		var buttonData = [];
		
		var buttonName="",buttonSeqNo="",buttonDisplayName = "";
		this._param={};
		for(var i=0;i<this._block.rows.length;i++){
			
			var name = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);
			var value = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);
			this._param[name] = value;

		}
		
		buttonData.push(this._param["Name"]);
		buttonData.push(this._param["DisplayName"]);
		buttonData.push(this._param["SeqNo"]);
		
		
		this.parentWidget._buttonData.push(buttonData);
		
		
	}
	
	//var node = document.createElement("div");
	//node.innerHTML="hello FormButtonWidget";
	//return node;
	
}

function FormNestRegionWidget(){
	UIWidget.apply(this, arguments);
}

FormNestRegionWidget.prototype = new UIWidget("","");

FormNestRegionWidget.prototype.bind = function(){
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		this.childWidgets[i].bind();
	}
}

FormNestRegionWidget.prototype.callBack = function(){
	var len = this.childWidgets.length;
	
	for(var i=0;i<len;i++){
		this.childWidgets[i].callBack();
	}
	
}

FormNestRegionWidget.prototype.render = function (){
	
	
	

	
	var columnCount = 3;
	
//	var table = document.createElement("table");
//	
//	var tr = document.createElement("tr");
	
	
	this._param={};
	
	for(var i=0;i<this._block.rows.length;i++){
		
		var name = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);
		var value = this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);
		this._param[name] = value;
	}
	
	this._regionId = "ef_nestRegion_" + this._id;
	var FormNest_html = [];
	FormNest_html.push("<fieldset id=\""+this._regionId+"\""+((this._param["IsVisible"] == "False")?" style=\"display:none\" ":"")
			+"><legend>"+this._param["DisplayName"]+"</legend>");
	
	
	columnCount = parseInt(this._param["ColumnCount"]);
	if(!columnCount)
		columnCount = 3;
	
	
	FormNest_html.push("<table id=\"ef_nestRegion_table"+this._id+"\">");
	

	var len = this.childWidgets.length;
	for(var i=0;i<len;i++){
		if(i%columnCount == 0){

			if(i == 0)
				FormNest_html.push("<tr>");
			else
				FormNest_html.push("</tr><tr>");
		}
		
		var _node = this.childWidgets[i].render();
		if(!!_node)
			FormNest_html.push(_node);

	}
	
	FormNest_html.push("</tr></table></fieldset>");
	return FormNest_html.join("");
	

}



function EFFormRender(paintId){
	
	
	if(paintId == "")
		this._paintNode = window.document.body;
	else
		this._paintNode = document.getElementById(paintId);
	
	this.CONSTANT = {
		RESULT:"result",
		TOPNODE:"topNode"
	};
	
	this.FORM_ATTR = {
		ATTR_ISEXIST:"isExist",
		ATTR_TYPE:"Type",
		ATTR_DISPLAYNAME:"DisplayName",
		ATTR_FORMNAME:"FormName",
		ATTR_SECONDMODULE:"SecondModule",
		ATTR_SERVICENAME:"serviceName",
		ATTR_FIRSTMODULE:"FirstModule",
		ATTR_USERNAME:"Username",
		ATTR_SERVICE:"service",
		ATTR_METHOD:"method",
		ATTR_PROJECT:"Project",
		ATTR_RECREATOR:"recCreator",
		ATTR_METHODNAME:"methodName"
	};

	this.parentNode = this._paintNode; 
	
	this._editStyle = "insert";
	
	
};



 
EFFormRender.prototype.init = function(info){
	//构造层次结构的dom树模型
	//this.treeNode = new Node("topNode");
	
	
	
	this.eiinfo = info;
	
	this.WidgetObjs = {};
	
	this.generateTree();
	
	//this.generateUI();
	
}

EFFormRender.prototype.generateTree = function(){
	

	var result = this.eiinfo.getBlock(this.CONSTANT.RESULT); 
	
	var resultRows = result.getRows();
	var count = resultRows.length;
	//深度遍历UI树结构
	for(var i=0;i<count;i++){
		
		var node = {};
		node[NODE_META.FORM_NAME] = result.getCell(i,NODE_META.FORM_NAME);
		node[NODE_META.CONTROL_NAME] = result.getCell(i,NODE_META.CONTROL_NAME);
		node[NODE_META.CONTROL_TYPE] = result.getCell(i,NODE_META.CONTROL_TYPE);
		node[NODE_META.CONTROL_PARENTNAME] = result.getCell(i,NODE_META.CONTROL_PARENTNAME);
		node[NODE_META.BLOCK_NAME] = result.getCell(i,NODE_META.BLOCK_NAME);
		node[NODE_META.SEQ_NO] = result.getCell(i,NODE_META.SEQ_NO);

		//构造UI树结构
		this.generateWidgetTree(node);
		
	}
	
	//深度遍历生成UI
	this.parentNode.appendChild(this.generateUI());
	
	//深度遍历bind数据
	
	this.topUIWidget.bind();
	
	//深度遍历执行回调
	
	this.topUIWidget.callBack();
	
}




EFFormRender.prototype.generateWidgetTree = function(node){
	
	var instance = this;
	switch(node[NODE_META.CONTROL_TYPE]){
		case NODE_TYPE.FORM_TOPNODE:
			var attr = {};
			for(var o in this.FORM_ATTR){
				attr[this.FORM_ATTR[o]] = this.eiinfo.get(this.FORM_ATTR[o]);
			}
			
			this.topUIWidget = new FormTopNodeWidget(node
					,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]),attr);
			this.WidgetObjs[node[NODE_META.CONTROL_NAME]] = this.topUIWidget;
			this.topUIWidget.parentWidget = null;
			this.topUIWidget._formRender = instance;
			//topUIWidget.callBack();
			
		break;
		
		case NODE_TYPE.FORM_REGION:
			var formRegion = new FormRegionWidget(node
					,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));
			this.WidgetObjs[node[NODE_META.CONTROL_NAME]] = formRegion;
			this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formRegion);
			formRegion.parentWidget = this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];
			formRegion._formRender = instance;
		break;
			
		case NODE_TYPE.FORM_BUTTON:
			var formButton = new FormButtonWidget(node
					,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));
			this.WidgetObjs[node[NODE_META.CONTROL_NAME]] = formButton;
			this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formButton);
			formButton.parentWidget = this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];
			formButton._formRender = instance;
			break;
			
		case NODE_TYPE.FORM_NESTREGION:
			var formNest = new FormNestRegionWidget(node
					,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));
			this.WidgetObjs[node[NODE_META.CONTROL_NAME]] = formNest;
			this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formNest);
			formNest.parentWidget = this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];
			formNest._formRender = instance;
		break;	
			
		case NODE_TYPE.FORM_FIELD:
			var formField = new FormFieldWidget(node
					,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));
			this.WidgetObjs[node[NODE_META.CONTROL_NAME]] = formField;
			this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formField);
			formField.parentWidget = this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];
			formField._formRender = instance;
		break;	
	}
	
	
}


/*
 * 
 * 广度遍历生成dom结构
 * 
 */
EFFormRender.prototype.generateUI = function(){
	var div = document.createElement("div");
	div.innerHTML = this.topUIWidget.render();
	return div;
}
























