<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/AF/EUAF01.js"></script>
</head>
<body class="bodyBackground">

<form id="EUAF01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="10%" align="right">文件夹名称</td>
		    <td nowrap width="25%">
		    	<EF:EFInput blockId="inqu_status" ename="fileName" row="0" />
		    	<EF:EFInput blockId="inqu_status" ename="actionUrl" row="0" value="<%=actionUrl%>" type="hidden"/>
		    </td>
		    <td nowrap width="10%" align="right">文件夹代码</td>
		    <td nowrap width="25%">
		    	<EF:EFInput blockId="inqu_status" ename="fileCode" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="档案目录" style="overflow: hidden;height:300px;">
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" frontSort="true">
    <EF:EFColumn ename="fileId" width="180" visible="false"/>
    <EF:EFColumn ename="fileName" width="120" nullable="false" />
    <EF:EFColumn ename="fileCode" width="180" nullable="false" />
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime" enable="false"  />
	<EF:EFColumn ename="recRevisor" enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false"  />
	<EF:EFColumn ename="archiveFlag"  enable="false" />
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
