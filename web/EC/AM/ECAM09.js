efform_onload = function ()
{
	
}

button_query_onclick = function(){
	efgrid.submitInqu( "ef_grid_result", "ec","ECAM09","query");
}

button_insert_onclick = function(){
	if(checkNullRow()&& validData()){
		efgrid.submitForm( "ef_grid_result", "ec","ECAM09","insert",true);
	}else{
		return false;
	}
}

button_update_onclick = function(){
	if(checkNullRow()&& validData()){
		efgrid.submitForm( "ef_grid_result", "ec","ECAM09","update",true);
	}else{
		return false;
	}
}

button_delete_onclick = function(){
	if(checkNullRow()&& confirm("确定删除选中记录吗?")){
		efgrid.submitForm( "ef_grid_result", "ec","ECAM09","delete",true);
	}else{
		return false;
	}
}

function checkNullRow(){
	   var grid=efgrid.getGridObject("ef_grid_result");
	   var rowCount=grid.getCheckedRowCount();
	     if(rowCount==0){
	      alert("请选择需要操作的记录！");
	      return false;
	     }
	     else
	      return true;
}

function validData(){
	var grid=efgrid.getGridObject("ef_grid_result");
	var rows = grid.getSelectRowsData();
	for( var i=0; i<rows.length; i++ ){
		var row = rows[i];  
		if(row["extType"] == "03"){
			var extSource = row["extSource"];
			if(!extSource || extSource.trim()==""){
				alert("枚举类型的扩展字段，请输入来源!");
				return false;
			}
		}
	}
	return true;
}