<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;  charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/PM/ECPM02.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECPM02" method="POST" action="<%=actionUrl%>" >
	<EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="parentId" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="parentType" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="authorize" row="0" type="hidden"/>
	<EF:EFInput blockId="inqu_status" ename="target" row="" type="hidden"></EF:EFInput>
	<EF:EFInput blockId="inqu_status" ename="type" row="" type="hidden"></EF:EFInput>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="栏目维护" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" >
            <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="站点栏目树" configFunc="configTree">
    		    </EF:EFTree>
    		</div>
    		                    
    		</td>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		<td>
					  <td width="70%" valign="top">
					         <div id = "ef_region_result" title="站点栏目节点信息" efRegionShowClear=false>		         
			                    <div id = "ef_grid_p" title="站点栏目节点信息" style="overflow: hidden;height:450px;">
			                    </div>
			                 </div>
					   </td>
					    <td width="30%" valign="top">
					    <div id = "ef_region_show" title="权限查看" efRegionShowClear=false>		         
				              <div id = "ef_grid_c" title="权限查看" style="overflow: hidden;height:200px;">	                    
			                  </div>
			              </div>
			                  
						   <div id = "ef_region_auth" title="批量授权" efRegionShowClear=false>	               	   
					          <div id = "ef_grid_r" title="批量授权" style="overflow: hidden;height:200px;">
				              </div>
				           </div>	    
						          
				       </td>
    		</td>
    	  </tr>
        </table>
	</div>
</div>  

<EF:EFRegion/>
    <EF:EFGrid blockId="result_auth"  enable="false" readonly="true" ajax="true" style="operationBar:false;navigationBar:false;" paintId="ef_grid_p">
    	<EF:EFColumn ename="nodeId" visible="false"/>
    	<EF:EFColumn ename="nodeType" visible="false"/>
	    <EF:EFColumn ename="nodeName" cname="节点名称"/>
	    <EF:EFColumn ename="permitCol" cname="节点权限<input  type='checkbox' name='checkAuth'  onclick='exCheckedAllOrUn(this,&quot;permit&quot;)'/>"/>
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result"  ajax="true" paintId="ef_grid_c" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="clazzName" cname="用户集合类型" width="100" readonly="true"/>
	  <EF:EFColumn ename="desc" cname="用户集合描述" width="200" readonly="true"/>
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result"  ajax="true" paintId="ef_grid_r" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="clazzName" cname="用户集合类型1" width="100" enable="false"/>
	  <EF:EFColumn ename="desc" cname="用户集合描述" width="200" enable="false"/>
    </EF:EFGrid>    
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
