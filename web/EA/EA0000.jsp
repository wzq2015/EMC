<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
		charset=UTF-8" />
	<title>电文/Bean信息管理</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
</head>
<%
	String path1 = request.getContextPath() + "/DispatchAction.do?efFormEname=EA1000";
	String path2 = request.getContextPath() + "/DispatchAction.do?efFormEname=EA1000";
%>
<body class="bodyBackground">
<div id="ef_tab_x"  lastRange="99%" eftabWidth="100%"> 
	<div  title="电文影射信息管理" eftabSrc=<%=path1 %> eftabHeight="500px" efRemember="yes">
	</div>
	<div  title="电文/Bean信息管理" eftabSrc=<%=path2 %> eftabHeight="500px" efRemember="yes">
	</div>
</div> 
<EF:EFTab tabId="x" />

</body>
</html>   
