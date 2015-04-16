<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@ page language="java"
	import="com.baosight.iplat4j.security.sso.SSOCredential"%>
<%@ page language="java"
	import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@ page language="java"
	import="com.baosight.iplat4j.core.resource.Resources"%>

<%
	String username = request.getParameter("p_username");
	String cred = request.getParameter("p_password");
	String authen = request.getParameter("p_authen");

	boolean valid = false;

	if (username != null && cred != null & authen != null) {
		SSOCredential credentialChecker = (SSOCredential) SpringApplicationContext
				.getBean("PwdReset");

		try {
			valid = credentialChecker
					.validateCredential(cred, username);
		} catch (Exception e) {
			valid = false;
		}

	}

	String host = Resources.getValue("iPlatConfig", "serviceHostAddr");

	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String message = (String) request.getAttribute("MESSAGE");
%>

<html>
<head>
<title>EP10/设置密码</title>
<style type="text/css">
#redirectInfo {
	width: 500px;
	margin: 0 auto;
	text-align: center;
	padding: 20px;
	border: 1px solid blue;
}
</style>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EP/EP10.js"></script>
<script type="text/javascript">
var times=10;

function timeInterval() {
	times--;
	document.getElementById("timer").innerHTML = times;
	if (times == 0) {
		window.top.location.href = '<%=host%>';
	}
}
</script>
</head>

<body class="bodyBackground">
<form id="EP10" name="actionForm" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="inqu_status" ename="p_username" row="0"
	etc="value='${param.p_username}'" type="hidden" /> <EF:EFInput
	blockId="inqu_status" ename="p_password" row="0"
	etc="value='${param.p_password}'" type="hidden" /> <EF:EFInput
	blockId="inqu_status" ename="p_authen" row="0"
	etc="value='${param.p_authen}'" type="hidden" />

<div id="ef_region_password" title="设置密码" efRegionShowClear=true>
<div>
<table>
	<tr>
		<td>新密码</td>
		<td><EF:EFInput blockId="inqu_status" ename="password" row="0"
			etc="type='password'" /></td>
	</tr>
	<tr>
		<td>确认新密码</td>
		<td><EF:EFInput blockId="inqu_status" ename="repassword" row="0"
			etc="type='password'" /></td>
	</tr>

</table>
</div>
</div>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type="text/javascript">
	if(!<%=valid%>) {
		$("#EP10").hide();
		$('body')
				.append(
						"<div id='redirectInfo'>对不起，认证信息不正确或已失效！<br/>系统<span id='timer'>"+times+"</span>秒钟后将转向登录页...<br/><a href='<%=host%>/login.jsp'>直接进入登录页</a></div>");
		var timesTra = window.setInterval("timeInterval()",
				1000);
	}

	//efform.setPageTitle("EP10/设置密码");
    efregion.show("ef_region_password");
    var ef_region_password_buttonbar = new efbuttonbar();
    ef_region_password_buttonbar.buttonCount = 1;
    ef_region_password_buttonbar.buttonData = [ [ "F2", "确定修改" ] ];
    ef_region_password_buttonbar.paint("ef_region_password");
</script>
</body>
</html>
