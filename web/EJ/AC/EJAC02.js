var paraNames = [];  
var workId = "";
var IsOperated = false;
var  modalWin ;
//页面初始化时，动态生成参数控件
efform_onload = function ()
{   
    var inInfo = _getEi();
    workId = inInfo.get("workEname");

	autodrawPara(inInfo, "param", "ef_para_list");
    efregion.setTitle("ef_region_inqu", getI18nMessages("label.EJACWork","作业")+"[" + workId + "]"+getI18nMessages("label.EJACParamInfomation","参数信息"));
    getParaName(inInfo);
    modalWin=new EFModalWindow('progressWindow');
}



//日历框选择 
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

 //"查看日志"按钮
 button_log_onclick = function () 
 {
    var jobName = ef.get("jobId").innerText;
	var childWindow = efform.openNewForm('EJ14', "serviceName=iplat4j_JobService&methodName=jobLogList&qjoblog-0-jobName="+jobName);
    childWindow.focus();
//    efform_submit_flag = false;
 
 }
//任务启动按钮
button_start_onclick = function () 
{
  if (!efvalidateDiv("ef_para_list")) {
      return;
  }
  
    var jobData = "";
    var paraStr = erTools.getParaStr("ef_para_list");
    var valueStrs = paraStr.split(",");
  
    for (var i = 0; i < valueStrs.length; i ++) {
       var paraValue = valueStrs[i];
       if(paraValue)
          jobData = jobData + paraNames[i]+"="+paraValue+",";
     }
    jobData = jobData.substring(0,jobData.length-1);	
   
    var eiinfo = new EiInfo();
	eiinfo.set("jobData",jobData);
	eiinfo.set("jobName",workId);
	
//	efform_submit_flag = true;
	modalWin.show(30, 30);
	ef.get("processBar").innerHTML="<img src=\"./EF/Images/ajax-loading.gif\"   width='120px' height='10px'>";
    EiCommunicator.send( "EJAC02", "startParamJob", eiinfo, ajax_startParamJob_callback, false );	
}

var ajax_startParamJob_callback = {
  onSuccess : 
    function(eiinfo){   
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
//      efbutton.setButtonStatus("start", false);
      queryStatusOfJob();
    },
  onFail    : 
    function(eMsg) {
    }
}

//获取作业参数名
getParaName = function(eiInfo)
{
   var i = 0;
   var paraBlock = eiInfo.getBlock("param");

   for ( i = 0; i < paraBlock.rows.length; i++ ){
    //debugger;
      var paraContext = paraBlock.getCell(i, "paraContext") ;
      paraNames[i] = paraContext;
    }
 }
 
  
 //查看任务当前运行状态
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
       var runFlag = eiinfo.get("runFlag");
       if(runFlag == 1)
       {
         ef.get("jobStatus").innerHTML=getI18nMessages("label.EJACWorkRanSuccessful","执行完成,任务运行成功！");
         ef.get("processBar").innerHTML="<img src=\"./EF/Images/efform_status_green.gif\"   width='30px' height='30px'>";
 //      efbutton.setButtonStatus("start", true);
       }else if(runFlag == -1)
       {
         ef.get("jobStatus").innerHTML=getI18nMessages("label.EJACWorkRanFailure","执行完成,任务运行失败！");
         ef.get("processBar").innerHTML="<img src=\"./EF/Images/efform_status_red.gif\"   width='30px' height='30px'>";
       }
       
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


//根据eiInfo的信息绘制参数列表
autodrawPara = function (eiInfo, paraBlockId, divId) 
{
  var i = 0;
  var paraBlock = eiInfo.getBlock(paraBlockId);
  
  var innerHtml = "<table>";
  var inputHtml = "";
  
  for ( i = 0; i < paraBlock.rows.length; i++ ){
    //debugger;
    
    var paraDesc = paraBlock.getCell(i, "paraDesc") ;
    var paraContext = paraBlock.getCell(i, "paraContext") ;
    var paraMustFlag = paraBlock.getCell(i, "paraMustFlag") ;
    var paraDisplayMode = paraBlock.getCell(i, "paraDisplayMode") ;
    var paraDefaultValue = paraBlock.getCell(i, "paraDefaultValue") ;
    var paraReadonly = paraBlock.getCell(i, "paraReadonly");
    var paraRegex = paraBlock.getCell(i, "paraRegex");
    
    inputHtml += "<tr><td width=50% align='right'>";
    if (paraMustFlag == "1") inputHtml += "<font color=red>*</font>";
    inputHtml += "<span id='_" + paraContext + "'>" + paraDesc + "</span></td>" +
      "<td width=50% nowarp>" + 
      "<input type='text' style='width:80px;overflow-x:visible;overflow-y:visible;' " +
      "id='" + paraContext + "' " + 
      "name='" + paraContext + "' " + 
      "value='" + efutils.trimString(paraDefaultValue) + "' " +  
      "class='inputField' ";
    if (paraMustFlag == "1") {
      inputHtml += "nullable='false' errorPrompt='"+ paraDesc + "' ";
    }
    if(paraReadonly == 'true')
    	inputHtml +=" readOnly ";
//    inputHtml += "/>";
    
    switch (paraDisplayMode) {
      //如果参数类型为D，绑定日期框
      case "D":   
        inputHtml += "regex='"+paraRegex+"'/>"; 
        inputHtml += " <img title=\""+getI18nMessages("label.EJACCalendarSelect","日历选择")+"\" src=\""+efico.get("efcalendar.iconImg")+"\" " + 
          "onmouseover=\"this.style.cursor='hand'\" " +
          "onClick=\"efcalendar_click(this, '" + paraContext + "');\" />";
        break;
      //如果参数类型为字符型
      case "C":   
 //      inputHtml += " onkeyup='value=value.replace(/[\W]/g,'') ' onbeforepaste=\"clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))\"" ;
         inputHtml += "regex='"+paraRegex+"'/>"; 
		break;
      //如果参数类型为数值型
      case "N":  
         inputHtml += " validateType='number'  regex='"+paraRegex+"'"; 
         inputHtml += "/>"; 
		break;
    }

    inputHtml += "</td></tr>";
  }

  innerHtml += inputHtml + "</table>";
  
  ef.get(divId).innerHTML = innerHtml;
}


