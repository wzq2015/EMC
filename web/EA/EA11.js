efform_onload=function(){
    
    setTimeout("queryStatus()",500);
    ef.get("inqu_status-0-realNum").value=50;
    ef.get("inqu_status-0-num").value=50;
    ef.get("inqu_status-0-realsecond").value=5
    ef.get("inqu_status-0-second").value=5;
    
}
var ajax_callback = {
  onSuccess : 
    function(eiinfo){   
      var grid=efgrid.getGridObject("ef_grid_result");
      grid.refresh(eiinfo);
    },
  onFail    : 
    function(eMsg) {
    }
}
function queryStatus(){
  var info=new EiInfo();
  $("#state_monitor").empty();
  $("#alarm").remove();
   EiCommunicator.send( "EA11", "monitor" , info, null );
   
   var obj=$("<div></div>");
   if(ajaxEi!=null){
      var tables=ajaxEi.get("tables");
      var countResult=ajaxEi.get("countResult");
      
      var tableArray=tables.split(",");
      var countArray=countResult.split(",");
      var alarm=false;
      var alarmNum=ef.get("inqu_status-0-realNum").value;
      for(var i=0;i<tableArray.length;i++){
         var eobj=$("<div></div>");
         eobj.css("float","left");
         var table=tableArray[i];
         var result=countArray[i];
         if(parseInt(result)<parseInt(alarmNum)){
         eobj.get(0).innerHTML="<img src=\"./EF/Images/efform_status_green.gif\"   width='30px' height='30px'>";
         }else{
          eobj.get(0).innerHTML="<img src=\"./EF/Images/efform_status_red.gif\"   width='30px' height='30px'>";
          alarm=true;
         }
         var comment=$("<span ></span>");
         comment.css("cursor","pointer");
         
         comment.click(function(){
            var table=$(this).attr("id");
            var info=new EiInfo();
            info.set("tableName",table);
            EiCommunicator.send( "EA11", "getDetail" , info, ajax_callback,false );
          
         });
         comment.text(table+":"+result);
         comment.attr("id",table);
         comment.appendTo(eobj);
         eobj.appendTo($("#state_monitor"));
      }
      if(alarm){
       var soundUrl=ef.get("soundurl").value;
       $("<bgsound id='alarm' src='"+soundUrl+"'  autostart=true >").appendTo(window.document.body);
      }
   }
   var refreshSecond=ef.get("inqu_status-0-realsecond").value;
   setTimeout("queryStatus()",parseInt(refreshSecond)*1000);
}
button_set_onclick = function () {
  if(efvalidateDiv("ef_region_inqu")){
   ef.get("inqu_status-0-realNum").value=ef.get("inqu_status-0-num").value;
   ef.get("inqu_status-0-realsecond").value=ef.get("inqu_status-0-second").value;
   }else{
    ef.get("inqu_status-0-num").value=ef.get("inqu_status-0-realNum").value;
    ef.get("inqu_status-0-second").value=ef.get("inqu_status-0-realsecond").value;
   }
}