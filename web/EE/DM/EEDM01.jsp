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
	<script type="text/javascript" src="./EE/DM/EEDM01.js"></script>
</head>
<body class="bodyBackground">

<form id="EEDM01" method="POST" action="<%=actionUrl%>"  >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap width="10%">公司名称：</td>
		     <td> <EF:EFInput blockId="inqu_status" ename="f_companyName" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>
 <EF:EFRegion/>
 <EF:EFGrid blockId="result" frontSort="true"  autoDraw="no" xlsExportMode="value" style="personalBar:true;modelXlsBar:true">
	<EF:EFColumn ename="f_companyName" cname="公司名称"/>
	<EF:EFColumn ename="f_companyDesc" cname="公司描述"/>
	<EF:EFColumn ename="f_companyAddress" cname="公司地址"/>
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
