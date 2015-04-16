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
  <script type="text/javascript" src="./ES/ES32.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
    
 	<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFOrganizationConfig","组织建设") %>" efRegionShowClear=false>
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
	        <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" style="overflow: hidden;height:400px;">
            </div>
        </td>
	  </tr>
    </table>
    </div>
    </div>

    <EF:EFRegion/>
    <EF:EFGrid blockId="result" autoDraw="yes" readonly="false"  ajax="true" paintId="ef_grid_r" style="operationBar:false">
      <EF:EFColumn ename="loginName" fix="yes" enable="false" sort="false"/>
	  <EF:EFColumn ename="displayName" width="100"/>
	  <EF:EFColumn ename="idCardNum" width="150"/>
	  <EF:EFColumn ename="email" width="100"/>
	  <EF:EFColumn ename="bizTel" width="100"/>	
	  <EF:EFColumn ename="showStation" cname='<%=I18nMessages.getText("label.ESShowRole","角色查看") %>' visible="true" />
    </EF:EFGrid>
    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
