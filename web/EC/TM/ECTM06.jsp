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
	<title>主页模板设定
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM06.js"></script>
	
</head>
<body class="bodyBackground">
<form id="ECTM05" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_all" title="" efRegionShowClear=false>
	<div id="ef_region_main">
		<table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0>
    	  <tr height=100%>
    	    <!-- 左侧树 -->
    	    <td id="leftTree" vAlign="top" height="100%" width="24%" style="">
			  <div style="border:#ffffff 1px solid;">
				<div id="leftTreeDiv" style='overflow:auto; height:425; border:#bbbbbb 1px solid; background-color:#FFFFFF'>
				    <!-- 树枝必须长在树根上 -->
				    <EF:EFTreeModel id="tModel">
					  <EF:EFTemplate id="NewsSite">
						<EF:EFLeaf label="site@0000000099999999@null@null" text="未登录主页模板"></EF:EFLeaf>
					  </EF:EFTemplate>
				    </EF:EFTreeModel>
				    <!-- 所以树根在树枝下 -->
					<EF:EFTree model="tModel" id="tree" text="主页模板设置" configFunc="configTree">	 	 
					</EF:EFTree>
			 	</div>
			  </div>
			</td>
    		<!-- 中间分隔 -->
    		<td id="" width="" vAlign="middle">
            </td>
    		<!-- 右侧区域 -->
    		<td id="rightContent" width=75%  vAlign="top" >
    		  <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    			<EF:EFInput blockId="inqu_status" ename="objId" row="0" type="hidden" />
    			<EF:EFInput blockId="inqu_status" ename="objType" row="0" type="hidden" />
    			<input type='hidden' id='inqu_status-0-contextpath' value='<%=request.getContextPath()%>'>
    		  </div>
			  <div id = "ef_region_result1" title="未登录主页模板" style="overflow:scroll" efRegionShowClear=false style='display:;'> 
			  	<div id = "ef_grid_result1" style="overflow:hidden;width:100%">
				<EF:EFInput blockId="result1" ename="templateInsId" row="0" type="hidden" />
				<EF:EFInput blockId="result1" ename="templateTypeId" row="0" type="hidden"/>
				<table>
				  <tr>
				    <td nowrap width="15%">模板实例</td>
				    <td nowrap width="85%"><EF:EFInput blockId="result1" ename="templateInsName" row="0" etc="size='50'"/></td>
				  </tr>
				</table>
				</div>
			  </div>
			  <div id = "ef_region_result2" title="内容搜索模板" style="overflow:scroll" efRegionShowClear=false style='display:;'> 
			  	<div id = "ef_grid_result2" style="overflow:hidden;width:100%">
				<EF:EFInput blockId="result2" ename="templateInsId" row="0" type="hidden" />
				<EF:EFInput blockId="result2" ename="templateTypeId" row="0" type="hidden"/>
				<table>
				  <tr>
				    <td nowrap width="15%">模板实例</td>
				    <td nowrap width="85%"><EF:EFInput blockId="result2" ename="templateInsName" row="0" etc="size='50'"/></td>
				  </tr>
				</table>
				</div>
			  </div>
            </td>
    	  </tr>
        </table>
	</div>
</div>

<EF:EFRegion/>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
