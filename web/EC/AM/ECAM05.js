//点击查询按钮
button_query_onclick = function () {
   efgrid.submitInqu( "ef_grid_result", "ec","ECAM05","query");
}
//点击删除按钮
button_delete_onclick=function(){
if(checkNullRow()){
var sure=confirm("此操作将删除该文章，且不可复原，确认继续?");
if(sure){
 efgrid.submitForm( "ef_grid_result", "ec","ECAM05","delete",true);
 }
 }
}
//点击清空按钮
button_clear_onclick=function(){
  var sure=confirm("此操作将删除栏目回收站中的所有文章，且不可复原，确认继续?");
  if(sure){
  efgrid.submitForm( "ef_grid_result", "ec","ECAM05","clear",true,false,true);
 }
}
//点击还原按钮
button_reback_onclick=function(){
if(checkNullRow()){
 efgrid.submitForm( "ef_grid_result", "ec","ECAM05","reback",true);
 }
}
//点击还原全部的按钮
button_rebackall_onclick=function(){

  efgrid.submitForm( "ef_grid_result", "ec","ECAM05","rebackAll",true);
  
}
//点击返回按钮
button_back_onclick=function(){
 if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("ECAM05", "0");	
      }
     window.close();
}
function checkNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择一条记录进行操作");
      return false;
     }
     else
      return true;
}