<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java"
	import="com.baosight.iplat4j.common.ec.domain.Tectm04,com.baosight.iplat4j.core.spring.SpringApplicationContext,com.baosight.iplat4j.dao.*,java.util.HashMap,java.util.Map,com.baosight.iplat4j.core.threadlocal.*,java.io.*,java.util.ArrayList,java.util.List,java.util.Date,com.baosight.iplat4j.ec.tm.utils.ECTMUtils,com.baosight.iplat4j.util.*"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	//单元设置页
	String area = request.getParameter("area");
	String isSearchResult = request.getParameter("isSearchResult");
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM10.js"></script>
<!--<script type="text/javascript" src="./EF/Fckeditor/fckeditor.js"></script>-->

	<style type="text/css">
		html, body {
			background:#fff none repeat scroll 0%;
			color:#000000;
			margin:0px auto;
			padding:0px;
			text-align:left;
		}
	</style>
</head>
<body class="bodyBackground" style='font-size:12px'>
<input type=hidden id=ip value="<%=request.getServerName()%>">
<input type=hidden id=port value="<%=request.getServerPort()%>">
<input type=hidden id=context value="<%=request.getContextPath()%>">
<input type=hidden id='area' value="<%=area%>">
<input type=hidden id='isSearchResult' value="<%=isSearchResult%>">
<input type=hidden id='nodeId' value="<%=nodeId%>">
<input type=hidden id='nodeType' value="<%=nodeType%>">

<EF:EFInput blockId="result3" type="hidden" ename="userTitlePrefixHd" row="0" />
<EF:EFInput blockId="result3" type="hidden" ename="userTitleSuffixHd" row="0" />

<form id="ECTM10" name='myForm' method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<br>
<fieldset border="1"><legend>单元类型切换</legend> 
	<EF:EFInput blockId="result0" ename="templateUnitInsId" row="0" type="hidden" /> 
	<EF:EFSelect blockId="result0" ename="templateUnitType" etc="onchange=onselect_change(this.value);" row="0">
		<EF:EFOption label="静态单元" value="1"></EF:EFOption>
		<EF:EFOption label="栏目链接" value="2"></EF:EFOption>
		<EF:EFOption label="标题链接" value="3"></EF:EFOption>
		<EF:EFOption label="当前位置" value="4"></EF:EFOption>
		<EF:EFOption label="图片新闻" value="7"></EF:EFOption>
		<%
		if (area.equals("4")) {
		%>
		<EF:EFOption label="文章正文" value="5"></EF:EFOption>
		<%
		}
		%>
		<EF:EFOption label="搜索单元" value="9"></EF:EFOption>
		<EF:EFOption label="公　　告　　　　　　" value="6"></EF:EFOption>
		
	</EF:EFSelect>
</fieldset>

<EF:EFRegion /> 
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include></form>

<!---------------------------------------- 嵌入页面----------------------------------------------------- -->
<iframe id="mainFrame" name="mainFrame" style="position:absolute;width:100%;height:500px;" marginWidth="0" marginHeight="0" frameBorder="0" src=""></iframe>


<script type='text/javascript'>
//根据不同类型预先打开不同div设置区
//document.getElementById("ef_region_result"+ef.get('result0-0-templateUnitType').value).style.display='';
</script>
</body>
</html>
