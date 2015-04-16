<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%
	String contextpath = request.getContextPath();
	String actionUrl = contextpath + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EW/WI/EWWI01.js"></script>	
</head>
<body class="bodyBackground">

<form id="EWWI01" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<input type='hidden' id='contextpath' value='<%=actionUrl%>'>


<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      流程实例id
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="processInstanceId" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>


<div id = "ef_region_RESULT" title="已办任务列表" style="overflow: hidden;height:300px;"> 
	<div id = "ef_grid_workItem" title="页面信息">
	</div> 
</div>  
	<EF:EFGrid  blockId="historyWorkItem" autoDraw="no" ajax="true" enable="true" readonly="false" paintId="ef_grid_workItem" style="operationBar:false;navigationBar:false">
		<EF:EFColumn ename="fWorkitemId" cname="已办任务Id"  visible="true" />
		<EF:EFColumn ename="processInsId" cname="流程实例Id"  visible="true" />
		<EF:EFColumn ename="assignee" cname="处理人" readonly="true" enable="true" width="100"/>  
		<EF:EFColumn ename="createTime" cname="开始时间"  readonly="true" enable="true" width="300"/>  	  
		<EF:EFColumn ename="endTime" cname="结束时间" readonly="true" enable="true" width="300"/>
	 
	</EF:EFGrid> 
<EF:EFRegion/>

   <!-- <EF:EFColumn ename="look" cname="查看"/>   -->

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
