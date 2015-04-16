<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>

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
	<script type="text/javascript" src="./EE/EE1002.js"></script>
	
</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div>
		<font color='blue'><b><li>表格当前记录演示，添加行数据演示。当前选中行[</b></font>
		<font color='red'><span id="currentRow">0</span></font>
		<font color='blue'><b>]。点击新增弹出新窗口，选择几条数据后点击保存，一起加入到表格中。</b></font>
	</div>
	<div id = "ef_grid_s" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>     

<EF:EFRegion/>

<EF:EFGrid blockId="r" autoDraw="yes" ajax="true" 
	paintId="ef_grid_s" style="operationBar:true;toolBar:false;initSelect:true;sortable:false;showCount:false" >	
			
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
	
