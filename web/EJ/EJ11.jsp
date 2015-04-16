<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
  //触发器类型：
	List trigger_types = new ArrayList();
	trigger_types.add( new EFComboBean("cron", I18nMessages.getText("label.EJCronTriggerSchedule", "cron表达式触发器")) );	
	//trigger_types.add( new EFComboBean("simple", "简单触发器") );	
	request.setAttribute( "trigger_types", trigger_types );
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EJ/EJcommon.js"></script>
	<script type="text/javascript" src="./EJ/EJ11.js"></script>

</head>
<body class="bodyBackground">
<form id="EJ11" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_qtrigger" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
		    <td width="25%"><%=I18nMessages.getText("label.EJJobId","任务编号") %> ：</td>
		    <td><EF:EFInput blockId="qtrigger" ename="jobName" row="0" /></td>
		  </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_rtrigger" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
	<div id = "ef_grid_rtrigger" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;">
	</div>
</div>

<div id="ef_region_link" title="<%=I18nMessages.getText("label.EFPageHelpAndLink","页面帮助及链接") %>" style="overflow:scroll"/>
	<div style="overflow:hidden;width:100%">
	<table width="100%">
					<tr class="tableRow0"><td nowrap width="25%"><%=I18nMessages.getText("label.EJCronTrigger","cron表达式") %></td><td>
						<%=I18nMessages.getText("label.EJ1101","cron表达式是一个功能强大的时间表达式,具体使用常见") %><a href="<%=request.getContextPath()%>/EJ/cron_intro.html" target="_blank"><%=I18nMessages.getText("label.EJ1102","cron表达式参考") %></a>
					</td></tr>
					<tr class="tableRow1"><td nowrap width="25%"><%=I18nMessages.getText("label.EJStartAndEndTimeSetting","开始/结束时间设定") %></td><td>
						<%=I18nMessages.getText("label.EJ1103","开始时间及结束时间可以不用填写,如果填写,格式为yyyy-MM-dd hh:mm:ss,形如:2007-08-20 18:13:11") %>
					</td></tr>
	</table>
	</div>
</div>

	<EF:EFGrid blockId="rtrigger" autoDraw="no" ajax="true" queryMethod="triggerList">
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobTriggerId","任务触发编号") %>' ename="triggerName" fix="yes" sort="false" nullable="false" maxLength="80" minLength="1" validateType="string"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobId","任务编号") %>' ename="jobName" readonly="true" nullable="false" maxLength="80" minLength="1" validateType="string"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJDesc","描述") %>' ename="triggerDesc" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJPreviousFireTime","上次触发时间") %>' ename="previousFireTime" readonly="true" width="130"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJNextFireTime","下次触发时间") %>' ename="nextFireTime" readonly="true" width="130"/>
		<EF:EFComboColumn cname='<%=I18nMessages.getText("label.EJTriggerType","触发类型") %>' ename="triggerType" sourceName="trigger_types" valueProperty="value"  labelProperty="label" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJCronExpression","cron表达式") %>' ename="cronExpression" nullable="false" maxLength="80" minLength="1"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJStartTime","开始时间") %>' ename="startTime" width="130"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJEndTime","结束时间") %>' ename="endTime" width="130"/>
	</EF:EFGrid>
		<!--
		<EF:EFColumn cname="简单触发重复间隔(ms)" ename="repeatInterval" />
		<EF:EFColumn cname="简单触发重复次数" ename="repeatCount" />
		-->
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
