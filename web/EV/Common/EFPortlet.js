/**
 * @wangyuqiu 2009-04-15
 */
var efportlet = function(id) {
	//    

	$.extend(this, efportlet.defaultConfig);


	this.id = id;
	this.portal = null;
	if(null == efportlet.portlets)
		efportlet.portlets = new Object();
	efportlet.portlets[id] = this;
}
efportlet.imageURL = "./EV/images/";

efportlet.portlets = null;

efportlet.defaultConfig = {
	width : 300,
	height : 200,
	expandWidth : 900,
	expandHeight : 600,
	maxStatus : true,
	minStatus : false,
	portletPosition : 0,
	configStatus : false,
	bgcolor : "#8bc2df",
	titleFontSize : 10,
	titleFontColor : "#000000",
	titleFontType: "宋体",
	contentFontSize : 10,
	contentFontColor : "#000000",
	contentFontType: "宋体",
	id : "efportlet",
	portletName : "平台portlet控件",
	expandStatus : false,
	hiddenStatus : false,
	closedStatus : false,
	editStatus : false,
	blockData:null,
	portletUrl:"",
	hasExpandImg : true,
	hasCloseImg : true,
	hasMinMaxImg : true,
	hasLogoImg : true,
	hasEditImg : true,
	paintNode:null
}

efportlet.prototype = {
	init : function(config) {
		if (typeof config === "object")
			$.extend(this, config);
		
		if(this.blockData != null && this.blockData.extAttr != null){
		   $.extend(this,this.blockData.extAttr);
		   //是否显示图标
		   this.hasLogoImg=this.imageFlag=="0"?"false":"true";
		}
				  
		this.body = $("<div style='padding:0px;margin:0 0 0 0;'/>").attr( {
			 id : this.id 
		  });
	
		//将当前portlet绑定在某个dom节点下
		if(this.paintNode == null){//采用portal容器进行渲染
			this.body.css({"margin":"5 2 5 2"});
		}else{
		  this.body.appendTo($("#"+this.paintNode));
		}
		
		this.jQuery = this.body;
		
		
		
		this.head = $("<div ></div>").attr( {
			id : this.id + "_head"
		});
		this.head.appendTo(this.body);
		
		this.edit = $("<div ></div>").attr( {
			id : this.id + "_edit"
		});
		this.edit.appendTo(this.body);
		this.content = $(
				"<div ></div>")
				.attr( {
					id : this.id + "_content"
				});
		this.content.appendTo(this.body);

		this._initConfig();

	},
	_initConfig : function() {

		this._initBodyConfig();
		this._initHeadConfig();
		this._initEditConfig();
		this._initContentConfig();

	},
	refresh : function() {

	},
	paint : function() {

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

efportlet.prototype._initBodyConfig = function() {
 
     //是否显示边框
	if(this.borderFlag=="0"){
		this.body.css( {
			"height" : this.height,
			"width" : this.width,
			"border" : "0px solid"
		});
	}else{
		this.body.css( {
			"height" : this.height,
			"width" : this.width,
			"border" : "1px solid "+ this.bgcolor
		});
	}
	
	/*
	var instance = this;
	this.body.mouseover( function() {
		instance.body.css( {
			"border" : "2px solid red"
		});
	});
	this.body.mouseout( function() {
		instance.body.css( {
			"border" : "2px solid #b4b4b4"
		});
	});
    */
}

efportlet.prototype._initHeadConfig = function() {
	var instance = this;
	//alert(instance.titleFontSize);
	this.head.css( {
		"height" : 25,
		"width" : this.width,
		"background" : this.bgcolor,
		"filter":"progid:DXImageTransform.Microsoft.Gradient(startColorStr="+this.bgcolor+", endColorStr='#ffffff', gradientType='0')"
	});
	
	this.headsun = $("<div />");
	this.headsun.css({
		"height" : 25,
		"width" : this.width,
		"cursor" : "move",
		"position" : "relative"
	})
	this.headsun.appendTo(this.head);
	//this.head = this.headsun;
	
	if(this.hasLogoImg && this.hasLogoImg != "false"){
		this.head_logoImage = $("<img />");
			
		if (!!this.logoURL){
			this.head_logoImage.attr( {
				src : this.logoURL
			});
		}else{
		    this.head_logoImage.attr( {
						src : efportlet.imageURL + "eview_config_hover.gif"
			});
		}	
	
		this.head_logoImage.css( {
			"position" : "absolute",
			"top" : "3",
			"left" : "3",
			"float" : "left"
		});
	
		this.headsun.append(this.head_logoImage.attr( {
			border : "0"
		}));
		this.head_logoImage.wrap("<a href='javascript:void(0)'></a>");
	}
	
	/*
	if(this.hasEditImg && this.hasEditImg != "false"){
	    
	    this.head_editImage = $("<img />").attr( {
			src : efportlet.imageURL + "eview_edit.gif",
			border : "0"
		});
		this.head_editImage.css( {
			"position" : "absolute",
			"top" : "5",
			"right" : "50",
			"float" : "left"
		});
		this.head_editImage.click( function() {
			//divwindow = new divWindow("sss");
             //divwindow.show();
             obj=window.showModalDialog("DispatchAction.do?efFormEname=EVPM03&inqu_status-0-portletId="+instance.id,"","edge:raised;scroll:1;status:0;help:0;resizable:0;dialogWidth:900px;dialogHeight:330px;");
	         if(obj!=null){
			    //instance.bgcolor= "#FF0000";
			    //instance.titleFontSize= "12";
			    //instance.titleFontColor= "#000000";
			    //instance.refresh();
			    //instance.paint();
			    window.location.reload();
			 }
			
		});

		this.headsun.append(this.head_editImage);
		this.head_editImage.wrap("<a href='javascript:void(0)'></a>");

	}
	*/
	
	
	
	if(this.hasEditImg && this.hasEditImg != "false"){
		// edit
		this.head_eidt_cname = $("<div style='float:left;color:white;font-size:12;position:absolute;top:4;right:53;'>"
				+ "<a href='javascript:void(0)' style='color:white;'>编辑</a>"
				+ "</div>");
		this.headsun.append(this.head_eidt_cname);
		this.head_eidt_cname.click(function(){
			 if(instance.editStatus == false){
			    instance.editStatus=true;
			    instance.edit.show();
			    instance.head_eidt_cname.children().text("关闭编辑");
			    //instance.content.hide();
			    
			 }else{
			    instance.editStatus=false;
			    instance.edit.hide();
			    instance.head_eidt_cname.children().text("编辑");
			    //instance.content.show();
			    
			 }
		});
	}
	
	
	

	this.head_cname = $("<div style='float:left;font-weight:bold;position:absolute;top:4;left:20;'>"
			+ this.portletName + "</div>");
	this.head_cname.css({
		"color": this.titleFontColor,
		"font-family":this.titleFontType,
		"font-size":this.titleFontSize
	});		

	this.headsun.append(this.head_cname);

	if(this.hasCloseImg && this.hasCloseImg != "false"){
		this.head_closeImage = $("<img />").attr( {
			src : efportlet.imageURL + "eview_close.gif",
			border : "0"
		});
		this.head_closeImage.css( {
			"position" : "absolute",
			"top" : "5",
			"right" : "20",
			"float" : "left"
		});
		this.head_closeImage.hover( function() {
			$(this).attr( {
				src : efportlet.imageURL + "eview_close_hover.gif"
			});
	
		}, function() {
			$(this).attr( {
				src : efportlet.imageURL + "eview_close.gif"
			});
		}
	
		);
		this.head_closeImage.click( function() {
		    if(window.confirm("删除该Portlet后下次将不显示，确定要删除吗?")){
		      instance.close();
		    }
		});
	
		this.headsun.append(this.head_closeImage);
		this.head_closeImage.wrap("<a href='javascript:void(0)'></a>");
	}
	
	if(this.hasMinMaxImg && this.hasMinMaxImg != "false"){
		this.head_maxMinImage = $("<img />").attr( {
			border : "0"
		});
		;
		this.head_maxMinImage.css( {
			"position" : "absolute",
			"top" : "5",
			"right" : "35",
			"float" : "left"
		});
	
		var maxMinImage = (this.maxStatus == true) ? "eview_minimize"
				: "eview_maximize";
	
		this.head_maxMinImage.attr( {
			src : efportlet.imageURL + maxMinImage + ".gif"
		});
		this.head_maxMinImage.mouseover( function() {
			$(this).attr( {
				src : efportlet.imageURL + maxMinImage + "_hover.gif"
			});
	
		});
		this.head_maxMinImage.mouseout( function() {
			$(this).attr( {
				src : efportlet.imageURL + maxMinImage + ".gif"
			});
		});
	
	
		this.head_maxMinImage.click( function() {
			instance.maxStatus = (instance.maxStatus) ? false : true;
			if (instance.maxStatus == false) {
				instance.content.hide();
				instance.body.height(25);
			} else {
				instance.content.height(instance.height!="auto"?instance.height - 25:"auto");
				instance.body.height(instance.height);
				instance.content.show();
	
						
			}
	
			var innerMaxMinImage = (instance.maxStatus == true) ? "eview_minimize"
					: "eview_maximize";
			instance.head_maxMinImage.attr( {
				src : efportlet.imageURL + innerMaxMinImage + ".gif"
			});
			instance.head_maxMinImage.mouseover( function() {
				instance.head_maxMinImage.attr( {
					src : efportlet.imageURL + innerMaxMinImage + "_hover.gif"
				});
	
			});
			instance.head_maxMinImage.mouseout( function() {
				instance.head_maxMinImage.attr( {
					src : efportlet.imageURL + innerMaxMinImage + ".gif"
				});
			});
	
		});
	
		this.headsun.append(this.head_maxMinImage);
		this.head_maxMinImage.wrap("<a href='javascript:void(0)'></a>");

	}
	
	if (this.maxStatus == false) {
		this.content.hide();
		this.body.height(25);

	}	
	// the expand image
	
	if(this.hasExpandImg && this.hasExpandImg != "false"){
		this.head_expandImage = $("<img />").attr( {
			src : efportlet.imageURL + "eview_expand.gif",
			border : "0"
		});
		this.head_expandImage.css( {
			"position" : "absolute",
			"top" : "5",
			"right" : "5",
			"float" : "left"
		});
		this.head_expandImage.hover( function() {
			$(this).attr( {
				src : efportlet.imageURL + "eview_expand_hover.gif"
			});
	
		}, function() {
			$(this).attr( {
				src : efportlet.imageURL + "eview_expand.gif"
			});
		}
	
		);
		this.head_expandImage.click( function() {
			instance.expand(instance.id);
	
		});
	
		this.headsun.append(this.head_expandImage);
		this.head_expandImage.wrap("<a href='javascript:void(0)'></a>");

	}

	
	
	// this.head_cname.children().get(0).textContent = "关闭编辑";
	
	/*
	this.headsun.bind("mousedown",function(event){
		instance.startDrag(event);
	});
	this.headsun.bind("mouseup",function(event){
		instance.stopDrag(event);
	});
	this.headsun.bind("mousemove",function(event){
		instance.dragging(event);
	});
	*/


}

/**
portlet参数设置
*/
efportlet.prototype._initEditConfig = function() {
	if (false == this.editStatus){
		this.edit.hide();
	}
    this.edit.append("<div/>");
    
    
    var edit_conetent=this.setEditContent();
	if(!!edit_conetent){
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

   //重新刷新该portlet的sequence
	var sequenceStr = "";
	if(!!this.portal){
	    var count = this.portal.styleCount;
	    var offset = this.portletPosition%count;
		for(var key in efportlet.portlets){
			if(((efportlet.portlets[key].portletPosition % count) == offset) && (efportlet.portlets[key].portletPosition>this.portletPosition))
				efportlet.portlets[key].portletPosition -= count;
		}
		this.portletPosition = -1;
		
		for(var key in efportlet.portlets){
			if((efportlet.portlets[key].portletPosition % count) == offset)
				sequenceStr += key +":"+efportlet.portlets[key].portletPosition+";";
		}	
		sequenceStr += this.id +":"+this.portletPosition+";";
	
	}
	this.beforeCloseCallBack(sequenceStr);
	this.closedStatus = true;
	this.body.hide();

}

efportlet.prototype.heightTo = function(height) {
	this.height = height;
	if (this.maxStatus) {
		this.body.height(height);
		this.content.height(height!="auto"?height - 25:"auto");
	}
}

efportlet.prototype.widthTo = function(width) {
	this.width = width;
	this.body.width(width);
	this.content.width(width);
	this.head.width(width);
	this.headsun.width(width);

}

efportlet.prototype.expand = function(id) {

	this.expandStatus = (this.expandStatus) ? false : true;
	if (this.expandStatus) {
		for ( var key in efportlet.portlets) {
			if (key != id)
				efportlet.portlets[key].hidden();
		}
		this.preExpandHeight = this.height;
		this.preExpandWidth = this.width;
		//this.heightTo(this.expandHeight);
		//this.widthTo(this.expandWidth);
        this.heightTo(this.expandHeight);
		this.widthTo(this.expandWidth);
		if(!!this.portal){
			for(var k=0;k<this.portal.containerGrippers.length;k++){
				this.portal.containerGrippers[k].css({"display":"none"});
			}
		}
		

	} else {
		for ( var key in efportlet.portlets) {
			if (key != id && efportlet.portlets[key].closedStatus == false)
				efportlet.portlets[key].show();
		}

		this.heightTo(this.preExpandHeight);
		this.widthTo(this.preExpandWidth);

		if(!!this.portal){
			for(var k=0;k<this.portal.containerGrippers.length;k++){
				this.portal.containerGrippers[k].css({"display":""});
			}
		}

	}

}

efportlet.prototype._initContentConfig = function() {
	this.content.css( {
		"height" : this.height!="auto"?this.height - 25:this.height,
		"width" : this.width,
		"background" : "#FFFFFF"

	});
	var _content = $("<div id="+this.id+"_content_info"+" lastRange=0 eftabWidth=100%></div>");
	if(this.blockData != null && this.blockData.rows.length != 0){
		var divStr = "<div  title="+this.portletName+" eftabSrc="+this.portletUrl+"  ></div>";
		for(ii=0;ii<this.blockData.rows.length;ii++){
			divStr +="<div  title="+this.blockData.getCell(ii,"tabName")+" eftabSrc="
				+this.blockData.getCell(ii,"tabUrl")+"  ></div>";
		}
		var temp = $(divStr);
		temp.appendTo(_content);
	}else{
		var temp = $("<iframe frameBorder=0 width=100% height=100% scrolling=no src="+this.portletUrl+"></iframe>");
		temp.appendTo(_content);
	}
    
	_content.appendTo(this.content);
	
	var content_obj = this.setPortletContent();
	if(!!content_obj){
	  this.showTabCallBack = function(){};
	  _content.empty();
	  _content.append(content_obj);
	}
	
}

efportlet.prototype.setPortletContent = function (){
	
}

efportlet.prototype.startDrag = function(event) {
	this.body.css({position:"absolute"});
	this.dragFlage = true;
}

efportlet.prototype.stopDrag = function(event) {
	this.body.css({position:""});
	this.dragFlage = false;
}

efportlet.prototype.dragging = function(event) {
//	alert(event.target);
    var e = event || window.event;
	if(!!this.dragFlage){
 		//debugger;
		//this.body.get(0).style.left = e.clientX+"px";
		//this.body.get(0).style.top = e.clientY+"px";
	}
}



efportlet.prototype.showTabCallBack = function(){
	if(this.blockData != null && this.blockData.rows.length != 0){
		eval('eftab.show("'+this.id+'_content_info")');
	}
	
}

efportlet.prototype.beforeCloseCallBack = function( sequens){
	
	
}


efportlet.prototype.endDragCallBack = function( sequens){
	
}

/**
设置portlet参数显示内容回调函数
*/
efportlet.prototype.setEditContent = function(){
	
}


