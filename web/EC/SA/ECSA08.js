//渲染grid
efform_onload = function ()
{
    efregion.show("ef_region_result");
}


//点击查询按钮
button_query_onclick = function () {
   var userid = ef.get("inqu_status-0-userid").value;
   var TimeStart = ef.get("inqu_status-0-TimeStart").value;
   var TimeEnd = ef.get("inqu_status-0-TimeEnd").value;
   if(TimeStart == ""){
   TimeStart = "20000101";
   }
   if(TimeEnd == ""){
   //var date = new Date();
   //var year = date.getYear();
   //var month = date.getMonth()+ 1;
   //var day = date.getDate();
   //if(month >= 1 && month < 10){
   //  month = "0" + month;
   //}
   //if(day >= 1 && day < 10){
   //  day = "0" + day;
   //}
   //endTime = year.toString() + month.toString() + day.toString(); 
   TimeEnd = "20500101";
   }
   if(TimeStart > TimeEnd){
     alert("开始时间不能大于结束时间，请重新录入！");
     return;     
   }
   else{
     efgrid.submitInqu( "ef_grid_result", "ec","ECSA08","query");
   }
   
}

//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

