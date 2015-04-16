
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>

<%@page import="com.baosight.iplat4j.core.ei.*"%>

<%
	EiInfo Info=(EiInfo)request.getAttribute("ei");
	String portalId =Info.getString("portalId");
	String editFlag=Info.getString("editFlag");
	String evUserParam=Info.getString("evUserParam");
	String themaPath = request.getParameter("themaPath"); 
%>

<HTML>
<HEAD>
<title>门户首页</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<link href="./EF/Portlet/EFPortlet.css" rel="stylesheet" type="text/css" />
<link href="./EV/Common/divWindow.css" rel="stylesheet" type="text/css" />
<link href="./EF/Images/tab.css" rel="stylesheet" type="text/css"/>	
<link href="./EF/EF.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/default/ev.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/<%=themaPath%>/ev.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.tab.js"></script>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/EV0105.js"></script>
<script type="text/javascript" src="./EV/EV.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortlet.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortal.js"></script>
<script type="text/javascript" src="./EV/Common/userParameter.js"></script>
<script type="text/javascript" src="./EV/EVConfig.js"></script>
</HEAD>
<input type="hidden" id="portalId" value="<%=portalId%>"/>
<input type="hidden" id="editFlag" value="<%=editFlag%>"/>
<input type="hidden" id="evUserParam" value="<%=evUserParam%>"/>
<input type="hidden" id="themaPath" value="<%=themaPath%>"/>
<body style="overflow-y:auto">
		<table id="mainTable" width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
			<!-- 主界面 -->
			<tr id="portalMain" height='100%'>
				<td id="text1">
				<div id='portalNodeId' width='800' height='600'></div>
							
				<script>
					ef.get("portalNodeId").width = document.body.clientWidth;
				</script>
				</td>
			</tr>
		</table>
 <EF:EFRegion/>
 <EF:EiInfo/>
</body>
</HTML>
