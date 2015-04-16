button_query_onclick = function () 
{
	if(efvalidateDiv("ef_region_inqu")){
    	efgrid.submitInqu( "ef_grid_result", "EVCM","EVCM03","query");
    }
}

button_insert_onclick = function () 
{
	//efgrid.submitForm( "ef_grid_result", "EVCM","EVCM03","insert", true );
	efform.openNewForm('EVCM0301', null);	
}

button_update_onclick = function () 
{
	//efgrid.submitForm( "ef_grid_result", "EVCM","EVCM03","update", true );
	grid = efgrid.getGridObject( "ef_grid_result" );
	if(grid.getCheckedRowCount()>1){
		alert("一次只能修改一条记录!");
	}else if(grid.getCheckedRowCount()<1){
		alert("请选择一条记录!");
	}else{
	 	rowcount_current=grid.getRowCount();
		for(j=0;j<rowcount_current;j++){
			row= grid.getRowData(j);
	   		if(grid.isRowChecked(j)){
	   			//efform.openNewForm('EVCM0301',"portletId=" + row["portletId"]+"&tabId=" + row["tabId"]);
	   			efform.openNewForm('EVCM0301',"portletId=" + jQuery.param({"portletId":row["portletId"]}) +"&"+jQuery.param({"tabId":row["tabId"]}));
	   		}
		}
	}	
}

button_delete_onclick = function () 
{
    efgrid.submitForm( "ef_grid_result", "EVCM","EVCM03","delete", true );	
}

/** 
  打开选择Portlet窗口
  用户选择Portlet标识时使用
 */
function openSelectPortlet() {
	
	var col = new efSubgridColumn();
	index = custom_cols.index["portletId"];
	col.setEiMeta(custom_cols.metas[index],{});
	col.prepareData(_getEi());
	
	var div = efform.getSubGridDiv();
	div.efDisplayCol = col;
	efform.showSubGridWindow('inqu_status-0-portletId')
}

button_portletpara_onclick = function () 
{
  	var grid=efgrid.getGridObject("ef_grid_result");
    var rows=grid.getCheckedRows();
    var PortletId;
    if(rows.length!=1){
     	alert("请选中一条记录");
     	return;
    }
    else
    {
    	if(grid.getCellValue(rows[0],3,TYPE_DATA,false)=="2"){
    		alert("资源来源为内容管理Portlet无自定义参数，请重新选择");
    		return;
    	}
    	else
     		PortletId= grid.getCellValue(rows[0],1,TYPE_FIX,false); 
    }
     	
	var childWindow = efform.openNewForm('EVCM09', "inqu_status-0-portletType=2&inqu_status-0-portletId="+PortletId);
	childWindow.focus();
}
