<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String info=request.getParameter("inqu_status-0-iplattag");
	if(info==null||!info.equals("false"))
           info="true";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/SQ/EDSQ02.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDSQ02" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=<%=info %>>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="15%">
              用户名
            </td>
            <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="userId" row="0"/>
            </td>
            <td nowrap width="15%">
              页面号
            </td>
            <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="pageNo" row="0"/>
            </td>
            <td nowrap width="15%">
               查询条件名
            </td>
            <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="searchName" row="0" />
            </td>
            </tr>
         </table>
	</div>
</div>

<div id = "ef_region_result" title="查询条件名信息" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<div id = "ef_region_result1" title="查询条件信息" style="overflow:scroll"> 
	<div id = "ef_grid_result1" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>
<EF:EFInput blockId="table_inqu_status" ename="searchSeq" row="0" type="hidden"/>	
<EF:EFInput blockId="inqu_status" ename="iplattag" row="0" type="hidden"/>
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no"  style="operationBar:false">	
<EF:EFColumn cname="用户名" ename="userId" sort="true" fix="true" readonly="true"/>
<EF:EFColumn cname="页面号" ename="pageNo" sort="true" fix="true" readonly="true"/>
<EF:EFColumn cname="查询条件名" ename="searchName" sort="true" nullable="false"/>
<EF:EFColumn cname="查询名索引号" ename="searchSeq" visible="false"/>
</EF:EFGrid> 

<EF:EFGrid blockId="result1" autoDraw="no" ajax ="true" style="operationBar:false" enable="false" queryMethod="getSearchInfo">	
<EF:EFColumn cname="元素ID" ename="elementId" width="200" readonly="true"/>
<EF:EFColumn cname="元素值" ename="elementValue" readonly="true"/>
</EF:EFGrid>
     
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
