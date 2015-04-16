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
	String display="none";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD54.js"></script>
	 
</head>
<body class="bodyBackground">

<form id="EDMD50" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFInput blockId="inqu_status" ename="regionId" row="0" type="hidden"/>

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="按钮配置" style="overflow: hidden;height:275px;">
	</div> 
</div>

<EF:EFRegion/>
  
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" >	
	<EF:EFColumn ename="id" cname="按钮ID" width="80" fix="yes" visible="false" />
	<EF:EFColumn ename="buttonEname" fix="yes" cname="按钮英文名" width="180"  />
	<EF:EFColumn ename="buttonCname" cname="按钮中文名" width="200"  />
	<EF:EFColumn ename="validateGroup" cname="检核组" width="200"  />
	<EF:EFColumn ename="nodeSortId" cname="序号" width="200"  />
	<EF:EFColumn ename="serviceEname" cname="服务名" width="200"  />
	<EF:EFColumn ename="methodEname" cname="方法名" width="200"  />
	<EF:EFColumn ename="buttonCode" cname="按钮代码" width="200"  />
	
</EF:EFGrid>
    

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
