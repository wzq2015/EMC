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
	<script type="text/javascript" src="./EE/DM/EEDM28.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EEDM28" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      公司代号
		    </td>
		    <td nowrap width="20%">
		     <EF:EFButton ename="testId" cname="" />
		    <EF:EFButton ename="testId2" cname="test2" />
		    </td>

		  </tr>
		</table>

 
	</div>
</div>  

<EF:EFButton ename="TESTID" cname="TEST2" />
<EF:EFButton ename="TESTID3" cname="TEST2" />
<div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionButtonBarAlign="left"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes">	
<EF:EFColumn ename="companyDate" cname="成立日期" editType="date" dateFormat="yyyy-mm-dd" />
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
