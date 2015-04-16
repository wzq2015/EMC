<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>数据表归档配置</title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EU/EU20.js"></script>

</head>
<body class="bodyBackground">
	<form id="EU16" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<div id="ef_region_inqu" title="查询条件"  efRegionShowClear=true>
		<div id = "ef_div_inqu" style = "overflow:hidden;width:100%">
		<table  border="0">
		<tr>
		<td>
		源表名：
		<EF:EFInput  blockId="inqu_status"  ename="sourcetablename"  row="0" style="text-align:left;" />
		<img  style="display:none" title="<%=I18nMessages.getText("label.tablelist","数据库表列表") %>" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'" onClick="openSubGrid()" />		
		</td>		
		<td>
		归档表名：
		<EF:EFInput blockId="inqu_status" ename="archivetablename" row="0" style="text-align:left;" />		
		</td>
		<tr>
		</table>
		</div>			
		</div>
		
<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"  efRegionShowClear = false> 
	<div id = "ef_grid_result" title="表数据归档定义" style="overflow: hidden;height:440px;">
	</div> 
</div>

<EF:EFRegion/>
<EF:EFGrid blockId = "result" autoDraw = "no"  ajax = "true">
	<EF:EFColumn ename="sourcetablename" cname="源表名" width="110"/>	
	<EF:EFColumn ename="archivetablename" cname="归档表名" width="110"/>
	<EF:EFColumn ename="archivesql" cname="归档sql" width="550"/>
	<EF:EFColumn ename="jobname" cname="归档任务编号" width="110"/>	
	<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobAction","操作") %>' ename="jobAction" width="100"  readonly="true"/>		
</EF:EFGrid>
<jsp:include flush = "false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
