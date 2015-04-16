
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String themaPath = request.getParameter("themaPath"); 
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/EV16.js"></script>
<link href="./EF/EF.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/default/ev.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/<%=themaPath%>/ev.css" rel="stylesheet" type="text/css" />
	<base target="_self">
</head>
<body class="bodyBackground" style="height:280px;">
<EF:EFInput blockId="inqu_status"  ename="defaultId" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status"  ename="nodeIds" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status"  ename="nodeNames" row="0" type="hidden"/>
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include> 
	<div style="height:200px;">
		<table>
				  <tr>
				    <td >
				      默认节点:<EF:EFSelect blockId="" ename="defaultNodeId" row=""></EF:EFSelect>
				    </td>
				  </tr>
		</table>
		<br>
		<div style="height:185px;overflow-y:auto">
		<EF:EFTree model="nodeTreeModel" id="tree" text="选择门户节点" configFunc="configTree" />
		</div>
		
	</div>
	
	<div class='window_contentbottom' style='top:245;width:396px;height:28px'>
	<table width='200' align='right'>
		<tr align='center'>
			<td width='122'>
			<input name='Submit' type='submit' class='button' style='height:27px' value='确 定' onclick='button_updateNode_onclick()'>
			</td>
			
			<td width='104'>
			<input name='Submit2' type='submit' class='button' style='height:27px' value='取 消' onclick="parent.closeDiv('nodeDiv')">
			</td>
		</tr>
	</table>
</div>

<EF:EFRegion/>
<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>

</body>
</html>   
