<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<script type="text/javascript">
var CONTEXT_PATH = "../..";
</script>
<link href="../../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="../../EF/jQuery/jquery-1.7.js"></script>


<script type="text/javascript">
    function OnLoad(){
      var dialog = window.parent;      
      dialog.InnerDialogLoaded();  
      dialog.disableFinish(true);    
    }
    
    function validate(){
      var errs = new Array();
      var type = $(':input:radio:checked').val(); 
      if ( type == null ){
        errs.push("ÇëÏÈÑ¡ÖÐµ¼³öÊý¾ÝµÄÀàÐÍ");
      } 
      return errs;
    }
    
    function onNext(){
      var type =  $(':input:radio:checked').val();  
      window.parent.setProperty("DataType", type);
      
      if( type == "ROLE_TYPE" || type=="BFMS_PERMISSION")
        return "_exp_finish.jsp";
      else if ( type == "ACCOUNT_INFO" )
        return "_exp_hrog.jsp";
              
      return "_exp_org.jsp";
    }
</script>

<html>
<head>
  <title>Export Type</title>
</head>

<body onload="OnLoad()" style="overflow: hidden">
 <form>
  <table cellspacing="0" cellpadding="0" width="100%" border="0">
    <tr>
      <td>
         <input type="radio" name="export" checked value="ROLE_TYPE"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出角色类型</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
        
    <tr><td>&nbsp;</td></tr>
    
    <tr>
      <td>
         <input type="radio" name="export" value="ROLE_MEMBER"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出角色成员</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
    
    <tr><td>&nbsp;</td></tr>

	<tr>
      <td>
         <input type="radio" name="export" value="ROLE_PERM"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出角色权限</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
    
        <tr><td>&nbsp;</td></tr>

	<tr>
      <td>
         <input type="radio" name="export" value="ACCOUNT_INFO"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出系统用户</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
<!--     
    <tr><td>&nbsp;</td></tr>

	<tr>
      <td>
         <input type="radio" name="export" value="BFMS_PERMISSION"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出人员角色信息</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
 -->	
  </table>
 </form>
</body>
</html>
