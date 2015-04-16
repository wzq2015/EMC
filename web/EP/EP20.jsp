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
	<script type="text/javascript" src="./EP/EP20.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EP20" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include> 


<div id="ef_region_result" title="记录集" efRegionShowClear="false">
	<div id = "ef_grid_result" title="记录集" style="overflow: hidden;height:300px;">
    </div>  
</div>	
 
<div id = "ef_region_detail" title="对象信息" efRegionShowClear="false"  >
		<div style="overflow:hidden;width:99%;padding:10px;background:#fff;">
		   <table width = "99%">
				<tr>
					<td nowrap colspan="1" width="99%">
						<EF:EFInput blockId="detail" ename="histo" row="0" type="textarea" style='width:100%;height:300px' />
					</td>	
				</tr>
			</table>
		</div>
<EF:EFInput blockId="histo_inqu_status" ename="id" row="0" type="hidden"/>
</div>
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="false" readonly="true" ajax="true">
	<EF:EFColumn ename="id" cname="JVM进程id" width="150"  sort="true"  fix="yes"/>
	<EF:EFColumn ename="displayName" cname="JVM进程名" width="500" />
</EF:EFGrid>      
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
