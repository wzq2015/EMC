<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES24.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES24" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <EF:EFInput blockId="inqu_status" ename="loginName" row="0" type="hidden"></EF:EFInput>
   <EF:EFInput blockId="inqu_status" ename="name" row="0" type="hidden"></EF:EFInput>
   <EF:EFInput blockId="inqu_status" ename="source" row="0" type="hidden"></EF:EFInput>
  <div id = "ef_region_inqu" title="查询" efRegionShowClear=true>
  	<div style="overflow:hidden;width:100%">
		 <table>
		  <tr>
		    <td  nowrap width="15%">用户名</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="queryUserId" row="0" />					
		    </td>
		   </tr> 
		   </table> 
	</div>
  </div> 

  
  <div id = "ef_region_result" title="用户详情" efRegionShowClear=true>
    <div style="overflow:hidden;width:100%">
		<table border=0 width="50%">
		  <tr>
		    <td nowrap>用户名</td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="userId" row="0" etc="readonly"/>					
		    </td>
		    		    		    
		    <td nowrap>用户姓名</td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" trim="false" etc="readonly"/>					
		    </td>
		   </tr>		  

		  <tr>
		    <td nowrap>电话号码</td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="userTel" row="0" trim="false" etc="readonly"/>					
		    </td>
		    		    		    
		    <td nowrap>电子邮件</td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="userEmail" row="0" trim="false" etc="readonly"/>				
		    </td>
		   </tr>
		   
		   <tr>
		    <td nowrap>组织代码</td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="userOrgCode" row="0" trim="false" etc="readonly"/>
		    </td>
		    		    		    
		    <td nowrap>组织名称</td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="userOrgName" row="0" trim="false" etc="readonly"/>
		    </td>
		   </tr>		
		   
	       <tr> 
		    <td nowrap>用户身份证号</td>
		    <td colspan="3" >
			  <EF:EFInput blockId="inqu_status" ename="userIdcardNo" row="0" trim="false" etc="readonly size='54'"/>					
		    </td>	
		   </tr> 
		</table>
	 </div>
   </div>  

  <div id = "ef_region_pole" title="角色信息" style="width=100%;">
    <div id = "ef_grid_pole" title="角色信息" style="overflow: hidden;height:150px;">
    </div> 
  </div>     
  <div id = "ef_region_auth" title="权限信息" style="width=100%;">
    <div id = "ef_grid_auth" title="权限信息" style="overflow: hidden;height:190px;">
    </div>
  </div> 


  <EF:EFGrid blockId="pole" autoDraw="no" enable="false" ajax="true" queryMethod="queryPole" style="operationBar:false">
	  <EF:EFColumn ename="orgLabel" cname="组织机构标签"  width="100" />
	  <EF:EFColumn ename="orgName" cname="组织机构名称"  width="150" />
	  <EF:EFColumn ename="postLabel" cname="角色类型标签"  width="100" />    
	  <EF:EFColumn ename="postName" cname="角色类型名称"  width="200" />  	
  </EF:EFGrid>
  
  <EF:EFGrid blockId="auth" autoDraw="no" enable="false" readonly="true" ajax="true" queryMethod="queryAuth" style="operationBar:false">
	<EF:EFColumn ename="label" cname="标签" width="80"/>
	<EF:EFColumn ename="name" cname="名称" width="150"/>
	<EF:EFComboColumn ename="type" cname="类型" width="50"  valueProperty="type" >
	<EF:EFOption label="" value="0"></EF:EFOption>
	<EF:EFOption label="页面" value="1"></EF:EFOption>
	<EF:EFOption label="按钮" value="2"></EF:EFOption>
	</EF:EFComboColumn>
	
	<EF:EFColumn ename="source"  cname="来源" width="150"/>
  </EF:EFGrid>
  
  <EF:EFRegion/>
 </form>
 </body>
</html>
