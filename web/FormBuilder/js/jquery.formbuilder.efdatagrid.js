/*
 * 表单设计器控件 - 富文本.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFDataGrid = $.extend({}, $.fb.fbWidget.prototype, {
	options : { 
		name : '数据表格',
		belongsTo : $.fb.formbuilder.prototype.options._fancyFieldsPanel,
		_type : 'EFDataGrid',
		_html : '<table border="1" cellspacing="1" width="100%">\
                 <tbody>\
                 <tr>\
                 <td colspan="4" style="border:1px solid;">\
                 <label id="DataGridTitle">表单子表</label></td>\
                 </tr>\
                 <tr><th name="0;1" style="border:1px solid;background:#B6DBF6;height:20px">\
                  <label id="label0" name="label0">  </label></th>\
                 <th name="1;1" style="border:1px solid;background:#B6DBF6;height:20px">\
                 <label id="label1" name="label1">  </label></th>\
                 <th name="2;1" style="border:1px solid;background:#B6DBF6;height:20px">\
                 <label id="label4" name="label4">  </label></th>\
                 <th name="3;1" style="border:1px solid;background:#B6DBF6;height:20px">\
                 <label id="label6" name="label6">  </label></th>\
                 </tr>\
                 <tr class="">\
                 <td name="0;2" style="border:1px solid;height:20px">\
                 <input type="text" size="6" value="">\
                 </td>\
                 <td name="1;2" style="border:1px solid;height:20px">\
                 <input type="text"  size="6" value="">\
                 </td>\
                 <td name="2;2" style="border:1px solid;height:20px">\
                 <input type="text"  size="6" value="">\
                 </td>\
                 <td name="3;2" style="border:1px solid;height:20px">\
                 <input type="text"  size="6" value="">\
                 </td>\
                 </tr>\
                 </tbody>\
                 </table>',
		_counterField : 'gridDisplayName',
		settings : {
			uuid:'',
			gridDisplayName:'表单子表',
			gridName:'',
			gridContent:null,
			styles : {
				color : 'default',
				backgroundColor : 'default'
			}
		}
	},
	_init : function() {
		$.fb.fbWidget.prototype._init.call(this); 
		this.options = $.extend({}, $.fb.fbWidget.prototype.options, this.options);
	},
	_getWidget : function(event, fb) {
		var $jqueryObject = $(fb.target.options._html);		
		$('#DataGridTitle', $jqueryObject).text(fb.settings.gridDisplayName);
		return $jqueryObject;
	},
	_getFieldSettingsGeneralSection : function(event, fb) {
		//设置表单名
	   //设置面板 
	   var $gridDisplayName = fb.target._label({ label: '表单显示名', name: 'field.gridDisplayName' })
		                      .append('<input type="text" id="field.gridDisplayName" />');
		$('input', $gridDisplayName).val(fb.settings.gridDisplayName)
		.blur(function(event) {
          var value = $(this).val(); 
          var validate = new efvalidator();
		  validate.setRegexType("chinese_string");
		  validate.setNullable(false);
		  try{
		  validate.validate(value);
		  }catch(ex){
		  alert(ex.message);
		  }
        })
		//与表单渲染连动
		 .keyup(function(event) {
		  var gridDisplayName = $(this).val(); 
		  fb.item.find('#DataGridTitle').text(gridDisplayName);		  
		  fb.settings.gridDisplayName = gridDisplayName;
		}); 
		 //设置表单名
		//设置面板 
	   var $gridName = fb.target._label({ label: '表单名', name: 'field.gridName' })
		                      .append('<input type="text" id="field.gridName" />');
		$('input', $gridName).val(fb.settings.gridName)
		.blur(function(event) {
          var value = $(this).val(); 
          var validate = new efvalidator();
		  validate.setRegexType("label");
		  validate.setNullable(false);
		  validate.setMinLength(2);
		  validate.setMaxLength(2);
		  try{
		  validate.validate(value);
		  }catch(ex){
		  alert(ex.message);
		  }
        })
		//与表单渲染连动
		 .keyup(function(event) {
		  var gridName = $(this).val();		  
		  fb.item.find('.inputField').val(gridName);		  
		  fb.settings.gridName = gridName;
		}); 
		
		var $basicAttr = fb.target._fieldset({ text: '基本属性'})
		                  .append(fb.target._oneColumn($gridDisplayName))
		                  .append(fb.target._oneColumn($gridName));
		var $btns = $('<button id="editBtn" type="button">编辑</button>');
		$($btns).click(function(event) {
		window.open('DispatchAction.do?efFormEname=EDMD11&formType=dataGrid&formName='+fb.settings.gridName+'&gridId='+fb.settings.uuid)	
		});	
		var $operations = fb.target._fieldset({ text: '操作'})
		                  .append(fb.target._oneColumn($btns));
		return [$basicAttr,$operations];
		
	}
});

$.widget('fb.fbEFDataGrid', FbEFDataGrid);
