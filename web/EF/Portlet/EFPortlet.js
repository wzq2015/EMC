/**
 * @wangyuqiu 2009-04-15
 */
var efportlet = function(id) {
	$.extend(this, efportlet.defaultConfig);
	this.id = id;
	this.portal = null;
	if (null == efportlet.portlets)
		efportlet.portlets = new Object();
	efportlet.portlets[id] = this;
}
efportlet.imageURL = "";
efportlet.themaPath="";

efportlet.portlets = null;

efportlet.defaultConfig = {
	width : 300,
	height : 200,
	expandWidth : 900,
	expandHeight : 600,
	maxStatus : true,
	minStatus : false,
	portletPosition : 0,
	portletRowPosition : 0,
	configStatus : false,
	bgcolor : " ",
	titleFontSize : 12,
	titleFontType : "宋体",
	contentFontSize : 10,
	contentFontColor : "#000000",
	contentFontType : "宋体",
	id : "efportlet",
	portletName : "平台portlet控件",
	expandStatus : false,
	hiddenStatus : false,
	closedStatus : false,
	tabs : null,
	portlet : null,
	portalId : null,
	portletUrl : "",
	hasExpandImg : true,
	hasCloseImg : true,
	hasMinMaxImg : true,
	hasEditImg : true,
	paintNode : null,
	hasTab : false,
	showBorder:true,
	showIcon:true
}

efportlet.prototype = {
	init : function(config) {
		if (typeof config === "object")
			$.extend(this, config);

		this._updateConfig();
		this.body = $("<div/>").attr({id : this.id});

		// 将当前portlet绑定在某个dom节点下
		if (this.paintNode == null) {// 采用portal容器进行渲染

		} else {
			this.body.appendTo($("#" + this.paintNode));
		}

		this.jQuery = this.body;
		/*标题栏底色*/
		var  headStyle="style=\"";
		if(this.portlet.bgcolor!=" "){
			headStyle+="background-image:'url(null.png)';background-color:"+this.portlet.bgcolor;
		}
		headStyle+="\"";
		
		/*是否显示边框*/
		var headerClass = "table_header";
		if(!this.showBorder){
			headerClass="table_header_noFrame";
		}
		this.head = $("<div class='"+headerClass+"' "+headStyle+"></div>").attr({id : this.id + "_head"});
		this.head.appendTo(this.body);
		this.edit = $("<div style='z-index:1;position:absolute;display:none'></div>").attr({id : this.id + "_edit"});
		this.edit.appendTo(this.body);
		
		this.contentDiv = $("<div style='width:100%'></div>");
		this.content = $("<div class='table_content' ></div>").attr({id : this.id + "_content"});
		this.contentleft=$("<div id='"+this.id+"_contentleft' class='table_contentleft' > </div>");
		this.contentright=$("<div id='"+this.id+"_contentright' class='table_contentright' > </div>");
		if(this.showBorder){
			this.contentleft.appendTo(this.contentDiv);
			this.contentright.appendTo(this.contentDiv);
		}
		
		this.content.appendTo(this.contentDiv);
		this.contentDiv.appendTo(this.body);

		this.bottom=$("<div class='table_bottombg'>"+
					"<div class='table_bottomleft'> </div>"+
					"<div class='table_bottomright'> </div>"+
					"</div>");
		if(this.showBorder)
			this.bottom.appendTo(this.body);
		this._initConfig();

	},
	/*根据后台获取的数据修改展现portlet需要的参数*/
	_updateConfig : function() {
		if (typeof(this.portlet) == "undefined" || this.portlet == null) {
		} else {
			if (this.portlet.height != " ")
				this.height = this.portlet.height;
			if (this.portlet.portletName != null)
				this.portletName = this.portlet.portletName;
			if (this.portlet.portletPosition != null)
				this.portletPosition = this.portlet.portletPosition;
			if (this.portlet.portletRowPosition != null&&this.portlet.portletRowPosition.trim()!='')
				this.portletRowPosition = this.portlet.portletRowPosition;
			else
			     this.portletRowPosition=5;
			
			if (this.portlet.contentFontSize != null)
				this.contentFontSize = this.portlet.contentFontSize;
			if (this.portlet.contentFontColor != null)
				this.contentFontColor = this.portlet.contentFontColor;
			if (this.portlet.contentFontType != null)
				this.contentFontType = this.portlet.contentFontType;
			
			if (this.portlet.evcm02.portletUrl != null)
				this.portletUrl = this.portlet.evcm02.portletUrl;
			if (this.portlet.evcm02.charParameter != null)
				this.charParameter = this.portlet.evcm02.charParameter;
			if (this.portlet.dynamicValue != null)
				this.dynamicValue = this.portlet.dynamicValue.trim();
			if (this.portlet.borderFlag == " ")
				this.showBorder = showBorder;
			else if(this.portlet.borderFlag=="0")
				this.showBorder = false;
			if (this.portlet.imageFlag == " ")
				this.showIcon = showIcon;
			else if(this.portlet.imageFlag=="0")
				this.showIcon = false;
		}
	},
	_initConfig : function() {

		this._initHeadConfig();
		this._initEditConfig();
		this._initContentConfig();
		this.paint();
	},
	refresh : function() {

	},
	paint : function() {
		if(this.showBorder){
			if (this.tabs != null && this.tabs.length != 0){
				this.contentleft.height(parseInt(this.height)-23);
		 		this.contentright.height(parseInt(this.height)-23);
			} else{
				this.contentleft.height(parseInt(this.height)-28);
				this.contentright.height(parseInt(this.height)-28);
			}
		}
		
	},
	close : function() {

	},
	maximize : function() {

	},
	minimize : function() {

	}
}

efportlet.prototype.setConfig = function(config) {
	if (typeof config === "object") {
		this.config = config;
		$.extend(this, config);
	}
}

var editDialog = {
	'z_index' : '10001',
	'position' : 'absolute',
	'background-color' : '#FFFFAA'
};

/*初始化标题栏区域*/
efportlet.prototype._initHeadConfig = function() {
	var instance = this;
	var headsunStr = "";
	if(!this.showBorder){
		headsunStr="style='margin-left:5px;'";
	}
	this.headsun = $("<div id='headsun' "+headsunStr+" class='headsun' onmouseover=\"document.getElementById('"
			+ this.id
			+ "_operationbar').style.display='block'\" onmouseout=\"document.getElementById('"
			+ this.id + "_operationbar').style.display='none'\"></div>");
			
	this.headsun.hover(function(){
	   $("#"+this.id+"_operationbar").show();
	},function(){
	   $("#"+this.id+"_operationbar").hide();
	});
	this.headsun.appendTo(this.head);

	
	this.headerleft=$("<div class='table_headerleft'></div>");
	if(this.showBorder){
		this.headsun.append(this.headerleft);
	}
	
	/*标题样式*/
	var titleStyle="style='";
	if(this.portlet.titleFontType!=" "){
		titleStyle+="font-family:"+this.portlet.titleFontType+"; ";
	}
	if(this.portlet.titleFontColor!=" "){
		titleStyle+="color:"+this.portlet.titleFontColor+"; ";
	}
	if(this.portlet.titleFontSize!=" "){
		titleStyle+="font-size:"+this.portlet.titleFontSize+"; ";
	}
	titleStyle+="'";
	
	var logoURL="style='";
	/*是否显示图标*/
	if(!this.showIcon){
		logoURL+=" width:0px;";
	}else if(this.logoURL!=""){
		logoURL+="background-image:url(./EV/skins/"+efportlet.themaPath+"/images/"+this.logoURL+");";
	}
	logoURL+="'";
	this.headertitle=$("<div><div class='iconstyle' "+logoURL+"></div><div class='tabletitle' id="+this.id+"_tabletitle "+titleStyle+">"+this.portletName+"</div></div>");
	this.headsun.append(this.headertitle);
	
	this.headerright=$("<div class='table_headerright'/div>");
	if(this.showBorder){
		this.headsun.append(this.headerright);
	}

	// 增加operationbar在鼠标悬浮时显示
	this.operationbar = $("<div class='iconbox'></div>").attr({id : this.id + "_operationbar"});
	this.headsun.append(this.operationbar);		

	/*编辑和个性参数编辑按钮的处理*/
	if (this.hasEditImg && this.hasEditImg != "false") {
		this.head_editImage = $("<div class='head_editImage'><a href='#'/></div>");
		this.operationbar.append(this.head_editImage);
		this.head_editImage.click(function() {
					if (instance.edit.get(0).style.display=="none") {
						instance.edit.get(0).style.display="block";
					} else {
						instance.edit.get(0).style.display="none";
					}
				});

		// 个性参数
		var instanpcedy = this;
		if (this.charParameter != null && this.charParameter == "1") {
			this.head_charParameter = $("<div class='head_charParameter'><a href='#'/></div>");
		
			this.operationbar.append(this.head_charParameter);
			this.head_charParameter.click(function() {
				// 用户自定义弹出窗口
				if (typeof opendyp == "function") {
					var info = new EiInfo();
					var portalId = ef.get("portalId").value;
					info.set("dynamicValue", instance.dynamicValue);
					info.set("portletId", instance.id);
					info.set("portalId", portalId);
					// 结点
					opendyp(info);
				} else {
					$("#"+instance.id+"-ef_dy_param").remove();
					this.dyParamDiv = $("<div id = '"
							+ instance.id
							+ "-ef_dy_param' title='个性参数设置'>"
							+ "<div>"
							+ "<table>"
							+

							"<tr>"
							+ "<td width='15%'>个性参数:</td>"
							+ "<td nowrap width='20%'>"
							+ "<input nullable='false' maxLength='100'  validateType='positive_integer'  type='text' id='"
							+ instance.id
							+ "_dynamicValue' name='"
							+ instance.id
							+ "_dynamicValue'  class='inputField' value='"
							+ instance.dynamicValue
							+ "'  />"
							+ "</td>"
							+ "</tr>"
							+ "<tr>"
							+ "<td width='80%' colspan='2' align='center'>"
							+ "<input type='button'  value='取消' id='submit1_"
							+ instance.id
							+ "' name='submit1_"
							+ instance.id
							+ "' class='inputField' onclick=\"canceldynamic('"
							+ instance.id
							+ "');\"/>"
							+

							"<input type='button'  value='保存' id='submit_"
							+ instance.id
							+ "' name='submit_"
							+ instance.id
							+ "' class='inputField' onclick=\"savedynamicValue('"
							+ instance.id + "');\"/>" + "</td>" + "</tr>"
							+ "</table>" + "</div>" + "</div>");

					var width = instance.head_charParameter.width();
					var height = instance.head_charParameter.height();
					var offset = instance.head.offset();
					var top1 = parseInt(offset.top)+30;
					var left1 = parseInt(offset.left)+5;

					this.dyParamDiv.css("z_index", 10000);
					this.dyParamDiv.css("position", "absolute");
					this.dyParamDiv.css('background-color', '#D1EEEE');
					this.dyParamDiv.width("220px");
					this.dyParamDiv.height("50px");
					this.dyParamDiv.css("top", top1);
					this.dyParamDiv.css("left", left1);
					this.dyParamDiv.appendTo(window.document.body);
				}
			});
		}

	}
	/*关闭图标*/
	if (this.hasCloseImg && this.hasCloseImg != "false") {
		this.head_closeImage = $("<div class='head_closeImage'><a href='#'/></div>");
		this.head_closeImage.click(function() {
					instance.close();
				});
		this.operationbar.append(this.head_closeImage);
	}

	/*最小化*/
	if (this.hasMinMaxImg && this.hasMinMaxImg != "false") {//最小化无需判断？
		this.head_maxMinImage = $("<div class='head_minImage'><a href='#'/></div>");
		this.head_maxMinImage.get(0).className=(this.maxStatus == true)? "head_minImage":"head_maxImage";
		this.head_maxMinImage.click(function() {
					instance.maxStatus = (instance.maxStatus) ? false : true;
					if (instance.maxStatus == false) {
						instance.content.hide();
						instance.body.height(28);
						instance.contentDiv.hide();
						instance.bottom.hide();
					} else {
						instance.content.height(instance.height != "auto" ? instance.height - 28 : "auto");
						instance.body.height(instance.height);
						instance.content.show();
						instance.contentDiv.show();
						instance.bottom.show();
					}
					instance.head_maxMinImage.get(0).className=(instance.maxStatus == true)? "head_minImage":"head_maxImage";
				});

		this.operationbar.append(this.head_maxMinImage);
	}

	/*最大化*/
	if (this.maxStatus == false) {
		this.content.hide();
		this.body.height(28);
	}
	if (this.hasExpandImg && this.hasExpandImg != "false") {
		this.head_expandImage = $("<div class='head_expandImage'><a href='#'/></div>");
		this.head_expandImage.get(0).className=(this.expandStatus == false)? "head_expandImage":"head_noexpandImage";
		this.head_expandImage.click(function() {
					instance.expand(instance.id);
				});

		this.operationbar.append(this.head_expandImage);
	}
}

/**
 * portlet参数设置
 */
efportlet.prototype._initEditConfig = function() {
	this.edit.append("<div/>");
	var edit_conetent = this.setEditContent();
	if (!!edit_conetent) {
		this.edit.empty();
		this.edit.append(edit_conetent);
	}
};

efportlet.prototype.show = function() {
	this.hiddenStatus = false;
	this.body.show();

}

efportlet.prototype.hidden = function() {
	this.hiddenStatus = true;
	this.body.hide();

}

efportlet.prototype.close = function() {
	// 重新刷新该portlet的sequence
	var sequenceStr = "";
	if (!!this.portal) {
		var count = this.portal.styleArrays[this.portletRowPosition].length;
		var offset = this.portletPosition % count;
		for (var key in efportlet.portlets) {
		   if(efportlet.portlets[key].portletRowPosition==this.portletRowPosition){
			if (((efportlet.portlets[key].portletPosition % count) == offset)
					&& (efportlet.portlets[key].portletPosition > this.portletPosition))
				efportlet.portlets[key].portletPosition -= count;
				}
		}
		this.portletPosition = -1;

		for(var key in efportlet.portlets){
			if((efportlet.portlets[key].portletPosition % count) == offset)
				sequenceStr += key +":"+efportlet.portlets[key].portletRowPosition+":"+efportlet.portlets[key].portletPosition+";";
		}	
		sequenceStr += this.id +":"+this.portletRowPosition+":"+this.portletPosition+";";

	}
	if (!!this.beforeCloseCallBack(sequenceStr)) {
		this.closedStatus = true;
		if (!!efportlet.portlets && !!efportlet.portlets[this.id])
			delete efportlet.portlets[this.id];

		this.body.get(0).parentNode.removeChild(this.body.get(0));

		if (!!this.expandStatus)
			this.expand(this.id);
	}

}

efportlet.prototype.heightTo = function(height) {
	this.height = height;
	if (this.maxStatus) {
		this.body.height(height);
		this.content.height(height != "auto" ? height - 28 : "auto");
		document.getElementById(this.content[0].id + "_info").height = this.content.height;
	}
	if(this.showBorder){
		this.contentleft.height(parseInt(this.height)-28);
	 	this.contentright.height(parseInt(this.height)-28);
	}
}

efportlet.prototype.widthTo = function(width) {
	this.width = width;
	this.body.width(width);
	if(this.showBorder)
		this.content.width(parseInt(width)-18);
	else
		this.content.width(width);
	this.head.width(width);
	this.headsun.width(width);
}

efportlet.prototype.expand = function(id) {
	this.expandStatus = (this.expandStatus) ? false : true;
	this.head_expandImage.get(0).className=(this.expandStatus == false)? "head_expandImage":"head_noexpandImage";
	if (this.expandStatus) {
		for (var key in efportlet.portlets) {
			if (key != id)
				efportlet.portlets[key].hidden();
		}
		this.preExpandHeight = this.height;
		this.preExpandWidth = this.width;
		this.heightTo(this.expandHeight);
		this.widthTo(this.expandWidth);
		if (!!this.portal) {
			for (var k = 0; k < this.portal.containerGrippers.length; k++) {
				this.portal.containerGrippers[k].css({
							"display" : "none"
						});
			}
		}

		// 设置iframe的高度
		var iframe = $("IFRAME", this.content);
		if (this.hasTab)
			iframe.height(this.expandHeight - 70);

	} else {
		for (var key in efportlet.portlets) {
			if (key != id && efportlet.portlets[key].closedStatus == false)
				efportlet.portlets[key].show();
		}
		this.heightTo(this.preExpandHeight);
		this.widthTo(this.preExpandWidth);

		if (!!this.portal) {
			for (var k = 0; k < this.portal.containerGrippers.length; k++) {
				this.portal.containerGrippers[k].css({
							"display" : ""
						});
			}
		}
		var iframe = $("IFRAME", this.content);
		if (this.hasTab)
			iframe.height(this.preExpandHeight - 70);
	}

}
var tempDiv = '';

efportlet.prototype._initContentConfig = function() {
	this.content.css({
				"height" : this.height != "auto"
						? this.height - 28
						: this.height,
				"width" : this.width,
				"background" : "#FFFFFF"

			});
	var _content = $("<div id=" + this.id + "_content_info"
			+ " lastRange=0 height=" + (this.height - 65)
			+ "></div>");

	if (this.tabs != null && this.tabs.length != 0) {
		var divStr = "<div title=" + this.portletName + " eftabSrc="
				+ this.portletUrl + " eftabHeight=" + (this.height - 65)
				+ " ></div>";
		for (ii = 0; ii < this.tabs.length; ii++) {
			var tab_temp = this.tabs[ii];

			if (tab_temp.tabType == "2") {
				// Rss
				var info = new EiInfo();
				info.set("portlet_id", tab_temp.tabId);
				info.set("rss_url", tab_temp.tabUrl);
				info.set("rss_contentFontSize", this.contentFontSize);
				info.set("rss_contentFontType", this.contentFontType);
				info.set("rss_contentFontColor", this.contentFontColor);
				info.set("rss_row", "");
				var tempTabID = this.id + "_" + tab_temp.tabId;
				info.set("rss_tab_id", tempTabID);
				tempDiv = "<div id='" + tempTabID + "' title="
						+ this.tabs[ii].tabName + "  eftabHeight="
						+ (this.height - 65) + " ></div>";
				EiCommunicator.send("EV01", "getRssContentBlock", info,
						callback_rss_tab, false, true);
				divStr = divStr + tempDiv;
			} else {
				divStr += "<div title=" + this.tabs[ii].tabName + " eftabSrc="
						+ this.tabs[ii].tabUrl + " eftabHeight="
						+ (this.height - 65) + " ></div>";
			}

		}
		var temp = $(divStr);
		temp.appendTo(_content);
		this.hasTab = true;
	} else {
		var temp = $("<iframe frameBorder=0 width=100% height = 100% scrolling=no src="
				+ this.portletUrl + "></iframe>");
		temp.appendTo(_content);
		this.hasTab = false;
	}

	_content.appendTo(this.content);

	var content_obj = this.setPortletContent();

	if (!!content_obj) {
		this.showTabCallBack = function() {
		};
		_content.empty();
		_content.append(content_obj);
	}
}

var callback_rss_tab = {
	onSuccess : function(eiInfo) {
		contentBlock = eiInfo.getBlock("result");
		portlet_id = eiInfo.get("portlet_id");
		rss_contentFontSize = eiInfo.get("rss_contentFontSize");
		rss_contentFontType = eiInfo.get("rss_contentFontType");
		rss_contentFontColor = eiInfo.get("rss_contentFontColor");
		rss_tab_id = eiInfo.get("rss_tab_id");
		content = '<font size="' + rss_contentFontSize + '" face="'
				+ rss_contentFontType + '">';
		for (var i = 0; i < contentBlock.getRows().length; i++) {
			content += '<li style="line-height: 20px; text-decoration: none; list-style:none; clear:both;"><a target="_blank" style="color:'
					+ rss_contentFontColor
					+ '" href="'
					+ contentBlock.getCell(i, "link") + '">';
			content += contentBlock.getCell(i, "title") + '</a></li>';
		}

		content += '</font>';
		var tabId = document.getElementById(rss_tab_id);
		if (tabId != undefined || tabId != null)
			tabId.innerHTML = content;
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}

efportlet.prototype.setPortletContent = function() {

}

efportlet.prototype.startDrag = function(event) {
	this.body.css({position : "absolute"});
	this.dragFlage = true;
}

efportlet.prototype.stopDrag = function(event) {
	this.body.css({position : ""});
	this.dragFlage = false;
}

efportlet.prototype.dragging = function(event) {
	var e = event || window.event;
	if (!!this.dragFlage) {	}
}

efportlet.prototype.showTabCallBack = function() {
	if (this.portlet.tabs != null && this.portlet.tabs != "") {
		eval('eftab.show("' + this.id + '_content_info")');
	}
}

efportlet.prototype.beforeCloseCallBack = function(sequens) {
	return true;
}

efportlet.prototype.endDragCallBack = function(sequens) {}

/**
 * 设置portlet参数显示内容回调函数
 */
efportlet.prototype.setEditContent = function() {}

function canceldynamicValue() {
	efwindow.hide();
}

savedynamicValue = function(id) {
	var info = new EiInfo();
	var portalId = ef.get("portalId").value;
	var dynamicValue = ef.get(id + "_dynamicValue").value;
	info.set("portletId", id);
	info.set("portalId", portalId);
	info.set("dynamicValue", dynamicValue);
	EiCommunicator.send("EVPM03", "savedynamicValue", info, null);

	if (ajaxEi != null) {
		alert("操作成功");
		var nodeId = id + "-ef_dy_param";
		$("#" + nodeId).hide();
    var portlet=efportlet.portlets[id];
    var evUserParam=ef.get("evUserParam").value;
    portlet.portal.repaintPortlet(id,evUserParam,true);
	}
}

canceldynamic = function(id) {
	var nodeId = id + "-ef_dy_param";
	$("#" + nodeId).hide();
}

efportlet.prototype._showPortlet=function(editFlag,_portlet){
	   var evcm02 = _portlet.evcm02;
	   var tabs = _portlet.tabs;
	   if(editFlag=="false"){
	   		this.hasEditImg = false;
	   		this.hasCloseImg = false;
	   }
	   
		this.expandWidth = document.body.clientWidth - 20;//portlet最大化时宽度设置
		this.beforeCloseCallBack = on_portlet_position_change_close; // Portlet关闭回调
		this.endDragCallBack = on_portlet_position_change; // Portlet拖放回调
		this.setPortletContent = show_portlet_content; // Portlet内容展示回调
        this.setEditContent = show_portlet_edit_content; // Portlet参数内容展示回调
        //portlet图标地址
        portletContentType = evcm02.portletContentType;
        logoURL_temp="";
        efportlet.themaPath = _portlet.evcm01.themaPath;
        if(efportlet.themaPath==undefined){
        	efportlet.themaPath="default";
        }
        if(portletContentType=="1"){//iframe
        	logoURL_temp="";//
        }else if(portletContentType=="2"){//rss
        	logoURL_temp="rss.png";
        }else{
        	logoURL_temp="div.png";//div
        }
		this.init( {
			"tabs" : tabs,
			"id": _portlet.portletId,
			"logoURL"   : logoURL_temp,
			"portlet" : _portlet,
			"borderFlag" : _portlet.borderFlag
		});
}