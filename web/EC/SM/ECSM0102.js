efform_onload = function ()
{
	//alert(document.getElementById("ins_info-0-objId").value);
}

button_confirm_onclick = function () 
{	
	var previewObject = document.getElementById("inqu_status-0-preObjectId").value;
	
	var grid = efgrid.getGridObject( "ef_grid_result" );
    var rows=grid.getCheckedRows();
	
	var templateDefName=grid.getCellValue(rows[0],0,TYPE_DATA); 
	
	if(checkNullRow()){
		
		var templateTypeId= ef.get("ins_info-0-templateTypeId2").value;
		
		var info = new EiInfo();
		info.setByNode("ef_region_inqu"); 
		EiCommunicator.send( "ECTM05", "selectIns" , info, null );
	
		//刷新父页面
		if(ajaxEi!=null){
			var feedback=ajaxEi.get("add_instemplate_feedback");
      		alert(feedback);
      		
      		var preObjectId = document.getElementById("inqu_status-0-preObjectId").value;
      		
      		if(preObjectId.substr(preObjectId.length-1)=="0"){
	      		window.opener.document.getElementById(preObjectId).value = ajaxEi.get("templateInsName");
				window.opener.document.getElementById("templateInsId0"+templateTypeId).value = ajaxEi.get("templateInsId");
				window.opener.document.getElementById("templateInsName0"+templateTypeId).value = ajaxEi.get("templateInsName");
			
			}else{
				window.opener.document.getElementById(preObjectId).value = ajaxEi.get("templateInsName");
				window.opener.document.getElementById("templateInsId"+templateTypeId).value = ajaxEi.get("templateInsId");
				window.opener.document.getElementById("templateInsName"+templateTypeId).value = ajaxEi.get("templateInsName");
			}
			
      		window.close();
      	}
	}
	
}

//判断有没有选择记录
function checkNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   
   var templateId = "";
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择一条记录进行操作!");
      return false;
     }
     else if(rowCount>1){
      alert("只能选择一个模板进行选择!");
      return false;
     }else{
      var rows = grid.getCheckedRows();
   	  document.getElementById("ins_info-0-templateInsId").value=grid.getCellValue( rows[0], 0, TYPE_DATA, true );
   	  document.getElementById("ins_info-0-templateInsName").value=grid.getCellValue( rows[0], 0, TYPE_DATA );
      return true;
	 }
}