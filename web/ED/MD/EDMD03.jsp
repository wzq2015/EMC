<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.*" %>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD02.js"></script>

</head>
<body class="bodyBackground">

<form id="EDMD02" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
<table>
		  <tr>
		  	<td width="10%" align="right">
		    控件类别
		    </td>
		    <td width="15%">
		      <EF:EFInput blockId="inqu_status" ename="compType" row="0" />
		    </td>
		    <td width="10%" align="right">
		      控件名称
		    </td>
		    <td width="15%">
		      <EF:EFInput blockId="inqu_status" ename="cnName" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>


<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="数据信息" style="overflow: hidden;height:150px;">
	</div>
</div>

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" ajax="true">

</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
