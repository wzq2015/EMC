<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	//类型：
	List class_types = new ArrayList();
	class_types.add( new EFComboBean("com.baosight.iplat4j.job.quartz.EiStatefulJob", I18nMessages.getText("label.EJSecureEIJob", "安全型EI任务(不可同时加载)")) );	
	class_types.add( new EFComboBean("com.baosight.iplat4j.job.quartz.EiJob", I18nMessages.getText("label.EJParallelEIJob", "并行型EI任务(可同时重复加载)")) );	
	request.setAttribute( "class_types", class_types );
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EJ/EJcommon.js"></script>
	<script type="text/javascript" src="./EJ/EJ10.js"></script>

</head>
<body class="bodyBackground">
<form id="EJ10" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_qjob" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
		    <td width="25%"><%=I18nMessages.getText("label.EJJobId","任务编号") %> ：</td>
		    <td><EF:EFInput blockId="qjob" ename="jobName" row="0" /></td>
		  </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_rjob" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
	<div id = "ef_grid_rjob" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;">
	</div>
</div>

<div id="ef_region_link" title="<%=I18nMessages.getText("label.EFPageHelpAndLink","页面帮助及链接") %>" style="overflow:scroll"/>
	<div style="overflow:hidden;width:100%">
	<table width="100%">
					<tr class="tableRow0"><td nowrap width="25%"><%=I18nMessages.getText("label.EJJobClassHelp","任务类选择说明") %></td><td>
						<span class="contentHeader"><%=I18nMessages.getText("label.EJParallelEIJob","并行型EI任务") %></span>:<%=I18nMessages.getText("label.EJParallelEIJobHelpAndImplementClass","可以依据触发器规则同时加载多个,并行运行的任务,其实现类为") %>com.baosight.iplat4j.job.quartz.EiJob;<br>
						<span class="contentHeader"><%=I18nMessages.getText("label.EJSecureEIJob","安全型EI任务") %></span>:<%=I18nMessages.getText("label.EJSecureEIJobHelpAndImplementClass","只能单个执行的任务,如执行时间较长的报表输出任务,将保证只有一个报表输出任务在执行.其实现类为") %>com.baosight.iplat4j.job.quartz.EiStatefulJob.
					</td></tr>
					<tr class="tableRow1"><td nowrap width="25%"><%=I18nMessages.getText("label.EJParameterDescription","参数填写说明") %></td><td>
						<%=I18nMessages.getText("label.EJParameterRequirements","在选择'并行型EI任务'及'安全型EI任务'时,参数填写要求如下(请注意大小写):") %><br>
						<span class="contentHeader">serviceName</span>:<%=I18nMessages.getText("label.EJServiceName","调用服务名;(必须填写)") %><br>
						<span class="contentHeader">methodName</span>:<%=I18nMessages.getText("label.EJMethodName","调用服务的方法名;(必须填写)") %><br>
						<%=I18nMessages.getText("label.EJOtherParametersDescription","其他参数可以附加在后面,每个参数及值之间用符号\",\"分隔,示例如下:") %><br>
						serviceName=EE80,methodName=Hello,name=zhaogang
					</td></tr>
	</table>
	</div>
</div>

	<EF:EFGrid blockId="rjob" autoDraw="no" ajax="true" queryMethod="jobList">
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobId","任务编号") %>' ename="jobName" fix="yes" sort="false" nullable="false" maxLength="80" minLength="1" validateType="string"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJDesc","描述") %>' ename="jobDesc" width="150" nullable="false" maxLength="120" minLength="1"/>
		<EF:EFComboColumn cname='<%=I18nMessages.getText("label.EJJobClass","任务类") %>' ename="className" sourceName="class_types" valueProperty="value"  labelProperty="label" width="160"/>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobData","参数定义") %>' ename="jobData" width="320"  nullable="false" />		
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJIsTriggerDefine","已定义触发") %>' ename="isTriggerDefine" width="100"/>	
		<EF:EFColumn cname='<%=I18nMessages.getText("label.EJJobAction","操作") %>' ename="jobAction" width="100"  readonly="true"/>	
		<EF:EFComboColumn cname='<%=I18nMessages.getText("label.Priority","优先级") %>' ename="jobPriority" width="100"  nullable="true">
		<EF:EFCodeOption codeName="iplat.ej.priority" />
		</EF:EFComboColumn>
		<EF:EFColumn cname='<%=I18nMessages.getText("label.LinkMan","联系人") %>' ename="jobLinkMan" width="100"  nullable="true" />
	</EF:EFGrid>



<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
