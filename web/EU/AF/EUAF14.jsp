<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeVal = (String) request.getParameter("nodeVal");
	String method = (String) request.getParameter("method");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>
	<script type="text/javascript" src="./EU/AF/EUAF14.js"></script>
	<style type="text/css">
	.scrollContent{
		overflow:auto;
		overflow-x:hidden;
	}
	</style>
</head>
<body class="bodyBackground">
<form id="EUAF14" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<input id='nodeVal' name='nodeVal' value="<%=nodeVal %>"  type="hidden" />
<input id='method' name='method' value="<%=method %>"  type="hidden" />
<div id = "ef_region_all" title="帮助文档" efRegionShowClear=false>
	<div id="ef_region_main" style="overflow:hidden;width:100%;padding:0px;">
		<div id = "ef_region_inqu" title="内容展示" efRegionShowClear=false>
			<div style="overflow:hidden;width:100%;" >
				<div id="content" style="background-color:#FFF;width:100%;'" class="scrollContent"></div>
			</div>
		</div>
	</div>
</div>
<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
