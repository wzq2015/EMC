/*
  点击查询按钮后调用后台的service，grid提交
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM08","query");
}

/*
  点击删除按钮后调用后台的service，grid提交
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM08","delete", true );
}

/*
  点击修改按钮后调用后台的service，form提交
*/
/*
button_update_onclick = function ()
{
    var pre_code = ef.get("company_detail-0-preCode").value;
    var cur_code = ef.get("company_detail-0-companyCode").value;
    if( pre_code != cur_code )
    {
	      alert("修改公司记录时公司代号不能修改！");
	      return;
    }
    if (efvalidateForm(ef.get("EEDM08"))) {
		    document.getElementById("serviceName").value= "EEDM08";
		    document.getElementById("methodName").value= "update";
		    document.forms[0].submit();
    }

}
*/

/*
  点击修改按钮后调用后台的service，grid的ajax提交
*/
button_update_onclick = function ()
{
	var pre_code = ef.get("company_detail-0-preCode").value;
    var cur_code = ef.get("company_detail-0-companyCode").value;
    if( pre_code != cur_code )
    {
	      alert("修改公司记录时公司代号不能修改！");
	      return;
    }
     if (efvalidateForm(ef.get("EEDM08"))){
        efgrid.submitForm( "ef_grid_result", "ee","EEDM08","update",true);
     }
}


/*
  点击新增按钮后调用后台的service，grid的ajax提交
*/
button_insert_onclick = function ()
{
     if (efvalidateForm(ef.get("EEDM08"))){
        efgrid.submitForm( "ef_grid_result", "ee","EEDM08","insert",true);
     }
}

/*

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value )
{
    if( grid_id == "ef_grid_result" )
	{
	    var company_code = value;
	    var eiinfo = new EiInfo();
		eiinfo.set("companyCode",company_code);

		var ajax_callback = efform.getSystemAjaxCallback( "ef_region_detail" );
        EiCommunicator.send( "EEDM08", "getDetailOfCompany", eiinfo, ajax_callback);
        //将公司代号记录在一个隐藏字段中，用于修改的判断
        ef.get("company_detail-0-preCode").value = value;
	}
}
*/

/*
   点击主表里的某行触发的回调,查询公司的明细，ajax提交
*/
function efgrid_onRowClicked( grid_id, row_index )
{
    if( grid_id == "ef_grid_result" )
	{
	    grid = efgrid.getGridObject("ef_grid_result");
	    var company_code = grid.getCellValue(row_index,0,TYPE_DATA);

	    var eiinfo = new EiInfo();
		eiinfo.set("companyCode",company_code);
		var grid_ids=["ef_grid_result"];//可处理多个grid数据，比如var grid_ids=["ef_grid_r","ef_grid_c"];
		efgrid.addGridsSelectedData(grid_ids,eiinfo);
		var ajax_callback = efform.getSystemAjaxCallback( "ef_region_detail" );
        EiCommunicator.send( "EEDM08", "getDetailOfCompany", eiinfo, ajax_callback);
        //将公司代号记录在一个隐藏字段中，用于修改的判断
        ef.get("company_detail-0-preCode").value = company_code;
	}
}


