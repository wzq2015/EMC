<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<html>
<head>
	
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EW/EW0201.js"></script>

</head>
<body class="bodyBackground">
<form id="EW0201" method="POST" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="partAdd">
	 <table style="width:100%">
		<tr>
		    <td align="left" nowrap colspan="4">
	
	<div id="roles" title="角色" >
    <div id = "ef_region_inqu_2" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table  style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:10%" >
		      角色标识：
		    </td>
		    <td  nowrap style="width:10%">
		    <EF:EFInput blockId="inqu_status" ename="roleId" row="0" />

		    </td>
		    <td align="right" nowrap style="width:10%">
		      角色名称：
		    </td>
		    <td nowrap style="width:10%">
		    <EF:EFInput blockId="inqu_status" ename="roleName" row="0" />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="query2" cname="查询" />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="clear2" cname="清空" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_Roles" title="记录集" style="overflow:scroll">
     <div id = "ef_grid_Roles" title="页面信息" style="overflow: hidden;height:320px;">
	        </div>	
</div>
</div>


<EF:EFRegion/>


<EF:EFGrid blockId="Roles" autoDraw="no" readonly="false" paintId="ef_grid_Roles" ajax="true" serviceName="EEDM05" queryMethod="queryCompany">
<EF:EFColumn ename="RoleId" cname="角色标识" sort="true" fix="true" readonly="true" width="220"/>
<EF:EFColumn ename="RoleName" cname="角色名称" readonly="true" width="250" />
</EF:EFGrid>
</td>
</tr>

</table>

	</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
