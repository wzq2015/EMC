<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<html>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";	
%>

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9">
	<title>编辑数据集参与者</title>
	<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
	
	<script type="text/javascript" src="EU/mxGraph/mxClient.js"></script>
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/attributeSetting/ActivityParticipantsSetting.js"></script>
    <script type="text/javascript" src="EW/WorkflowDesigner/js/attributeSetting/ManualActivitySetting.js"></script>
	<script type="text/javascript" src="EW/EW0124.js"></script>
	<link type="text/css" rel="stylesheet" href="EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>
<body class="bodyBackground">

<form id="EW0124" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div  title="" style="overflow: hidden;height:250px;">
     
	<div id="ef_region_cdPart">
	<EF:EFInput ename="type"  type="hidden"/>
		<table width="100%">
		<tr >
			<td nowrap="nowrap" align="right" width="25%" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr>
			<td nowrap="nowrap" width="25%" align="right">标识:</td>
			<td nowrap="nowrap">
				<EF:EFInput  ename="id" type="text" />
			</td>
		 </tr>
		  <tr>
			<td nowrap="nowrap" align="right">名称:</td>
			<td nowrap="nowrap" >
				<EF:EFInput  ename="name" type="text"/>
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">表名:</td>
			<td nowrap="nowrap">
				<EF:EFInput  ename="tableName" type="text"/>
			</td>
		  </tr>
		   <tr>
			<td nowrap="nowrap" align="right">规则条件:</td>
			<td nowrap="nowrap">
				<textarea id="rule"  cols="52" rows="6"></textarea>	
			</td>
		  </tr>
		</table>
	</div>
</div>
<EF:EFRegion/>

<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="50%">		   
		    </td>
		    <td nowrap >
		    	<EF:EFButton ename="confirm" cname="保存" />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="cancel" cname="关闭" />
		    </td>
		     <td nowrap width="50%">		   
		    </td>
		  </tr>  
 	</table>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
