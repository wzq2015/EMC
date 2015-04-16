efform_onload = function () {
    efform.msgDisplayStyle="alert";
    enableButtons(false);
}

var dateFormats = new Object();
/**
 * 点击查询按钮
 */
button_query_onclick = function () {
    efgrid.submitInqu("ef_grid_r", "ed", "EDMDM2", "query");
}

/**
 * 点击新增按钮
 */
button_insert_onclick = function () {
    efgrid.submitForm("ef_grid_r", "ed", "EDMDM2", "insert", true);
}
/**
 * 点击修改按钮
 */
button_modify_onclick = function () {
    efgrid.submitForm("ef_grid_r", "ed", "EDMDM2", "update", true);
}
/**
 * 点击删除按钮
 */
button_delete_onclick = function () {
    var grid = efgrid.getGridObject("ef_grid_r");
    var rows = grid.getSelectRowsData();
    if(rows.length<1){
        EFAlert('您没有选任何记录，请重新选择!', '警告');
        // alert("您没有选中人员，请重新选择");
        return;
    }
    efgrid.submitForm("ef_grid_r", "ed", "EDMDM2", "delete", true);
}
/**
 * 点击新增序列段
 */
button_subinsert_onclick = function () {
    var grid = efgrid.getGridObject("ef_grid_subsection");
    var rows = grid.getSelectRowsData();
    if(rows.length<1){
        EFAlert('您没有选中序列号分段，请重新选择!', '警告');
        // alert("您没有选中二级群组，请重新选择");
        return;
    }
    efgrid.submitForm("ef_grid_subsection", "ed", "EDMDM2", "addSubSection", true);
}
/**
 * 点击修改序列段
 */
button_sub_modify_onclick = function () {
    var grid = efgrid.getGridObject("ef_grid_subsection");
    var rows = grid.getSelectRowsData();
    if(rows.length<1){
        EFAlert('您没有选中序列号分段，请重新选择!', '警告');
        // alert("您没有选中二级群组，请重新选择");
        return;
    }
    efgrid.submitForm("ef_grid_subsection", "ed", "EDMDM2", "updateSubSection", true);
}
/**
 * 删除序列段
 */
button_sub_delete_onclick = function () {
    var grid = efgrid.getGridObject("ef_grid_subsection");
    var rows = grid.getSelectRowsData();
    if(rows.length<1){
        EFAlert('您没有选中序列号分段，请重新选择!', '警告');
        // alert("您没有选中二级群组，请重新选择");
        return;
    }
    efgrid.submitForm("ef_grid_subsection", "ed", "EDMDM2", "deleteSubSection", true);
}

/*
 点击主表里的某行触发的回调,查询引用表的信息，ajax提交
 */
function efgrid_onRowClicked( grid_id, row_index )
{
    if( grid_id == "ef_grid_r" )
    {
        enableButtons(true);
        var grid = efgrid.getGridObject("ef_grid_r");
        ef.get("subsection_inqu_status-0-seqTypeId").value = grid.getCellValue(row_index,1,TYPE_DATA);
        efgrid.submitInqu( "ef_grid_test", "ED", "EDMDM2","querySequence");
        efgrid.submitInqu( "ef_grid_subsection", "ED", "EDMDM2","querySubSection");
    }
}

function button_test_seq_onclick(){
    var grid = efgrid.getGridObject("ef_grid_test");
    var rows = grid.getSelectRowsData();
    if(rows.length<1){
        EFAlert('您没有选中序列号分段，请重新选择!', '警告');
        // alert("您没有选中二级群组，请重新选择");
        return;
    }

    efgrid.submitForm( "ef_grid_test", "ED", "EDMDM2","querySequence",true);
}


function enableButtons(enable){
    efbutton.setButtonStatus("sub_delete", enable);
    efbutton.setButtonStatus("sub_modify", enable);
    efbutton.setButtonStatus("subinsert", enable);
    efbutton.setButtonStatus("test_seq", enable);
}


efgrid_onBeforeGridDisplay = function( grid_id )
{
    var ei = _getEi();
    var block = ei.getBlock( "dateFormats" );
    for( var i=0; i< block.getRows().length; i++ )
    {
        dateFormats[block.getCell(i,"dateFormat")] =
            block.getCell(i,"dateFormat_desc");
    }
}

efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index,
                                               col_index, data_type )
{
    if(grid_id=="ef_grid_subsection"){
        var grid = efgrid.getGridObject( grid_id );
        if( col_index == 5 && data_type == TYPE_DATA )
        {
            load_dateFormats( row_index, grid.getCellValue( row_index, 2, TYPE_DATA  ) );
        }
    }
}

efgrid_onCellEditNodeDisplayReady = function( grid_id, row_index,
                                              col_index, cell_value, data_type, div_node )
{

}


//设置是否"授权"属性
setLinked = function(row_index, col_index, flage){

    var grid = efgrid.getGridObject("ef_grid_r");
    if(flage){
        grid.setCellValue(row_index, col_index, "1",TYPE_DATA);
    }else{
        grid.setCellValue(row_index, col_index, "0",TYPE_DATA);
    }
}


efgrid_onCellDisplayReady = function( div_node_html, row_index,
                                      col_index, cell_value, display_value, grid_id )
{
    if(grid_id == "ef_grid_subsection"){
//        if( col_index == 2 && isAvailable(cell_value) )
//        {
//            var div_node = document.createElement( "div" );
//            div_node.innerHTML = div_node_html;
//            div_node.firstChild.innerText = dateFormats[cell_value];
//
//            return div_node.innerHTML;
//        }
        return div_node_html;
    }

    //多Grid时的检验
    if (grid_id != "ef_grid_r") return;
    var grid = efgrid.getGridObject( grid_id );
    var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();

    switch (columnEname) {
        case "isLinked":
            //设置对”授权“属性checkbox
            var html = "";
            if (display_value ==1){
                html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setLinked("+row_index+","+col_index+",this.checked);'/></div>";
            } else {
                html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setLinked("+row_index+","+col_index+",this.checked)'/></div>";
            }
            return html;
            break;
    }
}

efgrid_onDataCellSaved = function( grid_id, row_index, col_index, cell_value )
{
    if(grid_id == "ef_grid_subsection"){
        var grid = efgrid.getGridObject( grid_id );
        if( col_index == 2 )
        {
            var cname = isAvailable( cell_value )? dateFormats[cell_value]: "";
            if(cell_value!="00"){
                grid.setCellValue( row_index, 3, "", TYPE_DATA  );
                grid.refreshCell( row_index, 3 , TYPE_DATA );
            }
            grid.setCellValue( row_index, 5, cname, TYPE_DATA  );
            grid.refreshCell( row_index, 5 , TYPE_DATA );
        }
    }
}

load_dateFormats = function( row_index, type )
{
    var ajax_callback =
    {
        onSuccess :function(eiInfo){
            load_dateFormats_callback( row_index, eiInfo );
        },
        onFail: function(eMsg){
            alert("服务调用失败: " + eMsg);
        }
    };
    var ei_info = new EiInfo();
    ei_info.setByNameValue( "inqu_data-0-type", type );
    EiCommunicator.send( "EDMDM2", "loadDateFormats" , ei_info, ajax_callback );
}

load_dateFormats_callback = function( row_index, eiInfo )
{
    var block = eiInfo.getBlock( "dateFormats" );
    if( !isAvailable( block ) || block.getRows().length <=0 )
    {
        return;
    }
    var grid = efgrid.getGridObject( "ef_grid_subsection" );
    var column = grid.getColumn(5, TYPE_DATA );
    column.prepareData( eiInfo );
//
    grid.setCellValue( row_index, 5, "", TYPE_DATA  );
    grid.refreshCell( row_index, 5 , TYPE_DATA );

    //grid.refreshRow( row_index );
}