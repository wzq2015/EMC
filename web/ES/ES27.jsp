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
  <script type="text/javascript" src="./ES/ES27.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <EF:EFInput blockId="inqu_status" ename="from" row="0" type="hidden" />

  
   <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
    <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="10%"><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
		    <td  width="20%">
			  <EF:EFInput blockId="inqu_status" ename="userId" row="0" />					
		    </td>
		    <td  nowrap width="10%"><%=I18nMessages.getText("E_Col.userCname","用户中文名") %></td>
		    <td  width="20%">
			  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" />					
		    </td>	   	    
		    <td  nowrap width="10%"><%=I18nMessages.getText("label.EFRowCountPerPage","每页条数") %></td>
		    <td  width="20%">
			  <EF:EFSelect blockId="inqu_status" ename="size" row="0">
		        <EF:EFOption label="100" value="100" />
		        <EF:EFOption label="200" value="200" />
		        <EF:EFOption label="500" value="500" />
		        <EF:EFOption label="1000" value="1000" />
		      </EF:EFSelect>					
		    </td>	   	    
		  </tr>
		  
		  
		</table>
	</div>
   </div>  
  
   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.ESRawPasswordUserList","初始口令用户列表") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_p" title="<%=I18nMessages.getText("label.ESRawPasswordUserList","初始口令用户列表") %>" style="overflow: hidden;height:400px;">
     </div>
   </div>
  
  <EF:EFRegion/>

  <EF:EFGrid blockId="result"  autoDraw="no" enable="false" readonly="false" ajax="false" paintId="ef_grid_p" style="operationBar:false;toolBar:true;navigationBar:false;">
    <EF:EFColumn ename="userId" fix="yes" sort="false" width="60"/>
    <EF:EFColumn ename="userCname" fix="yes" sort="false" width="80"/>
    <EF:EFColumn ename="orgCode" fix="yes" sort="false"/>
    <EF:EFColumn ename="orgName" width="200"/>
    <EF:EFColumn ename="idcardNo" visible="true" enable="false" readonly="true" width="150"/>    
    
  </EF:EFGrid>
 
 </form>
 </body>
</html>
