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
	<script type="text/javascript" src="./EC/LG/ECLG01.js"></script>	
</head>

<body class="bodyBackground">

<form id="ECLG01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_all" title="日志查询" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
			  <div style="overflow:hidden;width:100%">
						<table>
						  <tr>
						    <td nowrap width="15%">
						     节点类型
						    </td>
						    <td nowrap width=20%">
						    <EF:EFSelect blockId="inqu_status" ename="nodetype" row="0" etc=' styleClass="inputField" onChange=getOperateTypeOfNodeType();'>
						    <EF:EFOption label="" value="" />
						    <EF:EFOptions blockId="nodetype" labelColumn="itemCname" 
                                          valueColumn="itemCode"></EF:EFOptions>
                            </EF:EFSelect>
						    </td>											    
                            <td nowrap width="15%">
						     操作类型
						    </td>
						    <td nowrap width=20%">
						    <EF:EFSelect blockId="inqu_status" ename="operatetype" row="0" >
						    <EF:EFOption label="" value="" />
						    <EF:EFOptions blockId="operatetype"  labelColumn="itemCname" 
						                  valueColumn="itemCode"></EF:EFOptions>						    
                            </EF:EFSelect>
						    </td>						    
						    <td nowrap width="15%">
						     操作者
						    </td>
						    <td nowrap width=20%">
						    <EF:EFInput blockId="inqu_status" ename="userid" row="0" />
						    </td>
						  </tr>
						  <tr>
						    <td nowrap width="15%">
						     客户端IP
						    </td>
						    <td nowrap width=20%">
						    <EF:EFInput blockId="inqu_status" ename="clientIp" row="0" />
						    </td>
						    <td nowrap width="15%">
						     开始时间
						    </td>
						    <td nowrap width=20%">
						    <EF:EFInput blockId="inqu_status" ename="operateTimeStart" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						    <td nowrap width="15%">
						     结束时间
						    </td>
						    <td nowrap width=20%">
						    <EF:EFInput blockId="inqu_status" ename="operateTimeEnd" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						  </tr>
						</table>
					</div>
				</div>  
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="日志信息" style="overflow: hidden;height:400px;">
				</div>
			  </div>  
            </td>
    	  </tr>
        </table>
	</div>
</div>  

<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false" enable="false">
    <EF:EFColumn ename="nodeId" cname="节点ID" />
    <EF:EFComboColumn ename="nodetype" cname="节点类型">
	<EF:EFCodeOption codeName="iplat.ec.nodeType" />
    </EF:EFComboColumn>
    <EF:EFComboColumn ename="operatetype" cname="操作类型">
	<EF:EFCodeOption codeName="iplat.ec.operateType" />
    </EF:EFComboColumn>
    <EF:EFColumn ename="userId" cname="操作者" />
    <EF:EFColumn ename="operateTime" cname="时间" />
    <EF:EFColumn ename="clientIp" cname="客户端IP" />
    <EF:EFColumn ename="logInfo" cname="日志信息" />
</EF:EFGrid>      
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
