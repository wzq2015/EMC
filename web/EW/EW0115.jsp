<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<html>
<head>
	
	<title>
	</title>
	<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9">
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/mxGraph/mxClient.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/ActivityParticipantsSetting.js"></script>    
	<script type="text/javascript" src="./EW/EW0115.js"></script>
</head>
<body class="bodyBackground">
<form id="EW0115" method="POST" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_region_basicAttr" title="" style="overflow: hidden;height:340px;">
<table style="width:100%">
<tr>
<td align="left" nowrap colspan="4">
<div id = "ef_grid_customizeDatasetResult" title="页面信息" style="overflow: hidden;height:280px;">

 </div>
 <EF:EFRegion /> 
 </td>
</tr>
<tr>
	         <td nowrap width="50%"></td>	   
		     <td align="right" nowrap >
		     <EF:EFButton ename="confirm" cname="确定" />
		     </td> 
		     <td align="left" nowrap >
		     <EF:EFButton ename="cancel" cname="取消" />
		     </td> 
		     <td nowrap width="50%"></td>
		  </tr>
</table>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
