<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AM/ECAM05.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EEDM05" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
   
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      文章标题
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="articleTitle" row="0" />
		    </td>		   
		    <EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
		    <EF:EFInput blockId="inqu_status" ename="siteId" row="0" type="hidden"/>
   			<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden" />

		    <input type="hidden" id="nodeId" value="<%=nodeId %>"/>
		    <input type="hidden" id="nodeType" value="<%=nodeType %>"/>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="no" style="operationBar:false">	
<EF:EFColumn ename="articleId" cname="文章ID" enable="false" visible="false"/>
<EF:EFColumn ename="columnId" cname="栏目ID" enable="false" visible="false"/>
<EF:EFColumn ename="articleTitle" cname="文章标题" enable="false" width="200"/>
<EF:EFColumn ename="columnName" cname="所属栏目" enable="false" width="200"/>
<EF:EFColumn ename="recCreateTime" cname="创建时间" enable="false"  width="200" sort="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
