<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/ED30.js"></script>

</head>
<body class="bodyBackground">
<form id="ED30" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
	<div>
		 <table>
		  <tr>
		    
		    <td noWarp=-1 width="10%">
		    SqlMap Namespace</td>
		    <td noWarp=-1 width="20%">
		    <EF:EFInput blockId="inqu_status" ename="namespace" row="0" />
		    </td>
		  </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_detail" title="详细信息">
<p style="font-size:12px;font-weight:bold;margin:5px;">详细信息</p>
<EF:EFInput type="textarea" blockId="inqu_status" ename="refreshInfo" row="0" etc="cols='100' rows='20' readonly='readonly'"/>
</div>

<EF:EFRegion/>

	<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
