<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EL/EL10.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES92" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="inqu_status" ename="category" row="0" type="hidden"/>

  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>	    
		<table>
		  <tr>
		    <td ><%=I18nMessages.getText("label.ELStartDate","时间上限") %></td>
		    <td >		
			  <EF:EFInput blockId="inqu_status" ename="startDate" row="0"    />
			  <img id="efcalendar1" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_1_click(this);">
		    </td>
		    
		    <td ><%=I18nMessages.getText("label.ELEndDate","时间下限") %></td>
		    <td >
			  <EF:EFInput blockId="inqu_status" ename="endDate" row="0" />
              <img id="efcalendar2" 
              onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
               onClick="efcalendar_2_click(this);">
		    </td>
		    
		    <td ><%=I18nMessages.getText("label.ELLogUser","用户") %></td>
		    <td >
              <EF:EFInput blockId="inqu_status" ename="logUser" row="0" />					
		    </td>
		    
		    <td ><%=I18nMessages.getText("label.ELMessage","消息") %></td>
		    <td >
              <EF:EFInput blockId="inqu_status" ename="qmsg" row="0" />					
		    </td>
		  </tr>
		</table>
	</div>
  </div>  

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 
<div>
    <table id="mainFrameTable" width="100%"  height="60%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" >

           <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>

		    <EF:EFTree model="aModel" id="nTree" text='<%=I18nMessages.getText("label.ELBusinessLog","业务日志") %>' configFunc="configTree">
		    </EF:EFTree>
		  </div>
		                    
		 </td>
		 
		<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
		
		<td id="rightContent" width=100%  vAlign="top" >		  
	        <div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:350px;">
            </div>
            <div>
              <textarea id="msg" style="width:100%" rows="5" ></textarea>    
            </div>
        </td>
	  </tr>
    </table>
    </div>
   </div>

  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result" autoDraw="no" ajax="true" readonly="true" enable="false" style="operationBar:false" >
	<EF:EFColumn ename="ftime" width="100"/>
	<EF:EFColumn ename="fuser" width="100"/>
	<EF:EFColumn ename="fip" width="80"/>
	<EF:EFColumn ename="fmsg" width="300"/>
  </EF:EFGrid>
  		
 
 </form>
 </body>
</html>
