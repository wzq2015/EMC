
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl=request.getContextPath()+"/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>portlet使用统计</title>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/PM/EVPM07.js"></script>
</head>
<body class="bodyBackground">
<form id="EVPM07" action="<%=actionUrl %>" method="POST">
<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>
<div id="ef_region_inqu" title="统计条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap align="right">
		      Portlet名称
		    </td>
		    <td nowrap>
		       <EF:EFInput blockId="inqu_status" ename="portletName" row="0"  etc="size='30' nullable='true' minLength='0' maxLength='50' errorPrompt='\"Portlet名称\"应该由至少0个，最多50个字节大小的字符组成。'"/>
		    </td>
		  </tr>
		</table>
	</div>
</div>
<div id="ef_region_result" title="统计结果" style="overflow:scroll">
	<div id = "ef_grid_result" title="统计结果" style="overflow: hidden;height:300px;"></div> 
</div>
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="true" ajax="false" queryMethod="portletUseStatistic" enable="false" style="operationBar:false;toolBar:true">
  <EF:EFColumn ename="portletName" cname="Portlet名称" width="300"/>
  <EF:EFColumn ename="portletCount" cname="Portlet使用次数"/>
</EF:EFGrid> 
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>
