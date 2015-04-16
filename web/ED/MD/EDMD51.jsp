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
	<script type="text/javascript" src="./ED/MD/EDMD50.js"></script>
	 
</head>
<body class="bodyBackground">

<form id="EDMD51" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="模板区域" style="overflow: hidden;height:275px;">
	</div> 
</div>

<EF:EFRegion/>
  
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" style="operationBar:false" >	
	<EF:EFColumn ename="id" width="150" visible="true" fix="yes"  />
	<EF:EFColumn ename="templetId" cname="布局模板编号" width="150" fix="yes"  />
	<EF:EFColumn ename="regionEname" cname="区域名称" width="150"  />
	
	<EF:EFComboColumn ename="regionType" cname="区域类型" width="150" >
		<EF:EFCodeOption codeName="iplat.edmd.regiontype" />
	</EF:EFComboColumn>
	<EF:EFColumn ename="description" cname="描述"  width="200" />

</EF:EFGrid>
    

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
