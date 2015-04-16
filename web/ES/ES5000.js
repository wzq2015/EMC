var appTreeModel =  new eiTreeModel('ESUTTR21');
var menuTreeModel =  new eiTreeModel('EDPI12');

efform_onload = function () {
  efregion.show("ef_region_page");
  efregion.show("ef_region_elem");
}

button_f2_onclick = function() 
{  
  efgrid.submitInqu( "ef_grid_p", "es","ES41","query");
}

button_f4_onclick = function() 
{
  efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
}

button_f5_onclick = function() 
{
  var sel = getSelection();
  if ( sel == "" ){
    alert( getI18nMessages("label.ESPleaseSelectPagesOrButtonsToAuth","请选中需要授权的页面或按钮!") );
    return;
  }
  document.getElementById("inqu_status-0-authorize").value = sel;    
  efgrid.submitForm( "ef_grid_r", "es","ES50","insert", true );  
  var page_grid = efgrid.getGridObject("ef_grid_p");
  var elem_grid = efgrid.getGridObject("ef_grid_e");
  page_grid._clearSelect();
  elem_grid._clearSelect();
  page_grid.refresh(); 
  elem_grid.refresh(); 	
}

button_f6_onclick = function(){
	var grid = efgrid.getGridObject("ef_grid_r");
	var rowLength = grid.getCheckedRows().length;
	for(i=rowLength-1;i>=0;i--){
		grid.removeRow(grid.getCheckedRows()[i]);
	}
	grid.refresh();	
	efform.setStatus(0,rowLength+getI18nMessages("label.ESRowsHasDeletedSuccess","条记录删除成功!"));
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
  efgrid.submitForm( "ef_grid_c", "es","ES50","delete", true );
}

function getSelection(){
  var auths = [];
  var page_grid = efgrid.getGridObject("ef_grid_p");
  var elem_grid = efgrid.getGridObject("ef_grid_e");
  var rows = page_grid.getSelectRowsData();
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];
    auths.push("TYP_PAGE|");
    auths.push(row["label"]);
    auths.push(",");
  }
  rows = elem_grid.getSelectRowsData();
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];
    auths.push("TYP_ELEM|");
    var pg = document.getElementById("inqu_status-0-page").value;
    auths.push( pg +"." + row["label"]);
    auths.push(",");
  }  
  return auths.join('');
}

function efgrid_onAjaxSubmitSuccess( grid_id, service_name, method_name, eiInfo ){
  if ( grid_id != "ef_grid_r" ){
    var ef_grid = efform.getGrid( grid_id );	 
    ef_grid.refresh( eiInfo );
  }
}

efgrid_onRowClicked = function (id ,row_index){
  var grid = efgrid.getGridObject(id);
  if ( id == "ef_grid_p" ){     
    var cell_value = grid.getCellValue( row_index, 1, TYPE_FIX );
    document.getElementById("inqu_status-0-page").value=cell_value; 
    efgrid.submitInqu( "ef_grid_e", "es","ES42","query");
  }
}

efform_onPopupReturn = function(eform, rows){     
  var grid = efgrid.getGridObject( "ef_grid_r" ); 
  var tempArray = new Array();
//  for( var i=0; i<rows.length; i++ ){
//    var row = rows[i];  
//    var uc = {};
//    uc.clazz = row["clazz"];
//    uc.clazzName = row["className"];
//    uc.identity = row["id"];
//    uc.desc = row["name"];
//    tempArray.push(uc);
//  }
  
  //var allRecords = grid.getSelectRowsData();
  
  	var _rowCount = grid.getBlockData().getRows().length;
  
  	var allRecords = [];
	for( var _count=0; _count < _rowCount; _count++ ) 
	{
		allRecords.push( grid.getRowData( _count ) );
	}
  
  //var allRecords = grid.getBlockData().getRows();
  
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
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
  if( grid_id =="ef_grid_p" && col_index == 1){
    var grid = efgrid.getGridObject( "ef_grid_p" );
    var lb = grid.getCellValue(row_index, 1, TYPE_FIX);  
    return "\<div align='center'><a href='javascript:void(0)' onclick='showAuthorization(\"TYP_PAGE\", \""+ lb +"\" )'>&nbsp;"+getI18nMessages("label.EFShow","查看")+"&nbsp;</a></div>" ;			  
  }
  if( grid_id =="ef_grid_e" && col_index == 1){
    var grid = efgrid.getGridObject( "ef_grid_e" );
    var lb = grid.getCellValue(row_index, 1, TYPE_FIX);
    var pg = document.getElementById("inqu_status-0-page").value;
    var full = pg + "." + lb;
    return "\<div align='center'><a href='javascript:void(0)' onclick='showAuthorization(\"TYP_ELEM\", \""+ full +"\" )'>&nbsp;"+getI18nMessages("label.EFShow","查看")+"&nbsp;</a></div>" ;			  
  }  
}

showAuthorization = function (type, target){
  document.getElementById("inqu_status-target").value=target;  
  document.getElementById("inqu_status-type").value=type;  
  efgrid.submitInqu( "ef_grid_c", "es","ES50","query");
}

/* Tree Related Stuffs */

function configAppTree(tree){
  tree.nodeInitializer = appTreeNodeInitializer;
}

function appTreeNodeInitializer(node){  
  if ( node.top() ){ node.open(true); return; };  
  node.textClicked = function(){ appTreeNodeClicked( node ); };
}

function appTreeNodeClicked(node){
   var grid = efgrid.getGridObject( "ef_grid_p" ); 
   grid.serviceName = "ES41";
   document.getElementById("inqu_status-0-parent").value=node.label();  
   efgrid.submitInqu( "ef_grid_p", "es","ES41","query");
}

function configMenuTree(tree){
  tree.nodeInitializer = menuTreeNodeInitializer;
}

function menuTreeNodeInitializer(node){  
  if ( node.top() ){ node.open(true); return; };  
  node.textClicked = function(){ menuTreeNodeClicked( node ); };
  if ( node.leaf() ){
    node.show(false);
  }
}

function menuTreeNodeClicked(node){
   var grid = efgrid.getGridObject( "ef_grid_p" ); 
   grid.serviceName = "EDPI20";
   document.getElementById("inqu_status-0-pnode").value=node.label();  
   efgrid.submitInqu( "ef_grid_p", "es","EDPI20","query");
}


