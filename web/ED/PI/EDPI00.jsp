<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>	
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/PI/EDPI00.js"></script>
</head>
<body class="bodyBackground" >
<form id="EDPI00" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_project" title="<%=I18nMessages.getText("label.EDProjectInfo","项目信息") %>"  efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table width="100%">
		  <tr>
		    <td  nowrap width="20%" >
		      <%=I18nMessages.getText("label.EDCurrentProjectEname","当前项目英文名") %>
		    </td>
		    <td  nowrap width="80%" >
		      <EF:EFInput blockId="" ename="projectEname" row="" etc="readonly='false'" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_proinfo" title="<%=I18nMessages.getText("label.EDProjectInfo","项目信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_projectInfo" title="<%=I18nMessages.getText("label.EDProjectInfo","项目信息") %>" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<div id = "ef_region_projects" title="<%=I18nMessages.getText("label.EDMultiProjectInfo","多项目信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_projects" title="<%=I18nMessages.getText("label.EDMultiProjectInfo","多项目信息") %>" style="overflow: hidden;height:200px;">
	</div> 
</div>     

<EF:EFRegion/>

<EF:EFGrid blockId="projectInfo" autoDraw="no" readonly="false" style="operationBar:false;navigationBar:false" ajax="false">	
	<EF:EFColumn ename="messageConfigURL" cname='<%=I18nMessages.getText("label.EDMessageConfigURL","配置项路径") %>' fix="yes" width="200"  enable="false"/>
	<EF:EFColumn ename="messageCname" cname='<%=I18nMessages.getText("label.EDMessageCname","配置项") %>' fix="yes" width="200"  enable="false"/>
	<EF:EFColumn ename="messageContext" cname='<%=I18nMessages.getText("label.EDMessageContext","配置项内容") %>' width="300"  />
	<EF:EFColumn ename="messageSample" cname='<%=I18nMessages.getText("label.EDMessageSample","配置项提示") %>' width="300"  readonly="true"/>
</EF:EFGrid>      

<EF:EFGrid blockId="projects" autoDraw="no" readonly="false" style="operationBar:false;navigationBar:false" >	
	<EF:EFColumn ename="projectEname" cname='<%=I18nMessages.getText("label.EDProjectEname","项目英文") %>' fix="yes" width="120"  enable="false"/>
	<EF:EFColumn ename="projectCname" cname='<%=I18nMessages.getText("label.EDProjectCname","项目中文") %>' fix="yes" width="200"  enable="false"/>
	<EF:EFColumn ename="projectPrefix" cname='<%=I18nMessages.getText("label.EDProjectProfix","项目模块前缀") %>' width="120"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>


