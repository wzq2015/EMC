<%@ page contentType="text/html; charset=UTF-8" %>

<%@ page language="java" import="com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								java.util.HashMap,
								java.util.List,
								com.baosight.iplat4j.core.ei.EiInfo,
								com.baosight.iplat4j.common.ec.domain.Tecsm01,
								com.baosight.iplat4j.ec.util.*,
								com.baosight.iplat4j.core.FrameworkInfo,
								java.io.File,
								java.net.URL"%>
		<%
        String domain = FrameworkInfo.getProjectAppTopDomain();
        if (domain != null && domain.startsWith(".")) {
	            domain = domain.substring(1);
	    %>
	    <script type="text/javascript">
	        try {
	            document.domain='<%= domain %>';
	        } catch (ex) {
	            alert('domain not valid[<%= domain %>]');
	        }
	    </script>
	    <%
	        }
        %>

<%
  org.acegisecurity.context.SecurityContextHolder.clearContext(); 
  session.removeAttribute("ACEGI_SECURITY_CONTEXT");
  session.invalidate();
  
  response.sendRedirect(request.getContextPath()+"/login.jsp");	  
%>


