<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String display="none";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD50.js"></script>

</head>
<body class="bodyBackground">

<form id="EDMD50" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table width="100%">
		  <tr>
		    <td nowrap width="10%" align="right">
		      模板编号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="templetNo" row="0" />
		    </td>
		    <td nowrap width="10%" align="right">
		      模板名称
		    </td>
		    <td nowrap >
		    <EF:EFInput blockId="inqu_status" ename="templetName" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="布局模板" style="overflow:scroll">
	<div id = "ef_grid_result" title="布局模板" style="overflow: hidden;height:275px;">
	</div>
</div>

<div style='min-width: 870px;'>

<div id = "ef_region_region" title="模板区域" style="overflow:scroll;float: left;width: 48%;">
	<div id = "ef_grid_region" title="模板区域" style="overflow: hidden;height:275px;">
	</div>
</div>

<div id = "ef_region_rgargs" title="区域参数" style="overflow:scroll;float: right;width: 49%;margin-left: 2px;">
	<div id = "ef_grid_rgargs" title="区域参数" style="overflow: hidden;height:275px;">
	</div>
</div>

</div>

<EF:EFInput blockId="region_inqu_status" ename="templetId" row="0" type="hidden"/>
<EF:EFInput blockId="rgargs_inqu_status" ename="regionId" row="0" type="hidden"/>

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true" >
	<EF:EFColumn ename="templetNo" fix="yes" cname="布局模板编号" width="150"  />
	<EF:EFColumn ename="id" cname="模板序列号" width="80" visible="false" />
	<EF:EFColumn ename="templetName" cname="布局模板名称" width="150"  />
	<EF:EFColumn ename="templetFileName" cname="模板路径" width="150"  />
	<EF:EFColumn ename="description" cname="描述"  width="300" />
	<EF:EFColumn ename="templetPath" cname="图片路径" width="300"  visible="false"/>
</EF:EFGrid>

<EF:EFGrid blockId="region" autoDraw="no" readonly="false" ajax="true" style="navigationBar:false;toolBar:false">
	<EF:EFColumn ename="regionEname" fix="yes" cname="区域名称" width="150"  />
	<EF:EFColumn ename="id" width="150" visible="false"  />
	<EF:EFColumn ename="templetId" cname="布局模板ID" width="150" visible="false" />

	<EF:EFComboColumn ename="regionType" cname="区域类型" width="150" >
		<EF:EFCodeOption codeName="iplat.edmd.regiontype" />
	</EF:EFComboColumn>
	<EF:EFColumn ename="description" cname="描述"  width="300" />

</EF:EFGrid>

<EF:EFGrid blockId="rgargs" autoDraw="no" readonly="false" ajax="true" style="navigationBar:false;toolBar:false">
	<EF:EFColumn ename="id" width="150" visible="false"  />
	<EF:EFColumn ename="templetId" cname="布局模板ID" width="150" visible="false" />
	<EF:EFColumn ename="regionId" cname="区域ID" visible="false" width="150"  />
	<EF:EFColumn ename="keyName" cname="参数名称" width="150" />
	<EF:EFColumn ename="keyDesc" cname="参数描述"  width="300" />
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
