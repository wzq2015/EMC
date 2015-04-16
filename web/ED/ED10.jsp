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
	<script type="text/javascript" src="./ED/ED10.js"></script>

</head>
<body class="bodyBackground">
<form id="ED10" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
		    <td noWarp=-1 width="25%">
		     <%=I18nMessages.getText("E_Col.fproviderkey", "提供者键值")%>
		    </td>
		    <td noWarp=-1 width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fproviderkey" row="0" />
		    </td>
		  </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;">
	</div>
</div>

<EF:EFRegion/>

	<EF:EFGrid blockId="result" autoDraw="no" ajax="true">
		<EF:EFColumn ename="fproviderkey" displayType="hyperlink" readonly="true"/>
		<EF:EFColumn ename="fprovidername" />
		<EF:EFColumn ename="frestable" />
		<EF:EFColumn ename="frefreshdelay" validateType="nonnegative_integer"/>
		<EF:EFColumn ename="fproviderdesc" />
	</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
