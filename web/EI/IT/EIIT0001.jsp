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
	<script type="text/javascript" src="./EI/IT/EIIT0001.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EIIT00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td width="20%" align="right">
		      字段索引号
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="itemSeq" row="0" etc="onkeyup=&quot;value=value.replace(/[^\d]/g,'')&quot;,onbeforepaster=&quot;clipboardData.text=clipboardData.text.replace(/[^\d]/g,'')&quot;" />
		    </td>
		    <td width="10%" align="right">
		      字段英文名
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="itemEname" row="0" style="text-transform : uppercase;" />
		    </td>
		    <td width="10%" align="right">
		      字段中文名
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="itemCname" row="0" style="text-transform : uppercase;" />
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
<EF:EFGrid blockId="result" autoDraw="yes" style="operationBar:false">	
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
