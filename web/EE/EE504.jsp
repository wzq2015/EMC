<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
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
  <script type="text/javascript" src="./EE/EE504.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div>
	<table>
	<tr>
		<td nowrap >
		      Long类型ID：
		</td>
		<td nowrap >
			<input type="text" name="inqu_data-0-typeLong_id" value="${inqu.rows[0].typeLong_id}" class = "inputField" />
		</td>
	</tr>
	</table>
	</div>
</div>   
 
   <div id = "ef_region_result" title="记录集" style="overflow:scroll"> 	       
     <div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:270px;">
     </div>
     <br/>
     <div>
       <textarea id="teleStr" cols="96" rows="6"></textarea>    
     </div>
   </div>  
   
  <EF:EFRegion/>
  <EF:EFGrid blockId="result" autoDraw="yes" readonly="false" ajax="true" paintId="ef_grid_r" >
	<EF:EFColumn ename="other1" cname="bean2Str转换" />
	<EF:EFColumn ename="other2" cname="block2Str转换" />
	
  </EF:EFGrid>
  
  <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
 </form>
 </body>
</html>
