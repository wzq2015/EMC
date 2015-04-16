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
  <script type="text/javascript" src="./ES/UT/ESUT16.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES20" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <EF:EFInput blockId="inqu_status" ename="parent" row="0" type="hidden" />

  <div id="ef_region_result" title="<%=I18nMessages.getText("label.EFSelectedItem","选中记录") %>">
    <div id="ef_grid_selectValues" style="overflow: hidden;height:130px;"></div>
  </div>
  
  <div id="ef_tab_x"  lastRange="99.0%" eftabType="efRoundDivTab" width="600"> 
    <div id="page" title="<%=I18nMessages.getText("label.ESSelectUser","选择用户") %>" eftabSrc="">
      <div id = "ef_region_user" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>  
      <div>
      <table border=0>
        <tr>
         <td nowrap><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
         <td><EF:EFInput blockId="inqu_status" ename="userId" row="0" etc='size=20'/></td>
         <td>&nbsp;&nbsp;</td>
         <td nowrap><%=I18nMessages.getText("E_Col.userCname","用户名称") %></td>
         <td><EF:EFInput blockId="inqu_status" ename="userCname" row="0" etc='size=20'/></td>
         </tr>
	   </table>	
	   </div>
	   </div>        
      <div id = "ef_grid_user" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" style="overflow: hidden;height:250px;">
	　</div>
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
  
  <EF:EFGrid blockId="result" enable="true" autoDraw="yes" readonly="false" ajax="true" paintId="ef_grid_user" style="operationBar:false" serviceName = "ESUT16">
	  <EF:EFColumn ename="userId" cname='<%=I18nMessages.getText("E_Col.userId","用户标识") %>' width="100" fix="yes" enable="false" sort="false"/>
	  <EF:EFColumn ename="userCname" cname='<%=I18nMessages.getText("E_Col.userCname","用户名称") %>' width="100"  enable="false"/>
	  <EF:EFColumn ename="orgCode" cname='<%=I18nMessages.getText("E_Col.orgCode","组织机构代码") %>'  width="100" enable="false"/>    
	  <EF:EFColumn ename="orgName" cname='<%=I18nMessages.getText("E_Col.orgName","组织机构名称") %>'  width="100" enable="false"/>  
	  <EF:EFColumn ename="userClass" cname='<%=I18nMessages.getText("E_Col.userClass","用户分类") %>'  width="100" enable="false"/> 
	  <EF:EFColumn ename="recCreator" cname='<%=I18nMessages.getText("E_Col.recCreator","记录创建责任者") %>' width="100" enable="false"/>
	  <EF:EFColumn ename="recCreateTime" cname='<%=I18nMessages.getText("E_Col.recRevisor","记录创建时刻") %>' width="100" enable="false"/>
	  <EF:EFColumn ename="recRevisor" cname='<%=I18nMessages.getText("E_Col.recRevisor","记录修改责任者") %>'  width="100" enable="false"/>    
	  <EF:EFColumn ename="recReviseTime" cname='<%=I18nMessages.getText("E_Col.recReviseTime","记录修改时刻") %>'  width="100" enable="false"/>  
	  <EF:EFColumn ename="archiveFlag" cname='<%=I18nMessages.getText("E_Col.archiveFlag","归档标记") %>'  width="100" enable="false"/> 
  </EF:EFGrid>	 
  		

  
 </form>
 </body>
</html>
