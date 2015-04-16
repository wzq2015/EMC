<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>


<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%><html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/EQ/ESEQ04.js"></script>
 </head>
 
 <body class="bodyBackground">
<form id="ESEQ01" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
  
  	    <div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" style="overflow:scroll" efRegionShowClear=true>
		<div>
		<table>
			<tr>
				<td nowrap width="5%"><%=I18nMessages.getText("label.ESObjectLabel","标签") %> :</td>
				<td nowrap width="20%">
				<EF:EFInput blockId="inqu_status" ename="label" row="0" style="text-transform : uppercase;"></EF:EFInput>
				</td>
				
				<td nowrap width="5%"><%=I18nMessages.getText("label.ESObjectCname","名称") %> :</td>
				<td nowrap width="20%">
				<EF:EFInput blockId="inqu_status" ename="name" row="0"></EF:EFInput>
				</td>
				
				<td nowrap width="5%"><%=I18nMessages.getText("label.ESType","类型") %> :</td>
				<td nowrap width="15%">
					<EF:EFSelect blockId="inqu_status" ename="type" row="0" >
					<EF:EFOption label='<%=I18nMessages.getText("label.ESAll","全部") %>' value="0" />
					<EF:EFOption label='<%=I18nMessages.getText("label.ESPage","页面") %>' value="1" />
					<EF:EFOption label='<%=I18nMessages.getText("label.ESButton","按钮") %>' value="2" />
					</EF:EFSelect></td>
			</tr>
		</table>
		</div>
		</div>
  
   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.ESGroupOnePermsList","一级群组权限列表") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESGroupOnePermsList","一级群组权限列表") %>" style="overflow: hidden;height:300px;">
     </div>
   </div>
   
  
  <EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes"  ajax ="true"  paintId="ef_grid_r">
	 <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("label.ESObjectLabel","标签") %>' width="100" readonly="true"/>
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("label.ESObjectCname","名称") %>' width="300" readonly="true"/>
	<EF:EFComboColumn ename="type" cname='<%=I18nMessages.getText("label.ESType","类型") %>' readonly="true" width="50" align="center" valueProperty="type" >
	<EF:EFOption label="" value="0"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESPage","页面") %>' value="1"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESButton","按钮") %>' value="2"></EF:EFOption>
	</EF:EFComboColumn>
	
	<EF:EFComboColumn readonly="true" ename="source" cname='<%=I18nMessages.getText("label.ESSource","来源") %>' width="150" align="center" valueProperty="source" >
	<EF:EFOption label="" value="0"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESRole","角色") %>' value="1"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESRoleType","角色类型") %>' value="2"></EF:EFOption>
	</EF:EFComboColumn>
</EF:EFGrid>

 
 </form>
 </body>
</html>
