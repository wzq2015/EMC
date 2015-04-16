
efform_onload = function ()
{
}	
function setFalseButton(){
  efbutton.setButtonStatus("upload", false);
  efbutton.setButtonStatus("delete", false);
  efbutton.setButtonStatus("query",false);
}
function setTrueButton(){
  efbutton.setButtonStatus("upload", true);
  efbutton.setButtonStatus("delete", true);
  efbutton.setButtonStatus("query",true);
}

function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
  var classId = node.label();
  ef.get("inqu_status-0-templateTypeId").value=classId;
  if(classId!="site"){
  setTrueButton();
  efgrid.submitInqu( "ef_grid_result", "ec","ECTM01","query");
  }
  else
  setFalseButton();
}
	
function configTree(tree){
  tree.nodeInitializer = treeNodeInitializer;          
  tree.emptyNodeAsLeaf = true;
  tree.expand();
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
	var  grid=efgrid.getGridObject("ef_grid_result");
	if(checkNullRow()){
		if(confirm("删除操作不可恢复，您确定删除此模板?")){
			efgrid.submitForm( "ef_grid_result", "ec","ECTM01","delete",true);
			if(ajaxEi!=null){
		      conflict=ajaxEi.get("conflict");
		      alert(conflict);
		    }
	    }
	}
	
}

/*
   点击查询模版实例按钮,弹出新页面,查询某个模版的模版实例
*/
button_query_onclick = function () 
{

   var classid = ef.get("inqu_status-0-templateTypeId").value;
   var  grid=efgrid.getGridObject("ef_grid_result");
	if(classid ==''){
	alert("请选择模板类别！");
	return false;
	}else {
	   rows=grid.getSelectRowsData();
	   if(rows.length==1){
	   templateDefId=rows[0]["templateDefId"];
       var childWindow = efform.openNewForm('ECTM07', "serviceName=ECTM07&methodName=query&templateDefId="+templateDefId);
       childWindow.focus();
       }else{
         alert("请选中一行进行操作");
       }
    }
}

/*
  点击更新模板按钮后打开上传页面
*/
button_update_onclick = function () 
{	
	var classid = ef.get("inqu_status-0-templateTypeId").value;
	if(checkOneReccord()){
		var grid=efgrid.getGridObject("ef_grid_result");
		var rows=grid.getSelectRowsData();
    	var templateDefId=rows[0]["templateDefId"];
		var childWindow = efform.openNewForm('ECTM0102', "serviceName=ECTM0102&classid="+classid+"&templateDefId="+templateDefId);
		childWindow.focus();
	}
}

/*
	校验是否有且只有选中一条记录
*/
function checkOneReccord(){
	var grid=efgrid.getGridObject("ef_grid_result");
    var rowCount=grid.getCheckedRowCount();
    if(rowCount!=1){
      alert("请选择一条记录进行操作!");
      return false;
     }else{
     	return true;
     }
}

/*
  点击上传按钮后打开上传页面
*/
button_upload_onclick = function () 
{	
	var classid = ef.get("inqu_status-0-templateTypeId").value;
	if(classid ==''){
	alert("请选择模板类别！");
	return false;
	}else{
	var childWindow = efform.openNewForm('ECTM0102', "serviceName=ECTM0102&classid="+classid);
    childWindow.focus();
    }
}
//判断有没有选择记录
function checkNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择一条记录进行操作!");
      return false;
     }
     else
      return true;
}


/*
  上传结束后页面刷新
*/
efform_onPopupReturn = function(winId, returnValue)
{
  if(returnValue=="0")
	efgrid.submitInqu( "ef_grid_result", "ec","ECTM01","query");
}

//点击模板编辑按钮的相关操作
efgrid_onDataCellClick=function(grid_id,row_index,col_index,cell_value)
{
 
  if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
    
     var fileName=grid.getCellValue(row_index,1,TYPE_DATA);
     var templateTypeId = document.getElementById("inqu_status-0-templateTypeId").value;
     var templateDefId=grid.getCellValue(row_index,0,TYPE_DATA,true);
     var childWindow = efform.openNewForm('ECTM0105',"fileName="+ fileName + "&templateTypeId=" + templateTypeId + "&templateDefId=" + templateDefId);
     childWindow.focus();
     
   }
  }
   
   //渲染按钮
	efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
	{
      	
      if(grid_id=="ef_grid_result"){
      	var grid = efgrid.getGridObject( "ef_grid_result" );
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      	var value=grid.getCellValue(row_index,2,TYPE_DATA);
      	if(columnEname=="templateEdit"){   
    		return "\<input value='编辑' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
      	}
      }
	}

button_insert_onclick=function(){
	efwindow.show(null,"inserttemplate","center");
}

//点击新增弹出框中的取消按钮
button_cancel_onclick=function(){
  efwindow.hide();
}
//点击新增弹出框中的确定按钮
button_confirm_onclick=function(){
	
     var moduleDefName = document.getElementById("moduleDefName").value;
     var templateTypeId = document.getElementById("inqu_status-0-templateTypeId").value;
     if(templateTypeId==null || templateTypeId==""){
     	alert("请选择模版类别");
     	return;
     }
     if(moduleDefName==null || moduleDefName==""){
     	alert("请填写模版定义名称");
     	return;
     }
     var childWindow = efform.openNewForm('ECTM0105',"templateTypeId=" + templateTypeId + "&defName=" + moduleDefName+"&opflag=insertTemplate");
     childWindow.focus();
     
     //efgrid.submitForm( "ef_grid_result", "ec","ECTM01","insert",true);
  	 efwindow.hide();
}
	
