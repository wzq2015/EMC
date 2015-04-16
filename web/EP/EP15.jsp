<!DOCTYPE html>
<%@ page  pageEncoding="UTF-8" language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String actionUrl = request.getContextPath()+"/DispatchAction.do";
	String localUrl0 = "http://"+request.getServerName();
	if(request.getServerPort() > 0 )
		localUrl0+=":"+ request.getServerPort();
	localUrl0+= request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript">
var nodeUrl = '<%=localUrl0%>';
</script>
<script type="text/javascript" src="./EP/EP15.js"></script>
</head>

<body class = "bodyBackground">
<form id = "EP14" method = "POST" action = "<%=actionUrl%>" >
<jsp:include flush = "false" page = "../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear = true>
	<div id = "ef_div_inqu" style = "overflow:hidden;width:100%">
	<table width="80%">
		<tr>
			<td nowrap width = "5%">
			节点地址
			</td>
			<td nowrap width="40%">
		    <EF:EFInput blockId="inqu_status" ename="nodeURL" row="0" etc="nullable='false'" style="width:250px" value="<%=request.getContextPath()%>" />
			<img title="Hazelcast节点" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'"" onClick="openSubGrid();" />
		    </td>
		    </tr>
	</table>
  </div>
</div>

<div id = "ef_region_result" title="运行线程信息" style="overflow:scroll"  efRegionShowClear = false> 
	<div id = "ef_grid_result" title="运行线程信息" style="overflow: hidden;height:175px;">
	</div> 
</div>

<div id = "ef_region_log" title="线程日志" style="overflow:scroll"  efRegionShowClear = false> 
	<div id = "ef_grid_log" title="线程日志" style="overflow: hidden;height:175px;">
	</div> 
</div>

<div id = "ef_region_trace" title="线程堆栈" style="overflow:scroll"  efRegionShowClear = false> 
	<div id = "ef_grid_trace" title="线程堆栈" style="overflow: hidden;height:275px;">
	</div> 
</div>

<EF:EFRegion/>
<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden"/>
<EF:EFGrid blockId = "result" autoDraw = "no"  ajax = "true" readonly="true"  paintId="ef_grid_result" style="operationBar:false;navigationBar:false;toolBar:false;" >
<EF:EFColumn ename="seqId" cname="序号" width="180" />
<EF:EFColumn ename="thread" cname="线程号" width="300" />
<EF:EFColumn ename="startTime" cname = "线程开始执行时间" width="180" dateFormatString="yyyy-MM-dd hh:mm:ss SSS" />
<EF:EFColumn ename="time" cname = "当前调用开始时间" width="180" dateFormatString="yyyy-MM-dd hh:mm:ss SSS" />
<EF:EFColumn ename="logName" cname="当前调用类型" width="140" />
<EF:EFColumn ename="context1" cname = "调用信息1" width="200"/>
<EF:EFColumn ename="context2" cname = "调用信息2" width="200"/>
<EF:EFColumn ename="context3" cname = "调用信息3" width="200"/>
<EF:EFColumn ename="context4" cname = "调用信息4" width="200"/>
<EF:EFColumn ename="context5" cname = "调用信息5" width="200"/>
</EF:EFGrid>

<EF:EFGrid blockId = "log" autoDraw = "no"  ajax = "true" readonly="true"  paintId="ef_grid_log" style="operationBar:false;navigationBar:false;toolBar:false;" >
<EF:EFColumn ename="time" cname = "调用开始时间" width="180" dateFormatString="yyyy-MM-dd hh:mm:ss SSS" />
<EF:EFColumn ename="logName" cname="调用类型" width="140" />
<EF:EFColumn ename="context1" cname = "调用信息1" width="200"/>
<EF:EFColumn ename="context2" cname = "调用信息2" width="200"/>
<EF:EFColumn ename="context3" cname = "调用信息3" width="200"/>
<EF:EFColumn ename="context4" cname = "调用信息4" width="200"/>
<EF:EFColumn ename="context5" cname = "调用信息5" width="200"/>
</EF:EFGrid>

<EF:EFGrid blockId = "trace" autoDraw = "no"  ajax = "true" readonly="true"  paintId="ef_grid_trace" style="operationBar:false;navigationBar:false;toolBar:false;" >
<EF:EFColumn ename="trace" cname="堆栈信息" width="1000" />
</EF:EFGrid>
<jsp:include flush = "false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
