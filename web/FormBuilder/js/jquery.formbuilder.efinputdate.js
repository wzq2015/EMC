/*
 * 表单设计器控件 - 日期控件.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFInputDate = $.extend({}, $.fb.fbWidget.prototype, {
	options: { // default options. values are stored in widget's prototype
		name: '日期输入',
		belongsTo: $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type: 'EFInputDate',
		_html : '<div> \
		       <input id="" class="inputField hasDatepicker" type="text" value="" name="" size="18" maxlength="18"> \
               <img  onmouseover="this.style.cursor=\'hand\'" src="./EF/Images/efcalendar_icon.png"  title="日历选择"> \
	           </div>',
		_counterField: 'ename',
		settings: {
			ename: 'flddt',
			length:'18',
			size:'18',
			showtype:'0',
			value: '',
			_persistable: true,
			required: true,
			restriction: 'no',
			styles : {
				fontFamily: 'default', // form builder default
				fontSize: '12',
				fontStyles: [0, 0, 0], // bold, italic, underline
				label: {
				  color : 'default',
				  backgroundColor : 'default'
				},
			   value: {
				  color : 'default',
				  backgroundColor : 'default'
				},
			   description: {
					color : '777777',
					backgroundColor : 'default'
			    }				
			}
		}
	},
	_init : function() {
		// calling base plugin init
		$.fb.fbWidget.prototype._init.call(this);
		// merge base plugin's options
		this.options = $.extend({}, $.fb.fbWidget.prototype.options, this.options);
	},
	_getWidget : function(event, fb) {
		fb.target._log('fbEFInputDate._getWidget executing...');
		
		//面板样式
		var styles = fb.settings.styles;
		//默认样式
		var fbStyles = fb.target._getFbLocalizedSettings().styles;
		//字体:宋体;楷体...
		var fontFamily = styles.fontFamily != 'default' ? styles.fontFamily : fbStyles.fontFamily;
		//字体大小
		var fontSize = styles.fontSize != 'default' ? styles.fontSize : fbStyles.fontSize;
		//加粗
		var fontWeight = styles.fontStyles[0] == 1 ? 'bold' : 'normal';
		//倾斜
        var fontStyle = styles.fontStyles[1] == 1 ? 'italic' : 'normal';
        //下划线
        var textDecoration = styles.fontStyles[2] == 1 ? 'underline' : 'none';
		
		var $jqueryObject = $(fb.target.options._html);		
		
		$('input', $jqueryObject).attr('id',fb.settings.ename);
		$('input', $jqueryObject).attr('name',fb.settings.ename);
		
		$('input', $jqueryObject).attr('value',fb.settings.value)
		.css('fontFamily', fontFamily)
		.css('fontSize', fontSize + 'px')
		.css('fontWeight',fontWeight)
		.css('fontStyle', fontStyle)
		.css('textDecoration', textDecoration)
		.css('color', '#' + styles.value.color)
		.css('backgroundColor', '#' + styles.value.backgroundColor);
		
		
		
		fb.target._log('fbEFInputDate._getWidget executed.');
		
		return $jqueryObject;
	},
	_getFieldSettingsGeneralSection : function(event, fb) {		
		fb.target._log('fbEFInputDate._getFieldSettingsGeneralSection executing...');		
         //设置ename
		//设置面板
		var $ename = fb.target._label({ label: '字段名', name: 'field.ename' })
                         .append('<input type="text" id="field.ename" />');
        $('input', $ename).val(fb.settings.ename)
        //与表单渲染连动
         .blur(function(event) {
          var value = $(this).val(); 
          var validate = new efvalidator();
		  validate.setRegexType("label");
		  validate.setNullable(false);
		  try{
		  validate.validate(value);
		  }catch(ex){
		  alert(ex.message);
		  }
        })
       .keyup(function(event) {
 	      var value = $(this).val();
 	      fb.item.find('.inputField').attr('id',"inqu_status-0-"+value);
	      fb.item.find('.inputField').attr('name',"inqu_status-0-"+value);	     
	      fb.settings.ename = value;
         });
         
         
        //设置showtype
		//设置面板
		var $showtype = fb.target._label({ label: '显示类型', name: 'field.showtype' })
                         .append('<div><select id="field.showtype" style="width: 99%"> \
				                 <option value="0">正常显示</option> \
				                 <option value="1">只读</option> \
				                 <option value="2">隐藏</option> \
			                     </select></div>');         
         $('select', $showtype).val(fb.settings.showtype)
         .change(function(event) {
			fb.settings.showtype = $(this).val();
			fb.target._log('fb.settings.showtype = ' + fb.settings.showtype);
		});		
         
       
        
        
        //设置value
		//设置面板 
	   var $value = fb.target._label({ label: '缺省值', name: 'field.value' })
		                      .append('<input type="text" size="12" id="field.value" readonly="true" />');
		$('input', $value).val(fb.settings.value)
		//与表单渲染连动
		//与表单渲染连动
        .blur(function(event) {
          var value = $(this).val(); 
          var validate = new efvalidator();
		  validate.setRegexType("date");
		  try{
		  validate.validate(value);
		  }catch(ex){
		  alert(ex.message);
		  }
        })
		.change(function(event) {
		  var value = $(this).val();		  
		  fb.item.find('.inputField').val(value);		  
		  fb.settings.value = value;
		})
		.datepicker({
          dateFormat:'yy-mm-dd',
          changeMonth:true,
          changeYear:true,
          monthNamesShort:['01','02','03','04','05','06','07','08','09','10','11','12'],
          dayNamesMin:['日','一','二','三','四','五','六'],
          dayNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
          prevText:'上个月',
          nextText:'下个月'});
	
    var styles = fb.settings.styles;
    var fbStyles = fb.target._getFbLocalizedSettings().styles;
    var fontFamily = styles.fontFamily != 'default' ? styles.fontFamily : fbStyles.fontFamily ;
	var fontSize = styles.fontSize != 'default' ? styles.fontSize : fbStyles.fontSize;	  
	var $fontPanel = fb.target._fontPanel({ fontFamily: fontFamily, fontSize: fontSize, 
				                           fontStyles: styles.fontStyles, idPrefix: 'field.', nofieldset: true });
		
	$("input[id$='field.bold']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label span').css('fontWeight', 'bold');
				fb.item.find('.inputField').css('fontWeight', 'bold');
				fb.item.find('.formHint').css('fontWeight', 'bold');
				styles.fontStyles[0] = 1;
			} else {
				fb.item.find('label span').css('fontWeight', 'normal');
				fb.item.find('.inputField').css('fontWeight', 'normal');
				fb.item.find('.formHint').css('fontWeight', 'normal');
				styles.fontStyles[0] = 0;
			}
		});
	$("input[id$='field.italic']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label span').css('fontStyle', 'italic');
				fb.item.find('.inputField').css('fontStyle', 'italic');
				fb.item.find('.formHint').css('fontStyle', 'italic');
				styles.fontStyles[1] = 1;
			} else {
				fb.item.find('label span').css('fontStyle', 'normal');
				fb.item.find('.inputField').css('fontStyle', 'normal');
				fb.item.find('.formHint').css('fontStyle', 'normal');
				styles.fontStyles[1] = 0;
			}
		});	
	$("input[id$='field.underline']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label span').css('textDecoration', 'underline');
				fb.item.find('.inputField').css('textDecoration', 'underline');
				fb.item.find('.formHint').css('textDecoration', 'underline');
				styles.fontStyles[2] = 1;
			} else {
				fb.item.find('label span').css('textDecoration', 'none');
				fb.item.find('.inputField').css('textDecoration', 'none');
				fb.item.find('.formHint').css('textDecoration', 'none');
				styles.fontStyles[2] = 0;
			}
		});
		
	$("input[id$='field.fontFamily']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label span').css('fontFamily', value);
			fb.item.find('.inputField').css('fontFamily', value);
			fb.item.find('.formHint').css('fontFamily', value);
			styles.fontFamily = value;
		});		
		
	$("select[id$='field.fontSize']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label span').css('fontSize', value + 'px');
			fb.item.find('label em').css('fontSize', value + 'px');
			fb.item.find('.inputField').css('fontSize', value + 'px');
			fb.item.find('.formHint').css('fontSize', value + 'px');
			styles.fontSize = value;
		});				
		
		var $required = $('<div><input type="checkbox" class="floatClearLeft" id="field.required" />&nbsp;不能为空</div>');
		
		var $valuePanel = fb.target._fieldset({ text: '验证'})
		                  .append($required);
		//$('.col1', $valuePanel).css('width', '32%').removeClass('labelOnTop');
		
		$('input', $required).attr('checked', fb.settings.required)
		 .change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('em').text('*');
				fb.settings.required = true;
			} else {
				fb.item.find('em').text('');		
				fb.settings.required = false;
			}
		});			
		
		var $inputField = fb.item.find('.inputField');
		var styles = fb.settings.styles;
		if (styles.value.color == 'default') {
			styles.value.color = $inputField.css('color');
		}
		if (styles.value.backgroundColor == 'default') {
			styles.value.backgroundColor = $inputField.css('backgroundColor');
		}		
		var $colorPanel = fb.target._labelValueDescriptionColorPanel(styles);
		
		$("input[id$='field.label.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('label span').css('color', '#' + value);
			fb.item.find('label em').css('color', '#' + value);
			styles.label.color = value;
		});		

		$("input[id$='field.label.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('label span').css('backgroundColor','#' + value);
			styles.label.backgroundColor = value;
		});				
		
		$("input[id$='field.value.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			$inputField.css('color','#' + value);
			styles.value.color = value;
		});		

		$("input[id$='field.value.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			$inputField.css('backgroundColor','#' + value);
			styles.value.backgroundColor = value;
		});					
		
		$("input[id$='field.description.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('.formHint').css('color','#' + value);
			styles.description.color = value;
		});		

		$("input[id$='field.description.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('.formHint').css('backgroundColor','#' + value);
			styles.description.backgroundColor = value;
		});				
		fb.target._log('fbEFInputDate._getFieldSettingsGeneralSection executed.');
		
		var $basicAttr = fb.target._fieldset({ text: '基本属性'})
		                  .append(fb.target._twoColumns($ename,$showtype))
		                  .append(fb.target._oneColumn($value));
	     
		 var $fontset = fb.target._fieldset({ text: '字体'})
		                  .append($fontPanel);	
		 if ($('#container').attr('formType') == "dataGrid")
			 return [$basicAttr];
		 else
		     return [$basicAttr,$fontset,$colorPanel];
	}
});

$.widget('fb.fbEFInputDate', FbEFInputDate);
