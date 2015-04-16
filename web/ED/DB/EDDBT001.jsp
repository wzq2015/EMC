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
	<script type="text/javascript" src="./ED/DB/EDDBT001.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDDBT0" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    
		    <td nowrap width="15%">
		      项目英文名
		    </td>  
		    <td nowrap width="20%">
		      <EF:EFInput blockId="inqu_status" ename="projectEname" row="0" etc="readOnly='true'"/>
		    </td>
		    
		    <EF:EFInput blockId="inqu_status" ename="tableEname" row="0" type="hidden"/>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:250px;" >
	</div>  
</div>   

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" serviceName="EDDBT0" queryMethod="queryModelTable" style="operationBar:false" ajax="true">	
<EF:EFComboColumn ename="projectEname" cname="项目英文名称"  readonly="true" sort="true" fix="yes" nullable="false" blockName="project" valueProperty="projectEname" width="150"  labelProperty="projectEname" formatString="#valueString#"  />
<EF:EFColumn ename="tableEname"  cname="系统数据结构表英文名"  readonly="true" sort="true" fix="yes" width="150" nullable="false" maxLength="18" />
<EF:EFComboColumn ename="moduleEname" cname="模块英文名称"  readonly="true" sort="true" nullable="false"  blockName="module" valueProperty="moduleEname" width="110"  labelProperty="moduleEname" formatString="#valueString#"  />
<EF:EFColumn ename="tableCname"  cname="数据库表中文名称"  readonly="true"  width="110" maxLength="30"/>
<EF:EFColumn ename="schema"  cname="模式名"  width="110" maxLength="40"/>
<EF:EFColumn ename="referProjectEname"  cname="引用的项目英文名称"  readonly="true" enable="false" width="110" maxLength="10"/>
<EF:EFColumn ename="recCount"  cname="记录条数" nullable="false"  readonly="true" maxLength="10"/>
<EF:EFColumn ename="remark"  cname="备注" width="110"  readonly="true" maxLength="100"/>
<EF:EFColumn ename="recCreator" enable="false"  readonly="true" cname="记录创建责任者" />
<EF:EFColumn ename="recCreateTime" enable="false"  readonly="true" cname="记录创建时刻"/>
<EF:EFColumn ename="recRevisor" enable="false"  readonly="true" cname="记录修改责任者" />
<EF:EFColumn ename="recReviseTime" enable="false"  readonly="true" cname="记录修改时刻" />
<EF:EFColumn ename="archiveFlag" enable="false"  readonly="true" cname="归档标记"/>
<EF:EFColumn ename="newTableEname" cname="修改表英文名"  readonly="true" maxLength="18" width="120"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
