<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
	boolean isAdmin = UserSession.getLoginName().equals(com.baosight.iplat4j.security.util.EpassTokenGetter.ADMIN);
	String str =  "<script type=\"text/javascript\"> var orgTreeModel =  new eiTreeModel("+
			(isAdmin?"\"ESUTTR10\"":"\"ESUTTR52\"")+");</script>";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/LV/ESLV24.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
	<div id ="cascadeSelect" cascadeSelectIds="topNode,inqu_status-0-parent,inqu_status-0-orgCode" 
	cascadeService="ES93" cascadeServiceMethod="getCascadeSelect"> 
	</div>    
	<%=str %> 
    <input type="hidden" id="inqu_status-0-parent" name="inqu_status-0-parent" value="" />	
    <input type="hidden" id="isAdmin" name="isAdmin" value=<%=isAdmin %> />	
    <input type="hidden" id="topNode" name="topNode" value="" />	
 	<div id="ef_region_main" title="<%=I18nMessages.getText("label.ESLevelUserManage","分级用户管理") %>" efRegionShowClear=false>
      <div>
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" >
                 <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:180px;height:100%;'>

    		    <EF:EFTree model="orgTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESOrganization","组织机构") %>' configFunc="configTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
    		<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		
	   				<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true> 		  
						<div style="overflow:hidden;width:100%">
						<table>
							<tr>
								<td>
								<%=I18nMessages.getText("label.ESUserId","用户标识") %>
							 	<EF:EFInput blockId="inqu_status" ename="userId" row="0" />
							 	</td>
							 	<td>
								<%=I18nMessages.getText("label.ESUserCname","用户中文名称") %>
							 	<EF:EFInput blockId="inqu_status" ename="userCname" row="0" />						 	
							 	</td>
						 	</tr>
						 </table>	
						</div>
	  				</div>    		
	    		
	   				<div id="ef_region_person" title="<%=I18nMessages.getText("label.ESUserInfomation","人员信息") %>" efRegionShowClear=false> 		  
		                <div id="admin" title="<%=I18nMessages.getText("label.ESLevelAdministrator","分级管理员") %>" >
		                  <div id = "ef_region_adm" title="<%=I18nMessages.getText("label.ESUserAdministrator","人员管理员") %>" efRegionHideHeader="true" efRegionShowClear=false>           
		                    <div id = "ef_grid_p" title="<%=I18nMessages.getText("label.EFPageInfomation","页面信息") %>" style="overflow: hidden;height:300px;">
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
   
    <EF:EFGrid blockId="result" autoDraw="no" readonly="true" enable="false" ajax="true" style="operationBar:false" paintId="ef_grid_p" serviceName="ESLV97">      
	  <EF:EFColumn ename="userId" cname='<%=I18nMessages.getText("label.ESUserId","用户标识") %>' width="80"/>
	  <EF:EFColumn ename="userCname" cname='<%=I18nMessages.getText("label.ESUserCname","用户中文名称") %>' width="100"/>
	  <EF:EFColumn ename="orgCode" cname='<%=I18nMessages.getText("label.ESOrgCode","组织机构代码") %>' width="200"/>
	  <EF:EFColumn ename="orgName" cname='<%=I18nMessages.getText("label.ESOrgName","组织机构名称") %>' width="200"/>
	  <EF:EFColumn ename="passwordReset" cname='<%=I18nMessages.getText("label.ESPasswordReset","密码重置") %>' width="52"/>
    </EF:EFGrid>
    
   <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
