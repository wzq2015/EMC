<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeId = request.getParameter("nodeId");
	
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AM/ECAM09.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM09" method="POST" action="<%=actionUrl%>" >
	
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
	
	<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    	<EF:EFInput blockId="inqu_status" ename="siteId" row="0" type="hidden" />
    	
		<input type="hidden" id="nodeId" value="<%=nodeId %>"/>
		
		<div style="overflow:hidden;width:100%">
			<table>
				<tr>
					<td style="width:10%">
						字段标签:
					</td> 
					<td style="width:15%">
						 <EF:EFInput blockId="inqu_status" ename="extLabel" row="0" />
					</td>
					<td style="width:10%">
						字段类型:
					</td>
					<td style="width:15%">
						<EF:EFSelect blockId="inqu_status" ename="extType" row="0" etc="style='width:150px'">
							<EF:EFOption value="" label="" />
							<EF:EFOption value="01" label="文本" />
							<EF:EFOption value="02" label="日期" />
							<EF:EFOption value="03" label="枚举" />
						</EF:EFSelect> 
					</td>
					<td style="width:10%">
						字段来源:
					</td>
					<td  style="width:15%">
						<EF:EFInput blockId="inqu_status" ename="extSource" row="0" />
					</td>
				</tr>
			</table>
		</div>
	</div>  
	<div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
		<div id = "ef_grid_result" title="扩展字段信息" style="overflow: hidden;">
		</div>
	</div>
	
	<EF:EFRegion/>

<EF:EFGrid blockId="result" ajax="true" autoDraw="false" queryMethod="query">

<EF:EFColumn ename="extId" cname="字段标识" readonly="true" visible="false"/>
<EF:EFColumn ename="siteId" cname="站点标识" readonly="true" visible="false"/>

<EF:EFColumn ename="extLabel" cname="字段标签"/>
<EF:EFComboColumn ename="extType" cname="字段类型">
	<EF:EFOption value="01" label="文本" />
	<EF:EFOption value="02" label="日期" />
	<EF:EFOption value="03" label="枚举" />
</EF:EFComboColumn>

<EF:EFColumn ename="extSource" cname="字段来源"/>
<EF:EFColumn ename="extSort" cname="排序标识"/>

</EF:EFGrid> 
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>  
