<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String display="none";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD52.js"></script>
	 
</head>
<body class="bodyBackground">

<form id="EDMD50" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      页面英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="formEname" row="0" />
		    </td>
		    
		    <td nowrap width="15%">
		      页面中文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="formCname" row="0" />
		    </td>		    
		  </tr>		  
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面设置" style="overflow: hidden;height:275px;">
	</div> 
</div>

<div id = "ef_region_gen" title="生成代码" efRegionShowClear=false>
	<div id = "ef_div_gen" style="overflow:hidden;width:100%">
		<table align=right>
		  <tr>
		    <td nowrap width=100>
				Jsp<EF:EFInput blockId="gen_status" ename="codeType" row="0" value="jsp" type="checkbox" etc="checked" />
			</td>
			<td nowrap width=100>
				Js<EF:EFInput blockId="gen_status" ename="codeType" row="0" value="js" type="checkbox" etc="checked" />
			</td>
			<td nowrap width=100>
				Xaml<EF:EFInput blockId="gen_status" ename="codeType" row="0" value="xaml" type="checkbox" />
			</td>
			<td nowrap width=100>
				C#<EF:EFInput blockId="gen_status" ename="codeType" row="0" value="cs" type="checkbox" />
			</td>
			<td nowrap width=100>
				Service<EF:EFInput blockId="gen_status" ename="codeType" row="0" value="service" type="checkbox" etc="checked" />
			</td>
		  </tr>		  
		</table>
	</div>
</div> 

<EF:EFRegion/>
  
<EF:EFGrid blockId="result" serviceName="EDMD52" queryMethod="query" autoDraw="no" readonly="false" >	
	<EF:EFColumn ename="id" cname="ID" width="80" visible="false" />
	<EF:EFColumn ename="formEname" cname="页面英文名" width="100" fix="yes" />
	<EF:EFColumn ename="formCname" cname="页面中文名" width="120" />
	<EF:EFColumn ename="moduleEname1" cname="一级模块" width="80" />
	<EF:EFColumn ename="moduleEname2" cname="二级模块" width="80" />
	
	<EF:EFComboColumn ename="templetId" cname="模板ID" width="230" blockName="tmpsBlock" 
	labelProperty="templetName" valueProperty="templetNo" formatString="#valueString#-#labelString#" readonly="true" />
		
	<EF:EFColumn ename="description" cname="描述"  width="300" />

</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
