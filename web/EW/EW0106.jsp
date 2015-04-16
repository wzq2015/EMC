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
    <script type="text/javascript" src="./EW/EW0106.js"></script>

</head>
<body class="bodyBackground">

<form id="EW0106" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_tab_y" lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">

<div id="basicAttr" title="基本属性">
<div id="ef_region_basicAttr" title=""
	style="overflow: hidden; height: 400px;">
<div id="basicAttrInputs">
<table>
    <tr>
		<td nowrap="nowrap" align="right" width="30%">&nbsp;</td>
		<td nowrap="nowrap">&nbsp;</td>
		<td nowrap="nowrap">&nbsp;</td>
	</tr>
	<tr>
		<td nowrap="nowrap" align="right" width="30%">&nbsp;</td>
		<td nowrap="nowrap">&nbsp;</td>
		<td nowrap="nowrap">&nbsp;</td>
	</tr>
	<tr>
	   <td nowrap="nowrap" align="right" width="30%">&nbsp;</td>
		<td nowrap="nowrap" align="right" >活动名称:</td>
		<td nowrap="nowrap">
			   <EF:EFInput   ename="name"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动名称不能含有特殊字符、空格' regex='/^[-\w_.\u4e00-\u9fa5]*$/' " />
			</td>
	</tr>
	<tr>
	    <td nowrap="nowrap" align="right" width="30%">&nbsp;</td>
		<td nowrap="nowrap" align="right">显示名称:</td>
		<td nowrap="nowrap">
		<EF:EFInput   ename="displayName"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]*$/' " />
		</td>
	</tr>
</table>
</div>
</div>
<EF:EFRegion />
</div>




<div id="extra" title="扩展属性">
<div id="ef_grid_extraResult" title="页面信息"
	style="overflow: hidden; height: 400px;"></div>
</div>

<div id="parameters" title="会签流程参数设置">

<div id="ef_grid_parametersResult" title="页面信息"	style="overflow: hidden; height: 400px;"></div>

</div>


<EF:EFRegion /> 
<EF:EFTab tabId="y" />

<div style="overflow: hidden; width: 100%">
<table>
	<tr>
		<td nowrap width="50%"></td>
		<td nowrap><EF:EFButton ename="confirm" cname="保存" /></td>

		<td nowrap><EF:EFButton ename="cancel" cname="取消" /></td>
		<td nowrap width="50%"></td>
	</tr>
</table>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
