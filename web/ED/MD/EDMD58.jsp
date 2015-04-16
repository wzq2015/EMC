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
	<script type="text/javascript" src="./ED/MD/EDMD58.js"></script>
</head>
<body class="bodyBackground">

<form id="EDMD58" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="检核代码维护" efRegionShowClear=false style="overflow:hidden">
	<div id="ef_region_main" style="overflow:auto;width:100%">
				<table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
				<tr height=100%>
				<td id="leftTree" vAlign="top" >
                <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
						<EF:EFTree model="tableTreeModel" id="nTree" text="节点树" configFunc="configTree">
						</EF:EFTree>
				</div>
				</td>
				<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
					<IMG src="./EF/Images/vgrabber.gif" >
						</td>
				<td id="rightContent" width=100%  vAlign="top" >
				<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
				<div style="overflow:hidden;width:100%">
						<table>
							<tr>
								<td nowrap width="10%">
								检核类别
								</td>
								<td nowrap>
								<EF:EFSelect blockId="inqu_status" ename="objType" row="0" >
									<EF:EFOption label="全部" value="" />
									<EF:EFCodeOption codeName="iplat.edmd.objType"  />
								</EF:EFSelect>
									<EF:EFInput blockId="inqu_status" ename="id" row="0" type="hidden" />
								</td>

								<td nowrap width="10%">
							检核代码
								</td>
								<td nowrap>
								<EF:EFInput blockId="inqu_status" ename="validateCode" row="0" etc=" maxLength='250'"/>
								</td>

							</tr>
						</table>
					</div>
				</div>
				<div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false>
				<div id = "ef_grid_result" title="检核代码 " style="overflow: hidden;height:480px;">
				</div>
				</div>
						</td>
				</tr>
				</table>
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="false" ajax="true" >
	<EF:EFColumn ename="id" cname="编码"  maxLength="50" visible="false"/>
	<EF:EFComboColumn ename="objType" cname="检核类别 " nullable="false">
		<EF:EFOption label="请选择" value=""></EF:EFOption>
	   	<EF:EFCodeOption codeName="iplat.edmd.objType"/>
	</EF:EFComboColumn>
	<EF:EFColumn ename="validateCode" cname="检核代码" maxLength="10" enable="true" nullable="false" />
	<EF:EFColumn ename="messageId" cname="消息代码" maxLength="64" enable="true" nullable="false" />
	<EF:EFComboColumn ename="propType" cname="检核方式" nullable="false">
		<EF:EFOption label="请选择" value=""></EF:EFOption>
		<EF:EFOption label="前后台" value="0"></EF:EFOption>
		<EF:EFOption label="前台" value="1"></EF:EFOption>
		<EF:EFOption label="后台" value="2"></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFColumn ename="validateExpr" cname="正则表达式" />
	<EF:EFColumn ename="serviceEname" cname="服务名"  maxLength="40" />
	<EF:EFColumn ename="methodEname" cname="方法名"  maxLength="18" />
	<EF:EFColumn ename="description" cname="描述"  width="200" nullable="false"/>
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
