efform_onload = function ()
{
}
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	ef.get("inqu_status-0-actionUrl").value="";
	efgrid.submitInqu( "ef_grid_result", "eu","EUAF01","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
	if(validateSel()){
		if(window.confirm("确定要删除么？")){
			efgrid.submitForm( "ef_grid_result", "eu","EUAF01","delete", true );
  		}
	}else{
		alert('请先选择数据！');
	}
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	if(validateSel()){
		efgrid.submitForm( "ef_grid_result", "eu","EUAF01","insert",true );
	}else{
		alert('请先选择数据！');
	}
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	if(validateSel()){
		efgrid.submitForm( "ef_grid_result", "eu","EUAF01","update",true);
	}else{
		alert('请先选择数据！');
	}
}
//验证是否新增加了行
function validateSel(){
	var grid = efgrid.getGridObject("ef_grid_result");
  	var rows = grid.getCheckedRows();
  	if(rows == ''){
  		return false;
  	}
  	return true;
}