<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String display="none";
	
	String is_auth = I18nMessages.getText("E_Col.is_auth","是否授权")+"<input  type='checkbox' id='testcheck'  onclick=setAllAuth(this)>";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/EDFA01.js"></script>

</head>
<body class="bodyBackground">
<form id="EDFA01" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
	<div>
		<table>
		  <tr>
		    <td noWarp=-1 width="25%">
		      <%=I18nMessages.getText("E_Col.form_ename","画面英文名") %>
		    </td>
		    <td noWarp=-1 width="25%">
		    <EF:EFInput blockId="inqu_status" ename="form_ename" row="0" style="text-transform : uppercase;"/>
		    </td>
		    <td noWarp=-1 width="25%">
		      <%=I18nMessages.getText("E_Col.button_ename","按钮英文名") %>
		    </td>
		    <td noWarp=-1 width="25%">
		    <EF:EFInput blockId="inqu_status" ename="button_ename" row="0" style="text-transform : uppercase;"/>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("label.EDProject","工程") %>
		    </td>  
		    <td nowrap >
		    <EF:EFSelect blockId="inqu_status" ename="project_prefix" row="0" >
		    <EF:EFOption label='<%=I18nMessages.getText("label.EFAll","全部") %>' value="" />
		    <EF:EFOptions conj="-" blockId="projectBlock" labelColumn="projectCname" valueColumn="projectPrefix"/>
		    </EF:EFSelect>
		    </td>
		    <td ></td>
		    <td ></td>
		  </tr>
		  <!-- 
		  <tr>
		    <td >
		      记录新增日期
		    </td>
		    <td >
		    <EF:EFInput blockId="inqu_status" ename="rec_create_time" row="0" />
					<img title="日历选择" src="./EF/Images/efcalendar_icon.gif" onmouseover="javascript:this.style.cursor='hand'" onClick="efcalendar_1_click(this);">
		    </td>
		    <td ></td>
		    <td ></td>
		  </tr>
		   -->
		</table>
	</div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:275px;">
	</div>
</div>

<%if(FrameworkInfo.isInternational()) display="block";%>

<div id = "ef_region_inter" title="<%=I18nMessages.getText("label.EDI18nResourcesInfo","国际化资源信息") %>" style="overflow:scroll;display:<%=display%>"> 
	<div id = "ef_grid_inter" title="<%=I18nMessages.getText("label.EDI18nResourcesInfo","国际化资源信息") %>" style="overflow: hidden;height:150px;">
	</div> 
<EF:EFInput blockId="inter_inqu_status" ename="fkey" row="0" type="hidden"/>
</div>

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes">
	<EF:EFColumn ename="is_auth"  cname="<%=is_auth %>" width="100" enable="false"/>
	<EF:EFColumn ename="rec_creator" enable="false" />
	<EF:EFColumn ename="rec_create_time" enable="false" />
	<EF:EFColumn ename="rec_revisor" enable="false" />
	<EF:EFColumn ename="rec_revise_time" enable="false" />

</EF:EFGrid>

<EF:EFGrid blockId="inter" autoDraw="yes" readonly="false" ajax="true" queryMethod="queryInter">
<EF:EFColumn ename="fproviderkey" visible = "false"  />
<EF:EFColumn ename="fkey" width="250" fix = "yes"  />
<EF:EFColumn ename="fvalue" width="300"  />
</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
