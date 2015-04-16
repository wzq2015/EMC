<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>


<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%><html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES321.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES321" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
 	<div id = "ef_region_top" title="<%=I18nMessages.getText("label.ESUserRoleConfig","用户角色设置") %>" efRegionShowClear=false>
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
			  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
				   <div>	
						<table>		  
						  <tr>
						    <td  nowrap width="10%"><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
						    <td  width="15%">
							  <EF:EFInput blockId="inqu_status" ename="userId" row="0" />					
						    </td>
						    <td  nowrap width="10%"><%=I18nMessages.getText("E_Col.userCname","用户中文名") %></td>
						    <td  width="15%">
							  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" />					
						    </td>	
						  	<td  nowrap width="10%"><%=I18nMessages.getText("E_Col.orgCode","组织机构代码") %></td>
						    <td  width="15%">
							  <EF:EFInput blockId="inqu_status" ename="orgCode" row="0" />					
						    </td>		
						    <td  nowrap width="10%"><%=I18nMessages.getText("E_Col.orgName","组织机构名称") %></td>
						    <td  width="15%">
							  <EF:EFInput blockId="inqu_status" ename="orgName" row="0" />					
						    </td>  
						  </tr>
						</table>
					</div>
				   </div>  
				
				   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" > 
					 <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESUserInfo","用户信息") %>" style="overflow: hidden;height:300px;">
				     </div> 
				   </div>     
			
<span>			
<!-- 					  
			    <div id="ef_region_orgrole_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" style="overflow:scroll" efRegionShowClear=true>
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
 -->	        
	        	<div id="ef_region_orgrole" title="<%=I18nMessages.getText("label.ESRoleInfo","机构关联角色信息") %>" style="overflow:scroll;float: left;width: 48%;">
		        	<div id = "ef_grid_orgrole" title="<%=I18nMessages.getText("label.ESRoleInfo","机构关联角色信息") %>" style="overflow: hidden;height:275px;">
		           	</div>
				</div>
<!-- 				
				<div id="ef_region_userrole_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" style="overflow:scroll" efRegionShowClear=true>
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
 -->	        
	        	<div id="ef_region_userrole" title="<%=I18nMessages.getText("label.ESRoleInfo","用户所属角色信息") %>" style="overflow:scroll;float: left;width: 49%;margin-left: 2px;">
		        	<div id = "ef_grid_userrole" title="<%=I18nMessages.getText("label.ESRoleInfo","用户所属角色信息") %>" style="overflow: hidden;height:275px;">
		           	</div>
		           	<EF:EFInput blockId="slave_inqu_status" ename="selectUser" row="0" type="hidden"/>
				</div>
</span>				
	        </td>
	        
		  </tr>
	    </table>
	</div>    
    </div>

	<EF:EFRegion/>
	
    <EF:EFGrid blockId="result" autoDraw="yes" enable="false" readonly="true"  ajax="true" paintId="ef_grid_r" style="operationBar:false" queryMethod="queryUsers">
    <EF:EFColumn ename="userId" visible="true" enable="false" readonly="true" width="60" sort="false"/>
    <EF:EFColumn ename="userCname" visible="true" enable="false" readonly="true" width="80" sort="false"/>
    <EF:EFColumn ename="orgCode" visible="true" enable="false" readonly="true" sort="false"/>
    <EF:EFColumn ename="orgName" visible="true" enable="false" readonly="true" width="200" sort="false"/>
    <EF:EFColumn ename="userClass" visible="false" enable="false" readonly="true" width="60"/>
    <EF:EFColumn ename="userTel" visible="true" enable="false" readonly="true" width="120"/>
    <EF:EFColumn ename="userMobile" visible="true" enable="false" readonly="true" width="120"/>
    <EF:EFColumn ename="userEmail" visible="true" enable="false" readonly="true" width="180"/>
    <EF:EFColumn ename="idcardNo" visible="true" enable="false" readonly="true" width="150"/>    
    <EF:EFColumn ename="recCreator" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recCreateTime" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recRevisor" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recReviseTime" visible="false" enable="false" readonly="true"/>   
    <EF:EFColumn ename="archiveFlag" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="userLock" visible="false" enable="false" readonly="true"/>
    </EF:EFGrid>
	
    <EF:EFGrid blockId="orgrole" autoDraw="yes"   ajax="true" paintId="ef_grid_orgrole" queryMethod="queryOrgRoles">
      <EF:EFColumn ename="postTypeId" readonly="true"/>
      <EF:EFColumn ename="orgLabel" readonly="true"/>
      <EF:EFColumn ename="orgName" readonly="true"/>
      <EF:EFColumn ename="postName" readonly="true"/>
      <EF:EFColumn ename="postLabel" readonly="true"/>
      <EF:EFColumn ename="postId" sort="false" visible="false"/>
    </EF:EFGrid>
    
    <EF:EFGrid blockId="userrole" autoDraw="yes"   ajax="true" paintId="ef_grid_userrole" queryMethod="queryUserRoles">
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
