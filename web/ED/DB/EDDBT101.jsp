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
	<script type="text/javascript" src="./ED/DB/EDDBT101.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDDBT1" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="表数据项维护" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	     <td id="leftTree" vAlign="top" >
              <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="表信息" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
			<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
					<EF:EFInput blockId="inqu_status" ename="projectEname" row="0" type="hidden"/>
					<EF:EFInput blockId="inqu_status" ename="tableEname" row="0" type="hidden"/>
    		
    		<td id="rightContent" width=100%  vAlign="top" >
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="表数据项" style="overflow: hidden;height:400px;">
				</div> 
			  </div>     
            </td>
    	  </tr>
        </table>
	</div>
</div>  

<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="no" style="navigationBar:false;operationBar:false">
	<%--<EF:EFColumn ename="projectEname" width="80" fix="yes" />
	<EF:EFColumn ename="tableEname" width="80" fix="yes" />--%>
	<EF:EFColumn ename="tableItemSeq" cname="序号" width="30" readonly="true" />
	<EF:EFColumn ename="tableItemType" cname="类型" width="30" readonly="true" />
	<EF:EFColumn ename="itemSeq" cname="数据项"  readonly="true" />
	<EF:EFColumn ename="modelTableEname"  readonly="true" />
	<EF:EFColumn ename="itemEname"  readonly="true" />
	<EF:EFColumn ename="itemCname"  readonly="true" />
	<EF:EFColumn ename="tableIndexType"  readonly="true" />
	<EF:EFColumn ename="itemType"  readonly="true" />
	<EF:EFColumn ename="itemLen"  readonly="true" />
	<EF:EFColumn ename="itemUnit"  readonly="true" />
	<EF:EFColumn ename="checkResult"  readonly="true" />
	
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
