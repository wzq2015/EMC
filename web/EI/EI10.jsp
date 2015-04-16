<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	
	
	List combo_source = new ArrayList();

	combo_source.add( new EFComboBean("1", "是") );	
	combo_source.add( new EFComboBean("0", "否") );	
	
	request.setAttribute( "combobox_source", combo_source );

%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EI/EI10.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      元数据对象标识
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="blockMetaName" row="0" />
		    </td>
		    <%--<td nowrap width="15%">
		      画面中文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="funcId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      画面类型
		    </td>  
		    <td nowrap >
		    </td>--%>
		  </tr>
		  
		</table> 
	</div>
</div>  

 
<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" >	
	<EF:EFComboColumn ename="itemMustFlag" sourceName="combobox_source" valueProperty="value" labelProperty="label"/>
	<EF:EFColumn ename="recCreator" visible="no" />
	<EF:EFColumn ename="recCreateTime" visible="no" />
	<EF:EFColumn ename="recRevisor" visible="no" />
	<EF:EFColumn ename="recReviseTime" visible="no" />
	<EF:EFColumn ename="archiveFlag" visible="no" />
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
