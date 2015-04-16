efgrid_onCellDisplayReady = function(div_node_html, row_index, col_index, col_value_c, display_value, grid_id) {
/*
    if (grid_id == 'ef_grid_workItem' && col_index == '5') {
        var ef_grid_documentManageWorkItem = efgrid.getGridObject(grid_id);
        fWorkitemId = ef_grid_documentManageWorkItem.getCellValue(row_index, 0, TYPE_DATA).trim();
        processInsId = ef_grid_documentManageWorkItem.getCellValue(row_index, 1, TYPE_DATA).trim();
        return "<a style='cursor:pointer' onclick=\"look('" + fWorkitemId + "');\">&nbsp;<font color=purple>查看</font>&nbsp;</a>";

    }
    */
}

function look(fWorkitemId) {
    var contextpath = ef.get('contextpath').value;
    //efform.openNewForm('EWDD12','workItemId='+fWorkitemId);
    //window.close();
    window.location.href = contextpath + "?efFormEname=EWDD12&workItemId=" + fWorkitemId + "&processInsId=" + processInsId;
}

efform_onload = function() {
    efregion.show("ef_region_RESULT");
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_workItem", "ew","EWWI01", "getWorkItemList");
}
