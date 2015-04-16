<!DOCTYPE html>
<%@page pageEncoding="UTF-8"  contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EL/EL20.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
   <div>	
		<table>
		  <tr>
		    <td ><%=I18nMessages.getText("label.ELStartDate","时间上限") %></td>
		    <td>		
			  <EF:EFInput blockId="inqu_status" ename="startDate" row="0" />
			  <img onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"  onClick="efcalendar_1_click(this);">
		    </td>
		    
		    <td ><%=I18nMessages.getText("label.ELEndDate","时间下限") %></td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="endDate" row="0" />
			  <img onload="efico.setImageSrc(this,'efcalendar.iconImg')"  src="./EF/Images/eftree_blank.png"  onClick="efcalendar_2_click(this);">
		    </td>		    
		  </tr>
		  <tr>
		    <td><%=I18nMessages.getText("label.ELLogUser","用户") %></td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="logUser" row="0" />					
		    </td>
		    <td><%=I18nMessages.getText("label.ELServiceName","服务") %></td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="serviceName" row="0" />					
		    </td>
		    <td><%=I18nMessages.getText("label.ELMethodName","方法") %></td>
		    <td>
			  <EF:EFInput blockId="inqu_status" ename="methodName" row="0" />					
		    </td>
		  </tr>
		</table>
	</div>
   </div>  

   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 	       
     <div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;">
     </div>     
   </div>  
   
   
   
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="yes" paintId="ef_grid_result">
    
  </EF:EFGrid>
  		

  <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
 </form>
 </body>
</html>
