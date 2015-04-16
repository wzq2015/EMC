/*
 * 表单设计器.
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * @author: Kenny Tan
 * Date: 2012-7-27
 */

var FormBuilder = {
  options: { 
		fields: 'EFPlainText,EFInputText,EFInputTextarea,EFInputRadio,EFInputCheckbox,EFInputPulldown,EFInputDate,EFRichText,EFDataDict,EFDataGrid',
		tabSelected: 0,
		readOnly: false,
		tabDisabled: [],
		formCounter: 1,		
		settings: {
			formType:'',
			name: '表单',
			classes: ['centerAlign'],//['rightAlign'],
			heading: 'h2',
			styles : {
				fontFamily: 'default', 
				fontSize: '12',
				fontStyles: [1, 0, 0], // bold, italic, underline
				color : 'cfcfcf', 
				backgroundColor : 'default'	
			},
			border:'1',
		    cellpadding:'',
		    cellspacing:''
		},
		_id: '#container',
		_builderPanel: '#builderPanel',
		_builderForm: '#builderForm',
		_emptyBuilderPanel: '#emptyBuilderPanel',
		_paletteTabs: '#paletteTabs',
		_standardFieldsPanel: '#standardFields',
		_fancyFieldsPanel: '#fancyFields',
		_fieldSettingsPanel: '#fieldSettings',
        _fieldSettingsGeneralSection: '#fieldSettings div.general:first',
        _formSettingsGeneralSection: '#formSettings div.general:first',
        _dragBoxCss: {
		  opacity: 0.6,
		  zIndex: 8888, 
		  border: "1px dashed #cccccc"
	    },
		_formControls: '#builderPanel table tr td.controlContainer',
		_draggableClass: 'draggable',
		_dropPlaceHolderClass: 'dropPlaceHolder'
  },
  _create: function() {
    	// called on construction
  	//如果表单类型是DataGrid,对控件进行过滤
  	if($('#container').attr('formType')=="dataGrid"){
		this.options.fields= "EFPlainText,EFInputText,EFInputPulldown,EFInputDate";
		this.options.settings.formType="dataGrid";
		}
    this._log('FormBuilder._create called. this.options.widgets = ' + this.options.fields);
    this._initBrowserDefaultSettings();
    this._initBuilderPalette(); //初始化左侧面板
    this._initBuilderPanel();
    },
  _initBrowserDefaultSettings: function() {
	  var $html = $('html');
	  var options = this.options;
	  options._fontFamily = $html.css('fontFamily');
	  options._fontSize = $html.css('fontSize');
	  options._color = $html.css('color');
	  options._backgroundColor = $html.css('backgroundColor');
	  var pxIndex = options._fontSize.lastIndexOf('px');
	  if (pxIndex > -1) {
		  options._fontSize = options._fontSize.substring(0, pxIndex);
	  }
  },
  /**
   * 初始化左侧面板
   */
  _initBuilderPalette: function() {
		$(window).scroll(
		function() {
			if ($(window).scrollTop() > $(".floatingPanelIdentifier").position({scroll : false}).top) {
				$(".floatingPanel").css("position", "fixed");
				$(".floatingPanel").css("top", "0");
			}
			
			if ($(window).scrollTop() <= $(".floatingPanelIdentifier").position({scroll : false}).top) {
				$(".floatingPanel").css("position", "relative");
				$(".floatingPanel").css("top",
						$(".floatingPanelIdentifier").position);
			}
		});
		
		$(this.options._paletteTabs).tabs({
			selected: this.options.tabSelected, 
			disabled: this.options.tabDisabled,
			select: this._isFieldSettingsTabCanOpen 
		});
		
		var widgets = this.options.fields;
		widgets = widgets.split(',');
		var length = widgets.length;
		var widgetOptions;
		var widget;
		var i;
	  for (i = 0; i < length; i++) {
		  //创建字段控件的按钮
		  widgetOptions = $['fb']['fb' + $.trim(widgets[i])].prototype.options;
		  widget = $('<a id="' + widgetOptions._type +  '" href="#" class="fbWidget">' + widgetOptions.name + '</a>');
		  widget.button()['fb' + widgetOptions._type]().appendTo(widgetOptions.belongsTo);
      this._initDraggable(widget, widgetOptions._type);
	    }			  
   },
   /**
    * 拖拽左侧面板控件功能
    */
  _initDraggable: function(widget, type) {
	  widget.draggable({
		  cursor: 'move',
		  distance: 10,
		  helper: function (event, ui) { //创建一个控件用于拖拽时的显示
			  $.fb.formbuilder.prototype._log('colControl width = ' + $('.colControl').width());
			  var helper = $(this).data('fb' + type)
			    ._createFbWidget(event).css($.fb.formbuilder.prototype.options._dragBoxCss)
			    //.css({width: $('.formHeading').css('width')})
			    .width($('.colControl').width()).css('background-color', '#DDEEFF')
			    .addClass($.fb.formbuilder.prototype.options._draggableClass);//打上draggable的标识
			  $.fb.formbuilder.prototype._log('helper.html() = ' + helper.html());
			  return helper;
		} ,
    drag: function(event, ui) {
			$.fb.formbuilder.prototype._log('ui.helper: w x h = ' + ui.helper.width() + " x " + ui.helper.height());
			var $prevCtrlHolder = $.fb.formbuilder.prototype._getPreviousCtrlHolder(ui);
			var fbOptions = $.fb.formbuilder.prototype.options;
			// $.fb.formbuilder.prototype._log('rel: ' + $prevCtrlHolder.attr('rel') + " == " + ui.helper.attr('rel'));
			if (false &&$prevCtrlHolder && $prevCtrlHolder.attr('rel') != ui.helper.attr('rel')) { //by fan
				ui.helper.attr('rel', $prevCtrlHolder.attr('rel'));
				$('.' + fbOptions._dropPlaceHolderClass).remove();
			  $('<div></div>').addClass(fbOptions._dropPlaceHolderClass)
			   .css('height', '30px').insertAfter($prevCtrlHolder);		//放置一个占位的DIV  
			} else {
				//$('.ctrlHolder:visible:not(.draggable):first')
				var $ctrlHolder = $('.' + $.fb.fbWidget.prototype.options._styleClass + //ctrlHolder
						   ':visible:not(.' + fbOptions._draggableClass + '):first');	//draggable	
				
				if ($ctrlHolder.length && ui.offset.top < $ctrlHolder.offset().top) {
					$('.' + fbOptions._dropPlaceHolderClass).remove();
				}
			} 
         },
    stop: function(event, ui) {
	   $('.' + $.fb.formbuilder.prototype.options._dropPlaceHolderClass).remove(); //删除占位符
        }
	  });	   
   },
   _isFieldSettingsTabCanOpen: function(event, ui) { 
		if (ui.index == 1) { // Field Settings tab selected
			var options = $.fb.formbuilder.prototype.options;
			var canOpen = true;
			if ($(options._emptyBuilderPanel).is(':visible')) {
				$(options._standardFieldsPanel).qtip({
					   content: '请先选中一个控件',
						 position: { my: 'bottom left', at: 'top center' },
							show: {
								event: false,
								ready: true,
								effect: function() { $(this).show('drop', { direction:'up'}); }
							},
							hide: {
								target: $(options._standardFieldsPanel + ', ' + options._fancyFieldsPanel)
							},
							style: {
								widget: true,
								classes: 'ui-tooltip-shadow ui-tooltip-rounded', 
								tip: true
							}								   
			    });
				canOpen = false;
			} else if ($(options._builderForm + ' .' + $.fb.fbWidget.prototype.options._selectedClass).length === 0) {
				$('.' + $.fb.fbWidget.prototype.options._styleClass + ':first').qtip({
					   content: "请在查看字段属性之前先选中一个字段!",
						 position: { my: 'bottom center', at: 'top center' },
							show: {
								event: false,
								ready: true,
								effect: function() { $(this).show('drop', { direction:'up'}); }
							},
							hide: 'click',
							style: {
								widget: true,
								classes: 'ui-tooltip-shadow ui-tooltip-rounded', 
								tip: true
							}								   
			    });	
				canOpen = false;
			}
			if (!canOpen) {
				// activate Add Field tab
				$(this).tabs('select', 0);
			}
			return canOpen;
		} 
	 },
	 /**
	  * 初始化设计器面板
	  */
  _initBuilderPanel: function() {
	  var options = this.options;
	  if (!this.options.readOnly) {
	    this._initSortableWidgets();
      this._initDroppable();
	  } else {
			$('input:not(div.buttons input, #id)').attr("disabled", true);
			$('select:not(#language)').attr("disabled", true);
			$('textarea').attr("disabled", true);	    	
	    }
   },
   /**
    * 设置设计面板可以drop
    */
  _initDroppable: function() {
	  var fbOptions = this.options;
	  var $formControls = $(fbOptions._formControls);
	  $formControls.droppable({
		  //activeClass: 'target-highlight',
		  hoverClass: 'target-hover',
		  accept: function(ui) {
			  return $(this).has('.ctrlHolder').size()==0;
		  },
	  	drop: function(event, ui) {
	  		$.fb.formbuilder.prototype._log('drop executing. ui.helper.attr(rel) = ' + ui.helper.attr('rel') + ', ui.offset.top = ' + ui.offset.top);
	  		$.fb.formbuilder.prototype._log('ui.draggable.attr(id) = ' + ui.draggable.attr('id'));
	  		// to make sure the drop event is trigger by draggable instead of sortable
	  		if (ui.helper.attr('class').lastIndexOf(fbOptions._draggableClass) > -1) {
	  			 $('.' + fbOptions._dropPlaceHolderClass).remove();
	  			 var $widget = ui.draggable.data('fb' + ui.draggable.attr('id'));
		    	 var $prevCtrlHolder = $.fb.formbuilder.prototype._getPreviousCtrlHolder(ui);
		    	 var $ctrlHolder = $widget._createFbWidget(event); 
		    	 //var $elements;
		    	 if (false && $prevCtrlHolder) {// by fan
	  			   $widget._log('$prevCtrlHolder.text() = ' + $prevCtrlHolder.text());
	  			   $ctrlHolder.insertAfter($prevCtrlHolder);
	  			   //$elements = $prevCtrlHolder.next().nextAll(':visible'); // $ctrlHolder.next() not works. :visible to prevent select the invisible ctrlHolder and emptyBuilderPanel
	  		   } else {
	  			   $(fbOptions._emptyBuilderPanel + ':visible').hide();
	  			   //'.ctrlHolder:visible:not(.draggable)'
	  			   //$elements = $('.' + $.fb.fbWidget.prototype.options._styleClass + 
	  			   //	   ':visible:not(.' + fbOptions._draggableClass + ')', $formControls);
	  				 //$formControls.first().prepend($ctrlHolder).sortable('refresh');
	  				 $(this).prepend($ctrlHolder).sortable('refresh');
	  				 $(this).removeClass('controlContainerSelected');
	  		          }
		    	 //$ctrlHolder.toggle('slide', {direction: 'up'}, 'slow');
		    	 $ctrlHolder.show();
		    	 
		    	 /** DEL*ME
		    	 if ($elements.length) {
						// set next widget's sequence as my sequence
		    		 $widget._log('$elements.first().text() = ' + $elements.first().text());
						$.fb.formbuilder.prototype._getSequence($ctrlHolder).val(
						    $.fb.formbuilder.prototype._getSequence($elements.first()).val()).change();
						$elements.each(function(index) {
						  $.fb.formbuilder.prototype._increaseSequence($(this));
						 });
			    	 } 
	  		    */
	  		    }
	  		}  		
	    });	   
   },
   /**
    * 找到拖拽时前一个控件
    */
  _getPreviousCtrlHolder: function(ui) {
	//$('.ctrlHolder:visible:not(.draggable)')
		var $ctrlHolders = $('.' + $.fb.fbWidget.prototype.options._styleClass + 
				   ':visible:not(.' + $.fb.formbuilder.prototype.options._draggableClass + ')');
		var $this, $prevCtrlHolder;
		  
		$ctrlHolders.each(function(i) {
			$this = $(this);
			$.fb.formbuilder.prototype._log(i + ') top = ' + $this.offset().top);
			if (ui.offset.top > $this.offset().top) {
				$prevCtrlHolder = $this;
			} else {
				return false;
			}
		});
		return $prevCtrlHolder;
  },  
  
  updateFormSettings : function(settings) {
  	if(settings!=null)  	  
       this.options.settings = settings; 
  	   this._initFormSettings();
  },
   updateTableBorderSetting:function(value){ 
   	if(value==null)return;
	if(value == 0 || value.trim() == '') {
		$(".controlContainer")
	 	.css('border', '1px dashed')
	 	.css('border-color', '#' + $('#container').data('formbuilder').options.settings.styles.color);
	 	
	 	$(".rowControl")
	 	.css('border', '0px dashed')
	 	.css('border-right-color', '#' + $('#container').data('formbuilder').options.settings.styles.color);
	 	
	 	$(".colControl")
	 	.css('border', '0px dashed')
	 	.css('border-bottom-color', '#' + $('#container').data('formbuilder').options.settings.styles.color);
	}
	else
	 $(".controlContainer")
	.css('border', value + 'px' + ' solid')
	.css('border-color', '#' + $('#container').data('formbuilder').options.settings.styles.color);
   },
   updateTableCellspacingSetting:function(value){
   	if(value==null)return;
   if(value == 0 || value.trim() == '')
	 $("#tableLayout")
	 .css('border-collapse', 'collapse')
	 .css('border-spacing', value + 'px');
	else
	 $("#tableLayout")
	 .css('border-collapse', 'separate')
	 .css('border-spacing', value + 'px');
   },
  _initFormSettings: function() {
  	  
	  var $fbWidget = $.fb.fbWidget.prototype;
	  var options = this.options;
	  var $builderPanel = $(options._builderPanel); //设计器最外层的DIV
	  var $builderForm = $(options._builderForm);	//设计器最外层的FORM
	// var $formSettingsLanguageSection = $(options._formSettingsLanguageSection);
	  var $formSettingsGeneralSection = $(options._formSettingsGeneralSection);
	  //var defaultLanguage = $.inArray(options.language, options._languages) > -1 ? options.language : 'zh_CN';
	//  var $language = $('#language', $formSettingsLanguageSection).val(defaultLanguage).change(this._languageChange);//设置表单配置面板的语言
	  var settings;
	  var $this = this;
	  var $formHeading = $('.formHeading', $builderPanel);
	  var $settings = $('#settings', $builderForm);
		// first creation
		if ($settings.val() == '') {
			settings = options.settings;
		  $('#name',$builderForm).val($fbWidget._propertyName(options.settings.name));//生成并保存表单名称
		}  
		$formHeading.addClass(settings.classes[0]).append('<' + settings.heading + ' class="heading">' + settings.name + '</' + settings.heading + '>');
		
		$fbWidget._log('settings.name = ' + settings.name);
	  //下面应该是初始化左侧的表单配置面板中的配置控件
		var $name = $fbWidget._label({ label: '标题', name: 'form.name' })
		       .append('<input type="text" id="form.name" value="' + settings.name + '" />');
		$('input', $name).keyup(function(event) {
				var value = $(this).val();
				$fbWidget._log('options.disabledNameChange = ' + options.disabledNameChange);
				if (!options.disabledNameChange) {
					var name = $fbWidget._propertyName(value);
		      $('#name',$builderForm).val(name).change();
				}
				$fbWidget._log('$(this).val() = ' + value);
				settings.name = value;
				$(settings.heading, $formHeading).text(value);
		 });			  
		
		 var $heading = $fbWidget._label({ 
			  label: '标题样式', 
			  name: 'form.heading' 
	    }).append('<select> \
				<option value="h1">标题 1</option> \
				<option value="h2">标题 2</option> \
				<option value="h3">标题 3</option> \
				<option value="h4">标题 4</option> \
				<option value="h5">标题 5</option> \
				<option value="h6">标题 6</option> \
			</select>');
		
		 $('select', $heading)
		    .val(settings.heading)
				.attr('id', 'form.heading') // unable to set value if specify in select tag
	      .change(function(event) {
	    	  var heading = $(this).val();
	    	  var text = $(settings.heading, $formHeading).text();
	    	  var $heading = $('<' + heading + ' class="heading">' + text + '</' + heading + '>');
	    	  if (settings.styles.fontStyles[0] === 0) {
	    		  $heading.css('fontWeight', 'normal');  
	    	  }
	    	  if (settings.styles.fontStyles[1] == 1) {
	    		  $heading.css('fontStyle', 'italic');
	    	  }	    	  
	    	  if (settings.styles.fontStyles[2] == 1) {
	    		  $heading.css('textDecoration', 'underline');
	    	  }	    		    	  
	    	  $(settings.heading, $formHeading).replaceWith($heading);
	    	  settings.heading = heading;
	            });
				
		var $horizontalAlignment = $fbWidget._horizontalAlignment({ name: 'form.horizontalAlignment', value: settings.classes[0] });
		$('select', $horizontalAlignment).change(function(event) {
		    var value = $(this).val();
			$formHeading.removeClass(settings.classes[0]).addClass(value);
			settings.classes[0] = value;
		});
		
		settings.styles.fontFamily = settings.styles.fontFamily == 'default' ? options._fontFamily : settings.styles.fontFamily;
		settings.styles.fontSize = settings.styles.fontSize == 'default' ? options._fontSize : settings.styles.fontSize;
		var $fontPanel = $fbWidget._fontPanel({ 
			      fontFamily: settings.styles.fontFamily, 
			      fontSize: settings.styles.fontSize, 
            fontStyles: settings.styles.fontStyles, 
            idPrefix: 'form.', nofieldset: true });

		$("input[id$='form.bold']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				$(settings.heading, $formHeading).css('fontWeight', 'bold');
				settings.styles.fontStyles[0] = 1;
			} else {
				$(settings.heading, $formHeading).css('fontWeight', 'normal');
				settings.styles.fontStyles[0] = 0;
			}
		});
		if (settings.styles.fontStyles[0] == 1) {
				$(settings.heading, $formHeading).css('fontWeight', 'bold');
			} else {
				$(settings.heading, $formHeading).css('fontWeight', 'normal');
			}
		
		$("input[id$='form.italic']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				$(settings.heading, $formHeading).css('fontStyle', 'italic');
				settings.styles.fontStyles[1] = 1;
			} else {
				$(settings.heading, $formHeading).css('fontStyle', 'normal');
				settings.styles.fontStyles[1] = 0;
			}
		});	
		if (settings.styles.fontStyles[1] == 1) {
				$(settings.heading, $formHeading).css('fontStyle', 'italic');
			} else {
				$(settings.heading, $formHeading).css('fontStyle', 'normal');
			}
		
		$("input[id$='form.underline']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				$(settings.heading, $formHeading).css('textDecoration', 'underline');
				settings.styles.fontStyles[2] = 1;
			} else {
				$(settings.heading, $formHeading).css('textDecoration', 'none');
				settings.styles.fontStyles[2] = 0;
			}
		});
		
		if (settings.styles.fontStyles[2] == 1) {
				$(settings.heading, $formHeading).css('textDecoration', 'underline');
			} else {
				$(settings.heading, $formHeading).css('textDecoration', 'none');
			}
		
		$("input[id$='form.fontFamily']", $fontPanel).change(function(event) {
			var value = $(this).val();
			$formHeading.css('fontFamily', value);
			settings.styles.fontFamily = value;
		});		
		$formHeading.css('fontFamily', settings.styles.fontFamily);

		$("select[id$='form.fontSize']", $fontPanel).change(function(event) {
			var value = $(this).val();
			$formHeading.css('fontSize', value + 'px');
			settings.styles.fontSize = value;
		});	
	   $formHeading.css('fontSize', settings.styles.fontSize + 'px');
		                  
		var $basicAttr = $fbWidget._fieldset({ text: '基本属性'})
		                  .append($fbWidget._oneColumn($name))
		                  .append($fbWidget._twoColumns($heading, $horizontalAlignment))
		                  .append($fbWidget._oneColumn($fontPanel));
		                  
		                  
		
		//设置表格边框		
		var $border = $fbWidget._label({ label: '边框宽度', name: 'form.border' })
		       .append('<input type="text" id="form.border" />'); 
		$('input', $border)
		.val(options.settings.border)
		.keyup(function(event) {
				var value = $(this).val();
				$this.updateTableBorderSetting(value);				
				options.settings.border = value;
		 });
		 //初始化表格边框宽度
			$this.updateTableBorderSetting(options.settings.border);	
		 //设置内容与单元格间距
		 var $cellpadding = $fbWidget._label({ label: '内容与单元格间距', name: 'form.cellpadding' })
		       .append('<input type="text" id="form.cellpadding" />');
		 $('input', $cellpadding)
		 .val(options.settings.cellpadding)
		 .keyup(function(event) {
				var value = $(this).val();
				$(".controlContainer").css('padding', value + 'px');				
				options.settings.cellpadding = value;
		 });
		 $(".controlContainer").css('padding', options.settings.cellpadding + 'px');
		 //设置单元格间距
		 var $cellspacing = $fbWidget._label({ label: '单元格间距', name: 'form.cellspacing' })
		       .append('<input type="text" id="form.cellspacing" />');
		 $('input', $cellspacing)
		 .val(options.settings.cellspacing)
		 .keyup(function(event) {
				var value = $(this).val();				
				$this.updateTableCellspacingSetting(value);				
				options.settings.cellspacing = value;
		 });
		 $this.updateTableCellspacingSetting(options.settings.cellspacing);
		 
		 
			
		
		if (options.settings.styles.color == 'default') {
			options.settings.styles.color = options._color;
		}		
		if (options.settings.styles.backgroundColor == 'default') {
			options.settings.styles.backgroundColor = options._backgroundColor;
		}
		var $colorPanel = $fbWidget._formColorPanel({ color: options.settings.styles.color, 
			       backgroundColor: options.settings.styles.backgroundColor, idPrefix: 'form.' });
		
	    //设置表格边框颜色
		$("input[id$='form.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			$(".controlContainer").css('border-color', '#' + value);
			options.settings.styles.color = value;
		});		
      $(".controlContainer").css('border-color', '#' + options.settings.styles.color);
		//设置表格背景颜色
		$("input[id$='form.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			$this._log('background color change: value ' + value);
			//$builderPanel.css('backgroundColor','#' + value);
			//$(".controlContainer").css('backgroundColor', '#' + value);
			$("#tableLayoutBody").css('backgroundColor', '#' + value);
			options.settings.styles.backgroundColor = value;
		});	
		//$(".controlContainer").css('backgroundColor', '#' + options.settings.styles.backgroundColor);
		$("#tableLayoutBody").css('backgroundColor', '#' + options.settings.styles.backgroundColor);
		//设置表格属性
		 var $tableProp = $fbWidget._fieldset({ text: '表格属性' });
		 $tableProp.append($fbWidget._oneColumn($border))
		       .append($fbWidget._twoColumns($cellpadding, $cellspacing));
		       //去掉背景色，防止选中色被覆盖
		    //   .append($fbWidget._oneColumn($colorPanel));
		
		$formSettingsGeneralSection.append($basicAttr).append($tableProp);
	 
   },
   /** DEL*ME
 _initWidgetsEventBinder: function() { // for widgets loaded from server
	  var $ctrlHolders = $('.' + $.fb.fbWidget.prototype.options._styleClass);
	  var size = $ctrlHolders.size();
		if (size > 0) { 
			var $this, widget;
			var fieldsUpdateStatus = ['name', 'settings', 'sequence'];
			
			$(this.options._emptyBuilderPanel + ':visible').hide();
			$ctrlHolders.each(function(i) {
			    $this = $(this);
			    widget = $this.find("input[id$='fields[" + i + "].type']").val();
			    $this.click($['fb']['fb' + widget].prototype._createFieldSettings);				
					for (var j = 0; j < fieldsUpdateStatus.length; j++) {
						$this.find("input[id$='fields[" + i + "]." + fieldsUpdateStatus[j] + "']")
						                  .change($.fb.fbWidget.prototype._updateStatus);
					}	  
			});
			if (!this.options.readOnly) {
			  $ctrlHolders.find(".closeButton").click($.fb.fbWidget.prototype._deleteWidget)
			    .mouseover(function () { $('span', this).removeClass('ui-icon-close').addClass('ui-icon-circle-close'); }) 
			    .mouseout(function () { $('span', this).removeClass('ui-icon-circle-close').addClass('ui-icon-close'); });
			}
		}
  },
  */
  /**
   * 使得控件可以排序
   */
  _initSortableWidgets: function() {
	  var $formControls = $(this.options._formControls);
	  $formControls.sortable({ 
			//axis: 'y', //只允许纵向排序
			cursor: 'move',
			distance: 10,
			connectWith: this.options._formControls,
			placeholder: 'target-placeholder',
			over: function(event, ui){
				if ($(this).find('.ctrlHolder:not(.ui-sortable-placeholder)').size() == 0) {
					$(this).addClass('target-hover');
				}
			},
			out: function(event, ui){
				$(this).removeClass('target-hover');
			},
			helper: function (event, ui) {
				return $(ui).clone().css($.fb.formbuilder.prototype.options._dragBoxCss).css('background-color', '#DDEEFF');
			},
			start: function (event, ui) {
				var $previousElement = $(ui.item).prev();
				if ($previousElement.attr('rel')) {
					ui.item.prevIndex = $previousElement.attr('rel');
					ui.item.originalOffsetTop = $previousElement.offset().top;
				}
			},
			update: function(event, ui) {
				var $ctrlHolder = $(this).find('.ctrlHolder:not(.ui-sortable-placeholder)');
				if ($ctrlHolder.size() > 1 || !$(ui.item).is($ctrlHolder)) {
					$(ui.sender).sortable('cancel');
				} else {
					$(this).removeClass('controlContainerSelected')
					//$.fb.formbuilder.prototype._updateSequence(event, ui);
				}
			}
			});
		
		// Making text elements, or elements that contain text, not text-selectable.
	  $formControls.disableSelection();	  
  },
  /**
   * drop, sort后更新控件的序号
   */
   /** DEL*ME
  _updateSequence: function (event, ui) {
		var $uiItem = $(ui.item);
		var $elements;
		var moveDown = ui.offset.top > ui.item.originalOffsetTop;
		$.fb.formbuilder.prototype._log('moveDown = ' + moveDown + ', ui.offset.top = ' + ui.offset.top + ", ui.item.originalOffsetTop = " + ui.item.originalOffsetTop);
		if (ui.item.prevIndex) {
			var prevElementSelector = '[rel="' + ui.item.prevIndex + '"]';
			if (moveDown) {
		    $elements = $uiItem.prevUntil(prevElementSelector);
		    $.fb.formbuilder.prototype._moveDown($uiItem, $elements);			    
			} else {
				// set next widget's sequence as my sequence
				$.fb.formbuilder.prototype._getSequence($uiItem).val(
				    $.fb.formbuilder.prototype._getSequence($uiItem.next()).val()).change();						
				$elements = $uiItem.nextUntil(prevElementSelector);  
				$elements.each(function(index) {
				  $.fb.formbuilder.prototype._increaseSequence($(this));
				 });		
				// process the last one
				$.fb.formbuilder.prototype._increaseSequence($(prevElementSelector));
			}
		} else {
			$elements = $uiItem.prevAll();
			$.fb.formbuilder.prototype._moveDown($uiItem, $elements);			
		}
	},
	*/
	_init: function() {
	  // called on construction and re-initialization
		this._log('FormBuilder._init called.');		
		//this.method1('calling from FormBuilder._init');
	},        
	destroy: function() {
    // called on removal
		this._log('FormBuilder.destroy called.');

    // call the base destroy function.
		$.Widget.prototype.destroy.call(this);		
    },
  // _logging to the firebug's console, put in 1 line so it can be removed easily for production
  _log: function($message) { if (window.console && window.console.log) window.console.log($message); }
  /** DEL*ME
  _moveDown: function($widget, $elements) {
		// set previous widget's sequence as my sequence
		$.fb.formbuilder.prototype._getSequence($widget).val(
		    $.fb.formbuilder.prototype._getSequence($widget.prev()).val()).change();
	  $elements.each(function(index) {
		  $.fb.formbuilder.prototype._decreaseSequence($(this));
	    });	
  }, 
  _getSequence: function($widget) {
    	return $widget.find("input[id$='fields[" + $widget.attr('rel') + "].sequence']");
    },
  _increaseSequence: function($widget) {
	  if ($widget.is(":visible")) {
		  var $sequence = $.fb.formbuilder.prototype._getSequence($widget);
		  $sequence.val($sequence.val() * 1 + 1);
		  $sequence.change();
	    }
   },
  _decreaseSequence: function($widget) {
	  if ($widget.is(":visible")) {
	    var $sequence = $.fb.formbuilder.prototype._getSequence($widget);
	    $sequence.val($sequence.val() - 1);
	    $sequence.change();
	  }
   },  
	method1: function(params) {
    	// plugin specific method
		this._log('FormBuilder.method1 called. params = ' + params);
    }
    */
};

$.widget('fb.formbuilder', FormBuilder);