<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@ page import="com.baosight.iplat4j.util.DateUtils" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EL/EL0009.js"></script>

</head>
<body class="bodyBackground">
	<form id="EL0009" method="POST" action="<%=actionUrl%>" >
	<input type="hidden" id="currentdate" value="<%=DateUtils.curDateStr()%>" />
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>"  efRegionShowClear="true" >
		<div id = "ef_div_inqu" style = "overflow:hidden;width:100%">
		<table  border="0">
		<tr>
		<td>
		起始日期：
		</td>
		<td>
		<EF:EFInput blockId="inqu_status" ename="startdate"  popup="date" row="0" etc="nullable='false'" />				
		</td>
		<td nowrap>
		结束日期：
		</td>
		<td>		
		<EF:EFInput blockId="inqu_status" ename="enddate"  popup="date" row="0" etc="nullable='false'" />					
		</td>
		<td>
		耗时最大值(毫秒)：
		</td>
		<td>
		<EF:EFInput blockId="inqu_status" ename="maxcost"  row="0" etc="nullable='false'" />				
		</td>
		</tr>
		</table>
		</div>
		</div>		
		<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"  efRegionShowClear = true> 
		<div id = "ef_grid_result" title="页面响应平均时间统计" style="overflow: hidden;height:500px;">
		</div> 
		</div>
		<EF:EFRegion />		
		<EF:EFGrid blockId = "result" autoDraw = "false"  ajax = "true" readonly="false" style="navigationBar:false;operationBar:false">
		<EF:EFColumn ename="id"  cname='<%=I18nMessages.getText("label.rownum","序号")%>' sort="true" readonly="true" width="200" />
		<EF:EFColumn ename="formename" cname='<%=I18nMessages.getText("label.formcode","画面编码") %>' readonly="true" width="200" />
		<EF:EFColumn ename="formcname" cname='<%=I18nMessages.getText("label.formcnname","画面名称") %>'  readonly="true" width="200" />
		<EF:EFColumn ename="cost" enable="false" cname='<%=I18nMessages.getText("label.avgcost","平均时间") %>'  width="200" />
		</EF:EFGrid>			
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
