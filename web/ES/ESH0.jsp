<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
	<script type="text/javascript" src="./ES/ESH0.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ESH0" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.userId","用户标识") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="userId" row="0" etc="validateType='string' maxLength='8' size='8'"/>
		    </td>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.orgCode","组织机构代码") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="orgCode" row="0" />
		    </td>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.authResourceId","授权资源标志") %>
		    </td>  
		    <td nowrap >
		    <EF:EFInput blockId="inqu_status" ename="authResourceId" row="0" />
		    </td>
		  </tr>
		  <tr>
		    <td nowrap >
		      <%=I18nMessages.getText("label.EFRecCreateTimeStart","记录创建开始日期") %>
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="recCreateTimeStart" row="0" popup="date" etc="maxLength='8' size='8'" />
		    </td>
		    <td nowrap >
		      <%=I18nMessages.getText("label.EFRecCreateTimeEnd","记录创建截止日期") %>
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="recCreateTimeEnd" row="0" popup="date" etc="maxLength='8' size='8'" />
		    </td>
		    <td nowrap >
		      <%=I18nMessages.getText("E_Col.authActionDesc","操作描述") %>
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="authActionDesc" row="0" />
		    </td>
		  </tr>
		  
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFLogInformation","履历信息") %>" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" style="operationBar:false">	
	<EF:EFColumn ename="userId" width="100" enable="false" sort="false"/>
	<EF:EFColumn ename="recCreateTime" width="150" enable="false"/>
	<EF:EFColumn ename="authActionDesc" width="500" enable="false"/>
	<EF:EFColumn ename="orgCode" width="500" enable="false"/>
	<EF:EFColumn ename="authResourceId" width="200" enable="false"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
