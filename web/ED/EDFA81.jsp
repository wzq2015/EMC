<!DOCTYPE html>
<%@ page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*,java.util.*"%>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
	String sperator = com.baosight.iplat4j.core.ei.EiConstant.separator;
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/EDFA81.js"></script>
</head>
<body class="bodyBackground">

	<form id="EDFA81" method="POST" action="<%=listUrl%>">
		<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
	
		<div id="ef_region_inqu" title="数据字典初始化">
			<div>
				<table width="98%">
					<tr>
						<td nowrap="nowrap" width="15%" align="right"><font color="red">*</font>数据表所属用户：</td>
						<td nowrap="nowrap" width="35%">
							<EF:EFInput blockId="inqu_status" ename="owner" row="0" etc=" nullable='false'" style="text-transform : uppercase;"></EF:EFInput>
						</td>
						<td nowrap="nowrap" width="15%" align="right"><font color="red">*</font>表名：</td>
						<td nowrap="nowrap">
							<EF:EFInput blockId="inqu_status" ename="tableName" row="0" etc=" nullable='false'" style="text-transform : uppercase;"></EF:EFInput>
						</td>
					</tr>
				</table>
			</div>
		</div>
		
		<EF:EFRegion />
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>

</body>
</html>
