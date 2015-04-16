/**
  *表头信息查询
  */
button_query_onclick = function () 
{   
	efgrid.submitInqu( "ef_grid_result", "ed","EDDBT0","query");
	
}


/**
  *表头信息新增
  */
button_insert_onclick = function () 
{       
     efgrid.submitForm( "ef_grid_result", "ed","EDDBT0","insert",true);
}


/**
  *删除表头信息
  */
button_delete_onclick = function () 
{	
    var flag=deleteCheck();
    if ( flag==true )
  	efgrid.submitForm( "ef_grid_result", "ed","EDDBT0","delete", true );
  	else
  	efgrid.submitInqu( "ef_grid_result", "ed","EDDBT0","query");
}

/**
  *完全删除表头信息--在删除表头的同时删除表头对应的信息项信息
  */
button_cmpdelete_onclick = function () 
{	
    var flag = deleteCheck();
    if ( flag == true )
  	efgrid.submitForm( "ef_grid_result", "ed","EDDBT0","cmpdelete", true );
  	else
  	efgrid.submitInqu( "ef_grid_result", "ed","EDDBT0","query");
}

/**
  *更新表头信息
  */
button_update_onclick = function () 
{  
   var flag = updateCheck();
   if ( flag == true )
   efgrid.submitForm( "ef_grid_result", "ed","EDDBT0","update", true ); 
   else
   efgrid.submitInqu( "ef_grid_result", "ed","EDDBT0","query");
}

/**
 * 将表导入成模型
 */
button_import_onclick = function () 
{  
  var flag = importCheck();
  if ( flag == true )
  efgrid.submitForm( "ef_grid_result", "ed","EDDBT0","importTable", true ); 
  else
  efgrid.submitInqu( "ef_grid_result", "ed","EDDBT0","query");
}


/**
  * 检查要更新的表是否为引用表
  * 检查要更新的表是否被别的表引用
  * 检查要更新表英文名时，要更新的表是否被别的表引用，如果是模板表是否在表体信息维护中被使用
  */
updateCheck = function (){
   
    var flag= true; 
    var grid = efgrid.getGridObject("ef_grid_result");
    var rows = grid.getCheckedRows();
    var referProjectEname ;
	var newTableEname ;
	var projectEname ;
	var tableEname ;
	
    for( var i=0; i< rows.length;i++ ){
	    referProjectEname = grid.getRowData(rows[i]).referProjectEname;
	    newTableEname = grid.getRowData(rows[i]).newTableEname;
	    projectEname = grid.getRowData(rows[i]).projectEname;
	    tableEname = grid.getRowData(rows[i]).tableEname;
      
        if(referProjectEname.trim() !="" )
         {
           alert("要修改的第"+(i+1)+"个表是引用表 ，不能修改！");
           flag = false;
           break;
         }
        else if(newTableEname.trim() == ""){
            //如果表是被引用的表则不能修改；模板表如果没有被引用，但是在表体信息维护中被使用，仍然可以修改
         	var eiinfo = new EiInfo(); 
	    	eiinfo.set("projectEname",projectEname);
	     	eiinfo.set("tableEname",tableEname);
         	EiCommunicator.send("EDDBT0","updateCheck", eiinfo, null, false);
         	if(ajaxEi != null){
         		if( ajaxEi.get("flag")== "false" )
      	 		{
      	   	 	  alert("要修改的第"+(i+1)+"个表被别的表引用,不能修改表 ！");
      	   	 	  flag=false;
           	  	  break;
		  		}
		  	} 
		  }
        else if(newTableEname.trim() !="" ){
           //如果表是被引用的表则不能修改；如果要修改的模板表在表体信息维护中被使用，也不能修改
        	var eiinfo = new EiInfo(); 
	     	eiinfo.set("projectEname",projectEname);
	    	eiinfo.set("tableEname",tableEname);
         	EiCommunicator.send("EDDBT0","check", eiinfo, null, false);
        	if(ajaxEi != null){
        		if(ajaxEi.get("flag")=="false")
      	 	 	{
      	 	   		alert("要修改的第"+(i+1)+"个表被别的表引用,不能修改表的英文名(主键) ！");
      	   	 		flag=false;
           			break;
		   		}
		  	}
		  }           
     }
	    
  return flag;
}


/**
  * 检查要删除的表是否被别的表引用;
  * 检查要删除的模板表是否在表体中被使用
  * 
  */
deleteCheck = function (){
   
   var flag = true; 
   var grid = efgrid.getGridObject("ef_grid_result");
   var rows = grid.getCheckedRows();
   var projectEname ;
   var tableEname ;
   
   for( var i=0; i< rows.length;i++ ){
	    projectEname = grid.getRowData(rows[i]).projectEname;
	    tableEname = grid.getRowData(rows[i]).tableEname;
        var eiinfo = new EiInfo(); 
	    eiinfo.set("projectEname",projectEname);
	    eiinfo.set("tableEname",tableEname);
        EiCommunicator.send("EDDBT0","check", eiinfo, null, false);
        if(ajaxEi != null){
         	  if(ajaxEi.get("flag")=="false")
      	     {
      	       alert("要删除的第"+(i+1)+"个表被别的表引用 ！");
      	       flag=false;
               break;
		      }
		}       
    }
	    
  return flag;
}

importCheck = function (){
	var flag = true; 
	return flag;
}


/**
  *查询区域，下拉框（项目英文名下拉框和模块英文名）的联动
  *当项目英文名下拉框的选项发生变化时，模块英文名下拉框的内容随之变化
  */
function getModuleOfProject(){
     obj = document.getElementById("inqu_status-0-moduleEname"); 
     for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
      
     var projectEname = ef.get("inqu_status-0-projectEname").value;
     var eiinfo = new EiInfo();
	 eiinfo.set("projectEname",projectEname);
     EiCommunicator.send("EDDBT0","getModuleOfProject", eiinfo, null, false);
     
     if(ajaxEi != null){
      	var eiBlock = ajaxEi.getBlock("module");
        var objOption = new Option("全部",""); 
        ef.get("inqu_status-0-moduleEname").options[ef.get("inqu_status-0-moduleEname").options.length]=objOption;
      
      for(i=0;i<eiBlock.getRows().length;i++){
         strName = eiBlock.getCell(i,"moduleCname");
         strValue = eiBlock.getCell(i,"moduleEname");
         var objOption = new Option(strName+"-"+strValue,strValue); 
         ef.get("inqu_status-0-moduleEname").options[ef.get("inqu_status-0-moduleEname").options.length]=objOption;
        } 
		    
      }
}	


/**
  *在grid中，下拉框（项目英文名和模块英文名）的联动
  *当项目英文名发生变化时，模块英文名下拉框的内容随之变化
  */
efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index, 
	col_index, data_type )
{
	if( col_index == 0 && data_type == TYPE_DATA)
	{   
	    var grid = efgrid.getGridObject( grid_id );	
		var projectEname =grid.getCellValue( row_index, 1, TYPE_FIX  ) ;
		var eiInfo=new EiInfo();
		eiInfo.set("projectEname",projectEname);
		EiCommunicator.send("EDDBT0","getModuleOfProject", eiInfo, null, false);
		if(ajaxEi != null){
        var column = grid.getColumn( 0, TYPE_DATA );	 
	    column.prepareData( ajaxEi );
	 	var eiBlock = ajaxEi.getBlock("module");
	    grid.setCellValue( row_index, 0, "", TYPE_DATA  );
	    grid.refreshCell( row_index, 0 , TYPE_DATA );
	}
    }
}


