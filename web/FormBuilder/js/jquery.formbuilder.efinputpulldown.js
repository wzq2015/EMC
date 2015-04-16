/*
 * 表单设计器控件 - 下拉框.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFInputPulldown = $.extend({}, $.fb.fbWidget.prototype, {
	options: { // default options. values are stored in widget's prototype
		name: '下拉框',
		belongsTo: $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type: 'EFInputPulldown',
		_html : '<ul id="formFields" class=""><li style="z-index: 500;" id="foli1"  class="notStacked">\
                <select  id="Field1" name="Field1" > \
                <option id="Field1_0" value="1" selected="selected">选项1</option>\
                </select>\
                </li>\
                </ul>',
		_counterField: 'ename',
		settings: {
			ename: 'fldpd',
			length:'',
			multivalue:[{id:"0",key:'1',value:'选项1',checked:''}],
			showtype:'0',
			value: '',
			description: '',
			_persistable: true,
			required: true,
			nobreaks: true,
			restriction: 'no',
			styles : {
				fontFamily: 'default', // form builder default
				fontSize: '12',
				fontStyles: [0, 0, 0], // bold, italic, underline
				label: {
				  color : '000000',
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
		fb.target._log('fbEFInputPulldown._getWidget executing...');
		
		//面板样式(与语言相关)
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
		
		$('input', $jqueryObject).attr('name',fb.settings.ename);
		$('input', $jqueryObject).attr('value',fb.settings.value);
		
		//2012-2-4 tankeyuan 数组数据转换解决IE8上下拉框无法增加选项
		$tempmv=fb.settings.multivalue;
		if($tempmv==undefined||$tempmv==null){
		  fb.settings.multivalue=new Array();
		}
		if($tempmv!=undefined&&$tempmv.length==undefined){
		  var $mv=new Array();
		  var i=0;
		  while($tempmv[i]!=undefined){		  
		    $modifObj=new Object();
			$modifObj["id"]= $tempmv[i]["id"];
			$modifObj["key"]=$tempmv[i]["key"];
			$modifObj["value"]=$tempmv[i]["value"];			
			$modifObj["checked"]=$tempmv[i]["checked"];
			$mv.push($modifObj);
			i++;
		  }
		  fb.settings.multivalue=$mv;
		}
		
		//$.makeArray($tempmv)
		
		//show multivalue;
		$multivalue=fb.settings.multivalue;
		//show item
		 var $curChoice=$('#Field1_0',$jqueryObject);
		 var $select=$('select',$jqueryObject);
		for(var i=0;i<$($multivalue).length;i++){
		   var $curChoiceValue=$multivalue[i];
		   var $choiceItem;
		   if($curChoiceValue["checked"])
		    $choiceItem = $('<option id="Field1_' +$curChoiceValue["id"]+
                           		'" selected="selected" value="' +$curChoiceValue["key"]+
                           		'" >' +$curChoiceValue["value"]+
                           				'</option>');
			
           else
            $choiceItem = $('<option id="Field1_' +$curChoiceValue["id"]+
                           		'"  value="' +$curChoiceValue["key"]+
                           		'" >' +$curChoiceValue["value"]+
                           				'</option>');
          
            $select.append($choiceItem); 
		}
		if($($multivalue).length>0)
		$curChoice.remove();
		fb.target._log('fbEFInputPulldown._getWidget executed.');
		return $jqueryObject;
	},	
	_updateChoiceMulteValue:function(choiceCtrlItem,fb,choiceItemId){
		var $key=$('input[name="key"]',choiceCtrlItem);
		var $value=$('input[name="value"]',choiceCtrlItem);
		var $checked=$('input[name="allChoices"]',choiceCtrlItem);
		//alert($key.val());
		var $multiValue=fb.settings.multivalue;
		if($multiValue==undefined||$multiValue==null){
		$multiValue=new Array();
		}
		//判断键值是否唯一
		for(var i=0;i<$($multiValue).length;i++){
			if(($multiValue[i]["id"]!=choiceItemId)&&($multiValue[i]["key"]==$key.val())){
			alert("值["+$key.val()+"]存在重复!");
			}
		}
		var $modifObj;
		for(var i=0;i<$($multiValue).length;i++){
		 var obj=$multiValue[i];
		  if(obj["id"]==choiceItemId){
		    $modifObj=obj;
		    $multiValue[i]["key"]=$key.val();
			$multiValue[i]["value"]=$value.val();			
			if($checked.attr("checked"))
			$multiValue[i]["checked"]="checked";
			else
			$multiValue[i]["checked"]="";			
		  }
		  else{
		  if($checked.attr("checked"))
			$multiValue[i]["checked"]="";
		  }
		}
		
		if($modifObj==null){
			$modifObj=new Object();
			$modifObj["id"]=choiceItemId;
			$modifObj["key"]=$key.val();
			$modifObj["value"]=$value.val();
			if($checked.attr("checked"))
			$modifObj["checked"]="checked";
			else
			$modifObj["checked"]="";
		  $multiValue.push($modifObj);
		}
		// var value = $(this).val();	 			  
		fb.settings.multivalue = $multiValue;
	    fb.target._log('fb.settings.multivalue = ' + fb.settings.multivalue);
	},
	//移除多选值中的选择项值
	_removeChoiceMulteValue:function(choiceCtrlItem,fb,choiceItemId){
		var $multiValue=fb.settings.multivalue;
		for(var i=0;i<$($multiValue).length;i++){
		 var obj=$multiValue[i];
		  if(obj["id"]==choiceItemId){
		    $multiValue.splice(i,1);
		    break;
		  }
		}
	},
	_bindChoiceItemEvent:function(choiceCtrlItem,fb){
		//点击单选按钮触发右边单选控件中选择对应的选择项
		$("input[name='allChoices']", choiceCtrlItem).click(function(event){
			var itemId=$(this).parent().attr('id');
			var $itemChoice=fb.item.find('#Field1_'+itemId);
		    if($(this).attr('checked')){		      
              $itemChoice.get(0).selected=true;		 
		    }
		    else
		      $itemChoice.get(0).selected=false;
		    fb.target._updateChoiceMulteValue($(this).parent(),fb,itemId);
		});
		//点击增加按钮触发，左边新增一选择项目输入项，右边单选控件中增加对应的选择项
        $("img[src$='add.png']", choiceCtrlItem).click(function(event){
        	              var itemId=$(this).parent().attr('id');
        	              var $newChoiceId=Math.uuid();
                          var $itemCounts=$(this).parent().siblings().length;
	                      var $choiceItem=$('<li id="'+$newChoiceId+'">\
                           <input name="allChoices" class="floatClearLeft"   type = "radio">\
                           <input name="key" class ="text" size="8" autocomplete = "off" value ="'+($itemCounts+2)+'"  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value ="'+"选项"+($itemCounts+2)+'"  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除选项" >\
                           </li>');
                           fb.target._bindChoiceItemEvent($choiceItem,fb);
                          $(this).parent().after($choiceItem);
                           fb.target._updateChoiceMulteValue($choiceItem,fb,$newChoiceId);
                           
                           var $newChoice = $('<option id="Field1_' +$newChoiceId+
                           		'" value="'+($itemCounts+2)+'" >选项'+($itemCounts+2)+'</option>'); 
                           var $select=fb.item.find('select');
                           $($select).append($newChoice);  
                           });
           //点击删除按钮触发左右边删除对应的选择项
          $("img[src$='delete.png']", choiceCtrlItem).click(function(event){
          	               var itemId=$(this).parent().attr('id');
          	               if(fb.item.find('option').length==1) return;
          	               var $curChoice=fb.item.find('#Field1_'+itemId);
                           $(this).parent().remove();
                           $($curChoice).remove();
                           fb.target._removeChoiceMulteValue($(this).parent(),fb,itemId);
                           });
          //左边输入健值触发更改右边对应的选择项的值
          $("input[name='key']", choiceCtrlItem).keyup(function(event){
             	var itemId=$(this).parent().attr('id');
             	//alert(itemId);
             	var $itemChoice=fb.item.find('#Field1_'+itemId);
             	$itemChoice.get(0).value=$(this).val(); 
             	fb.target._updateChoiceMulteValue($(this).parent(),fb,itemId);
             });
          //左边输入值触发更改右边对应的选择项的显示值
         $("input[name='value']",choiceCtrlItem).keyup(function(event){
        	var itemId=$(this).parent().attr('id');
        	//alert(itemId);
            var $itemChoice=fb.item.find('#Field1_'+itemId);
            $($itemChoice).text($(this).val());
             fb.target._updateChoiceMulteValue($(this).parent(),fb,itemId);
         });
	
    },
	
	_getFieldSettingsGeneralSection : function(event, fb) {
		fb.target._log('fbEFInputPulldown._getFieldSettingsGeneralSection executing...');		
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
		
         //设置length
		//设置面板
		var $length = fb.target._label({ label: '数据长度', name: 'field.length' })
                         .append('<input type="text" id="field.length" />');
        $('input', $length).val(fb.settings.length)
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
		
		
		var $choiceItem =$('<div>\
                           <ul id= "fieldChoices" style="list-style:none;">\
                           <li id="0">\
                           <input name="allChoices" class="floatClearLeft" title= "初始选项" checked="checked" type = "radio">\
                           <input name="key"  class ="text" size="8" autocomplete = "off" value =""  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value =""  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除选项" >\
                           </li>\
                           </ul>\
                           </div>');
          //restore multivalue
           //show multivalue;
		$multivalue=fb.settings.multivalue;
		//show item
		 var $curChoice=$('#0',$choiceItem);
		for(var i=0;i<$($multivalue).length;i++){
		   var $curChoiceValue=$multivalue[i];
		   var $newChoice;
		   if($curChoiceValue["checked"]){
		   $newChoice=$('<li id="' +$curChoiceValue["id"]+
		   		'">\
                           <input name="allChoices" class="floatClearLeft" checked="checked" type = "radio">\
                           <input name="key"  class ="text" size="8" autocomplete = "off" value ="' +$curChoiceValue["key"]+
                           '"  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value ="' +$curChoiceValue["value"]+
                           '"  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除选项" >\
                           </li>');
		   }
		   else
		    $newChoice=$('<li id="' +$curChoiceValue["id"]+
		   		'">\
                           <input name="allChoices" class="floatClearLeft" type = "radio">\
                           <input name="key"  class ="text" size="8" autocomplete = "off" value ="' +$curChoiceValue["key"]+
                           '"  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value ="' +$curChoiceValue["value"]+
                           '"  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除选项" >\
                           </li>');
          fb.target._bindChoiceItemEvent($newChoice,fb);                
		  $($curChoice).parent().append($newChoice); 
		}
		if($($multivalue).length>0)
		$($curChoice).remove();
		else
         fb.target._bindChoiceItemEvent($curChoice,fb); 
		               
	    var $selectSet = fb.target._fieldset({ text: '选择项'})
		                  .append(fb.target._threeColumns($('<div></div>'), $('<div>值</div>'), $('<div>显示名</div>')).css('paddingBottom', '1px'))      
		                  .append($choiceItem);		
		
		fb.target._log('fbEFInputPulldown._getFieldSettingsGeneralSection executed.');
		var $basicAttr = fb.target._fieldset({ text: '基本属性'})
		                  .append(fb.target._oneColumn($ename))
		                  .append(fb.target._twoColumns($showtype,$length));		
		return [$basicAttr,$selectSet];
	}
});

$.widget('fb.fbEFInputPulldown', FbEFInputPulldown);