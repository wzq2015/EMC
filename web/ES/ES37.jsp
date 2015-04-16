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
  <script type="text/javascript" src="./ES/ES37.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <div id = "ef_region_inqu" title="<%= I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
    <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="15%"><%= I18nMessages.getText("E_Col.ES37.label","角色类型标签") %></td>
		    <td  width="35%">
			  <EF:EFInput blockId="inqu_status" ename="label" row="0" />					
		    </td>
		    <td  nowrap width="15%"><%= I18nMessages.getText("label.ESRoleTypeName","角色类型名称") %></td>
		    <td  width="35%">
			  <EF:EFInput blockId="inqu_status" ename="name" row="0" />					
		    </td>	   	    
		  </tr>
		</table>
	</div>
   </div>  
  
   <div id = "ef_region_post" title="<%= I18nMessages.getText("label.ESRoleTypeList","角色类型列表") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_p" title="<%= I18nMessages.getText("label.ESRoleTypeList","角色类型列表") %>" style="overflow: hidden;height:300px;">
     </div>
   </div>
   
  
  


 <div id = "ef_region_result"  title= "记录集" >
 <div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab"> 
	   <div id="ef_region_role" title="<%=I18nMessages.getText("label.ESRoleInfo","关联角色") %>" style="overflow:scroll">
	      
		  	 <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESRoleInfo","角色信息") %>" >
		   	 </div>
		      
	  </div>
	  <div id="ef_region_auth" title="<%=I18nMessages.getText("label.EFPermList","权限列表") %>" style="overflow:scroll">
	      
		  	 <div id = "ef_grid_a" title="<%=I18nMessages.getText("label.EFPermList","权限列表") %>" >
		   	 </div>
		      
	 </div>
  </div>
 </div>
  <EF:EFRegion/>

  <EF:EFGrid blockId="result"  autoDraw="yes" readonly="false" ajax="false" paintId="ef_grid_p">
     <EF:EFColumn ename="id" visible="false"/>
     <EF:EFColumn ename="label" width="300" fix="yes" sort="false" nullable="false" minLength='0' maxLength='128' validateErrorPrompt='<%= I18nMessages.getText("ep.ESRoleTypeLabelError","对不起,角色类型标签应该最多128个字节大小的字符组成。") %>'/>
     <EF:EFColumn ename="name"  width="300" nullable='true' minLength='0' maxLength='128' validateErrorPrompt='<%= I18nMessages.getText("ep.ESRoleTypeNameError","对不起,角色类型名称应该最多128个字节大小的字符组成。") %>'/>
	 <EF:EFColumn ename="rec_creator" enable="false" />
	 <EF:EFColumn ename="rec_create_time" enable="false" />
	 <EF:EFColumn ename="rec_revisor" enable="false" />
	 <EF:EFColumn ename="rec_revise_time" enable="false" />
	 <EF:EFColumn ename="archive_flag" />
  </EF:EFGrid>
  
  <EF:EFInput blockId="role_inqu_status" ename="roleTypeLabel" row="0" type="hidden"/>
  <EF:EFInput blockId="inqu_status" ename="source" row="0" type="hidden"/>
  <EF:EFInput blockId="inqu_status" ename="type" row="0" type="hidden"/>
  <EF:EFInput blockId="inqu_status" ename="parent" row="0" type="hidden"/>
  
  <EF:EFInput blockId="inqu_status" ename="pipeline" row="0" type="hidden"/>
  
  <EF:EFGrid blockId="role" autoDraw="yes"   ajax="true" paintId="ef_grid_r" style="navigationBar:false;operationBar:false">
      <EF:EFColumn ename="postName" readonly="true" width="200"/>
      <EF:EFColumn ename="postLabel" readonly="true" width="200"/>
      <EF:EFColumn ename="orgLabel" readonly="true" width="200"/>
      <EF:EFColumn ename="orgName" readonly="true" width="200"/>
      <EF:EFColumn ename="postId" sort="false" visible="false"/>
      <EF:EFColumn ename="postTypeId" visible="false"/>
    </EF:EFGrid>
    
   <EF:EFGrid blockId="auth" autoDraw="no"  ajax ="true"  paintId="ef_grid_a" serviceName="ES55" queryMethod="query">
	<EF:EFColumn ename="label" cname='<%=I18nMessages.getText("label.ESLabel","标签") %>' width="100" readonly="true"/>
	<EF:EFColumn ename="name" cname='<%=I18nMessages.getText("label.ESName","名称")%>' width="300" readonly="true"/>
	<EF:EFComboColumn ename="type" cname='<%=I18nMessages.getText("label.ESType","类型") %>' readonly="true" width="50" align="center" valueProperty="type" >
	<EF:EFOption label="" value="0"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESPage","页面") %>' value="1"></EF:EFOption>
	<EF:EFOption label='<%=I18nMessages.getText("label.ESButton","按钮") %>' value="2"></EF:EFOption>
	</EF:EFComboColumn>
   </EF:EFGrid>
 
   
 
 
 </form>
 </body>
</html>
