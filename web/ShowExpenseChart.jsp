<%@ page contentType="text/html; charset=UTF-8"%>

<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%
	UserSession.web2Service(request);
	String projectId = (String)request.getSession().getAttribute("projectId");
	String projectName = (String)request.getSession().getAttribute("projectName");
	String initPage = (String)request.getSession().getAttribute("initPage");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title></title>
	<style type="text/css">
	    html, body {
		    height: 100%;
		    overflow: auto;
	    }
	    body {
		    padding: 0;
		    margin: 0;
	    }
	    #silverlightControlHost {
		    height: 100%;
		    text-align:center;
	    }
    </style>
	<script type="text/javascript" src="Silverlight.js"></script>
    <script type="text/javascript">
        function onSilverlightError(sender, args) {
        }
    </script>
</head>
<body>
	    <div id="silverlightControlHost">
	        <object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%">
			  <param name="source" value="ClientBin/ExpenseChart.xap"/>
			  <param name="InitParams" value="ProjectId=<%= projectId %>" />
			  <param name="onError" value="onSilverlightError" />
			  <param name="background" value="white" />
			  <param name="minRuntimeVersion" value="4.0.50401.0" />
	          <param name="windowless" value="true" />
			  <a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0" style="text-decoration:none">
	 			  <img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight" style="border-style:none"/>
			  </a>
		    </object><iframe id="_sl_historyFrame" style="visibility:hidden;height:0px;width:0px;border:0px"></iframe>
		</div>
</body>
</html>