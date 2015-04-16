<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConfig"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConstants"%>
<%@ page
	import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@ page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%@ page import="com.baosight.iplat4j.core.FrameworkInfo"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EU/EU17.js"></script>

</head>
<body class="bodyBackground">
	<form id="EU17" method="POST" action="<%=actionUrl%>">
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<div id="ef_region_remote" title="远程调用信息" efRegionShowClear=true>
			<table border="0" width="70%">
				<tr>
					<td align="right" width="10%">远程地址</td>
					<td width="50%"><EF:EFInput blockId="" row=""
							ename="soaRemoteTarget" style="text-align:left;width:100%;" /></td>
					<td align="left" width="40%">【远程地址（IP:Port/AppName）或者已经配置的应用名】</td>
				</tr>
				<tr>
					<td align="right">远程功能标识</td>
					<td><EF:EFInput blockId="" row="" ename="funcId"
							style="text-align:left;width:50%;" /></td>
					<td />
				</tr>
				<tr>
					<td align="right">调用参数</td>
					<td><EF:EFInput blockId="" row="" ename="funcPara"
							style="text-align:left;width:100%;" /></td>
					<td><EF:EFButton ename="query"  type="button" cname="提交" /></td>
				</tr>
				<tr>
			</table>
		</div>
		<div id="ef_region_result" title="远程调用结果" efRegio nShowClear=true>
			<div id="ef_grid_result" title="调用返回结果"
				style="overflow: hidden; height: 275px;"></div>
		</div>
		</div>
		<EF:EFRegion />
		<EF:EFGrid blockId="result" autoDraw="yes" readonly="true">
		</EF:EFGrid>
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
