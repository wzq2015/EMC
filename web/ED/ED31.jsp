<!DOCTYPE html>
<%@page import="com.baosight.iplat4j.ep.monitor.Diagnostics"%>
<%@page import="com.baosight.iplat4j.base.utils.DiagnoseUtils"%>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	//session.getAttributes();
	DiagnoseUtils.clean(session.getId());
	String frame_url = request.getContextPath() + "/DispatchAction.do?efFormEname=EP311" + "&_d_session=" + session.getId();
	//String status = Diagnostics.isEnable() ? "开启中[点击关闭]" : "关闭中[点击开启]";
	//String s = Diagnostics.isEnable() ? "true" : "false";
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/ED31.js"></script>
	
</head>
<body class="bodyBackground">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="诊断页面" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    
		    <td nowrap width="15%">
		      页面号
		    </td>
		    
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="formEname" row="0" etc=' style="text-transform : uppercase;" onKeyPress="openFormById(event)"'/>
		    </td>
		  
		  </tr>
		</table>
	</div>
</div>

<div id="ef_tab_y"  lastRange="98.5%" eftabWidth="100%">
	<div id="tab1" title="诊断页面" eftabSrc="about:blank" eftabHeight="6000px" efRemember="yes">
	</div>
	<div id="tab2" title="诊断结果" eftabSrc="about:blank" eftabHeight="6000px" efRemember="yes">
	</div>
</div>
<EF:EFTab tabId="y" />

<!--<div id = "ef_region_result" title="诊断结果" efRegionShowClear=false>-->
<!--	<iframe id="frame" src="about:blank" style="width:100%;height:500px;border:0px;"></iframe>-->
<!--</div>    -->

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
<script type="text/javascript">
	var hideSubPageHead = true;
	var frame_url = "<%=frame_url%>";
</script>
</body>
</html>   
