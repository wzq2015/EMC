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
  <script type="text/javascript" src="./ES/ES63.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <EF:EFInput blockId="inqu_status" ename="type" row="0" type="hidden" />
  <EF:EFInput blockId="inqu_status" ename="target" row="0" type="hidden" />
  <EF:EFInput blockId="inqu_status" ename="clazz" row="0" type="hidden" />
  <EF:EFInput blockId="inqu_status" ename="identity" row="0" type="hidden" />
  <EF:EFInput blockId="inqu_status" ename="restriction" row="0" type="hidden" />
  
   <div id = "ef_region_result" title="业务范畴列表" style="overflow:scroll"> 
	 <div id = "ef_grid_r" title="业务范畴列表" style="overflow: hidden;height:200px;">
     </div> 
   </div>     
    
  <div id = "ef_region_cond" title="条件列表" style="overflow:scroll"> 
	 <div id = "ef_grid_p" title="条件列表" style="overflow: hidden;height:200px;">
     </div>
   </div>
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="yes" ajax="true" readonly="false" paintId="ef_grid_r">
     <EF:EFColumn ename="label" width="300" fix="yes"/>
     <EF:EFColumn ename="name" width="400" fix="yes"/>
  </EF:EFGrid>

  		
 
 </form>
 </body>
</html>
