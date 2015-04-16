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
	<script type="text/javascript" src="./ED/PI/EDPI01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDPI01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		     项目英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="projectEname" row="0" style="text-transform : uppercase;"/>
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" ajax="true">
<EF:EFColumn ename="projectEname" cname="项目英文名" fix="yes" sort="true" nullable="false" minLength="1" maxLength="250"/>
<EF:EFColumn ename="projectCname" cname="项目中文名" maxLength="50"/>
<EF:EFColumn ename="recCreator" cname="记录创建责任者" enable="false"/>
<EF:EFColumn ename="recCreateTime" cname="记录创建时刻" enable="false"/>
<EF:EFColumn ename="recRevisor" cname="记录修改责任者" enable="false"/>
<EF:EFColumn ename="recReviseTime" cname="记录修改时刻" enable="false"/>
<EF:EFColumn ename="archiveFlag" cname="归档标记" enable="false"/>	
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
