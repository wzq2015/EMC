<%@page import="com.baosight.iplat4j.ep.monitor.DiagnosticJob"%>
<%@page import="com.baosight.iplat4j.ep.monitor.Diagnostics"%>
<%@page contentType="text/html;charset=UTF-8"%>

<%
	DiagnosticJob log = (DiagnosticJob) pageContext.getAttribute("__log__", PageContext.REQUEST_SCOPE);
	pageContext.removeAttribute("__log__", PageContext.REQUEST_SCOPE);
	if (log != null) {
		Diagnostics.end(log, null);
	}
%>
