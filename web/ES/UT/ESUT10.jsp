<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
  String contextpath = request.getContextPath();
  String listUrl = contextpath + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/UT/ESUT10.js"></script>
 </head>
 <body class="bodyBackground">

<form method="POST" action="<%=listUrl%>" >
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
   
   <input type="hidden" id="userType" name="userType" value="" /> 
   <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />  
   <input type="hidden" id="inqu_status-parentName" name="inqu_status-parentName" value="" /> 
   <input type="hidden" id="inqu_status-business" name="inqu_status-business" value="" />
   <input type="hidden" id="inqu_status-businessName" name="inqu_status-businessName" value="" />
   
   <EF:EFInput blockId="inqu_status" row="0" ename="parentOrgCodeT" type="hidden"/>
   <div id="ef_region_result" title="<%=I18nMessages.getText("label.ESSelectedRecord","选中记录") %>">
     <div id="ef_grid_selectValues" style="overflow: hidden;height:130px;"></div>
   </div>
   
   
<div id="ef_tab_x"  lastRange="99.0%" eftabType="efRoundDivTab" >  
	<div id="USER" title="<%=I18nMessages.getText("label.ESSystemUser","系统用户") %>" eftabSrc="" >
    <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    
		 <td id="userLeftTree" vAlign="top" width="150px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">
		                    
		  <div id="userLeftTreeDiv" style='overflow:auto; width:150px;min-height:30px; height:100%;'>
		  
		    <EF:EFTree model="userTreeModel" id="userTree" text='<%=I18nMessages.getText("label.ESOrganization","组织机构") %>' configFunc="configUserTree">
		    </EF:EFTree>
		  </div>
		                    
		 </td>	
	
	
		<td id="userMiddleSplitter" width="4px" ></td>
		<td id="rightContent" width=100%  vAlign="top" >		
		  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
		   <div>	
				<table>		  
				  <tr>
				    <td nowrap><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
				    <td >
					  <EF:EFInput blockId="inqu_status" ename="userId" row="0" />					
				    </td>
				    <td nowrap><%=I18nMessages.getText("E_Col.userCname","用户中文名称") %></td>
				    <td >
					  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" />					
				    </td>
				    <td  id = "inquOrgIDName" nowrap width="15%"><%=I18nMessages.getText("E_Col.orgCode","组织机构ID") %></td>
				    <td  width="35%">
					  <EF:EFInput blockId="inqu_status" ename="orgCode" row="0" />					
				    </td>	
				  </tr>
				</table>
			</div>
		   </div> 	
		   <div id = "ef_region_user" title="<%=I18nMessages.getText("label.ESUserInfo","用户信息") %>">
				<div id = "ef_grid_user" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息 ") %>" style="overflow: hidden;height:185px;">
			    </div>
		    </div>
        </td>
	  </tr>
    </table>			    
		    
	</div>	
	
	<div id="POST" title="<%=I18nMessages.getText("label.ESSystemRole","系统角色") %>" >
    <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    
		  <td id="leftTree" vAlign="top" >
               <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:250px;'>
		  
		    <EF:EFTree model="orgTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESOrganization","组织结构") %>' configFunc="configTree">
		    </EF:EFTree>
		  </div>
		                    
		 </td>
		 
		<td id="middleSplitter" width="4px" ></td>
		
		<td id="rightContent" width=100%  vAlign="top" >		  
			<div id = "ef_grid_post" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息 ") %>" style="overflow: hidden;height:250px;">
		    </div>
        </td>
	  </tr>
    </table>	
	</div>
	
	<div id="PSTP" title="<%=I18nMessages.getText("label.ESRoleType","角色类型") %>" >
	 <div id = "ef_region_inqu2" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
      <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="15%"><%=I18nMessages.getText("label.ESRoleTypeLabel","角色类型标签") %></td>
		    <td  width="35%">
			  <EF:EFInput blockId="inqu_status" ename="label" row="0" />					
		    </td>
		    <td  nowrap width="15%"><%=I18nMessages.getText("label.ESRoleTypeName","角色类型名称") %></td>
		    <td  width="35%">
			  <EF:EFInput blockId="inqu_status" ename="name" row="0" />					
		    </td>	   	    
		  </tr>
		</table>
	   </div>
     </div>
	 <div id = "ef_grid_postType" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:250px;">
	 </div>	    	
	</div>
	
	<div id="HROG" title="<%=I18nMessages.getText("label.ESOrganization","组织机构") %>" >
	 <table width="100%"  height="82%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    
		 <td id="HROGLeftTree" vAlign="top" width="200px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">
		                    
		  <div id="HROGLeftTreeDiv" style='overflow:auto; width:200px; height:310px;'>
		  
		    <EF:EFTree model="HROGTreeModel" id="HROGTree" text='<%=I18nMessages.getText("label.ESOrganization","组织机构") %>' configFunc="configHROGTree">
		    </EF:EFTree>
		  </div>
		                    
		 </td>
		 
		<td id="HROGMiddleSplitter" width="4px" ></td>
		
		<td id="HROGRightContent" width=100%  vAlign="top" >
		    <table border=0>
		           <tr>
		             <td nowrap><%=I18nMessages.getText("E_Col.orgCode","机构编码") %></td>
		             <td><EF:EFInput blockId="inqu_status" ename="orgCode" row="0" etc='size=20'/></td>
		             <td>&nbsp;&nbsp;</td>
		             <td nowrap><%=I18nMessages.getText("E_Col.orgName","机构名称") %></td>
		             <td><EF:EFInput blockId="inqu_status" ename="orgName" row="0" etc='size=20'/></td>
		             <td>&nbsp;&nbsp;</td>
		             <!-- 
		             <td nowrap>搜索子机构<EF:EFInput type="checkbox" blockId="inqu_status" ename="recursiveOrg" row="0"/></td>
		             <td>&nbsp;&nbsp;</td>
		              -->
		             <!-- <td nowrap class='buttonRegular'><span style='CURSOR: hand;' onclick=button_f4_onclick()>&nbsp;<%=I18nMessages.getText("label.query","查询") %>&nbsp;</span></td> -->
		             <td> <EF:EFButton type="button" ename="f4" cname='<%=I18nMessages.getText("label.query","查询") %>' />    	</td>    		 		             
	               </tr>
	        </table>	  
			<div id = "ef_grid_hrog" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:290px;">
		    </div>
        </td>
	  </tr>
     </table>
	</div>
 </div>  
<EF:EFRegion/>

  <EF:EFGrid blockId="result" autoDraw="yes" ajax="true" enable="true" readonly="false " paintId="ef_grid_post" style="operationBar:false" serviceName="ES31" queryMethod="query">
	  <EF:EFColumn ename="postId" cname='<%=I18nMessages.getText("E_Col.postId","角色标识") %>' width="200" visible="false" enable="false"/>
	  <EF:EFColumn ename="postTypeId" cname='<%=I18nMessages.getText("E_Col.postTypeId","角色类型标识") %>' width="200" visible="false" enable="false"/>
	  <EF:EFColumn ename="orgLabel" cname='<%=I18nMessages.getText("E_Col.orgLabel","组织机构标签") %>'  visible="false" enable="false"/>
	  <EF:EFColumn ename="orgName" cname='<%=I18nMessages.getText("E_Col.orgName","组织机构标签") %>'  visible="false" enable="false"/>
	  <EF:EFColumn ename="postLabel" cname='<%=I18nMessages.getText("E_Col.postLabel","角色类型标签") %>'  width="200" enable="false"/>    
	  <EF:EFColumn ename="postName" cname='<%=I18nMessages.getText("E_Col.postName","角色类型名称") %>'  width="200" enable="false"/>  
  </EF:EFGrid>

  <EF:EFGrid blockId="result" autoDraw="yes" ajax="true" enable="true" readonly="false" paintId="ef_grid_user" style="operationBar:false" serviceName="ES20" queryMethod="query">
	  <EF:EFColumn ename="userId" cname='<%=I18nMessages.getText("E_Col.userId","用户标识") %>' width="100" fix="yes" enable="false" sort="false"/>
	  <EF:EFColumn ename="userCname" cname='<%=I18nMessages.getText("E_Col.userCname","用户中文名称") %>' width="100"  enable="false"/>
	  <EF:EFColumn ename="orgCode" cname='<%=I18nMessages.getText("E_Col.orgCode","组织机构代码") %>'  width="100" enable="false"/>    
	  <EF:EFColumn ename="orgName" cname='<%=I18nMessages.getText("E_Col.orgName","组织机构名称") %>'  width="100" enable="false"/>  
	  <EF:EFColumn ename="userClass" cname='<%=I18nMessages.getText("E_Col.userClass","用户分类") %>'  width="100" enable="false"/> 
	  <EF:EFColumn ename="recCreator" cname='<%=I18nMessages.getText("E_Col.recCreator","记录创建责任者") %>' width="100" enable="false"/>
	  <EF:EFColumn ename="recCreateTime" cname='<%=I18nMessages.getText("E_Col.recCreateTime","记录创建时刻") %>' width="100" enable="false"/>
	  <EF:EFColumn ename="recRevisor" cname='<%=I18nMessages.getText("E_Col.recRevisor","记录修改责任者") %>'  width="100" enable="false"/>    
	  <EF:EFColumn ename="recReviseTime" cname='<%=I18nMessages.getText("E_Col.recReviseTime","记录修改时刻") %>'  width="100" enable="false"/>  
	  <EF:EFColumn ename="archiveFlag" cname='<%=I18nMessages.getText("E_Col.archiveFlag","归档标记") %>'  width="100" enable="false"/> 	  
  </EF:EFGrid>
 
  <EF:EFGrid blockId="result" autoDraw="no" ajax="true" enable="true" readonly="false" paintId="ef_grid_selectValues" style="operationBar:false;navigationBar:false;" >
	  <EF:EFColumn ename="className" cname='<%=I18nMessages.getText("E_Col.className","类型名称") %>' readonly="true" enable="false" width="200"/>
	  <EF:EFColumn ename="clazz" cname='<%=I18nMessages.getText("E_Col.clazz","类型标签") %>' visible="false" />
	  <EF:EFColumn ename="id" cname='<%=I18nMessages.getText("E_Col.id","标识") %>'  visible="false" />
	  <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("E_Col.label","标签") %>'  readonly="true" enable="false" width="200"/>    
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("E_Col.name","名称") %>' readonly="true" enable="false" width="200"/>  
	  <EF:EFColumn ename="orgCode" cname='<%=I18nMessages.getText("E_Col.orgCode","机构编码") %>' readonly="true" enable="false" visible="false" width="200"/>  
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("E_Col.name","机构名称") %>' readonly="true" enable="false" visible="false" width="200"/>  
  </EF:EFGrid>  
  
  <EF:EFGrid blockId="result" enable="true" autoDraw="yes" readonly="false" ajax="true" paintId="ef_grid_postType" style="operationBar:false"  serviceName = "ES37">
	  <EF:EFColumn ename="id" cname='<%=I18nMessages.getText("E_Col.ES37.id","角色类型标识") %>' visible="false" enable="false"/>
	  <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("E_Col.ES37.label","角色类型标签") %>' fix="yes" width="200" enable="false" sort="false"/>
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("E_Col.ES37.name","角色类型名称") %>' width="200" enable="false"/>
  </EF:EFGrid>
  
  <EF:EFGrid blockId="result" autoDraw="no" ajax="true" style="operationBar:false" queryMethod="query" paintId="ef_grid_hrog" serviceName = "ESHR01">
	<EF:EFColumn ename="orgCode" cname='<%=I18nMessages.getText("E_Col.orgCode","机构编码") %>' enable="false" fix="yes"/>
	<EF:EFColumn ename="orgName" cname='<%=I18nMessages.getText("E_Col.orgName","机构名称") %>' width="200" enable="false"/>
	<EF:EFColumn ename="orgBriefName" cname='<%=I18nMessages.getText("E_Col.orgBriefName","机构简称") %>' width="200" enable="false"/>
	<EF:EFColumn ename="orgTypeId" cname='<%=I18nMessages.getText("E_Col.orgTypeId","机构类型") %>' width="200" enable="false"/>
	<EF:EFColumn ename="registerNo" cname='<%=I18nMessages.getText("E_Col.registerNo","工商注册号") %>' width="200" enable="false"/>	
  </EF:EFGrid>
	  
 </form>

 </body>
</html>

<script language="JavaScript" type="text/javascript">
<% 
  String chooseType = request.getParameter("chooseType");
  if( chooseType != null ){  
%>
	tabs = "<%=chooseType%>";
<% } %>

<% 
  String callbackFunc = request.getParameter("callbackFunc");
  if( callbackFunc != null ){  
%>
	callbackFunc = "<%=callbackFunc%>";
<% } %>

</script>
