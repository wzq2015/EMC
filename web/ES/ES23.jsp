<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String message = (String)request.getAttribute("MESSAGE");
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES23.js"></script>
 </head>
 
<body class="bodyBackground">
 <form id="ES23" name="actionForm" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <EF:EFInput blockId="inqu_status" ename="render" row="0" value="ES00" type="hidden"/>

  <div id = "ef_region_password" title="<%=I18nMessages.getText("label.ESModifyPassword","修改密码") %>" efRegionShowClear=true>
   <div>
		<table>		  
		  <tr>
		    <td ><%=I18nMessages.getText("label.ESOldPassword","旧密码") %></td>
		    <td >
		      <EF:EFInput blockId="inqu_status" ename="oldPasswd" row="0" etc="type='password'"/>
		    </td>
		  </tr>
		  <tr>
		      <td ><%=I18nMessages.getText("label.ESNewPassword","新密码") %></td>
		    <td >
		      <EF:EFInput blockId="inqu_status" ename="newPasswd" row="0" etc="type='password'"/>
		    </td>
		  </tr>
		  <tr>
		     <td ><%=I18nMessages.getText("label.ESRenewPassword","确认新密码") %></td>
		    <td >
		      <EF:EFInput blockId="inqu_status" ename="renewPasswd" row="0" etc="type='password'"/>
		    </td>
		  </tr>
		  
		</table>
	</div>
   </div>    
		
 <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include> 		

 </body>
</html>

<script language="JavaScript" type="text/javascript">
<% 
  if ( message!=null ){
%>
	efform.setStatus(-1, "<%=message%>");
<% } %>
</script>
