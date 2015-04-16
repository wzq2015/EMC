
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%@page import="java.io.File"%>
<%@page import="com.baosight.iplat4j.core.ei.*"%>
<%
EiInfo Info=(EiInfo)request.getAttribute("ei");
String layoutId =Info.getString("layoutId");
String filePath= request.getSession().getServletContext().getRealPath(File.separator)+"EV"+File.separator+"upload_pic"+File.separator;
%>


<HTML>
<HEAD>
<title>门户区域布局</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="./EF/Portlet/EFPortlet.css" rel="stylesheet" type="text/css" />
<link href="./EV/Common/divWindow.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/default/ev.css" rel="stylesheet" type="text/css" />
<link href="./EF/Images/tab.css" rel="stylesheet" type="text/css"/>	
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.tab.js"></script>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/CM/EVCM0702.js"></script>
<script type="text/javascript" src="./EV/EV.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortlet.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortal.js"></script>
<script type="text/javascript" src="./EF/Portlet/RightMenu.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortArea.js"></script>
<style type="text/css">

html,body {
	background: #CCCCCC none repeat scroll 0%;
	color: #000000;
	margin: 0px auto;
	padding: 0px;
	overflow:hidden;
}



</style>

</HEAD>

<!-- 
	<body onbeforeunload="javascript:return '将关闭打开的所有子窗口！'">
	 -->
<body >
<input type="hidden" id="inqu_status-0-layoutId" value="<%=layoutId %>"/>
<input type="hidden" id="inqu_status-0-filePath" value="<%=filePath %>"/>
		<table width="100%" height="100%" border="0" cellspacing="0" style="overflow: hidden"
			cellpadding="0">


			<!-- 主界面 -->
			<tr id="portalMain" height='100%'>
				<td id="text1">
				<div id='portalNodeId' style="height:100%;width:100%;overflow: hidden" width='100%' ></div>
				<script>
				//	ef.get("portalNodeId").width = document.body.clientWidth;
					
				</script>
				</td>
			</tr>
		</table>

 <EF:EFRegion/>
 <EF:EiInfo/>
</body>
</HTML>
