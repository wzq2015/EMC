<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<title>Insert title here</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM101.js"></script>
</head>
<body>
<form id="EEDM101" method="POST" action="<%=actionUrl%>"  >
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
	<EF:EFColumn ename="f_devicegroupId" cname="id"/>
	<EF:EFColumn ename="f_deviceName" cname="公司名称"/>
</EF:EFGrid>
<a href="#" onclick="button_query_onclick">查询</a>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>