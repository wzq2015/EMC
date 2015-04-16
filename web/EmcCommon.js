$.extend($.fn.datagrid.defaults.editors, {
				datetimebox: 
				{
					 init: function(container, options) { 
					 			var editor = $('<input class="easyui-datetimebox" />').appendTo(container);
                    			editor.datetimebox(options);
                    			return editor;
					 	   },
					 destroy: function(target) { $(target).remove(); },
					 getValue: function(target) { return $(target).datetimebox("getValue"); },
					 setValue: function(target, value) { $(target).datetimebox("setValue", value); },
					 resize: function(target, width) {
					 	$(target)._outerWidth(width);
					 }
			    }
		});
		
var ActionType = {};
ActionType.Normal = 0;
ActionType.Adding = 1;
ActionType.Editing = 2;

$.messager.defaults = { ok: "确定", cancel: "取消" };

function commonPagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function') {
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}