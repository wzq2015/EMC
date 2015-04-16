
<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/AA/EEAA02.js"></script>

	<script type="text/javascript" src="./WorkflowDesigner/js/mxClient.js"></script>

</head>
<body class="bodyBackground">

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>


   <!-- Creates a container for the graph with a grid wallpaper -->
   <div id="graphContainer"
      style="overflow:hidden;width:100%;height:241px;background:url('./WorkflowDesigner/images/grid.gif')">
   </div>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>

</body>
</html>   
