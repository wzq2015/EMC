<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
	
	String chooseType = request.getParameter("chooseType");
	if( chooseType == null ){ 
		chooseType = "IANA";   // IALV, NALV, IANA
	}
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/UT/ESUT20.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <EF:EFInput blockId="inqu_status" row="0" ename="parent" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="page" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="pnode" type="hidden"/>
    
    <input type="hidden" id="inqu_status-0-pageType" name="inqu_status-0-pageType" value="<%=chooseType%>" />
    <input type="hidden" id="inqu_status-type" name="inqu_status-type" value="" />
    <input type="hidden" id="inqu_status-target" name="inqu_status-target" value="" />
    
    <input type="hidden" id="inqu_status-org" name="inqu_status-org" value="" />  
    <input type="hidden" id="inqu_status-orgName" name="inqu_status-orgName" value="" /> 
    
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" /> 
    
    <div id="ef_region_result" title="<%=I18nMessages.getText("label.EFSelectedItem","选中记录") %>">
      <div id="ef_grid_selectValues" style="overflow: hidden;height:120px;"></div>
    </div>
    
 	<div id="ef_tab_x"  lastRange="99.0%" eftabType="efRoundDivTab" width="600"> 
 	<div id="page" title="<%=I18nMessages.getText("label.ESSelectPage","选择页面") %>" eftabSrc=""> 
     <table id="mainFrameTable" width="100%"  height="87%" cellpadding=1 cellspacing=0>
	  <tr height=100%>
	   
		    <td id="leftTree" vAlign="top" >
                  <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:230px;height:100%;'>

		    
		    <div id="ef_tab_y" lastRange="93%" eftabType="efRoundDivTab">
		     <div id="mod" title="<%= I18nMessages.getText("label.ESModuleView", "模块视角") %>"> 
		       <table width="100%" height="360px">
		         <tr height="90%" border=1><td vAlign="top">
		           <div id="leftTreeDiv" style='overflow:auto; width:220px; height:100%;'>
		             <EF:EFTree model="appTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESAuthorizationObjectTree","授权对象树") %>' configFunc="configTree">
                     </EF:EFTree>
                   </div>
		         </td></tr>
		         
		         <tr><td>
		          <hr width=100% size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
		         </td></tr>
		         
		         <tr><td valign="bottom">
		          <table height="50px" border=0>
		           <tr>
		             <td nowrap><%=I18nMessages.getText("label.ESLabel","标签") %>:</td>
		             <td><EF:EFInput blockId="inqu_status" ename="pageLabel" row="0" etc='size=12'/></td>
		           </tr>
		           <tr>
		             <td nowrap><%=I18nMessages.getText("label.ESName","名称") %>:</td>
		             <td><EF:EFInput blockId="inqu_status" ename="pageName" row="0" etc='size=12'/></td>
		           </tr>
		           <tr>  
		             <td nowrap><%= I18nMessages.getText("label.ESSearchSubModule", "搜索子模块") %>:<EF:EFInput type="checkbox" blockId="inqu_status" ename="recursive" row="0"/></td>          
		             <td buttonstatus="1" align="center" nowrap="" class="buttonRegular" title="&nbsp;<%= I18nMessages.getText("label.EFQuery","查询") %>&nbsp;"><b class="b1"></b><div class="content"><span id="ssubmodule" style="CURSOR: hand;display:block;" onclick="button_f4_onclick();">&nbsp;<%= I18nMessages.getText("label.EFQuery","查询") %>&nbsp;</span></div><b class="b2"></b></td>    	    		 
	               </tr>
	              </table>
		         </td></tr>  
		       </table>
		     </div>		     
		     <div id="menu" title="<%= I18nMessages.getText("label.ESMenuView", "菜单视角") %>">
		       <table width="100%" height="360px">
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
		
		<td id="rightContent" width="100%"  vAlign="top" >
		     <table width="100%" border=0>
		      <tr>
               <td width="50%" style="vertical-align: top;">		       
		        <div id = "ef_region_page" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" efRegionShowClear=false>
		         
                 <div id = "ef_grid_p" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" style="overflow: hidden;height:380px;">
                 </div>
                </div>
		       </td>		      		         
		       <td width="50%" style="vertical-align: top;">
		        <div id = "ef_region_elem" title="<%=I18nMessages.getText("label.ESButtonInfo","按钮信息") %>" efRegionShowClear=false>
		         <div id = "ef_grid_e" title="<%=I18nMessages.getText("label.ESButtonInfo","按钮信息") %>" style="overflow: hidden;height:380px;">
                 </div>
                </div>
		       </td>
		      </tr>
		     </table>
        </td>
	  </tr>
    </table>
    </div>
    
  <div id="POST" title="<%=I18nMessages.getText("label.ESSystemRole","系统角色") %>"  eftabSrc="">
    <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	   <td id="leftTree" vAlign="top" >
              <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:300px;'>
		   
		    <EF:EFTree model="orgTreeModel" id="oTree" text='<%=I18nMessages.getText("label.ESOrganization","组织结构") %>' configFunc="configOTree">
		     </EF:EFTree>
		  </div>
		                    
		 </td>
		 
		<td id="middleSplitter" width="4px" ></td>
		
		<td id="rightContent" width=100%  vAlign="top" >		  
			<div id = "ef_grid_post" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息 ") %>" style="overflow: hidden;height:300px;">
		    </div>
        </td>
	  </tr>
    </table>	
	</div>

	<div id="ROLE" title="<%=I18nMessages.getText("label.ESSystemRoleType","系统角色类型") %>"  eftabSrc="" >
	<div id = "ef_grid_rt" title="<%= I18nMessages.getText("label.ESRoleTypeList","角色类型列表") %>" style="overflow: hidden;height:300px;">
     </div>
	</div>
	</div>
	
    <EF:EFRegion/>
    <EF:EFGrid blockId="result" autoDraw="no" ajax="true" enable="true" readonly="false" paintId="ef_grid_selectValues" style="operationBar:false;navigationBar:false;" >
	  <EF:EFColumn ename="className" cname='<%=I18nMessages.getText("label.ESClassName","类型") %>' readonly="true" enable="false" width="100"/>
	  <EF:EFColumn ename="clazz" cname='<%=I18nMessages.getText("label.ESClazz","类型") %>' visible="false" />
	  <EF:EFColumn ename="id" cname='<%=I18nMessages.getText("label.ESId","标识") %>'  visible="false" />
	  <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("label.ESLabel","标签") %>'  readonly="true" enable="false" width="200"/>    
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("label.ESName","名称") %>' readonly="true" enable="false" width="200"/>  
	  <EF:EFColumn ename="desc" cname='<%=I18nMessages.getText("label.ESDesc","描述") %>' readonly="true" enable="false" width="300"/>  
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" style="operationBar:false" ajax="true" paintId="ef_grid_p" serviceName = "ES41">
      <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("label.ESPageLabel","页面标签") %>' fix="yes" width="100" sort="false"/>
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("label.ESPageName","页面名称") %>' width="200" enable="false"/>
    </EF:EFGrid>
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" style="operationBar:false" ajax="true" paintId="ef_grid_e" serviceName = "ES42">
      <EF:EFColumn ename="label" cname='<%=I18nMessages.getText("label.ESButtonLabel","按钮标签") %>' fix="yes" width="60" sort="false"/>
	  <EF:EFColumn ename="name" cname='<%=I18nMessages.getText("label.ESButtonName","按钮名称") %>' width="250" enable="false"/>
    </EF:EFGrid>
    
  <EF:EFGrid blockId="result" autoDraw="no" ajax="true" enable="true" readonly="false " paintId="ef_grid_post" style="operationBar:false" serviceName="ES31" queryMethod="query">
	  <EF:EFColumn ename="postId" cname='<%=I18nMessages.getText("E_Col.postId","角色标识") %>' width="200" visible="false" enable="false"/>
	  <EF:EFColumn ename="postTypeId" cname='<%=I18nMessages.getText("E_Col.postTypeId","角色类型标识") %>' width="200" visible="false" enable="false"/>
	  <EF:EFColumn ename="orgLabel" cname='<%=I18nMessages.getText("E_Col.orgLabel","组织机构标签") %>'  visible="false" enable="false"/>
	  <EF:EFColumn ename="orgName" cname='<%=I18nMessages.getText("E_Col.orgName","组织机构标签") %>'  visible="false" enable="false"/>
	  <EF:EFColumn ename="postLabel" cname='<%=I18nMessages.getText("E_Col.postLabel","角色类型标签") %>'  width="200" enable="false"/>    
	  <EF:EFColumn ename="postName" cname='<%=I18nMessages.getText("E_Col.postName","角色类型名称") %>'  width="200" enable="false"/>  
  </EF:EFGrid>
  
  <EF:EFGrid blockId="result"  autoDraw="no" ajax = "true" enable ="true" readonly="true"  paintId="ef_grid_rt"  style="operationBar:false" serviceName="ES37" queryMethod="query">
     <EF:EFColumn ename="id" visible="false"/>
     <EF:EFColumn ename="label" width="400" fix="yes" sort="false" nullable="false" minLength='0' maxLength='128' validateErrorPrompt='<%= I18nMessages.getText("ep.ESRoleTypeLabelError","对不起,角色类型标签应该最多128个字节大小的字符组成。") %>'/>
     <EF:EFColumn ename="name"  width="400" nullable='true' minLength='0' maxLength='128' validateErrorPrompt='<%= I18nMessages.getText("ep.ESRoleTypeNameError","对不起,角色类型名称应该最多128个字节大小的字符组成。") %>'/>
  </EF:EFGrid>
  
  
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>

<script language="JavaScript" type="text/javascript">
<% 
  String NewchooseType = request.getParameter("chooseType_Tabs");
  if( NewchooseType != null ){  
%>
	tabs = "<%=NewchooseType%>";
<% } %>

<% 
  String callbackFunc = request.getParameter("callbackFunc");
  if( callbackFunc != null ){  
%>
	callbackFunc = "<%=callbackFunc%>";
<% } %>

</script>
