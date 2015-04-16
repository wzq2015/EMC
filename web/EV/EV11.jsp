
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.util.util.EiInfoUtil"%>
<%
	String contextpath = request.getContextPath();
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	
	EiInfo Info = (EiInfo)request.getAttribute("ei");
	System.out.println(EiInfoUtil.toXML(Info));
	String portalId =(String)Info.getAttr().get("portalId");
	String layoutId =(String)Info.getAttr().get("layoutId");
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/EV11.js"></script>
</head>

<body class="bodyBackground">
<input type="hidden" id="portalId" value="<%=portalId%>"/>
<input type="hidden" id="layoutId" value="<%=layoutId%>"/>
	<form id="EV11" method="POST" action="<%=actionUrl%>">
		<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
		
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

<EF:EFGrid blockId="result" ajax="true" style="operationBar:false" readonly="true" enable="false">
	<EF:EFColumn ename="radio" align="right" enable="false"/>
  	<EF:EFColumn ename="layoutName" maxLength="100" nullable="false"/>
  	<EF:EFColumn ename="layoutId" visible="false"/>
</EF:EFGrid>

		<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
	</form>
</body>
</html>
