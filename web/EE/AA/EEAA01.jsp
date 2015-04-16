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
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/AA/EEAA01.js"></script>

	<script type="text/javascript" src="./EE/AA/html2canvas.js"></script>
	<script type="text/javascript" src="./EE/AA/jquery.plugin.html2canvas.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.form_ename","画面英文名") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="form_ename" row="0" style="text-transform : uppercase;" etc="validateType='string' maxLength='8' size='8'"/>
				<img title="<%=I18nMessages.getText("label.EDNodeEnameList","结点英文名列表") %>" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'"" onClick="openSubGrid();" />
		    </td>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.form_cname","画面中文名") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="form_cname" row="0" />
		    </td>
		    <td nowrap width="15%">
		     <%=I18nMessages.getText("E_Col.form_type"," 画面类型") %>
		    </td>  
		    <td nowrap >
		    <EF:EFSelect blockId="inqu_status" ename="form_type" row="0" >
		    <EF:EFOption label='<%=I18nMessages.getText("label.EFAll","全部") %>' value="" />
		    <EF:EFOptions conj="-" blockId="formTypeDesc" labelColumn="form_type_desc" valueColumn="form_type"/>
		    </EF:EFSelect>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap >
		      <%=I18nMessages.getText("label.EDRecCreateTimeStart","记录创建开始日期") %>
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="rec_create_time_start" row="0" popup="date" etc="maxLength='8' size='8'" />
		    </td>
		    <td nowrap >
		      <%=I18nMessages.getText("label.EDRecCreateTimeEnd","记录创建截止日期") %>
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="rec_create_time_end" row="0" popup="date" etc=" maxLength='8' size='8'" />
		    </td>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("label.EDProject","工程") %>
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
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:275px;">
	</div> 
</div>
<EF:EFRegion></EF:EFRegion>

<EF:EFGrid blockId="result" autoDraw="yes" >	
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
