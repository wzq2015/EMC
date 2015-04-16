<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ page import="com.baosight.iplat4j.dao.*" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="ED/MD/EDMD98.js"></script>

</head>
<body class="bodyBackground">
<form id="EDMD98" method="POST" action="<%=actionUrl%>">
<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<input id="flowName" value="" type="hidden">
<div id="ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div>
		<table>
		  <tr>
			<td nowrap="nowrap" width="10%">流程定义名称</td>
			<td nowrap="nowrap" width="25%">
				<EF:EFInput blockId="inqu_status" ename="name" row="0" />
			</td>
			<td nowrap="nowrap" width="10%">流程定义显示名称</td>
			<td nowrap="nowrap" width="25%">
				<EF:EFInput blockId="inqu_status" ename="displayName" row="0" />
			</td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
  <div id = "ef_grid_result" title="" style="overflow:hidden;height:450px;">
  </div>
</div>

<EF:EFGrid blockId="result" autoDraw="no" ajax="true" enable="false" style="navigationBar:false">
  <EF:EFColumn ename="name" cname="流程定义名称" nullable="false" readonly="true" width="200"/>
  <EF:EFColumn ename="displayName" cname="流程定义显示名称" nullable="false" readonly="true" width="200"/>
  <EF:EFColumn ename="desc" cname="流程定义描述" nullable="false" readonly="true" width="300"/>
  <EF:EFColumn ename="register" cname="入口注册" displayType="textbutton" align="center" readonly="true" width="60" />
</EF:EFGrid>
<EF:EFRegion/>
</form>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>