<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EU/EU18.js"></script>

</head>
<body class="bodyBackground">
	<form id="EU18" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<div id="ef_region_inqu" title="主机连接信息"  efRegionShowClear=true>
		<table  border="0">
		<tr>
		<td>
		主机名称：
		<EF:EFInput  blockId="inqu_status"  ename="hostname"  row="0" style="text-align:left;" />
		主机账号：
		<EF:EFInput  blockId="inqu_status"   ename="username"  row="0" style="text-align:left;" />
		密码：
		<EF:EFInput  blockId="inqu_status"  type="password" ename="password"  row="0" style="text-align:left;" />	
		</td>
		</tr>		
		</table>			
		</div>
		<div id = "ef_region_result" style="overflow:scroll" title="<%=I18nMessages.getText("label.msgsetting", "消息配置信息")%>" efRegionShowClear=true>
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.msgsetting", "消息配置信息")%>" style="overflow: hidden;height:275px;">		
	</div>
	</div>	
	<EF:EFRegion />	
		
	<EF:EFGrid blockId="result" autoDraw="no" readonly="false" style="operationBar:false;">	
	<EF:EFColumn ename="hostname" cname="主机名" fix="no" readonly="true" width="80" />
	<EF:EFColumn ename="username"  cname="用户名" width="80" />
	<EF:EFColumn ename="password" cname="密码" width="80" visible="false" />	
	</EF:EFGrid>  			
	<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
