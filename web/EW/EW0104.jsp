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
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
    <script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/SubProcessActivitySetting.js"></script>    
	<script type="text/javascript" src="./EW/EW0104.js"></script>

</head>
<body class="bodyBackground">

<form id="EW0104" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">

<div id="basicAttr" title="基本属性" >
<div id="ef_region_basicAttr" title="" style="overflow: hidden;height:400px;">
	<div  id="basicAttrInputs">
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
			<td nowrap="nowrap" align="right">子流程名称:</td>
			<td nowrap="nowrap">
				<input id="subProcessName" size="50px">
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">调用方式:</td>
			<td nowrap="nowrap">
			<select  id="invokeType" name="invokeType" >
            <option id="invokeType0" value="Sync" selected="selected">同步</option>
            <option id="invokeType1" value="Async" selected="">异步</option>
            </select>		
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">停留在子流程开始活动:</td>
			<td nowrap="nowrap">
			<select  id="isStay" name="isStay" >
            <option id="isStay0" value="false" selected="selected">否</option>
            <option id="isStay1" value="true" selected="">是</option>
            </select>		
			</td>
		  </tr>
		</table>
	</div>
</div>
<EF:EFRegion/>
</div>




<div id="extra" title="扩展属性" >
 <div id = "ef_grid_extraResult" title="页面信息" style="overflow: hidden;height:400px;">
 </div>
</div>

<div id="parameters" title="相关参数" >
  <div id = "ef_grid_parametersResult" title="页面信息" style="overflow: hidden;height:400px;">
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
