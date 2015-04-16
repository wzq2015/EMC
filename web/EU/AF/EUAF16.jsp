<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String titleData = (String) request.getParameter("titleData");
	titleData = java.net.URLDecoder.decode(titleData,"UTF-8");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/AF/EUAF16.js"></script>
</head>
<body class="bodyBackground">

<form id="EEDM41" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		  	<td nowrap width="15%" align="right">&nbsp;&nbsp;节点名称</td>
		    <td nowrap>
		    	<EF:EFInput blockId="inqu_status" ename="title" row="0" />
		    	<input id='titleData' name='titleData' value="<%=titleData %>" type="hidden"/>
		    </td>
		    </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="文档标题信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" frontSort="true" ajax="true">
    <EF:EFColumn ename="id" width="180" visible="false"/>
    <EF:EFColumn ename="title" width="120" nullable="false" />
    <EF:EFColumn ename="key" width="180" nullable="false" />
    <EF:EFColumn ename="author" width="180" nullable="false" />
    <EF:EFColumn ename="docNo" width="180" nullable="false" />
    <EF:EFColumn ename="pageNo" width="180" nullable="false" />
    <EF:EFColumn ename="btnContent" cname="内容" readonly="true" align="center" width="40" />
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
