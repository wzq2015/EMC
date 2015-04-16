<%@page import="com.baosight.iplat4j.ep.monitor.DiagnosticJob"%>
<%@page import="com.baosight.iplat4j.ep.monitor.Diagnostics"%>
<%@page contentType="text/html;charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	DiagnosticJob log = (DiagnosticJob) pageContext.getAttribute("__log__", PageContext.REQUEST_SCOPE);
	pageContext.removeAttribute("__log__", PageContext.REQUEST_SCOPE);
	if (log != null) {
		Diagnostics.end(log, null);
	}
%>


<script type="text/javascript" src="./EF/Form/iplat.ef.tail.js"></script>

<style>
#_efFormGuide {
	display: inline-table;
	text-align: right;

	left: 50%;
	margin-left: -90px;

	bottom: 0;
	margin-bottom: 0px;

	position: fixed;

	border-bottom: 0px;

	-moz-border-radius: 0px;
	border-radius: 0px;

	-moz-border-radius-topright: 8px;
	-moz-border-radius-topleft: 8px;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
}

#_efFormGuide a {
  border : 0px;
}

#_efFormInput {
	display: none;
	position: fixed;
	padding: 4px;
	width: 80px;
	height: 50px;
	background: whiteSmoke;
	text-align: center;
}
</style>
<input type="hidden" id=headtail value="<%=request.getParameter("efHeadTail")%>">
<div id='_efFormGuide' class="ef-form-guide">
<a id='_efFormGuide_form' href="#" style="">常用页面</a>
<a id='_efFormGuide_guide' href="#" style="">向导</a>
<a id='_efFormGuide_mail' href="#" style="">报告问题</a>
<!-- <a id='_efFormGuide_comment' href="#" style="">交流</a>
<a id='_efFormGuide_gotoTop' href="#" style="">回到顶部</a> -->
<a id='_efFormGuide_close' href="#" style="">关闭向导窗口</a>
</div>

<div id='_efVisitForm' style="display:none;height:50px;left:50%;bottom:35px;position:fixed;text-align:center">
</div>

<div id='_efFormInput' class="">
请输入页面号:<EF:EFInput bindId="_formEnameInput" style="text-transform : uppercase;" etc="validateType='string' maxLength='8' size='8'"/>
</div>


