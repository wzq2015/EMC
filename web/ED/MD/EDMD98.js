efform_onload = function ()
{
  efgrid.submitInqu("ef_grid_result", "", "EDMD98", "query");
}

button_query_onclick = function()
{
	efgrid.submitInqu("ef_grid_result", "", "EDMD98", "query");
}

//渲染注册按钮
efgrid_onCellDisplayReady = function(div_node_html, row_index, col_index, col_value_c, display_value, grid_id)
{
	if(grid_id == "ef_grid_result"){
        var grid = efgrid.getGridObject( "ef_grid_result" );
        var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
        var status = grid.getCellValue(row_index, 3, TYPE_DATA);
        if(columnEname == "register")
        	return "<div align='center' efval=''><input value='注册' class='buttonclass' type='button' align='center' onclick='onRegisterClick("+ row_index + ")'></div>";
    }
}

var flowName;
//点击注册按钮的相关操作
function onRegisterClick(row_index)
{
	var grid = efgrid.getGridObject("ef_grid_result");
	flowName = grid.getCellValue(row_index, 0, TYPE_DATA);
	$("#flowName").val(flowName);
//	var childWindow = efform.openNewForm('EDMD99');
//	childWindow.focus();
	
	var options={'width':500,'height':450,'params':'efHeadTail=none'};
		    parent.dialog('流程入口页面及菜单注册', 'EDMD99',options);
}

function getSelectedFlowName(){
return $("#flowName").val();
}

function dialog(title, form, options) {
	var src = window.location.pathname + '?efFormEname=' + form;
	if (options && options.params)
		src += '&' + options.params;
	$('body').append($('<div style="display:none"/>')
			.attr({id: form, title: title})
			.append(
				$('<iframe frameborder= "0" />')
				.attr('src', src)
				.css({height : '100%', width : '100%'})));
//		var iframe = $("<iframe>").attr("src", src).attr({id: form, title: title}).css({height : '100%', width : '100%'});
//       iframe.appendTo("body");
//		$("#"+form).appendTo("form:eq(0)");
	$('#' + form).dialog({
		autoOpen : true,
		modal : true,
		height : options && options.height ? options.height : 600,
		width : options && options.width ? options.width : 800,
		zIndex : 9999,
		resizable: false,
		close: function(event, ui) {
			$(event.target).dialog("destroy").remove();
			if (options && options.onclose)
				options.onclose(event, ui);
		}
	});
}

function closeDialog(name) {
	var dia = $('#' + name);
	dia.dialog('close');
}
