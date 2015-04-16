var typeMgrLabelCol = 2;
var compLabelCol = 3;
var compValueCol = 4;

efform_onload = function () {
  efbutton.setButtonStatus("F7", false);
  efbutton.setButtonStatus("F9", false);
  renderTypeGrid();
}

renderTypeGrid = function (){
  var idCol = new Object();
  idCol.name = "id"; 
  idCol.visible = false;
   
  var labelCol = new Object();
  labelCol.name = "label"; 
  labelCol.visible = false;
  
  var nameCol = new Object();
  nameCol.name = "name"; 
  nameCol.visible = false;
  
  var ctxCol = new Object();
  ctxCol.name = "context";
  ctxCol.editor = "combo";
  ctxCol.sourceName = "source";
  ctxCol.attr = {"source":[{"value":"1","label":"AND"},{"value":"0","label":"OR"} ],"enable":true};
  ctxCol.blockName = "result";
  ctxCol.valueProperty = "label";
  ctxCol.labelProperty = "name";
  ctxCol.primaryKey = true;
       
  var tpmgCol = new Object();
  tpmgCol.name = "typemgr";
  tpmgCol.editor = "combo";
  tpmgCol.sourceName = "source";
  tpmgCol.attr = {"source":[{"value":"","label":"请选择"}],"enable":true};
  tpmgCol.blockName = "result";
  tpmgCol.valueProperty = "label";
  tpmgCol.labelProperty = "name";
  tpmgCol.readonly = true;
  tpmgCol.primaryKey = true;
 
  var typemgrNameCol = new Object();
  typemgrNameCol.name = "typemgrName"; 
  typemgrNameCol.visible = false;
 
  var compCol = new Object();
  compCol.name = "comparator";
  compCol.editor = "combo";
  compCol.sourceName = "source";
  compCol.attr = {"source":[{"value":"","label":"请选择"}],"enable":true};
  compCol.blockName = "result";
  compCol.valueProperty = "name";
  compCol.labelProperty = "displayName";
  compCol.primaryKey = true;
 
  var compNameCol = new Object();
  compNameCol.name = "comparatorName"; 
  compNameCol.visible = false;

 
  var compValueCol = new Object();
  compValueCol.name = "value"; 
  compValueCol.column = getCompValueColumn();
  compValueCol.primaryKey = true;
 
 
  var compValueDisplayCol = new Object();
  compValueDisplayCol.name = "valueDisplay"; 
  compValueDisplayCol.visible = false;
 
  var customCols = {"index":{"id":0, "label":1, "name":2, "context":3, "typemgr":4, "typemgrName":5, "comparator":6, "comparatorName":7, "value":8, "valueDisplay":9 }};
  var colMetas = new Array();
  colMetas.push(idCol);
  colMetas.push(labelCol);
  colMetas.push(nameCol);
  colMetas.push(ctxCol);
  colMetas.push(tpmgCol);
  colMetas.push(typemgrNameCol);
  colMetas.push(compCol);
  colMetas.push(compNameCol);
  colMetas.push(compValueCol);
  colMetas.push(compValueDisplayCol);
  customCols.metas = colMetas;
 
  var __grid_result = new efgrid( "result","ef_grid_p" );
  var local_ei = new EiInfo();
  var block = new EiBlock("result");
  local_ei.addBlock(block);  
  __grid_result.setEnable(true);
  __grid_result.setReadonly(false);
  __grid_result.setAjax(true);  
  __grid_result.setAutoDraw(true);
  __grid_result.setServiceName("ES64");
  __grid_result.setQueryMethod("query");
  __grid_result.setStyle({});   
  __grid_result.setData(local_ei);
  __grid_result.setCustomColumns(customCols);  
  __grid_result.paint();
  efgrid.submitInquWithMeta( "ef_grid_p", "es","ES64","query" );  
  
  __grid_result.paint();
}


button_f2_onclick = function() 
{
	efgrid.submitInqu( "ef_grid_r", "es","ES63","query");
}

button_f4_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES63","insert",true );	
}

button_f5_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES63","update", true );
}

button_f6_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_r", "es","ES63","delete", true );
}

button_f7_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_p", "es","ES64","insert", true );
}

button_f9_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_p", "es","ES64","delete", true );
}

efgrid_onRowClicked = function( grid_id, row_idx ){  
  if ( grid_id == "ef_grid_r" ){
    efbutton.setButtonStatus("F7", true);
    efbutton.setButtonStatus("F9", true);
    var grid = efgrid.getGridObject( grid_id );
    var row= grid.getRowData(row_idx); 
    document.getElementById("inqu_status-0-restriction").value=row['label'];  
    efgrid.submitInqu( "ef_grid_p", "es","ES64","query");
  }  
}



efgrid_onFixCellDisplayReady = function( div_node_html, row_index,col_index, cell_value, display_value, grid_id )
{
    var grid = efgrid.getGridObject( grid_id );
    if ( grid_id == "ef_grid_r" || grid.isNewLine( row_index )){
      return div_node_html;
    }

	if( col_index == typeMgrLabelCol && isAvailable(cell_value) )
	{	    
	    var cell_value = grid.getCellValue( row_index, 3, TYPE_DATA, true );	    
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;
		div_node.firstChild.innerText = cell_value;		
		return div_node.innerHTML;
	}
	if( col_index == compLabelCol && isAvailable(cell_value) )
	{
	    var cell_value = grid.getCellValue( row_index, 4, TYPE_DATA, true );	    
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;
		div_node.firstChild.innerText = cell_value;		
		return div_node.innerHTML;
	}
    if( col_index == compValueCol && isAvailable(cell_value) )
	{
	    var cell_value = grid.getCellValue( row_index, 5, TYPE_DATA, true );	    
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;
		div_node.firstChild.innerText = cell_value;		
		return div_node.innerHTML;
	}	
	return div_node_html;	
}

efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index, col_index, data_type )
{
    if ( grid_id == "ef_grid_r" ){ return; }
	var grid = efgrid.getGridObject( grid_id );	
	if( col_index == typeMgrLabelCol && data_type == TYPE_FIX )
	{
		loadTypeMgr( row_index );
	}
	
	if( col_index == compLabelCol && data_type == TYPE_FIX )
	{
	  var typeMgr = grid.getCellValue( row_index, typeMgrLabelCol, TYPE_FIX  );
	  loadComparator( row_index, typeMgr );
	}
	if( col_index == compValueCol && data_type == TYPE_FIX )
	{
	  getCompValueColumn().rowIndex = row_index;
	}		
}



efgrid_onDataCellSaved = function( grid_id, row_index, col_index, cell_value )
{  
    if ( grid_id == "ef_grid_r" ){ return; } 
	var grid = efgrid.getGridObject( grid_id );
	if( col_index == compValueCol  )
	{
		grid.setCellValue( row_index, compValueCol, cell_value, TYPE_FIX  );
		grid.refreshCell( row_index, compValueCol, TYPE_FIX );
	}	
}

loadTypeMgr = function( row_index ) 
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{ 
				loadTypeMgr_callback( row_index, eiInfo );
    		},
  		onFail: 
    		function(eMsg) 
			{
    			alert("Error:" + eMsg);
			}
	}; 	
	var ei_info = new EiInfo();		
	EiCommunicator.send( "ES60", "query" , ei_info, ajax_callback );
}


loadTypeMgr_callback = function( row_index, eiInfo )
{
	var block = eiInfo.getBlock( "result" );
	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
		return;
	}
	var grid = efgrid.getGridObject( "ef_grid_p" );
	var column = grid.getColumn( typeMgrLabelCol, TYPE_FIX );	
	column.prepareData( eiInfo );
	
	grid.setCellValue( row_index, typeMgrLabelCol, "", TYPE_FIX  );
	grid.refreshCell( row_index, typeMgrLabelCol, TYPE_FIX );
}


loadComparator = function( row_index, typeMgr ) 
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{ 
				loadComparator_callback( row_index, eiInfo );
    		},
  		onFail: 
    		function(eMsg) 
			{
    			alert("Error:" + eMsg);
			}
	}; 	
	var ei_info = new EiInfo();	
	ei_info.setByNameValue( "inqu_status-0-typemgr", typeMgr );	
	EiCommunicator.send( "ES70", "query" , ei_info, ajax_callback );
}

loadComparator_callback = function( row_index, eiInfo )
{
	var block = eiInfo.getBlock( "result" );
	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
		return;
	}
	var grid = efgrid.getGridObject( "ef_grid_p" );
	var column = grid.getColumn( compLabelCol, TYPE_FIX );	
	column.prepareData( eiInfo );
	
	grid.setCellValue( row_index, compLabelCol, "", TYPE_FIX  );
	grid.refreshCell( row_index, compLabelCol, TYPE_FIX );
}

loadType = function( row_index, typeMgr ) 
{
    var types = {};
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{ 
				types = loadType_callback( row_index, eiInfo );
    		},
  		onFail: 
    		function(eMsg) 
			{
    			alert("Error:" + eMsg);
    			return {};
			}
	}; 	
	var ei_info = new EiInfo();	
	ei_info.setByNameValue( "inqu_status-0-parent", typeMgr );	
	EiCommunicator.send( "ES61", "query" , ei_info, ajax_callback );
	return types;
}

loadType_callback = function( row_index, eiInfo )
{  	
    var ret = {};
	var block = eiInfo.getBlock( "result" );	
	if( isAvailable( block ) )
	{
	  var rows = block.getMappedRows();
	  for( var i=0; i<rows.length; i++ ){
	    var row = rows[i];
	    ret[row.id]=row.name;
	  }
	}	
    return ret;
}

efCustomColumn = function() {
	efColumn.call( this );
	
	this.rowIndex = -1;
	this.dataType = 0; // 0, 1- input, 2 - combo, 3 -date
	this.comboValue = {};
}
efCustomColumn.prototype = new efColumn;
efCustomColumn.prototype.getEditNodeValue = function( node ){
  switch( this.dataType ){
    case 1:
      if( node.selectedIndex<0 )
		return node.options.length>0 ? node.options[0].value: "";
      else
	    return node.options[node.selectedIndex].value;
      break;
      
    default:
      return node.value;
      break;   
  
  }  
}
efCustomColumn.prototype.getFormattedDisplay = function( value, label ){
  switch( this.dataType ){
    case 1:
      return this.comboValue[value];
      break;      
    default:
      return value;
      break;
  }    
}

efCustomColumn.prototype.getEditNodeHtml = function( div_node, value ) {
  var grid = efgrid.getGridObject( "ef_grid_p" );
  var typeMgr = grid.getCellValue( this.rowIndex, typeMgrLabelCol, TYPE_FIX  );
  var ret = loadType(this.rowIndex, typeMgr);
  
  if ( efutils.isEmpty(ret)  ){
    this.dataType = 2;
    return inputInnerHtml();
  } else {
    this.dataType = 1;
    this.comboValue = ret;
    return selectInnerHtml(ret);
  }   
}

selectInnerHtml = function(options)
{
  var opts = [];
  for( var key in options ){       
    opts.push( "<option value='" + key + "' " + ">" + options[key] + "</option>" );
  }  
  var innerHtml = "<select class='pulldown'>" + opts.join("") + "</select>";
  return innerHtml;
}

inputInnerHtml = function()
{
  	var inner_html = "<input type='text' class='inputField' " + 
  		"onchange = 'efgrid.cellChange();' value='" + "" + "'/>";

	return inner_html;
}

var compValueColumn = new efCustomColumn();
getCompValueColumn = function(){
  return compValueColumn;
}

