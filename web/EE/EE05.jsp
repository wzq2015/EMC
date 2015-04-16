<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EE/EE05.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

  <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
   <div>	
		<table>		  
		  <tr>
		    <td >产品</td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="PRODUCT" row="0" />					
		    </td>
		      <td >公司</td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="COMPANY" row="0" />					
		    </td>
		  </tr>
		</table>
	</div>
   </div>  

   <div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	 <div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:310px;">
     </div> 
   </div>     
  
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="yes" readonly="false" paintId="ef_grid_r">

  </EF:EFGrid>
  		

  <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
 </form>
 </body>
</html>
