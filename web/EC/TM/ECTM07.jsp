<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>模板实例管理</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM07.js"></script>
	
</head>

<body class="bodyBackground">

<form id="ECTM07" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
     <div id = "ef_grid_result" title="模板信息" style="overflow: hidden;height:400px;">
     </div>    
</div>
	

<EF:EFRegion/>
<EF:EFGrid blockId="result"  style="navigationBar:false">
<EF:EFColumn ename="templateInsName" cname="模板实例名称"  nullable="false" readonly="true" width="200"/>
<EF:EFColumn ename="templateInsId"  visible="false"/>
<EF:EFColumn ename="templateDefId"  visible="false"/>
<EF:EFColumn ename="nodeName"  cname="所属节点" readonly="true" width="150"/>
<EF:EFComboColumn ename="templateType" cname='模板类型' readonly="true" width="150">
  		<EF:EFOption label="" value=""/>
  		<EF:EFOption value="0" label="站点首页模板"/>
		<EF:EFOption value="1" label="栏目首页模板"/>
		<EF:EFOption value="2" label="栏目列表模板"/>
		<EF:EFOption value="3" label="文章显示模板"/>
 </EF:EFComboColumn>
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
