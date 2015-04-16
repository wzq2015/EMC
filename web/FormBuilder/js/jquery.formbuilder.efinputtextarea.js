/*
 * 表单设计器控件 - 多行输入.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFInputTextarea = $.extend({}, $.fb.fbWidget.prototype, {
	options: { 
		name: '多行输入',
		belongsTo: $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type: 'EFInputTextarea',
		_html : '<div> \
		        <textarea id="" class="inputField" name=""/> \
	            </div>',
		_counterField: 'ename',
		settings: {
			ename: 'fldar',
			datatype: 'string',
			length: '500',
			value:'',
			cols:'18',
			rows:'3',
			showtype: '0',
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
		fb.target._log('fbEFInputTextarea._getWidget executing...');
		
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
		
		
		//是否为空
		if (fb._settings.required) {
			$('label em', $jqueryObject).text('*')
			.css('fontSize', fontSize + 'px')
			.css('color', '#' + styles.label.color);
		}
		
//		$('textarea', $jqueryObject).attr('id',fb.settings.ename);
		//字段名
		$('textarea', $jqueryObject).attr('name',fb.settings.ename);
		
		//缺省值
		$('textarea', $jqueryObject).attr('value',fb.settings.value)
		.css('fontFamily', fontFamily)
		.css('fontSize', fontSize + 'px')
		.css('fontWeight',fontWeight)
		.css('fontStyle', fontStyle)
		.css('textDecoration', textDecoration)
		.css('color', '#' + styles.value.color)
		.css('backgroundColor', '#' + styles.value.backgroundColor);
		
		//输入框列数
		$('textarea', $jqueryObject).attr('cols',fb.settings.cols);
		//输入框行数
		$('textarea', $jqueryObject).attr('rows',fb.settings.rows);
		
		fb.target._log('fbEFInputTextarea._getWidget executed.');
		
		return $jqueryObject;
	},	
	_getFieldSettingsGeneralSection : function(event, fb) {		
		fb.target._log('fbEFInputTextarea._getFieldSettingsGeneralSection executing...');      
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
 	      fb.item.find('.inputField').attr('id',value);
	      fb.item.find('.inputField').attr('name',value);
	      fb.settings.ename = value;
	      fb.settings.id = value;
         });
         
       //设置datatype
	   //设置面板
	   var $datatype = fb.target._label({ label: '数据类型', name: 'field.datatype' })
                     .append('<div><select id="field.datatype" style="width: 99%"> \
			                 <option value="0">字符串</option> \
							 <option value="1">大字符</option> \
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
         
        //设置cols
		//设置面板
		var $cols = fb.target._label({ label: '输入框列数', name: 'field.cols' })
                         .append('<input type="text" id="field.cols" />');
        $('input', $cols).val(fb.settings.cols)
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
       .keyup(function(event) {
 	      var value = $(this).val();
 	      fb.item.find('.inputField').attr("cols", value);
	      fb.settings.cols = value;
         });
         
         //设置rows
		//设置面板
		var $rows = fb.target._label({ label: '输入框行数', name: 'field.rows' })
                         .append('<input type="text" id="field.rows" />');
        $('input', $rows).val(fb.settings.rows)
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
 	      fb.item.find('.inputField').attr("rows", value);
	      fb.settings.rows = value;
         });
         
        //设置showtype
		//设置面板
		var $showtype = fb.target._label({ label: '显示类型', name: 'field.showtype' })
                         .append('<div><select id="field.showtype" style="width: 99%"> \
				                 <option value="0">正常显示</option> \
				                 <option value="1">只读显示</option> \
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
		                      .append('<textarea  id="field.value" rows="3" />');
		$('textarea', $value).val(fb.settings.value)
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
	
	//加粗联动
	$("input[id$='field.bold']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				//标题
				fb.item.find('label span').css('fontWeight', 'bold');
				//缺省值
				fb.item.find('.inputField').css('fontWeight', 'bold');
				styles.fontStyles[0] = 1;
			} else {
				fb.item.find('label span').css('fontWeight', 'normal');
				fb.item.find('.inputField').css('fontWeight', 'normal');
				styles.fontStyles[0] = 0;
			}
		});
	//倾斜联动	
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
	//下划线联动	
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
	
	//字体联动
	$("input[id$='field.fontFamily']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label span').css('fontFamily', value);
			fb.item.find('.inputField').css('fontFamily', value);
			styles.fontFamily = value;
		});		
	
	//字体大小联动
	$("select[id$='field.fontSize']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label span').css('fontSize', value + 'px');
			fb.item.find('label em').css('fontSize', value + 'px');
			fb.item.find('.inputField').css('fontSize', value + 'px');
			styles.fontSize = value;
		});	
		
		var $required = $('<div><input type="checkbox" id="field.required" />&nbsp;不能为空</div>');		
		var $valuePanel = fb.target._fieldset({ text: '校验'})
		                  .append($required);
		
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
		
		//标题颜色设置
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
		
		//缺省值颜色设置
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
		                  .append(fb.target._twoColumns($cols, $rows))
		                   .append(fb.target._oneColumn($value));
		var $fontset = fb.target._fieldset({ text: '字体'})
		                  .append($fontPanel);		
		fb.target._log('fbEFInputTextarea._getFieldSettingsGeneralSection executed.');
		return [$basicAttr,$fontset,$valuePanel, $colorPanel];
	}
});

$.widget('fb.fbEFInputTextarea', FbEFInputTextarea);
