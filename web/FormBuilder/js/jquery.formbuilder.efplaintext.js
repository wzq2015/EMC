/*
 * 表单设计器控件 - 无格式文本框.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFPlainText = $.extend({}, $.fb.fbWidget.prototype, {
	options : { // default options. values are stored in widget's prototype
		name : '文本框',
		belongsTo : $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type : 'EFPlainText',
		_html : '<div class="PlainText"></div>',
		_counterField : 'text',
		settings : {			
			text : '无格式文字',
			classes : ['rightAlign', 'middleAlign'],
			styles : {
				fontFamily : 'default', // form builder default
				fontSize : '12',
				fontStyles : [0, 0, 0],
				label: {
				  color : '000000',
				  backgroundColor : 'default'
				}
			}
		}
	},
	_init : function() {
		$.fb.fbWidget.prototype._init.call(this);
		this.options = $.extend({}, $.fb.fbWidget.prototype.options,
				this.options);
	},
	_getWidget : function(event, fb) {
		fb.item.addClass(fb.settings.classes[1]); // vertical alignment
		$queryObject=$(fb.target.options._html);
		$queryObject.text(fb.settings.text)
				.addClass(fb.settings.classes[0]);
		fb.target._updateLabelStyle($queryObject,fb);
		return $queryObject;
	},
	_getFieldSettingsGeneralSection : function(event, fb) {
		var $text = fb.target._label({
					label : '文本内容',
					name : 'field.text'
				}).append('<input type="text" id="field.text" />');
		$('input', $text).val(fb.settings.text).keyup(function(event) {
					var value = $(this).val();
					fb.item.find('div.PlainText').text(value);
					fb.settings.text = value;
				});
		var $basicAttr = fb.target._fieldset({ text: '基本属性'})
		                  .append(fb.target._oneColumn($text));
		var $verticalAlignment = fb.target._verticalAlignment({
					name : 'field.verticalAlignment',
					value : fb.settings.classes[1]
				}).change(function(event) {
					fb.target._log('$verticalAlignment change trigger');
					var value = $('option:selected', this).val();
					fb.target._log('field.verticalAlignment value = ' + value);
					fb.item.removeClass(fb.settings.classes[1]).addClass(value);
					fb.settings.classes[1] = value;
				});
		var $horizontalAlignment = fb.target._horizontalAlignment({
					name : 'field.horizontalAlignment',
					value : fb.settings.classes[0]
				}).change(function(event) {
					fb.target._log('$horizontalAlignment change trigger');
					var $text = fb.item.find('div.PlainText');
					var value = $('option:selected', this).val();
					fb.target._log('field.horizontalAlignment value = ' + value);
					$text.removeClass(fb.settings.classes[0]).addClass(value);
					fb.settings.classes[0] = value;
				});
		var $alignment = fb.target._fieldset({ text: '对齐'})
		                  .append(fb.target._twoColumns($verticalAlignment, $horizontalAlignment));

		var styles = fb.settings.styles;
		var fbStyles = fb.target._getFbLocalizedSettings().styles;
		var fontFamily = styles.fontFamily != 'default'
				? styles.fontFamily
				: fbStyles.fontFamily;
		var fontSize = styles.fontSize != 'default'
				? styles.fontSize
				: fbStyles.fontSize;
		var $fontPanel = fb.target._fontPanel({
					fontFamily : fontFamily,
					fontSize : fontSize,
					fontStyles : styles.fontStyles,
					idPrefix : 'field.',
					nofieldset : true
				});

		$("input[id$='field.bold']", $fontPanel).change(function(event) {
					var item = fb.item.find('.PlainText');
					if ($(this).attr('checked')) {
						item.css('fontWeight', 'bold');
						styles.fontStyles[0] = 1;
					} else {
						item.css('fontWeight', 'normal');
						styles.fontStyles[0] = 0;
					}
				});
		$("input[id$='field.italic']", $fontPanel).change(function(event) {
					var item = fb.item.find('.PlainText');
					if ($(this).attr('checked')) {
						item.css('fontStyle', 'italic');
						styles.fontStyles[1] = 1;
					} else {
						item.css('fontStyle', 'normal');
						styles.fontStyles[1] = 0;
					}
				});
		$("input[id$='field.underline']", $fontPanel).change(function(event) {
					var item = fb.item.find('.PlainText');
					if ($(this).attr('checked')) {
						item.css('textDecoration', 'underline');
						styles.fontStyles[2] = 1;
					} else {
						item.css('textDecoration', 'none');
						styles.fontStyles[2] = 0;
					}
					
				});

		$("input[id$='field.fontFamily']", $fontPanel).change(function(event) {
					var value = $(this).val();
					fb.item.find('.PlainText').css('fontFamily', value);
					styles.fontFamily = value;
				});

		$("select[id$='field.fontSize']", $fontPanel).change(function(event) {
					var value = $(this).val();
					fb.item.find('.PlainText').css('fontSize', value + 'px');
					styles.fontSize = value;
				});
        var $fontset = fb.target._fieldset({ text: '字体'})
		                  .append($fontPanel);
		
		var styles = fb.settings.styles;
		var fbStyles = fb.target._getFbOptions().settings.styles;
		var color = styles.label.color != 'default' ? styles.label.color : fbStyles.color;
		var backgroundColor = styles.label.backgroundColor != 'default'
				? styles.label.backgroundColor
				: fbStyles.backgroundColor;
		var $colorPanel = fb.target._colorPanel({
					color : color,
					backgroundColor : backgroundColor,
					idPrefix : 'field.'
				});

		$("input[id$='field.color']", $colorPanel).change(function(event) {
					var value = $(this).data('colorPicker').color;
					fb.item.find('.PlainText').css('color', '#' + value);
					styles.label.color = value;
				});

		$("input[id$='field.backgroundColor']", $colorPanel).change(
				function(event) {
					var value = $(this).data('colorPicker').color;
					fb.item.find('.PlainText').css('backgroundColor', '#' + value);
					styles.label.backgroundColor = value;
				});
		if ($('#container').attr('formType') == "dataGrid") 
			return [$basicAttr];
		else
		    return [
				$basicAttr,
				$alignment,
				$fontset,$colorPanel];
	}
});

$.widget('fb.fbEFPlainText', FbEFPlainText);
