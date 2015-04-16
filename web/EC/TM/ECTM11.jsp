<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String type=request.getParameter("type").toString();
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM11.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="站点栏目树" efRegionShowClear=false>
	<div id="ef_region_main">
              <input type="hidden" id="type" name="type" value="<%=type%>">
    		  <div id="leftTreeDiv" style='overflow:auto; width:100%; height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="站点栏目树" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>

	</div>
</div>  

<EF:EFRegion/>  
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
