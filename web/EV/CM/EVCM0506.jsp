
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
	<script type="text/javascript" src="./EV/CM/EVCM0506.js"></script>
</head>

<body class="bodyBackground">

<form id="EVCM0506"  method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_result" title="节点信息" efRegionShowClear=true>
<div>	
		<EF:EFInput blockId="result" ename="nodeId" row="0" type="hidden"/>
		<table>		  
		  <tr>
		    <td  nowrap width="15%">节点名称:</td>
		    <td  width="85%">
			  <EF:EFInput blockId="result" ename="nodeName" row="0" trim="false" etc="size='30' nullable='false' minLength='1' maxLength='100'"/>					
		    </td>
		   </tr> 
		   <tr> 
		    <td  nowrap width="15%">节点描述:</td>
		    <td >
			  <EF:EFInput blockId="result" type="textarea" ename="nodeDesc" row="0" style="width:220px;height:50px;" etc="size='50' maxLength='250'"/>					
		    </td>	
		   </tr> 
			<tr> 
		    <td  nowrap width="15%">节点序号:</td>
		    <td   width="85%">
			  <EF:EFInput blockId="result" ename="nodeSeq" row="0" etc="size='16' maxLength='16'"/>					
		    </td>	
		   </tr>     
		</table>
	</div>
</div>
<EF:EFRegion/>  
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>
