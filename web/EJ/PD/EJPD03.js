/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ej","EJPD03","query");
}


/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{

    if(confirm(getI18nMessages("label.EJPDConfirmDeleteJobHistory","此次操作将删除该作业日志，要继续吗？"))){
  	   efgrid.submitForm( "ef_grid_result", "ej","EJPD03","delete", true );
  	}
}

efcalendar_click = function(control,id)
{
	var node = ef.getNodeById(id);
	efcalendar(control, node, 'yyyymmdd', true);
}

/**/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
         var grid = efgrid.getGridObject( "ef_grid_result" );
         var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
         var jobCode=grid.getCellValue(row_index,2,TYPE_FIX);
         var jobParams = grid.getCellValue(row_index,0,TYPE_DATA,true);           
         if(columnEname=="reStrart"){          	  
              return "<div align='center' efval=''><input value='"+getI18nMessages("label.EJPDRestart","重新执行")+"' class='buttonclass' type='button' align='center' onclick='showWindowOfEJAC02(\""+jobCode+"\",\""+jobParams+"\")'></div>" ;
          }
        
       }
}


/**	重新运行*/

showWindowOfEJAC02 = function(jobCode,jobParams){

    var inInfo = new EiInfo();
    inInfo.set("jobEname", jobCode);
    inInfo.set("jobParams",jobParams);
    inInfo.set("restartFlag","1");    
    EiCommunicator.send( "EJPD00", "excute" , inInfo, null );
}


