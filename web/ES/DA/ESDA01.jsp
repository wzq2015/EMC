<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ES/DA/ESDA01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ESDA01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("label.ESAuthorizedResourceName","授权资源名") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="authResourceId" row="0"  etc="validateType='string' maxLength='20' size='20'"/>
		    </td>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("label.ESAuthorizedSetId","授权集合标识") %> 
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="authGroupId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("label.ESProject","工程") %> 
		    </td>  
		    <td nowrap >
		    <EF:EFSelect blockId="inqu_status" ename="project_prefix" row="0" >
		    <EF:EFOption label='<%=I18nMessages.getText("label.EFAll","全部") %>' value="" />
		    <EF:EFOptions conj="-" blockId="projectBlock" labelColumn="projectCname" valueColumn="projectPrefix"/>
		    </EF:EFSelect>
		    </td>
		  </tr>
		  
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.ESAuthorizationInformation","授权信息") %>" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" >	
	<EF:EFColumn ename="authResourceId" width="200" fix="yes"  sort="false"/>
	<EF:EFColumn ename="authGroupId" width="200" fix="yes"  sort="false"/>	
	<EF:EFComboColumn ename="authGroupType" width="80" blockName="authGroupType" valueProperty="authGroupType" labelProperty="authGroupTypeDesc" formatString="#valueString#-#labelString#"  />
	<EF:EFColumn ename="sqlId" width="200"/>
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime" enable="false" />
	<EF:EFColumn ename="recRevisor" enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false" />
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
