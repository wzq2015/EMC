<!DOCTYPE html>
<!-- Generate time : 2012-05-17 15:18:09 -->
<%@page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/EC03.js"></script>
</head>
<body class="bodyBackground">
<form id="EC03" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<%
	String path1 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECCM01&methodName=query";
	String path2 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECSM02&methodName=queryArticle";
	String path3 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECAM06&methodName=query&inqu_status-0-nodeType=s";
	String path4 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECSM08&methodName=query";
	String path5 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECSM06&methodName=query";
	String path6 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECAM05&methodName=query";
	String path8 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECAM09&methodName=query";
	//String path9 = request.getContextPath() + "/DispatchAction.do?efFormEname=ECDM02&methodName=query";
%>
<input type="hidden" id="nodeType" value="s"/>
<div id = "ef_region_main" title="站点管理" efRegionShowClear=false>

	<div id="ef_tab_y"  lastRange="98.5%" eftabWidth="100%">
		<div id="tab1" title="栏目" eftabSrc="about:blank" efRemember="yes">
		</div>
		<div id="tab2" title="文章" eftabSrc="about:blank" efRemember="yes">
		</div>
		<div id="tab3" title="文章审批" eftabSrc="about:blank" efRemember="yes">
		</div>
		<div id="tab4" title="模版" eftabSrc="about:blank" efRemember="yes">
		</div>
		<div id="tab5" title="站点分发" eftabSrc="about:blank" efRemember="yes">
		</div>
		<div id="tab6" title="废稿箱" eftabSrc="about:blank" efRemember="yes">
		</div>
		<div id="tab8" title="文章扩展信息" eftabSrc="about:blank" efRemember="yes">
		</div>
		<!--  
		<div id="tab9" title="视频管理" eftabSrc="about:blank" efRemember="yes">
		</div>
		-->
	</div>
	
</div>

<EF:EFTab tabId="y" action="onTabChange" />
<EF:EFInput blockId="inqu_status" ename="siteId"  row="0"  type="hidden" />

 
<EF:EFRegion/>

<script type="text/javascript">
var hideSubPageHead = true;
var path = [];
path.push("<%=path1%>");
path.push("<%=path2%>");
path.push("<%=path3%>");
path.push("<%=path4%>");
path.push("<%=path5%>");
path.push("<%=path6%>");
path.push("<%=path8%>");
//path.push("path9");
var frames = $("#ef_tab_y iframe");
$("#ef_tab_y > br").filter(":first").css("display", "none");
if(window.parent != window && window.parent.hideSubPageHead == true) {
	$("#ef_tab_y").css("padding-top", "8px").css("padding-left", "4px");
}
onSubPageLoad = function(wnd) {
	for(var i=0; i<frames.length; i++) {
		if (frames[i].contentWindow == wnd) {
			onTabPageLoad(wnd, i);
			adjustFrameHeight(frames[i]);
			break;
		}
	}
}
adjustFrameHeight = function(frame) {
	var oldHeight = $(frame).height();
	var height = frame.contentWindow.document.body.scrollHeight;
	if (height > oldHeight) {
		$(frame).css("height", height);
	}
	if(window.parent != window && window.parent.hideSubPageHead == true) {
		var pFrames = window.parent.frames;
		for(var i=0; i<pFrames.length; i++) {
			if (pFrames[i].contentWindow == window) {
				window.parent.adjustFrameHeight(pFrames[i]);
				break;
			}
		}
	}
}
//loadTabPage(0);
</script>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
