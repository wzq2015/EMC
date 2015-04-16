button_query_onclick = function () 
{
	 if (efvalidateDiv("ef_region_inqu")) 
 	{
      	efgrid.submitInqu("ef_grid_result","el","EL02","query");		
 	}     
}

ajax_callback = {
		onSuccess : function(eiInfo) {			
			alert(efform.getMsg());
		},
		onFail : function(eMsg) {
			alert(efform.getMsg());
		}
	}
	
function efgrid_onRowClicked( grid_id, row_index ) {
	if(grid_id == "_ef_grid_subgrid")
	{
		ef.get("inqu_status-0-nodeType").value=efgrid.getGridObject(grid_id).getRowData(row_index)["type"];
	}
}

openSubGrid = function ()
{
  var inInfo = new EiInfo();
  //设置查询条件
  inInfo.setByNode("ef_div_inqu");
  
  var bindingInputId = "inqu_status-0-nodeURL";
  var serviceName = "EP14";
  var queryMethod = "queryNode";
  
  EiCommunicator.send(serviceName, queryMethod, inInfo);
  if (ajaxEi == null) return;
  
  var subGridColumn = new efSubgridColumn();
  var eiColumn = new EiColumn(bindingInputId);
  
  //指定数据返回块
  eiColumn.blockName = "node_result";
  
  subGridColumn.setEiMeta({}, eiColumn);
  subGridColumn.set("serviceName", serviceName);
  subGridColumn.set("queryMethod", queryMethod); 
  
  //预选定的列名称
  subGridColumn.set("valueProperty", "ip");
     
  var div = efform.getSubGridDiv();
  div.efDisplayCol = subGridColumn;
  efform.showSubGridWindow(bindingInputId, ajaxEi);
  }
  
  
  efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
         var grid = efgrid.getGridObject( "ef_grid_result" );
         var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
         var name=grid.getCellValue(row_index,0,TYPE_DATA);     
         if(columnEname=="archive"){ 
         	  name = name.replace(/\\/g,"\\\\");         	       	  
              return "<div align='center' efval=''><input value='"+getI18nMessages("label.archivelog","归档")+"' class='buttonclass' type='button' align='center' onclick='archiveLog(\""+name+"\")'></div>" ;
          }         
       }
}

function archiveLog(fileName)
{		
	if(isAvailable(fileName))
	{
	var eiinfo = new EiInfo();
	eiinfo.set("soaRemoteTarget",ef.get("inqu_status-0-nodeURL").value);	
	eiinfo.set("fileName",fileName);
	eiinfo.set("nodeType",ef.get("inqu_status-0-nodeType").value);
	EiCommunicator.send("EL02","archiveLogRemote",eiinfo,ajax_callback);	
	}
	else
	{
		EFAlert(getI18nMessages("label.NoArchivelogFile","没有任何可归档的日志文件！"));
	}
}



