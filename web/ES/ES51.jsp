<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES51.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-type" name="inqu_status-type" value="" />
    <input type="hidden" id="inqu_status-target" name="inqu_status-target" value="" />
    <input type="hidden" id="inqu_status-authorize" name="inqu_status-authorize" value="" />
    
 	<div id = "ef_region_result" title="管理授权" efRegionShowClear=false>
    <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" >
             <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
		    <EF:EFTree model="appTreeModel" id="nTree" text="授权对象树" configFunc="configTree">
		    </EF:EFTree>
		  </div>
		                    
		 </td>
		 
		<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td>
		
		<td id="rightContent" width=100%  vAlign="top" >		  
	        <div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:540px;">
            </div>
        </td>
	  </tr>
    </table>
    </div>

    <EF:EFRegion/>
    <EF:EFGrid blockId="result" autoDraw="yes" readonly="true"  ajax="true" paintId="ef_grid_r">
      <EF:EFColumn ename="clazz" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="desc" width="250"/>
    </EF:EFGrid>
    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
