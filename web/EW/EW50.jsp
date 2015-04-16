<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EW/EW50.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden"/>
    <input type="hidden" id="inqu_status-type" name="inqu_status-type" value="" />
    <input type="hidden" id="inqu_status-target" name="inqu_status-target" value="" />
    
    <table id="mainFrameTable" width="100%"  height="87%">  
     <tr height=100%>	    
	 	<td id="rightContent" width=55%  vAlign="top" >
	 		<table width="100%" border=0>	
	 			<tr>	
	 				<td>		   
				 		<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
							<div style="overflow:hidden;height:40px">
							<table>
							 <tr>
							 	<td nowrap width="15%">
						   			目录名称
						 		</td>
						 		<td nowrap width="20%">
						   			<EF:EFInput blockId="inqu_status" ename="name" row="0" />
						 		</td>
						 		<td nowrap width="15%">
						   			目录显示名称
						 		</td>
						 		<td nowrap width="20%">
						   			<EF:EFInput blockId="inqu_status" ename="displayname" row="0" />
						 		</td>
							 </tr>
							</table>						 		
							</div>
						</div>
		  			</td>
		  			</tr>
		  			<tr>
		    		<td>       
				        <div id = "ef_region_category" title="<%= I18nMessages.getText("label.EWCategoryInfo", "目录信息") %>" efRegionShowClear=false>		         
		                 <div id = "ef_grid_p" title="<%= I18nMessages.getText("label.EWCategoryInfo", "目录信息") %>" style="overflow: hidden;height:450px;">
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
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" style="operationBar:false" ajax="true" paintId="ef_grid_p" serviceName = "EW50">
      <EF:EFColumn ename="name" cname='<%= I18nMessages.getText("label.EWCategoryName", "目录名称") %>' fix="yes" width="80" sort="false"/>
	  <EF:EFColumn ename="displayname" cname='<%= I18nMessages.getText("label.EWCategoryDisplayName", "目录显示名称") %>' width="250" enable="false"/>
	  <EF:EFColumn ename="view" cname='<%= I18nMessages.getText("label.ESPermission", "权限") %>' width="60" visible="true" enable="false"/>
    </EF:EFGrid>
    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
    
    
 </body>
</html>
