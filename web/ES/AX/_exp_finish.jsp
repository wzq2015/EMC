<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<link href="../../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript"">
  var CONTEXT_PATH = "../..";
</script>
<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="../../EF/jQuery/jquery.js"></script>

<%
	String contextpath = request.getContextPath();
	String listUrl = contextpath + "/DispatchAction.do";
%>

<script type="text/javascript">    
    function OnLoad(){
      var dialog = window.parent;      
      dialog.InnerDialogLoaded();
      dialog.disableNext(true);
      dialog.disableFinish(false);      
    }
    
    function validate(){
      return [];
    }
    
    
    function onNext(){
      return null;
    }
    
    function onFinish(){
      var props = window.parent.properties();               
      for( var key in props ){
       var domNode = ef.get("inqu_status-0-" + key);
       if ( domNode != null ){
         domNode.value = props[key];
       }
      }
      ef.get("efFormEname").value = "ESAX01";              
      ef.get("methodName").value = "export";
      efform.submit(document.forms[0]);
    }

  </script>

<html>
 <head>
  <title>Export Type</title>  
 </head>

<body onload="OnLoad()" style="overflow: hidden">
  <form id="exportForm" name="exportForm" method="POST" action="<%=listUrl%>" >
  <EF:EFInput blockId="" ename="efFormEname" row="" type="hidden" />
  <EF:EFInput blockId="" ename="serviceName" row="" type="hidden" /> 
  <EF:EFInput blockId="" ename="methodName" row="" type="hidden" />
  
  <EF:EFInput blockId="inqu_status" ename="DataType" row="0" type="hidden" />
  <EF:EFInput blockId="inqu_status" ename="Organization" row="0" type="hidden" />
  <EF:EFInput blockId="inqu_status" ename="RoleType" row="0" type="hidden" />
  <EF:EFInput blockId="inqu_status" ename="HROG" row="0" type="hidden" />
  
  <p>
  
  <table cellspacing="0" cellpadding="0" width="100%" border="0">
    <tr>
      <td colspan="2">
        确定要导出吗, 确定请选择导出的文件名和文件类型,然后按[确定]按钮; 如果需要取消导出请按[取消]按钮;
      </td>
    </tr>
    
    <tr>
        <td colspan=2>
          <hr width=100% size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
        </td>
      </tr>
     
   
    <tr>
      <td width="10%" nowrap>文件类型:</td>
      <td>
        <select class="pulldown" size="1" name="inqu_status-0-FileType">
          <option value="XLS">&nbsp;EXCEL文件&nbsp;</option>
          <option value="TXT">&nbsp;CSV文件&nbsp;</option>
        </select>
      </td>
    </tr>    
  </table>    
    
</form>
</body>
</html>
