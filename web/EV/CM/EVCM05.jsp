
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM05.js"></script>
</head>
<body class="bodyBackground">

<form id="EVCM05" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_all" title="节点维护" efRegionShowClear=false style="overflow:hidden">
	<div id="ef_region_main" style="overflow:hidden">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" width="200px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">
    		                    
            <div id="leftTreeDiv" style='overflow:hidden; width:200; height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="节点树" configFunc="configTree">
    		    </EF:EFTree>
    		</div>
    		                    
    		</td>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    		   <EF:EFInput blockId="inqu_status" ename="parentNodeId" row="0" type="hidden" />
    		   <EF:EFInput blockId="inqu_status" ename="authType" row="0" type="hidden" />
			   <div style="overflow:hidden;width:100%">
						<table>
						  <tr>
						    <td nowrap width="10%">
						     节点名称
						    </td>
						    
						    <td nowrap>
						    <EF:EFInput blockId="inqu_status" ename="nodeName" row="0" etc=" maxLength='100'"/>
						    </td>
						    
						    <td nowrap width="10%">
						     节点描述
						    </td>
						    <td nowrap>
						    <EF:EFInput blockId="inqu_status" ename="nodeDesc" row="0" etc=" maxLength='250'" />
						    </td>
						    
						   </tr>
						</table>
					</div>
				</div>  
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="节点信息" style="overflow: hidden;height:480px;">
				</div>
			  </div>  
            </td>
    	  </tr>
        </table>
	</div>
</div>  

<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false">
<EF:EFColumn ename="nodeId"  nullable="false" readonly="true" minLength="1" maxLength="50" width="240"/>
<EF:EFColumn ename="nodeName" nullable="false" maxLength="100" minLength="1"/>
<EF:EFColumn ename="nodeDesc"   maxLength="250"/>
<EF:EFColumn ename="nodeSeq"   maxLength="16"/>
<EF:EFColumn ename="parentNodeId"  visible="fasle"/>
</EF:EFGrid>      
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
