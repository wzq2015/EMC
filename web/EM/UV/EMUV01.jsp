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
	<script type="text/javascript" src="./EM/UV/EMUV01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EMUV01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_submitlist" style="overflow:scroll" title="<%=I18nMessages.getText("label.flowlist", "提交信息流程")%>" efRegionShowClear=true>
	<div id = "ef_grid_submitlist" title="我发起的流程" style="overflow: hidden;height:250px;">		
	</div>
</div>
<div id = "ef_region_worklist" title="<%=I18nMessages.getText("label.worklist", "收件箱")%>" efRegionShowClear=true>
	<div id = "ef_grid_worklist" style="overflow:hidden;height:250px;">		
	</div>
</div>
<div id = "ef_region_businessmsg" title="<%=I18nMessages.getText("label.worklist", "消息通知")%>" efRegionShowClear=true>
	<div id = "ef_grid_businessmsg" style="overflow:hidden;height:250px;">		
	</div>
</div>  
<div id = "ef_region_workhistory" title="<%=I18nMessages.getText("label.worklist", "工作履历")%>" efRegionShowClear=true>
	<div id = "ef_grid_workhistory" title="工作履历" style="overflow:hidden;height:250px">		
	</div>
</div>    

<EF:EFRegion/>

<EF:EFGrid blockId="submitlist" ajax="true" serviceName="EMUV01" queryMethod="querysubmitlist"  readonly="false" style="operationBar:false;modelXlsBar:false">	
	<EF:EFColumn ename="dbid" cname="流程编号" fix="yes" width="150" />
	<EF:EFColumn ename="form"  cname="履历" fix="no" displayType="hyperlink" width="80" />
	<EF:EFColumn ename="desc" cname="工作描述" width="80" />
	<EF:EFColumn ename="taskStartTime" cname="完成时间" width="80" />
	<EF:EFColumn ename="processDefDisplayName" cname="流程名称" width="80" />
	<EF:EFColumn ename="activityDisplayName" cname="下步操作" width="80" />
	<EF:EFColumn ename="starter" cname="下步操作人" fix="no" displayType="hyperlink" width="80" />
	<EF:EFColumn ename="startTime" cname="提交时间" width="80" />
	<EF:EFColumn ename="taskid" cname="序号" width="80"/>
</EF:EFGrid>   
<EF:EFGrid blockId="worklist" autoDraw="false" readonly="false" style="navigationBar:false;operationBar:false">	
	<EF:EFColumn ename="processInstanceId" cname="流程编号" fix="yes" width="150" />
	<EF:EFColumn ename="dbid" cname="任务编号" visible="false" width="80"/>	
	<EF:EFColumn ename="desc" cname="工作描述" width="80" />
	<EF:EFColumn ename="assignee" cname="提交人" width="80" />
	<EF:EFColumn ename="startTime" cname="提交时间" width="80" />
	<EF:EFColumn ename="extend" cname="流程名称" width="80" />
	<EF:EFColumn ename="activityDisplayName" cname="下步操作" width="80" />
	<EF:EFColumn ename="activityName" cname="备注" width="80" />	
	<EF:EFColumn ename="formResourceName" cname="业务页面" width="80" />
		
</EF:EFGrid>
<EF:EFGrid blockId="businessmsg" autoDraw="yes" readonly="false" style="navigationBar:false;operationBar:false">		
	<EF:EFColumn ename="msgid" cname="消息编号" width="80" fix="yes" />
	<EF:EFColumn ename="msgdesc" cname="消息内容" width="240" />
	<EF:EFColumn ename="formename" cname="跳转地址" width="80" visible = "false" />
	<EF:EFColumn ename="appname" cname="应用名称" width="120" visible = "false"/>
	<EF:EFColumn ename="msgtype" cname="消息类型" width="120" visible = "false"/>
</EF:EFGrid>
<EF:EFGrid blockId="workhistory" ajax="true" serviceName="EMUV01" queryMethod="queryWorkHistory" autoDraw="false" readonly="false" style="operationBar:false">	
	<EF:EFColumn ename="dbid" cname="流程编号" fix="yes" width="150" />
	<EF:EFColumn ename="form"  cname="履历" fix="no"  displayType="hyperlink" width="80" />
	<EF:EFColumn ename="desc" cname="工作描述" width="80" />
	<EF:EFColumn ename="taskStartTime" cname="完成时间" width="80" />
	<EF:EFColumn ename="processDefDisplayName" cname="流程名称" width="80" />
	<EF:EFColumn ename="activityDisplayName" cname="下步操作" width="80" />
	<EF:EFColumn ename="starter" cname="下步操作人" fix="no"  displayType="hyperlink" width="80" />
	<EF:EFColumn ename="startTime" cname="提交时间" width="80"/>
	<EF:EFColumn ename="taskid" cname="序号" width="80"/>
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

	<!--<EF:EFColumn ename="lastexecuted" cname="完成操作" width="80" />-->
</body>
</html>   
