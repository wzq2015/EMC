<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">	
	<title>
	</title>	
	<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="EU/mxGraph/mxClient.js"></script>
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/attributeSetting/ActivityParticipantsSetting.js"></script>
    <script type="text/javascript" src="EW/WorkflowDesigner/js/attributeSetting/ManualActivitySetting.js"></script>
	<script type="text/javascript" src="EW/EW0101.js"></script>
	 <style type="text/css" media="all">
	fieldset { 
padding:10px; 
margin-top:5px; 
border:1px solid #1E7ACE; 
background:#fff; 
} 

fieldset legend { 
color:#1E7ACE; 
font-weight:bold; 
font-size:12px;
padding:3px 20px 3px 20px; 
border:1px solid #1E7ACE; 
background:#fff; 
} 

fieldset label { 
float:left; 
width:260px; 
font-size:12px; 
text-align:left; 
padding:4px; 
margin:1px; 
} 
</style>
</head>
<body class="bodyBackground">

<form id="EW0101" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_tab_y" lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">

<div id="basicAttr" title="基本属性" >
<div id="ef_region_basicAttr" title="" style="overflow: hidden;height:400px;">
	<div id="basicAttrInputs">
		<table>	
		<tr >
			<td nowrap="nowrap" align="right" width="25%" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr >
			<td nowrap="nowrap" align="right" width="25%" >活动名称:</td>
			<td nowrap="nowrap">
			   <EF:EFInput   ename="name"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动名称不能含有特殊字符、空格' regex='/^[-\w_.\u4e00-\u9fa5]*$/' " />
			</td>			
		 </tr>
		  <tr>
			<td nowrap="nowrap" align="right">显示名称:</td>
			<td nowrap="nowrap" >
				<EF:EFInput   ename="displayName"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]{1,40}$/' " />
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">表单页面:</td>
			<td nowrap="nowrap">
				<EF:EFInput   ename="form"   etc="size='46px' minLength='0'  maxLength='1000' " />
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">活动描述:</td>
			<td nowrap="nowrap">
			<textarea id="desc"  cols="52" rows="6"></textarea>		
			</td>
		  </tr>
		</table>
	</div>
</div>
<EF:EFRegion/>
</div>


<div id="participantSet" title="参与者" >
    <div id = "ef_grid_participantSetResult" title="页面信息" style="overflow:hidden;height:400px;">	
	</div>	
</div>


<div id="activityParticipants" title="任务接口" >
<div id = "ef_region_activityParticipants" title="页面信息" style="overflow:hidden;height:400px;">

<table style="width: 100%">
	<tr>
		<td align="left">
		<div style="overflow: scroll; float: left; width: 180px; height: 395px; border-top: solid 1px #9cbdff;">
		<EF:EFTreeModel id="tModel">
			<EF:EFTemplate id="activityParticipantsType">
			</EF:EFTemplate>
			<EF:EFTemplate ref="worldMap" />
		</EF:EFTreeModel>
		 <EF:EFTree model="tModel" id="tree" text="任务接口"
			configFunc="configTree">
		</EF:EFTree>
		</div>
		</td>
		<td>
		<div id="ef_grid_activityParticipantsResult" title="页面信息"
			style="overflow:hidden;float: left; width: 450px;height: 395px;">
		</div>

		</td>
	</tr>
</table>
</div>
</div>

<div id="taskTactics" title="任务策略" >
<div id = "ef_region_taskTactics" title="记录集" style="overflow: hidden;height:400px;">
<fieldset>
<legend>任务分配策略</legend>
<p><label>延迟分配：
<select  id="isDeffered" name="isDeffered" >
<option id="isDeffered0" value="false" selected="selected">否</option>
<option id="isDeffered1" value="true" selected="">是</option>
</select>
</label></p>
</fieldset>
<fieldset>
<legend>任务完成策略</legend>
<p><label> 
<input type="radio" name="handleType" value="0" checked="checked"/>任意完成一个
<input type="radio" name="handleType" value="1" /> 必须全部完成
</label></p>
</fieldset>
</div>
</div>

<div id="extra" title="扩展属性" >
 <div id = "ef_grid_extraResult" title="页面信息" style="overflow: hidden;height:400px;">
 </div>
</div>

<div id="events" title="事件配置" >
  <div id = "ef_grid_eventsResult" title="页面信息" style="overflow: hidden;height:400px;">
	</div>
</div>


<div id="returnSetting" title="回退设置"  >
<div style="overflow: hidden;height:400px;">
<fieldset>
<legend>回退策略</legend>
<label>回退权限：<input type="radio" name="returnType" value="true" checked="checked"/>允许回退
<input type="radio" name="returnType" value="false" /> 禁止回退        
</label>
<div id="rs">
<label>回退范围：
<select  id="returnScope" name="returnScope" >
<option id="returnScope0" value="Last" selected="">回退到上一步</option>
<option id="returnScope1" value="Appointed" selected="">回退到指定活动</option>
</select>
</label>
</div>
</fieldset>
<div id = "ef_grid_returnSettingResult" title="回退活动" style="overflow: hidden;height:345px;">
</div>
</div>
</div>


<div id="formSetting" title="表单设置" >
<div id = "ef_grid_formSettingResult" title="页面信息" style="overflow: hidden;height:400px;">
	</div>
</div>


</div>


<EF:EFRegion/>




<EF:EFTab tabId="y" />

<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="50%">
		   
		    </td>		    
		    <td nowrap>
		    	<EF:EFButton ename="confirm" cname="保存"  />
		    </td>
		     
		     <td nowrap >
		    	<EF:EFButton ename="cancel" cname="取消" />
		    </td>
		    <td nowrap width="50%">
		   
		    </td>
		    </tr>
 	</table>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
