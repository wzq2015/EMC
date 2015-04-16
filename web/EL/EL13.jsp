<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

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
  <script type="text/javascript" src="./EL/EL13.js"></script>
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
			  <img id="efcalendar1" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			   onClick="efcalendar_1_click(this);">
		    </td>
		    
		    <td ><%=I18nMessages.getText("label.ELEndDate","时间下限") %></td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="endDate" row="0" />
			  <img id="efcalendar2" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			   onClick="efcalendar_2_click(this);">
		    </td>
		   </tr>
		   
		   <tr>
		    <td ><%=I18nMessages.getText("label.ELEeceptionType","异常类型") %></td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="exceptionType" row="0" />					
		    </td>
		    
		    <td ><%=I18nMessages.getText("label.ELServerId","调用编号") %></td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="servId" row="0" />					
		    </td>	    
		   </tr> 		  
		</table>
	</div>
   </div>  

   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 	       
     <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:270px;">
     </div>
     <br/>
     <div>
       <textarea id="stack" style="width:100%" rows="8" ></textarea>    
     </div>
   </div>  
    
   
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="no" readonly="true" paintId="ef_grid_r" enable="false" style="sortable:false;showCount:false">
    <EF:EFColumn ename="time" width="120"/>
    <EF:EFColumn ename="servId" width="110"/>
    <EF:EFColumn ename="exceptionType" width="200"/>
    <EF:EFColumn ename="exceptionInfo" width="300"/>
    <EF:EFColumn ename="exceptionTrace" width="70"/>    
  </EF:EFGrid>
  		

  <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
 </form>
 </body>
</html>
