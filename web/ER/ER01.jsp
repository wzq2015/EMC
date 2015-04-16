
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ER/ER01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ER01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      报表标识
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="reportId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      报表归属
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="reportBelongTo" row="0" />
		    </td>
		   </tr>
		  <tr>
		    <td nowrap width="15%">
		      报表版本
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="reportVersion" row="0" />
		    </td>
		    <td nowrap width="15%">
		      报表自定义名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="reportUdn" row="0" />
		    </td>
		   </tr>		    		    
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" style="operationBar:false">	
  <EF:EFColumn ename="reportUdn" cname="报表自定义名称" width="150"/>
  <EF:EFColumn ename="reportUdf" cname="报表自定义函数" width="250" editType="textarea" displayType="text"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
