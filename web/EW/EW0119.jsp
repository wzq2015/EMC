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
	<script type="text/javascript" src="./EW/EW0119.js"></script>

</head>
<body class="bodyBackground">
<form id="EW0119" method="POST" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="partAdd">
	 <table style="width:100%">
		<tr>
		    <td align="left" nowrap colspan="3">
	<div id="ef_tab_x"  lastRange="100%" eftabWidth="100%" eftabType="efRoundDivTab">
	
    <div id="posts" title="岗位" >
    <div id = "ef_region_inqu_1" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:5%">
		      岗位名称：
		    </td>
		    <td   nowrap style="width:5%">
		    <EF:EFInput blockId="inqu_status" ename="name" row="0" />

		    </td>
		   
		     <td nowrap >
		    	<EF:EFButton ename="query1" cname="查询" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_Posts" title="记录集" style="overflow:scroll">
<div id = "ef_grid_Posts" title="页面信息" style="overflow: hidden;height:280px;">
	        </div>
</div>
</div>
	
	<div id="groups" title="群组" >
    <div id = "ef_region_inqu_2" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table  style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:10%" >
		      群组名称：
		    </td>
		    <td  nowrap style="width:10%">
		    <EF:EFInput blockId="inqu_status" ename="name" row="0" />

		    </td>		   
		     <td nowrap >
		    	<EF:EFButton ename="query2" cname="查询" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_Groups" title="记录集" style="overflow:scroll">
     <div id = "ef_grid_Groups" title="页面信息" style="overflow: hidden;height:280px;">
	        </div>	
</div>
</div>

</div>


<EF:EFRegion/>
<EF:EFGrid blockId="Posts" autoDraw="yes" readonly="false" paintId="ef_grid_Posts" ajax="true">
<EF:EFColumn ename="PostName" cname="岗位名称" sort="true" fix="true" readonly="true" width="200"/>
<EF:EFColumn ename="PostDisplayName" cname="显示名称" readonly="true" width="250" />
</EF:EFGrid>

<EF:EFGrid blockId="Groups" autoDraw="no" readonly="false" paintId="ef_grid_Groups" ajax="true" >
<EF:EFColumn ename="GroupName" cname="群组名称" sort="true" fix="true" readonly="true" width="200"/>
<EF:EFColumn ename="GroupDisplayName" cname="显示名称" readonly="true" width="250" />
</EF:EFGrid>

<EF:EFTab tabId="x" />
</td>
</tr>
<tr>
	         <td align="left" nowrap style="width:90%">
	         </td>		   
		     <td align="right" nowrap style="width:10%">
		     <EF:EFButton ename="confirm" cname="确定" />
		     </td> 
		     <td align="left" nowrap >
		     <EF:EFButton ename="cancel" cname="取消" />
		     </td> 
		  </tr>
</table>

	</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
