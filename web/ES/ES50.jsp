<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>


<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%><html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES50.js"></script>

<style type="text/css">
.bodyBackground TABLE {
	border-spacing: 0px;
}
</style>
</head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <EF:EFInput blockId="inqu_status" row="0" ename="parent" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="pnode" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="page" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden"/>
    <input type="hidden" id="inqu_status-0-pageType" name="inqu_status-0-pageType" value="IANA" />
    <input type="hidden" id="inqu_status-type" name="inqu_status-type" value="" />
    <input type="hidden" id="inqu_status-target" name="inqu_status-target" value="" />
    
    <table id="mainFrameTable" width="100%"  height="87%">      
    
	  <tr height=100%>
	    
		<td id="leftTree" vAlign="top" >
			<div id="leftTreeDiv" class="ef-tree-div" style='overflow:none;width:220px;height:100%;'>
		
           <div id="ef_tab_x" lastRange="93%" eftabType="efRoundDivTab">
		     <div id="mod" title="<%= I18nMessages.getText("label.ESModuleView", "模块视角") %>"> 
		       <table width="100%" height="540px" style="border-spacing:0px">
		         <tr height="90%">
		           <td vAlign="top">
		           <div id="leftTreeDiv" style='overflow:auto; width:210; height:100%;'>
		             <EF:EFTree model="appTreeModel" id="nTree" text='<%= I18nMessages.getText("label.ESSystemModule", "系统模块") %>' configFunc="configAppTree">
                     </EF:EFTree>
                   </div>
		           </td>
		         </tr>
		         
		         <tr>
		           <td><div class='ef-menuconfig-sep'></div></td>
		         </tr>
		         
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
		             <td nowrap><%= I18nMessages.getText("label.ESSearchSubModule", "搜索子模块") %>:<EF:EFInput type="checkbox" blockId="inqu_status" ename="recursive" row="0" etc="checked"/></td>          
		             <td><EF:EFButton cname="<%= I18nMessages.getText(\"E_Btn.ES50.F2\",\"查询\") %>" ename="f2"/></td>
	               </tr>
	              </table>
		         </td></tr>  
		       </table>
		     </div>		     
		     <div id="menu" title="<%= I18nMessages.getText("label.ESMenuView", "菜单视角") %>">
		       <table width="100%" height="540px">
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

		<td id="rightContent"  width="90%" vAlign="top" >
		  <table width="100%">		   
		   <tr>
		    <td width="55%" vAlign="top">
		     <table width="100%" border=0>
		      <tr>
               <td width="50%">		       
		        <div id = "ef_region_page" title="<%= I18nMessages.getText("label.EFPageInfo", "页面信息") %>" efRegionShowClear=false>		         
                 <div id = "ef_grid_p" title="<%= I18nMessages.getText("label.EFPageInfo", "页面信息") %>" style="overflow: hidden;height:320px;">
                 </div>
                </div>
		       </td>
		      </tr>
		      <tr>		         
		       <td>
		        <div id = "ef_region_elem" title="<%= I18nMessages.getText("label.ESButtonInfo", "按钮信息") %>" efRegionShowClear=false>
		         <div id = "ef_grid_e" title="<%= I18nMessages.getText("label.ESButtonInfo", "按钮信息") %>" style="overflow: hidden;height:220px;">
                 </div>
                </div>
		       </td>
		      </tr>
		     </table>
		   </td>
		   <td width="45%" valign="top">
           <table width="100%" border=0>		     
		     <tr><td>
               <div id = "ef_region_show" title="<%= I18nMessages.getText("label.ESViewPermissions", "权限查看") %>" efRegionShowClear=false>		         
	              <div id = "ef_grid_c" title="<%= I18nMessages.getText("label.ESViewPermissions", "权限查看") %>" style="overflow: hidden;height:296px;">	                    
                  </div>
                </div>
               </td>
              </tr>
              <tr>
               <td>  
	            <div id = "ef_region_auth" title="<%= I18nMessages.getText("label.ESBatchAuthorization", "批量授权") %>" efRegionShowClear=false>	  
	              <input type="checkbox" name="inqu_status-0-inheritance" value="true"><%= I18nMessages.getText("label.ESBatchAuthorizationOption", "页面授权时授予所有按钮权限") %>
	              <div id = "ef_grid_r" title="<%= I18nMessages.getText("label.ESBatchAuthorization", "批量授权") %>" style="overflow: hidden;height:170px;">
                  </div>
               </div>		         
		       </td>
		     </tr>		     
		   </table>		  
	      </td>
	      </tr>	      
	      </table>
        </td>
	  </tr>
    </table>

    <EF:EFRegion/>
    <EF:EFTab tabId="x"/>

    <EF:EFGrid blockId="result" autoDraw="yes" enable="true" readonly="false"  ajax="true" paintId="ef_grid_r" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="desc" width="200"/>
    </EF:EFGrid>
    <EF:EFGrid blockId="result" autoDraw="yes" enable="true" readonly="false"  ajax="true" paintId="ef_grid_c" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="desc" width="200"/>
    </EF:EFGrid>
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" style="operationBar:false" ajax="true" paintId="ef_grid_p" serviceName = "ES41">
      <EF:EFColumn ename="label" cname='<%= I18nMessages.getText("label.ESPageLabel", "页面标签") %>' fix="yes" width="80" sort="false"/>
	  <EF:EFColumn ename="name" cname='<%= I18nMessages.getText("label.ESPageName", "页面名称") %>' width="250" enable="false"/>
	  <EF:EFColumn ename="view" cname='<%= I18nMessages.getText("label.ESPermission", "权限") %>' width="60" visible="true" enable="false"/>
    </EF:EFGrid>
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" style="operationBar:false" ajax="true" paintId="ef_grid_e" serviceName = "ES42">
      <EF:EFColumn ename="label" cname='<%= I18nMessages.getText("label.ESButtonLabel", "按钮标签") %>' fix="yes" width="80" sort="false"/>
	  <EF:EFColumn ename="name" cname='<%= I18nMessages.getText("label.ESButtonName", "按钮名称") %>' width="250" enable="false"/>
	  <EF:EFColumn ename="view" cname='<%= I18nMessages.getText("label.ESPermission", "权限") %>' width="60" visible="true"  enable="false"/>
    </EF:EFGrid>
    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
  <script type="text/javascript">
    var grid = efgrid.getGridObject( "ef_grid_e" ); 
    grid.blockData = new EiBlock("result");
  </script>
</body>
</html>
