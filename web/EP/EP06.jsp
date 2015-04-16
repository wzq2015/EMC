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
	<script type="text/javascript" src="./EP/EP06.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="12%">
		      开始snapshot
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="inqu_status" ename="beginSnap" row="0" >
		    <EF:EFOptions conj="——" blockId="snapList" labelColumn="endTime" valueColumn="snapId"/>
		    </EF:EFSelect>
		    </td>
		    <td nowrap width="12%">
		      截止snapshot
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="inqu_status" ename="endSnap" row="0" >
		    <EF:EFOptions conj="——" blockId="snapList" labelColumn="endTime" valueColumn="snapId"/>
		    </EF:EFSelect>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="12%">
		      模块
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="inqu_status" ename="sqlModule" row="0" >
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOption label="仅JDBC" value="JDBC" />
		    </EF:EFSelect>
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

<EF:EFGrid blockId="result" autoDraw="no" >	
	<EF:EFColumn ename="sqlId" enable="false" />
	<EF:EFColumn ename="timePerExec" enable="false" />
	<EF:EFColumn ename="cpuTime" enable="false" />	
	<EF:EFColumn ename="executions" enable="false" />
	<EF:EFColumn ename="sqlText" editType="textarea" />
	<EF:EFColumn ename="sqlModule" enable="false" />
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
