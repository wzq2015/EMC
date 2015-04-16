<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

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
	<script type="text/javascript" src="./EU/mxGraph/mxClient.js"></script>	
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/ActivityParticipantsSetting.js"></script>
    <script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/CodeActivitySetting.js"></script>    
	<script type="text/javascript" src="./EW/EW0107.js"></script>

</head>
<body class="bodyBackground">
<form id="EW0107" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">

<div id="basicAttr" title="基本属性" >
<div id="basicAttrInputs" title="" style="overflow: hidden;height:400px;">
	<div>
		<table>	
		<tr >
		    <td nowrap="nowrap" align="right" width="30%" >&nbsp;</td>
			<td nowrap="nowrap" align="right" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		<tr >
		    <td nowrap="nowrap" align="right" width="30%" >&nbsp;</td>
			<td nowrap="nowrap" align="right" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr >
		   <td nowrap="nowrap" align="right" width="30%" >&nbsp;</td>
			<td nowrap="nowrap" align="right" >活动名称:</td>
			<td nowrap="nowrap">
				<EF:EFInput   ename="name"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='名称不能含有特殊字符、空格' regex='/^[-\w_.\u4e00-\u9fa5]*$/' " />
			</td>
		 </tr>
		  <tr>
		   <td nowrap="nowrap" align="right" width="30%" >&nbsp;</td>
			<td nowrap="nowrap" align="right">显示名称:</td>
			<td nowrap="nowrap" >
				<EF:EFInput   ename="displayName"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]{1,40}$/' " />
			</td>
		  </tr>
		  <tr>
		    <td nowrap="nowrap" align="right" width="30%" >&nbsp;</td>
			<td nowrap="nowrap" align="right">表单页面:</td>
			<td nowrap="nowrap">
				<EF:EFInput   ename="form"   etc="size='46px' minLength='0'  maxLength='1000' " />
			</td>
		  </tr>		  
		</table>
	</div>
</div>
<EF:EFRegion/>
</div>




<div id="extraAttrTree" title="扩展属性树" >

<div id = "ef_region_extraAttrTree" title="页面信息" style="overflow:hidden;height:400px;">
<table style="width: 100%">
	<tr>
		<td>
		<div style="overflow: scroll; float: left; width: 180px; height: 395px; border-top: solid 1px #9cbdff;">
		<EF:EFTreeModel id="eaTModel">
			<EF:EFTemplate id="extraAttrTree">
			</EF:EFTemplate>
		</EF:EFTreeModel>
		 <EF:EFTree model="eaTModel" id="eaTree" text="属性树"
			configFunc="configEATree">
		</EF:EFTree>
		</div>
		</td>
		<td>
		<div id="ef_grid_extraAttrTreeResult" title="页面信息"
			style="overflow: hidden;width: 400px; height: 395px; border-top: solid 1px #9cbdff;">
		</div>
		</td>
	</tr>	
</table>
<div id="nodeAdd" style="display:none;">
		<table>	
		<tr >
			<td nowrap="nowrap" align="right" width="50%" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr >
			<td nowrap="nowrap" align="right" width="50%" >名称:</td>
			<td nowrap="nowrap">
				 <EF:EFInput   ename="name"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='名称不能含有特殊字符、空格' regex='/^[-\w_.\u4e00-\u9fa5]*$/' " />
			</td>
		 </tr>
		  <tr>
			<td nowrap="nowrap" align="right">显示名称:</td>
			<td nowrap="nowrap" >
				<EF:EFInput   ename="displayName"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]{1,40}$/' " />
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">描述:</td>
			<td nowrap="nowrap">
				<textarea id="description"  cols="35" rows="6"></textarea>
			</td>
		  </tr>		  
		</table>
</div>
</div>
</div>


<div id="activityParticipants" title="任务接口" >
<div id = "ef_region_activityParticipants" title="页面信息" style="overflow:hidden;height:400px;">
<table style="width: 100%">
	<tr>
		<td align="left">
		<div
			style="overflow: scroll; float: left; width: 180px; height: 395px; border-top: solid 1px #9cbdff;">
		<EF:EFTreeModel id="tModel">
			<EF:EFTemplate id="activityParticipantsType">
			</EF:EFTemplate>
		</EF:EFTreeModel>
		 <EF:EFTree model="tModel" id="tree" text="任务接口" 	configFunc="configTree">
		</EF:EFTree>
		</div>
		</td>
		<td>
		<div id="ef_grid_activityParticipantsResult" title="页面信息" style="overflow: hidden;float: left; width: 400px;height: 395px;">
		</div>
		</td>
	</tr>
</table>
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
