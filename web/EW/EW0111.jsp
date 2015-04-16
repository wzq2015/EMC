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
	<script type="text/javascript" src="./EW/EW0111.js"></script>
	<script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/AttributeSetting.js"></script>
    <script type="text/javascript" src="./EW/WorkflowDesigner/js/attributeSetting/TransitionSetting.js"></script>
    
</head>
<body class="bodyBackground">

<form id="EW0111" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_region_basicAttr" title="" style="overflow: hidden;height:200px;">
	<div id="basicAttrInputs">
		<table>	
		<tr >
			<td nowrap="nowrap" align="right" width="30%" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr >
			<td nowrap="nowrap" align="right" width="30%" >转移名称:</td>
			<td nowrap="nowrap">
				<EF:EFInput   ename="name"   etc="size='50px' nullable='false' minLength='1'  maxLength='40' errorPrompt='转移名称不能含有特殊字符、空格' regex='/^[-\w_.\u4e00-\u9fa5]*$/' " />
			</td>
		 </tr>
		  <tr >
			<td nowrap="nowrap" align="right" width="30%" >显示名称:</td>
			<td nowrap="nowrap">
				<EF:EFInput   ename="displayName"   etc="size='50px' nullable='false' minLength='1'  maxLength='40' errorPrompt='活动显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]*$/' " />
			</td>
		 </tr>
		  <tr>
			<td nowrap="nowrap" align="right">规则条件:</td>
			<td nowrap="nowrap" >
				<EF:EFInput   ename="condition"   etc="size='50px' minLength='0'  maxLength='200'  " />
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">转移标准:</td>
			<td nowrap="nowrap">
			<select  id="decisionType" name="decisionType" >
            <option id="decisionType0" value="ByName" selected="selected">按转移名称转移</option>
            <option id="decisionType1" value="ByRule" selected="">按规则条件转移</option>
            </select>		
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">转移优先级:</td>
			<td nowrap="nowrap">
			<select  id="conditionName" name="conditionName" >
            <option id="conditionName0" value="highest" selected="selected">最高</option>
            <option id="conditionName1" value="high" selected="">高</option>
            <option id="conditionName2" value="normal" selected="">中</option>
            <option id="conditionName3" value="low" selected="">低</option>
            <option id="conditionName4" value="lowest" selected="">最低</option>
            </select>		
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
