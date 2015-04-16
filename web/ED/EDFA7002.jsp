<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>

<head>
<title>请选择模板</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/EDFA7002.js"></script>
</head>


<body class="bodyBackground">

<form id="EDFA7002" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_result" title="模板选择" style="overflow:scroll" > 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:200px;" >
	</div> 
</div>    

<a id='download' href='#'></a>  
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" ajax="true" paintId="ef_grid_result" style="operationBar:false;navigationBar:false;">	
  <EF:EFColumn ename="gridId" visible="false"/>	
  <EF:EFColumn ename="templateId" visible="false" width="200"/>	
  <EF:EFColumn ename="templateName" width="200" readonly="true"/>	
  <EF:EFColumn ename="templateFilepath" visible="false"/>	
  <EF:EFColumn ename="download" cname="" width="40"/>
</EF:EFGrid> 

<EF:EFInput blockId="" ename="gridId" row="" type="hidden" /> 
<EF:EFInput blockId="" ename="templateId" row="" type="hidden" /> 
<input id="actionUrl" type="hidden" value="<%=actionUrl%>"/> 

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>

</form>

</body>
</html>   
