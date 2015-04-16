<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
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
	<script type="text/javascript" src="./ED/EDFA70.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA70" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
            <td nowrap width="15%">
            	表格标识
            </td>
            <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="gridId" row="0" />
            </td>
            </tr>
         </table>
	</div>
</div>

<div id = "ef_region_service" title="模板服务管理" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<div id = "ef_region_file" title="模板文件管理" style="overflow:scroll"> 
	<div id = "ef_grid_file" title="页面信息" style="overflow: hidden;height:300px;" >
	</div> 
</div>    

<a id='download' href='#'></a>  
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" ajax="true" paintId="ef_grid_result">
  <EF:EFColumn ename="gridId" width="300" nullable="false" readonly="true"/>
  <EF:EFColumn ename="serviceEname" cname="服务名" nullable="false" />
  <EF:EFColumn ename="methodEname" cname="方法名" nullable="false"/>	
</EF:EFGrid> 
<EF:EFGrid blockId="file" autoDraw="yes" ajax="true" readonly="true" queryMethod="queryFile" paintId="ef_grid_file" style="operationBar:false,READONLY_PROMPT:false">	
  <EF:EFColumn ename="gridId" width="300" visible="false" nullable="false" />
  <EF:EFColumn ename="templateId" width="200"/>	
  <EF:EFColumn ename="templateFilepath" width="300"/>	
  <EF:EFColumn ename="download" cname="" width="40"/>	
</EF:EFGrid> 

<EF:EFInput blockId="" ename="gridId" row="" type="hidden" />
     
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
