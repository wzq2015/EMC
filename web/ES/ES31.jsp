<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>


<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%><html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES31.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES31" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
 	<div id = "ef_region_top" title="<%=I18nMessages.getText("label.ESRoleConfig","角色设置") %>" efRegionShowClear=false>
 	<div>
    	<table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
		  <tr height=100%>
			 
			
			  <td id="leftTree" vAlign="top" >
               <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>

			  
			    <EF:EFTree model="orgTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESOrganization","组织机构") %>' configFunc="configTree">
			    </EF:EFTree>
			  </div>
			 </td>
			 
			<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
			
			<td id="rightContent" width=100%  vAlign="top" >		  
			    <div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" style="overflow:scroll" efRegionShowClear=true>
				<div>
				<table>
					<tr>
						<td nowrap width="5%"><%=I18nMessages.getText("E_Col.postTypeId","角色标识") %> :</td>
						<td nowrap width="20%">
						<EF:EFInput blockId="inqu_status" ename="postTypeId" row="0"></EF:EFInput>
						</td>
					</tr>
				</table>
				</div>
				</div>
	        
	        	<div id="ef_region_result" title="<%=I18nMessages.getText("label.ESRoleInfo","角色信息") %>" style="overflow:scroll">
		        	<div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESRoleInfo","角色信息") %>" style="overflow: hidden;height:380px;">
		           	</div>
				</div>
				
	        </td>
	        
		  </tr>
	    </table>
	</div>    
    </div>

	<EF:EFRegion/>
	
    <EF:EFGrid blockId="result" autoDraw="yes"   ajax="true" paintId="ef_grid_r">
      <EF:EFColumn ename="postTypeId" readonly="true"/>
      <EF:EFColumn ename="orgLabel" readonly="true"/>
      <EF:EFColumn ename="orgName" readonly="true"/>
      <EF:EFColumn ename="postName" readonly="true"/>
      <EF:EFColumn ename="postLabel" readonly="true"/>
      <EF:EFColumn ename="postId" sort="false" visible="false"/>
    </EF:EFGrid>
    
</form>

</body>
</html>
