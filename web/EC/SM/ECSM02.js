efform_onload = function ()
{
    efregion.show("ef_region_result");
}	



//点击查询按钮；
button_query_onclick = function () {
	var recCreateTimeStart=ef.get("inqu_status-0-recCreateTimeStart").value;
	var recCreateTimeEnd=ef.get("inqu_status-0-recCreateTimeEnd").value;
    if (recCreateTimeStart!=""&&recCreateTimeEnd!=""){
    if (recCreateTimeStart > recCreateTimeEnd){
    alert("开始日期,截止日期录入有误，请重新输入！");
    ef.get("inqu_status-0-recCreateTimeStart").value="";
    ef.get("inqu_status-0-recCreateTimeEnd").value="";
    return ;
   }
   }
   efgrid.submitInqu( "ef_grid_result", "ec","ECSM02","queryArticle");
}

//日历控件的操�?
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}