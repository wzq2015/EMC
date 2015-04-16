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
	<title>聚合活动信息设置</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EU/mxGraph/mxClient.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
    <script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/JoinActivitySetting.js"></script>		
	<script type="text/javascript" src="./EW/EW0109.js"></script>

</head>
<body class="bodyBackground">

<form id="EW0109" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_region_basicAttr" title="" style="overflow: hidden;height:200px;">
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
				<EF:EFInput   ename="displayName"   etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]*$/' " />
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">活动描述:</td>
			<td nowrap="nowrap">
				<textarea id="description"  cols="52" rows="6"></textarea>
			</td>
		  </tr>
		  
		</table>
	</div>
</div>

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
