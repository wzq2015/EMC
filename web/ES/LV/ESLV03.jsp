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
  <script type="text/javascript" src="./ES/LV/ESLV03.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
    <input type=hidden id="TopOrgManager" name="TopOrgManager"	value="${ei.attr.TopOrgManage}">
    
 	<div id="ef_region_main" title="<%=I18nMessages.getText("label.ESLevelOrgManage","本级机构管理") %>" efRegionShowClear=false>
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
    		    <div id="role" title="<%=I18nMessages.getText("label.ESRoleConfig","角色配置") %>" >
                  <div id = "ef_region_role" title="<%=I18nMessages.getText("label.ESRoleConfig","角色配置") %>" efRegionHideHeader="true" efRegionShowClear=false>
                    <div id = "ef_grid_e" title="<%=I18nMessages.getText("label.ESRoleInfomation","角色信息") %>" style="overflow: hidden;height:400px;">
	           	    </div>
	           	  </div>
                </div>
                  
                <div id="org" title="<%=I18nMessages.getText("label.ESSubOrgManage","子机构管理") %>" >
                  <div id = "ef_region_org" title="<%=I18nMessages.getText("label.ESSubOrgManage","子机构管理") %>" efRegionHideHeader="true" efRegionShowClear=false>		  
    	            <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:400px;">
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
    
    <EF:EFGrid blockId="result" autoDraw="no" readonly="false"  ajax="true" paintId="ef_grid_r" serviceName = "ESLV12">
      <EF:EFColumn ename="label" fix="yes" sort="false" nullable="false" minLength="1" maxLength="64" />
      <EF:EFColumn ename="name" nullable="false" minLength="1" maxLength="256" />
      <EF:EFColumn ename="tel" validateRegex="/^[0-9#*\x20-]{0,24}$/" nullable="true" minLength="0" maxLength="24" validateErrorPrompt='<%=I18nMessages.getText("label.ESOrgTelRestraint","组织机构联系电话最多由２４个数字,*,#,-字符组成！") %>'/>    
      <EF:EFColumn ename="fax" validateRegex="/^[0-9#*\x20-]{0,24}$/" nullable="true" minLength="0" maxLength="24" validateErrorPrompt='<%=I18nMessages.getText("label.ESOrgFaxRestraint","组织机构传真最多由２４个数字,*,#,-字符组成！") %>'/>          
      <EF:EFColumn ename="desc" />
      <EF:EFColumn ename="postCode" validateRegex="/^[0-9#\x20]{0,16}$/" nullable="true" minLength="0" maxLength="16" validateErrorPrompt='<%=I18nMessages.getText("label.ESOrgZipCodeRestraint","组织机构邮编最多由１６个数字,#,空格组成！") %>'/>   
      <EF:EFColumn ename="location" />       
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" autoDraw="no" readonly="true"  ajax="true" paintId="ef_grid_e" serviceName = "ES31">
      <EF:EFColumn ename="postId" sort="false" visible="false"/>
      <EF:EFColumn ename="postLabel" />
      <EF:EFColumn ename="postName" />
    </EF:EFGrid>
    
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
