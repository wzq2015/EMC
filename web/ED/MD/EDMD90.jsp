<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ page import="com.baosight.iplat4j.dao.*" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="ED/MD/EDMD90.js"></script>

</head>
<body class="bodyBackground">
<form id="EDMD90" method="POST" action="<%=actionUrl%>">
<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div>
		<table>
		  <tr>
			<td nowrap="nowrap" width="10%">表单英文名</td>
			<td nowrap="nowrap" width="25%">
				<EF:EFInput blockId="inqu_status" ename="name" row="0" />
			</td>
			
			<td nowrap="nowrap" width="10%">表单中文名</td>
			<td nowrap="nowrap" width="25%">
				<EF:EFInput blockId="inqu_status" ename="cname" row="0" />
			</td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
  <div id = "ef_grid_result" title="" style="overflow: hidden;height:300px;">
  </div>
</div>


<EF:EFGrid blockId="result" autoDraw="no" ajax="true">
  <EF:EFColumn ename="uuid" cname="主键" nullable="false" visible="false" />
  <EF:EFColumn ename="name" cname="表单英文名" nullable="false" readonly="true" />
  <EF:EFColumn ename="cname" cname="表单中文名" width="150"/>
  <EF:EFComboColumn ename="status" cname="状态" readonly="true" width="60">  
  	<EF:EFOption value="D" label="未发布" />
  	<EF:EFOption value="P" label="已发布" />
  </EF:EFComboColumn>   
  <EF:EFColumn ename="edit" cname="编辑" displayType="textbutton" align="center" readonly="true" width="60" />   
  <EF:EFColumn ename="description" cname="描述" width="250" />
</EF:EFGrid>
<EF:EFRegion/>
</form>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>