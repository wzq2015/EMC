
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
	<script type="text/javascript" src="./EV/EV15.js"></script>
</head>
<body class="bodyBackground">
<input type="hidden" id="nodeId" />
<form id="EV15" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include> 
<div id = "ef_region_inqu" title="" style="width:750px;height:500px; overflow-y:scroll;">
	<div id="ef_region_main" style="overflow:hidden">
        <table id="mainFrameTable" >
    	  <tr >
    	    <td id="leftTree">
    		                    
            <div id="leftTreeDiv">
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="节点树" configFunc="configTree">
    		    </EF:EFTree>
    		</div>
    		                    
    		</td>
    		<td id="rightContent" >
            </td>
    	  </tr>
        </table>
</div>  
</div>
<EF:EFRegion/>
<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
