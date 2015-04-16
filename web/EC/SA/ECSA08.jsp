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
	<script type="text/javascript" src="./EC/SA/ECSA08.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSA08" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
<div id="ef_div_inqu" style="overflow:hidden;width:100%"> 
                     <table>
                       <tr>
                          <td width="10%">操作者</td>
                          <td width="25%">
							<EF:EFInput blockId="inqu_status" ename="userid" row="0"  etc="maxLength='40' size='20'"  />
						   </td>
						   <td nowrap width="15%">
						      用户访问日期：开始日期
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="TimeStart" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
						    </td>
						     <td nowrap width="10%">
						     截止日期
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="TimeEnd" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
						    </td>
						    <td nowrap width=10%">
						    <EF:EFInput blockId="inqu_status" ename="nodeId" row="0"  etc="readOnly" type="hidden"/>
						    </td>
						  </tr>
						</table>
					</div>
					
</div>   

<div id = "ef_region_result" title="记录集" style="ovFerflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>
<EF:EFRegion/>
<EF:EFGrid blockId="result"  ajax="true" readonly="true" enable="false" >
    <EF:EFColumn ename="userId" cname="操作者"  readonly="true" align="center" width="160"/>
    <EF:EFColumn ename="operateTime" cname="时间"  readonly="true" align="center" width="160"/>
    <EF:EFColumn ename="clientIp" cname="客户端IP" readonly="true" align="center" width="160"/>
</EF:EFGrid>          

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
