<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%
	String ruleFlowId=request.getParameter("ruleFlowId").toString();
	
	String version = request.getParameter("version");
	
	String graphUrl = null;
	
	if(version == null)
		graphUrl=request.getContextPath() + "/flowviewer?ruleFlowId=" + ruleFlowId;
	else
		graphUrl=request.getContextPath() + "/flowviewer?ruleFlowId=" + ruleFlowId + "&version=" + version;
 %>

<html>
	<head>

	<title>rule flow Graph</title>
	</head>
	
	<body class="bodyBackground">
		<table style="position:absolute;z-index:1;left:expression((document.body.clientWidth-this.offsetWidth)/2);top:expression((document.body.clientHeight-this.offsetHeight)/2) "> 	
	        <tr>
	       		<td align= "center" >
	            	<img alt="规则流" src="<%=graphUrl %>" align="middle" > 
	            </td>
	        </tr> 
	    </table>
	</body>
</html>