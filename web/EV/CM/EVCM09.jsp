
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String portletId = request.getParameter("inqu_status-0-portletId");
	String portletType = request.getParameter("inqu_status-0-portletType");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM09.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM09" method="POST" action="<%=actionUrl%>" >
<EF:EFInput blockId="inqu_status" ename="portletId" row="0" type="hidden" value="<%=portletId %>"/>
<EF:EFInput blockId="inqu_status" ename="portletType" row="0" type="hidden" value="<%=portletType %>"/>
<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;"></div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" paintId="ef_grid_result" ajax='true' >
  <EF:EFColumn ename="portletType" cname="Portlet类型"  visible="false"/>
  <EF:EFColumn ename="portletId" cname="portletId"  visible="false"/>
  <EF:EFColumn ename="paraName" cname="参数名称"  readonly="true" nullable="false" minLength="1" maxLength="50" validateType='string' />
  <EF:EFColumn ename="paraValue" cname="参数值" nullable="false" minLength="1" maxLength="50" validateType='string'/>
  <EF:EFColumn ename="paraDetail" cname="描述" maxLength="100" width="200"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>  
