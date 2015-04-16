var portletType,portletId;
efform_onload = function (){
	var eiInfo=_getEi();
	portletId=eiInfo.get("portletId");
	portletType=eiInfo.get("portletType");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ev","EVCM09","delete", true,false); 	
}

/*
  点击新增按钮后调用后台的serviceECSM
*/
button_insert_onclick = function () 
{ 
  	var grid=efgrid.getGridObject("ef_grid_result");
  	var blockData = grid.getBlockData();
    var rows=grid.getCheckedRows();
    if(rows.length<1){
     	alert("请选中一条记录");
     	return;
    }
    else
    {
		for (var i = 0; i < grid.getRowCount(); i++ ) {
			if ( grid.isRowChecked(i) ) {
		    	var row=blockData.getRows()[i];
		    	row[0]=portletType;
		    	row[1]=portletId;
		    	for(var j=0; j< grid.getRowCount(); j++)
		    	{
		    		var rj=blockData.getRows()[j];
		    		if((j!=i)&&(rj[2]==row[2]))
		    		{
		    			alert("参数名称不能重复");
		    			return;
		    		}
		    	}
		    }
	    }
	}
	efgrid.submitForm( "ef_grid_result", "ev","EVCM09","insert",true );
	//EiCommunicator.send( "ECTM10", "getUnitTypeCode" , info, null);
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ev","EVCM09","update",true );
}