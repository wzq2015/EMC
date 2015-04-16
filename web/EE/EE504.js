button_search_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_r", "ee","EE504","query");
}

button_insert_onclick = function ()
{

	efgrid.submitForm( "ef_grid_r", "ee","EE504","insert",true );
}
button_update_onclick = function ()
{

	efgrid.submitForm( "ef_grid_r", "ee","EE504","update",true );
}
button_delete_onclick = function ()
{

  	efgrid.submitForm( "ef_grid_r", "ee","EE504","delete", true );
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  if( col_index == 4 ){
    return "\<input value='bean2Str' class='buttonClass' type='button' onclick='showTeleStr("+ row_index + ","+ col_index +" )'>" ;
  }
  if(col_index == 5){
    return "\<input value='block2Str' class='buttonClass' type='button' onclick='showTeleStr("+ row_index + ","+ col_index +" )'>" ;
  }
}

showTeleStr = function( i, j ){

	ajax_onclick(i,j);
}

ajax_onclick = function (i,j)
{
	  var info = new EiInfo();
	  info.set("row",i);
	  info.set("col",j);
      EiCommunicator.send( "EE504", "getTeleStr", info, ajax_onclick_callback  );
}

var ajax_onclick_callback = {
  onSuccess :
    function(eiInfo){
		document.getElementById("teleStr").innerHTML = eiInfo.get("teleStr");
    },
  onFail    :
    function(eMsg) {
      alert("failure");
    }
}


