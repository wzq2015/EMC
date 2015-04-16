<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
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
	<script type="text/javascript" src="./EA/EA11.js"></script>
	
</head>
<body class="bodyBackground" >

<input type="hidden" id="soundurl" value="<%=request.getContextPath()%>/EF/Images/beep.mp3">
<span id='sound'></span>


<form id="EA11" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="设置区域" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="10%">
		     报警临界数:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="num" row="0" etc="validateType='positive_number'" />
		    <EF:EFInput blockId="inqu_status" type="hidden" ename="realNum" row="0" />
		    </td>
		    
		   <td nowrap width="10%">
		    刷新频率(s):
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="second" row="0" etc="validateType='positive_number'"/>
		    <EF:EFInput blockId="inqu_status" type="hidden" ename="realsecond" row="0" />
		    </td> 
		  </tr>
		  
		</table>
	</div>
</div>  

<div id="state_monitor">
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="false" style="operationBar:false" ajax="true" enable="false">
	<EF:EFColumn ename="FD_MESSAGE_CODE" cname="消息号"  width="200" />
	<EF:EFColumn ename="countNum" cname="失败次数"   width="200" />
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
