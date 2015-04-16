<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
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
	<script type="text/javascript" src="./EJ/EJcommon.js"></script>
	<script type="text/javascript" src="./EJ/EJ12.js"></script>

</head>
<body class="bodyBackground">
<form id="EJ12" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_qjobrun" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
</div>

<div id = "ef_region_rjobrun" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
	<div id = "ef_grid_rjobrun" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;">
	</div>
</div>

<div id="ef_region_link" title="<%=I18nMessages.getText("label.EFPageHelpAndLink","页面帮助及链接") %>" style="overflow:scroll"/>
	<div style="overflow:hidden;width:100%">
	<table>
					<tr><td nowrap width="25%"><%=I18nMessages.getText("label.EJPageDescription","页面说明") %></td><td>
						<%=I18nMessages.getText("label.EJ1201","本页面显示的是当前正在执行的任务,如果执行时间太长,可以人工的点击\"停止任务\"按钮,中止相关任务.") %>
					</td></tr>
	</table>
	</div>
</div>

	<EF:EFGrid blockId="rjobrun" autoDraw="no" ajax="true" queryMethod="jobRunList"   style="operationBar:false">
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJSid","序列号") %>' ename="sid" fix="yes" sort="false"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobId","任务编号") %>' ename="jobName" readonly="true" fix="yes" sort="false"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobDesc","任务描述") %>' ename="jobDesc" width="150" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJRunTime","已运行时间") %>' ename="runTime" width="130"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobTriggerId","任务触发编号") %>' ename="triggerName" fix="yes" sort="false"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJTriggerDesc","触发器描述") %>' ename="triggerDesc" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJPreviousFireTime","上次触发时间") %>' ename="previousFireTime" width="130"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJNextFireTime","下次触发时间") %>' ename="nextFireTime" width="130"/>
	</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
