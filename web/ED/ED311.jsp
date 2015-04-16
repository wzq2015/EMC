<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<style type="text/css">
.ProgressBar {
	position: relative;
	width: 100px; /* 宽度 */
	background: #A0A0A0;
}

.ProgressBar div {
	display: block;
	position: relative;
	color: #333333;
	height: 18px; /* 高度 */
	line-height: 18px; /* 必须和高度一致，文本才能垂直居中 */
}

.ProgressBar div span {
	position: absolute;
	width: 100px; /* 宽度 */
	text-align: center;
	font-weight: bold;
	font-size: 11px;
	color: white;
}
</style>
</head>
<body class="bodyBackground">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFTreeGrid blockId="$" treeColumn="0" clickableNodeNames="true" etc="style='white-space:nowrap;'">
	<EF:EFTreeColumn ename="name" cname="名称" width="350" />
<%-- 	<EF:EFTreeColumn ename="type" cname="类型" width="150" /> --%>
<%-- 	<EF:EFTreeColumn ename="context1" cname="上下文1" width="120" /> --%>
<%-- 	<EF:EFTreeColumn ename="context2" cname="上下文2" width="120" /> --%>
<%-- 	<EF:EFTreeColumn ename="context3" cname="上下文3" width="120" /> --%>
<%-- 	<EF:EFTreeColumn ename="context4" cname="上下文4" width="120" /> --%>
<%-- 	<EF:EFTreeColumn ename="context5" cname="上下文5" width="120" /> --%>
	<EF:EFTreeColumn ename="time" cname="用时" width="100" />
	<EF:EFTreeColumn ename="line" cname="比例" width="100" />
	<EF:EFTreeColumn ename="start" cname="开始时间" width="100" />
	<EF:EFTreeColumn ename="end" cname="结束时间" width="100" />
</EF:EFTreeGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
<script type="text/javascript">
function job_onlick(id, jid) {
	efform.openNewForm("EP312", "diagnoseId=" + id + "&diagnoseJobId=" + jid);
}
</script>
</body>
</html>
