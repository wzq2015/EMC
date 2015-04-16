
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
	<script type="text/javascript" src="./EV/CM/EVCM0508.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM0508" method="POST" action="<%=actionUrl%>" >
<div id = "evcm0508_inqu" >
	<EF:EFInput blockId="inqu_status" ename="parentNodeId" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="authorize" row="0" type="hidden"/>
	<EF:EFInput blockId="inqu_status" ename="target" row="" type="hidden"></EF:EFInput>
	<EF:EFInput blockId="inqu_status" ename="type" row="" type="hidden"></EF:EFInput>
	<EF:EFInput blockId="inqu_status" ename="authType" row="0" type="hidden" />
</div>

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_all" title="门户树授权" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" >
				<div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>

    		    <EF:EFTree model="tableTreeModel" id="nTree" text="<label style='border: thin none #FFFFFF;font-size: 12px;line-height: 20px;background-color: #f0f3f4;cursor: hand;' onclick='settingNodeId()'>门户节点树"  configFunc="configTree">
    		    </EF:EFTree>
    		</div>
    		                    
    		</td>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		<td>
					  <td width="70%" valign="top">
					         <div id = "ef_region_result" title="门户树权限信息" efRegionShowClear=false>		         
			                    <div id = "ef_grid_p" title="门户树权限信息" style="overflow: hidden;height:450px;">
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
	    <EF:EFColumn ename="nodeName" cname="节点名称"/>
  	    <EF:EFColumn ename="maintainCol" cname="维护权限<input  type='checkbox' name='portalTreeCheckCol'  onclick='exCheckedAllOrUn(this,&quot;maintain&quot;)'/>"/>
	    <EF:EFColumn ename="accreditCol" cname="授权权限<input  type='checkbox' name='portalTreeCheckCol'  onclick='exCheckedAllOrUn(this,&quot;accredit&quot;)'/>"/>
	    <EF:EFColumn ename="accessCol"  cname="访问权限<input  type='checkbox' name='portalTreeCheckCol'  onclick='exCheckedAllOrUn(this,&quot;access&quot;)'/>"/>
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
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
