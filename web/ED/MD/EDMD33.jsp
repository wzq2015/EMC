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
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD33.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDMD33" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFInput blockId="" ename="edfa00DeleteButton" row="" type="hidden" />
<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true efRegionSave=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.form_ename","画面英文名") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="form_ename" cname="画面英文名" row="0" style="text-transform : uppercase;" popup="img" etc="validateType='string' maxLength='8' size='8'"/>
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
	<div style="text-align: right;">
		<EF:EFButton type="button" ename="query" cname='<%=I18nMessages.getText("label.query","查询") %>' />
	</div>
</div>  

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:275px;">
	</div> 
	<div style="text-align: right;">
		<EF:EFButton type="button" ename="return" cname='<%=I18nMessages.getText("label.return","返回") %>' />
	</div>
</div>

<EF:EFRegion/>
  
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" canPageAll="true" frontSort="true">	
	<EF:EFColumn ename="form_ename" width="80" fix="yes" />
	<EF:EFColumn ename="form_cname" width="160"  />
	<EF:EFColumn ename="form_load_path" width="160"  />
	<EF:EFComboColumn ename="form_type" width="80" blockName="formTypeDesc" valueProperty="form_type" labelProperty="form_type_desc" formatString="#valueString#-#labelString#"  />
	<EF:EFColumn ename="module_ename_1"  width="50" />
	<EF:EFColumn ename="module_ename_2"  width="50" />	
	<EF:EFColumn ename="init_load_service_ename" />	
	<EF:EFColumn ename="form_param" width="200"  />
    <EF:EFComboColumn ename="form_style" >
		<EF:EFCodeOption codeName="iplat.ed.formStyle" />
    </EF:EFComboColumn>
	<EF:EFColumn ename="rec_creator" enable="false" />
	<EF:EFColumn ename="rec_create_time" enable="false" />
	<EF:EFColumn ename="rec_revisor" enable="false" />
	<EF:EFColumn ename="rec_revise_time" enable="false" />
	<EF:EFColumn ename="archive_flag" />
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
