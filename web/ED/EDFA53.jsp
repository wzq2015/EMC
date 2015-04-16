<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/EDFA53.js"></script>

</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">画面英文名</td>
		<td nowrap width="20%"><EF:EFInput blockId="inqu_status"
			ename="formEname" row="0" style="text-transform : uppercase;"
			etc="validateType='string' maxLength='8' size='8'" /></td>
		<%--		    <td nowrap width="15%">
		      画面中文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="funcId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      画面类型
		    </td>  
		    <td nowrap >
		    </td> --%>
	</tr>

</table>
</div>
</div>


<div id="ef_region_result" title="记录集" style="overflow:scroll">
<div id="ef_grid_result" title="页面信息"
	style="overflow: hidden;height:300px;"></div>
</div>

<EF:EFRegion /> 

<EF:EFGrid blockId="result" autoDraw="yes">
    <EF:EFSubGridColumn ename="blockMetaName" blockName="metas" 
    	                  valueProperty="blockMetaName" serviceName="EI10" queryMethod="getMetas" nullable="false"/>
	<%-- 	
	<EF:EFComboColumn ename="blockMetaName" blockName="metas"
		valueProperty="blockMetaName" labelProperty="blockMetaName" />
     --%>
    <EF:EFColumn ename="formEname" nullable="false" fix="yes" />
    <EF:EFColumn ename="funcId" nullable="false" fix="yes" />
	<EF:EFColumn ename="recCreator" visible="no" />
	<EF:EFColumn ename="recCreateTime" visible="no" />
	<EF:EFColumn ename="recRevisor" visible="no" />
	<EF:EFColumn ename="recReviseTime" visible="no" />
	<EF:EFColumn ename="archiveFlag" visible="no" />
</EF:EFGrid> 

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
