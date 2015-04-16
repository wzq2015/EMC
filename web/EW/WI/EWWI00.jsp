<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String contextpath = request.getContextPath();
	String actionUrl = contextpath + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title></title>	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EW/WI/EWWI00.js"></script>	
</head>

<body class="bodyBackground">
<form id="EWWI00" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<input type='hidden' id='contextpath' value='<%=actionUrl %>'>
<div id = "ef_region_RESULT" title="待办任务列表" style="overflow: hidden;height:300px;"> 
	<div id = "ef_grid_workItem" title="页面信息">
	</div> 
</div>  
	<EF:EFGrid  blockId="workItem" autoDraw="no" ajax="true" enable="true" readonly="false" paintId="ef_grid_workItem" style="operationBar:false;navigationBar:false">
		<EF:EFColumn ename="fWorkitemId" cname="待办任务id"  visible="true" />
		<EF:EFColumn ename="processName" cname="流程名称" readonly="true" enable="true" width="150"/>  
		<EF:EFColumn ename="currentNodeName" cname="当前节点名称"  readonly="true" enable="true" width="150"/>  	  
		<EF:EFColumn ename="fStartTime" cname="开始时间" readonly="true" enable="true" width="300"/>
	    <EF:EFColumn ename="work" cname="执行"/>
	</EF:EFGrid> 
<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>   
