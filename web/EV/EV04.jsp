
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
	<script type="text/javascript" src="./EV/EV04.js"></script>
</head>
<body class="bodyBackground">

<form id="EVCM05" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>

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
						    <td nowrap width="10%" style="font-size: 16px;font-weight: bold">
						     提示：<br><br><br>
						     若选中节点没有系统门户，系统将提示是否需要新增系统门户<br><br>
						     若选中节点有系统门户，系统将跳转到系统门户进行维护
						    </td>
						    <td nowrap>
						    </td>
						   </tr>
						</table>
					</div>
				</div>  

            </td>
    	  </tr>
        </table>
	</div>
</div>  
 <div id="selectAddNew" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_select" title="选择新增门户" style="overflow:scroll">
		 <table>
			<tr>
			 <td>	
			 是否需要新增该节点的系统门户？
			 </td>
			</tr>
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>	
 </div>
<EF:EFRegion/>
   
<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
