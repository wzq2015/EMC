<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<html>
<head>
	
	<title>
	</title>
	<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9">
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/mxGraph/mxClient.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/ActivityParticipantsSetting.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/ManualActivitySetting.js"></script>	
	<script type="text/javascript" src="./EW/EW0120.js"></script>

</head>
<body class="bodyBackground">
<form id="EW0120" method="POST" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="partAdd">
	 <table style="width:100%">
		<tr>
		    <td align="left" nowrap colspan="4">
	<div id="ef_tab_x"  lastRange="100%" eftabWidth="100%" eftabType="efRoundDivTab">	
    <div id="users" title="用户" >
    <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:5%">
		      用户标识：
		    </td>
		    <td   nowrap style="width:5%">
		    <EF:EFInput blockId="inqu_status" ename="usrId" row="0" />

		    </td>
		    <td  align="right" nowrap style="width:5%">
		      用户名称：
		    </td>
		    <td  nowrap style="width:20%">
		    <EF:EFInput blockId="inqu_status" ename="usrName" row="0" />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="query" cname="查询" />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="clear" cname="清空" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_Users" title="记录集" >
<div id = "ef_grid_Users" title="页面信息" style="overflow:hidden;height:320px;">
</div>
</div>

<EF:EFGrid blockId="Users" autoDraw="yes" readonly="false" paintId="ef_grid_Users" ajax="true">
<EF:EFColumn ename="UserId" cname="用户标识" sort="true" fix="true" readonly="true" width="220"/>
<EF:EFColumn ename="UserName" cname="用户名称" readonly="true" width="250" />
</EF:EFGrid>
<EF:EFRegion/>


</div>
	
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

<div id = "ef_region_Roles" title="记录集">
     <div id = "ef_grid_Roles" title="页面信息" style="overflow:hidden;height:320px;">
	        </div>	
</div>

<EF:EFGrid blockId="Roles" autoDraw="no" readonly="false" paintId="ef_grid_Roles" ajax="true" serviceName="EEDM05" queryMethod="queryCompany">
<EF:EFColumn ename="RoleId" cname="角色标识" sort="true" fix="true" readonly="true" width="220"/>
<EF:EFColumn ename="RoleName" cname="角色名称" readonly="true" width="250" />
</EF:EFGrid>
<EF:EFRegion/>

</div>

</div>


<EF:EFTab tabId="x" />
</td>
</tr>
<tr>
<td colspan="4">
<div id="processStarter" title="流程启动者" >
<input type="checkbox" name="processStarter" value="0" /> 流程启动者
</div>
</td>
</tr>
<tr>
	         <td align="left" nowrap style="width:50%">
	         </td>		   
		     <td align="right" nowrap>
		     <EF:EFButton ename="confirm" cname="确定" />
		     </td> 
		     <td align="left" nowrap >
		     <EF:EFButton ename="cancel" cname="取消" />
		     </td> 
		      <td align="left" nowrap style="width:50%">
	         </td>	
		  </tr>
</table>

	</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
