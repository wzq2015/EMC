
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
	<script type="text/javascript" src="./EV/CM/EVCM0701.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM0701" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<table id="mainFrameTable" width="100%" cellpadding=1 cellspacing=0 >
 	<tr height=100%>
	<td>
	 	<td valign="top">
			<div id = "ef_region_result" title="布局记录" >		         
		   		<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
		   		</div>
			</div>
		</td>
	</td>
	</tr>
</table>

<EF:EFRegion/>

<EF:EFGrid blockId="result" serviceName="ServiceEVCM07" style="operationBar:false" readonly="true" enable="false">
	<EF:EFColumn ename="radio" align="right" enable="false"/>
  	<EF:EFColumn ename="layoutName" maxLength="100" nullable="false"/>
  	<EF:EFColumn ename="layoutId" visible="false"/>
</EF:EFGrid>  

<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>  
