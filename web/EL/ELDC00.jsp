<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EL/ELDC00.js"></script>
	
</head>
<body class="bodyBackground">

<form id="forms" method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<!-- <div id = "ef_region_inqu" title="查询条件">
	<div>
		<table>
		  <tr>
		    <td noWarp=-1 width="25%">
		      异常类型
		    </td>
		    <td noWarp=-1 width="25%">
		      <html:text property="value(inqu_status:0:exceptionType)" styleClass = "inputField" />
		    </td>
		    <td noWarp=-1 width="25%">
		      
		    </td>
		    <td noWarp=-1 width="25%">
		    </td>
		  </tr>
		  <tr>
		    <td >
		      时间上限
		    </td>
		    <td >
		      <html:text styleId="startDate" property="value(inqu_status:0:startDate)" styleClass = "inputField" />
					<img src="./EF/Images/efcalendar_icon.gif" onClick="efcalendar_1_click(this);">
		    </td>
		    <td >
		      时间下限
		    </td>
		    <td >
		      <html:text styleId="endDate" property="value(inqu_status:0:endDate)" styleClass = "inputField" />
					<img src="./EF/Images/efcalendar_icon.gif" onClick="efcalendar_2_click(this);">
		    </td>
		  </tr>
		</table>
	</div>
</div>-->  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:400px;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="r" autoDraw="yes" readonly="false">
	<EF:EFComboColumn ename="appender" cname="输出器" blockName="appender" valueProperty="name" />
	<EF:EFComboColumn ename="level" cname="级别" blockName="level" valueProperty="name" />
	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
