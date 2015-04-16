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
	<script type="text/javascript" src="./ED/IG/EDIG03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDIG02" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="信息生成" efRegionShowClear=false>
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
    		
    		<td id="rightContent" width=100%  vAlign="top" >
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
	            <EF:EFInput blockId="inqu_status" ename="projectEname" row="0" type="hidden"/>
					<EF:EFInput blockId="inqu_status" ename="tableEname" row="0" type="hidden"/>
				<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:400px;">
				</div> 				
			  </div>			         
            </td>
    	  </tr>
        </table>
	</div>
</div>  
<iframe id = "downloadObject" width=0 height=0></iframe>
<input id='url' type="hidden" value="<%=actionUrl %>">
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="no" enable="false" style="navigationBar:false;operationBar:false">
	<%--<EF:EFColumn ename="projectEname" width="80" fix="yes" />
	<EF:EFColumn ename="tableEname" width="80" fix="yes" />--%>
	<EF:EFColumn ename="tableItemSeq" cname="序号" width="30"/>
	<EF:EFColumn ename="tableItemType" cname="类型" width="30"/>
	<EF:EFColumn ename="itemSeq" cname="数据项" />
	<EF:EFColumn ename="modelTableEname" />
	<EF:EFColumn ename="itemEname" />
	<EF:EFColumn ename="itemCname" />
	<EF:EFColumn ename="tableIndexType" />
	<EF:EFColumn ename="itemType" />
	<EF:EFColumn ename="itemLen" />
	<EF:EFColumn ename="itemUnit" />
	<EF:EFColumn ename="checkResult" />	
</EF:EFGrid>          

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
