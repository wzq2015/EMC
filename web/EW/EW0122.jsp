<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";	
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/mxGraph/mxClient.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
    <script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/CounterSignatureActivitySetting.js"></script>
    <script type="text/javascript" src="./FormBuilder/js/Math.uuid.js"></script>
    <script type="text/javascript" src="./EW/EW0122.js"></script>

</head>
<body class="bodyBackground">

<form id="EW0122" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="parameters" title="会签流程参数设置">
<div id="parameterAdd">
<div id="processBasicAttr">
<table>
	
	<tr>
		<td nowrap="nowrap" align="left" width="25%">启动流程名称:</td>
		<td nowrap="nowrap"><input id="subProcessName"  size="20px"></td>
		<td nowrap="nowrap" align="left" width="25%">调用方式:</td>
		<td nowrap="nowrap">
		<select  id="invokeType" name="invokeType" disabled="disabled">		
           <option id="invokeType0" value="Async" selected="">异步</option>
           <option id="invokeType1" value="Sync" selected="selected">同步</option>
        </select>
        </td>
	</tr>
	<tr>
		<td nowrap="nowrap" align="left">启动流程显示名称:</td>
		<td nowrap="nowrap"><input id="subProcessDisplayName" size="20px"></td>
		<td nowrap="nowrap" align="left">停留在子流程开始活动:</td>
		<td nowrap="nowrap">
		<select  id="isStay" name="isStay" >
            <option id="isStay0" value="true" selected="">是</option>            
            <option id="isStay1" value="false" selected="selected">否</option>
        </select>		
		</td>
	</tr>
</table>
</div>
<div id="ef_tab_y" lastRange="98%" eftabWidth="100%"
			eftabType="efRoundDivTab">
		<div id="startParameters" title="启动参数配置">
		<div id="ef_grid_startParametersResult" title="页面信息"
			style="overflow: hidden; height: 270px;"></div>
		</div>
		<div id="otherParameters" title="相关数据配置">
		<div id="ef_grid_otherParametersResult" title="页面信息"
			style="overflow: hidden; height: 270px;"></div>
		</div>

		</div>
		<EF:EFRegion /> 
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
</div>
</div>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
