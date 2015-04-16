efform_onload = function() { 
   var value=ef.get("inqu_status-0-iplattag").value;
   if(value=="false")
   {
   ef.get("inqu_status-0-userId").readOnly=true;
   ef.get("inqu_status-0-pageNo").readOnly=true;
   }
}
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ed","EDSQ02","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDSQ02","delete", true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDSQ02","update",true );
}
/*
   载入查询条件成功后则，将返回的eiInfo回传给父页面，如果失败则弹出failure框
*/
load_callback = {
      onSuccess : function(eiInfo){ 
              if (!window.opener.closed) {
                 window.opener.efform_onPopupReturn("EDSQ02", eiInfo);	
               }
                   window.close();
               },
      onFail   : function(eMsg){
                     alert("failure");
                  }
    }
/*
   点击载入查询条件按钮后调用后台的service
*/
button_load_onclick=function()
{
     var grid=efgrid.getGridObject("ef_grid_result");  
     var num=grid.getCheckedRowCount();
     
     if(num>1){
        alert("只能选择一个查询条件");
     }else if(num<1){
        alert("请选择查询条件");
     }else if(num==1){
     var rows=grid.getCheckedRows();
     var searchSeq=grid.getCellValue(rows[0],0,TYPE_DATA,true);
      var info = new EiInfo();
     info.set("searchSeq",searchSeq);
      EiCommunicator.send("EDSQ02","getSearch",info,load_callback,false,true);

     }
}
/*
  点击查询条件名的grid某一行记录，调用后台的service，显示查询条件的详细
*/
function efgrid_onRowClicked( grid_id, row_index )
{
    if( grid_id == "ef_grid_result" )
	{
	    grid = efgrid.getGridObject("ef_grid_result");
	   var searchSeq=grid.getCellValue(row_index,0,TYPE_DATA,true);
       ef.get("table_inqu_status-0-searchSeq").value = searchSeq; 
       efgrid.submitInqu( "ef_grid_result1", "ED", "EDSQ02","getSearchInfo"); 
	}	
}





