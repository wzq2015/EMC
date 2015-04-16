<!DOCTYPE html>
<!-- Generate time : 2012-08-16 13:25:34 -->
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
	<script type="text/javascript" src="./EL/EL0010.js"></script>
</head>
<body class="bodyBackground">
<form id="EL0010" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div style="overflow:hidden;width:100%">
		<table width="50%">
			<tr>
			 <td align="right" width="5%">
			 开始日期
			 </td>
			 <td align="left" width="10%">
			 <EF:EFInput  blockId="inqu_status" ename="startTime" row="0" type="text" style="width:85%" etc="nullable='false'"/>
			 <img id="efcalendar1" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_1_click(this);">
			 </td>
			 <td align="right" width="5%">
			 结束日期
			 </td>
			 <td align="left" width="10%">
			 <EF:EFInput  blockId="inqu_status" ename="endTime" row="0" type="text" style="width:85%" />
			 <img id="efcalendar2" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_2_click(this);">
			 </td>
			</tr>
		</table>
	</div>
</div>


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="记录信息" style="overflow: hidden;height:500px;">
	</div>
</div>


<EF:EFRegion/>

<EF:EFGrid blockId="result" sumType="none" ajax="true"  >
	<EF:EFColumn ename="formEname" cname="页面号" width="200"  />
	<EF:EFColumn ename="formCname" cname="页面名称" width="300"  />
	<EF:EFColumn ename="count" cname="访问次数" width="100" />
</EF:EFGrid>



<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
