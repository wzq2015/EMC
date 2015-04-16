efform_onload = function ()
{
 ef.get("inqu_status-0-isPassAudit").value='0';
 efgrid.submitInqu( "ef_grid_result", "ec","ECAF01","query");
}
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ec","ECAF01","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
 var grid=efgrid.getGridObject("ef_grid_result");
    var rows=grid.getCheckedRows();
    if(rows.length<1){
	    alert("请选中一条记录");
	    return;
    }else{
	    if(confirm("确认删除吗?")==true){
	    	efgrid.submitForm( "ef_grid_result", "ec","ECAF01","delete", true);
	    }
	}
}

/*
  点击审核按钮后调用后台的service
*/
button_audit_onclick = function () 
{
 	 
     var grid=efgrid.getGridObject("ef_grid_result");
     var rows=grid.getCheckedRows();
     if(rows.length!=1){
	     alert("请选中一条记录");
	     return;
     }
   
	var articleTitle=grid.getCellValue(rows[0],0,TYPE_DATA);
	var commentContent=grid.getCellValue(rows[0],1,TYPE_DATA); 
	var number=grid.getCellValue(rows[0],3,TYPE_DATA);

	ef.get("check-0-articleTitle").value=articleTitle;
	ef.get("check-0-commentContent").value=commentContent;

	document.getElementById("check_pass").checked = "";
	document.getElementById("check_unpass").checked = "";
	if(number=="2"){//通过
		document.getElementById("check_pass").checked = "true";
	}else if(number=="1"){//不通过
		document.getElementById("check_unpass").checked = "true";	
	}
	
	efwindow.show(null,"checkContent","center"); 
}
button_cancel_onclick=function(){
  efwindow.hide();
}
//点击审核弹出框中的确定按钮
button_confirm_onclick=function(){

  efgrid.submitForm( "ef_grid_result", "ec","ECAF01","audit",true);
  efwindow.hide();
}
