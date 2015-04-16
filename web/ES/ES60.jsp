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
  <script type="text/javascript" src="./ES/ES60.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
   
   <div id = "ef_region_result" title="数据类别列表" style="overflow:scroll"> 
	 <div id = "ef_grid_r" title="数据类别列表" style="overflow: hidden;height:230px;">
     </div> 
   </div>     
  
  <div id = "ef_region_type" title="枚举子项" style="overflow:scroll"> 
	 <div id = "ef_grid_t" title="枚举子项" style="overflow: hidden;height:200px;">
     </div>
   </div>
  
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="yes" readonly="false" paintId="ef_grid_r">
    <EF:EFColumn ename="label" width="200" fix="yes"/>
    <EF:EFColumn ename="name" width="200" fix="yes"/>
    <EF:EFColumn ename="desc" width="300" fix="yes"/>
    <EF:EFComboColumn ename="cate" width="110" fix="yes" blockName="category" 
		valueProperty="clazz"  labelProperty="name"/>
  </EF:EFGrid>
  
 	    
 </form>
 </body>
</html>
