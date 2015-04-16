<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES22.js"></script>
 </head>
  
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <EF:EFInput blockId="inqu_status" ename="loginName" row="0" type="hidden"></EF:EFInput>
 	<div id = "ef_region_result" title="<%=I18nMessages.getText("label.ESRoleInformation","角色信息") %>" efRegionShowClear=false>
	   <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" style="overflow: hidden;height:300px;">
       </div>
    </div> 
  <EF:EFRegion/>
  <EF:EFGrid blockId="result" autoDraw="yes" ajax="true" readonly="false" serviceName="ES22" paintId="ef_grid_r" style="operationBar:false">
	  <EF:EFColumn ename="postId" visible="false"/>
	  <EF:EFColumn ename="postTypeId" visible="false"/>
	  <EF:EFColumn ename="orgLabel" width="150" enable = "false"/>
	  <EF:EFColumn ename="orgName" width="250" enable = "false"/>
	  <EF:EFColumn ename="postLabel" width="150" enable = "false"/>    
	  <EF:EFColumn ename="postName" width="250" enable = "false"/>  	
  </EF:EFGrid>
 
 </form>
 </body>
</html>
