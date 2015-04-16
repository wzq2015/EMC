<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="ED/MD/EDMD96.js"></script>

</head>
<body class="bodyBackground">
<form id="EDMD96" method="post" action="<%=actionUrl%>">
<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_inqu" title="查询区">
	<div>
		<table>
		  <tr>
			<td width="80">表单名</td>
			<td>
				<EF:EFInput blockId="inqu_status" ename="formName" row="0" />
			</td>
		  </tr>
		</table>
	</div>
</div>

<div id="datagrid"></div>
<EF:EFRegion/>
</form>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>
