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
	<script type="text/javascript" src="./EU/AF/EUAF03.js"></script>
</head>
<body class="bodyBackground">

<form id="EUAF03" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="文档附件管理" efRegionShowClear=false style="overflow:hidden">
	<div id="ef_region_main" style="overflow:hidden;width:100%">
				<table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
				<tr height=100%>
					<td id="leftTree" vAlign="top" >
						<div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
						<EF:EFTree model="tableTreeModel" id="nTree" text="节点树" configFunc="configTree">
						</EF:EFTree>
				</div>
				</td>
				<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
				<td id="rightContent" width=100%  vAlign="top" >
				<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
				<div style="overflow:hidden;width:100%">
					<table>
					  <tr>
					    <td nowrap width="10%" align="right">文件名称</td>
					    <td nowrap width="20%">
					    	<EF:EFInput blockId="inqu_status" ename="fileName" row="0" />
					    	<EF:EFInput blockId="inqu_status" ename="fileId" row="0" type="hidden"></EF:EFInput>
					    </td>
					    <td nowrap width="10%" align="right">关键字</td>
					    <td nowrap width="20%">
					    	<EF:EFInput blockId="inqu_status" ename="key" row="0" />
					    </td>
					    <td nowrap width="10%" align="right">摘要</td>
					    <td nowrap >
					    	<EF:EFInput blockId="inqu_status" ename="summary" row="0" />
					    </td>
					  </tr>
					</table>
					</div>
				</div>
				<div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false>
				<div id = "ef_grid_result" title="文档附件信息 " style="overflow: hidden;height:480px;">
				</div>
				</div>
						</td>
				</tr>
				</table>
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" frontSort="true" ajax="true">
    <EF:EFColumn ename="id" visible="false"/>
    <EF:EFColumn ename="fileName" enable="false" width="200"/>
    <EF:EFColumn ename="chgName"  visible="false" width="100"/>
    <EF:EFColumn ename="key"  enable="false"  width="200"/>
	<EF:EFColumn ename="author"   enable="false" width="200"/>
	<EF:EFColumn ename="summary"  enable="false" width="300"/>
	<EF:EFColumn ename="download" cname="下载" readonly="true" align="center"  />
</EF:EFGrid>


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
