<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@page import="com.baosight.iplat4j.ef.ui.column.*,java.util.*"%>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ES/AA/ESAA03.js"></script>
</head>
<body class="bodyBackground">

<form id="ESAA03" method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

   <div id = "ef_region_result" title="角色选择" style="overflow:scroll">
	 <div id = "ef_grid_result" title="角色选择" style="overflow: hidden;height:500px;">
     </div>
   </div>

<EF:EFRegion />

  <EF:EFGrid blockId="result" autoDraw="no" readonly="true" style="navigationBar:false;operationBar:false">
	<EF:EFColumn ename="postLabel" cname="角色标签" width="200" />
	<EF:EFColumn ename="postName" cname="角色名称" width="200" />
  </EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
