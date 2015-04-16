<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ page language="java" import="com.baosight.iplat4j.ec.util.TemplateConstant,
								com.baosight.iplat4j.ec.util.ECUtil"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String columnId = request.getParameter("columnId");
	String retrievalType = request.getParameter("retrievalType");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/CM/ECCM08.js"></script>
</head>
<body class="bodyBackground">

<form id="ECCM08" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

	<input type="button" value="增加条件" onclick="addNew()"> 
	<div id="result" width="450">
		<div id="ef_region_detail"  width="420">
	<EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden"  />
	<EF:EFInput blockId="inqu_status" ename="retrievalType" row="0" type="hidden"  />
	<input  type="radio" id="retrievalConditionMode" name="retrievalConditionMode" value="and" class="" onchange="" onClick="this.blur();" />以下条件都符合
	<input  type="radio" id="retrievalConditionMode" name="retrievalConditionMode" value="or" class="" onchange="" onClick="this.blur();" />以下条件符合其一
	
			<table  border="0" cellspacing="0" cellpadding="0" ID="Table1"> 
			</table>
		</div>
		<input type="button" value="确定" onclick="button_confirm_onclick()">
	</div>
	
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
