
//查询节点类型对应的操作类型
function getOperateTypeOfNodeType() 
{
    var node_type = ef.get("inqu_status-0-nodetype").value;
    if(node_type!='')
    {
    var eiinfo = new EiInfo();
	eiinfo.set("nodetype",node_type);
    EiCommunicator.send( "ECLG01", "getOperateTypeOfNodeType", eiinfo, ajax_getOperateTypeOfNodeType_callback, false );
    }else{
    clearSelectType();
    var objOption = new Option("",""); 
    ef.get("inqu_status-0-operatetype").options[0]=objOption;
    }	
}
//清空下拉框中的数据；
clearSelectType = function()
{
  obj = document.getElementById("inqu_status-0-operatetype"); 
  for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
}
var ajax_getOperateTypeOfNodeType_callback = {
  onSuccess : 
    function(eiInfo){  
      clearSelectType();//先清空下拉框数据
      var eiBlock = eiInfo.getBlock("operatetype");
      var objOption = new Option("",""); 
      ef.get("inqu_status-0-operatetype").options[0]=objOption;
      for(i=0;i<eiBlock.getRows().length;i++){
         strName = eiBlock.getCell(i,"itemCname");
         strValue = eiBlock.getCell(i,"itemCode");
         var objOption = new Option(strName,strValue); 
         ef.get("inqu_status-0-operatetype").options[i+1]=objOption;
        }
    },
  onFail    : 
    function(eMsg) {
    }
}

//渲染grid
efform_onload = function ()
{
    efregion.show("ef_region_result");
}

//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

//点击查询按钮
button_query_onclick = function () {
   var startTime = ef.get("inqu_status-0-operateTimeStart").value;
   var endTime = ef.get("inqu_status-0-operateTimeEnd").value;
   if(startTime == ""){
   startTime = "20000101";
   }
   if(endTime == ""){
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
   endTime = "20500101";
   }
   if(startTime > endTime){
     alert("开始时间不能大于结束时间，请重新录入！");
     return;     
   }
   else{
     efgrid.submitInqu( "ef_grid_result", "ec","ECLG01","query");
   }
   
}


