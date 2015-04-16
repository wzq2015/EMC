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
	<script type="text/javascript" src="./EC/SA/ECSA06.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSA07" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<EF:EFInput blockId="inqu_status" ename="TimeStart" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="TimeEnd" row="0" type="hidden" />
			  <div style="overflow:hidden;width:100%">
						<table>
						  <tr>
						   <td nowrap width="25%">
						     文章创建者：
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="creator" row="0"  etc="' readOnly '" />
						  </tr>
						</table>
					</div>
</div>  
<div id = "ef_region_result" title="记录集" style="ovFerflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div> 
<EF:EFRegion/>
<EF:EFGrid blockId="result"  ajax="false" readonly="true" enable="false" >
<EF:EFColumn ename="articleTitle" cname="文章标题" enable="false"  readonly="true" align="center" displayType="hyperlink"/>
<EF:EFColumn ename="createTime" cname="创建日期" readonly="true" align="center"/>	
<EF:EFColumn ename="articleId" cname="文章标识" readonly="true" align="center" visible="false"/>	
<EF:EFColumn ename="columnid" cname="栏目标识" readonly="true" align="center" visible="false"/>
</EF:EFGrid>          

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
