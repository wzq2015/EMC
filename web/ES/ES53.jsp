<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ES/ES53.js"></script>
	
</head>

<body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
   <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

   <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	 <div style="overflow:hidden;width:100%">
		<table>
		  <tr>		    
		    <td nowrap width="15%">类别</td>  
		    <td nowrap >
		      <EF:EFSelect blockId="inqu_status" ename="aotype" row="0" >
		         <EF:EFOptions conj="-" blockId="aotype" labelColumn="name" valueColumn="label"/>
		      </EF:EFSelect>
		    </td>
		    
		    <td nowrap width="15%" align="right">对象</td>
		    <td nowrap>
		      <EF:EFInput blockId="inqu_status" ename="filter" row="0" />
		    </td>
		  </tr>		  
		</table>
	  </div>
    </div>  

  <div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="授权信息" style="overflow: hidden;height:400px;">
	</div> 
  </div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" ajax="true" readonly="true" autoDraw="no">
  <EF:EFColumn ename="id" width="100" />
  <EF:EFColumn ename="label" width="500" />
  <EF:EFColumn ename="auth" cname="权限维护" visible="true" />	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
