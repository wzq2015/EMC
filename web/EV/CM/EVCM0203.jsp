
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>

<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="com.baosight.iplat4j.util.PlatUtils"%>

<%
    com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
	String user =PlatUtils.getUserId();
%>


<HTML>
<HEAD>
<title>内容管理树</title>
<base target="_self">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/CM/EVCM0203.js"></script>


</HEAD>
<body><center>
	<table height="100%" width="100%">
    	<tr height="100%">
    		<td id="leftTree" vAlign="top" >
				<div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
    		
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="内容管理树" configFunc="configTree">
    		    </EF:EFTree>
    		</div>
    		                    
    		</td>
    		<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
    	</tr>
    </table></center>  
</body>

</HTML>
