<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
	String preObjectId = request.getParameter("preObjectId");
	String templateTypeId = request.getParameter("templateTypeId");
	String objType = request.getParameter("objType");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;  charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/SM/ECSM0101.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSM0101" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	
	
    <EF:EFInput blockId="template_info" ename="templateDefName" row="0" type="hidden" />
    <EF:EFInput blockId="template_info" ename="templateDefId" row="0" type="hidden" />
    <EF:EFInput blockId="template_info" ename="objId" row="0" type="hidden" />
    <EF:EFInput blockId="template_info" ename="objType" row="0" type="hidden" />
    <EF:EFInput blockId="template_info" ename="templateTypeId2" row="0" type="hidden" />
    <EF:EFInput blockId="template_info" ename="templateInsName" row="0" type="hidden" />
	
	<!--<input type="hidden" id="preObjectId" value="<%=preObjectId %>"/>-->
	<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="preObjectId" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="templateTypeId" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="nodeId" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="objType" row="0" type="hidden" />
	
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false"  style="operationBar:false;" serviceName="ECSM0101" queryMethod="query">
<EF:EFColumn ename="templateDefName" cname="模板定义名称" nullable="false" readonly="true"/>
<EF:EFColumn ename="templateFilename" cname="模板文件名" nullable="false" readonly="true"/>
<EF:EFComboColumn ename="templateTypeId" cname="模板类型" width="90" readonly="true">
	<EF:EFOption label="" value=""/>
	<EF:EFOption value="0" label="站点首页模板" />
	<EF:EFOption value="1" label="栏目首页模板" />
	<EF:EFOption value="3" label="文章显示模板" />
</EF:EFComboColumn>
<EF:EFColumn ename="suffix" cname="后缀" nullable="false" readonly="true"/>
<EF:EFColumn ename="recRevisor" cname="最后修改人" readonly="true"/>
<EF:EFColumn ename="recReviseTime" cname="修改时间" readonly="true"/>
<EF:EFColumn ename="edit" cname="操作" align="right" enable="false" width="200"/>
<EF:EFColumn ename="templateDefId" cname="模版ID" visible="false"/>
</EF:EFGrid> 

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type='text/javascript'>
document.getElementById('template_info-0-objId').value="<%=nodeId%>";
document.getElementById('template_info-0-objType').value="<%=objType%>";
document.getElementById('template_info-0-templateTypeId2').value="<%=templateTypeId%>";
//alert(document.getElementById('template_info-0-templateTypeId2').value);
</script>
</body>
</html>   
