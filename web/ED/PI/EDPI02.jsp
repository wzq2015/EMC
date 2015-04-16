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
	<script type="text/javascript" src="./ED/PI/EDPI02.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDPI02" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    
		    <td nowrap width="15%">
		      项目英文名称
		    </td>
		    
		    <td nowrap width="20%">
		     <EF:EFSelect blockId="inqu_status" ename="projectEname" row="0" etc=' styleClass="inputField" '>
		      <EF:EFOption label="全部" value="" />
		      <EF:EFOptions  blockId="project" labelColumn="projectEname" valueColumn="projectEname"/>
		    </EF:EFSelect> 
		    </td>
		    
		    <td nowrap width="15%">
		      模块英文名称
		    </td>
		    
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="moduleEname" row="0" etc=' style="text-transform : uppercase;" '/>
		    </td>
		  
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:250px;" >
	</div>  
</div>   

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:true;operationBar:true" ajax="true">	
<EF:EFComboColumn ename="projectEname" cname="项目英文名称" sort="true" fix="yes" nullable="false" blockName="project" valueProperty="projectEname" width="150"  labelProperty="projectEname" formatString="#valueString#"  />
<EF:EFColumn ename="moduleEname"  cname="模块英文名称" sort="true" fix="yes" maxLength="10" nullable="false"/>
<EF:EFColumn ename="moduleCname"      cname="模块中文名称" maxLength="40"/>
<EF:EFColumn ename="tableSpaceEname"  cname="表空间英文名称"  maxLength="40"/>
<EF:EFColumn ename="indexSpaceEname"  cname="索引空间英文名称"  maxLength="40"/>
<EF:EFColumn ename="recCreator" enable="false" cname="记录创建责任者" />
<EF:EFColumn ename="recCreateTime" enable="false" cname="记录创建时刻"/>
<EF:EFColumn ename="recRevisor" enable="false" cname="记录修改责任者" />
<EF:EFColumn ename="recReviseTime" enable="false" cname="记录修改时刻" />
<EF:EFColumn ename="archiveFlag" enable="false" cname="归档标记"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
