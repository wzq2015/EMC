<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ES/ES46.js"></script>
</head>

<body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
   <jsp:include	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
   <EF:EFInput blockId="inqu_status" row="0" ename="pnode" type="hidden"/>
	 
   <div id="ef_tab_x"  lastRange="99%" eftabType="efRoundDivTab">  
     <div id="org" title="<%=I18nMessages.getText("label.ESUnauthorizedPage","未授权页面") %>" >
       <div id = "ef_region_top" title="<%=I18nMessages.getText("label.ESRolePermissions","角色权限") %>" efRegionShowClear=false>       
        <table id="mainFrameTable" width="100%"  height="87%" cellpadding=1 cellspacing=0 >
        
	     <tr height=100%>
	     
	      <td id="leftTree" vAlign="top" >
             <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:230px;height:100%;'>
		    <div id="ef_tab_y" lastRange="93%" eftabType="efRoundDivTab">
		     <div id="mod" title="<%= I18nMessages.getText("label.ESModuleView", "模块视角") %>"> 
		       <table width="100%" style =" height:500px">
		         <tr height="90%" border=1><td vAlign="top">
		           <div id="leftTreeDiv" style='overflow:auto; width:220px; min-height:30px; height:100%;'>
		             <EF:EFTree model="orgTreeModel" id="nTree" text='<%= I18nMessages.getText("label.ESSystemModule", "系统模块") %>' configFunc="configTree">
                     </EF:EFTree>
                   </div>
		         </td></tr>
		         
		         <tr><td>
		          <hr width=100% size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
		         </td></tr>
		         
		         <tr><td valign="bottom">
		          <table height="50px" border=0>
		           <tr>
		             <td nowrap><%= I18nMessages.getText("label.ESPageLabel", "页面标签") %>:</td>
		             <td><EF:EFInput blockId="inqu_status" ename="pageLabel" row="0" etc='size=15'/></td>
		           </tr>
		           <tr>
		             <td nowrap><%= I18nMessages.getText("label.ESPageName", "页面名称") %>:</td>
		             <td><EF:EFInput blockId="inqu_status" ename="pageName" row="0" etc='size=15'/></td>
		           </tr>
		           <tr>  
		             <td nowrap><%= I18nMessages.getText("label.ESSearchSubModule", "搜索子模块") %>:<EF:EFInput type="checkbox" blockId="inqu_status" ename="recursive" row="0"/></td>          
		             <td buttonstatus="1" align="center" nowrap="" class="buttonRegular" title="&nbsp;<%= I18nMessages.getText("E_Btn.ES46.F2","查询") %>&nbsp;"><b class="b1"></b><div class="content"><span id="ssubmodule" style="CURSOR: hand;display:block;" onclick="button_f2_onclick();">&nbsp;<%= I18nMessages.getText("E_Btn.ES46.F2","查询") %>&nbsp;</span></div><b class="b2"></b></td>    	    		 
	               </tr>
	              </table>
		         </td></tr>  
		       </table>
		     </div>		     
		     <div id="menu" title="<%= I18nMessages.getText("label.ESMenuView", "菜单视角") %>">
		       <table width="100%" height="500px">
		         <tr><td vAlign="top">
		           <div id="leftTreeDiv" style='overflow:auto; width:220px; height:100%;'>
		             <EF:EFTree model="menuTreeModel" id="tTree" text='<%= I18nMessages.getText("label.ESSystemMenu", "系统菜单") %>' configFunc="configMenuTree">
		             </EF:EFTree>
		           </div>
		         </td></tr>  
		       </table>
		     </div>
		    </div>
		   </div>		                    
		  </td>
		 
		  <td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
		
		  <td id="rightContent" width=100%  vAlign="top" >
		    
		    <div id="ef_grid_r" title="<%=I18nMessages.getText("label.ESPermissionList","权限列表") %>" style="overflow: hidden;height:582px;">
		    </div>
		    
          </td>        
	     </tr>
        </table>
       </div>
     </div>


     <div id="leadButton" title="<%=I18nMessages.getText("label.ESUnauthorizedButton","未授权按钮") %>" >
       <div id = "ef_region_x" title="<%=I18nMessages.getText("label.ESUnauthorizedButton","未授权按钮") %>" efRegionShowClear=false>       
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
        
	     <tr height=100%>
	     
	      <td id="leftTree_btn" vAlign="top" width="220px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">		                    
		    <div id="leftTreeDiv_btn" style='overflow:auto; width:220px; height:592px;'>
		    <EF:EFTree model="orgTreeModel" id="nTree_btn" text='<%=I18nMessages.getText("label.ESSystemModule","系统模块") %>' configFunc="configTree_btn">
		    </EF:EFTree>
		   </div>
		  </td>
		 
		  <td id="middleSplitter_btn" width="4px" vAlign="middle" style='cursor:e-resize'>
		   <IMG id="img_splitter_id" 
		   onload="efico.setImageSrc(this,'efform.imgVgrabber')" src="./EF/Images/eftree_blank.png"
		    >
          </td>
		
		  <td id="rightContent" width=100%  vAlign="top" >	    
	        <div id="ef_region_button" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" style="overflow:scroll" efRegionShowClear=true>
		      <div>
		        <table>
		          <tr>
		           <td><%=I18nMessages.getText("E_Col.pageLabel","页面标签") %></td>
		           <td><EF:EFInput blockId="inqu_status" ename="pageLabel1" row="0" etc='size=15'/></td>
		           <td><%=I18nMessages.getText("E_Col.buttonLabel","按钮标签") %></td>
		           <td><EF:EFInput blockId="inqu_status" ename="buttonLabel" row="0" etc='size=15'/></td>
	              </tr>
	            </table>
		      </div>
		    </div>
		    
		    <div id="ef_grid_button" title="<%=I18nMessages.getText("label.ESUnauthorizedButtonList","未授权按钮列表") %>" style="overflow: hidden;height:500px;">
		    </div>
          </td>        
	     </tr>
        </table>
       </div>
     </div>



     <div id="lead" title="<%=I18nMessages.getText("label.ESUnauthorizedRole","未授权角色") %>" eftabSrc="" >	   
      <div id = "ef_region_role" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
       <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="15%"><%=I18nMessages.getText("label.ESRoleType","角色类型") %></td>
		    <td  width="35%"><EF:EFInput blockId="inqu_status" ename="type" row="0" /></td>		    	   	    
		  </tr>
		</table>
	   </div>
      </div>
      <div id = "ef_grid_role" title="<%=I18nMessages.getText("label.ESUnauthorizedRoleList","未授权角色列表") %>" style="overflow: hidden;height:500px;">
      </div>
	 </div>
	 
	 <div id="leadType" title="<%=I18nMessages.getText("label.ESUnauthorizedRoleType","未授权角色类型") %>" eftabSrc="" >
	   <div id = "ef_region_type" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
       <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="15%"><%=I18nMessages.getText("label.ESRoleType","角色类型") %></td>
		    <td  width="35%"><EF:EFInput blockId="inqu_status" ename="typeLabel" row="0" /></td>		    	   	    
		  </tr>
		</table>
	   </div>
      </div>
      <div id = "ef_grid_type" title="<%=I18nMessages.getText("label.ESUnauthorizedRoleTypeList","未授权角色类型列表") %>" style="overflow: hidden;height:500px;">
      </div>
	 </div>
	 
   </div>  
	

    <EF:EFTab tabId="x" />
    <EF:EFTab tabId="y" />
    <EF:EFRegion /> 
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" style="operationBar:false" ajax="true" paintId="ef_grid_r" serviceName = "ES46">
      <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("E_Col.pageLabel","页面标签") %>' fix="yes" width="80" sort="false"/>
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("E_Col.pageName","页面名称") %>' width="300" enable="false"/>	  
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" enable="true" autoDraw="yes" readonly="false" ajax="true" paintId="ef_grid_role" style="operationBar:false"  serviceName = "ES38">
      <EF:EFColumn ename="postId" cname='<%=I18nMessages.getText("E_Col.postId","角色标识") %>' width="200" visible="false" enable="false"/>
	  <EF:EFColumn ename="postTypeId" cname='<%=I18nMessages.getText("E_Col.postTypeId","角色类型标签") %>' width="200"  enable="false"/>
	  <EF:EFColumn ename="orgLabel" cname='<%=I18nMessages.getText("E_Col.orgLabel","组织机构标签") %>'  enable="false"/>
	  <EF:EFColumn ename="orgName" cname='<%=I18nMessages.getText("E_Col.orgName","组织机构名称") %>'  enable="false"/>
	  <EF:EFColumn ename="postLabel" cname='<%=I18nMessages.getText("E_Col.postLabel","角色标签") %>'  width="200" enable="false"/>    
	  <EF:EFColumn ename="postName" cname='<%=I18nMessages.getText("E_Col.postName","角色名称") %>'  width="200" enable="false"/>  
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" enable="true" autoDraw="yes" readonly="false" ajax="true" paintId="ef_grid_type" style="operationBar:false"  serviceName = "ES39">
	  <EF:EFColumn ename="id" cname='<%=I18nMessages.getText("E_Col.ES39.id","角色类型标识") %>' visible="false" enable="false"/>
	  <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("E_Col.ES39.label","角色类型标签") %>' fix="yes" width="200" enable="false" sort="false"/>
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("E_Col.ES39.name","角色类型名称") %>' width="200" enable="false"/> 
    </EF:EFGrid>
	
	<EF:EFGrid blockId="result" enable="true" autoDraw="yes" readonly="false" ajax="true" paintId="ef_grid_button" style="operationBar:false"  serviceName = "ES47">
    	<EF:EFColumn ename="pageLabel" cname='<%=I18nMessages.getText("E_Col.pageLabel","页面标签") %>' width="200"  enable="false"/>
	  <EF:EFColumn ename="buttonLabel" cname='<%=I18nMessages.getText("E_Col.buttonLabel","按钮标签") %>' width="200"  enable="false"/>
	  <EF:EFColumn ename="buttonName" cname='<%=I18nMessages.getText("E_Col.buttonName","按钮名称") %>' width="200"  enable="false"/>
    </EF:EFGrid>
	
	
  </form>
 </body>
</html>
