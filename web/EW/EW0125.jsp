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
	<script type="text/javascript" src="./EU/mxGraph/mxClient.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/ActivityParticipantsSetting.js"></script>
    <script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/CodeActivitySetting.js"></script>    
	<script type="text/javascript" src="./EW/EW0125.js"></script>

</head>
<body class="bodyBackground">
<form id="EW0125" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_grid_extraAttrTreeResult" title="页面信息"
			style="overflow: hidden;width: 580px; height: 370px;">
</div>



<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="50%">
		   
		    </td>		    
		    <td nowrap>
		    	<EF:EFButton ename="confirm" cname="保存"  />
		    </td>
		     
		     <td nowrap >
		    	<EF:EFButton ename="cancel" cname="取消" />
		    </td>
		    <td nowrap width="50%">
		   
		    </td>
		    </tr>
 	</table>
</div>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
