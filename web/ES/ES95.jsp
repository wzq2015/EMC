<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES95.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES95" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>


  
  <div id = "ef_region_result" title="用户信息" efRegionShowClear=true>
   <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="15%">工号</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="empCode" row="0" etc="readonly"/>					
		    </td>
		   </tr> 
		   <tr> 
		    <td  nowrap width="15%">姓名全称</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="empName" row="0" trim="false"/>					
		    </td>	
		   </tr> 


		   <tr > 
		    <td  nowrap width="15%">证件号码</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="idcardNo" row="0" trim="false"/>					
		    </td>	
		   </tr> 
		   
		      
		</table>
	</div>
   </div>  
  <EF:EFRegion/>
 
 </form>
 </body>
</html>
