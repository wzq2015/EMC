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
	<script type="text/javascript" src="./EC/SA/ECSA01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSA01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
			  <div style="overflow:hidden;">
						<table width="100%">
						  <tr>
						   <td nowrap  align="right" style="width:20%">
						     	文章创建开始日期：
						    </td>
						    <td nowrap" align="left" style="width:15%">
						    	<EF:EFInput blockId="inqu_status" ename="TimeStart" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
						    </td>
						    <td nowrap  align="right" style="width:20%">
						     	文章创建截止日期：
						    </td>
						     <td nowrap " align="left" style="width:15%">
						     	<EF:EFInput blockId="inqu_status" ename="TimeEnd" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
						    </td>
						    <td nowrap  align="right" style="width:15%">
						    	<input type="checkbox" id="isPicture" onclick="openChart()"/>图形化展示
						    </td>
						    <td nowrap  align="center" style="width:15%;">
						    	<div id="tdCount" style="display:none;">
						    	前<input type="text" id="count" value="5" maxlength="3" style="width:30px;" onchange="showCondition()"/>条记录
						    	</div>
						    </td>
						  </tr>
						</table>
					</div>
</div>  


<div id = "ef_region_result" title="记录集" style="width:400px;float:left;"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
 
<EF:EFGrid blockId="result"   readonly="true" enable="false" style="float:left;">
<EF:EFColumn ename="creator" cname="创建者" readonly="true" align="center"/>	
<EF:EFColumn ename="num" cname="文章数目" enable="false"  readonly="true" align="center" displayType="hyperlink"/>
</EF:EFGrid>      

<div id = "ef_region_chart" title="图形区域" style="width:400px;float:left;display:none;"> 
	<iframe  id="chart"   height="300" width="100%"  style="overflow: hidden;float:left;"></iframe>
</div> 

<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
