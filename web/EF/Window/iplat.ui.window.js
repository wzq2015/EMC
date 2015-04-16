var EFWindow = null;
self.onError = null;
var showComponent = null;

/**
 * efwindow 弹出窗口对象构造函数
 * 
 * @class efwindow 弹出窗口对象
 * @constructor
 */
efwindow = function() {
}

/**
 * 该函数使efwindow弹出窗口显示出来
 * 
 * @param {Object}
 *            obj: 触发efwindow弹出窗口的DOM节点
 * @param {Object}
 *            div_id: efwindow弹出窗口对应DIV的ID
 * @param {String}
 *            center： efwindow弹出窗口是否在中央显示,为"center"时在中央显示，默认为不在中央显示
 * @param {String}
 *            title： 弹出窗口标题
* @param {Object}
 *            button_json： 弹出窗口标题的按钮信息
 */
efwindow.show = function(obj, div_id,  center,  title,  button_json) {
	
	// debugger;
	showComponent = obj;
	EFWindow = div_id;
	var window_obj = $('#'+EFWindow);
	if(window_obj.length == 0) return;
	
	var resizeFunc = window.onresize;
	window.onresize = null;
		
	var dlgleft = 0;
	var dlgtop = 0;
	var aWidth = window_obj.css('width');
	if(window_obj.hasClass("ui-dialog-content ui-widget-content"))
		aWidth = window_obj.parent().css('width');

	if (center == "center") {
		dlgleft = (document.body.clientWidth - window_obj.clientWidth) / 2;
		dlgtop = (document.body.clientHeight - window_obj.clientHeight) / 2;
	}
	else {
		// 解决不同浏览器下(如chrome)下，window位置问题
		if(obj.style.display=="none" && obj.nextSibling!=null)
			obj = obj.nextSibling;
		var offset = $(obj).offset();
		var objheight = $(obj).height();
		dlgleft = offset.left;
		dlgtop = offset.top + objheight;
	}
	
	//$('.ui-widget-overlay').click(function() { window_obj.dialog("close"); }); 
	window_obj.dialog({
		dialogClass: 'ef-widget-shadow',
		//title: title,
		resizable: false,
		minHeight: 50,
		height: 'auto',
        open: function(event, ui){
           	$(document).bind('mousedown', efwindow.clickdlgclose);
           	if(document.forms.length > 0)
           		document.forms[0].appendChild(window_obj.closest('div.ui-dialog')[0]);
           	}, 
        close: function(event, ui){
        	window.onresize = resizeFunc;
           	$(document).unbind('mousedown',efwindow.clickdlgclose); }           	
	});
	if(!!title)  window_obj.dialog({title: title});
	
	//如果传入button的json信息
	if(!!button_json)  window_obj.dialog({buttons: button_json});
	
	// 弹出框以固定固定宽度显示
	aWidth = parseInt(aWidth);
	if(!(aWidth > 0) || aWidth == 300){//1.考虑NaN情况，非大于0;2.dialog默认宽度300
		aWidth = window_obj.width();
		var divWidth = window_obj.find('div').width()+2; //在css中grid的border为2
		var tblWidth = window_obj.find('table').width();	
		aWidth = Math.max(aWidth,divWidth,tblWidth);
	
		if(aWidth == 2){
			window_obj.dialog("open" );
			aWidth = window_obj.find('table').width();
		}
	}

	window_obj.dialog({width: aWidth});
	$('.ui-dialog .ui-dialog-content').css('padding','0px');
	window_obj.dialog({position: [dlgleft, dlgtop]}).dialog("open" );
	$('a[type=button]').button();
	
	//2012-9-21 黄可
	//div之前的渲染无grid的宽度 ,如果有grid重绘 
//	window_obj.find('table[id$=__grid_table]').each(function()
//			{
//		       this.efgrid.paint();
//			});
	
}

/**
 * 当点击window打开时，点击window之外，关闭window
 * @param {Object}
 *            e
 */
efwindow.clickdlgclose = function(e) {
	var window_obj = $('#'+EFWindow);
	var uidialog = jQuery(e.target).closest('.ui-dialog');
	
	if(window_obj.dialog('isOpen')
       && ((!jQuery(e.target).is('.ui-dialog') && !uidialog.length)
       || uidialog.find('div:eq(1)').attr('id') != EFWindow)
       && jQuery(e.target).closest('.ui-datepicker').length == 0){
       		efwindow.hide();
       }
	return true;
}

/**
 * efwindow弹出窗口隐藏函数
 */
efwindow.hide = function() {
	// debugger;	
	var window_obj = $('#'+EFWindow);
	if (window_obj) {
		//window_obj.css("display", 'none');
		window_obj.dialog("close");
	}
}

/**
 * efwindow弹出窗口返回时的设值函数
 * 
 * @param {String}
 *            cell_value:弹出窗口隐藏时设置的值
 */
efwindow.setValue = function(cell_value) {
	if (showComponent.tagName == 'INPUT') {
		var index = cell_value.indexOf("\r\n");
		while (index != -1) {
			cell_value = cell_value.substring(0, index) + EF_CR_IDENTIFIER
					+ cell_value.substring(index + 2);
			index = cell_value.indexOf("\r\n");
		}

		showComponent.value = cell_value;

		if (showComponent.callback) {
			try {
				eval(showComponent.callback + "\"" + cell_value + "\" )");
			} catch (exception) {
			}
		}
	}

	efwindow.hide();
}




/**
 * 
 * Used for displaying DHTML only efModalWindows instead of using buggy modal windows.
 *
 * @author wangyuqiu@2008-4-10
 * @author wuzhanqing@2009-6-29
 * @author wangxueping@2012-07
 *
 * borrow ideas from SUBMODAL v1.6 which can be found at http://submodal.googlecode.com
 * 
 */
/**
 * Initializes efModalWindow code on load.	
 */
function EFModalWindow(windowID) {
	// Add the HTML to the body
	// need to verify whether the windowID is in use
	
	this.winID = windowID;
	
	var modalwindow = document.createElement("div");
	modalwindow.id = this.winID + '_efModalWindowContainer';
	modalwindow.className = 'efModalWindowContainer';
	modalwindow.style.textAlign = "center";
	//modalwindow.style.backgroundColor = 'transparent';
	modalwindow.innerHTML = "&nbsp;"
	
	document.body.appendChild(modalwindow);
	
	var dlgDiv = $("#" + modalwindow.id);
	dlgDiv.dialog({
		dialogClass: 'ef-widget-shadow',
		autoOpen: false,
		resizable: false,
		closeOnEscape: false,
		height: 140,
		modal: true,
		create : function(event, ui) {
			$(this).dialog("widget").find(".ui-dialog-titlebar").hide();
			$(this).dialog("widget").removeClass('ui-widget-content');
			//当body不存在滚动条时
			var html = $(document).find('html');
			if(html.length>0&&html[0].scrollHeight <= html[0].clientHeight
				&& document.body.scrollHeight<=document.body.clientHeight){
				$('body').css('overflow','hidden');	}
		},
		/* Scrollbar fix  */
		open: function(event, ui){
           	$('.ui-widget-overlay').css('width','100%');
           	dlgDiv.css('height', '100%');}, 
        close: function(event, ui){
           	$('body').css('overflow','auto'); }
	});
	
	this.popupContainer = $('#'+this.winID + "_efModalWindowContainer")[0];
}

/**
* Sets the content of modal window.
*/
EFModalWindow.prototype.setContent = function(content){
	// set the content
	//this.popupContainer.innerHTML = content;
	
	if(typeof content == "string"){
		this.popupContainer.innerHTML = content;
	}else if(typeof content == "object"){
		this.popupContainer.innerHTML = "";
		this.popupContainer.appendChild(content);
	}else{
		alert(getI18nMessages("ef.ParamInvalid","非法参数"));
	}	
}

 /**
	* @argument width - int in pixels
	* @argument height - int in pixels
	*/
EFModalWindow.prototype.show = function(width, height) {
	
	var dlgId = this.popupContainer.id;
	$("#"+dlgId).dialog({
		width: width,
		height: height
	}).dialog('open');

}
	
EFModalWindow.prototype.showProgressBar = function(){
	this.setContent('<img src='+ efico.get("efform.ajaxLoader") +' >');
	this.show(30, 70);
}

/**
 * @argument callReturnFunc - bool - determines if we call the return function specified
 * @argument returnVal - anything - return value 
 */
EFModalWindow.prototype.hide = function() {
	var dlgId = this.popupContainer.id;
	$("#"+dlgId).dialog('close');
	$("#"+dlgId).remove();
}



/**
 * @fileoverview This file is an example of how JSDoc can be used to document
 * JavaScript.
 *
 * author Xia Hongzhong
 * @version 1.0
 * author wangxueping 2012-07
 */
/**
 * 返回对象
 *
 * @class EFSubWindow是 <hr/> 在每个页面应用的JS中的efform_onload函数中实例化当前的集合类
 *
 * <pre>
 * 示例代码：
 * var subWindow;//全局变量
 * efform_onload = function ()	{
 * 	subWindow = new EFSubWindow(&quot;subwindow_div&quot;,&quot;title&quot;,400,300);
 * }
 * </pre>
 *
 * <hr/>
 * @param {String}
 *            divId 对应DIV的ID
 * @param {String}
 *            title 标题
 * @param {int}
 *            w 窗口宽度
 * @param {int}
 *            h 窗口高度
 * @constructor
 * @return 返回一个subWindow类对象
 */
function EFSubWindow(divId, title, w, h) {

	this.divId = divId;
	this.div = $('#'+divId); //jQuery对象
	this.title = title;
	this.w = w;
	this.h = h;
	this.returnValue;

	// 防止jsp页面自定义弹出框重复渲染
	this.div.find("script").remove();
	this.msgObj = newMsgObj(this.div, this.title, this.w, this.h);

	this.show = function(isShowModel) {
		if (isShowModel) {
			this.msgObj.dialog({modal: true});
		}
		this.msgObj.dialog("open");
	}

	this.hide = function() {
		this.msgObj.dialog("close");
		return this.returnValue;
	}

	function newMsgObj(div, title, w, h) {
		var iWidth = document.body.clientWidth;
		var iHeight = document.body.clientHeight;

		div.css('overflow-y','auto');
		div.dialog({
			dialogClass: 'ef-widget-shadow',
			autoOpen: false,
			resizable: false,
			title: "- " + title,
			width: w,
			height: h,
			position: [(iWidth - w) / 2, (iHeight - h) / 2],
			open: function(event, ui){
				$('.ui-dialog .ui-dialog-content').css('padding','0px');}
		});
		return div;
	}
}

//增加EFColorBox函数定义
EFColorbox = function(options, callback) {
	$.fn.colorbox(options, callback);
};