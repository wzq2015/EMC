

button_confirm_onclick = function () 
{	
	var previewObject = document.getElementById("inqu_status-0-preObjectId").value;
	
	var grid = efgrid.getGridObject( "ef_grid_result" );
    var rows=grid.getCheckedRows();
	
	var templateDefName=grid.getCellValue(rows[0],0,TYPE_DATA); 
	
	if(checkNullRow()){
		///var op = window.opener.document.getElementById(previewObject);
		///op.innerHTML = "";
		///op.innerHTML = "<a href='' onclick=\"alert('111')\" target='_blank'>"+templateDefName+"</a>";
		
		ef.get("template_info-0-templateInsName").value = ef.get("template_info-0-templateDefName").value;
		var templateTypeId= ef.get("template_info-0-templateTypeId2").value;
		
		var info = new EiInfo();
		info.setByNode("ef_region_inqu");
		//alert(document.getElementById("template_info-0-objType").value);
		EiCommunicator.send( "ECTM05", "addIns" , info, null );
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
			
			//op.onclick = previewTemplate(ajaxEi.get("templateInsId"),ajaxEi.get("templateInsName") );
			//op.value = ajaxEi.get("templateInsName");
			
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
      alert("只能选择一个模板进行新增!");
      return false;
     }else{
      var rows = grid.getCheckedRows();
   	  document.getElementById("template_info-0-templateDefId").value=grid.getCellValue( rows[0], 0, TYPE_DATA, true );
   	  document.getElementById("template_info-0-templateDefName").value=grid.getCellValue( rows[0], 0, TYPE_DATA );
      return true;
	 }
}