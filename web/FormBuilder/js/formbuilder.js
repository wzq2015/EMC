var appendCol = '<a class="ui-corner-all appendCol" href="#"><span class="ui-icon ui-icon-triangle-1-e">add column</span></a>';
var appendRow = '<a class="ui-corner-all appendRow" href="#"><span class="ui-icon ui-icon-triangle-1-s">add row</span></a>';
var deleteCol = '<a class="ui-corner-all deleteCol" href="#"><span class="ui-icon ui-icon-close">delete column</span></a>';
var deleteRow = '<a class="ui-corner-all deleteRow" href="#"><span class="ui-icon ui-icon-close">delete row</span></a>';

// var CONTEXT_PATH = '..';

function preview() {
//  $('#formData').val($.toJSON(formData()));
//  $('#previewForm').submit();
	var child = efform.openNewForm('EDMD91');
	child.focus();
}

function load(formName) {
	info = new EiInfo();
	info.set('formName', formName);
	EiCommunicator.send('EDMD90', 'loadForm', info, {
		onSuccess : function(outInfo) {
			var data = outInfo.get('formData');			
			if (data.length > 0)
				restore($.parseJSON(data));
			else
			$('#container').formbuilder('updateFormSettings',null);			
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);
}

function loadSubGrid(gridId) {
	gridContent = window.opener.getGridContent(gridId);
	if(gridContent != null)
		restore(gridContent);
	else
		$('#container').formbuilder('updateFormSettings',null);
}

function saveSubGrid(gridId) {
	if(!isCompleteDataGrid()||isEnamesConflict()||isConflictSubFormNameInMasterForm()||hasEnameNamedUUID()||isEnamesInDBReservedWords()){ 
	alert('保存失败');
	return;
	}
	window.opener.setGridContent(gridId, jsonFormData());	
	alert('保存成功');
}

function save(formId, formName) {
	if(isEnamesConflict()||isConflictSubFormNameInMasterForm()||hasEnameNamedUUID()||isEnamesInDBReservedWords()){ 
	alert('保存失败');
	return;
	}
	info = new EiInfo();
	info.set('formId', formId);
	info.set('formName', formName);
	info.set('formData', jsonFormData());
	EiCommunicator.send('EDMD90', 'saveForm', info, {
		onSuccess : function(outInfo) {
			alert('保存成功');
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);	
}

function getUrl() {
	var url = location.href;
	var lastIndex = url.lastIndexOf("/");
	return url.substring(0, lastIndex)
}
function view(formId){
	window.open(getUrl() + "/FormBuilder/json2html/formJson.jsp");
}

function restore(form) {	
	var $thtr = $('#tableLayoutHeader tr');
	$('.colControl', $thtr).remove();
	for ( var i = 0; i < form.colsize; i++)
		$thtr.append('<th class="colControl"/>');
	$('#tableLayoutBody').empty();
	for ( var i = 0; i < form.rows.length; i++) {
		var tr = $('<tr/>');
		tr.append('<td class="rowControl"/>');
		for ( var j = 0; j < form.rows[i].length; j++) {
			var td = $('<td class="controlContainer"/>');
			td.attr('colspan', form.rows[i][j].colspan);
			td.attr('rowspan', form.rows[i][j].rowspan);
			for ( var k = 0; k < form.rows[i][j].controls.length; k++) {
				var ctrl = form.rows[i][j].controls[k];
				try {
					$('#' + ctrl.type).data('fb' + ctrl.type)._createFbWidget({
						type : 'click',
						preventDefault : function() {
					},
					settings : $.extend(true, {}, ctrl.settings),
					targetcell : td
					});
				}
				catch (e) {
					window.console.log("fail to create " + ctrl.type + ": " + e.message);
				}
			}
			tr.append(td);
		}
		$('#tableLayoutBody').append(tr);
	}
	initTable();
	$('#container').formbuilder('updateFormSettings', $.extend(true, {}, form.settings));
}
function isConflictSubFormNameInMasterForm(){
var subFormNames = new Array();
var isNullSubFormName=false;
	$('#tableLayoutBody tr').each(function() {
		var $language = $('#language');
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			$('.ctrlHolder', $this).each(function() {
				if ($(this).data('fbType') == 'EFDataGrid'){
					var gridName=$(this).data('fbWidget').gridName;
					if(gridName==null||gridName=="") isNullSubFormName=true;
					else
					subFormNames.push(gridName);
				}
			});
		});
	});

	var duplicatesubFormNames = new Array();
	for (var i = 0; i < subFormNames.length; i++) {
		var curEname = subFormNames[i];
		var count = 0;
		for (var j = 0; j < subFormNames.length; j++) {
			if (subFormNames[j] == curEname)
				count++;
		}
		if (count > 1) {
			var isExist = false;
			for (var j = 0; j < duplicatesubFormNames.length; j++) {
				if (duplicatesubFormNames[j] == curEname)
					isExist = true;
			}
			if (!isExist)
				duplicatesubFormNames.push(curEname);
		}
	}
	if(isNullSubFormName){
	  alert('存在表单名为空的子表单!');
	  return true;
	}
	if (duplicatesubFormNames.length == 0)
		return false;
	if (duplicatesubFormNames.length != 0) {
		alert('存在重复的子表单:' + duplicatesubFormNames);
		return true;
	}
	
}

function isCompleteDataGrid(){
	var isCompleteDataGrid=true;
 $('#tableLayoutBody tr').each(function() {
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			var ctrl=$(this).find('.ctrlHolder');
			if(ctrl.length==0){
			isCompleteDataGrid=false;
			return;
			}			
		});
	});
	if(!isCompleteDataGrid)	alert('数据表格设计不完整:存在不包含控件的表格!');
	return isCompleteDataGrid;
}
function hasEnameNamedUUID() {
	var hasEnameNamedUUID=false;
	$('#tableLayoutBody tr').each(function() {
		var $language = $('#language');
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			$('.ctrlHolder', $this).each(function() {
				if ($(this).data('fbType') != 'EFRichText'
						&& $(this).data('fbType') != 'EFPlainText'
						&& $(this).data('fbType') != 'EFDataGrid')
					if($(this).data('fbWidget').ename.toLowerCase()=='uuid'){
					  hasEnameNamedUUID=true;
					  return;
					}
			});
		});
	});
	if(hasEnameNamedUUID){
		alert('存在字段名为UUID的字段!');		
	}
	return hasEnameNamedUUID;
}

function isEnamesConflict() {
	var enames = new Array();
	$('#tableLayoutBody tr').each(function() {
		var $language = $('#language');
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			$('.ctrlHolder', $this).each(function() {
				if ($(this).data('fbType') != 'EFRichText'
						&& $(this).data('fbType') != 'EFPlainText'
						&& $(this).data('fbType') != 'EFDataGrid')
					enames.push($(this).data('fbWidget').ename);
			});
		});
	});

	var duplicateEnames = new Array();
	for (var i = 0; i < enames.length; i++) {
		var curEname = enames[i];
		var count = 0;
		for (var j = 0; j < enames.length; j++) {
			if (enames[j] == curEname)
				count++;
		}
		if (count > 1) {
			var isExist = false;
			for (var j = 0; j < duplicateEnames.length; j++) {
				if (duplicateEnames[j] == curEname)
					isExist = true;
			}
			if (!isExist)
				duplicateEnames.push(curEname);
		}
	}
	if (duplicateEnames.length == 0)
		return false;
	if (duplicateEnames.length != 0) {
		alert('存在重复的字段名:' + duplicateEnames);
	}
	return true;
}


function isEnamesInDBReservedWords() {
	var enames = new Array();
	$('#tableLayoutBody tr').each(function() {
		var $language = $('#language');
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			$('.ctrlHolder', $this).each(function() {
				if ($(this).data('fbType') != 'EFRichText'
						&& $(this).data('fbType') != 'EFPlainText'
						&& $(this).data('fbType') != 'EFDataGrid')
					enames.push($(this).data('fbWidget').ename);
			});
		});
	});

	var rwEnames = new Array();// enames which is in ReservedWords scope
	var oracleReservedWords=['UPDATE','REVOKE','THEN','UNIQUE','DELETE','GROUP',
        'DISTINCT','SYNONYM','HAVING','COMPRESS','NULL','RENAME','CLUSTER','INTO','SHARE','MODE',
        'UNION','INTEGER','SET','VALUES','VIEW','WITH','DEFAULT','EXCLUSIVE','FROM','SELECT','BY',
        'TRIGGER','MINUS','OPTION','CHECK','VARCHAR2','ALL','AS','LONG','ELSE','ORDER','ASC','DESC',
        'TO','PCTFREE','FLOAT','INSERT','NOT','BETWEEN','ALTER','LOCK','SIZE','DROP','FOR','INTERSECT',
        'NOWAIT','WHERE','DECIMAL','IDENTIFIED','RESOURCE','OF','DATE','ANY','RAW','CREATE','TABLE',
        'OR','GRANT','EXISTS','LIKE','PRIOR','NOCOMPRESS','INDEX','IS','CONNECT','ON','SMALLINT','AND',
        'PUBLIC','START','IN','CHAR','VARCHAR','NUMBER'];
	for (var i = 0; i < enames.length; i++) {
		var curEname = enames[i];
		var count = 0;
		for (var j = 0; j < oracleReservedWords.length; j++) {
			if (oracleReservedWords[j] == curEname.toUpperCase())
				count++;
		}
		if (count > 0) {
			var isExist = false;
			for (var j = 0; j < rwEnames.length; j++) {
				if (rwEnames[j] == curEname)
					isExist = true;
			}
			if (!isExist)
				rwEnames.push(curEname);
		}
	}
	if (rwEnames.length == 0)
		return false;
	if (rwEnames.length != 0) {
		alert('存在为数据库保留字的字段名:' + rwEnames);
	}
	return true;
}

function formData() {
	var form = new Object();
	form.settings = $('#container').data('formbuilder').options.settings;
	form.colsize = $('#tableLayoutHeader .colControl').size();
	form.rows = new Array();
	$('#tableLayoutBody tr').each(function() {
		if($(this).find('.controlContainer').length==0) return;
		var cols = new Array();
		form.rows.push(cols);
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			var cell = {
				colspan : this.colSpan,
				rowspan : this.rowSpan,
				width : this.clientWidth,
				height : this.clientHeight,
				controls : new Array()
			}
			$('.ctrlHolder', $this).each(function() {
				cell.controls.push({
					'type' : $(this).data('fbType'),
					'settings' : $(this).data('fbWidget')
				});
			});
			cols.push(cell);
		});
	});

	return form;
}

function setGridContent(gridId, gridContent) {
	$('#tableLayoutBody tr').each(function() {
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			$('.ctrlHolder', $this).each(function() {
				var settings = $(this).data('fbWidget');
				if(settings.uuid == gridId){
					settings.gridContent = $.parseJSON(gridContent);
					$(this).data('fbWidget', settings);
				}
			});
		});
	});
}

function getGridContent(gridId) {
	var gridContent;
	$('#tableLayoutBody tr').each(function() {
		$(this).find('.controlContainer').each(function() {
			$this = $(this);
			$('.ctrlHolder', $this).each(function() {
				var settings = $(this).data('fbWidget');
				if(settings.uuid == gridId) {
					gridContent = settings.gridContent;
				}
			});
		});
	});
	
	return gridContent;
}

function jsonFormData() {
	return $.toJSON(formData());
}

function initBuilder() {
	$('#tableLayoutBody').click(selectControlContainer);
	// $('#radio input:radio').click(function() { // 设计模式切换时，清空选择
	// $('.controlContainerSelected').removeClass('controlContainerSelected');
	// });

	$('#merge').click(merge);
	$('#splitH').click(splitH);
	$('#splitV').click(splitV);
}

function initTable() {
	$('#tableLayout').hover(function() {
		$('.rowControl,.colControl').addClass('controlShow');
		// $('.appendCol,.appendRow,.deleteCol,.deleteRow').show();
	}, function() {
		$('.rowControl,.colControl').removeClass('controlShow');
		// $('.appendCol,.appendRow,.deleteCol,.deleteRow').hide();
	});

	$('.rowControl').hover(function() {
		$('.appendRow,.deleteRow').show();
	}, function() {
		$('.appendRow,.deleteRow').hide();
	});

	$('.colControl').hover(function() {
		$('.appendCol,.deleteCol').show();
	}, function() {
		$('.appendCol,.deleteCol').hide();
	});

	$(appendCol).click(addCol).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-triangle-1-e').addClass(
						'ui-icon-circle-triangle-e');
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-triangle-e')
						.addClass('ui-icon-triangle-1-e');
			}).prependTo('.colControl');

	$(appendRow).click(addRow).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-triangle-1-s').addClass(
						'ui-icon-circle-triangle-s');	
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-triangle-s')
						.addClass('ui-icon-triangle-1-s');
			}).prependTo('.rowControl');

	$(deleteCol).click(removeCol).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-close').addClass(
						'ui-icon-circle-close');
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-close').addClass(
						'ui-icon-close');
			}).prependTo('.colControl');// .prependTo('.colControl:not(:first)');

	$(deleteRow).click(removeRow).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-close').addClass(
						'ui-icon-circle-close');
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-close').addClass(
						'ui-icon-close');
			}).prependTo('.rowControl');// .prependTo('.rowControl:not(:first)');

	adjustColWidth();

	$('#addRowSpan').click(addRowSpan);
	$('#delRowSpan').click(delRowSpan);
	$('#addColSpan').click(addColSpan);
	$('#delColSpan').click(delColSpan);

	// define reference to the REDIPS.table object
	// var rt = REDIPS.table;
	// activate onmousedown event listener on cells within table with
	// id="mainTable"
	// rt.onmousedown('tableLayout', true);
	// show cellIndex (it is nice for debugging)
	// rt.cell_index(true);
	// define background color for marked cell
	// rt.color.cell = '#9BB3DA';

}

function merge() {
	// first merge cells horizontally and leave cells marked
	REDIPS.table.merge('h', false, 'tableLayout');
	// and then merge cells vertically and clear cells (second parameter is true
	// by default)
	REDIPS.table.merge('v', true, 'tableLayout');
}

function splitH() {
	REDIPS.table.split('h', 'tableLayout');
	$('#container').data('formbuilder')._initDroppable();
	$('#container').data('formbuilder')._initSortableWidgets();
}

function splitV() {
	REDIPS.table.split('v', 'tableLayout');
	$('#container').data('formbuilder')._initDroppable();
	$('#container').data('formbuilder')._initSortableWidgets();
}

function addRowSpan() {
	var rowspan = $('.controlContainerSelected').attr('rowspan');
	rowspan = rowspan ? rowspan : 1;
	rowspan++;
	$('.controlContainerSelected').attr('rowspan', rowspan);
}

function delRowSpan() {
	var rowspan = $('.controlContainerSelected').attr('rowspan');
	rowspan = rowspan ? rowspan : 1;
	if (rowspan > 1) {
		rowspan--;
		$('.controlContainerSelected').attr('rowspan', rowspan);
	}
}

function addColSpan() {
	var colspan = $('.controlContainerSelected').attr('colspan');
	colspan = colspan ? colspan : 1;
	colspan++;
	$('.controlContainerSelected').attr('colspan', colspan);
}

function delColSpan() {
	var colspan = $('.controlContainerSelected').attr('colspan');
	colspan = colspan ? colspan : 1;
	if (colspan > 1) {
		colspan--;
		$('.controlContainerSelected').attr('colspan', colspan);
	}
}

function addCol() {
	// var $row = $(REDIPS.table.column('tableLayout', 'insert',
	// $(this).parent().index()+1));
	var table = document.getElementById('tableLayout');

	var cl = REDIPS.table.cell_list(table);

	var $th = $(this).parent();
	var index = $th.index();// + 1;
	var c;
	for ( var i = 1; i < table.rows.length; i++) {
		var c = cl[i + '-' + index];
		if (c === undefined) {
			for ( var j = index; j > 0; j--) {
				c = cl[i + '-' + j];
				if (c !== undefined && c.colSpan > 1) {
					c.colSpan += 1;
					break;
				}
			}
		} else {
			if (c.colSpan > 1) {
				c.colSpan += 1;
			} else {
				$('<td class="controlContainer"></td>').insertAfter($(c));
			}
		}
	}

	var $newTh = $('<th class="colControl controlShow"></th>');
	$newTh.insertAfter($th).hover(function() {
		$('.appendCol,.deleteCol').show();
	}, function() {
		$('.appendCol,.deleteCol').hide();
	});

	$(appendCol).click(addCol).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-triangle-1-e').addClass(
						'ui-icon-circle-triangle-e');
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-triangle-e')
						.addClass('ui-icon-triangle-1-e');
			}).prependTo($newTh, $(".controlContainer")
			  .css('border', $('#container').data('formbuilder').options.settings.border + 'px solid')
			  .css('border-color', '#' + $('#container').data('formbuilder').options.settings.styles.color)
			  .css('backgroundColor', '#' + $('#container').data('formbuilder').options.settings.styles.backgroundColor))
			  .prependTo($newTh, $(".colControl")
			  .css('border', '0px dashed')
			  .css('border-right-color', '#' + $('#container').data('formbuilder').options.settings.styles.color)
			  .css('backgroundColor', '#' + $('#container').data('formbuilder').options.settings.styles.backgroundColor)).show();

	$(deleteCol).click(removeCol).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-close').addClass(
						'ui-icon-circle-close');
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-close').addClass(
						'ui-icon-close');
			}).prependTo($newTh).show();
	//
	// $('<td class="controlContainer"></td>').insertAfter(
	// '#tableLayoutBody > tr > td:nth-child(' + index + ')');
       $(".controlContainer").resizable({
			aspectRatio:false,
			minHeight:10,
			minWidth:10
		});
		
		$(".colControl").resizable({
			aspectRatio:false,
			minHeight:10,
			minWidth:10
		});	
	$('#container').data('formbuilder')._initDroppable();
	$('#container').data('formbuilder')._initSortableWidgets();
	
	adjustColWidth();
	// $('.controlContainer').droppable('refresh');
}

function addRow() {
	//如果表单类型是DataGrid,表格行数限制为两行
	//if ($('#container').attr('formType') == "dataGrid") {
	if ($('#container').data('formbuilder').options.settings.formType == "dataGrid") {
		var table = document.getElementById('tableLayout');
		if (table.rows.length > 2)
			return;
	}
	// 这里需要找到一行没有rowspan的，也就是TD的数量等于表头的
	var $row = $(REDIPS.table.row('tableLayout', 'insert', $(this).parent()
			.parent().index() + 2));

	var $rowControl = $row.find('td:first').removeClass('controlContainer')
			.addClass('rowControl controlShow').hover(function() {
				$('.appendRow,.deleteRow').show();
			}, function() {
				$('.appendRow,.deleteRow').hide();
			});
	/*
	 * var cols = $('#tableLayoutHeader .colControl').size(); var _htmls = [];
	 * _htmls.push('<tr><td class="rowControl controlShow"></td>'); for (
	 * var i = 0; i < cols; i++) { _htmls.push('<td class="controlContainer"></td>'); }
	 * _htmls.push('</tr>'); var _html = _htmls.join('');
	 * 
	 * var $rowControl = $(_html).insertAfter($(this).parent().parent()).find(
	 * '.rowControl').hover(function() { $('.appendRow,.deleteRow').show(); },
	 * function() { $('.appendRow,.deleteRow').hide(); });
	 */
	$(appendRow).click(addRow).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-triangle-1-s').addClass(
						'ui-icon-circle-triangle-s');
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-triangle-s')
						.addClass('ui-icon-triangle-1-s');
			}).prependTo($rowControl, $(".controlContainer")
			  .css('border', $('#container').data('formbuilder').options.settings.border + 'px solid')
			  .css('border-color', '#' + $('#container').data('formbuilder').options.settings.styles.color)
			  .css('backgroundColor', '#' + $('#container').data('formbuilder').options.settings.styles.backgroundColor))
			  .prependTo($rowControl, $(".rowControl")
			  .css('border', '0px dashed')
			  .css('border-right-color', '#' + $('#container').data('formbuilder').options.settings.styles.color)
			  .css('backgroundColor', '#' + $('#container').data('formbuilder').options.settings.styles.backgroundColor)).show();

	$(deleteRow).click(removeRow).mouseover(
			function() {
				$('span', this).removeClass('ui-icon-close').addClass(
						'ui-icon-circle-close');
			}).mouseout(
			function() {
				$('span', this).removeClass('ui-icon-circle-close').addClass(
						'ui-icon-close');
			}).prependTo($rowControl).show();
			
		$(".controlContainer").resizable({
			aspectRatio:false,
			minHeight:10,
			minWidth:10
		});
		
		$(".rowControl").resizable({
			aspectRatio:false,
			minHeight:10,
			minWidth:10
		});
		

	$('#container').data('formbuilder')._initDroppable();
	$('#container').data('formbuilder')._initSortableWidgets();
}

function removeCol() {
	if ($(this).parent().siblings().size() <= 1) {
		alert('can not delete last column!');
		return;
	}

	var table = document.getElementById('tableLayout');

	var cl = REDIPS.table.cell_list(table);

	var $th = $(this).parent();
	var index = $th.index();// + 1;
	var c;
	for ( var i = 1; i < table.rows.length; i++) {
		var c = cl[i + '-' + index];
		if (c === undefined) {
			for ( var j = index; j > 0; j--) {
				c = cl[i + '-' + j];
				if (c !== undefined && c.colSpan > 1) {
					c.colSpan -= 1;
					break;
				}
			}
		} else {
			if (c.colSpan > 1) {
				c.colSpan -= 1;
			} else {
				$(c).remove();
			}
		}
	}

	// var $th = $(this).parent();
	// var index = $th.index() + 1;
	// $('#tableLayoutBody > tr > td:nth-child(' + index + ')').remove();
	$th.remove();

	$('#container').data('formbuilder')._initDroppable();
	$('#container').data('formbuilder')._initSortableWidgets();
	adjustColWidth();
}

function removeRow() {
	if ($(this).parent().parent().siblings().size() == 0) {
		alert('can not delete last row!');
		return;
	}

	var $row = $(REDIPS.table.row('tableLayout', 'delete', $(this).parent()
			.parent().index() + 1));

	// $(this).parent().parent().remove();

	$('#container').data('formbuilder')._initDroppable();
	$('#container').data('formbuilder')._initSortableWidgets();
}

function selectControlContainer(event) {

	if ($(event.target).hasClass('controlContainer')
			&& $(event.target).find('.ctrlHolder').size() == 0) {
		// var mode = $('input:radio[name=selectMode]:checked').val();
		// if ('L' == mode) { // 布局模式
		if ($(event.target).hasClass('controlContainerSelected')) {
			$(event.target).removeClass('controlContainerSelected');
		} else {
			$(event.target).addClass('controlContainerSelected');
		}
		// } else {
		// $('#container .controlContainer').removeClass(
		// 'controlContainerSelected');
		// $(event.target).addClass('controlContainerSelected');
		// }
	}
}

function adjustColWidth() {
	var cols = $('#tableLayoutHeader .colControl').size();
	var _w = ($('#tableLayout').width() - 20) / cols * 1;
	$('#tableLayoutHeader .colControl').width(_w);
}

function rt_selected(c) {
	return $(c).hasClass('controlContainerSelected');
}

function rt_mark(c) {
	$(c).addClass('controlContainerSelected');
}

function rt_unmark(c) {
	$(c).removeClass('controlContainerSelected');
}

function rt_cell_init(c) {
	$(c).addClass('controlContainer');
}