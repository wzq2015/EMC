var method = "";
efform_onload = function ()
{
  efregion.show("ef_region_result");
  efform.hideFormHead();
  ef.get("inqu_status-0-title").value = ef.get("titleData").value.trim();
}
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "eu","EUAF16","query");
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var id = grid.getCellValue(row_index,0,"", true);
	var href = "DispatchAction.do?efFormEname=EUAF14";
	if(col_index ==4 ){
	    if("" != id) {
	    	return "\<input value='内容' class='buttonClass' type='button' onclick=' toPage(\""+id+"\")'>" ;
	    }else{
	    	return "";
	    }
	}
}
function toPage(id){
	if(id == 0)return ;
	var href = "DispatchAction.do?efFormEname=EUAF14&method=search&nodeVal="+id;
	window.parent.document.getElementById('rightFrame').src = href ;
	window.parent.document.getElementById('inqu_status-0-search_data').value = "";
}