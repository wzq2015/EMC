<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EL/EL0004.js"></script>
</head>
<body class="bodyBackground">
<form id="EL0004" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div style="overflow:hidden;width:100%">
		<table width="100%">
			<tr>
			 <td align="right" width="10%">
			 开始日期
			 </td>
			 <td align="left" width="15%">
			 <EF:EFInput  blockId="inqu_status" ename="startDate" row="0" type="text" style="width:85%" etc="nullable='false'" />
			 <img id="efcalendar1" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_1_click(this);">
			 </td>
			 <td align="right" width="10%">
			 结束日期
			 </td>
			 <td align="left" width="15%">
			 <EF:EFInput  blockId="inqu_status" ename="endDate" row="0" type="text" style="width:85%" />
			 <img id="efcalendar2" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_2_click(this);">
			 </td>
			 <td width="50%" colspan="2">
			 </td>
			</tr>
	 	</table>
	 </div>
</div>


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="记录信息" style="overflow: hidden;height:300px;">
	</div>
</div>


<iframe  id="chart"   height="500" width="700"  style="display:none; border:0px;"></iframe>

<EF:EFRegion/>

<EF:EFGrid blockId="result" sumType="none" ajax="true" style="navigationBar:false;operationBar:false" readonly="false">
	
	<EF:EFColumn ename="itemId" cname="序号" width="50" />
	<EF:EFColumn ename="itemEname" cname="部门编码" width="80" />
	<EF:EFColumn ename="itemName" cname="部门名称" width="80"  />
	<EF:EFColumn ename="itemValue" cname="访问人数" width="100" />
</EF:EFGrid>



<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
