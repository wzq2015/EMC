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
  <script type="text/javascript" src="./EF/jQuery/jquery.js"></script>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES28.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form id="ES28" method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
    
 	<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFOrganizationConfig","组织建设") %>" efRegionShowClear=false>
 	<div>
    <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" >
    	<div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:220px;height:100%;'>
		    <EF:EFTree model="orgTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESOrganization","组织机构") %>' configFunc="configTree">
		    </EF:EFTree>
		  </div>
		                    
		 </td>
		 
		<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
		
		<td id="rightContent" width=100%  vAlign="top" >		  
			    <div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" style="overflow:scroll" efRegionShowClear=true>
				<div>
				<table>
					<tr>
						<td nowrap width="5%"><%=I18nMessages.getText("E_Col.executor","操作人") %> :</td>
						<td nowrap width="20%">
						<EF:EFInput blockId="inqu_status" ename="executor" row="0"></EF:EFInput>
						</td>
						<td nowrap width="5%"><%=I18nMessages.getText("E_Col.proxy","代理人") %> :</td>
						<td nowrap width="20%">
						<EF:EFInput blockId="inqu_status" ename="proxy" row="0"></EF:EFInput>
						</td>
					</tr>
					<tr>
						<td nowrap width="10%">
						   	此日期有效：
						    </td>
						    <td align="left" width="15%">
							 <EF:EFInput  blockId="inqu_status" ename="effectEndTime" row="0" type="text" style="width:70%" />
							 <img id="efcalendar1" 
							  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
							    onClick="efcalendar_1_click(this);">
							 </td>
						  </tr>
				</table>
				</div>
				</div>
	        
	        	<div id="ef_region_result" title="<%=I18nMessages.getText("label.ESRoleInfo","角色代理信息") %>" style="overflow:scroll">
		        	<div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESRoleInfo","角色代理信息") %>" style="overflow: hidden;height:380px;">
		           	</div>
				</div>
				
	    </td>
		<td id="rightContent" width=100%  vAlign="top" >		  
	        <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" style="overflow: hidden;height:400px;">
            </div>
        </td>
	  </tr>
    </table>
    </div>
    </div>
    <EF:EFRegion/>
    <EF:EFGrid blockId="result" autoDraw="yes" readonly="false"  ajax="true" paintId="ef_grid_r" style="operationBar:false">
      <EF:EFColumn ename="roleName" width="150" readonly="true" />
	  <EF:EFColumn ename="proxy" width="100" readonly="true"/>
	  <EF:EFColumn ename="effectEndTime" editType="date" dateFormat="yyyymmdd" width="100"/>
	  <EF:EFColumn ename="executor" width="100" readonly="true"/>
	  <EF:EFColumn ename="operateTime" width="150" readonly="true"/>	
	  <EF:EFColumn ename="remark" width="200" />
    </EF:EFGrid>
    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
