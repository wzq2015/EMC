/*
 * 表单设计器控件 - 数据字典.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFDataDict = $.extend({}, $.fb.fbWidget.prototype, {
	options: { 
		name: '小代码选择',
		belongsTo: $.fb.formbuilder.prototype.options._fancyFieldsPanel,
		_type: 'EFDataDict',
		_html : '<ul id="formFields" class=""><li style="z-index: 500;" id="foli1" class="notStacked">\
                <select id="Field1" name="Field1" > \
                </select>\
                </li>\
                </ul>',
		_counterField: 'ename',
		settings: {
			ename: 'flddict',
			multivalue:[],
			showtype:'0',
			codename:'',
			condition:'',
			selected:'',
			value: '',
			_persistable: true,
			required: true,
			nobreaks: true,
			restriction: 'no',
			styles : {
				fontFamily: 'default', // form builder default
				fontSize: 'default',
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
		fb.target._log('fbEFDataDict._getWidget executing...');
		
		var $jqueryObject = $(fb.target.options._html);
		
		$('input', $jqueryObject).attr('name',fb.settings.ename);
		$('input', $jqueryObject).attr('value',fb.settings.value);
		
		var $select=$('select', $jqueryObject);
		//右侧下拉框改变触发事件
		$select.val(fb.settings.selected).change(function(event) {
			var value = $(this).val();
			fb.settings.selected = value;
		});
		if(fb.settings.codename != '')
			$select.append(fb.target.getItemOptions(fb.settings, fb.settings.selected, fb));
		
		fb.target._log('fbEFDataDict._getWidget executed.');
		return $jqueryObject;
	},	
	_getFieldSettingsGeneralSection : function(event, fb) {			
		fb.target._log('fbEFDataDict._getFieldSettingsGeneralSection executing...');	
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
		
		//设置datadict
		//设置面板
		var $codename = fb.target._label({ label: '小代码选项', name: 'field.codename' })
                          .append('<div><select id="field.codename" style="width: 99%">'+fb.target.getOptions(fb)+'</select></div>');
         $('select', $codename).val(fb.settings.codename)
         .change(function(event) {
         	//清除右侧下拉框历史
			fb.item.find('#Field1_0').remove();
			
			fb.settings.codename = $(this).val();
			
			fb.item.find('#Field1').append(fb.target.getItemOptions(fb.settings,'',fb));
			
			fb.target._log('fb.settings.codename = ' + fb.settings.codename);
		});

 		var $condition = fb.target._label({ label: '过滤条件', name: 'field.condition' })
 				.append('<div><input type="text" id="field.condition" style="width: 99%"/>');
        $('input', $condition).val(fb.settings.condition).keyup(function(event) {
    	   fb.settings.condition = $(this).val();
         });
   
		fb.target._log('fbEFDataDict._getFieldSettingsGeneralSection executed.');
		var $basicAttr = fb.target._fieldset({ text: '基本属性'})
		                  .append(fb.target._twoColumns($ename,$showtype))
		                  .append(fb.target._oneColumn($codename))
						  .append(fb.target._oneColumn($condition));
		return [$basicAttr];
	},
	
	//加载左侧下拉框数据
loadDataDict:function() {
	var info = new EiInfo();
	var dictData = [];
	EiCommunicator.send('EDMD90', 'loadDataDict', info, {
		onSuccess : function(outInfo) {
			dictData = outInfo.get('dictData');
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
	
	return dictData;
},
//加载右侧下拉框数据
loadDataDictItem:function(settings) {
	var info = new EiInfo();
	var dictItemData = [];
	info.set("codeName", settings.codename);
	info.set("condition", settings.condition);
	EiCommunicator.send('EDMD90', 'loadDataDictItem', info, {
		onSuccess : function(outInfo) {
			dictItemData = outInfo.get('dictItemData');
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
	
	return dictItemData;
},
//获取左侧下拉框
getOptions:function(fb) {
	var options='';
	dictData = fb.target.loadDataDict();
	if(dictData != null) {
		for(var i=0; i<dictData.length; i++) {
			var codesetCode = dictData[i].codesetCode;
			var codesetName = dictData[i].codesetName;
			options += '<option value='+codesetCode+'>'+codesetName+'</option>';
		}
	}
	
	return options;
},
//获取右侧下拉框
getItemOptions:function(settings, selected, fb) {
	var itemOptions = '';
	dictItemData = fb.target.loadDataDictItem(settings);
	
	if(dictItemData != null) {
		for(var i=0; i<dictItemData.length; i++) {
			var value = dictItemData[i].value;
			var label = dictItemData[i].label;
			if(selected == value)
				itemOptions += '<option id="Field1_0" selected='+selected+' value='+value+'>'+label+'</option>';
			else	
				itemOptions += '<option id="Field1_0" value='+value+'>'+label+'</option>';
		}
	}
	
	return itemOptions;
}
});

$.widget('fb.fbEFDataDict', FbEFDataDict);