<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/CM/EDCM00.js"></script>

</head>
<body class="bodyBackground">

<form id="EDCM00" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFInput blockId="" ename="edcm00DeleteDetail" row="" type="hidden" />
<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
			<td nowrap="nowrap" width="10%" align="right"><%=I18nMessages.getText("E_Col.codesetCode","代码分类编号") %></td>
			<td nowrap="nowrap" width="15%">
				<EF:EFInput blockId="inqu_status" ename="codesetCode" row="0" />
			</td>
			<td nowrap="nowrap" width="10%" align="right"><%=I18nMessages.getText("E_Col.codesetName","代码分类名称") %></td>
			<td nowrap width="15%">
				<EF:EFInput blockId="inqu_status" ename="codesetName" row="0" />
			</td>
			<td nowrap width="10%" align="right">代码类型</td>
		    <td nowrap width="15%">
		    	<EF:EFSelect blockId="inqu_status" ename="codesetType" row="0" etc="style='width=120'">
			    	<EF:EFOption label="--全部--" value=""></EF:EFOption>
					<EF:EFCodeOption codeName="iplat.codeStyle" />
		    	</EF:EFSelect>
		    </td>
		    <td nowrap width="10%" align="right">代码管理层级</td>
		    <td nowrap width="15%">
		    	<EF:EFSelect blockId="inqu_status" ename="codesetHierarchy" row="0" etc="style='width=120'">
			    	<EF:EFOption label="--全部--" value=""></EF:EFOption>
					<EF:EFCodeOption codeName="iplat.codeHierarchy" />
		    	</EF:EFSelect>
		    </td>
		  </tr>
		</table>
	</div>
</div>  
<div>

<div id="ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
<div id="ef_grid_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow: hidden;height:275px;">
</div>
</div>

<EF:EFRegion />
<EF:EFGrid blockId="result" autoDraw="yes" >
	<EF:EFColumn ename="codesetCode" fix="yes" width="160" />
	<EF:EFComboColumn ename="codesetType" nullable="false">
		<EF:EFCodeOption codeName="iplat.codeStyle"/>
    </EF:EFComboColumn>
	<EF:EFComboColumn ename="codesetHierarchy" nullable="false">
		<EF:EFCodeOption codeName="iplat.codeHierarchy"/>
    </EF:EFComboColumn>
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime" enable="false" />
	<EF:EFColumn ename="recRevisor" enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false" />
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
