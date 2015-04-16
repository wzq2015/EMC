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
<script type="text/javascript" src="./ES/ES55.js"></script>
</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>"><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
	 <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
	<div id = "ef_region_top" title="<%=I18nMessages.getText("label.EFRolePerm","角色权限") %>" efRegionShowClear=false>
	<div>
    <table id="mainFrameTable" width="100%"  height="100%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" >
		                    
		  <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
		    <EF:EFTree model="orgTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESRole","系统角色") %>' configFunc="configTree">
		    </EF:EFTree>
		  </div>
		                    
		 </td>
		 
		<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
		
		<td id="rightContent" width=100%  vAlign="top" >		  
	    
	    <div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" style="overflow:scroll" efRegionShowClear=true>
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
					<EF:EFSelect blockId="inqu_status" ename="source" row="0">
					<EF:EFOption label='<%=I18nMessages.getText("label.ESAll","全部") %>' value="0" />
					<EF:EFOption label='<%=I18nMessages.getText("label.ESRole","角色") %>' value="1" />
					<EF:EFOption label='<%=I18nMessages.getText("label.ESRoleType","角色类型") %>' value="2" />
				</EF:EFSelect></td>
			</tr>
		</table>
		</div>
		</div>

		<div id="ef_region_result" title="<%=I18nMessages.getText("label.EFPermList","权限列表") %>" style="overflow:scroll">
		<div id="ef_grid_r" title="<%=I18nMessages.getText("label.EFPermList","权限列表") %>" style="overflow: hidden;height:380px;">
		</div>
		</div>
        </td>
        
	  </tr>
    </table>
    </div>
    </div>

<EF:EFRegion /> 
<EF:EFGrid blockId="result" autoDraw="yes"  ajax ="true"  paintId="ef_grid_r">
	 <EF:EFColumn ename="label" width="100" readonly="true"/>
	  <EF:EFColumn ename="name" width="300" readonly="true"/>
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
</EF:EFGrid></form>
</body>
</html>
