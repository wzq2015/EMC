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
  <script type="text/javascript" src="./ES/LV/ESLV04.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
    <input type="hidden" id="inqu_status-0-label" name="inqu_status-0-label" value="" /> 
    <input type="hidden" id="inqu_status-0-type" name="inqu_status-0-type" value="1" />   
    <input type="hidden" id="inqu_status-0-source" name="inqu_status-0-source" value="1" />
    
 	<div id="ef_region_main" title="<%=I18nMessages.getText("label.ESLevelRoleManage","本级角色管理") %>" efRegionShowClear=false>
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
    		  
    		  <div id="ef_tab_x"  lastRange="99%" eftabType="efRoundDivTab">  
                <div id="org" title="<%=I18nMessages.getText("label.ESRoleMember","角色成员") %>" >
                  <div id = "ef_region_result" title="<%=I18nMessages.getText("label.ESRoleMember","角色成员") %>" efRegionHideHeader="true" efRegionShowClear=false>		  
    	            <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.EFPageInfomation","页面信息") %>" style="overflow: hidden;height:420px;">
                    </div> 
                  </div>
                </div>
                
                <div id="roleAuth" title="<%=I18nMessages.getText("label.ESRolePerm","角色权限") %>" >
                  <div id = "ef_region_auth" title="<%=I18nMessages.getText("label.ESRolePerm","角色权限") %>" efRegionHideHeader="true" efRegionShowClear=false>
                    <div id = "ef_grid_e" title="<%=I18nMessages.getText("label.ESRoleInfomation","角色信息") %>" style="overflow: hidden;height:420px;">
	           	    </div>
	           	  </div>
                </div>                
              </div>    		            
            </td>
    	  </tr>
        </table>
      </div>  
    </div>

    <EF:EFRegion/>

    
    <EF:EFGrid blockId="result" autoDraw="no" readonly="false"  ajax="true" paintId="ef_grid_r" style="operationBar:false" serviceName = "ES32">
      <EF:EFColumn ename="loginName" fix="yes" enable="false" sort="false"/>
	  <EF:EFColumn ename="displayName" width="100"/>
	  <EF:EFColumn ename="idCardNum" width="150"/>
	  <EF:EFColumn ename="email" width="100"/>
	  <EF:EFColumn ename="bizTel" width="100"/>	
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" autoDraw="no"  ajax ="true" readonly="true" paintId="ef_grid_e" serviceName = "ESLV16">
	  <EF:EFColumn ename="attr4" width="150" cname='<%=I18nMessages.getText("label.ESLabel","标签") %>'/>
	  <EF:EFColumn ename="attr5" width="250" cname='<%=I18nMessages.getText("label.ESName","名称") %>'/>
	  <EF:EFColumn ename="attr2" width="50"  cname='<%=I18nMessages.getText("label.ESType","类型") %>'/>	
	  <EF:EFComboColumn readonly="true" ename="attr6" cname='<%=I18nMessages.getText("label.ESSource","来源") %>' width="150" align="center" valueProperty="source" >
		<EF:EFOption label="" value="0"></EF:EFOption>
		<EF:EFOption label='<%=I18nMessages.getText("label.ESRole","角色") %>' value="1"></EF:EFOption>
		<EF:EFOption label='<%=I18nMessages.getText("label.ESRoleType","角色类型") %>' value="2"></EF:EFOption>
	  </EF:EFComboColumn>	    
    </EF:EFGrid>
    <EF:EFTab tabId="x" action="switchTabCallback"/>
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
