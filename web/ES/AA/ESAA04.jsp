<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%@page import="com.baosight.iplat4j.core.threadlocal.ThreadConstants"%>
<%@page import="org.acegisecurity.context.SecurityContextHolder"%>
<%@page import="com.baosight.iplat4j.security.IpAuthenticationToken"%>
<%@page import="java.util.Map"%>
<%
//UserSession.service2Web(request);
UserSession.web2Service(request);
if(session.getAttribute("role")!=null)
{
IpAuthenticationToken authen = (IpAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
String role = (String)session.getAttribute("role");
Map prop = authen.getProperties();
prop.put("role", role);
authen.setProperties(prop);
}
//System.out.println("UserSession.getProperty(\"displayName\") is " + UserSession.getProperty("displayName"));
//System.out.println("UserSession.getProperty(\"jobId\") is " + UserSession.getProperty("jobId"));
//System.out.println("UserSession.getProperty(\"jobName\") is " + UserSession.getProperty("jobName"));
//System.out.println("UserSession.getProperty(\"deptId\") is " + UserSession.getProperty("deptId"));
//System.out.println("UserSession.getProperty(\"deptName\") is " + UserSession.getProperty("deptName"));

%>
<script language="javascript">
window.location.href = "<%=request.getContextPath()%>/index.jsp";
</script>
<%
//UserSession.web2Service(request);
%>
