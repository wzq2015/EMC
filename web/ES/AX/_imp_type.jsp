<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<link href="../../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="../../EF/jQuery/jquery.js"></script>

<script type="text/javascript">
    function OnLoad(){
      var dialog = window.parent;      
      dialog.InnerDialogLoaded();
      dialog.disableFinish(true);      
    }
    
    function validate(){      
      return [];
    }
    
    function onNext(){
      var type =$(':input:radio:checked').val();
      window.parent.setProperty("DataType", type);
      return "_imp_upload.jsp";
    }

  </script>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Export Type</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body onload="OnLoad()" style="overflow: hidden">
 <form>
  <table cellspacing="0" cellpadding="0" width="100%" border="0">

 	<tr>
      <td>
         <input type="radio" name="export" checked value="ORGANIZATION"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入组织机构</span>
      </td>
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    
    <tr>
      <td>
         <input type="radio" name="export" value="ROLE_TYPE"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入角色类型</span>
      </td>
    </tr>

        
    <tr><td>&nbsp;</td></tr>
    
    <tr>
      <td>
         <input type="radio" name="export" value="ROLE_MEMBER"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入角色成员</span>
      </td>
    </tr>
    
    
    <tr><td>&nbsp;</td></tr>

	<tr>
      <td>
         <input type="radio" name="export" value="ROLE_PERM"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入角色权限</span>
      </td>
    </tr>

	<tr><td>&nbsp;</td></tr>
	
	<tr>
      <td>
         <input type="radio" name="export" value="INIT_USER"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入初始用户</span>
      </td>
    </tr>
 
 	<tr><td>&nbsp;</td></tr>
 
    
    <tr>
      <td colspan="2">
        <hr width=70% align="left" size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
      </td>
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    
    <tr>
      <td>
         <input type="radio" name="export" value="EHR_USER"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入EHR员工</span>
      </td>
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    
    <tr>
      <td>
         <input type="radio" name="export" value="EHR_ORG"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入EHR机构</span>
      </td>
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    
    <tr>
      <td>
         <input type="radio" name="export" value="EHR_POST"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入EHR岗位</span>
      </td>
    </tr>
    
    <tr><td>&nbsp;</td></tr>
		
  </table>
 </form>
</body>
</html>
