efform_onload = function () {
  efregion.show("ef_region_category");
  efregion.show("ef_region_inqu");
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_p", "ew","EW50","query");
}

/*
  拷贝用户
*/
button_copy_onclick = function() 
{
  var _array = new Array();
  var cur = efgrid.getGridObject( "ef_grid_c" );
  var des = efgrid.getGridObject( "ef_grid_r" ); 
  var rows = cur.getSelectRowsData();
  for(j = 0;j<rows.length;j++){
    var row = rows[j];    
    var exist = false;
    for(i = 0;i<des.getRowCount();i++){
      var item = des.getRowData(i);      
      if ( item.identity == row.identity ){
        des.setRowChecked(i, true);
        exist = true;
      }
    }
    if ( !exist )  _array.push(row)    
  }
  des.addRowData( _array, false );
}

/*
  删除授权
*/
button_f8_onclick = function() 
{
  efgrid.submitForm( "ef_grid_c", "es","ES50","delete", true );
}

/*
  选择用户
*/
button_select_onclick = function() 
{
  efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
}

/*
  删除用户
*/
button_deleteuser_onclick = function(){
	var grid = efgrid.getGridObject("ef_grid_r");
	var rowLength = grid.getCheckedRows().length;
	for(i=rowLength-1;i>=0;i--){
		grid.removeRow(grid.getCheckedRows()[i]);
	}
	grid.refresh();	
	efform.setStatus(0,rowLength+getI18nMessages("label.ESRowsHasDeletedSuccess","条记录删除成功"));
}

/*
  批量授权
*/
button_authorization_onclick = function() 
{
  var sel = getSelection();
  if ( sel == "" ){
    alert( getI18nMessages("label.EWPleaseSelect","请选中需要授权的流程目录") );
    return;
  }
  document.getElementById("inqu_status-0-authorize").value = sel;    
  efgrid.submitForm( "ef_grid_r", "es","ES50","insert", true );  
  var cate_grid = efgrid.getGridObject("ef_grid_p");
  cate_grid._clearSelect();
  cate_grid.refresh(); 
}

function getSelection(){
  var auths = [];
  var cate_grid = efgrid.getGridObject("ef_grid_p");
  var rows = cate_grid.getSelectRowsData();
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];
    auths.push("TYP_CATE|");
    auths.push(row["name"]);
    auths.push(",");
  }
  return auths.join('');
}

/*
  弹出的选择用户页面返回时的响应
*/
efform_onPopupReturn = function(eform, rows){     
  var grid = efgrid.getGridObject( "ef_grid_r" ); 
  var tempArray = new Array();
  
  	var _rowCount = grid.getBlockData().getRows().length;
  
  	var allRecords = [];
	for( var _count=0; _count < _rowCount; _count++ ) 
	{
		allRecords.push( grid.getRowData( _count ) );
	}
  
  for( i = 0;i<rows.length;i++ ){
  	
  	var _row = rows[i];    
    var uc = {};
    uc.clazz = _row["clazz"];
    uc.clazzName = _row["className"];
    uc.identity = _row["id"];
    uc.desc = _row["name"];
  	
  	var _exist = false;
    for( j = 0;j<allRecords.length;j++ )
    {
      var _record = allRecords[j];
      if ( _record.identity == _row["id"] )
      {
		_exist = true;
		break;
      }
    }    
    if( !_exist )tempArray.push(uc);    
  }  
  grid.addRowData(tempArray, false );
  
}

/*
  目录grid的第三列显示控制与响应
*/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
  if( grid_id =="ef_grid_p" && col_index == 1){
    var grid = efgrid.getGridObject( "ef_grid_p" );
    var lb = grid.getCellValue(row_index, 1, TYPE_FIX);  
    return "\<div align='center'><a href='javascript:void(0)' onclick='showAuthorization(\"TYP_CATE\", \""+ lb +"\" )'>&nbsp;"+getI18nMessages("label.EFShow","查看")+"&nbsp;</a></div>" ;			  
  }
}

showAuthorization = function (type, target){
  document.getElementById("inqu_status-target").value=target;  
  document.getElementById("inqu_status-type").value=type;  
  efgrid.submitInqu( "ef_grid_c", "ew","EW50","initQuery");
}
