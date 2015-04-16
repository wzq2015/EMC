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
	
</head>
<body class="bodyBackground">

<form id="ECSM07" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>     

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:false;operationBar:false">
<EF:EFColumn ename="siteId"  width="150"/>
<EF:EFColumn ename="deployTime" />
<EF:EFColumn ename="logType" />
<EF:EFColumn ename="fileTransAdd" />
<EF:EFColumn ename="status" />
<EF:EFColumn ename="remark" />
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
