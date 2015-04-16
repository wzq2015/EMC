<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ES/ES56.js"></script>
</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="inqu_status" ename="name" row="0" type="hidden"></EF:EFInput>
  <div id="ef_region_inqu" title="" style="overflow:scroll" efRegionShowClear=true>
		<div>
		<table>
			<tr>
				<td nowrap width="5%"><%=I18nMessages.getText("label.ESLabel","标签") %> :</td>
				<td nowrap width="20%">
				<EF:EFInput blockId="inqu_status" ename="label" row="0" style="text-transform : uppercase;"></EF:EFInput>
				</td>
				
				<td nowrap width="5%"><%=I18nMessages.getText("label.ESType","类型") %> :</td>
				<td nowrap width="15%">
					<EF:EFSelect blockId="inqu_status" ename="type" row="0" >
					<EF:EFOption label='<%=I18nMessages.getText("label.ESAll","全部") %>' value="0" />
					<EF:EFOption label='<%=I18nMessages.getText("label.ESPage","页面") %>' value="1" />
					<EF:EFOption label='<%=I18nMessages.getText("label.ESButton","按钮") %>' value="2" />
				</EF:EFSelect></td>
				<td nowrap width="5%"><%=I18nMessages.getText("label.ESSource","来源") %> :</td>
				<td nowrap width="15%">
					<EF:EFSelect blockId="inqu_status" ename="source" row="0" >
					<EF:EFOption label='<%=I18nMessages.getText("label.ESAll","全部") %>' value="0"></EF:EFOption>
					<EF:EFOptions blockId="bizPost" labelColumn="name" valueColumn="id"></EF:EFOptions>					
				</EF:EFSelect></td>
			</tr>
		</table>
		</div>
		</div>

		<div id="ef_region_result" title="" style="overflow:scroll">
		<div id="ef_grid_r" title="" style="overflow: hidden;height:400px;">
		</div>
		</div>

<EF:EFRegion /> 
<EF:EFGrid blockId="result" autoDraw="yes" enable="false" ajax ="true" readonly="true" paintId="ef_grid_r">
	 <EF:EFColumn ename="label" width="150"/>
	  <EF:EFColumn ename="name" width="150"/>
	<EF:EFComboColumn ename="type" cname='<%=I18nMessages.getText("label.ESType","类型") %>' width="100"  valueProperty="type" >
	<EF:EFOption label="" value="0"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESPage","页面") %>' value="1"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESButton","按钮") %>' value="2"></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFColumn ename="source"  cname='<%=I18nMessages.getText("label.ESSource","来源") %>' width="150"/>

</EF:EFGrid>

</form>
</body>
</html>
