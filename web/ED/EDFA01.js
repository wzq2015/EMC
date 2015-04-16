
button_f2_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ed","EDFA01","query");

//	efbutton.setButtonStatus("B1", true);
//	
//	alert("1");
//	efbutton.setButtonStatus("B1", false);
//	
//	alert("2");
//	efbutton.setButtonStatus("B1", true);
//	alert("3");
};

button_generatei18nresources_onclick = function ()
{
	var info = new EiInfo(); 
	info.setByNodeObject( document.forms[0] );
	EiCommunicator.send("EDFA01", "generateI18nResources", info, null);
};

button_f3_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA01","update",true );
}

button_f4_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDFA01","delete", true );
}

button_f5_onclick = function ()
{
  //efgrid.submitForm( "ef_grid_result", "ed","EDFA01","synchronizeEpass", true );
	if(confirm('确定要设置所有按钮能授权吗？'))
		efgrid.submitForm( "ef_grid_result", "ed","EDFA01","authAll", true );
	else 
		return null;	
} 

//设置是否"授权"属性
setAuth = function(row_index, col_index, flage){

	var grid = efgrid.getGridObject("ef_grid_result");

	if(flage){
		grid.setCellValue(row_index, col_index, 'true',TYPE_DATA);
	}else{
		grid.setCellValue(row_index, col_index, 'false',TYPE_DATA);	
	}
}
setAllAuth = function (node){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(i=0;i<=grid.getRowCount()-1;i++){
		grid.getBlockData().setCell(i,"is_auth",node.checked+"");
	}
	grid.refresh();
}



efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
  //多Grid时的检验
  if (grid_id != "ef_grid_result") return;
  var grid = efgrid.getGridObject( grid_id );
  if(!grid.getColumn(col_index, TYPE_DATA))
	  return;
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();


  switch (columnEname) {

       
     case "is_auth":
       //设置对”授权“属性checkbox
       var html = "";
       if (display_value == 'true'){
         html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setAuth("+row_index+","+col_index+",this.checked);'/></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setAuth("+row_index+","+col_index+",this.checked)'/></div>";
       }
       return html;  
       break;    
  }
}

button_f6_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA01","insert",true );
}

button_export_onclick = function () 
{
      efgrid.submitInqu( "ef_grid_result", "ed","EDFA01","export");
      efbutton.setButtonStatus("export", true);
}

efcalendar_1_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-rec_create_time");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

var fkey = "";

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( grid_id == "ef_grid_result" )
	{
	   var grid = efgrid.getGridObject(grid_id); 	
  	   var formEnameColumn = grid.getTFCellValue( row_index, 1 );
  	   var buttonEnameColumn = grid.getTFCellValue( row_index, 2 );
  	   fkey = formEnameColumn+"."+buttonEnameColumn;
       ef.get("inter_inqu_status-0-fkey").value = "E_Btn." + fkey;
       efgrid.submitInqu( "ef_grid_inter", "ed", "EDFA01","queryInter");
	}
}

efgrid_onAddNewRow = function( grid_id )
{
  if(grid_id == "ef_grid_inter" )
  {
  	var grid = efgrid.getGridObject(grid_id); 	
  	var fproviderkeyColumn = grid.getInvisibleColumn( 0, TYPE_FIX );
	fproviderkeyColumn.set("defaultValue", "message");
	var fKeyColumn = grid.getColumn(1, TYPE_FIX);
	fKeyColumn.set("defaultValue", "E_Btn." + fkey);
	fKeyColumn.set("enable", false);
  }
}

button_f7_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter", "ed","EDFA01","insertInter",true );
}

button_f8_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter", "ed","EDFA01","updateInter",true );
}

button_f9_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter", "ed","EDFA01","deleteInter",true );
}

button_generate_onclick = function ()
{
	if(fkey == "")
	{
		alert("请选择一个按钮");
	}
	else
	{
	   ef.get("inter_inqu_status-0-fkey").value = fkey;
       efgrid.submitForm( "ef_grid_inter", "ed", "EDFA01","generateInter",true);
	}
}