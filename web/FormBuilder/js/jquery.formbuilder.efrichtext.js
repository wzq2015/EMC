/*
 * 表单设计器控件 - 格式文本框.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFRichText = $.extend({}, $.fb.fbWidget.prototype, {
	options : { // default options. values are stored in widget's prototype
		name : '格式文本框',
		belongsTo : $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type : 'EFRichText',
		_html : '<div class="RichText"></div>',
		_counterField : 'text',
		_languages : ['en', 'zh_CN'],
		settings : {			
			text : '格式文本',
			classes : ['leftAlign', 'topAlign'],				
			styles : {
				fontFamily : 'default', // form builder default
				fontSize : 'default',
				fontStyles : [0, 0, 0],
				// bold, italic, underline	
				color : 'default',
				backgroundColor : 'default'
			}
		}
	},
	_init : function() {
		$.fb.fbWidget.prototype._init.call(this);
		this.options = $.extend({}, $.fb.fbWidget.prototype.options,
				this.options);
	},
	_getWidget : function(event, fb) {
		return $(fb.target.options._html).append(fb.settings.text);
	},
	_postHandlingOfFieldSetting : function(event, $widget) {		
		var settings = $widget.data('fbWidget');
		var ueditor = new baidu.editor.ui.Editor()
		$widget.data('ueditor',ueditor);
		var richText = settings.text;
		ueditor.render("myEditor");
		ueditor.setContent(richText);
	},
	_getFieldSettingsGeneralSection : function(event, fb) {
		var $text = $('<div id="myEditor" style="width:300px;height:250px;"></div>');
		var $btns = $('<button id="saveBtn" type="button">保存</button>');
		$($btns).click(function(event) {
			var ueditor = fb.item.data('ueditor');
			fb.settings.text = ueditor.getContent();
			fb.item.find('div.RichText')
					.replaceWith($('<div class="RichText"></div>'));
			fb.item.find('div.RichText').append(ueditor.getContent());
		});
		return [$btns,$text];
	}
});

$.widget('fb.fbEFRichText', FbEFRichText);
