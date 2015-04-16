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
	<title>模板默认配置
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM09.js"></script>
	
</head>
<body class="bodyBackground">
<form id="ECTM05" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_all" title="" efRegionShowClear=false>
	<div id="ef_region_main">
		<table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0>
    	  <tr height=100%>
    		<td id="rightContent" width=100%  vAlign="top" >
    		  <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    			<EF:EFInput blockId="inqu_status" ename="objId" row="0" type="hidden" />
    			<EF:EFInput blockId="inqu_status" ename="objType" row="0" type="hidden" />
    		  </div>
			  <div id = "ef_region_result1" title="站点首页模板" style="overflow:scroll" efRegionShowClear=false style='display:;'> 
			  	<div id = "ef_grid_result1" style="overflow:hidden;width:100%">
				<EF:EFInput blockId="result1" ename="templateInsId" row="0" type="hidden" />
				<EF:EFInput blockId="result1" ename="templateTypeId" row="0" type="hidden" etc="value='1'"/>
				<table>
				  <tr>
				    <td nowrap width="15%">模板实例</td>
				    <td nowrap width="85%"><EF:EFInput blockId="result1" ename="templateInsName" row="0" etc="size='50'"/></td>
				  </tr>
				</table>
				</div>
			  </div>
			  <div id = "ef_region_result2" title="栏目首页模板" style="overflow:scroll" efRegionShowClear=false>
			  	<div style="overflow:hidden;width:100%">
				<EF:EFInput blockId="result2" ename="templateInsId" row="0" type="hidden" />
				<EF:EFInput blockId="result2" ename="templateTypeId" row="0" type="hidden" etc="value='2' readonly"/>
				<table>
				  <tr>
				    <td nowrap width="15%">模板实例</td>
				    <td nowrap width="85%"><EF:EFInput blockId="result2" ename="templateInsName" row="0" etc="size='50'"/></td>
				  </tr>
				</table>
				</div>
			  </div>
			  <div id = "ef_region_result3" title="栏目列表模板" style="overflow:scroll" efRegionShowClear=false>
			    <div style="overflow:hidden;width:100%">
				<EF:EFInput blockId="result3" ename="templateInsId" row="0" type="hidden" />
				<EF:EFInput blockId="result3" ename="templateTypeId" row="0" type="hidden" etc="value='3' readonly"/>
				<table>
				  <tr>
				    <td nowrap width="15%">模板实例</td>
				    <td nowrap width="85%"><EF:EFInput blockId="result3" ename="templateInsName" row="0" etc="size='50'"/></td>
				  </tr>
				</table>
				</div>
			  </div>
			  <div id = "ef_region_result4" title="文章显示模板" style="overflow:scroll" efRegionShowClear=false>
			    <div style="overflow:hidden;width:100%">
				<EF:EFInput blockId="result4" ename="templateInsId" row="0" type="hidden" />
				<EF:EFInput blockId="result4" ename="templateTypeId" row="0" type="hidden" etc="value='4' readonly"/>
				<table>
				  <tr>
				    <td nowrap width="15%">模板实例</td>
				    <td nowrap width="85%"><EF:EFInput blockId="result4" ename="templateInsName" row="0" etc="size='50'"/></td>
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
