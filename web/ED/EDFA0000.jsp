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
	String is_grade = I18nMessages.getText("E_Col.is_grade","是否分级")+"<input  type='checkbox' id='testcheck'  onclick=setAllGrade(this)>";
	String is_auth = I18nMessages.getText("E_Col.is_auth","是否授权")+"<input  type='checkbox' id='testcheck'  onclick=setAllAuth(this)>";
%>

<EF:EFPage>
<EF:EFScript src="./ED/EDFA00.js"></EF:EFScript>
<EF:EFHead includeDefault="true"/>

<body class="bodyBackground">

<EF:EFForm formId="EDFA00" >
  <EF:EFLayout    >
  <EF:EFPanel>
  <EF:EFInput blockId="" ename="edfa00DeleteButton" row="" type="hidden" />
  </EF:EFPanel>
	<EF:EFRegion regionId="ef_region_inqu" title="查询条件" >
		 <EF:EFLayout  col="3"  >
			<EF:EFInput isRequired="true"  bindId="inqu_status-0-form_ename" cname="画面英文名"   popup="img" style="text-transform : uppercase;" etc="validateType='string' maxLength='8' size='8'"/>
		  	<EF:EFInput bindId="inqu_status-0-form_cname" cname="画面中文名"  />
		    <EF:EFSelect  bindId="inqu_status-0-form_type" cname="画面类型"    >
		    	<EF:EFOption label="全部" value="" />
		    	<EF:EFOptions conj="-" blockId="formTypeDesc" labelColumn="form_type_desc" valueColumn="form_type"/>
		    </EF:EFSelect>
        	<EF:EFInput isRequired="true" bindId="inqu_status-0-rec_create_time_start" cname="记录创建开始日期"   popup="date" etc=" maxLength='8' size='8'" />
        	<EF:EFInput bindId="inqu_status-0-rec_create_time_end" cname="记录创建结束日期"  popup="date" etc=" maxLength='8' size='8'" />
		    <EF:EFSelect bindId="inqu_status-0-project_prefix" cname="工程"   >
			    <EF:EFOption label="全部" value="" />
			    <EF:EFOptions conj="-" blockId="projectBlock" labelColumn="projectCname" valueColumn="projectPrefix"/>
		    </EF:EFSelect>
		 </EF:EFLayout>
	</EF:EFRegion>
	
		<EF:EFGrid  blockId="result" autoDraw="no" readonly="false" title="页面信息" style="overflow: hidden;height:275px;">
			<EF:EFColumn ename="form_ename" width="80" fix="yes" />
			<EF:EFColumn ename="form_cname" width="180"  />
			<EF:EFColumn ename="form_load_path" width="200"  />
			<EF:EFComboColumn ename="form_type" width="80" blockName="formTypeDesc" valueProperty="form_type" labelProperty="form_type_desc" formatString="#valueString#-#labelString#"  />
			<EF:EFColumn ename="module_ename_1"  width="50" />
			<EF:EFColumn ename="module_ename_2"  width="50" />	
			<EF:EFColumn ename="init_load_service_ename" />	
			<EF:EFColumn ename="form_param" width="200"  />
		    <EF:EFComboColumn ename="form_style" >
				<EF:EFCodeOption codeName="iplat.ed.formStyle" />
		    </EF:EFComboColumn>
			<EF:EFColumn ename="is_grade"  cname="<%=is_grade %>" width="100" enable="false"/>
			<EF:EFColumn ename="is_auth"  cname="<%=is_auth %>" width="100" enable="false"/>
			<EF:EFColumn ename="rec_creator" enable="false" />
			<EF:EFColumn ename="rec_create_time" enable="false" />
			<EF:EFColumn ename="rec_revisor" enable="false" />
			<EF:EFColumn ename="rec_revise_time" enable="false" />
			<EF:EFColumn ename="archive_flag" />
		</EF:EFGrid>
  </EF:EFLayout>
</EF:EFForm>

</body>
</EF:EFPage>   
