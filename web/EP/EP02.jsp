<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.ei.*"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<jsp:useBean id="ei" scope="request"
	class="com.baosight.iplat4j.core.ei.EiInfo" />

<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title>信息查看</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EP/EP01.js"></script>  
</HEAD>

<body class="bodyBackground">
<jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_iplat" title="资源详细信息" >
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">资源信息键</td>
		<td nowrap><EF:EFInput blockId="result" ename="fkey" row="0"
			etc="readOnly='true' " /></td>
	</tr>
	<tr>
		<td nowrap width="15%">问题描述</td>
		<td nowrap><EF:EFInput blockId="result" ename="question_desc" row="0"
			type="textarea"
			etc="cols='60' rows='3'readOnly='true' " /></td>
	</tr>
	<tr>
		<td nowrap width="15%">解决方法描述</td>
		<td nowrap><EF:EFInput blockId="result" ename="solution_desc" row="0"
			type="textarea"
			etc="cols='60' rows='3'readOnly='true' " /></td>
	</tr>
</table>
</div>
</div>


</body>
</html>


