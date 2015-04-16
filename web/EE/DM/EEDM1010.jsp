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
	<script type="text/javascript" src="./EE/DM/EEDM1010.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EEDM1010" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="5%">
		      服务名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="service_name" row="0" />
		    </td>
		  </tr>
		  
		 <tr>
          <td nowrap width="15%">查询字段1名称</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldName1" row="0" />
          </td>

          <td nowrap width="15%">查询字段1值</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldValue1" row="0" />
          </td>
        </tr>
        
        <tr>
          <td nowrap width="15%">查询字段2名称</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldName2" row="0" />
          </td>

          <td nowrap width="15%">查询字段2值</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldValue2" row="0" />
          </td>
        </tr>
        
         <tr>
          <td nowrap width="15%">查询字段3名称</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldName3" row="0" />
          </td>

          <td nowrap width="15%">查询字段3值</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldValue3" row="0" />
          </td>
        </tr>
        
         <tr>
          <td nowrap width="15%">查询字段4名称</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldName4" row="0" />
          </td>

          <td nowrap width="15%">查询字段4值</td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="fieldValue4" row="0" />
          </td>
        </tr>
		</table>
	</div>
</div> 

<!--
<div id="ef_region_query" title="查询条件集" style="overflow: scroll">
<div id="ef_grid_query" title="查询条件"
	style="overflow: hidden; height: 250px;"></div> 
</div>
-->

<div id="ef_region_result" title="记录集" style="overflow: scroll">
<div id="ef_grid_result" title="页面信息"
	style="overflow: hidden; height: 250px;"></div>
</div>

<EF:EFRegion />

<!-- 
<EF:EFGrid blockId="query" autoDraw="yes"
	style="navigationBar:true;operationBar:true"
	ajax="true">

</EF:EFGrid>
-->

<EF:EFGrid blockId="result" autoDraw="yes"
	style="navigationBar:true;operationBar:true"
	ajax="true">
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
