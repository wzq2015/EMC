
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/PM/EVPM00.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVPM00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_result" title="个人默认门户节点" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      个人默认门户节点:
		    </td>
            <td nowrap width="20%">
            <EF:EFInput blockId="result" ename="nodeId" type="hidden" row="0"/>
            <EF:EFInput blockId="result" ename="nodeName" row="0" etc="readOnly"/>
            </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_inqu" title="个人默认门户节点配置" efRegionShowClear=false >
	<EF:EFInput blockId="inqu_status" ename="nodeId" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="nodeName" row="0" type="hidden" />
	<TABLE>
		<TR>
			<TD width="200px"></TD>
			<TD>
				<div id="leftTreeDiv" style='overflow:auto; width:100%; height:100%;'>
	    		 <EF:EFTree model="tableTreeModel" id="nTree" text="门户树" configFunc="configTree">
	    		 </EF:EFTree>
	    		</div>
			</TD>
		</TR>
	</TABLE>
		
</div>
<EF:EFRegion/>
   
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>  
