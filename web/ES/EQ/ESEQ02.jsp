<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/EQ/ESEQ02.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ESEQ02" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
   <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="30%"><%=I18nMessages.getText("E_Col.groupLabel","一级群组标识") %></td>
		    <td  width="45%">
			  <EF:EFInput blockId="inqu_status" ename="groupLabel" row="0" />					
		    </td>
		    <td  nowrap width="30%"><%=I18nMessages.getText("E_Col.groupCname","一级群组中文名") %></td>
		    <td  width="45%">
			  <EF:EFInput blockId="inqu_status" ename="groupCname" row="0" />					
		    </td>	
		  </tr>
		</table>
	</div>
   </div>  

   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESGroupInfo","群组信息") %>" style="overflow: hidden;height:300px;">
     </div> 
   </div>
   
   <div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
	<div id="keyPost" title="关键岗位信息" >
	   <div id = "ef_region_keyPost" title="<%=I18nMessages.getText("label.ESKeyPost","关键岗位信息") %>" style="overflow:scroll;"> 
		<div id = "ef_grid_keyPost" title="<%=I18nMessages.getText("label.ESKeyPost","关键岗位信息") %>" style="overflow: hidden;height:200px;">
		</div> 
		<EF:EFInput blockId="keyPost_inqu_status" ename="postLabel" row="0" type="hidden"/>
		</div>   
	</div>
	
	<div id="nestGroup" title="二级群组关联" >
	   <div id = "ef_region_groupTwo" title="<%=I18nMessages.getText("label.ESGroupTwo","二级群组关联") %>" style="overflow:scroll;"> 
		<div id = "ef_grid_groupTwo" title="<%=I18nMessages.getText("label.ESGroupTwo","二级群组关联") %>" style="overflow: hidden;height:200px;">
		</div> 
		<EF:EFInput blockId="nestGroup_inqu_status" ename="groupLabel" row="0" type="hidden"/>
		</div>   
	</div>
   </div>	  
  
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_r">
    <EF:EFColumn ename="groupLabel" cname='<%=I18nMessages.getText("label.ESGroupLabel","一级群组标识") %>' fix="yes" width="150" sort="false"/>
    <EF:EFColumn ename="groupCname" cname='<%=I18nMessages.getText("label.ESGroupCname","一级群组中文名") %>' fix="yes" width="150" sort="false"/>

    <EF:EFColumn ename="recCreator" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recCreateTime" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recRevisor" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recReviseTime" visible="true" enable="false" readonly="true"/>    
 </EF:EFGrid> 
  		
  <EF:EFGrid blockId="keyPost" autoDraw="yes" readonly="false" ajax="true" queryMethod="query">
	<EF:EFColumn ename="postLabel" cname='<%=I18nMessages.getText("label.ESPostLabel","关键岗位标识") %>' width="150" fix = "yes"  />
	<EF:EFColumn ename="postCname" cname='<%=I18nMessages.getText("label.ESPostCname","关键岗位中文名") %>' width="150"  />
  </EF:EFGrid> 
  
  <EF:EFGrid blockId="groupTwo" autoDraw="no" readonly="false" paintId="ef_grid_groupTwo">
    <EF:EFColumn ename="groupLabel" cname='<%=I18nMessages.getText("label.ESGroupLabel","二级群组标识") %>' fix="yes" width="150" sort="false"/>
    <EF:EFColumn ename="groupCname" cname='<%=I18nMessages.getText("label.ESGroupCname","二级群组中文名") %>' fix="yes" width="150" sort="false"/>

    <EF:EFColumn ename="recCreator" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recCreateTime" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recRevisor" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recReviseTime" visible="true" enable="false" readonly="true"/>    
  </EF:EFGrid> 
  
  <EF:EFTab tabId="y" />
 
 </form>
 </body>
</html>
