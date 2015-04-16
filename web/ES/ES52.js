efform_onload = function () {
  efregion.show("ef_region_result");
  efregion.show("ef_region_page");
  efgrid.submitInqu( "ef_grid_p", "es","ES52","query");
}

efgrid_onRowClicked = function (id ,row_index){
  var grid = efgrid.getGridObject(id);  
  if ( id == "ef_grid_p" ){
    var cell_value = grid.getCellValue( row_index, 0, TYPE_DATA );
    document.getElementById("inqu_status-0-behavior").value=cell_value; 
    efgrid.submitInqu( "ef_grid_c", "es","ES52","queryAuth");
  }
}

button_f4_onclick = function() {
  efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
}

button_f6_onclick = function(){
	var grid = efgrid.getGridObject("ef_grid_r");
	var rowLength = grid.getCheckedRows().length;
	for(i=rowLength-1;i>=0;i--){
		grid.removeRow(grid.getCheckedRows()[i]);
	}
	grid.refresh();	
	efform.setStatus(0,"删除"+rowLength+"条记录成功!");
}

button_f5_onclick = function() 
{
  var sel = getSelection();
  if ( sel == "" ){
    alert( "请选中需要授权的权限!" );
    return;
  }
  document.getElementById("inqu_status-0-behaviors").value = sel;    
  efgrid.submitForm( "ef_grid_r", "es","ES52","grant", true );    	
}

button_f7_onclick = function() 
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

button_f8_onclick = function() 
{
  efgrid.submitForm( "ef_grid_c", "es","ES52","revoke", true );
}

efform_onPopupReturn = function(eform, rows){     
  var grid = efgrid.getGridObject( "ef_grid_r" ); 
  var tempArray = new Array();
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];  
    var uc = {};
    uc.clazz = row["clazz"];
    uc.clazzName = row["className"];
    uc.identity = row["id"];
    uc.desc = row["name"];
    tempArray.push(uc);
  }
  grid.addRowData(tempArray, false );
  
}

function efgrid_onAjaxSubmitSuccess( grid_id, service_name, method_name, eiInfo ){
  if ( grid_id != "ef_grid_r" ){
    var ef_grid = efform.getGrid( grid_id );	 
    ef_grid.refresh( eiInfo );
  }
}

function getSelection(){
  var auths = [];
  var page_grid = efgrid.getGridObject("ef_grid_p");
  var rows = page_grid.getSelectRowsData();
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];
    auths.push(row["label"]);
    auths.push(",");
  }  
  return auths.join('');
}



