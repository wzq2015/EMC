var paraNames = [];  
var workId = "";
var IsOperated = false;
var  modalWin ;
//页面初始化时，动态生成参数控件
efform_onload = function ()
{   
    var eiinfo = _getEi();
    ef.get("jobId").innerHTML=eiinfo.get("jobName");
    ef.get("jobDesc").innerHTML=eiinfo.get("jobDesc");
    ef.get("jobData").innerHTML=eiinfo.get("jobData");
    var flag =  eiinfo.get("flag");

    if(flag == "-1")
    { 
         modalWin.hide();
         alert(getI18nMessages("label.EJACWorkRunFailure","作业运行失败！"));
         ef.get("jobStatus").innerHTML=getI18nMessages("label.EJACWorkRunFailure","作业运行失败！");
 //        efbutton.setButtonStatus("start", true);
         ef.get("processBar").innerHTML="<img src=\"./EF/Images/efform_status_red.gif\"   width='30px' height='30px'>";
         return;
     }
      
    ef.get("jobStatus").innerHTML=getI18nMessages("label.EJACRunningNow","正在运行");
    modalWin=new EFModalWindow('progressWindow');
    modalWin.show(30, 30);
	ef.get("processBar").innerHTML="<img src=\"./EF/Images/ajax-loading.gif\"   width='120px' height='10px'>";
    queryStatusOfJob();
}

queryStatusOfJob = function () 
 {
     var jobData = ef.get("jobData").innerText;
     var jobName = ef.get("jobId").innerText;
     
     var eiinfo = new EiInfo();
	 eiinfo.set("jobData",jobData);
	 eiinfo.set("jobName",jobName);
	
//	 efform_submit_flag = true;
     EiCommunicator.send( "EJAC02", "queryCurStatus", eiinfo, ajax_queryCurStatus_callback, false );	
 
 }
 
 var ajax_queryCurStatus_callback = {
  onSuccess : 
    function(eiinfo){     
    var num = eiinfo.get("triggerNum");

   //运行完成
     if(num==0)
     {
       modalWin.hide();
       ef.get("jobStatus").innerHTML=getI18nMessages("label.EJACExeEnded","执行完成");
       ef.get("processBar").innerHTML="<img src=\"./EF/Images/efform_status_green.gif\"   width='30px' height='30px'>";
 //      efbutton.setButtonStatus("start", true);
       
     }
     else if(num==-1)
     {
       alert(getI18nMessages("label.EJACReadingCurrentStatusFailure","读取当前运行状态出错！"));
//       efbutton.setButtonStatus("start", false);
        setTimeout("queryStatusOfJob()",500);
     }
     else if(num>0)
     {
 //      efbutton.setButtonStatus("start", false);
        setTimeout("queryStatusOfJob()",500);
     }
    },
  onFail    : 
    function(eMsg) {
    }
}



 //"查看日志"按钮
 button_log_onclick = function () 
 {
    var jobName = ef.get("jobId").innerText;
	var childWindow = efform.openNewForm('EJ14', "serviceName=iplat4j_JobService&methodName=jobLogList&qjoblog-0-jobName="+jobName);
    childWindow.focus();

 }
