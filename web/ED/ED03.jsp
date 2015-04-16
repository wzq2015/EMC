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
	<script type="text/javascript" src="./ED/ED03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ED03" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    
		    <td nowrap width="15%">
		      模块英文名称
		    </td>
		    
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="Name" row="0" etc=' style="text-transform : uppercase;" '/>
		    </td>
		    
		    <td nowrap width="15%">
		      模块中文名称
		    </td>
		    
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="DisplayName" row="0" />
		    </td>
		    
		    <td nowrap width="15%">
		      应用系统
		    </td>
		    
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="Application" row="0" />
		    </td>
		  
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="模块信息" style="overflow: hidden;height:250px;" >
	</div>  
</div>   

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:true;operationBar:true" ajax="true">	
<EF:EFColumn ename="Application" cname="应用系统" fix="yes" nullable="false"/>
<EF:EFColumn ename="Name" cname="名称"  fix="yes" maxLength="10" nullable="false"/>
<EF:EFColumn ename="DisplayName" cname="显示名称" maxLength="40"/>
<EF:EFColumn ename="Parent" cname="父模块" maxLength="10"/>
<EF:EFColumn ename="Desc" cname="描述"  maxLength="80"/>
<EF:EFColumn ename="Version" cname="版本" maxLength="80" />
<EF:EFColumn ename="TypeFullName" cname="类型全名"  maxLength="250"/>
<EF:EFColumn ename="InitMode" cname="加载模式"  maxLength="20"/>
<EF:EFColumn ename="TableSpaceName" cname="表空间名称" maxLength="40" />
<EF:EFColumn ename="IndexSpaceName" cname="索引空间名称" maxLength="40" />
<EF:EFColumn ename="ArchiveFlag" cname="归档标记" enable="false"  />
                            
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
