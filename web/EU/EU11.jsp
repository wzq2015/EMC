<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/EU11.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="70" >
		      数据库表名:
		    </td>
		    <td nowrap width="350">
		    <EF:EFInput blockId="inqu_status" ename="tableEname" row="0" etc="validateType='string'"/>
		    </td>
		  </tr>
		  
		</table>
	</div>
</div>  
<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
  
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" >
	<EF:EFColumn ename="tableEname" readonly="true" width="200" cname="数据库表名"  />
	<EF:EFColumn ename="sqlText"  width="580" cname="WHERE子句(你应该包含'where'关键字)"  />
	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
