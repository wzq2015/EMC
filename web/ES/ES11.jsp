<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<% 
	List keyList = new ArrayList();

    keyList.add( new EFComboBean("", "请选择") );	
	keyList.add( new EFComboBean("max", "最大化") );	
	keyList.add( new EFComboBean("tree", "显示菜单树") );	
	
	request.setAttribute( "keyList", keyList );

	List valueList = new ArrayList();

	valueList.add( new EFComboBean("", "请选择") );	
	valueList.add( new EFComboBean("true", "是") );	
	valueList.add( new EFComboBean("false", "否") );	
	request.setAttribute( "valueList", valueList );

%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ES/ES11.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ES11" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      键名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="inqu_status" ename="keyEname" row="0">
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOption label="最大化" value="max"/>
		    <EF:EFOption label="显示菜单树" value="tree"/>
		    </EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		      键值
		    </td>  
		    <td nowrap >
		    <EF:EFSelect blockId="inqu_status" ename="keyValue" row="0" >
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOption label="是" value="true"/>
		    <EF:EFOption label="否" value="false"/>
		    </EF:EFSelect>
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

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" >
    <EF:EFColumn ename="userId" cname="用户标识" visible="false"/>
    <EF:EFComboColumn fix="yes" ename="keyEname" cname="键名称" valueProperty="value" labelProperty="label" sourceName="keyList"/>
    <EF:EFComboColumn ename="keyValue" valueProperty="value" labelProperty="label" sourceName="valueList"/>
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime" enable="false" />
	<EF:EFColumn ename="recRevisor" enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false" />
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
