/*
 * 表单设计器控件 - 复选框.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FbEFInputCheckbox = $.extend({}, $.fb.fbWidget.prototype, {
	options: { 
		name: '复选框',
		belongsTo: $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type: 'EFInputCheckbox',
		_html : '<div class="EFInputCheckbox">\
                 <span>\
                 <input id="cb0" name="Field1" class="inputField"  style="float:left;" type="checkbox"  value="1" checked="">\
                 <label  for="0">复选框1</label>\
                 </span>\
                 </div>',
		_counterField: 'ename',
		settings: {
			ename: 'fldcb',
			length:'',
			multivalue:[{id:"cb0",key:'1',value:'复选框1',checked:''}],
			showtype:'0',
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
		fb.target._log('fbEFInputCheckbox._getWidget executing...');		
		
		var $jqueryObject = $(fb.target.options._html);	
		
		//2012-2-4 tankeyuan 数组数据转换解决IE8上问题
//		$tempmv=fb.settings.multivalue;
//		if($tempmv==undefined||$tempmv==null){
//		  fb.settings.multivalue=new Array();
//		}
//		if($tempmv!=undefined&&$tempmv.length==undefined){
//		  var $mv=new Array();
//		  var i=0;
//		  while($tempmv[i]!=undefined){		  
//		    $modifObj=new Object();
//			$modifObj["id"]= $tempmv[i]["id"];
//			$modifObj["key"]=$tempmv[i]["key"];
//			$modifObj["value"]=$tempmv[i]["value"];			
//			$modifObj["checked"]=$tempmv[i]["checked"];
//			$mv.push($modifObj);
//			i++;
//		  }
//		  fb.settings.multivalue=$mv;
//		}
		
		//show multivalue;
		$multivalue=fb.settings.multivalue;
		//show item
		 var $curChoice=$('#cb0',$jqueryObject);
		for(var i=0;i<$($multivalue).length;i++){
		   var $curChoiceValue=$multivalue[i];
		   var $choiceItem;
		   if($curChoiceValue["checked"])
			 $choiceItem = $('<span>\
                                           <input id="' +$curChoiceValue["id"]+
                                           		'" name="Field1" class="inputField"  style="float:left;" value="' +$curChoiceValue["key"]+
                                           		'" tabindex="1"    checked="checked" type="checkbox">\
                                           <label  class="choice" for="' +$curChoiceValue["id"]+
                                           '">' +$curChoiceValue["value"]+
                                           '</label>\
                                           </span>'); 
           else
            $choiceItem = $('<span>\
                                           <input id="' +$curChoiceValue["id"]+
                                           		'" name="Field1" class="inputField"  style="float:left;" value="' +$curChoiceValue["key"]+
                                           		'" tabindex="1"  type="checkbox">\
                                           <label  class="choice" for="' +$curChoiceValue["id"]+
                                           '">' +$curChoiceValue["value"]+
                                           '</label>\
                                           </span>');
             //点击右边按钮时左边配置面板按钮跟随切换                              
             $('#'+$curChoiceValue["id"],$choiceItem).click(function(event){
             	var itemId=$(this).attr('id');
             	//alert(itemId);
             	var fbOptions = $.fb.formbuilder.prototype.options;
             	var $fieldSettingsPanel = $(fbOptions._fieldSettingsPanel);
                var $li=$('#'+itemId,$fieldSettingsPanel);
                 if($li.length==0)return;
                var $itemChoice=$('input[name="allChoices"]',$li);
                if($itemChoice.length>0)
                if($(this).attr('checked'))
                $itemChoice.get(0).checked=true;
                else
                $itemChoice.get(0).checked=false;
		         fb.target._updateChoiceMulteValue($li,fb,itemId);
             });
            $($curChoice).parent().parent().append($choiceItem); 
		}
		if($($multivalue).length>0)
		$($curChoice).parent().remove();
		
		//设置初始化样式
		fb.target._updateLabelStyle($jqueryObject.find('label'),fb);
		
		fb.target._log('fbEFInputCheckbox._getWidget executed.');
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
			//break;
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
			var $itemChoice=fb.item.find('#'+itemId);
			if($itemChoice.length>0)
		    if($(this).attr('checked')){		      
              $itemChoice.get(0).checked=true;		 
		    }
		    else
		      $itemChoice.get(0).checked=false;
		    fb.target._updateChoiceMulteValue($(this).parent(),fb,itemId);
		});
		//点击增加按钮触发，左边新增一选择项目输入项，右边单选控件中增加对应的选择项
        $("img[src$='add.png']", choiceCtrlItem).click(function(event){
        	              var itemId=$(this).parent().attr('id');
        	              var $newChoiceId=Math.uuid();
                          var $itemCounts=$(this).parent().siblings().length;
	                      var $choiceItem=$('<li id="'+$newChoiceId+'">\
                           <input name="allChoices" class ="floatClearLeft"   type = "checkbox">\
                           <input name="key" class ="text" size="8" autocomplete = "off" value ="'+($itemCounts+2)+'"  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value ="'+"复选框"+($itemCounts+2)+'"  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加复选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除复选项" >\
                           </li>');
                           fb.target._bindChoiceItemEvent($choiceItem,fb);
                          $(this).parent().after($choiceItem);
                           fb.target._updateChoiceMulteValue($choiceItem,fb,$newChoiceId);
                           var $newChoice = $('<span>\
                                           <input id="' +$newChoiceId+
                                           		'" name="Field1" class="inputField"  style="float:left;" value="'+($itemCounts+2)+'" tabindex="1"     type="checkbox">\
                                           <label  class="choice" for="' +$newChoiceId+
                                           '">'+"复选框"+($itemCounts+2)+'</label>\
                                           </span>');
                             fb.target._updateLabelStyle($newChoice,fb);
                            //点击右边按钮时左边配置面板按钮跟随切换     
            $('#'+$newChoiceId,$newChoice).click(function(event){
             	var itemId=$(this).attr('id');
             	var fbOptions = $.fb.formbuilder.prototype.options;
             	var $fieldSettingsPanel = $(fbOptions._fieldSettingsPanel);
                var $li=$('#'+itemId,$fieldSettingsPanel);
               // if($li.length==0)return;
                var $itemChoice=$('input[name="allChoices"]',$li);
                if($itemChoice.length>0)
                if($(this).attr('checked'))
                $itemChoice.get(0).checked=true;
                else
                $itemChoice.get(0).checked=false;
		         fb.target._updateChoiceMulteValue($li,fb,itemId);
             }); 
              var $curChoice=fb.item.find('div span label[for="'+itemId+'"]');
              $($curChoice).parent().after($newChoice);  
              });
           //点击删除按钮触发左右边删除对应的选择项
          $("img[src$='delete.png']", choiceCtrlItem).click(function(event){
          	               var itemId=$(this).parent().attr('id');
          	               if(fb.item.find('div span label').length==1) return;
          	               var $curChoice=fb.item.find('div span label[for="'+itemId+'"]');
                           $(this).parent().remove();
                           $($curChoice).parent().remove();
                           fb.target._removeChoiceMulteValue($(this).parent(),fb,itemId);
                           });
          //左边输入健值触发更改右边对应的选择项的值
          $("input[name='key']", choiceCtrlItem).keyup(function(event){
             	var itemId=$(this).parent().attr('id');
             	var $itemChoice=fb.item.find('div span label[for="'+itemId+'"]');
             	 if($itemChoice.length>0)
             	$itemChoice.get(0).value=$(this).val(); 
             	fb.target._updateChoiceMulteValue($(this).parent(),fb,itemId);
             });
          //左边输入值触发更改右边对应的选择项的显示值
         $("input[name='value']",choiceCtrlItem).keyup(function(event){ 
        	var itemId=$(this).parent().attr('id');
        	var $itemChoice=fb.item.find('div span label[for="'+itemId+'"]');		    
            $($itemChoice).text($(this).val());
             fb.target._updateLabelStyle($itemChoice,fb);
             fb.target._updateChoiceMulteValue($(this).parent(),fb,itemId);
         });
	
    },
	
	_getFieldSettingsGeneralSection : function(event, fb) {		
		fb.target._log('fbEFInputCheckbox._getFieldSettingsGeneralSection executing...');
		
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
                           <li id="cb0">\
                           <input name="allChoices" class="floatClearLeft" title= "初始复选项" type = "checkbox">\
                           <input name="key"  class ="text" size="8" autocomplete = "off" value =""  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value =""  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加复选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除复选项" >\
                           </li>\
                           </ul>\
                           </div>');
          //restore multivalue
           //show multivalue;
		$multivalue=fb.settings.multivalue;
		//show item
		 var $curChoice=$('#cb0',$choiceItem);
		for(var i=0;i<$($multivalue).length;i++){
		   var $curChoiceValue=$multivalue[i];
		   var $newChoice;
		   if($curChoiceValue["checked"]){
		   $newChoice=$('<li id="' +$curChoiceValue["id"]+
		   		'">\
                           <input name="allChoices" class="floatClearLeft" title= "初始复选项" checked="checked" type = "checkbox">\
                           <input name="key"  class ="text" size="8" autocomplete = "off" value ="' +$curChoiceValue["key"]+
                           '"  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value ="' +$curChoiceValue["value"]+
                           '"  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加复选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除复选项" >\
                           </li>');
		   }
		   else
		    $newChoice=$('<li id="' +$curChoiceValue["id"]+
		   		'">\
                           <input name="allChoices" class="floatClearLeft" title= "初始复选项"  type = "checkbox">\
                           <input name="key"  class ="text" size="8" autocomplete = "off" value ="' +$curChoiceValue["key"]+
                           '"  type ="text" > \
                           <input name="value" class ="text" size="14" autocomplete = "off" value ="' +$curChoiceValue["value"]+
                           '"  type ="text" > \
                           <img src ="FormBuilder/images/add.png"  class = "notranslate"  alt ="Add" title= "增加复选项">\
                           <img src ="FormBuilder/images/delete.png"  class ="notranslate"  alt ="Delete" title ="删除复选项" >\
                           </li>');
          fb.target._bindChoiceItemEvent($newChoice,fb);                
		  $($curChoice).parent().append($newChoice); 
		}
		$($curChoice).remove();  
 
  var $selectSet = fb.target._fieldset({ text: '选择项'})
		                  .append(fb.target._threeColumns($('<div></div>'), $('<div>值</div>'), $('<div>显示名</div>')).css('paddingBottom', '1px'))      
		                  .append($choiceItem); 
		
    var styles = fb.settings.styles;
    var fbStyles = fb.target._getFbLocalizedSettings().styles;
    var fontFamily = styles.fontFamily != 'default' ? styles.fontFamily : fbStyles.fontFamily ;
	var fontSize = styles.fontSize != 'default' ? styles.fontSize : fbStyles.fontSize;	  
	var $fontPanel = fb.target._fontPanel({ fontFamily: fontFamily, fontSize: fontSize, 
				                           fontStyles: styles.fontStyles, idPrefix: 'field.', nofieldset: true });
		
	$("input[id$='field.bold']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label').css('fontWeight', 'bold');
				styles.fontStyles[0] = 1;
			} else {
				fb.item.find('label').css('fontWeight', 'normal');			
				styles.fontStyles[0] = 0;
			}
		});
	$("input[id$='field.italic']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label').css('fontStyle', 'italic');				
				styles.fontStyles[1] = 1;
			} else {
				fb.item.find('label').css('fontStyle', 'normal');				
				styles.fontStyles[1] = 0;
			}
		});	
	$("input[id$='field.underline']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label').css('textDecoration', 'underline');					
				styles.fontStyles[2] = 1;
			} else {
				fb.item.find('label').css('textDecoration', 'none');					
				styles.fontStyles[2] = 0;
			}
		});
		
	$("input[id$='field.fontFamily']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label').css('fontFamily', value);	
			styles.fontFamily = value;
		});		
		
	$("select[id$='field.fontSize']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label').css('fontSize', value + 'px');					
			styles.fontSize = value;
		});	
		
		var $required = $('<div><input type="checkbox" id="field.required" />&nbsp;不能为空</div>');
		
		var $valuePanel = fb.target._fieldset({ text: '验证'})
		                  .append(fb.target._oneColumn($required));
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
		
		var $inputField = fb.item.find('.inputField');
		var styles = fb.settings.styles;			
		var $colorPanel = fb.target._labelDescriptionColorPanel(styles);
		
		$("input[id$='field.label.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('label').css('color','#' + value);
			styles.label.color = value;
		});		

		$("input[id$='field.label.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('label').css('backgroundColor','#' + value);
			styles.label.backgroundColor = value;
		});	
		
		var $basicAttr = fb.target._fieldset({ text: '基本属性'})
		                  .append(fb.target._oneColumn($ename))
		                  .append(fb.target._twoColumns($showtype,$length));
	     
		 var $fontset = fb.target._fieldset({ text: '字体'})
		                  .append($fontPanel);	
		fb.target._log('fbEFInputCheckbox._getFieldSettingsGeneralSection executed.');
		return [$basicAttr,$selectSet,$fontset,$colorPanel];
	}
});

$.widget('fb.fbEFInputCheckbox', FbEFInputCheckbox);