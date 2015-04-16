<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>


<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%><html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES25.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.ESSystemAdminList","系统管理员列表") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_p" title="<%=I18nMessages.getText("label.ESSystemAdminList","系统管理员列表") %>" style="overflow: hidden;height:400px;">
     </div>
   </div>
  
  <EF:EFRegion/>

  <EF:EFGrid blockId="result"  autoDraw="yes" readonly="false" ajax="false" paintId="ef_grid_p" style="operationBar:false">

  </EF:EFGrid>
 
 </form>
 </body>
</html>
