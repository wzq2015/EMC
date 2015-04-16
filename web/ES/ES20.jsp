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
  <script type="text/javascript" src="./ES/ES20.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES20" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
   <div>	
		<table>		  
		  <tr>
		    <td  nowrap style="width:70px;height:24px;text-align:right;"><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
		    <td  width="45%">
			  <EF:EFInput blockId="inqu_status" ename="userId" row="0" />					
		    </td>
		    <td  nowrap style="width:80px;height:24px;text-align:right;"><%=I18nMessages.getText("E_Col.userCname","用户中文名") %></td>
		    <td  width="45%">
			  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" />					
		    </td>	
		  </tr>
		  <tr>
		  	<td  nowrap style="width:70px;height:24px;text-align:right;"><%=I18nMessages.getText("E_Col.orgCode","组织机构代码") %></td>
		    <td  width="45%">
			  <EF:EFInput blockId="inqu_status" ename="orgCode" row="0" />					
		    </td>		
		    <td  nowrap style="width:80px;height:24px;text-align:right;"><%=I18nMessages.getText("E_Col.orgName","组织机构名称") %></td>
		    <td  width="45%">
			  <EF:EFInput blockId="inqu_status" ename="orgName" row="0" />					
		    </td>  
		  </tr>
		</table>
	</div>
   </div>  

   <div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 
	 <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESUserInfo","用户信息") %>" style="overflow: hidden;height:400px;">
     </div> 
   </div>     
  
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_r" style="operationBar:false">
    <EF:EFColumn ename="userId" fix="yes" width="60" sort="false"/>
    <EF:EFColumn ename="userCname" fix="yes" width="80" sort="false"/>
    <EF:EFColumn ename="orgCode" fix="yes" sort="false"/>
    <EF:EFColumn ename="orgName" width="200" sort="false"/>

    <EF:EFColumn ename="showStation" cname='<%=I18nMessages.getText("label.ESUserPerm","用户权限") %>' visible="true" width="60"/>
	<EF:EFColumn ename="AuthStation" cname='<%=I18nMessages.getText("label.ESUserRole","用户角色") %>' visible="true" width="60"/>
    <EF:EFColumn ename="userClass" visible="true" enable="false" readonly="true" width="60"/>
    <EF:EFColumn ename="viewDetail" cname='<%=I18nMessages.getText("label.ESUserEdit","用户编辑") %>' visible="true" enable="false" readonly="true" width="90"/> 
    <EF:EFColumn ename="userMobile" visible="true" enable="false" readonly="true" width="120"/>
    <EF:EFColumn ename="userEmail" visible="true" enable="false" readonly="true" width="180"/>
    <EF:EFColumn ename="idcardNo" visible="false" enable="false" readonly="true" width="150"/>    
    <EF:EFColumn ename="recCreator" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recCreateTime" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recRevisor" visible="true" enable="false" readonly="true"/>
    <EF:EFColumn ename="recReviseTime" visible="true" enable="false" readonly="true"/>    
 </EF:EFGrid> 
  		
 
 </form>
 </body>
</html>
