<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<c:set var="r" value="${ei.blocks.r}"/>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript">
		 $(document).ready(function(){
			 $("#efFormStatus").remove();
		 });
	</script>
</head>

<body class="bodyBackground">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<%
	String path1 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDFA00&&efHeadTail=none";
	String path2 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDFA01&&efHeadTail=none";
	String path3 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDPI10&&efHeadTail=none";
	
%>

<div id="ef_tab_y"  lastRange="98.5%" eftabWidth="100%"> 
	<div  title="页面信息管理" eftabSrc=<%=path1 %> eftabHeight="750px" efRemember = "no">   
	</div>
	<div  title="页面按钮管理" eftabSrc=<%=path2 %> eftabHeight="800px" efRemember="yes">
	</div>
	<div  title="菜单信息管理" eftabSrc=<%=path3 %> eftabHeight="600px">
	</div>   
</div> 
<EF:EFTab tabId="y" action="fun"/>

<div id="ef_tab_x"  lastRange="99%" eftabType="efRoundDivTab">  
	<div id="org" title="圆角DIV使用" eftabHeight="100">

	<br>
	</div>
	<div id="lead" title="圆角Iframe使用" eftabHeight="200" eftabSrc="" >
	圆角tab使用时需指定eftabType为：efRoundIframeTab，默认为圆角TAB<br>
	efRoundIframechange_option(tab_id,index,action)该方法可用操作tab跳转，<br>
	tab_id为该tab的id，index为跳转到的tab标签页的序列号，action为跳转时执行的javascript函数<br>
	<br>
	</div>
 </div>  
<EF:EFTab tabId="x" action="fundiv"/>

<script type="text/javascript">
efRoundIframechange_option("ef_tab_y",2,fun);
function fun(currentIndex,index){
	return true;
}

function fundiv(currentIndex,index){
//	alert((209).toString(16)+(214).toString(16)+(240).toString(16));
//	alert("he");
	return true; 
} 
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
</script>


<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>   
