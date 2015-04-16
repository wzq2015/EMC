<!DOCTYPE html>
<!-- Generate time : 2011-11-16 14:55:49 -->
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String path1 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDMD52";
	String path2 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDMD45";
	String path3 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDMD41";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD520.js"></script>
</head>
<body class="bodyBackground">
<form id="EDMD520" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_tab_y"  lastRange="98.5%" eftabWidth="100%">
	<div id="tab1" title="页面信息" eftabSrc="about:blank" eftabHeight="600px" efRemember="yes">
	</div>
	<div id="tab2" title="页面相关功能信息" eftabSrc="about:blank" eftabHeight="600px" efRemember="yes">
	</div>
	<div id="tab3" title="页面相关领域模型" eftabSrc="about:blank" eftabHeight="600px" efRemember="yes">
	</div>
</div>
<EF:EFTab tabId="y" action="onTabChange" />

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type="text/javascript">
var hideSubPageHead = true;
var path = [];
path.push("<%=path1%>");
path.push("<%=path2%>");
path.push("<%=path3%>");
var frames = $("#ef_tab_y iframe");
$("#ef_tab_y > br").filter(":first").css("display", "none");
if(window.parent != window || window.parent.hideSubPageHead == true) {
	$("#ef_tab_y").css("padding-top", "8px").css("padding-left", "4px");
}
onSubPageLoad = function(wnd) {
	for(var i=0; i<frames.length; i++) {
		if (frames[i].contentWindow == wnd) {
			$(frames[i]).css("height", wnd.document.body.scrollHeight);
			onTabPageLoad(wnd, i);
			break;
		}
	}
}
</script>
</body>
</html>
