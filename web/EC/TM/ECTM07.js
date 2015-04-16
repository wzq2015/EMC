efform_onload = function ()
{
  
}


/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
	var  grid=efgrid.getGridObject("ef_grid_result");
	if(checkNullRow()){
		if(confirm("删除操作不可恢复，您确定删除模板实例?")){
			efgrid.submitForm( "ef_grid_result", "ec","ECTM07","delete",true);
	    }
	}	
}

//判断有没有选择记录
function checkNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择记录进行操作!");
      return false;
     }
     else
      return true;
}