/*
 * 表单设计器控件 - 输入框.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFInputText = $.extend({}, $.fb.fbWidget.prototype, {
	options: { 
		name: '输入框',
		belongsTo: $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type: 'EFInputText',
		_html : '<div> \
		        <input type="text" class="inputField"/> \
	            </div>',
		_counterField: 'ename',
		settings: {			
			ename: 'fld',
			datatype:'string',
			length:'64',
			size:'20',
			showtype:'0',
			value: '',	
			_persistable: true,
			required: true,
			restriction: 'no',
			styles : {
				fontFamily: 'default', // form builder default
				fontSize: '12',
				fontStyles: [0, 0, 0], // bold, italic, underline				
			    value: {
				  color : '000000',
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
		fb.target._log('fbEFInputText._getWidget executing...');		
		var $jqueryObject = $(fb.target.options._html);		
		$('input', $jqueryObject).attr('value',fb.settings.value)				
		$('input', $jqueryObject).attr('size',fb.settings.size);
		//设置初始化样式
		fb.target._updateValueStyle($jqueryObject.find('input'),fb);
		fb.target._log('fbEFInputText._getWidget executed.');		
		return $jqueryObject;
	},	
	_getFieldSettingsGeneralSection : function(event, fb) {
		fb.target._log('fbEFInputText._getFieldSettingsGeneralSection executing...');		
         //设置ename
		//设置面板
		var $ename = fb.target._label({ label: '字段名', name: 'field.ename' })
                         .append('<input type="text" id="field.ename" />');
        $('input', $ename).val(fb.settings.ename)
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
        //与表单渲染连动
       .keyup(function(event) {
 	      var value = $(this).val(); 	      
 	      fb.item.find('.inputField').attr('id',value);
	      fb.item.find('.inputField').attr('name',value);	     
	      fb.settings.ename = value;
	      fb.settings.id = value;    
         });
        //设置datatype
		//设置面板
		var $datatype = fb.target._label({ label: '数据类型', name: 'field.datatype' })
                         .append('<div><select id="field.datatype" style="width: 99%"> \
				                 <option value="string">字符串</option> \
				                 <option value="int">整数</option> \
				                 <option value="float">浮点数</option> \
			                     </select></div>');
        $('select', $datatype).val(fb.settings.datatype)
         .change(function(event) {
			fb.settings.datatype = $(this).val();
			fb.target._log('fb.settings.datatype = ' + fb.settings.datatype);
		});	
         //设置length
		//设置面板
		var $length = fb.target._label({ label: '数据长度', name: 'field.length' })
                         .append('<input type="text" id="field.length" />');
        $('input', $length).val(fb.settings.length)
        .blur(function(event) {
          var value = $(this).val(); 
          var validate = new efvalidator();
		  validate.setRegexType("positive_number");
		  validate.setNullable(false);
		  try{
		  validate.validate(value);
		  }catch(ex){
		  alert(ex.message);
		  }
        })
        //与表单渲染连动
       .keyup(function(event) {
 	      var value = $(this).val();	      	     
	      fb.settings.length = value;	    
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
         
        //设置size
		//设置面板
		var $size = fb.target._label({ label: '输入框长度', name: 'field.size' })
                         .append('<input type="text" id="field.size" />');
        $('input', $size).val(fb.settings.size)
        .blur(function(event) {
          var value = $(this).val(); 
          var validate = new efvalidator();
		  validate.setRegexType("positive_number");
		  validate.setNullable(false);
		  try{
		  validate.validate(value);
		  }catch(ex){
		  alert(ex.message);
		  }
        })
        //与表单渲染连动
       .keyup(function(event) {
 	      var value = $(this).val();	      	     
	      fb.settings.size = value;
	      fb.item.find('.inputField').attr('size', value);
         });
        
        //设置value
		//设置面板 
	   var $value = fb.target._label({ label: '缺省值', name: 'field.value' })
		                      .append('<input type="text" id="field.value" />');
		$('input', $value).val(fb.settings.value)
		//与表单渲染连动
		 .keyup(function(event) {
		  var value = $(this).val();		  
		  fb.item.find('.inputField').val(value);		  
		  fb.settings.value = value;
		});    
		
		
		
		
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
				styles.fontStyles[0] = 1;
			} else {
				fb.item.find('label span').css('fontWeight', 'normal');
				fb.item.find('.inputField').css('fontWeight', 'normal');
				styles.fontStyles[0] = 0;
			}
		});
	$("input[id$='field.italic']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label span').css('fontStyle', 'italic');
				fb.item.find('.inputField').css('fontStyle', 'italic');
				styles.fontStyles[1] = 1;
			} else {
				fb.item.find('label span').css('fontStyle', 'normal');
				fb.item.find('.inputField').css('fontStyle', 'normal');
				styles.fontStyles[1] = 0;
			}
		});	
	$("input[id$='field.underline']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label span').css('textDecoration', 'underline');
				fb.item.find('.inputField').css('textDecoration', 'underline');
				styles.fontStyles[2] = 1;
			} else {
				fb.item.find('label span').css('textDecoration', 'none');
				fb.item.find('.inputField').css('textDecoration', 'none');
				styles.fontStyles[2] = 0;
			}
		});
		
	$("input[id$='field.fontFamily']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label span').css('fontFamily', value);
			fb.item.find('.inputField').css('fontFamily', value);
			styles.fontFamily = value;
		});		
		
	$("select[id$='field.fontSize']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label span').css('fontSize', value + 'px');
			fb.item.find('.inputField').css('fontSize', value + 'px');
			styles.fontSize = value;
		});
		

		
		var $required = $('<div><input type="checkbox" id="field.required" />&nbsp;不能为空</div>');
		var $restriction = $('<div><select id="field.restriction" style="width: 99%"> \
				<option value="text">任何输入</option> \
                <option value="label">标签</option> \
                <option value="string">字符串</option> \
                <option value="chinese_string">汉字</option> \
				<option value="email">EMAIL</option> \
				<option value="mobile_phone">移动电话</option> \
                <option value="postcode">邮政编码</option> \
                <option value="phone_with_area_code">含区号电话号码</option> \
				<option value="phone_without_area_code">不含区号电话号码</option> \
                <option value="http_url">网址</option> \
                <option value="ip_address">IP地址</option> \
                <option value="mac">MAC地址</option> \
                <option value="integer">整数</option> \
                <option value="positive_integer">正整数</option> \
                <option value="nonnegative_integer">非负整数</option> \
                <option value="negative_integer">负整数</option> \
                <option value="number">数字</option> \
                <option value="nonnegative_number">非负数字</option> \
                <option value="positive_number">正数</option> \
                <option value="decimal">小数</option> \
			</select></div>');			
		var $valuePanel = fb.target._fieldset({ text: '验证'})
		                  .append(fb.target._twoColumns($required, $restriction));
		$('.col1', $valuePanel).css('width', '32%').removeClass('labelOnTop');
		$('.col2', $valuePanel).css('marginLeft', '34%').removeClass('labelOnTop');
		
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
		
		$("select option[value='" + fb.settings.restriction + "']", $restriction).attr('selected', 'true');
		$('select', $restriction).change(function(event) {
			fb.settings.restriction = $(this).val();
			fb.target._log('fb.settings.restriction = ' + fb.settings.restriction);
		});			
		
		var $inputField = fb.item.find('.inputField');
		var styles = fb.settings.styles;
		if (styles.value.color == 'default') {
			styles.value.color = $inputField.css('color');
		}
		if (styles.value.backgroundColor == 'default') {
			styles.value.backgroundColor = $inputField.css('backgroundColor');
		}		
		var $colorPanel = fb.target._valueColorPanel(styles);	
		
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
		
		
		var $basicAttr = fb.target._fieldset({ text: '基本属性'})
		                  .append(fb.target._twoColumns($ename,$datatype))
		                  .append(fb.target._twoColumns($length,$showtype))
		                  .append(fb.target._twoColumns($size,$value));
		var $fontset = fb.target._fieldset({ text: '字体'})
		                  .append($fontPanel);
		fb.target._log('fbEFInputText._getFieldSettingsGeneralSection executed.');
		 if ($('#container').attr('formType') == "dataGrid")
			 return [$basicAttr,$valuePanel];
		 else
		return [$basicAttr,$fontset,$valuePanel, $colorPanel];
	}
});

$.widget('fb.fbEFInputText', FbEFInputText);
