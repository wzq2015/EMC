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
	<script type="text/javascript" src="./EL/EL00031.js"></script>
</head>
<body class="bodyBackground">
<form id="EL00031" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div style="overflow:hidden;width:100%">
		<table width="100%">
			<tr>
				<td align="right" width="10%">日志类型编号 </td>
				 <td nowrap colspan="1" width="5%">
					<EF:EFSelect blockId="inqu_status" ename="reqType" row="0" >		   
		   		    <EF:EFCodeOption codeName="iplat.el.logtype" />
		 			</EF:EFSelect>		
				</td>
		    	
				<td nowrap align="right" width="10%" >时间范围下限</td>
				<td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="timeLower" row="0" type="text" style="width:50px" />S
				</td>
				<td nowrap align="right" width="10%">时间范围上限</td>
				<td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="timeUpper" row="0" type="text" style="width:50px" />S
				</td>
				<td width="45%">
				</td>		
			</tr>
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

<EF:EFGrid blockId="result" sumType="none" ajax="true" style="navigationBar:false;operationBar:false" readonly="false" >
	
	<EF:EFColumn ename="itemName" cname="条目名" width="180" />
	<EF:EFColumn ename="itemValue" cname="次数" width="60"  />
	<EF:EFColumn ename="itemProportion" cname="比例" width="60" />
</EF:EFGrid>



<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
