<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	//类类型：
	List exeStatus = new ArrayList();
	exeStatus.add( new EFComboBean("1", I18nMessages.getText("label.successful","成功")) );	
	exeStatus.add( new EFComboBean("-1", I18nMessages.getText("label.failure","失败")) );	
	request.setAttribute( "exeStatus", exeStatus );
	
	List status = new ArrayList();
	status.add( new EFComboBean("0", I18nMessages.getText("label.EJAlreadyRunning","已运行")) );	
	status.add( new EFComboBean("1", I18nMessages.getText("label.EJRanEnded","运行结束")) );	
	status.add( new EFComboBean("-1", I18nMessages.getText("label.EJMissingRunning","错失运行")) );	
	request.setAttribute( "status", status );
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EJ/EJcommon.js"></script>
	<script type="text/javascript" src="./EJ/EJ14.js"></script>

</head>
<body class="bodyBackground">
<form id="EJ14" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_qjoblog" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
		    <td width="25%"><%=I18nMessages.getText("label.EJJobId","任务编号") %> ：</td>
		    <td><EF:EFInput blockId="qjoblog" ename="jobName" row="0" /></td>
		  </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_rjoblog" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
	<div id = "ef_grid_rjoblog" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;">
	</div>
</div>

<div id="ef_region_link" title="<%=I18nMessages.getText("label.EFPageHelpAndLink","页面帮助及链接") %>" style="overflow:scroll"/>
	<div style="overflow:hidden;width:100%">
	<table>
					<tr><td nowrap width="25%"><%=I18nMessages.getText("label.EJLogDescription","日志说明") %></td><td>
						<%=I18nMessages.getText("label.EJ1401","此页面显示的是任务执行状况的日志,您可以通过\"删除日志\"按钮删除不需要的日志.") %>
					</td></tr>
	</table>
	</div>
</div>

	<EF:EFGrid blockId="rjoblog" autoDraw="no" ajax="true" queryMethod="jobLogList"   style="operationBar:false">
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJSid","序列号") %>' ename="sid" width="20"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJStartTime","开始时间") %>' ename="start_time" width="130"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJEndTime","结束时间") %>' ename="end_time" width="130"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJRunTime","运行时间") %>' ename="run_time" width="110"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobId","任务编号") %>' ename="job_name" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobDesc","任务描述") %>' ename="job_desc" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobPriority","任务优先级") %>' ename="jobPriority" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobTriggerId","触发器编号") %>' ename="trigger_name" />
		<EF:EFComboColumn cname='<%=I18nMessages.getText("label.EJJobStatus","任务状态") %>' ename="status" sourceName="status" valueProperty="value"  labelProperty="label" width="50"/>
		<EF:EFComboColumn cname='<%=I18nMessages.getText("label.EJExeStatus","调用状态") %>' ename="exe_status" sourceName="exeStatus" valueProperty="value"  labelProperty="label" width="50"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJFeedbackInfomation","反馈信息") %>' ename="exe_msg" />
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJExeInfomation","执行信息") %>' ename="exe_info" />
	</EF:EFGrid>



<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
