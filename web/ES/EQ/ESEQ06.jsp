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
  <script type="text/javascript" src="./ES/EQ/ESEQ06.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.ESPostList","岗位列表") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESPostList","岗位列表") %>" style="overflow: hidden;height:300px;">
     </div>
   </div>
   
   <div id = "ef_region_user" title="<%=I18nMessages.getText("label.ESPostUserList","岗位成员") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_u" title="<%=I18nMessages.getText("label.ESPostUserList","岗位成员") %>" style="overflow: hidden;height:200px;">
     </div>
   </div>
  
  <EF:EFRegion/>

  <EF:EFGrid blockId="result" autoDraw="yes" paintId="ef_grid_r" readonly="false" ajax="true" queryMethod="query" style="operationBar:false">
	<EF:EFColumn ename="postLabel" cname='<%=I18nMessages.getText("label.ESPostLabel","岗位标识") %>' width="150" fix = "yes"  />
	<EF:EFColumn ename="postCname" cname='<%=I18nMessages.getText("label.ESPostCname","岗位中文名") %>' width="150"  />
  </EF:EFGrid> 
 
  <EF:EFGrid blockId="user" autoDraw="no" readonly="false" paintId="ef_grid_u" style="operationBar:false">
    <EF:EFColumn ename="userId" fix="yes" width="60" sort="false"/>
    <EF:EFColumn ename="userCname" fix="yes" width="80" sort="false"/>
    <EF:EFColumn ename="orgCode" fix="yes" sort="false"/>
    <EF:EFColumn ename="orgName" width="200" sort="false"/>
    
    <EF:EFColumn ename="showStation" cname='<%=I18nMessages.getText("label.ESUserPerm","用户权限") %>' visible="false" width="60"/>
	<EF:EFColumn ename="AuthStation" cname='<%=I18nMessages.getText("label.ESUserRole","用户角色") %>' visible="false" width="60"/>
    <EF:EFColumn ename="userClass" visible="true" enable="false" readonly="false" width="60"/>
    <EF:EFColumn ename="viewDetail" cname='<%=I18nMessages.getText("label.ESUserEdit","用户编辑") %>' visible="false" enable="false" readonly="true" width="90"/> 
    <EF:EFColumn ename="idcardNo" visible="true" enable="false" readonly="true" width="150"/>    
    <EF:EFColumn ename="recCreator" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recCreateTime" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recRevisor" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recReviseTime" visible="true" enable="false" readonly="true"/>    
 </EF:EFGrid> 
 
 </form>
 </body>
</html>
