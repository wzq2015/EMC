<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="java.text.SimpleDateFormat" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@page import="com.baosight.iplat4j.dao.*" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.ep.util.DispatchHandler"%>
<%@page import="com.baosight.iplat4j.common.ed.domain.TEDFA00"%>
<%@page import="com.baosight.ieasyflow.engine.WorkflowManager"%>
<%@page import="com.baosight.ieasyflow.engine.task.Task"%>
<%@page import="com.baosight.ieasyflow.engine.activity.ActivityDefinition"%>
<%@page import="com.baosight.ieasyflow.engine.activity.ReturnsSetting"%>
<%@page import="com.baosight.ieasyflow.engine.Transition"%>
<%@page import="com.baosight.ieasyflow.engine.history.HistoryTask"%>
<%@page import="com.baosight.ieasyflow.engine.history.HistoryProcessInstance"%>
<%@page import="com.baosight.ieasyflow.engine.history.HistoryActivityInstance"%>
<%@page import="com.baosight.ieasyflow.engine.ProcessDefinition"%>
<%@page import="com.baosight.ieasyflow.engine.Activity"%>
<%@page import="com.baosight.iplat4j.ed.md.formbuilder.FbUtils"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String userName = (String) UserSession.getUserId();
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String processId = request.getParameter("inqu_status-0-processid");
	String formName = request.getParameter("efFormEname");
	boolean isCorrectFormName=true;
	String taskId = request.getParameter("inqu_status-0-taskid");
	String pageTitle = null;
	String rgnTitle = "";
	
	TEDFA00 formInfo=null;
	try{
	formInfo=DispatchHandler.checkFormInfo(formName);
	}catch(Exception ex){
		isCorrectFormName=false;
	}
	if(formInfo==null) rgnTitle ="流程关联的表单【"+formName+"】不存在或尚未发布!";
	if(formInfo!=null&&!formInfo.form_type.equals("3")){
		rgnTitle ="流程关联的表单【"+formName+"】不是自定义表单!";
		isCorrectFormName=false;
	}
	if(formInfo!=null&&formInfo.form_type.equals("3"))
	rgnTitle =formInfo.getForm_cname();	
	
	long processInsId = Long.parseLong(processId);
	long actInstId=Long.parseLong(taskId);
	Task task = WorkflowManager.getTask(actInstId);
	if(task!=null){
	pageTitle = task.getActivityDisplayName();
	}
	
	EiInfo info = (EiInfo) pageContext.getAttribute("ei");
	if (info == null) {
		info = new EiInfo();
		pageContext.setAttribute("ei", info);
	}
	info.setCell("inqu_status", 0, "processId", processId);
	info.setCell("inqu_status", 0, "taskId", taskId);
	info.setCell("inqu_status", 0, "formName", formName);
	
	
	//获取历史活动列表	
	List<HistoryTask> history = new ArrayList<HistoryTask>();
	HistoryProcessInstance hisPrsIns=WorkflowManager.getProcessInstance(processInsId);
	List<HistoryActivityInstance> hisActInsts=hisPrsIns.getHistoryActivityInstances(true);	
	HistoryActivityInstance curHisActInst=null;
	if(hisActInsts!=null&&hisActInsts.size()>0)
	for (HistoryActivityInstance hai : hisActInsts){
		if(hai.getActivityInstanceId()==actInstId) curHisActInst=hai;
		List<HistoryTask> hts=hai.getHistoryTasks();
		if(hts!=null&&hts.size()>0){
			for(HistoryTask ht:hts){
				if(ht.getId()!=actInstId){
					history.add(ht);
				}
			}
		}
	}
	//判断是否根据规则进行转移
	boolean isRuleTrans=false;
	List<Transition> transitions = WorkflowManager.getSubsequentTransitions(task.getId());
	if (transitions != null && transitions.size() > 0){
		Transition firstTransition = transitions.get(0);
	   //判断是否为根据规则进行转移，为1则为按规则转移
	   if (firstTransition.getDecisionType().equals("1")) isRuleTrans=true;
	}
	//获取回退设置	
	ActivityDefinition actDef=WorkflowManager.getActivity(task.getId());
	ReturnsSetting rs=actDef.getReturnsSetting();
	Set<String> retActs=null;
	if(rs!=null){
	System.out.println("回退类型："+rs.getType());
	System.out.println("是否回退："+rs.isEnabled());
	retActs=rs.getReturnsActivities().keySet();
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title><%=pageTitle%></title>
<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="EW/EW0402.js"></script>
<script type="text/javascript" src="FormBuilder/js/dynform.js"></script>
<script type="text/javascript" src="EU/ueditor/editor_config_for_formbuilder.js"></script>
<script type="text/javascript" src="EU/ueditor/editor_all.js"></script>
<link rel="stylesheet" href="EU/ueditor/themes/default/ueditor.css"/> 
<link type="text/css" href="FormBuilder/css/formrender.css" media="screen" rel="stylesheet" />
</head>
<body>
<form id="EW0402" method="POST" action="<%=actionUrl%>">
<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="inqu_status" ename="processId" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="taskId" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="formName" row="0" type="hidden"/>

<% if (task!=null&&!task.getState().equals(Task.STATE_COMPLETED)&&isCorrectFormName==true) { %>
<div id="ef_region_result" title="<%=rgnTitle%>">
<div id="formDiv"></div>
</div>
<% if (history.size() > 0) { %>
<div id="ef_region_his" title="历史审批">
<div>
<table class="fbLayoutGrid" style="border-collapse:collapse;border-spacing:0px">
 <tr>
  <td class="fbTH" width="20%">历史活动名称</td>
  <td class="fbTH" width="15%">开始时间</td>
  <td class="fbTH" width="15%">完成时间</td>
  <td class="fbTH"  width="10%">执行者</td>
  <td class="fbTH"  width="45%">审批意见</td>
 </tr>		
<% for (HistoryTask ht : history) {
%>
 <tr>
  <td class="fbTD" width="20%"><%=ht.getActivityDisplayName()%></td>
  <td class="fbTD" width="15%"><%=formatter.format(ht.getStartTime())%></td>
  <td class="fbTD" width="15%"><%=ht.getEndTime()==null?"":formatter.format(ht.getEndTime())%></td>
  <td class="fbTD"  width="10%"><%=ht.getCompleter()%></td>
  <td class="fbTD"  width="45%"><%=ht.getComment()%></td>
 </tr>			
<%}%>
</table>
</div>
</div>
<%}%>

<div id="ef_region_wf" title="执行操作"  efregionshow="true">
<div>
<table id="outerTableLayout" style="width:100%">
   <tr>
   <td>审批意见</td>
   <td colspan="4">
	<div id="myEditor" ></div>
	<script type="text/javascript">
	var editor = new baidu.editor.ui.Editor();
    editor.render("myEditor");   	
	</script> 	
	</td>
   </tr>

   <tr>
		<td>&nbsp;&nbsp;&nbsp;</td>
		<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		<td>		
		<% if (rs!=null&&rs.isEnabled()&&rs.getType()!=null&&rs.getType().equals(ReturnsSetting.ReturnsTypeAppointed)&&retActs!=null&&retActs.size() > 0) { %>
			<div>
			<input id="returnTo" name="Field1" class="inputField"
						style="float: left;" type="radio" value="">回退 
			<select id="historyActivity">
			<% for (String retAct : retActs) { %>
				<option value="<%=retAct%>"><%=rs.getReturnsActivities().get(retAct)%></option>
			<%} %>
			</select>
			</div>
			<% }else if(rs!=null&&rs.isEnabled()&&rs.getType()!=null&&rs.getType().equals(ReturnsSetting.ReturnsTypeLast)){ %>
			<div>
			<input id="returnTo" name="Field1" class="inputField"
						style="float: left;" type="radio" value="">回退到上一步
			</div>
			<%}%>
		</td>
		
		<td>		
		<div>
		<input id="nextStep" name="Field1" class="inputField"
			style="float: left;" type="radio" value="" checked="checked">下一步
		<%if(!isRuleTrans){ %>
		<select id="transition">
		<% for (Transition t : WorkflowManager.getSubsequentTransitions(task.getId())) { %>
			<option value="<%=t.getName()%>"><%=t.getDisplayName()%>-<%=t.getDestination().getDisplayName()%></option>
		<%}%>
		</select>		
		<%}else{%>
		<br><label>基于以下规则进行转移:</label><br>
		<% for (Transition t : WorkflowManager.getSubsequentTransitions(task.getId())) { %>
		<label> [<%=t.getDisplayName()%>-><%=t.getDestination().getDisplayName()%>]</label>
		<%}%>
		<%}%>
		</div>		
		</td>
		
		<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
	</tr>
	
	<tr>	
		<td colspan="3">
			<button id="tempStore" type="button">暂存</button>
			<button id="save" type="button">提交</button>
		</td>		
	</tr>
	
</table>	
</div>
</div>
<%}%> 
<EF:EFRegion/>
</form> 

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>