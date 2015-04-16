
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String portalId = request.getParameter("portalId");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/EV13.js"></script>
</head>
<body class="bodyBackground">
	<form id="EV13" method="POST" action="<%=actionUrl%>">
		<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
		<div id="ef_region_inqu_status" title="查询条件" style="display: none">
			<div style="overflow: hidden; width: 100%">
				<table>				
					<EF:EFInput type="hidden" blockId="inqu_status" ename="queryUserCommonPortalUserId" row="0" />
				</table>
			</div>
		</div>
		
		<div id="ef_region_result" title="记录集" style="overflow: scroll">
			<div id="ef_grid_result" title="页面信息" style="overflow: hidden; height: 400px;">
			</div>
		</div>
		<EF:EFRegion />
		<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:false;operationBar:false">
			<input id="portalId" name="portalId" value="<%=portalId%>" type="hidden">
			<EF:EFColumn ename="tabId" readonly="true" />
			<EF:EFColumn ename="portletId" readonly="true" />
			<EF:EFColumn ename="tabName" readonly="true" />
			<EF:EFComboColumn ename="tabType" readonly="true">
				<EF:EFOption value="1" label="IFrame" />
				<EF:EFOption value="2" label="RSS" />
				<EF:EFOption value="4" label="内容接口" />
			</EF:EFComboColumn>
			<EF:EFColumn ename="tabUrl" width="300" readonly="true" />
			<EF:EFComboColumn ename="tabSource" readonly="true" width="80">
				<EF:EFOption value="0" label="来自平台" />
				<EF:EFOption value="1" label="自定义" />
				<EF:EFOption value="2" label="内容管理" />
			</EF:EFComboColumn>
			<EF:EFColumn ename="ssoSystemId"  cname="单点登录系统标识" readonly="true"/>
		</EF:EFGrid>
		<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
	</form>	
</body>
</html>
