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
  <script type="text/javascript" src="./ES/LV/ESLV02.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-org" name="inqu_status-org" value="" />
        
 	<div id="ef_region_main" title="<%=I18nMessages.getText("label.ESOrgLevelConfig","机构分级管理") %>" efRegionShowClear=false>
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
                <div id="admin" title="<%=I18nMessages.getText("label.ESLevelAdministrator","分级管理员") %>" >
                  <div id = "ef_region_adm" title="<%=I18nMessages.getText("label.ESLevelAdministrator","分级管理员") %>" efRegionHideHeader="true" efRegionShowClear=false>           
                    <div id = "ef_grid_p" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:400px;">
                    </div>
                  </div>
                </div>
                
                <div id="page" title="<%=I18nMessages.getText("label.ESPageRange","页面范围") %>" >
                  <div id = "ef_region_pge" title="<%=I18nMessages.getText("label.ESPageRange","页面范围") %>" efRegionHideHeader="true" efRegionShowClear=false>           
                    <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:400px;">
                    </div>
                  </div>
                </div>
                
                <div id="org" title="<%=I18nMessages.getText("label.ESOrgMapping","机构映射") %>" >
                  <div id = "ef_region_map" title="<%=I18nMessages.getText("label.ESOrgMapping","机构映射") %>" efRegionHideHeader="true" efRegionShowClear=false>           
                    <div id = "ef_grid_m" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:400px;">
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
    <EF:EFTab tabId="x" action="switchTabCallback"/>
    
    <EF:EFGrid blockId="result" autoDraw="no" readonly="false"  ajax="true" style="operationBar:false" paintId="ef_grid_p" serviceName = "ESLV71">      
	  <EF:EFColumn ename="orgAdm" cname='<%=I18nMessages.getText("E_Col.ESLV02.orgAdm","工号") %>' width="80" readonly="true"/>
	  <EF:EFColumn ename="orgAdmName" cname='<%=I18nMessages.getText("E_Col.ESLV02.orgAdmName","中文名") %>' width="120" readonly="true"/>
	  <EF:EFColumn ename="orgPerm1" cname='<%=I18nMessages.getText("E_Col.ESLV02.levelAdministrator","分级管理员") %>' width="62" readonly="true"/>
	  <EF:EFColumn ename="orgPerm2" cname='<%=I18nMessages.getText("E_Col.ESLV02.pageRange","页面范围") %>' width="52" readonly="true"/>
	  <EF:EFColumn ename="orgPerm3" cname='<%=I18nMessages.getText("E_Col.ESLV02.orgMapping","机构映射") %>' width="52" readonly="true"/>
	  <EF:EFColumn ename="orgPerm4" cname='<%=I18nMessages.getText("E_Col.ESLV02.subOrgManage","子机构管理") %>' width="70" readonly="true"/>
	  <EF:EFColumn ename="orgPerm5" cname='<%=I18nMessages.getText("E_Col.ESLV02.roleConfig","角色配置") %>' width="52" readonly="true"/>
	  <EF:EFColumn ename="orgPerm6" cname='<%=I18nMessages.getText("E_Col.ESLV02.roleMembers","角色成员") %>' width="52" readonly="true"/>
	  <EF:EFColumn ename="orgPerm7" cname='<%=I18nMessages.getText("E_Col.ESLV02.rolePerms","角色权限") %>' width="52" readonly="true"/>
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" autoDraw="no" readonly="false"  ajax="true" style="operationBar:false" paintId="ef_grid_r" serviceName = "ESLV11">
      <EF:EFColumn ename="label" fix="yes" width="200" enable="false" sort="false"/>
	  <EF:EFColumn ename="name" width="200" enable="false"/>
	  <EF:EFColumn ename="desc" width="300" enable="false"/>
	</EF:EFGrid>
	
	<EF:EFGrid blockId="result" autoDraw="no" readonly="false"  ajax="true" style="operationBar:false" paintId="ef_grid_m" serviceName = "ESLV13">
      <EF:EFColumn ename="orgCode" width="100" enable="false" minLength="1"  maxLength="16"/>
	  <EF:EFColumn ename="orgName" width="300" enable="false"/>
	  <EF:EFColumn ename="orgBriefName" width="100" enable="false" visible="false"/>
    </EF:EFGrid>
    
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
