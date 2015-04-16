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
<script type="text/javascript" src="./EL/EL0007.js"></script>

</head>
<body class="bodyBackground">
	<form id="EL0007" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<input type="hidden" id="currentdate" value="<%=DateUtils.curDateStr()%>" />
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
		<td nowrap>
		 访问类型：
		</td>
		<td>		
		 <EF:EFSelect blockId="inqu_status" ename="logtype" row="0" >		   
		    <EF:EFCodeOption codeName="iplat.el.logtype" />
		 </EF:EFSelect>			
		</td>		
		</tr>	
		</table>
		</div>
		</div>				
		<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"  efRegionShowClear = true> 
		<div id = "ef_grid_result" title="模块访问量统计" style="overflow: hidden;height:500px;">
		</div> 
		</div>
		<EF:EFRegion />		
		<EF:EFGrid blockId = "result" autoDraw = "false"  ajax = "true" readonly="false" style="navigationBar:false;operationBar:false">
		<EF:EFColumn ename="id"  cname='<%=I18nMessages.getText("label.rownum","序号")%>' sort="true" readonly="true" width="200" />
		<EF:EFColumn ename="modulename" cname='<%=I18nMessages.getText("label.modulecode","模块编码") %>' readonly="true" width="200" />
		<EF:EFColumn ename="modulecname" cname='<%=I18nMessages.getText("label.modulecnname","模块中文名称") %>'  readonly="true" width="200" />
		<EF:EFColumn ename="accesscount" enable="false" cname='<%=I18nMessages.getText("label.accesscount","访问量") %>'  width="200" />
		</EF:EFGrid>			
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
