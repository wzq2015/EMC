efform_onload = function ()
{
    // subWindow = new EFSubWindow("ef_region_model", "选择模型", 400, 300);
	var req = $('#reqPage').val();
	if (req == 'null')
	{
		$('#button_SELECT').hide();
	}
    ef.get("serviceName").value = "EDMD41";
	efform.msgDisplayStyle="alert";

	var cond_grid = efform.getGrid( "ef_grid_result_condMode" );
	cond_grid.onRowDblClicked = condMode_popup_save_onclick;

	var data_grid = efform.getGrid( "ef_grid_result_dataMode" );
	data_grid.onRowDblClicked = dataMode_popup_save_onclick;
}

/*
 点击查询按钮后调用后台的service
 */
button_query_onclick = function ()
{
    efgrid.submitInqu( "ef_grid_result", "ed","EDMD41","query");
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ,grid_id){
    var grid = efgrid.getGridObject( "ef_grid_result" );
    // 取得ID
    if(grid_id=="ef_grid_result"){
        var id = grid.getCellValue(row_index,0,"", true);
        var modelType = grid.getCellValue(row_index, 4);
    }
    var href1 = "DispatchAction.do?efFormEname=EDMD42&inqu_status-0-modelId=";
    var href0 = "DispatchAction.do?efFormEname=EDMD43&inqu_status-0-modelId=";

    if(col_index == 7 ){
        if("" != id && modelType == '1') {
            // alert("\<input value='配置' class='buttonClass' type='button' onclick='window.location.href=\""+href1 + id +"\"'>");
//            return "\<input value='配置' class='buttonClass' type='button' onclick='window.location.href=\""+href1 + id +"\"'>" ;
             return "\<input value='配置' class='buttonClass' type='button' onclick='window.open(\""+href1 + id +"\",\"\",\"toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes," +
                    "width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight - 30) + ",top=0," +
                    "left=0\")'>" ;
        } else if("" != id && modelType == '0') {
            return "\<input value='配置' class='buttonClass' type='button' onclick='window.open(\""+href0 + id +"\",\"\",\"toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes," +
                    "width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight - 30) + ",top=0," +
                    "left=0\")'>" ;
        } else {
            return "";
        }
    }
}



/*
 点击删除按钮后调用后台的service
 */
button_delete_onclick = function ()
{
    if(validateSel()){
        if(window.confirm("请谨慎删除领域模型！\n相关的功能和页面可能受到影响！\n确定要删除么？")){
            efgrid.submitForm( "ef_grid_result", "ed","EDMD41","delete", true );
        }
    }else{
        alert('请先选择数据！');
    }
}

/*
 点击新增按钮后调用后台的service
 */
button_insert_onclick = function ()
{
    if(validateSel()){
        efgrid.submitForm( "ef_grid_result", "ed","EDMD41","insert",true );
    }else{
        alert('请先选择数据！');
    }
}

/*
 点击修改按钮后调用后台的service
 */
button_update_onclick = function ()
{
    if(validateSel()){
        efgrid.submitForm( "ef_grid_result", "ed","EDMD41","update",true);
    }else{
        alert('请先选择数据！');
    }
}

/*
针对EDMD30设计器页面，在进行数据模型操作时需要此操作
*/
button_select_onclick = function ()
{
    var grid = efgrid.getGridObject("ef_grid_result");
    var rows = grid.getCheckedRows();
    if (rows.length == 1)
    {
    	//得到grid的这行数据
       var row = grid.getRowData(rows[0]);
       var modelType = grid.getCellValueByColumnName(rows[0], "modelType");       
       if (modelType == '0') //条件模型
       {
    	   var eiinfo = new EiInfo();
    	   var inquBlock = new EiBlock('inqu_status');
		 
    	   var blockMeta = new EiBlockMeta("inqu_status");
    	   var modelMeta = new EiColumn("modelId");
    	   modelMeta.pos = 0;
    	   blockMeta.addMeta(modelMeta);
    	   inquBlock.setBlockMeta(blockMeta);
    	   
           inquBlock.setCell(0,"modelId",row.id);
    	   eiinfo.addBlock(inquBlock);
//    	   eiinfo.set("systemCode",systemCode);
    	   EiCommunicator.send( "EDMD43", "query", eiinfo, ajax_getQuery_callback, false );
       }
       else                  //数据模型，主要针对的是EFGrid
       {
    	   var eiinfo = new EiInfo();
    	   var inquBlock = new EiBlock('inqu_status');
		 
    	   var blockMeta = new EiBlockMeta("inqu_status");
    	   var modelMeta = new EiColumn("modelId");
    	   modelMeta.pos = 0;
    	   blockMeta.addMeta(modelMeta);
    	   inquBlock.setBlockMeta(blockMeta);
    	   
           inquBlock.setCell(0,"modelId",row.id);
    	   eiinfo.addBlock(inquBlock);
//    	   eiinfo.set("systemCode",systemCode);
    	   EiCommunicator.send( "EDMD42", "query", eiinfo, ajax_getQuery_callback, false );
       }
       

   }else{
       alert('请先选择数据！');
   }
};

var ajax_getQuery_callback = {
		 onSuccess : 
		    function(eiInfo){ 
	            window.close();
	            window.opener.buildColsFromMeta(eiInfo);
		    },
		  	onFail : 
		    function(eMsg) {
		    	alert("白了");
		    }
};




//验证是否新增加了行
function validateSel(){
    var grid = efgrid.getGridObject("ef_grid_result");
    var rows = grid.getCheckedRows();
    if(rows == ''){
        return false;
    }
    return true;
}
/*
 模型类型 级联管理
 */
efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index,
                                               col_index, data_type )
{
    if(col_index == 4) {
        var grid = efgrid.getGridObject(grid_id);
        var cond_column = grid.getColumn( 5, TYPE_DATA ); // 条件模型
        var data_column = grid.getColumn( 6, TYPE_DATA ); // 数据模型
        var model =  grid.getCellValue(row_index,4);

        cond_column.set("enable",false);
        data_column.set("enable",false);

        if(data_type == TYPE_DATA && model == '2'){
            data_column.set("enable",true);
            // data_column.set("nullable",false);

            cond_column.set("enable",true);
            // cond_column.set("nullable",false);
        }
    }
}

/**
 * 控件与属性联动处理
 */
efgrid_onDataCellSaved = function(grid_id, row_index, col_index, cell_value) {
    if(col_index == 4) {
        var grid = efgrid.getGridObject(grid_id);
        var model =  grid.getCellValue(row_index,4);
        var cond_column = grid.getColumn( 5, TYPE_DATA ); // 条件模型
        var data_column = grid.getColumn( 6, TYPE_DATA ); // 数据模型

        if(model != '2'){
            cond_column.set("enable",false);
            data_column.set("enable",false);

            grid.setCellValue(row_index, 5, "", TYPE_DATA);
            grid.refreshCell(row_index, 5, TYPE_DATA);

            grid.setCellValue(row_index, 6, "", TYPE_DATA);
            grid.refreshCell(row_index, 6, TYPE_DATA);
        } else {
            cond_column.set("enable",true);
            data_column.set("enable",true);
        }
    }
}

/**
 * 生成代码服务调用
 */
button_gencode_onclick = function ()
{
    var grid = efgrid.getGridObject("ef_grid_result");
    var rows = grid.getCheckedRows();
    if(rows == ''){
        return alert('请选择数据模型！');
    } else {
        for(var i=0; i<rows.length; i++) {
            var modelType = grid.getCellValueByColumnName(rows[i], "modelType");
            if ("1" != modelType) {
                return alert('不能选择非数据模型数据！' + "[第" + (rows[i]+1) + "行]");
            }
        }
    }
    var selected = false;
    var codeTypes = document.forms[0].elements["gen_status-0-codeType"];
    for(var i=0; i<codeTypes.length; i++) {
        if (codeTypes[i].checked) {
            selected = true;
            break;
        }
    }
    if (!selected) {
        return alert("请选择生成的代码类型!");
    }
    efgrid.submitForm( "ef_grid_result", "ed", "EDMD55", "genModelCode", true);
    efbutton.setButtonStatus("genCode", true);
    efform.setStatus(0, "生成代码");
    // 不太好的处理方式
    if(!!ef.get("ef_grid_result_submit"))
        ef.get("ef_grid_result_submit").parentNode.removeChild(ef.get("ef_grid_result_submit"));
    
    ef.get("serviceName").value = "EDMD41";
	ef.get("methodName").value = "query";
}

/**
 * 弹出列选择
 */
condMode_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_result_condMode", "ed", "EDMD41", "getCondModel");
}

/**
 * 弹出框点击事件
 */
condMode_popup_save_onclick = function()
{
	var grid = efgrid.getGridObject("ef_grid_result_condMode");
	var index = grid.getCurrentRowIndex();
	if( index < 0 ) {
		alert( getI18nMessages("ef.NotSelect","未选择记录")  );
		return;
	}
	var cell_value = grid.getBlockData().getCell( index, "condModelId" );
	var cell_label = grid.getBlockData().getCell( index, "condModelName" );

	//调用efPopupColumn.transferDataToParent 函数，传递值和显示值给弹出的父Cell。
	efPopupColumn.transferDataToParent("condModelId_Popup",cell_value,cell_label);
}

/**
 * 弹出列选择
 */
dataMode_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_result_dataMode", "ed", "EDMD41", "getDataModel");
}

/**
 * 弹出框点击事件
 */
dataMode_popup_save_onclick = function()
{
	var grid = efgrid.getGridObject("ef_grid_result_dataMode");
	var index = grid.getCurrentRowIndex();
	if( index < 0 ) {
		alert( getI18nMessages("ef.NotSelect","未选择记录")  );
		return;
	}
	var cell_value = grid.getBlockData().getCell( index, "dataModelId" );
	var cell_label = grid.getBlockData().getCell( index, "dataModelName" );

	//调用efPopupColumn.transferDataToParent 函数，传递值和显示值给弹出的父Cell。
	efPopupColumn.transferDataToParent("dataModelId_Popup",cell_value,cell_label);
}