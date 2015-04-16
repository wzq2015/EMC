<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES78.js"></script>
 </head>
 
<body class="bodyBackground">
 <form id="ES70" name="actionForm" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.ESModifyPassword","修改密码") %>" efRegionShowClear=true>
   <div>
		<table>		  
		  <tr>
		    <td ><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
		    <td >
		      <EF:EFInput blockId="inqu_status" ename="userId" row="0" />
		    </td>
		  </tr>
		  <tr>
		  <td ><%=I18nMessages.getText("label.ESExpireDate","有效截止日期") %></td>
		    <td >
		      <EF:EFInput blockId="inqu_status" ename="expireDate" row="0" popup="date" etc="readOnly"/>
		    </td>
		  </tr> 
		</table>
	</div>
   </div>    
		
 <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include> 		

 </body>
</html>

