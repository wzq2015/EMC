<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM06.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      文件代号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="fileCode" row="0" />
		    </td>
		    <td nowrap width="15%">
		      文件名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="fileName" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>


<div id = "ef_region_result" title="记录集" style="overflow:scroll">
<div style="overflow:hidden;width:100%">
	<table>
		<tr>
			<td>
				<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
				</div>
			</td>
			<td>
				<img id="image" width="160px" height="300px" src="./EE/uploadjsp/showimage1.jsp?id=5">
			</td>
		</tr>
	</table>
</div>
</div>


<EF:EFRegion/>
<EF:EFGrid paintId="ef_grid_result" blockId="result" ajax="true" autoDraw="no" readonly="false" >
<EF:EFColumn ename="fileCode" cname="文件代号" fix="yes"/>
<EF:EFColumn ename="fileName" cname="文件名称" readonly="true" enable="false"/>
<EF:EFColumn ename="fileUrl" cname="文件路径" visible="false"/>

<EF:EFColumn ename="uploadToServer" enable="false"  cname="上传到服务器"/>
<EF:EFColumn ename="downloadFromServer" enable="false" cname="从服务器下载"/>

<EF:EFColumn ename="haveObj" cname="数据库文件名" />

<EF:EFColumn ename="uploadToDB" enable="false"  cname="上传到数据库"/>
<EF:EFColumn ename="downloadFromDB" enable="false" cname="从数据库下载"/>
</EF:EFGrid>


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
