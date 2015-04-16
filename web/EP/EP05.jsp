<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EP/EP05.js"></script>

</head>
<body class="bodyBackground">
<form id="EP05" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_loginAndMenu" title="登录和菜单权限过滤" efRegionShowClear=true>
	<textarea id="lam" style="width:100%;height:100px;" ></textarea>    
</div>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="width:100%" id="inline1">
		<table>
			<tr>
			<td>
			   页面号
			</td>
			<td>
			    <EF:EFInput blockId="inqu_status" ename="pageEname" row="0"/>
		    </td>
		 </tr>
		</table>
	</div>
</div>


<div id="ef_region_pageAndButton" title="页面和按钮权限过滤" efRegionShowClear=true >
	<textarea id="pab" style="width:100%;height:100px;" ></textarea>    
</div>


<EF:EFRegion/>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>


</form>
</body>
</html>
