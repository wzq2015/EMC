<!DOCTYPE html>
<%@ page  pageEncoding="UTF-8" language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String actionUrl = request.getContextPath()+"/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EL/EL011.js"></script>
</head>

<body class = "bodyBackground">
<form id = "EL011" method = "POST" action = "<%=actionUrl%>" >
<jsp:include flush = "false" page = "../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear = true>
	<div id = "ef_div_inqu" style = "overflow:hidden;width:100%">
	<table>
		<tr>
			<td nowrap width = "15%">
			节点IP地址
			</td>
			<td nowrap width="85%">
		    <EF:EFInput blockId="inqu_status" ename="nodeURL" row="0" etc="nullable='false'" style="width:250px;" />
				<img title="日志节点" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'"" onClick="openSubGrid();" />
		    </td>
		</tr>
	</table>
	<hr>
    <table width="100%">
			<tr>
				<td nowrap align="right" width="10%">日志串接序列号</td>
				<td nowrap colspan="1" width="15%">
					<EF:EFInput blockId="inqu_status" ename="seqId" row="0" type="text" style="width:100%" />
				</td>
				<td nowrap align="right" width="10%">日志序号</td>
				<td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="id" row="0" type="text" style="width:50px" />
				</td>
				<td nowrap align="right" width="10%">日志父序号</td>
				<td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="parent" row="0" type="text" style="width:50px" />
				</td>
				<td colspan ="2" width="45%">
				</td>				
			</tr>
			<tr>
			 <td align="right" width="10%">
			 开始日期
			 </td>
			 <td align="left" width="15%">
			 <EF:EFInput  blockId="inqu_status" ename="startDate" row="0" type="text" style="width:85%" />
			 <img id="efcalendar1" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_1_click(this);">
			 </td>
			 <td align="right" width="10%">
			 结束日期
			 </td>
			 <td align="left" width="15%">
			 <EF:EFInput  blockId="inqu_status" ename="endDate" row="0" type="text" style="width:85%" />
			 <img id="efcalendar2" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_2_click(this);">
			 </td>
			</tr>
			<tr>
				 <td align="right" width="10%">日志类型编号 </td>
				 <td nowrap colspan="1" width="5%">
					<EF:EFTreeInput blockId="inqu_status" ename="logId" row="0"  modelName="EL0001"
          			configFunc="myConfigTree" label="tree"  text="日志类型" isRefresh="true"/>
				</td>
				 <td align="right" width="10%">日志类型英文名 </td>
				 <td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="logName" row="0" type="text" style="width:100px" />
				</td>			
			</tr>
			<tr>
				 <td align="right" width="10%">执行状态 </td>
				 <td align="left" nowrap width="5%">
		      		<EF:EFSelect blockId="inqu_status" ename="status" row="0">
		      		<EF:EFOption label="--请选择--" value =""></EF:EFOption>
		       		<EF:EFOption label="成功" value="I"></EF:EFOption>
		       		<EF:EFOption label="失败" value="E"></EF:EFOption>
		    		</EF:EFSelect>
		    	</td>
		    	
		    	<td align="right" width="10%">日志执行类型 </td>
				 <td align="left" nowrap width="5%">
		      	    <EF:EFSelect blockId="inqu_status" ename="position" row="0">
		      	    <EF:EFOption label="--请选择--" value =""></EF:EFOption>
		       		<EF:EFOption label="起始" value="S"></EF:EFOption>
		       		<EF:EFOption label="结束" value="E"></EF:EFOption>
		       		<EF:EFOption label="单条" value="L"></EF:EFOption>
		    		</EF:EFSelect>
		    	</td>
			</tr>
			<tr>
				 <td align="right" width="10%">耗时 &gt;</td>
				 <td nowrap colspan="1" width="15%">
					<EF:EFInput blockId="inqu_status" ename="minCost" row="0" type="text" style="width:80px" />ms
				</td>
				<td align="right" width="10%">耗时&lt;</td>
				 <td nowrap colspan="1" width="15%">
					<EF:EFInput blockId="inqu_status" ename="maxCost" row="0" type="text" style="width:80px" />ms
				</td>
				<td width="50%" colspan = "2">
				</td>
			</tr>
		</table>
	<EF:EFInput blockId="inqu_status" ename="count" row="0" type="hidden"/>
  </div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"  efRegionShowClear = false> 
	<div id = "ef_grid_result" title="在线日志信息" style="overflow: hidden;height:440px;">
	</div> 
</div>

<EF:EFRegion/>

<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden"/>
<EF:EFGrid blockId = "result" autoDraw = "yes"  ajax = "true" readonly="true" enable="false" style="operationBar:false;">
	<EF:EFColumn ename="seqId" cname="序列号" width="130"/>
	<EF:EFColumn ename="id" cname="标识" width="30"/>
	<EF:EFColumn ename="parent" cname="父节点标识" width="30"/>
	<EF:EFColumn ename="leaf" cname="叶子标识" width="30"/>
	<EF:EFColumn ename="depth" cname="深度" width="30"/>
	<EF:EFColumn ename="logId" cname="类型标识" width="50"/>
	<EF:EFColumn ename="logName" cname="类型名称" width="130"/>
	<EF:EFColumn ename="status" cname="状态" width="30"/>
	<EF:EFColumn ename="position" cname="位置" width="30"/>
	<EF:EFColumn ename="time" cname="时间" width="150"/>
	<EF:EFColumn ename="cost" cname="耗时" width="50"/>
	<EF:EFColumn ename="context1" cname="上下文1" width="100"/>
	<EF:EFColumn ename="context2" cname="上下文2" width="100"/>
	<EF:EFColumn ename="context3" cname="上下文3" width="100"/>
	<EF:EFColumn ename="context4" cname="上下文4" width="100"/>
	<EF:EFColumn ename="context5" cname="上下文5" width="100"/>
	<EF:EFColumn ename="information" cname="信息" width="500"/>
</EF:EFGrid>
<jsp:include flush = "false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
