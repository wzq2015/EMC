<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ES/ES101.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ES101" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      项目英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="projectEname" row="0" />
		    </td>
		    <td nowrap width="15%">
		      画面英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="formEname" row="0"  style="text-transform : uppercase;" etc="validateType='string' maxLength='8'"/>
		    </td>
		    <td nowrap width="15%">
		      列英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="columnEname" row="0" />
		    </td>		    
		    
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		      用户标识
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="userId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      Grid标识
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="gridId" row="0"  style="text-transform : uppercase;" etc="validateType='string' maxLength='8'"/>
		    </td>
		  </tr>		  
		  
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" >

	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
