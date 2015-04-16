efform_onload = function ()
{
 efregion.show("ef_region_result")
}

/*
  文章数目超链接
*/
efgrid_onDataCellClick = function( ef_grid_result, row_index, col_index, cell_value ) {
      var grid=efgrid.getGridObject("ef_grid_result");
      var columnEname = grid.getColumn(0, TYPE_DATA).getEname();
      var value=grid.getCellValue(row_index,0,TYPE_DATA,true); 
      var columnid=grid.getCellValue(row_index,1,TYPE_DATA,true); 
    
      //alert(value);
  if (columnEname=="articleTitle"){
      var objId = value;
     //alert(objId+"+++"+value);
	  var nodeType="a";
	  var info = new EiInfo();
	  info.set("artId",objId);
	  EiCommunicator.send( "ECTM10", "getUrl" , info, null );
	  url=ajaxEi.get("url");
	  efform.openNewForm('ECTM40',"key="+url);
	  //efform.openNewForm('ECTM40',"nodeId="+objId+"&nodeType="+nodeType+"&templateType=3");

      }
}