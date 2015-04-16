<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EJ/EJcommon.js"></script>
	<script type="text/javascript" src="./EJ/EJ13.js"></script>

</head>
<body class="bodyBackground">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_job" title="<%=I18nMessages.getText("label.EJJobScheduleStatus","任务调度器状态信息") %>" >
<div style="overflow:hidden;width:100%">
<table>
				<tr><td nowrap width="25%"><%=I18nMessages.getText("label.EJSchedulerName","任务调度器名称") %></td><td>${ei.attr.schedulerName}</td></tr>
				<tr><td><%=I18nMessages.getText("label.EJSchedulerInstanceId","任务调度器实例号") %></td><td>${ei.attr.schedulerInstanceId}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJSchedulerVersion","任务调度器版本") %></td><td>${ei.attr.version}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJSchedulerSummary","任务调度器状态综述") %></td><td>${ei.attr.summary}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJSchedulerRunningSince","开始运行时间") %></td><td>${ei.attr.runningSince}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJThreadPoolSize","线程池大小") %></td><td>${ei.attr.threadPoolSize}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJCurrentlyExecutingJobs","正在运行的任务数") %></td><td>${ei.attr.currentlyExecutingJobs}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJNumJobsExecuted","已经运行完成的任务数") %></td><td>${ei.attr.numJobsExecuted}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJIsInStandbyMode","是否处于暂停模式(standby)") %></td><td>${ei.attr.isInStandbyMode}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJSchedulerIsStarted","是否处于运行模式(started)") %></td><td>${ei.attr.isStarted}</td></tr>
			  <tr><td><%=I18nMessages.getText("label.EJSchedulerIsShutdown","是否处于停止模式(shutdown)") %></td><td>${ei.attr.isShutdown}</td></tr>
</table>
</div>
</div>

<div id="ef_region_link" title="<%=I18nMessages.getText("label.EFPageHelpAndLink","页面帮助及链接") %>" style="overflow:scroll"/>
	<div style="overflow:hidden;width:100%">
	<table>
					<tr><td nowrap width="25%"><%=I18nMessages.getText("label.EJ1301","任务管理器模式状态说明") %></td><td>
						<%=I18nMessages.getText("label.EJ1302","运行模式: 任务调度器正常运行,所有任务会依据制定的规则自动加入并运行.") %><br>
						<%=I18nMessages.getText("label.EJ1303","暂停模式: 任务调度器暂停,当前运行的任务依旧会继续运行,直至其结束,但是新的任务将不再加入到任务列表中;") %><br>
						<!--停止模式: 是当前任务调度器处于彻底停止模式,需要谨慎使用,一旦彻底停止后,将无法在页面启动任务调度器,只能重启服务器才能重新启动;-->
					</td></tr>
	</table>
	</div>
</div>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
