<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%
	String actionUrl = request.getContextPath();
%>
<script type="text/javascript">
var CONTEXT_PATH = "../..";
</script>

<link href="../../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="../../EF/jQuery/jquery-1.7.js"></script>
<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>

<script type="text/javascript"> 

    function OnLoad(){      
      var dialog = window.parent;   
      //alert( dialog );         
      //dialog.InnerDialogLoaded();  
      //alert( dialog.InnerDialogLoaded() );         
      dialog.disableNext(false);  
      dialog.disableFinish(true);          
    }
    
    function validate(){
      return [];
    }
    
    function onNext(){
      var type = $(':input:radio:checked').val();
      
      window.parent.setProperty("OptType", type);
      
      if( type == "DATA_EXPORT" )
        return "_exp_type.jsp";
      else       
        return "_imp_type.jsp";
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
  
    <tr><td>&nbsp;</td></tr>
    
    
    <tr>
      <td>
         <input type="radio" name="export" checked value="DATA_EXPORT"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出权限数据</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>* 可以导出本系统权限相关的信息, 包括所有的角色类型, 角色的成员列表, 角色的权限列表;<br/>
          * 导出时可以对导出数据进行条件过滤, 譬如导出指定组织结构下面指定角色的相关信息;<br/>
          * 导出格式支持EXCEL文件和CSV文件, 注意使用CSV文件导出时, 数据不能含有逗号;<br/>
      </td>
    </tr>
        
    <tr><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td></tr>
    
    <tr>
      <td>
         <input type="radio" name="export" value="DATA_IMPORT"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导入权限数据</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>* 可以导入系统权限相关的信息, 包括角色类型, 角色的成员列表, 角色的权限列表;<br/>
          * 也支持导入EHR的相关信息, 包括员工信息, 组织机构信息, 员工岗位信息;<br/>
          * 导入格式支持EXCEL文件和CSV文件, 注意使用CSV文件导入时, 数据不能含有逗号;<br/>
      </td>
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td></tr>
    
	<tr>
		<td colspan="2">
		<a style="margin-left: 26px;font-weight: bold;color: red;">
		★  进行导入操作之前，请先做如下处理：
		</a><br/>
		<a style="margin-left: 35px;" target="_blank" href="<%=actionUrl%>/ES/AX/SetIESafeMode.html">1  设置IE安全模式</a><br/>
		<a style="margin-left: 35px;" target="_blank" href="<%=actionUrl%>/ES/AX/ImportTemplate.zip">2  下载导入模板</a>
		
		</td>
	</tr>

	
  </table>
 </form>
</body>
</html>

