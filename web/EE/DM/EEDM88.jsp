<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EV/EV.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM88.js"></script>
	<script language="JavaScript" src="./FusionCharts/Charts/FusionCharts.js"></script>
</head>
<body class="bodyBackground">

<form id="EEDM88" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      数据来源
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="inqu" ename="data" row="0" etc="style='width:145'">
		      <EF:EFOption label="数据1" value="1"></EF:EFOption>
		      <EF:EFOption label="数据2" value="2"></EF:EFOption>
			</EF:EFSelect>
		    </td>
		  </tr>
		  <tr> 
		     <td nowrap width="15%">图片背景色</td>
			 <td><EF:EFInput blockId="inqu" ename="bgcolor" row="0"
					etc="readOnly" /> <img title='颜色选择器' align='center'
					src='EV/images/color.JPG' onmouseover="this.style.cursor='hand'"
					onClick="openSelectColor(1);"></td>
		     </td>
		     <td nowrap width="15%" align="left">图形背景色</td>
			 <td><EF:EFInput blockId="inqu" ename="plotcolor" row="0"
					etc="readOnly" /> <img title='颜色选择器' align='center'
					src='EV/images/color.JPG' onmouseover="this.style.cursor='hand'"
					onClick="openSelectColor(2);"></td>
		     </td>
		  </tr>
		</table>
	</div>
</div>  
  <EF:EFRegion/> 
	<iframe id='iframe1' width='100%' height='100%' src='DispatchAction.do?efFormEname=EV0106&portalId=0000000000000167&editFlag=true'/>



<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
