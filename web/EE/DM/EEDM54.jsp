<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM54.js"></script>
</head>
<body class="bodyBackground" >
<form id="EEDM54" method="POST" action="<%=actionUrl%>"  style='position:absolute;height:99%;width:99.5%'>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<link href="./EF/EFOrgTree.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="./EF/OrgTree/wz_jsgraphics.js"></script>
<script type="text/javascript" src="./EF/OrgTree/horizontalOrgChart.js"></script>

<EF:EFOrgTree direction="vertical"/>

</form>
</body>
</html>
