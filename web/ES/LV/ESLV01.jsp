<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<c:set var="attr" value="${ei.attr}" />
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do?efFormEname=ESLV01";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>   
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
  <script type="text/javascript" src="./ES/LV/ESLV01.js"></script>
 </head>
 
<body class="bodyBackground">
 <form id="ESLV01" name="actionForm" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <EF:EFInput blockId="inqu_status" ename="render" row="0" type="hidden"/>

  <div id = "ef_region_edit" title="<%=I18nMessages.getText("label.ESLevelAuthorizationConfig","分级授权配置中心") %>" efRegionShowClear=true>
   <div>
		<table>		  
		  <tr>
		    <td ><%=I18nMessages.getText("label.ESAuthorizationLevel","分级授权层数设置：") %></td>
		    <td >
		      <input id="level" name = "level" type='text'  validateType="positive_integer" minLength="1"  maxLength="3" value="${attr.level}" />  
		    </td>
		  </tr>
		  
		</table>
	</div>
   </div>    
<EF:EFRegion/>
 <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include> 		

 </body>
</html>
