<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@page import="com.baosight.iplat4j.ef.ui.column.*,java.util.*"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%
	List status = new ArrayList();
	status.add(new EFComboBean("1", I18nMessages.getText("label.EDVisible","显示")));
	status.add(new EFComboBean("0", I18nMessages.getText("label.EDHidden","不显示")));
	request.setAttribute("status", status);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>
 
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/CM/EDCM01.js"></script>

</head>
<body class="bodyBackground">

<form id="EDCM01" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
			<td nowrap="nowrap" width="10%" align="right"><%=I18nMessages.getText("E_Col.codesetCode","代码分类编号") %></td>
			<td nowrap="nowrap" width="23%"><EF:EFInput blockId="inqu_status"
				ename="codesetCode" row="0"></EF:EFInput></td>
			<td nowrap="nowrap" width="10%" align="right"><%=I18nMessages.getText("E_Col.itemCode","代码明细编号") %></td>
			<td nowrap="nowrap" width="23%"><EF:EFInput blockId="inqu_status"
				ename="itemCode" row="0"></EF:EFInput></td>
			<td nowrap="nowrap" width="10%" align="right"><%=I18nMessages.getText("E_Col.itemCname","代码明细中文名称") %></td>
			<td nowrap="nowrap" width="23%"><EF:EFInput blockId="inqu_status"
				ename="itemCname" row="0"></EF:EFInput></td>
		  </tr>
		</table>
	</div>
</div>  
<div>

<div id="ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
<div id="ef_grid_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>"
	style="overflow: hidden;height:275px;"></div>
</div>

<EF:EFRegion /> 
<EF:EFGrid blockId="result" autoDraw="yes" >

	<EF:EFColumn ename="codesetCode" fix="yes" width="160" />
	<EF:EFComboColumn ename="status" cname='<%=I18nMessages.getText("label.EDStatus","状态") %>' sourceName="status"
		sort="true" valueProperty="value" labelProperty="label" />

	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime" enable="false" />
	<EF:EFColumn ename="recRevisor" enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false" />
</EF:EFGrid> 

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
